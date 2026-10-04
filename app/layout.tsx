import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-schibsted",
  display: "swap",
  adjustFontFallback: true,
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
    <html lang="en-IN" className={`${schibsted.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
