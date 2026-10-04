import { describe, expect, it } from "vitest";
import { amortiseByYear, emi } from "./emi";
import { clamp, formatINR, formatINRShort, formatINRSpoken, parseNumericInput, snapToStep } from "./format";
import { sipForGoal, sipFutureValue } from "./sip";

describe("sipFutureValue", () => {
  it("matches the widely published reference: ₹10,000 for 10 years at 12%", () => {
    const r = sipFutureValue({ monthly: 10_000, annualRate: 12, years: 10 });
    expect(Math.round(r.futureValue)).toBe(23_23_391);
    expect(r.invested).toBe(12_00_000);
    expect(r.months).toBe(120);
    expect(r.monthlyRate).toBeCloseTo(0.01, 12);
  });

  it("matches the hero default: ₹25,000 for 15 years at 12%", () => {
    const r = sipFutureValue({ monthly: 25_000, annualRate: 12, years: 15 });
    // Cross-checked with 40-digit decimal arithmetic: 12,614,399.98777…
    expect(Math.round(r.futureValue)).toBe(1_26_14_400);
    expect(Math.round(r.gains)).toBe(81_14_400);
  });

  it("is internally consistent: FV = P × multiplier, gains = FV − invested", () => {
    const r = sipFutureValue({ monthly: 7_500, annualRate: 9.5, years: 23 });
    expect(r.futureValue).toBeCloseTo(r.monthly * r.multiplier, 6);
    expect(r.gains).toBeCloseTo(r.futureValue - r.invested, 6);
    expect(r.growthFactor).toBeCloseTo(Math.pow(1 + 9.5 / 1200, 276), 10);
  });

  it("returns exactly the money put in at 0%", () => {
    const r = sipFutureValue({ monthly: 5_000, annualRate: 0, years: 3 });
    expect(r.futureValue).toBe(1_80_000);
    expect(r.gains).toBe(0);
  });

  it("handles tiny and huge inputs without overflow", () => {
    expect(sipFutureValue({ monthly: 1, annualRate: 0.01, years: 1 }).futureValue).toBeGreaterThan(12);
    const big = sipFutureValue({ monthly: 10_00_000, annualRate: 30, years: 40 });
    expect(Number.isFinite(big.futureValue)).toBe(true);
  });

  it("rounds fractional years to whole months", () => {
    expect(sipFutureValue({ monthly: 1000, annualRate: 10, years: 2.5 }).months).toBe(30);
  });

  it("rejects negative and non-numeric input", () => {
    expect(() => sipFutureValue({ monthly: -1, annualRate: 12, years: 1 })).toThrow(RangeError);
    expect(() => sipFutureValue({ monthly: NaN, annualRate: 12, years: 1 })).toThrow(RangeError);
    expect(() => sipFutureValue({ monthly: 1, annualRate: Infinity, years: 1 })).toThrow(RangeError);
  });

  it("sipForGoal inverts sipFutureValue", () => {
    const p = sipForGoal(20_00_000, 11, 5);
    expect(sipFutureValue({ monthly: p, annualRate: 11, years: 5 }).futureValue).toBeCloseTo(20_00_000, 4);
    expect(sipForGoal(12_000, 0, 1)).toBe(1_000);
  });
});

describe("emi", () => {
  it("matches the textbook reference: ₹10 lakh, 10%, 20 years → ₹9,650.22", () => {
    const r = emi({ principal: 10_00_000, annualRate: 10, years: 20 });
    expect(r.emi).toBeCloseTo(9_650.22, 2);
  });

  it("computes the §3 home loan: ₹50 lakh, 8.5%, 20 years", () => {
    const r = emi({ principal: 50_00_000, annualRate: 8.5, years: 20 });
    expect(Math.round(r.emi)).toBe(43_391);
    expect(Math.round(r.totalInterest)).toBe(54_13_879);
    expect(r.totalPayment).toBeCloseTo(r.emi * 240, 6);
    expect(r.totalInterest).toBeCloseTo(r.totalPayment - r.principal, 6);
  });

  it("splits principal evenly at 0%", () => {
    const r = emi({ principal: 1_20_000, annualRate: 0, years: 1 });
    expect(r.emi).toBe(10_000);
    expect(r.totalInterest).toBe(0);
  });

  it("rejects zero tenure and bad input", () => {
    expect(() => emi({ principal: 1, annualRate: 8, years: 0 })).toThrow(RangeError);
    expect(() => emi({ principal: -5, annualRate: 8, years: 1 })).toThrow(RangeError);
    expect(() => emi({ principal: 5, annualRate: NaN, years: 1 })).toThrow(RangeError);
  });

  it("amortisation pays the loan to zero and sums to the total interest", () => {
    const input = { principal: 50_00_000, annualRate: 8.5, years: 20 };
    const rows = amortiseByYear(input);
    expect(rows).toHaveLength(20);
    expect(rows.at(-1)!.closingBalance).toBeCloseTo(0, 2);
    const interest = rows.reduce((s, r) => s + r.interestPaid, 0);
    expect(interest).toBeCloseTo(emi(input).totalInterest, 2);
    // Early years are mostly interest.
    expect(rows[0].interestPaid).toBeGreaterThan(rows[0].principalPaid);
  });
});

describe("format", () => {
  it("uses Indian grouping", () => {
    expect(formatINR(16_460_996)).toBe("₹1,64,60,996");
    expect(formatINR(999.6)).toBe("₹1,000");
    expect(formatINR(0)).toBe("₹0");
  });

  it("uses lakh and crore short forms, never K or M", () => {
    expect(formatINRShort(16_460_996)).toBe("₹1.65 Cr");
    expect(formatINRShort(45_00_000)).toBe("₹45.0 L");
    expect(formatINRShort(2_50_000)).toBe("₹2.50 L");
    expect(formatINRShort(9_650)).toBe("₹9,650");
    expect(formatINRShort(-3_00_00_000)).toBe("−₹3.00 Cr");
    expect(formatINRShort(1_00_00_000_000)).not.toMatch(/[KM]/);
  });

  it("speaks amounts for screen readers", () => {
    expect(formatINRSpoken(1_26_14_400)).toBe("1.26 crore rupees");
  });

  it("parses typed input defensively", () => {
    expect(parseNumericInput("₹25,000")).toBe(25_000);
    expect(parseNumericInput(" 12.5 % ")).toBe(12.5);
    expect(parseNumericInput("abc")).toBeNull();
    expect(parseNumericInput("")).toBeNull();
    expect(parseNumericInput(".")).toBeNull();
    expect(parseNumericInput("1e9")).toBeNull();
    expect(parseNumericInput("1.2.3")).toBeNull();
  });

  it("clamps and snaps", () => {
    expect(clamp(50, 0, 30)).toBe(30);
    expect(clamp(-2, 0, 30)).toBe(0);
    expect(snapToStep(8.537, 0, 0.05)).toBe(8.55);
    expect(snapToStep(26_200, 500, 500)).toBe(26_000);
  });
});
