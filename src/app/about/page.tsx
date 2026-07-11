import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About — The studio",
  description:
    "North & Refine is a specialist design studio for medical aesthetic and cosmetic surgery practices. Our beliefs, our approach, and why we work in one field.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  {
    title: "Restraint is the point.",
    body: "In aesthetics, taste signals competence. We design with discipline — fewer, better decisions — because a calm, considered brand reassures a patient far more than a loud one.",
  },
  {
    title: "Specialism beats breadth.",
    body: "We work in one field on purpose. Knowing the patient psychology, the regulation and the search behaviour of this world lets us do work a generalist studio simply can't.",
  },
  {
    title: "SEO is craft, not a plugin.",
    body: "We treat structured data, performance and content as part of the design, not an afterthought bolted on at the end. It's why our sites are found, not just admired.",
  },
  {
    title: "We measure what we make.",
    body: "Beautiful is the baseline. We care whether the work brings the right patients through the door — and we keep refining until it does.",
  },
];

const STATS = [
  { value: "1", label: "Field, known deeply" },
  { value: "100%", label: "Built in-house" },
  { value: "6–10", label: "Weeks, typical project" },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero = the homepage studio statement, verbatim (client's call,
          2026-07-11): the same kicker + heading-xl statement (with its
          accent word) opens /about — the claim the homepage makes in
          passing is the thesis this page exists to argue. Composed via
          PageHero props (never a HeroX fork); no lede — the "Who we are"
          narrative below carries the argument. */}
      <PageHero
        overline="The studio"
        title={
          <>
            A studio that treats the clinic&rsquo;s digital presence with the
            same care as the practice <em>itself</em>.
          </>
        }
      />

      {/* Narrative */}
      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 md:items-baseline">
            <div className="md:col-span-4">
              <p className="overline reveal">Who we are</p>
              {/* /about takes its reserved portrait (2026-07-10 sweep): the
                  full client portrait, banked by the homepage Kind-words
                  comment as "in reserve for /about" — the site's one real
                  human photograph, on the people ratio. ⚠ Client to confirm
                  framing + permission (it is her client's face). */}
              <figure className="mt-10 reveal" style={{ transitionDelay: "120ms" }}>
                <div className="frame aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/testimonials/client-portrait.jpg"
                    alt="Dr Yalda Jamali, cosmetic doctor — a North & Refine client"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t rule-dark pt-4">
                  <span className="body-sm text-bone-dim">Dr Yalda Jamali</span>
                  <span className="overline text-clay">Client</span>
                </figcaption>
              </figure>
            </div>
            <div className="md:col-span-8 max-w-2xl space-y-6">
              <p className="body-lg text-bone reveal">
                We started North &amp; Refine because the practices doing the most careful, considered
                clinical work were too often let down by their brand and their website — generic
                templates, slow pages, and copy that overclaimed where it should reassure.
              </p>
              <p className="body text-bone-dim reveal" style={{ transitionDelay: "80ms" }}>
                So we built a studio that does one thing well: helping cosmetic surgeons, aesthetic
                clinics and dermatology practices look as credible online as they are in the
                consulting room — and get found by the patients who are right for them.
              </p>
              <p className="body text-bone-dim reveal" style={{ transitionDelay: "160ms" }}>
                Everything is designed and built in-house, on a modern stack, with search and
                accessibility treated as part of the craft. We take on a limited number of projects
                at a time, because the work we&rsquo;re known for needs the room to be done properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink border-y rule-dark">
        <div className="shell py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {STATS.map((s, i) => (
              <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="stat text-bone">{s.value}</p>
                <p className="label text-bone-dim mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="bg-bone text-ink">
        <div className="shell py-20 md:py-32">
          <p className="overline text-clay reveal">What we believe</p>
          <h2 className="heading-lg from-overline max-w-3xl reveal" style={{ transitionDelay: "80ms" }}>
            Four convictions that shape every project.
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {BELIEFS.map((b, i) => (
              <div key={b.title} className="reveal border-t rule-light pt-6" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <h3 className="heading-md">{b.title}</h3>
                <p className="body mt-3 text-ink/70">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
