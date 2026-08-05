import type { Metadata } from "next";
import { INDUSTRIES } from "@/lib/industries";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import RuledLinkRows from "@/components/RuledLinkRows";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Industries — Who we design for",
  description:
    "We design brands and websites for cosmetic surgeons, medical aesthetic clinics and dermatology practices. Explore our work by speciality.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      {/* The canonical interior masthead (2026-07-16 hero-cohesion pass) —
          carries the hero CTA per the settled policy: the industries pages
          are commercial. Lede dash swept the same day. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Industries"
        title="We design for one world, and we know it well."
        lede="Working within medical aesthetics and cosmetic surgery means we understand the patient, the regulation and the search landscape, as specialists rather than outsiders."
        cta={{ label: "Start a project", href: "/start-a-project" }}
      />

      {/* The niches as a ruled index. The lead is the intro's FIRST SENTENCE,
          split at render (the page owns its own copy shaping; the component
          never re-punctuates). */}
      <RuledLinkRows
        layout="index"
        linkLabel="Explore"
        rows={INDUSTRIES.map((industry) => ({
          href: `/industries/${industry.slug}`,
          title: industry.seoTitle,
          lead: `${industry.intro.split(". ")[0]}.`,
        }))}
      />

      <ContactCTA />
    </main>
  );
}
