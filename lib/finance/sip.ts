/**
 * SIP future value, monthly contributions made at the start of each month
 * (annuity-due), which is how Indian mutual fund SIP calculators quote it.
 *
 *   FV = P × [((1 + i)^n − 1) / i] × (1 + i)
 *   i  = annualRate / 12 / 100
 *   n  = years × 12
 */

export interface SipInput {
  /** Monthly contribution in rupees. */
  monthly: number;
  /** Expected annual return, in percent (12 means 12% p.a.). */
  annualRate: number;
  /** Duration in years. Fractional years are rounded to whole months. */
  years: number;
}

export interface SipResult {
  monthly: number;
  annualRate: number;
  /** i — monthly rate as a decimal. */
  monthlyRate: number;
  /** n — number of monthly instalments. */
  months: number;
  /** (1 + i)^n */
  growthFactor: number;
  /** [((1 + i)^n − 1) / i] × (1 + i), or n when i = 0. */
  multiplier: number;
  futureValue: number;
  invested: number;
  gains: number;
}

export const SIP_LIMITS = {
  monthly: { min: 500, max: 10_00_000, step: 500 },
  annualRate: { min: 0, max: 30, step: 0.5 },
  years: { min: 1, max: 40, step: 1 },
} as const;

function assertFiniteNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite, non-negative number`);
  }
}

export function sipFutureValue({ monthly, annualRate, years }: SipInput): SipResult {
  assertFiniteNonNegative("monthly", monthly);
  assertFiniteNonNegative("annualRate", annualRate);
  assertFiniteNonNegative("years", years);

  const months = Math.round(years * 12);
  const monthlyRate = annualRate / 12 / 100;
  const growthFactor = Math.pow(1 + monthlyRate, months);
  // At 0% the bracket is 0/0; its limit is n and the (1 + i) term is 1.
  const multiplier = monthlyRate === 0 ? months : ((growthFactor - 1) / monthlyRate) * (1 + monthlyRate);

  const futureValue = monthly * multiplier;
  const invested = monthly * months;

  return {
    monthly,
    annualRate,
    monthlyRate,
    months,
    growthFactor,
    multiplier,
    futureValue,
    invested,
    gains: futureValue - invested,
  };
}

/** Monthly SIP needed to reach `goal` — the same formula solved for P. */
export function sipForGoal(goal: number, annualRate: number, years: number): number {
  assertFiniteNonNegative("goal", goal);
  const { multiplier } = sipFutureValue({ monthly: 0, annualRate, years });
  return multiplier === 0 ? 0 : goal / multiplier;
}
