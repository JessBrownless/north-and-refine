import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { SITE } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import OfferBand from "@/components/OfferBand";
import RuledLinkRows from "@/components/RuledLinkRows";
import ServiceProcessTimeline from "@/components/ServiceProcessTimeline";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

/**
 * /services/[slug] — one page per discipline (2026-07-24). Built on the same
 * data-driven pattern as /industries/[slug]: the shape is fixed and repeating,
 * so a new service is an entry in `lib/services.ts` and the route renders.
 *
 * Each page carries its OWN process, which is the point of the split: the old
 * combined page ran a website process under a heading that claimed it applied
 * to every engagement (see the note in lib/services.ts).
 *
 * These are the most commercial routes on the site, so they keep the hero CTA
 * per the settled hero-CTA policy.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const canonical = `/services/${service.slug}`;
  // H1s are sentence case and end in a full stop (the brand's voice); a title
  // tag shouldn't carry it in front of the " — North & Refine" template.
  const title = service.heading.replace(/\.$/, "");
  return {
    title,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title,
      description: service.metaDescription,
      url: canonical,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const steps = service.process;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main>
      <JsonLd
        data={[
          /* name matches the hub's Service entity for this URL, so the two
             pages describe the same service identically. */
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        align="split"
        spacious
        overline="Services"
        title={service.heading}
        lede={service.lead}
        cta={{ label: "Start a project", href: "/start-a-project" }}
      />

      {/* WHAT IT IS — the intro in the left rail, the deliverables ruled
          alongside. Takes the glow: this is the section adjoining the hero,
          so it owns the seam blend. */}
      <OfferBand
        glow
        spacious
        list="deliverables"
        kicker="What it is"
        heading={service.name}
        prose={service.intro}
        items={service.deliverables}
      />

      {/* THE PROCESS — the shared horizontal timeline, carrying THIS
          discipline's own steps. The counts differ by design (web 5, SEO 4,
          brand 4); the component takes whatever `lib/services.ts` gives it. */}
      <ServiceProcessTimeline
        heading={service.processHeading}
        lede={service.processLede}
        steps={steps}
      />

      {/* THE OTHER TWO — internal linking between the sibling services, so a
          reader (and a crawler) can reach every discipline from any one of
          them without going back to the hub. Sits BEFORE the FAQ so the page
          still ends on the cream FAQ → cream close movement. */}
      <RuledLinkRows
        layout="onward"
        spacious
        stagger={80}
        kicker="The other disciplines"
        linkLabel="Read more"
        rows={others.map((o) => ({
          href: `/services/${o.slug}`,
          title: o.name,
          lead: o.lead,
        }))}
      />

      {/* FAQ — page-owned questions, feeding this page's FAQPage schema, on
          the shared <FaqSection> (the cream band, 2026-07-24). */}
      <FaqSection
        kicker="Questions"
        heading={`${service.name} questions.`}
        faqs={service.faqs}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
