/**
 * Equated monthly instalment on a reducing-balance loan with monthly rests.
 *
 *   EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 *   r   = annualRate / 12 / 100
 *   n   = years × 12
 */

export interface EmiInput {
  /** Loan amount in rupees. */
  principal: number;
  /** Annual interest rate, in percent. */
  annualRate: number;
  /** Tenure in years. Fractional years are rounded to whole months. */
  years: number;
}

export interface EmiResult {
  principal: number;
  annualRate: number;
  /** r — monthly rate as a decimal. */
  monthlyRate: number;
  /** n — number of monthly instalments. */
  months: number;
  /** (1 + r)^n */
  growthFactor: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

export const EMI_LIMITS = {
  principal: { min: 50_000, max: 5_00_00_000, step: 50_000 },
  annualRate: { min: 0, max: 20, step: 0.05 },
  years: { min: 1, max: 30, step: 1 },
} as const;

function assertFiniteNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite, non-negative number`);
  }
}

export function emi({ principal, annualRate, years }: EmiInput): EmiResult {
  assertFiniteNonNegative("principal", principal);
  assertFiniteNonNegative("annualRate", annualRate);
  assertFiniteNonNegative("years", years);

  const months = Math.round(years * 12);
  if (months === 0) {
    throw new RangeError("tenure must be at least one month");
  }

  const monthlyRate = annualRate / 12 / 100;
  const growthFactor = Math.pow(1 + monthlyRate, months);
  // At 0% the formula is 0/0; the loan is simply repaid in equal parts.
  const instalment =
    monthlyRate === 0 ? principal / months : (principal * monthlyRate * growthFactor) / (growthFactor - 1);

  const totalPayment = instalment * months;

  return {
    principal,
    annualRate,
    monthlyRate,
    months,
    growthFactor,
    emi: instalment,
    totalPayment,
    totalInterest: totalPayment - principal,
  };
}

export interface YearBalance {
  year: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

/** Year-by-year split of each year's EMIs into principal and interest. */
export function amortiseByYear(input: EmiInput): YearBalance[] {
  const { emi: instalment, monthlyRate, months } = emi(input);
  const rows: YearBalance[] = [];
  let balance = input.principal;
  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const principalPart = Math.min(instalment - interest, balance);
    balance -= principalPart;
    const yearIndex = Math.ceil(m / 12) - 1;
    rows[yearIndex] ??= { year: yearIndex + 1, principalPaid: 0, interestPaid: 0, closingBalance: 0 };
    rows[yearIndex].principalPaid += principalPart;
    rows[yearIndex].interestPaid += interest;
    rows[yearIndex].closingBalance = Math.max(balance, 0);
  }
  return rows;
}
