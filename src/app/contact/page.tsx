import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";

/**
 * /contact — PLAIN CONTACT since 2026-07-31 (client: "make the contact page
 * say contact"; the start-a-project questions moved to the full-page form at
 * /start-a-project). RESTAGED IN THE SERVICES LANGUAGE the same night — the
 * client called the old editorial phone plate off ("doesn't go well
 * anymore"), so the page now composes with the devices she's approved on
 * /services: the canvas blobs down the dark middle, ruled ledger rows for
 * the studio facts, and the numbered what-happens-next steps (index-num +
 * body, the process grammar) filling the rail where the image sat.
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with North & Refine: questions, introductions, or the beginning of a project for your medical aesthetic or cosmetic surgery practice. We reply within two working days.",
  alternates: { canonical: "/contact" },
};

/* The what-happens-next steps — the same promise the /services FAQ makes
   ("What happens when we get in touch?"), compressed to the process
   grammar. */
const NEXT_STEPS = [
  "We reply within two working days, with honest first thoughts.",
  "A short call: you tell us where the practice is and where you want it to be.",
  "If we're the right studio for it, a written proposal follows with scope, timeline and price.",
];

export default function ContactPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={[
          contactPageSchema(String(metadata.description)),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      {/* The canonical interior masthead. Kicker says CONTACT now — the
          "Start a project" kicker moved to /start-a-project with the project
          questions. No hero CTA: the form below is the CTA. */}
      <PageHero
        align="split"
        spacious
        overline="Contact"
        title={
          <>
            Talk to the <em>studio</em>.
          </>
        }
        lede="Questions, introductions, or the beginning of a project. Email us directly or use the form; we reply within two working days."
      />

      {/* The hero blend decays THROUGH this section (the seam contract):
          SectionGlow carries the warm ground past the boundary; /contact's
          individual blob sits RIGHT, behind the form column, and one quiet
          canvas pool (the /services shared-canvas grammar, hub doses) sits
          low-left under the ledger so the facts rail isn't flat ink. No
          sticky content here, so the section keeps its own overflow clip. */}
      <section className="relative grain overflow-hidden">
        <SectionGlow blob="right" />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-10%",
            top: "62%",
            width: "44%",
            height: "30%",
            borderRadius: "50%",
            background: "#8A5A2E",
            opacity: 0.06,
            filter: "blur(150px)",
            pointerEvents: "none",
            transform: "translateZ(0)",
          }}
        />
        <div className="shell relative z-10 pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* The facts rail — the studio's details as RULED LEDGER ROWS
                (the /services row grammar: hairline, label left, value
                locked to its baseline), then the numbered steps below. */}
            <div className="md:col-span-5">
              <div className="border-t rule-dark">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5 reveal">
                  <p className="overline text-clay">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="body text-bone transition-colors hover:text-champagne"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5 reveal" style={{ transitionDelay: "80ms" }}>
                  <p className="overline text-clay">Instagram</p>
                  <a
                    href={SITE.sameAs[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="body text-bone transition-colors hover:text-champagne"
                  >
                    @northandrefine
                  </a>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5 reveal" style={{ transitionDelay: "160ms" }}>
                  <p className="overline text-clay">Where we work</p>
                  <p className="body text-bone-dim">{SITE.areaServed.join(" · ")}</p>
                </div>
              </div>

              {/* What happens next — the numbered-steps grammar from the
                  services process, at rail scale. Fills the lower half of
                  the column where the phone plate used to sit. */}
              <div className="mt-14 reveal" style={{ transitionDelay: "240ms" }}>
                <p className="overline text-clay">What happens next</p>
                <ol className="mt-7 space-y-6">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="index-num text-clay">0{i + 1}</span>
                      <p className="body text-bone-dim">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* The shorter route — points project enquiries at the
                  full-page form, so the two conversion paths cross-link. */}
              <div className="mt-14 border-t rule-dark pt-8 reveal" style={{ transitionDelay: "320ms" }}>
                <h2 className="heading-sm text-bone">Starting a project?</h2>
                <p className="body-sm mt-3 max-w-[44ch] text-bone-dim">
                  There&rsquo;s a form for that: a few questions about the
                  practice and what you need, so the first conversation is a
                  useful one.
                </p>
                <Link href="/start-a-project" className="btn-ghost mt-5 text-bone">
                  Start a project <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            {/* Form — Netlify Forms via the runtime-v5 pattern; the static
                definition lives in public/__forms.html */}
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
