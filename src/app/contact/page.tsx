import type { Metadata } from "next";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import GlowBand from "@/components/GlowBand";
import HeroGlow from "@/components/HeroGlow";
import NextStepsList from "@/components/NextStepsList";
import PageHero from "@/components/PageHero";
import StartProjectCrossLink from "@/components/StartProjectCrossLink";
import StudioFactsLedger from "@/components/StudioFactsLedger";

/**
 * THE FORM IS IN THE HERO (2026-08-09, client: "a contact page where the
 * form isn't way below the fold on desktop… some form of graphic or something
 * that feels branded… a different layout with the info on the left… it
 * definitely shouldn't be before the form on mobile").
 *
 * MEASURED BEFORE CHANGING ANYTHING, because "below the fold" turned out to
 * be literal: at 1470x900 the first visible field sat at 902px against a
 * 900px viewport — not one field was on screen at load — and reaching Send
 * took 449px of scrolling. The hero alone was 776px.
 *
 * THE FIX USES PageHero's OWN `media` SLOT rather than a bespoke split, so
 * this page does not become a HeroX (drift pattern 1). That slot puts the
 * text stack on cols 1–6 and its node on 7–12, which is exactly the shape
 * wanted — and its DOM order is text-then-node, so the MOBILE stack comes
 * out masthead → form → info with no ordering work at all. The client's
 * "definitely shouldn't be before the form on mobile" is satisfied by the
 * structure rather than by a re-order.
 *
 * ⚠ THE SLOT IS DOCUMENTED AS "THE GRAPHIC SLOT" AND THIS PUTS A FORM IN IT.
 * That is a deliberate widening of its use, not a misreading: it is the
 * hero's right column, and on a conversion page the form is what belongs
 * there. The mechanism is untouched.
 *
 * THE BRANDED PART IS THE GRADIENT CARD, not a picture. Three plates were
 * available and all three had already been rejected by the client from other
 * slots (contact-rowen-phone-02 was this very page's plate, called off with
 * "doesn't go well anymore"), so reviving one would have re-proposed
 * something she killed. Instead the form sits in ContactCTA's own approved
 * device — a rounded card carrying the hero's warm ground — so the page
 * feels branded through the system's own language, invents no imagery, and
 * needs no new asset.
 *
 * THE INFO IS ON THE LEFT, in its own band below: the ledger, the steps and
 * the cross-link, all on cols 1–5.
 *
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
        media={
          /* THE FORM, IN THE GRADIENT CARD — the ContactCTA close-card
             recipe verbatim (warm ink-canvas ground + a contained HeroGlow +
             grain, rounded on the large plate stop). Its dose is the card's
             own 0.35 rather than the ground constant, for the reason that
             note gives: a card's gradient is its content, and at ground dose
             it would be a flat dark plate. Content rides z-10 above it. */
          <div className="relative overflow-hidden grain rounded-plate-lg bg-ink-canvas">
            <HeroGlow intensity={0.35} />
            <div className="relative z-10 p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        }
      />

      {/* THE INFO BAND — left rail only now that the form has moved up into
          the hero. The blob moves to the LEFT with it: the glow should sit
          behind the content, and the content is no longer on the right. */}
      <GlowBand blob="left" pool>
        {/* The facts rail — the studio's details as RULED LEDGER ROWS
            (the /services row grammar: hairline, label left, value
            locked to its baseline), then the numbered steps below. */}
        <div className="md:col-span-5">
          <StudioFactsLedger />

          {/* What happens next — the numbered-steps grammar from the
              services process, at rail scale. */}
          <NextStepsList steps={NEXT_STEPS} className="mt-14" delay={240} />

          {/* The shorter route — points project enquiries at the
              full-page form, so the two conversion paths cross-link. */}
          <StartProjectCrossLink className="mt-14" delay={320} />
        </div>
      </GlowBand>

    </main>
  );
}
