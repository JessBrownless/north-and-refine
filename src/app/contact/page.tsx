import type { Metadata } from "next";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import GlowBand from "@/components/GlowBand";
import NextStepsList from "@/components/NextStepsList";
import PageHero from "@/components/PageHero";
import StartProjectCrossLink from "@/components/StartProjectCrossLink";
import StudioFactsLedger from "@/components/StudioFactsLedger";

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
          /contact's individual blob sits RIGHT, behind the form column, and
          the canvas pool sits low-left under the ledger so the facts rail
          isn't flat ink. */}
      <GlowBand blob="right" pool>
        {/* The facts rail — the studio's details as RULED LEDGER ROWS
            (the /services row grammar: hairline, label left, value
            locked to its baseline), then the numbered steps below. */}
        <div className="md:col-span-5">
          <StudioFactsLedger />

          {/* What happens next — the numbered-steps grammar from the
              services process, at rail scale. Fills the lower half of
              the column where the phone plate used to sit. */}
          <NextStepsList steps={NEXT_STEPS} className="mt-14" delay={240} />

          {/* The shorter route — points project enquiries at the
              full-page form, so the two conversion paths cross-link. */}
          <StartProjectCrossLink className="mt-14" delay={320} />
        </div>

        {/* Form — Netlify Forms via the runtime-v5 pattern; the static
            definition lives in public/__forms.html */}
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </GlowBand>
    </main>
  );
}
