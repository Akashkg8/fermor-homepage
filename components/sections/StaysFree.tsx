const EARNS = [
  ["Advertising", "Ads appear on some pages and are always labelled as ads."],
  [
    "Affiliate links",
    "Some links to banks or platforms are affiliate links. They are labelled, and Fermor may earn a fee if you sign up through one.",
  ],
  ["No fees", "No paid tier for calculators or articles, and no charge to use them."],
];

const IS_NOT = [
  "A SEBI-registered investment adviser",
  "An AMFI-registered mutual fund distributor",
  "An IRDAI-registered insurance agent",
  "A seller of any financial product",
];

export function StaysFree() {
  return (
    <section
      id="how-fermor-stays-free"
      aria-labelledby="free-title"
      className="section border-t border-rule bg-paper"
    >
      <div className="wrap">
        <div className="prose-col">
          <h2 id="free-title">How Fermor stays free</h2>
          <p className="mt-4 text-[1.0625rem] text-ink-soft">
            Everything on Fermor is for education and information. Here is how it is paid for, and what it is not.
          </p>
        </div>

        <div className="mt-10 grid border-y border-ink md:grid-cols-2">
          <div className="py-6 md:pr-10">
            <h3 className="text-[1.25rem] font-bold">How Fermor earns</h3>
            <dl className="ruled mt-4">
              {EARNS.map(([t, d]) => (
                <div key={t} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-semibold">{t}</dt>
                  <dd className="text-ink-soft">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-rule py-6 md:border-t-0 md:border-l md:pl-10">
            <h3 className="text-[1.25rem] font-bold">What Fermor is not</h3>
            <ul className="ruled mt-4">
              {IS_NOT.map((t) => (
                <li key={t} className="flex gap-3 py-3">
                  <span aria-hidden="true" className="text-graphite">
                    ✕
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-[65ch] text-ink-soft">
          <strong className="text-ink">Your inputs stay on your device.</strong> Calculations run in your browser, and
          nothing is stored unless you choose to save a result. Decisions, and any advice you want on them, stay with you.
        </p>
      </div>
    </section>
  );
}
