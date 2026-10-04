import { sipForGoal, sipFutureValue } from "@/lib/finance";
import { formatINR, formatINRShort, formatTrimmed } from "@/lib/finance/format";
import { ComingBadge } from "@/components/ui/ComingBadge";
import { WaitlistForm } from "./WaitlistForm";

/* Example household — every derived figure below is computed from these. */
const EX = {
  takeHome: 1_40_000,
  expenses: 62_000,
  emiAsked: 45_000,
  emergencyFund: 2_60_000,
  goal: 20_00_000,
  goalYears: 5,
  goalRate: 11,
};

const emiShare = EX.emiAsked / EX.takeHome;
const leftOver = EX.takeHome - EX.expenses - EX.emiAsked;
const fundMonths = EX.emergencyFund / EX.expenses;
const savingsRate = (EX.takeHome - EX.expenses) / EX.takeHome;
const goalSip = sipForGoal(EX.goal, EX.goalRate, EX.goalYears);
const goalPath = Array.from({ length: EX.goalYears + 1 }, (_, y) =>
  y === 0 ? 0 : sipFutureValue({ monthly: goalSip, annualRate: EX.goalRate, years: y }).futureValue,
);

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="flex min-w-[17.5rem] flex-1 snap-start flex-col rounded-[var(--radius-container)] border border-[#33445f] bg-[#1b2a44] text-on-ink">
      <figcaption className="flex items-center justify-between border-b border-[#33445f] px-4 py-2.5 text-[0.9375rem] font-semibold">
        {title}
        <span className="text-note font-normal text-on-ink-muted italic">example data</span>
      </figcaption>
      <div className="flex-1 p-4">{children}</div>
    </figure>
  );
}

function Meter({ label, value, of, display }: { label: string; value: number; of: number; display: string }) {
  const pct = Math.min(value / of, 1) * 100;
  return (
    <div>
      <div className="flex justify-between text-[0.9375rem]">
        <span className="text-on-ink-muted">{label}</span>
        <span className="font-semibold">{display}</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-[2px] bg-[#33445f]" aria-hidden="true">
        <div className="h-full rounded-[2px] bg-on-ink" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function GoalChart() {
  const W = 260;
  const H = 120;
  const pad = { l: 4, r: 4, t: 14, b: 18 };
  const max = EX.goal * 1.05;
  const x = (i: number) => pad.l + (i / EX.goalYears) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const d = goalPath.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label={`Projected value reaches ${formatINRShort(goalPath.at(-1)!)} in year ${EX.goalYears}, against a ${formatINRShort(EX.goal)} goal.`}>
      <line x1={pad.l} x2={W - pad.r} y1={y(EX.goal)} y2={y(EX.goal)} stroke="var(--color-on-ink-muted)" strokeDasharray="3 3" />
      <text x={pad.l} y={y(EX.goal) - 4} fontSize="10" fill="var(--color-on-ink-muted)">
        goal {formatINRShort(EX.goal)}
      </text>
      <path d={d} fill="none" stroke="var(--color-on-ink)" strokeWidth="2" />
      {goalPath.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="var(--color-on-ink)" />
      ))}
      {goalPath.map((_, i) =>
        i % 1 === 0 ? (
          <text key={`t${i}`} x={x(i)} y={H - 4} fontSize="10" textAnchor={i === 0 ? "start" : i === EX.goalYears ? "end" : "middle"} fill="var(--color-on-ink-muted)">
            {i === 0 ? "now" : `yr ${i}`}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function AppPreview() {
  const connected = Boolean(process.env.WAITLIST_WEBHOOK_URL);

  return (
    <section id="app" aria-labelledby="app-title" className="on-ink section bg-ink text-on-ink">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <ComingBadge className="text-on-ink-muted" />
            <h2 id="app-title" className="mt-4 text-paper">
              Same honest math, with your own numbers.
            </h2>
            <p className="mt-4 max-w-[60ch] text-[1.0625rem] text-on-ink-muted">
              The Fermor app is in development. It will add up what you have, show where your money goes, forecast your
              goals and answer questions using your own data, with the working shown the way it is here. The first thing
              you get is a free financial health check.
            </p>
            <div className="mt-8">
              <WaitlistForm connected={connected} />
            </div>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0" role="group" aria-label="Previews of app features, with example data">
            <Panel title="Ask">
              <p className="rounded-[var(--radius-control)] bg-[#26375a] px-3 py-2 text-[0.9375rem]">
                Can I afford a {formatINR(EX.emiAsked)} EMI?
              </p>
              <p className="mt-3 text-[0.9375rem]">
                It would take {formatTrimmed(emiShare * 100, 1)}% of your take-home pay. After it and your usual spending,{" "}
                <strong>{formatINR(leftOver)}</strong> a month is left.
              </p>
              <div className="mt-3 border-l-2 border-[#33445f] pl-3 text-note text-on-ink-muted italic">
                {formatINR(EX.emiAsked)} ÷ {formatINR(EX.takeHome)} = {formatTrimmed(emiShare * 100, 1)}%
                <br />
                {formatINR(EX.takeHome)} − {formatINR(EX.expenses)} − {formatINR(EX.emiAsked)} = {formatINR(leftOver)}
              </div>
            </Panel>

            <Panel title="Health check">
              <div className="grid gap-4">
                <Meter
                  label="Emergency fund"
                  value={fundMonths}
                  of={6}
                  display={`${formatTrimmed(fundMonths, 1)} of 6 months`}
                />
                <Meter
                  label="Saved each month"
                  value={savingsRate}
                  of={1}
                  display={`${formatTrimmed(savingsRate * 100, 0)}% of income`}
                />
                <Meter label="EMIs today" value={0} of={1} display="None" />
              </div>
              <p className="mt-4 text-note text-on-ink-muted italic">
                Six months of expenses is a common rule of thumb, shown for reference, not as a target set for you.
              </p>
            </Panel>

            <Panel title="Goal forecast">
              <p className="text-[0.9375rem]">
                Down payment, {formatINRShort(EX.goal)} in {EX.goalYears} years
              </p>
              <p className="mt-1 text-lead font-bold">{formatINR(goalSip)} a month</p>
              <GoalChart />
              <p className="mt-1 text-note text-on-ink-muted italic">
                Assumes {EX.goalRate}% a year, compounded monthly. Illustrative.
              </p>
            </Panel>

            <div className="hidden min-w-[17.5rem] flex-1 content-center rounded-[var(--radius-container)] border border-dashed border-[#33445f] p-5 text-[0.9375rem] text-on-ink-muted lg:grid">
              <p>
                Also planned: a net-worth view across accounts, and spending sorted into categories you can correct. None
                of this is live yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
