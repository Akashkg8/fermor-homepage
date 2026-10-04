"use client";

import { useMemo, useState } from "react";
import { amortiseByYear, emi } from "@/lib/finance";
import { formatINR, formatINRShort, formatTrimmed } from "@/lib/finance/format";
import { NumberField } from "@/components/calculator/NumberField";

const PRINCIPAL = 50_00_000;
const YEARS = 20;

/** Year-by-year stacked columns: what each year's EMIs actually paid for. */
function YearChart({ rate }: { rate: number }) {
  const rows = useMemo(() => amortiseByYear({ principal: PRINCIPAL, annualRate: rate, years: YEARS }), [rate]);
  const yearTotal = rows[0].principalPaid + rows[0].interestPaid;
  const W = 640;
  const H = 240;
  const top = 28;
  const bottom = 26;
  const left = 4;
  const plotH = H - top - bottom;
  const colW = (W - left) / rows.length;
  const bar = colW * 0.66;
  const y = (v: number) => (v / yearTotal) * plotH;

  const first = rows[0];
  const crossover = rows.find((r) => r.principalPaid > r.interestPaid);

  return (
    <figure className="mt-6">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[30rem]" role="img" aria-labelledby="hm-chart-title hm-chart-desc">
          <title id="hm-chart-title">Where each year&apos;s EMIs go</title>
          <desc id="hm-chart-desc">
            In year 1 of a {formatTrimmed(rate, 2)}% loan, {formatINR(first.interestPaid)} of the{" "}
            {formatINR(yearTotal)} paid goes to interest and {formatINR(first.principalPaid)} reduces the loan.
            {crossover
              ? ` Principal overtakes interest only in year ${crossover.year}.`
              : " Interest stays larger than principal for the whole term."}
          </desc>
          {rows.map((r, i) => {
            const x = left + i * colW + (colW - bar) / 2;
            const hI = y(r.interestPaid);
            const hP = y(r.principalPaid);
            return (
              <g key={r.year}>
                <rect x={x} y={top + plotH - hP} width={bar} height={hP} fill="var(--color-ink)" />
                <rect x={x} y={top + plotH - hP - hI} width={bar} height={hI} fill="var(--color-loss)" />
                {(r.year === 1 || r.year % 5 === 0) && (
                  <text x={x + bar / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--color-graphite)">
                    Yr {r.year}
                  </text>
                )}
              </g>
            );
          })}
          {/* Direct labels instead of a legend */}
          <text x={left + 2} y={top - 10} fontSize="13" fontWeight="600" fill="var(--color-loss)">
            Interest
          </text>
          <text x={W - 4} y={top + plotH - 8} textAnchor="end" fontSize="13" fontWeight="600" fill="var(--color-paper)">
            Principal
          </text>
          {crossover && (
            <g>
              <line
                x1={left + (crossover.year - 1) * colW}
                x2={left + (crossover.year - 1) * colW}
                y1={top - 6}
                y2={top + plotH}
                stroke="var(--color-graphite)"
                strokeDasharray="3 3"
              />
              <text x={left + (crossover.year - 1) * colW + 6} y={top - 10} fontSize="12" fontStyle="italic" fill="var(--color-graphite)">
                principal overtakes interest in year {crossover.year}
              </text>
            </g>
          )}
        </svg>
      </div>
      <figcaption className="rough-note mt-2">
        Each column is one year of EMIs ({formatINR(yearTotal)}). ₹50 lakh over 20 years at {formatTrimmed(rate, 2)}%
        a year, monthly rests, rate fixed for the full term, no prepayment. Illustrative.
      </figcaption>
    </figure>
  );
}

export function HiddenMath() {
  const [rate, setRate] = useState(8.5);
  const r = useMemo(() => emi({ principal: PRINCIPAL, annualRate: rate, years: YEARS }), [rate]);
  const interestShare = r.totalInterest / r.principal;

  return (
    <section aria-labelledby="hidden-title" className="section border-t border-rule">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="prose-col">
          <h2 id="hidden-title">Why the math gets hidden</h2>
          <div className="mt-5 grid gap-4 text-[1.0625rem] text-ink-soft">
            <p>
              A loan is sold on its monthly figure. A fund is sold on its best year. The number that decides whether
              it was a good deal, the total, is usually in a table you are not shown.
            </p>
            <p>
              That is not always deliberate. Totals are large and uncomfortable, and an EMI fits on a banner. But
              when you only see the monthly figure, it is hard to compare a lower rate against a shorter tenure, or
              to see what prepaying would save.
            </p>
            <p>So Fermor puts the total next to the instalment, every time. Here is a common one.</p>
          </div>
        </div>

        <div>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-graphite">₹50 lakh home loan over 20 years</p>
              <p className="mt-2 text-[clamp(1.5rem,3vw,2rem)] leading-tight font-bold tracking-[-0.02em]">
                EMI {formatINR(r.emi)}
              </p>
              <p className="mt-1 text-lead">
                Interest paid: <strong className="text-loss">{formatINRShort(r.totalInterest)}</strong>
                <span className="text-graphite">
                  {" "}
                  ({formatTrimmed(interestShare * 100, 0)}% of what you borrowed)
                </span>
              </p>
            </div>
            <div className="w-full sm:w-64">
              <NumberField
                label="Interest rate"
                suffix="% p.a."
                decimals={2}
                value={rate}
                min={6}
                max={12}
                step={0.05}
                valueText={(v) => `${formatTrimmed(v, 2)} percent a year`}
                onChange={setRate}
              />
            </div>
          </div>
          <YearChart rate={rate} />
        </div>
      </div>
    </section>
  );
}
