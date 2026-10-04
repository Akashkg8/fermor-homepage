export interface Article {
  title: string;
  href: string;
  dek: string;
  /** ISO date published, from the article's own structured data. */
  published: string;
  readMinutes: number;
  topic: string;
}

/**
 * Real Fermor articles (titles, dates and read times from fermor.in/blogs,
 * 4 Oct 2026). Finance-only: sport and utility posts are left out on purpose.
 */
export const ARTICLES: Article[] = [
  {
    title: "Section 87A Rebate: Limit, Marginal Relief (FY 2025-26)",
    href: "https://fermor.in/blogs/section-87a-rebate",
    dek: "₹60,000 up to ₹12 lakh under the new regime, ₹12,500 up to ₹5 lakh under the old one, with a worked marginal-relief example.",
    published: "2026-07-29",
    readMinutes: 11,
    topic: "Tax",
  },
  {
    title: "UPI Charges Above Rs 2,000: New MDR Rule Explained",
    href: "https://fermor.in/blogs/upi-charges-above-2000",
    dek: "A 0.4% MDR applies to select merchant payments from 15 October 2026, capped at ₹300. Sending money and small shop payments stay free.",
    published: "2026-09-22",
    readMinutes: 13,
    topic: "Payments",
  },
  {
    title: "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down",
    href: "https://fermor.in/blogs/sensex-nifty-crash-september-2026",
    dek: "Crude above $107, US bond yields at multi-year highs, rate-hike odds before the October MPC and a weaker rupee, taken one at a time.",
    published: "2026-09-29",
    readMinutes: 13,
    topic: "Markets",
  },
];
