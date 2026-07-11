import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import StageGlyph from "@/components/StageGlyph";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services — Brand, web design & SEO",
  description:
    "Brand identity, web design and build, and SEO for medical aesthetic and cosmetic surgery practices. How North & Refine works, and what you get.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    num: "01",
    title: "Brand identity",
    lead: "The standard of your care, made visible.",
    body: "Before a patient reads a word, your brand has already told them what to expect. We build identity systems — name, logotype, palette, typography, art direction and voice — that feel calm, credible and premium, and that hold together across every touchpoint from signage to social.",
    deliverables: ["Logo & wordmark", "Type & colour system", "Art direction", "Brand guidelines", "Tone of voice"],
  },
  {
    num: "02",
    title: "Web design & build",
    lead: "A first consultation that happens before they call.",
    body: "We design and build fast, accessible, beautifully crafted websites on a modern stack. Considered information architecture, procedure-led page structures, and friction-free enquiry flows turn an anxious first visit into a booked consultation — without ever feeling like a sales pitch.",
    deliverables: ["UX & IA", "Bespoke design", "Next.js build", "Accessibility (WCAG)", "Analytics & enquiry flows"],
  },
  {
    num: "03",
    title: "SEO & content",
    lead: "Found by the right patients, on your terms.",
    body: "SEO isn't bolted on afterwards — it's in the foundations. Technical SEO, structured data, and a content engine built around how patients actually search mean each procedure and condition can earn its own ranking. The blog model compounds over time, lowering your reliance on paid ads.",
    deliverables: ["Technical SEO", "Schema / structured data", "Keyword & content strategy", "Local SEO", "Editorial content engine"],
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

      <PageHero
        overline="Services"
        title="Brand, web and search — built to work as one."
        lede="Three disciplines, delivered by one studio, so nothing falls between the cracks. Here's what we do and how we do it."
        cta={{ label: "Start a project", href: "/contact" }}
      />

      {/* Service detail */}
      <section className="bg-ink">
        <div className="shell py-16 md:py-24 space-y-20 md:space-y-28">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 reveal"
            >
              <div className="md:col-span-5">
                <p className="index-num text-clay">{s.num} /</p>
                <h2 className="heading-lg text-bone mt-3">{s.title}</h2>
                <p className="body-lg text-bone-dim mt-2">{s.lead}</p>
              </div>
              <div className="md:col-span-7">
                <p className="body text-bone-dim">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="label text-bone-dim border rule-dark px-3 py-1.5">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-bone text-ink">
        <div className="shell py-20 md:py-32">
          <p className="overline text-clay reveal">How we work</p>
          <h2 className="heading-lg from-overline max-w-3xl reveal" style={{ transitionDelay: "80ms" }}>
            A project, in five steps.
          </h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* STAGE GLYPHS (2026-07-10): glyph left ON the rule, index
                right; --sg-delay staggers the draw-on to match the plate
                cascade (see the M·1 block in globals.css + the brief at
                docs/briefs/stage-glyphs.md). */}
            {PROCESS.map((p, i) => (
              <div
                key={p.num}
                className="reveal border-t rule-light pt-5"
                style={
                  {
                    transitionDelay: `${i * 60}ms`,
                    "--sg-delay": `${i * 150}ms`,
                  } as CSSProperties
                }
              >
                <div className="flex items-start justify-between">
                  <StageGlyph stage={(i + 1) as 1 | 2 | 3 | 4 | 5} className="h-12 w-12 text-ink/70" />
                  <p className="index-num text-clay">{p.num}</p>
                </div>
                <h3 className="heading-sm mt-3">{p.title}</h3>
                <p className="body mt-2 text-ink/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink">
        <div className="shell py-20 md:py-32">
          <p className="overline reveal">Questions</p>
          <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
            Common questions
          </h2>
          <div className="mt-12 max-w-3xl divide-y rule-dark">
            {FAQS.map((f) => (
              <details key={f.question} className="group py-6 rule-dark">
                <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none">
                  <span className="heading-sm text-bone">{f.question}</span>
                  <span className="text-champagne text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="body mt-4 text-bone-dim">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
