import { ARTICLES } from "@/content/articles";
import { SITE } from "@/content/site";

const date = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function Analysis() {
  return (
    <section id="analysis" aria-labelledby="analysis-title" className="section border-rule border-t">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="prose-col">
            <h2 id="analysis-title">Analysis</h2>
            <p className="text-ink-soft mt-3 text-[1.0625rem]">
              Long reads on tax, payments and markets, written to be checked rather than skimmed.
            </p>
          </div>
          <a href={SITE.blogsUrl} className="link font-semibold">
            Read all analysis
          </a>
        </div>

        <ol className="ruled border-rule mt-8 border-y">
          {ARTICLES.map((a) => (
            <li key={a.href}>
              <article className="group grid gap-2 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
                <p className="text-note text-graphite">
                  <span className="text-ink font-semibold">{a.topic}</span>
                  <br className="hidden md:block" />
                  <span className="md:hidden"> · </span>
                  <time dateTime={a.published}>{date.format(new Date(a.published))}</time> · {a.readMinutes} min read
                </p>
                <div className="max-w-[48rem]">
                  <h3 className="text-[1.25rem] leading-snug font-semibold">
                    <a
                      href={a.href}
                      className="decoration-accent/50 group-hover:text-accent underline-offset-4 hover:underline"
                    >
                      {a.title}
                    </a>
                  </h3>
                  <p className="text-ink-soft mt-2">{a.dek}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
