# Fermor homepage redesign (concept)

> **This is an assignment concept, not an official Fermor site.** Fermor's name, mark and article titles belong to Fermor Technologies Pvt. Ltd.

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # finance unit tests (Vitest)
npm run build && npm run test:e2e   # Playwright smoke + axe (uses system Chrome; PW_CHANNEL="" for bundled Chromium)
```

Optional: set `WAITLIST_WEBHOOK_URL` (Formspree, Google Apps Script, a CRM endpoint) to store waitlist sign-ups. Without it, the form validates the address and says on the page that this build does not store it. Set `NEXT_PUBLIC_SITE_URL` for metadata and sitemap URLs on a preview deploy.

---

## The problem with the old homepage

The live homepage tells two stories. The hero sells an investing app ("Invest, track and plan in one place", stock prices, "Invest Now"). The FAQ and footer describe a free calculator and education service that is not an adviser or distributor. A first-time visitor can't tell which Fermor is, and the hero makes promises the product doesn't keep.

## Positioning decision

> Fermor shows you the math behind every money decision in India — free, private, and without selling you anything. The app (coming soon) does the same with your own numbers.

**Headline:** *Every money decision, worked out in the open.* It names the subject (money decisions) and the differentiator (showing the working) in one line. "Worked out" is how Indian students say *show your working*, so the headline and the signature visual say the same thing.

I rejected "See the math. Then decide." because its two clipped fragments read as template copy and never name the domain. I rejected "Do the math before you make the money move" because it is long and "money move" leans growth-speak.

## Section by section

| # | Section | Why it is there |
|---|---|---|
| 1 | Nav | Four in-page anchors, no dead links. "Ask" carries a *coming to the app* badge. The mobile menu is a Radix Dialog sheet. |
| 2 | Hero | A working SIP / home-loan EMI calculator **is** the hero visual. Results sit in the main column. The **rough-work margin** shows the formula with the user's numbers substituted, from the same result object the headline figure uses. On mobile it sits behind *Show working*. |
| 3 | Why the math gets hidden | A short argument, then a live ₹50 lakh / 20-year loan. One rate input re-computes the EMI, total interest and a hand-built SVG of each year's principal vs interest, with direct labels, printed assumptions and a text description for screen readers. |
| 4 | Understand. Act. Grow. | A true sequence across one financial year, so stepped layout and month labels are honest, not decoration. Each step links to a real calculator. The ₹20 lakh goal figure is computed. The persona is labelled as an example, not a customer. |
| 5 | What are you deciding? | 29 real calculator URLs grouped by life moment, as a ruled index rather than a card grid. |
| 6 | Every formula, every assumption | The EMI calculator's full method, a reproducible check (`=PMT(10%/12, 240, -1000000)`), browser-only computation, and how tax rules are dated. |
| 7 | How Fermor stays free | A plain ledger: labelled ads and affiliates, and what Fermor is not (SEBI RIA, AMFI distributor, IRDAI agent, product seller). |
| 8 | The app, coming soon | The only dark section, marking "not live yet". Three feature previews built in code, each tagged *example data*, with every figure computed. Email capture with explicit consent. |
| 9 | Analysis | Three real finance articles (title, date and read time from fermor.in). Sport and utility posts are excluded. |
| 10 | FAQ | Radix accordion. Fermor's five live answers, edited, plus two (how Fermor earns, what the app does). Also emitted as FAQPage JSON-LD. |
| 11 | Final CTA + footer | Full calculator index, a plain-language disclosure, and the concept note. |

## Design tokens

| Token | Hex | Use |
|---|---|---|
| chalk | `#EEF1F4` | page |
| paper | `#F8FAFC` | raised surfaces, rough-work margin |
| ink | `#152238` | text, primary buttons, logo tile, app section |
| graphite | `#5E6775` | rough work, secondary text (5.1:1 on chalk) |
| accent | `#2347C6` | links, focus, active tab, slider |
| gain / loss | `#0F7B5F` / `#B42318` | **data only** |
| mint | `#75FB90` | **logo only** |

**Reconciling with the real logo.** The mark (`fermor-mark-2026.svg`) is mint. Mint on chalk is about 1.3:1, so it cannot carry text or controls, and it would collide with the gain colour. It appears only on an ink tile, and ink-blue is the interface accent.

**Type.** Schibsted Grotesk (variable, real italics) via `next/font` with a metric-matched fallback, so fonts cause no layout shift. Italic is used for margin annotations. Noto Sans Devanagari is a non-preloaded fallback for Hindi and Marathi titles.

**Radii by hierarchy.** 0 for rules and the margin, 4px for controls, 6px for buttons, 10px for containers, and a pill only for the slider thumb and the app badge.

**Motion.** There is one orchestrated moment. As a hero input changes, the result tweens and each substituted term in the derivation draws an underline in derivation order (P → i → n → result). Everything else moves only on user action: accordion, tabs. `prefers-reduced-motion` turns all of it off.

## What is real vs "coming to the app"

**Real today on fermor.in:**
- the calculators linked here;
- the articles;
- the FAQ answers;
- browser-side calculation;
- the ad and affiliate model.

**Coming to the app, and labelled that way everywhere:**
- Ask;
- the health check;
- goal forecasts;
- the net-worth view;
- spending categories.

The preview panels use a fictional example household, and every number in them is computed by `lib/finance`.

## Engineering notes

- `lib/finance/` is pure TypeScript with no UI imports: SIP (annuity-due), goal SIP, EMI, yearly amortisation, and Indian formatting (`₹1,64,60,996`, `₹1.65 Cr`, never K or M).
- **Unit tests.** 18 Vitest cases:
  - reference values: ₹10,000 × 10 years × 12% → ₹23,23,391; ₹10 lakh × 10% × 20 years → ₹9,650.22;
  - the hero default, cross-checked with 40-digit decimal arithmetic;
  - edge cases: 0% rate, zero tenure, NaN, Infinity, negatives, huge inputs, and parsing typed text like `₹25,000` or `12 %`.
- **Playwright.** Run on desktop 1280 and mobile 375. It checks:
  - one h1;
  - the calculator recomputes, and the rough work shows the reference value;
  - keyboard tab switching;
  - invalid input is flagged;
  - the waitlist round trip;
  - a banned-phrase scan;
  - no horizontal scroll;
  - axe WCAG 2.2 AA, with zero violations.
- **Accessibility.**
  - Each slider is paired with a labelled `inputmode="decimal"` field.
  - Controls have 44px+ targets and visible focus.
  - A polite live region announces the result once input settles, not on every slider tick.
  - The chart has a title and description.
  - There is a skip link.
- **Metadata.** A generated OG image (rendered from the same finance function), an SVG favicon from the real mark, robots, a sitemap, and Organization + FAQPage JSON-LD.

## Known trade-offs

- **Tax-rule upkeep.** I don't know Fermor's internal process, so section 6 states a principle (tax tools name their financial year; this concept assumes FY 2026-27) instead of inventing one.
- **Calculator count.** The brief said 20+, but fermor.in/calculators listed 158 distinct pages on 4 Oct 2026. The page says "150+", which stays true if a few are retired.
- **Waitlist storage.** It needs `WAITLIST_WEBHOOK_URL`. The page is honest when it isn't set.
- **Tabular figures.** These apply to figures (results, derivation terms, the animated numbers), not to body prose. Schibsted's `tnum` also widens commas and full stops, so separators are kept proportional with a `.sep` span.
- **Dark mode.** There is no site-wide dark theme. The palette is designed as a single light system, with one deliberate dark section for the app.
- **Lighthouse.** Not run in this environment: the browser download is blocked here, so tests use the system Chrome. The build is fully static except `/api/waitlist`, with no images, no client-side data fetching, and only the calculator, chart, nav, FAQ and form hydrated. Run `npx lighthouse http://localhost:3000 --preset=desktop` (and mobile) to verify the ≥95 target.
- **Critique pass.** I removed a duplicated exact-rupee line under the hero result (the rough work already shows it). I also fixed a mobile overflow that the first test missed, because an emulated phone zooms out to fit; the test now compares against the configured viewport.
