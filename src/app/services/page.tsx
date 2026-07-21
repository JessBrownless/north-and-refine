import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import StageGlyph from "@/components/StageGlyph";
import ServicesScrollIndex from "@/components/ServicesScrollIndex";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

/**
 * /services — rebuilt 2026-07-12 at the client's direction:
 * (1) HERO: the canonical split masthead since the 2026-07-16 hero-cohesion
 *     pass (the 07-12 hand-and-phone aside + fragment chips retired with
 *     PageHero's aside prop).
 * (2) The services go BIG-TYPE: .display ledger rows (the register the
 *     homepage's What-we-do rows point at), index-num + title + lead +
 *     body + deliverables on ruled rows.
 * (3) How we work returns to THE SPINE TIMELINE (recovered from 3be47b9,
 *     built and retired on the homepage 2026-07-10 — /services is the page
 *     it always belonged on) with the StageGlyphs drawing themselves in.
 * (4) FAQ through the shared <FaqSection> (the /about split layout,
 *     componentised).
 */

export const metadata: Metadata = {
  title: "Services — Web design, SEO & branding",
  description:
    "Web design and build, SEO, and brand identity for medical aesthetic and cosmetic surgery practices. How North & Refine works, and what you get.",
  alternates: { canonical: "/services" },
};

// Order: web + SEO lead, BRAND LAST (2026-07-14, client: "make brand last — I
// don't really want to do that service a lot"). Nums track display order.
const SERVICES = [
  {
    num: "01",
    title: "Web design & build",
    lead: "A first consultation that happens before they call.",
    body: "We design and build fast, accessible, beautifully crafted websites on a modern stack. Considered information architecture, procedure-led page structures, and friction-free enquiry flows turn an anxious first visit into a booked consultation — without ever feeling like a sales pitch.",
    deliverables: ["UX & IA", "Bespoke design", "Next.js build", "Accessibility (WCAG)", "Analytics & enquiry flows"],
  },
  {
    num: "02",
    title: "SEO & content",
    lead: "Found by the right patients, on your terms.",
    body: "SEO isn't bolted on afterwards — it's in the foundations. Technical SEO, structured data, and a content engine built around how patients actually search mean each procedure and condition can earn its own ranking. The blog model compounds over time, lowering your reliance on paid ads.",
    deliverables: ["Technical SEO", "Schema / structured data", "Keyword & content strategy", "Local SEO", "Editorial content engine"],
  },
  {
    num: "03",
    title: "Brand identity",
    lead: "The standard of your care, made visible.",
    body: "Before a patient reads a word, your brand has already told them what to expect. We build identity systems — name, logotype, palette, typography, art direction and voice — that feel calm, credible and premium, and that hold together across every touchpoint from signage to social.",
    deliverables: ["Logo & wordmark", "Type & colour system", "Art direction", "Brand guidelines", "Tone of voice"],
  },
];

const PROCESS = [
  { num: "01", title: "Discovery", body: "We learn your practice, your patients and your market — and define what success actually looks like." },
  { num: "02", title: "Strategy", body: "Positioning, information architecture and an SEO plan that the design and build will deliver against." },
  { num: "03", title: "Design", body: "Brand and interface design, refined together, until it feels unmistakably yours." },
  { num: "04", title: "Build & launch", body: "A fast, technically sound build, launched carefully — with the schema, analytics and redirects handled." },
  { num: "05", title: "Refine", body: "We measure, learn and improve. Search and conversion compound when you keep tending them." },
];

const FAQS = [
  {
    question: "Do you only work with medical aesthetic and cosmetic surgery practices?",
    answer:
      "That's our focus, and it's deliberate. Working within one field means we understand the patient psychology, the regulatory landscape and the search behaviour far better than a generalist studio could.",
  },
  {
    question: "Can you do just branding, or just the website?",
    answer:
      "Yes. Many engagements are brand-and-website together because they reinforce each other, but we're happy to take on either on its own — and we'll be honest if doing only one will hold the result back.",
  },
  {
    question: "Who builds the site, and what's it built on?",
    answer:
      "We design and build in-house on a modern, fast stack (Next.js). You get a site that scores well on Core Web Vitals, is accessible, and is straightforward to maintain — not a slow, plugin-heavy template.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A focused brand-and-website project typically runs six to ten weeks depending on scope and how quickly we can gather content. We'll give you a realistic timeline up front.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={[
          ...SERVICES.map((s) =>
            serviceSchema({ name: s.title, description: s.body, path: "/services" }),
          ),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      {/* Hero — the canonical interior masthead (split, spacious,
          borderBottom) in its GRAPHIC variant (media slot, 2026-07-16): the
          client's square hero graphic rides the right columns. The
          2026-07-12 hand-and-phone aside + floating fragment chips left
          with the hero-cohesion conversion. H1 dash swept the same day
          (colon per the studio's dash-restraint rule). Keeps the hero CTA:
          /services is a commercial page (the settled CTA policy).
          The graphic is ARTWORK at its native square — brand graphics are
          marks, not photography, so the 16:10/4:5 imagery canon doesn't
          govern them; its rounded corners are part of the artwork, so no
          .frame around it.
          ⚠ The graphic depicts a mock practice ("Lumen") — confirm with
          Jess how this sits with the plates' real-client-work-only rule
          before launch. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Services"
        title={
          <>
            Brand, web and search: built to work as <em>one.</em>
          </>
        }
        lede="Three disciplines, delivered by one studio, so nothing falls between the cracks. Here's what we do and how we do it."
        cta={{ label: "Start a project", href: "/contact" }}
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/services-hero-square.png"
            alt="A clinic website shown on a phone against a warm amber ground — web design by North & Refine"
            loading="eager"
            className="w-full"
          />
        }
      />

      {/* The services — SCROLL INDEX with the ODOMETER NUMBER (2026-07-14,
          client ref: Relume layout485 — "the number's bigger and in a window,
          it changes within the window like a slot machine"). Component owns the
          scroll logic: one big display-mega number pinned in a clipped window
          that rolls as you scroll, plus the per-row hairline that draws in. */}
      <section className="bg-ink">
        <div className="shell py-24 md:py-32">
          <ServicesScrollIndex services={SERVICES} />
        </div>
      </section>

      {/* How we work — THE SPINE TIMELINE (recovered from 3be47b9 at the
          client's call: "bring the animated icons back and the timeline we
          did once"). The five steps hang off one continuous centre
          hairline — the page's only vertical rule. Each step: a tether
          hairline touching the spine, the STAGE GLYPH drawing itself in on
          the step's reveal (champagne on ink — the ornament use), then
          title + body. Glyphs ramp 40% → full opacity down the steps: the
          project coming into focus (static print tint, not an animation).
          On mobile the spine moves to the left edge and the steps descend
          it. No horizontal rules here beyond the tethers — this section's
          one real rule is vertical. */}
      <section className="bg-ink">
        <div className="shell py-24 md:py-32">
          <div>
            <p className="overline reveal">How we work</p>
            <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
              A project, in five steps.
            </h2>
            <p
              className="lede body-lg max-w-[52ch] text-bone-dim reveal"
              style={{ transitionDelay: "160ms" }}
            >
              No two projects are quite the same; the work bends to each practice. The
              shape of it doesn&rsquo;t: five stages, in order, every time.
            </p>
          </div>
          {/* HORIZONTAL TIMELINE (2026-07-14, client's call): the five steps
              run left→right as nodes on one horizontal rule. Each StageGlyph
              sits ON the line (an ink mask breaks the rule so it reads as
              connecting the nodes) and draws itself in, staggered L→R, as the
              row enters (--sg-delay). Stacks to a simple vertical list below md
              (the rule is desktop-only; the numbers carry the sequence). */}
          <div className="relative mt-16 md:mt-24">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden border-t rule-dark md:block"
            />
            <ol className="grid grid-cols-1 gap-14 md:grid-cols-5 md:gap-8">
              {PROCESS.map((p, i) => (
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
                  {/* The glyph as a node — bg-ink masks the rule behind it */}
                  <span
                    className="relative inline-flex bg-ink pr-5"
                    style={{ opacity: 0.4 + i * 0.15 }}
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

      {/* FAQ — the shared split band (componentised from /about). The same
          FAQS array feeds the FAQPage schema above. */}
      <FaqSection
        kicker="Questions"
        heading="Common questions"
        faqs={FAQS}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
