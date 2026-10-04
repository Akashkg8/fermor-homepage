import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

// Roman face: preloaded, and "optional" so the hero text paints once with the
// metric-matched fallback instead of repainting on swap (LCP, zero CLS).
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-schibsted",
  display: "optional",
  adjustFontFallback: true,
});

// Italic face for margin annotations only — nothing above the fold needs it.
const schibstedItalic = Schibsted_Grotesk({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-schibsted-italic",
  display: "swap",
  preload: false,
});

// Fallback for Hindi and Marathi titles; not preloaded, so English pages pay nothing.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fermor.in";

const description =
  "Free calculators for loans, tax, SIPs and retirement in India, with every formula and assumption shown. No sign-up, nothing to sell you.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fermor — every money decision, worked out in the open",
  description,
  applicationName: "Fermor",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Fermor",
    locale: "en_IN",
    title: "Every money decision, worked out in the open",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Every money decision, worked out in the open",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EEF1F4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${schibsted.variable} ${schibstedItalic.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
