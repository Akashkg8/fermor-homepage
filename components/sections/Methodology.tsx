import { emi } from "@/lib/finance";
import { formatGrouped, formatINR, formatTrimmed } from "@/lib/finance/format";
import { SITE, calc } from "@/content/site";

// A worked check row, computed at build time from the same function.
const check = emi({ principal: 10_00_000, annualRate: 10, years: 20 });

export function Methodology() {
  return (
    <section aria-labelledby="method-title" className="section border-rule border-t">
      <div className="wrap grid-1 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="prose-col">
          <h2 id="method-title">Every formula, every assumption</h2>
          <p className="text-ink-soft mt-5 text-[1.0625rem]">
            If you keep your own spreadsheet, you should be able to rebuild any Fermor number from what is on the page.
            Here is the EMI calculator, in full.
          </p>
          <dl className="mt-8 grid gap-6">
            <div>
              <dt className="font-bold">It runs in your browser</dt>
              <dd className="text-ink-soft mt-1">
                The arithmetic happens on your device as you type. Nothing you enter is sent anywhere unless you choose
                to save a result to an account.
              </dd>
            </div>
            <div>
              <dt className="font-bold">Tax rules carry a date</dt>
              <dd className="text-ink-soft mt-1">
                Slabs, rebates and cess change with each Budget. A tax calculator should say which year&apos;s rules it
                applies. This concept assumes {SITE.taxYear}; you can check any slab against the Income Tax
                Department&apos;s published rates at incometax.gov.in.
              </dd>
            </div>
            <div>
              <dt className="font-bold">Edge cases are handled, not hidden</dt>
              <dd className="text-ink-soft mt-1">
                A 0% rate, a one-month tenure and out-of-range input each have a defined answer, and the same unit tests
                check them.
              </dd>
            </div>
          </dl>
        </div>

        <div className="rough border-rule self-start rounded-[0] border text-[0.9375rem]">
          <p className="rough-label">
            EMI calculator, method ·{" "}
            <a href={calc("emi-calculator")} className="link not-italic">
              open it
            </a>
          </p>
          <ol className="marker:text-graphite list-decimal pl-6">
            <li>Monthly rate: r = annual rate ÷ 12 ÷ 100</li>
            <li>Instalments: n = years × 12</li>
            <li>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</li>
            <li>If r = 0, EMI = P ÷ n</li>
            <li>Total paid = EMI × n; interest = total paid − P</li>
            <li>Each month: interest = balance × r; the rest of the EMI reduces the balance</li>
          </ol>
          <p className="rough-label mt-3">Check it yourself</p>
          <div className="overflow-x-auto">
            <p className="whitespace-nowrap">
              P = {formatGrouped(check.principal)}, {formatTrimmed(check.annualRate, 2)}%, {check.months / 12} yrs
            </p>
            <p className="whitespace-nowrap">
              → EMI = <strong>{formatINR(check.emi)}</strong> (₹{formatTrimmed(check.emi, 2)})
            </p>
            <p className="whitespace-nowrap">
              → interest = <strong>{formatINR(check.totalInterest)}</strong>
            </p>
          </div>
          <p className="rough-note mt-2">
            Assumes a fixed rate for the full term, monthly rests and no prepayment. Money is rounded only for display;
            every step above uses full precision. In a spreadsheet: =PMT(10%/12, 240, -1000000).
          </p>
        </div>
      </div>
    </section>
  );
}
