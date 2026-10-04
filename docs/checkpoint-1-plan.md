# Checkpoint 1 — plan (awaiting approval)

> Assignment concept. Not an official Fermor site.

Sources checked on 4 Oct 2026: `fermor.in/fermor-mark-2026.svg`, `fermor.in/`, `fermor.in/calculators`, `fermor.in/blogs`.

---

## 1. Positioning

Fermor is a free personal-finance workbench for India. It shows the arithmetic behind loans, tax, SIPs and retirement, with the formula, your numbers and the assumptions printed next to every result. Fermor runs on labelled ads and affiliate links. It is not an adviser or a distributor, so it has no product to push you towards. Calculations run in your browser and need no sign-up. The app (coming soon) applies the same open arithmetic to your own accounts. The homepage commits to that one story. It drops the investing-app hero ("Invest Now", stock tickers) that contradicts the FAQ and the footer.

**Headline:** *Every money decision, worked out in the open.*

**Subline:** *Free calculators for loans, tax, SIPs and retirement in India, with every formula and assumption shown. No sign-up, nothing to sell you.*

**Why this headline over the alternatives**

- It names the subject ("money decision") and the differentiator ("worked out in the open") in one line, which is the 5-second test.
- "Worked out" is how an Indian student says *show your working*. It sets up the rough-work margin, so the headline and the signature visual say the same thing.
- "See the math. Then decide." is two clipped fragments. That rhythm reads as template copy, and it never says what domain Fermor is in.
- "Do the math before you make the money move" says "money move", which is close to growth-hacker voice, and it is long.

**Trust facts under the CTA (all verifiable):** Free to use · No sign-up · Every formula shown

---

## 2. Token system

### Colour

The mark is mint `#75FB90` on transparent. Mint on chalk has a contrast ratio of about 1.3:1, so it cannot carry text, buttons or focus. It is also a green that would collide with the `gain` data colour. **Decision:** mint is used only for the logo, which always sits on an ink tile. Ink-blue is the interface accent, and the logo stays the only "brand green" on the page.

| Token | Hex | Role | Contrast on chalk |
|---|---|---|---|
| `--chalk` | `#EEF1F4` | page background | — |
| `--paper` | `#F8FAFC` | raised surface (calculator, margin, panels) | — |
| `--ink` | `#152238` | text, logo tile, primary button fill | ~14.9:1 |
| `--graphite` | `#5E6775` | rough work, secondary text | ~5.1:1 (AA) |
| `--rule` | `#CBD2DB` | hairlines, notebook ruling, input borders (3:1 vs paper on inputs via `--rule-strong #8A94A3`) | — |
| `--accent` | `#2347C6` | links, focus ring, slider fill, active tab | ~6.9:1 |
| `--gain` | `#0F7B5F` | data only (returns, corpus growth) | ~4.9:1 |
| `--loss` | `#B42318` | data only (interest paid, cost drag) | ~6.0:1 |
| `--mint` | `#75FB90` | logo mark only, on `--ink` | n/a |

Dark ground: only the app preview section (§8) sits on `--ink`, with paper-coloured text. There is no site-wide dark mode, because the brief's palette is a single light design. *(Trade-off noted in the README.)*

### Type

- **Schibsted Grotesk** (variable 400–800, real italics) via `next/font/google`, with `display: swap` and `adjustFontFallback` to stop layout shift. **First build step:** confirm the `tnum` feature exists in the font. If it doesn't, I'll tell you before swapping.
- Italic of the same family for margin annotations ("assumes 12% p.a., compounded monthly").
- `Noto Sans Devanagari` loaded only for the Hindi/Marathi article title, subset `devanagari`.
- `font-variant-numeric: tabular-nums` set globally on `body`.

Scale (1.25 ratio, 16px base, `rem`):

| Step | Size | Use |
|---|---|---|
| −1 | 0.8125rem / 13px | margin notes, legal |
| 0 | 1rem / 16px | body (max 68ch) |
| 1 | 1.25rem / 20px | lead, card titles |
| 2 | 1.5625rem / 25px | h3 |
| 3 | clamp(1.75rem, 3vw, 2.44rem) | h2 |
| 4 | clamp(2.25rem, 5vw, 3.5rem) | h1 (one only) |
| num | clamp(2rem, 4vw, 3rem), weight 700 | the hero result figure |

### Spacing

4px base: `1=4 2=8 3=12 4=16 6=24 8=32 12=48 16=64 24=96`. Section padding is 64px on mobile and 96px on desktop. Page gutter is 16px on mobile, 24px on tablet, and auto-centred 1200px at desktop.

### Radii by hierarchy (deliberately not one radius)

| Level | Radius | Applies to |
|---|---|---|
| Structural | 0 | rules, tables, rough-work margin, section dividers |
| Control | 4px | inputs, tabs, chips, accordion rows |
| Action | 6px | buttons |
| Container | 10px | hero calculator, app-preview frames |
| Pill | 999px | slider thumb and the "coming to the app" badge only |

### Signature: the rough-work margin

- It's a quieter column to the right of every result, on `--paper` with faint 28px horizontal ruling (`--rule` at 40%).
- A double vertical hairline on its left edge stands in for an exercise-book margin, drawn in graphite rather than red, so red stays reserved for `loss`.
- The formula is set in roman type and the user's substituted values in ink. Annotations are in graphite italic.
- It's used in the hero, §3 and §6. Nowhere else, so it stays special.

### Motion

The single orchestrated moment is in the hero. When a slider moves, the result tweens (Motion `animate`, 250ms) and each substituted term in the formula flashes an accent underline in sequence (P → i → n → FV, 40ms stagger). Everything else animates only in response to input: accordion height, tab underline. `prefers-reduced-motion` turns off every tween, and numbers snap.

---

## 3. Wireframes

Legend: `[ ]` button · `▭` input · `═` slider · `┆` rough-work margin

### 1 · Nav
```
DESKTOP 1280
┌──────────────────────────────────────────────────────────────────────────┐
│ [■ Fermor]   Calculators   Analysis   Ask ‹coming to the app›   About    │
│                                                  [ Get early access ]    │
└──────────────────────────────────────────────────────────────────────────┘
MOBILE 375
┌─────────────────────────────────────┐
│ [■ Fermor]       [Get early access] ☰│   ☰ opens a top sheet (Radix Dialog):
└─────────────────────────────────────┘   links stacked, 48px rows, close ✕
```
All links point to real pages: `/calculators` and `/blogs` go to fermor.in. Ask and About are on-page anchors (`#app`, `#how-fermor-stays-free`).

### 2 · Hero: the decision, worked out
```
DESKTOP
┌───────────────────────────────┬──────────────────────────────────────────┐
│ Every money decision,         │ ┌ SIP │ EMI ┐───────────────┬┆ Rough work │
│ worked out in the open.  (h1) │ │ Monthly SIP  ═══●══ ▭25,000│┆ FV = P × [((1+i)^n − 1)/i] × (1+i)
│                               │ │ Return p.a.  ══●═══ ▭12 %  │┆    = 25,000 × [((1.01)^180 − 1)/0.01] × 1.01
│ Free calculators for loans,   │ │ Years        ═══●══ ▭15    │┆    = ₹1,26,14,226
│ tax, SIPs and retirement...   │ │                            │┆ i = 12 ÷ 12 ÷ 100 = 0.01
│                               │ │ You'd have      ₹1.26 Cr   │┆ n = 15 × 12 = 180
│ ✓Free ✓No sign-up ✓Formula    │ │ You put in       ₹45.0 L   │┆ ‹illustrative; assumes a constant
│ [Get my health check]         │ │ Growth           ₹81.1 L   │┆  return, contributions at the start
│ Try a calculator              │ │ [Open the SIP calculator]  │┆  of each month›
└───────────────────────────────┴─┴────────────────────────────┴┴────────────┘
MOBILE
┌─────────────────────────────────────┐
│ Every money decision, worked out    │
│ in the open.                        │
│ subline (2–3 lines)                 │
│ [ Get my health check ]  (full w)   │
│ ┌ SIP │ EMI ┐──────────────────────┐ │
│ │ Monthly SIP   ▭ 25,000          │ │  numeric input beside label,
│ │ ════════●═══════                │ │  slider below; 44px targets
│ │ Return p.a.   ▭ 12 %            │ │
│ │ ═════●══════════                │ │
│ │ Years         ▭ 15              │ │
│ │ You'd have         ₹1.26 Cr     │ │  aria-live="polite"
│ │ ▸ Show working  (disclosure)    │ │  → reveals the same margin, stacked
│ │ [Open the SIP calculator]       │ │
│ └─────────────────────────────────┘ │
│ Try a calculator · trust facts      │
└─────────────────────────────────────┘
```
Note: the substituted line shows the exact values `sipFutureValue()` returns. The margin and the result both read from one result object.

### 3 · Why the math gets hidden
```
DESKTOP
┌──────────────────────────────┬───────────────────────────────────────────┐
│ h2 Why the math gets hidden  │  ₹50 lakh home loan · 20 years · 8.5% p.a.│
│ 3 short paragraphs: products │  ████████████████████ Principal ₹50.0 L   │
│ are sold on the monthly      │  ████████████████▌    Interest  ₹54.1 L   │  ← hand-built SVG bars,
│ figure; the total is in the  │  EMI ₹43,391 · total ₹1.04 Cr             │    direct labels
│ fine print.                  │  ┆ rate slider 7–11% (re-computes)        │
│                              │  ┆ assumptions printed under chart        │
└──────────────────────────────┴───────────────────────────────────────────┘
MOBILE: text first, chart full-width below, assumptions under it, sr-only text summary.
```
All figures come from `emi()` at render time. One control (the rate) keeps it a demonstration, not a second calculator.

### 4 · Understand → Act → Grow: one person's year (true sequence)
```
DESKTOP  (stepped: each step indented one column further, connected by a hairline)
 Meera, 27, first job in Pune  ← a named persona, not a testimonial; labelled "an example"
 ┌ April · Understand ──────────────┐
 │ "Which tax regime leaves me more?"│ → Open the old vs new tax regime calculator
 └──────────────────────────────────┘
        ┌ September · Act ───────────────────┐
        │ "Bonus: prepay the loan or start a  │ → Open the loan prepayment calculator
        │  SIP?"                              │
        └─────────────────────────────────────┘
               ┌ March · Grow ───────────────────┐
               │ "Am I on track for a ₹20 L down │ → Open the goal planning calculator
               │  payment by 32?"                │
               └─────────────────────────────────┘
MOBILE: vertical timeline, month labels on a left rule.
```

### 5 · What are you deciding?
```
DESKTOP — a two-column list, not a card grid
 h2 What are you deciding?
 ─────────────────────────────────────────────────────────────
 Starting your first job     In-hand salary · CTC · Old vs new regime · HRA · First SIP
 ─────────────────────────────────────────────────────────────
 Buying a home               Home loan EMI · Prepayment · Rent vs buy · Stamp duty · Eligibility
 ─────────────────────────────────────────────────────────────
 Filing tax                  Income tax · 87A rebate (article) · 80C · 80D · Advance tax
 ─────────────────────────────────────────────────────────────
 Your child's education      Education corpus · Child education planner · SSY · Education loan EMI
 ─────────────────────────────────────────────────────────────
 Retirement                  Retirement corpus · NPS · PPF · EPF · SWP · FIRE
 ─────────────────────────────────────────────────────────────
 Browse all 150+ calculators (fermor.in/calculators)
MOBILE: each life moment becomes a <details> row; links wrap as inline text.
```

### 6 · Every formula, every assumption
```
DESKTOP
┌─────────────────────────────┬──────────────────────────────────────────┐
│ h2 Every formula, every     │ ┆ EMI calculator — methodology            │
│ assumption                  │ ┆ 1. r = annual rate ÷ 12 ÷ 100           │
│ • Runs in your browser:     │ ┆ 2. EMI = P·r·(1+r)^n / ((1+r)^n − 1)    │
│   nothing is sent while you │ ┆ 3. Total interest = EMI·n − P           │
│   type                      │ ┆ 4. 0% rate → EMI = P ÷ n                │
│ • Tax rules: which FY rules │ ┆ Assumes: fixed rate, no prepayment,     │
│   each tax tool uses        │ ┆ monthly rests, EMI rounded only for     │
│   ‹INPUT NEEDED›            │ ┆ display.                                │
└─────────────────────────────┴──────────────────────────────────────────┘
MOBILE: stacked; methodology is an ordered list in the margin style.
```

### 7 · How Fermor stays free
```
DESKTOP — a plain two-column ledger, not icon cards
 h2 How Fermor stays free
 ┌ How we earn ──────────────────────┬ What Fermor is not ─────────────────┐
 │ Ads, always labelled "Ad"         │ Not a SEBI-registered adviser       │
 │ Affiliate links, always labelled  │ Not an AMFI-registered distributor  │
 │ No fees, no paid tier for the     │ Not an IRDAI agent                  │
 │ calculators                       │ Not selling you any product         │
 └───────────────────────────────────┴─────────────────────────────────────┘
 Your inputs: calculated in your browser, stay on your device unless you save.
MOBILE: the two columns stack.
```

### 8 · The app, coming soon (on ink)
```
DESKTOP
┌────────────────────────────────────────────────────────────────────────────┐
│ ‹coming to the app›                                                        │
│ h2 Same honest math, with your own numbers.                                │
│ ┌ Ask ─────────────────┐ ┌ Health check ───────┐ ┌ Goal forecast ─────┐    │  ← 3 UI states built
│ │ Q: "Can I afford a    │ │ Emergency fund       │ │ Down payment ₹20 L │    │    in code, each with
│ │  ₹45k EMI?"           │ │ ███████░░ 4.2 of 6 mo│ │ on track by 2031   │    │    "Example data" tag
│ │ A: worked answer with │ │ EMI-to-income  31%   │ │ (SVG line)         │    │
│ │  the margin attached  │ │ ...                  │ │                    │    │
│ └───────────────────────┘ └──────────────────────┘ └────────────────────┘    │
│ Get a free financial health check when the app opens.                      │
│ ▭ you@example.com   [Get my health check]                                  │
│ We'll email you once when the app opens, then only about the app.          │
│ Unsubscribe in one click. No sharing.                                      │
└────────────────────────────────────────────────────────────────────────────┘
MOBILE: the previews become a horizontal snap-scroll *inside* their own container
(no page scroll), and the form sits above them so the CTA is reached first.
```
Example figures in the previews are computed with the same finance module and labelled "example data".

### 9 · Analysis
```
DESKTOP — three entries in a ruled list with date, title, a one-line dek, and read time
 Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down
 UPI Charges Above Rs 2,000: New MDR Rule Explained
 GST Rates in India: Complete List of Tax Slabs Under GST 2.0
 Read all analysis (fermor.in/blogs)
MOBILE: the same list, single column.
```
Excluded as non-finance: FIFA, T20I, gas booking, PM-KISAN (a government scheme, borderline).

### 10 · FAQ
Radix Accordion, single-open, full-width rows with a 44px+ hit area, and a `+`/`−` glyph drawn in CSS. It uses the five real Fermor answers, lightly edited, plus two more: "How does Fermor make money?" and "What will the app do?"

### 11 · Final CTA + footer
```
 h2 Run one decision now.  [Open the EMI calculator]  [Get my health check]
 ────────────────────────────────────────────────────────────────────────────
 Footer: calculator index in 5 columns (by life moment, same data as §5)
 Legal: Fermor Technologies Pvt. Ltd. · educational, not advice · not SEBI/AMFI/IRDAI ·
        "This page is an assignment concept, not an official Fermor site."
 Contact: ‹INPUT NEEDED›
MOBILE: index columns collapse into <details> groups.
```

---

## 4. Self-review: what looked generic, and what changed

| Generic pattern I caught in my own first draft | Change |
|---|---|
| A 3-up feature grid (Free / Private / Transparent) with icons | Folded into one line of trust facts under the CTA. No icons. |
| "Calculators by life moment" as a bento grid of identical cards | A ruled two-column list, like a book index. |
| Disclosure section as icon cards | A two-column ledger with no icons. |
| App preview as a floating phone mockup | Three flat UI panels in code, no device chrome, each tagged "Example data". |
| A gradient or mint glow behind the hero | Removed. Mint is logo-only, and the hero's visual weight is the working calculator. |
| Eyebrow labels above every h2 | None. The only small label is the "coming to the app" badge, and it carries meaning. |
| Fade-up on every section | Removed. One orchestrated motion in the hero, nothing on scroll. |
| A persona in §4 that could read as a testimonial | Labelled "an example" with no photo or quote marks, and phrased as decisions, not praise. |
| "→" on every link | Arrows only on the two links that leave fermor.in. In-page links have none. |
| Step numbers | Months (April / September / March) replace 01/02/03, because the sequence is real. |

---

## 5. Inputs I need from you (flagged)

1. **Waitlist email destination.** No backend exists for this concept. Options:
   - (a) a Next.js route handler that validates and forwards to a webhook URL you give me (Formspree, Google Apps Script, Resend audience…) via the `WAITLIST_WEBHOOK_URL` env var;
   - (b) a route handler that validates and returns success without storing. The UI states clearly that it is a concept, so there are no fake claims.

   Without one of these, the form cannot really "work".
2. **Calculator count.** The brief says "20+". fermor.in/calculators lists about 158 today. Use **"150+"** (verifiable) or keep "20+"?
3. **Tax-rule upkeep (§6).** I don't know Fermor's actual process. Should I state only "uses FY 2026-27 slabs; check the date shown on each tax calculator", or do you have the real process?
4. **Contact** for the footer: a real Fermor email/address, or link to fermor.in's own contact page?
5. **Git.** The folder isn't a repo. I'll `git init` and commit in logical steps unless you object.

Workspace note: the only pre-existing item was an empty 0-byte file named `app`. It has been deleted. The tree is now just this plan.
