"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useMemo, useState } from "react";
import { EMI_LIMITS, SIP_LIMITS, emi, sipFutureValue } from "@/lib/finance";
import { formatGrouped, formatINR, formatINRShort, formatINRSpoken, formatTrimmed } from "@/lib/finance/format";
import { calc } from "@/content/site";
import { AnimatedNumber } from "./AnimatedNumber";
import { NumberField } from "./NumberField";
import { EmiWorking, SipWorking } from "./RoughWork";

type Mode = "sip" | "emi";

const years = (n: number) => `${n} ${n === 1 ? "year" : "years"}`;
const pct = (n: number) => `${formatTrimmed(n, 2)} percent a year`;

/** Announce once the user pauses, not on every slider tick. */
function useSettled<T>(value: T, ms = 600): T {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setSettled(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return settled;
}

function Split({
  a,
  b,
  aLabel,
  bLabel,
  bClass,
}: {
  a: number;
  b: number;
  aLabel: string;
  bLabel: string;
  bClass: string;
}) {
  const total = a + b;
  const aPct = total > 0 ? (a / total) * 100 : 100;
  return (
    <div aria-hidden="true" className="mt-4">
      <div className="flex h-2 overflow-hidden rounded-[2px] bg-rule">
        <div className="bg-graphite transition-[width] duration-300 ease-out motion-reduce:transition-none" style={{ width: `${aPct}%` }} />
        <div className={`flex-1 ${bClass}`} />
      </div>
      <div className="mt-1.5 flex justify-between text-note text-graphite">
        <span>{aLabel}</span>
        <span>{bLabel}</span>
      </div>
    </div>
  );
}

export function HeroCalculator() {
  const [mode, setMode] = useState<Mode>("sip");
  const [sip, setSip] = useState({ monthly: 25_000, annualRate: 12, years: 15 });
  const [loan, setLoan] = useState({ principal: 50_00_000, annualRate: 8.5, years: 20 });
  const [showWorking, setShowWorking] = useState(false);

  const sipR = useMemo(() => sipFutureValue(sip), [sip]);
  const emiR = useMemo(() => emi(loan), [loan]);

  const announcement = useSettled(
    mode === "sip"
      ? `Estimated value after ${years(sip.years)}: ${formatINRSpoken(sipR.futureValue)}, of which ${formatINRSpoken(sipR.gains)} is growth.`
      : `Monthly EMI: ${formatGrouped(emiR.emi)} rupees. Total interest over ${years(loan.years)}: ${formatINRSpoken(emiR.totalInterest)}.`,
  );

  const workingId = "hero-working";

  return (
    <Tabs.Root
      value={mode}
      onValueChange={(v) => setMode(v as Mode)}
      className="overflow-hidden rounded-[var(--radius-container)] border border-rule bg-paper shadow-[0_1px_0_rgb(21_34_56/0.04),0_12px_32px_-18px_rgb(21_34_56/0.25)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-4 border-b border-rule px-4 pt-3 md:px-5">
        <Tabs.List aria-label="Choose a calculation" className="flex gap-1">
          {(
            [
              ["sip", "Monthly SIP"],
              ["emi", "Home loan EMI"],
            ] as const
          ).map(([value, label]) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="relative -mb-px min-h-11 rounded-t-[var(--radius-control)] border-b-2 border-transparent px-3 font-semibold text-graphite transition-colors hover:text-ink data-[state=active]:border-accent data-[state=active]:text-ink"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <a
          href={mode === "sip" ? calc("sip-calculator") : calc("emi-calculator")}
          className="link hidden pb-3 text-[0.9375rem] font-medium sm:inline"
        >
          {mode === "sip" ? "Open the full SIP calculator" : "Open the full EMI calculator"}
        </a>
      </div>

      <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Inputs */}
        <div className="grid content-start gap-3 px-4 py-5 md:px-5">
          <Tabs.Content value="sip" className="grid gap-3 focus-visible:outline-none" tabIndex={-1}>
            <NumberField
              label="Monthly SIP"
              prefix="₹"
              value={sip.monthly}
              {...SIP_LIMITS.monthly}
              valueText={(v) => `${formatGrouped(v)} rupees a month`}
              onChange={(monthly) => setSip((s) => ({ ...s, monthly }))}
            />
            <NumberField
              label="Expected return"
              suffix="% p.a."
              decimals={2}
              value={sip.annualRate}
              {...SIP_LIMITS.annualRate}
              valueText={pct}
              onChange={(annualRate) => setSip((s) => ({ ...s, annualRate }))}
            />
            <NumberField
              label="Time period"
              suffix="years"
              value={sip.years}
              {...SIP_LIMITS.years}
              valueText={years}
              onChange={(y) => setSip((s) => ({ ...s, years: y }))}
            />
          </Tabs.Content>
          <Tabs.Content value="emi" className="grid gap-3 focus-visible:outline-none" tabIndex={-1}>
            <NumberField
              label="Loan amount"
              prefix="₹"
              value={loan.principal}
              {...EMI_LIMITS.principal}
              valueText={(v) => formatINRSpoken(v)}
              onChange={(principal) => setLoan((s) => ({ ...s, principal }))}
            />
            <NumberField
              label="Interest rate"
              suffix="% p.a."
              decimals={2}
              value={loan.annualRate}
              {...EMI_LIMITS.annualRate}
              valueText={pct}
              onChange={(annualRate) => setLoan((s) => ({ ...s, annualRate }))}
            />
            <NumberField
              label="Loan tenure"
              suffix="years"
              value={loan.years}
              {...EMI_LIMITS.years}
              valueText={years}
              onChange={(y) => setLoan((s) => ({ ...s, years: y }))}
            />
          </Tabs.Content>
        </div>

        {/* Result */}
        <div className="border-t border-rule px-4 py-5 md:border-t-0 md:border-l md:px-5">
          {mode === "sip" ? (
            <>
              <p className="text-[0.9375rem] text-graphite">In {years(sip.years)}, this could grow to</p>
              <p className="mt-1 text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                <AnimatedNumber value={sipR.futureValue} format={formatINRShort} />
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.9375rem]">
                <div>
                  <dt className="text-graphite">You put in</dt>
                  <dd className="font-semibold">
                    <AnimatedNumber value={sipR.invested} format={formatINRShort} />
                  </dd>
                </div>
                <div>
                  <dt className="text-graphite">Growth</dt>
                  <dd className="font-semibold text-gain">
                    <AnimatedNumber value={sipR.gains} format={formatINRShort} />
                  </dd>
                </div>
              </dl>
              <Split
                a={sipR.invested}
                b={sipR.gains}
                aLabel="Contributions"
                bLabel="Growth"
                bClass="bg-gain"
              />
            </>
          ) : (
            <>
              <p className="text-[0.9375rem] text-graphite">Your monthly EMI</p>
              <p className="mt-1 text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                <AnimatedNumber value={emiR.emi} format={formatINR} />
              </p>
              <p className="mt-0.5 text-note text-graphite">for {emiR.months} months</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.9375rem]">
                <div>
                  <dt className="text-graphite">Total interest</dt>
                  <dd className="font-semibold text-loss">
                    <AnimatedNumber value={emiR.totalInterest} format={formatINRShort} />
                  </dd>
                </div>
                <div>
                  <dt className="text-graphite">You repay</dt>
                  <dd className="font-semibold">
                    <AnimatedNumber value={emiR.totalPayment} format={formatINRShort} />
                  </dd>
                </div>
              </dl>
              <Split
                a={emiR.principal}
                b={emiR.totalInterest}
                aLabel="Principal"
                bLabel="Interest"
                bClass="bg-loss"
              />
            </>
          )}
          <button
            type="button"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-accent md:hidden"
            aria-expanded={showWorking}
            aria-controls={workingId}
            onClick={() => setShowWorking((v) => !v)}
          >
            <span aria-hidden="true" className={`inline-block transition-transform ${showWorking ? "rotate-90" : ""}`}>
              ▸
            </span>
            {showWorking ? "Hide working" : "Show working"}
          </button>
          <a
            href={mode === "sip" ? calc("sip-calculator") : calc("emi-calculator")}
            className="link mt-1 block text-[0.9375rem] font-medium sm:hidden"
          >
            {mode === "sip" ? "Open the full SIP calculator" : "Open the full EMI calculator"}
          </a>
        </div>

        {/* Rough-work margin */}
        <section
          id={workingId}
          aria-label="Working"
          className={`rough overflow-x-auto border-t border-rule md:col-span-2 md:block lg:col-span-1 lg:border-t-0 lg:border-l ${showWorking ? "block" : "hidden"}`}
        >
          {mode === "sip" ? <SipWorking r={sipR} /> : <EmiWorking r={emiR} />}
        </section>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </Tabs.Root>
  );
}
