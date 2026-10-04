import { Analysis } from "@/components/sections/Analysis";
import { AppPreview } from "@/components/sections/AppPreview";
import { Deciding } from "@/components/sections/Deciding";
import { Faq } from "@/components/sections/Faq";
import { FinalCta, Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HiddenMath } from "@/components/sections/HiddenMath";
import { Methodology } from "@/components/sections/Methodology";
import { Nav } from "@/components/sections/Nav";
import { PersonYear } from "@/components/sections/PersonYear";
import { StaysFree } from "@/components/sections/StaysFree";
import { FAQS } from "@/content/faq";
import { SITE } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.origin,
      logo: `${SITE.origin}/fermor-mark-2026.svg`,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <HiddenMath />
        <PersonYear />
        <Deciding />
        <Methodology />
        <StaysFree />
        <AppPreview />
        <Analysis />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
