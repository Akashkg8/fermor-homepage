export interface Faq {
  q: string;
  a: string;
}

/** The first five are Fermor's own answers from fermor.in, edited for length. */
export const FAQS: Faq[] = [
  {
    q: "What does Fermor actually do?",
    a: "Fermor runs the math behind everyday money decisions: calculators for loans, savings and tax, plus plain analysis of what the numbers mean. You can compare options before you commit to one.",
  },
  {
    q: "How should I use the calculators?",
    a: "Start with the numbers you already know, then change one input at a time and watch the result. Seeing how sensitive an outcome is to a single change is usually more useful than any one figure.",
  },
  {
    q: "Do the tools give financial advice?",
    a: "No. Fermor is educational. It is not a SEBI-registered investment adviser, an AMFI-registered distributor or an IRDAI agent. The tools show you the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and an adviser you choose.",
  },
  {
    q: "What happens to the numbers I enter?",
    a: "Calculations run in your browser. Your inputs stay on your device unless you choose to save a result to an account, and you can delete a saved calculation whenever you want.",
  },
  {
    q: "Do I need an account?",
    a: "No. Every calculator is free and works without signing up. An account is only for keeping results between visits.",
  },
  {
    q: "How does Fermor make money if everything is free?",
    a: "Through advertising and affiliate partnerships, and both are always labelled. If you open a product through an affiliate link, Fermor may earn a fee from that company. A fee is never a reason to change a formula, an assumption or a result.",
  },
  {
    q: "What will the app do, and when?",
    a: "The app will apply the same open math to your own accounts: a free financial health check, a net-worth view, spending you can understand, goal forecasts, and Ask, which answers questions using your own data with the working shown. It is in development. Join the waitlist and we will email you once when it opens.",
  },
];
