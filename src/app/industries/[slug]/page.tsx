import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/industries";
import { SITE } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import OfferBand from "@/components/OfferBand";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const canonical = `/industries/${industry.slug}`;
  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: industry.seoTitle,
      description: industry.metaDescription,
      url: canonical,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  // The split masthead's lede column is a 46ch measure — the full intros
  // (3–4 sentences) overflow it. The FIRST sentence opens the hero; the
  // rest opens the "How we help" section below (2026-07-16 hero-cohesion
  // pass; no data-shape change, split at render).
  const [ledeSentence, ...restSentences] = industry.intro.split(/(?<=\.)\s+/);
  const introRest = restSentences.join(" ");

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: industry.seoTitle,
            description: industry.metaDescription,
            path: `/industries/${industry.slug}`,
          }),
          faqSchema(industry.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
        ]}
      />

      {/* The canonical interior masthead (2026-07-16 hero-cohesion pass) —
          keeps the hero CTA per the settled policy: these are the SEO
          landing pages, the most commercial routes on the site. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline={industry.name}
        title={industry.heading}
        lede={ledeSentence}
        cta={{ label: "Start a project", href: "/start-a-project" }}
      />

      {/* What we do for this niche — opens with the rest of the intro (its
          hero overflow; see the split above) before the points. */}
      <OfferBand
        kicker="How we help"
        heading={`What we bring to ${industry.name.toLowerCase()}`}
        prose={introRest}
        items={industry.points}
      />

      {/* FAQ — moved to the shared <FaqSection> 2026-07-24 with the cream
          change ("FAQs should be like a brand cream"): one FAQ band across
          the site, on the ivory stock, flowing into the cream close. */}
      <FaqSection
        kicker="Questions"
        heading={`${industry.name} questions.`}
        faqs={industry.faqs}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
