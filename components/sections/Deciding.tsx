import { LIFE_MOMENTS } from "@/content/calculators";
import { SITE } from "@/content/site";

export function Deciding() {
  return (
    <section id="calculators" aria-labelledby="deciding-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="deciding-title">What are you deciding?</h2>
          <a href={SITE.calculatorsUrl} className="link font-semibold">
            Browse all {SITE.calculatorCount} calculators
          </a>
        </div>

        <ul className="ruled mt-8 border-y border-rule">
          {LIFE_MOMENTS.map((m) => (
            <li key={m.id} className="grid gap-3 py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
              <div>
                <h3 className="text-[1.25rem] font-bold">{m.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-graphite italic">{m.question}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-x-1 gap-y-1">
                {m.links.map((l, i) => (
                  <li key={l.href} className="flex items-center">
                    <a
                      href={l.href}
                      className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] px-2 font-medium decoration-accent/50 underline-offset-4 hover:bg-paper hover:text-accent hover:underline"
                    >
                      {l.label}
                    </a>
                    {i < m.links.length - 1 && (
                      <span aria-hidden="true" className="text-rule-strong">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
