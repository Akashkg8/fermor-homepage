import { EVERYDAY, LIFE_MOMENTS } from "@/content/calculators";
import { SITE, calc } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="section border-t border-rule">
      <div className="wrap grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="prose-col">
          <h2 id="final-title">Work one decision out now.</h2>
          <p className="mt-3 text-[1.0625rem] text-ink-soft">
            Pick the number you are least sure about. It takes under a minute, and you will see every step.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={calc("emi-calculator")} className="btn btn-primary">
            Open the EMI calculator
          </a>
          <a href="#app" className="btn btn-secondary">
            Get my health check
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink bg-paper pt-12 pb-10">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-[0.9375rem] text-graphite">Understand. Act. Grow.</p>
        </div>

        <nav aria-label="Calculator index" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {LIFE_MOMENTS.map((m) => (
            <div key={m.id}>
              <h2 className="text-[0.9375rem] font-bold tracking-normal">{m.title}</h2>
              <ul className="mt-2 grid gap-0.5 text-[0.9375rem]">
                {m.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="inline-block py-1.5 text-ink-soft hover:text-accent hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-[0.9375rem] font-bold tracking-normal">Everyday</h2>
            <ul className="mt-2 grid gap-0.5 text-[0.9375rem]">
              {EVERYDAY.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-block py-1.5 text-ink-soft hover:text-accent hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={SITE.calculatorsUrl} className="link inline-block py-1.5 font-semibold">
                  All {SITE.calculatorCount}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-12 grid gap-6 border-t border-rule pt-6 text-note text-graphite md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid max-w-[75ch] gap-2">
            <p>
              <strong className="text-ink">Disclosure.</strong> Fermor is for education and information only. Fermor is
              not a SEBI-registered investment adviser, not an AMFI-registered mutual fund distributor and not an
              IRDAI-registered insurance agent, and nothing here is a recommendation to buy or sell anything. Every
              projection is illustrative and depends on the assumptions shown with it; markets do not move in straight
              lines. Fermor earns from labelled advertising and labelled affiliate links.
            </p>
            <p>
              <strong className="text-ink">{SITE.conceptNote}</strong> Fermor&apos;s name, mark and article titles belong
              to {SITE.legalName}.
            </p>
          </div>
          <div className="grid content-start gap-1">
            <p>
              Contact and legal pages:{" "}
              <a href={SITE.origin} className="link">
                fermor.in
              </a>
            </p>
            <p>
              © {year} {SITE.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
