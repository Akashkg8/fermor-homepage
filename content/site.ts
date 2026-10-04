export const SITE = {
  name: "Fermor",
  legalName: "Fermor Technologies Pvt. Ltd.",
  origin: "https://fermor.in",
  /**
   * Counted from fermor.in/calculators on 4 Oct 2026 (158 distinct pages).
   * Stated as "150+" so it stays true if a page is retired.
   */
  calculatorCount: "150+",
  calculatorsUrl: "https://fermor.in/calculators",
  blogsUrl: "https://fermor.in/blogs",
  /** Tax calculators in this concept cite the rules for this year. */
  taxYear: "FY 2026-27",
  conceptNote: "This page is an assignment concept, not an official Fermor site.",
} as const;

export const calc = (slug: string) => `${SITE.origin}/calculators/${slug}`;
