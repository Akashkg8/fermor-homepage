"use client";

import type { EmiResult, SipResult } from "@/lib/finance";
import { formatGrouped, formatINR, formatTrimmed } from "@/lib/finance/format";
import { Term } from "./Term";

/*
 * Every figure here is read from the same result object the headline number
 * uses. Nothing is recomputed for display; only rounding for print.
 */

const rate = (r: number) => formatTrimmed(r, 7);
const factor = (f: number) => formatTrimmed(f, 4);

function Line({ children, indent = false }: { children: React.ReactNode; indent?: boolean }) {
  return <div className={`whitespace-nowrap ${indent ? "pl-[1.6em]" : ""}`}>{children}</div>;
}

export function SipWorking({ r }: { r: SipResult }) {
  const P = formatGrouped(r.monthly);
  const zero = r.monthlyRate === 0;
  return (
    <div className="text-[0.875rem]">
      <p className="rough-label">Future value of a monthly SIP</p>
      <Line>FV = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)</Line>
      <Line>
        i = {formatTrimmed(r.annualRate, 2)} ÷ 12 ÷ 100 = <Term value={rate(r.monthlyRate)} order={1} />
      </Line>
      <Line>
        n = {Math.round(r.months / 12)} × 12 = <Term value={String(r.months)} order={2} />
      </Line>
      {zero ? (
        <>
          <Line>i = 0, so the bracket becomes n</Line>
          <Line>
            FV = <Term value={P} order={0} /> × {r.months}
          </Line>
        </>
      ) : (
        <>
          <Line>
            (1 + i)ⁿ = {formatTrimmed(1 + r.monthlyRate, 7)}
            <sup>{r.months}</sup> = <Term value={factor(r.growthFactor)} order={3} />
          </Line>
          <Line>
            FV = <Term value={P} order={0} /> × [({factor(r.growthFactor)} − 1) ÷ {rate(r.monthlyRate)}] ×{" "}
            {formatTrimmed(1 + r.monthlyRate, 7)}
          </Line>
          <Line indent>
            = {P} × <Term value={factor(r.multiplier)} order={4} />
          </Line>
        </>
      )}
      <Line indent>
        = <Term value={formatINR(r.futureValue)} order={5} strong />
      </Line>
      <p className="rough-note mt-1 whitespace-normal">
        Illustrative. Assumes a constant {formatTrimmed(r.annualRate, 2)}% a year, compounded monthly, with each
        instalment paid at the start of the month. Market returns vary year to year; this is arithmetic, not a
        forecast.
      </p>
    </div>
  );
}

export function EmiWorking({ r }: { r: EmiResult }) {
  const P = formatGrouped(r.principal);
  const zero = r.monthlyRate === 0;
  return (
    <div className="text-[0.875rem]">
      <p className="rough-label">Equated monthly instalment</p>
      <Line>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</Line>
      <Line>
        r = {formatTrimmed(r.annualRate, 2)} ÷ 12 ÷ 100 = <Term value={rate(r.monthlyRate)} order={1} />
      </Line>
      <Line>
        n = {Math.round(r.months / 12)} × 12 = <Term value={String(r.months)} order={2} />
      </Line>
      {zero ? (
        <Line>
          r = 0, so EMI = <Term value={P} order={0} /> ÷ {r.months}
        </Line>
      ) : (
        <>
          <Line>
            (1 + r)ⁿ = <Term value={factor(r.growthFactor)} order={3} />
          </Line>
          <Line>
            EMI = <Term value={P} order={0} /> × {rate(r.monthlyRate)} × {factor(r.growthFactor)} ÷{" "}
            {formatTrimmed(r.growthFactor - 1, 4)}
          </Line>
        </>
      )}
      <Line indent>
        = <Term value={formatINR(r.emi)} order={4} strong />
      </Line>
      <Line>
        Interest = EMI × n − P = <Term value={formatINR(r.totalInterest)} order={5} />
      </Line>
      <p className="rough-note mt-1 whitespace-normal">
        Illustrative. Assumes the rate stays at {formatTrimmed(r.annualRate, 2)}% for the full term, monthly rests
        and no prepayment. Floating rates move with the lender&apos;s benchmark.
      </p>
    </div>
  );
}
