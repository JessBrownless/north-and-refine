import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { SITE } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import SectionGlow from "@/components/SectionGlow";
import StageGlyph from "@/components/StageGlyph";
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

/* Tailwind scans for literal class strings, so the timeline's column count is
   a lookup rather than an interpolated class (a template literal would be
   purged). Four and five are the counts the disciplines actually use. */
const TIMELINE_COLS: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

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
        cta={{ label: "Start a project", href: "/contact" }}
      />

      {/* WHAT IT IS — the intro in the left rail, the deliverables ruled
          alongside. Carries the SectionGlow + matching grain: this is the
          section adjoining the hero, so it owns the seam blend. */}
      <section className="relative overflow-hidden grain bg-ink">
        <SectionGlow blob="left" />
        <div className="shell relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="overline reveal">What it is</p>
              <h2
                className="heading-lg from-overline text-bone reveal"
                style={{ transitionDelay: "80ms" }}
              >
                {service.name}
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p
                className="body-lg text-bone-dim reveal"
                style={{ transitionDelay: "160ms" }}
              >
                {service.intro}
              </p>
              <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3.5 border-t rule-dark pt-7 sm:grid-cols-2">
                {service.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className="body-sm flex items-center gap-3 text-bone-dim reveal"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <span aria-hidden className="h-px w-4 shrink-0 bg-clay" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS — the horizontal timeline (2026-07-14, client's call),
          now per discipline. Steps run left→right as nodes on one rule; each
          StageGlyph sits ON the line (an ink mask breaks the rule so it reads
          as connecting the nodes) and draws itself in, staggered, as the row
          enters. Stacks to a vertical list below md. The glyph opacity ramps
          to full across however many steps this discipline has. */}
      <section className="relative overflow-hidden grain bg-ink">
        <div className="shell relative z-10 py-24 md:py-32">
          <div>
            <p className="overline reveal">How we work</p>
            <h2
              className="heading-lg from-overline reveal"
              style={{ transitionDelay: "80ms" }}
            >
              {service.processHeading}
            </h2>
            <p
              className="lede body-lg max-w-[52ch] text-bone-dim reveal"
              style={{ transitionDelay: "160ms" }}
            >
              {service.processLede}
            </p>
          </div>
          <div className="relative mt-16 md:mt-24">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden border-t rule-dark md:block"
            />
            <ol
              className={`grid grid-cols-1 gap-14 md:gap-8 ${
                TIMELINE_COLS[steps.length] ?? "md:grid-cols-5"
              }`}
            >
              {steps.map((p, i) => (
                <li
                  key={p.num}
                  className="reveal"
                  style={
                    {
                      transitionDelay: `${i * 110}ms`,
                      "--sg-delay": `${i * 110}ms`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="relative inline-flex bg-ink pr-5"
                    style={{
                      opacity:
                        steps.length > 1 ? 0.4 + (i / (steps.length - 1)) * 0.6 : 1,
                    }}
                  >
                    <StageGlyph
                      stage={(i + 1) as 1 | 2 | 3 | 4 | 5}
                      className="h-14 w-14 text-champagne"
                    />
                  </span>
                  <p className="index-num mt-8 text-clay">{p.num}</p>
                  <h3 className="heading-sm mt-2 text-bone">{p.title}</h3>
                  <p className="body-sm mt-3 text-bone-dim">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* THE OTHER TWO — internal linking between the sibling services, so a
          reader (and a crawler) can reach every discipline from any one of
          them without going back to the hub. Sits BEFORE the FAQ so the page
          still ends on the cream FAQ → cream close movement. */}
      <section className="relative overflow-hidden grain bg-ink">
        <div className="shell relative z-10 py-20 md:py-24">
          <p className="overline reveal">The other disciplines</p>
          <div className="mt-10 border-t rule-dark">
            {others.map((o, i) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group grid grid-cols-1 items-baseline gap-y-3 border-b rule-dark py-8 reveal md:grid-cols-12 md:gap-8 md:py-10"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h2 className="heading-md text-bone transition-opacity group-hover:opacity-70 md:col-span-5">
                  {o.name}
                </h2>
                <p className="body text-bone-dim md:col-span-5">{o.lead}</p>
                <span className="btn-ghost text-bone md:col-span-2 md:justify-self-end">
                  Read more <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
