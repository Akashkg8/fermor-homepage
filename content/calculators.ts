import { calc } from "./site";

export interface CalculatorLink {
  label: string;
  href: string;
}

export interface LifeMoment {
  id: string;
  title: string;
  /** The question a visitor in this moment is actually asking. */
  question: string;
  links: CalculatorLink[];
}

/** Every slug below exists on fermor.in/calculators (checked 4 Oct 2026). */
export const LIFE_MOMENTS: LifeMoment[] = [
  {
    id: "first-job",
    title: "Starting your first job",
    question: "What actually lands in my account, and which tax regime keeps more of it?",
    links: [
      { label: "In-hand salary", href: calc("in-hand-salary-calculator") },
      { label: "CTC breakdown", href: calc("ctc-calculator") },
      { label: "Old vs new tax regime", href: calc("old-vs-new-tax-regime-calculator") },
      { label: "HRA exemption", href: calc("hra-calculator") },
      { label: "First SIP", href: calc("sip-calculator") },
      { label: "Emergency fund", href: calc("emergency-fund-calculator") },
    ],
  },
  {
    id: "home",
    title: "Buying a home",
    question: "What will this loan really cost, and should I prepay or invest?",
    links: [
      { label: "Home loan EMI", href: calc("home-loan-calculator") },
      { label: "Loan prepayment", href: calc("home-loan-prepayment-calculator") },
      { label: "Rent vs buy", href: calc("rent-vs-buy-calculator") },
      { label: "Home loan eligibility", href: calc("home-loan-eligibility-calculator") },
      { label: "Stamp duty", href: calc("stamp-duty-calculator") },
      { label: "Down payment planner", href: calc("down-payment-planner-calculator") },
    ],
  },
  {
    id: "tax",
    title: "Filing tax",
    question: "How much do I owe, and what can I still claim?",
    links: [
      { label: "Income tax", href: calc("income-tax-calculator") },
      { label: "New tax regime", href: calc("new-tax-regime-calculator") },
      { label: "Section 80C", href: calc("section-80c-calculator") },
      { label: "Section 80D", href: calc("section-80d-calculator") },
      { label: "Advance tax", href: calc("advance-tax-calculator") },
      { label: "Capital gains", href: calc("capital-gains-calculator") },
    ],
  },
  {
    id: "education",
    title: "Your child's education",
    question: "How big does the fund need to be, and how much a month gets me there?",
    links: [
      { label: "Education corpus", href: calc("education-corpus-calculator") },
      { label: "Child education planner", href: calc("child-education-planner-calculator") },
      { label: "Sukanya Samriddhi (SSY)", href: calc("ssy-calculator") },
      { label: "Goal planning", href: calc("goal-planning-calculator") },
      { label: "Education loan EMI", href: calc("education-loan-emi-calculator") },
    ],
  },
  {
    id: "retirement",
    title: "Retirement",
    question: "How much is enough, and how long will it last once I start drawing it?",
    links: [
      { label: "Retirement corpus", href: calc("retirement-corpus-calculator") },
      { label: "NPS", href: calc("nps-calculator") },
      { label: "PPF", href: calc("ppf-calculator") },
      { label: "EPF", href: calc("epf-calculator") },
      { label: "SWP", href: calc("swp-calculator") },
      { label: "Gratuity", href: calc("gratuity-calculator") },
    ],
  },
];

/** Smaller index for the footer — the everyday tools. */
export const EVERYDAY: CalculatorLink[] = [
  { label: "EMI", href: calc("emi-calculator") },
  { label: "Lumpsum", href: calc("lumpsum-calculator") },
  { label: "FD", href: calc("fd-calculator") },
  { label: "Compound interest", href: calc("compound-interest-calculator") },
  { label: "Future value", href: calc("future-value-calculator") },
  { label: "Present value", href: calc("present-value-calculator") },
  { label: "GST", href: calc("gst-calculator") },
  { label: "Car loan", href: calc("car-loan-calculator") },
];
