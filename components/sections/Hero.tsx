import { HeroCalculator } from "@/components/calculator/HeroCalculator";

const FACTS = ["Free to use", "No sign-up", "Every formula shown"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="wrap pt-8 pb-16 md:pt-14 lg:pb-24">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
        <h1
          id="hero-title"
          className="text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.035em]"
        >
          Every money decision, worked out in the open.
        </h1>
        <div className="lg:pb-1.5">
          <p className="prose-col text-lead text-ink-soft">
            Free calculators for loans, tax, SIPs and retirement in India, with every formula and assumption shown.
            No sign-up, nothing to sell you.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#app" className="btn btn-primary">
              Get my health check
            </a>
            <a href="#calculators" className="link min-h-11 content-center font-semibold">
              Try a calculator
            </a>
          </div>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] text-graphite lg:mt-8" aria-label="What to expect">
        {FACTS.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
              <path d="M1 5.2l3.2 3L11 1.5" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <HeroCalculator />
      </div>
    </section>
  );
}
