import { sipForGoal } from "@/lib/finance";
import { formatINR } from "@/lib/finance/format";
import { calc } from "@/content/site";

// The Grow step's figure is computed, not written in: ₹20 lakh in 5 years at 11%.
const GOAL = 20_00_000;
const GOAL_YEARS = 5;
const GOAL_RATE = 11;
const monthlyForGoal = sipForGoal(GOAL, GOAL_RATE, GOAL_YEARS);

const STEPS = [
  {
    month: "April",
    stage: "Understand",
    question: "Which tax regime leaves more in my account?",
    body: "Her offer letter quotes CTC. She runs her salary through both regimes with her actual HRA and 80C, and sees the difference in rupees a month, not as a slab table.",
    cta: "Open the old vs new tax regime calculator",
    href: calc("old-vs-new-tax-regime-calculator"),
  },
  {
    month: "October",
    stage: "Act",
    question: "The bonus came in. Prepay the education loan, or start a SIP?",
    body: "She compares the interest a prepayment saves with what the same money might grow to, at a rate she chooses, and sees how close the two are.",
    cta: "Open the loan prepayment calculator",
    href: calc("loan-prepayment-calculator"),
  },
  {
    month: "March",
    stage: "Grow",
    question: "Can I have ₹20 lakh for a down payment in five years?",
    body: `At an assumed ${GOAL_RATE}% a year, it takes about ${formatINR(monthlyForGoal)} a month. She sets a smaller SIP, plans a yearly step-up, and checks again next March.`,
    cta: "Open the goal planning calculator",
    href: calc("goal-planning-calculator"),
  },
];

export function PersonYear() {
  return (
    <section aria-labelledby="year-title" className="section border-rule border-t">
      <div className="wrap">
        <div className="prose-col">
          <h2 id="year-title">Understand. Act. Grow. One person&apos;s year.</h2>
          <p className="text-ink-soft mt-4 text-[1.0625rem]">
            An example, not a customer story: Meera, 27, first job in Pune. Three decisions across one financial year,
            each worked out with one calculator.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 lg:gap-0 lg:[--indent:5rem]">
          {STEPS.map((s, i) => (
            <li
              key={s.stage}
              className="border-ink relative grid gap-2 border-l-2 pl-5 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6 md:border-l-0 md:pl-0"
              style={{ ["--step" as string]: i }}
            >
              <div className="md:border-rule md:border-r md:pr-6 md:text-right">
                <p className="text-note text-graphite">{s.month}</p>
                <p className="text-lead font-bold">{s.stage}</p>
              </div>
              <div
                className="max-w-[40rem] pb-2 lg:pb-10"
                style={{ marginLeft: `calc(var(--step) * var(--indent, 0rem))` }}
              >
                <h3 className="text-[1.25rem] leading-snug font-semibold">{s.question}</h3>
                <p className="text-ink-soft mt-2">{s.body}</p>
                <a href={s.href} className="link mt-3 inline-flex min-h-11 items-center font-semibold">
                  {s.cta}
                </a>
              </div>
            </li>
          ))}
        </ol>
        <p className="rough-note mt-2">
          The ₹20 lakh figure uses the SIP formula above, solved for the monthly amount: {GOAL_YEARS} years, {GOAL_RATE}
          % a year assumed, compounded monthly. Illustrative only.
        </p>
      </div>
    </section>
  );
}
