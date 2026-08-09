import type { Metadata } from "next";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import GlowBand from "@/components/GlowBand";
import HeroGlow from "@/components/HeroGlow";
import PageHero from "@/components/PageHero";
import StudioFactsLedger from "@/components/StudioFactsLedger";

/**
 * THE MASTHEAD RUNS FULL WIDTH, THE FORM AND THE DETAILS SIT UNDER IT
 * (2026-08-09, second pass, client: "the title at the top with the
 * subheading, but just less padding, and then the form and the contact info
 * underneath, like left and right").
 *
 * The first pass put the form in PageHero's own right-column slot, which did
 * solve the measured problem (the first field had sat at 902px against a
 * 900px viewport, with Send 449px down the page). The client kept the fix and
 * changed the shape: masthead across the top, then the two columns below it.
 *
 * "LESS PADDING" IS THE `spacious` PROP, NOT A PADDING EDIT. Dropping it is
 * the system's own lever for exactly this and moves the band from
 * md:min-h-[72vh] md:py-28 to md:min-h-[52vh] md:py-20 — so no frozen
 * spacing utility was touched to get it. It is also the right call on
 * meaning, not just on numbers: the tall VH stage exists for heroes where
 * "the air IS the composition", and this masthead is now a header for the
 * two columns underneath rather than the whole event.
 *
 * ⚠ THE FORM IS FIRST IN THE DOM AND SECOND ON SCREEN. The client's standing
 * rule from the first pass — "it definitely shouldn't be before the form on
 * mobile" — outlives the layout change, so the form is written first and
 * pushed to the RIGHT with explicit grid placement (md:col-start-7 +
 * md:row-start-1), while the details are written second and pulled LEFT to
 * col-start-1 on the same row. Explicit placement rather than `order-*`
 * because the columns then keep one source of truth for where they sit. Read
 * the file top to bottom and you are reading the mobile order.
 *
 * THE DETAILS TAKE A KICKER of their own (client: "maybe a little title above
 * the details on the left") and the SOCIALS TAKE MARKS (client: "maybe some
 * icons or something for the socials") — both live in the ledger now, hers.
 *
 * TWO BLOCKS LEFT THE PAGE IN THIS PASS:
 *  · "What happens next" MOVED to the start-project form's success message
 *    (client: "on the contact page, if you think about it, they could be
 *    getting in touch about anything"). A numbered proposal sequence is a
 *    promise about a PROJECT, and this page takes questions, introductions
 *    and press just as readily.
 *  · The "Start a project?" cross-link was REMOVED outright (client's call in
 *    the same breath). Every page already carries a Start-a-project pill in
 *    the nav, so the rail was a second door to a room the reader could
 *    already see.
 *
 * /contact — PLAIN CONTACT since 2026-07-31 (client: "make the contact page
 * say contact"; the start-a-project questions moved to the full-page form at
 * /start-a-project). RESTAGED IN THE SERVICES LANGUAGE the same night — the
 * client called the old editorial phone plate off ("doesn't go well
 * anymore"), so the page now composes with the devices she's approved on
 * /services: the canvas blobs down the dark middle and ruled ledger rows for
 * the studio facts. (That staging also put the numbered what-happens-next
 * steps in the rail where the image had been; they left the page in the
 * 2026-08-09 pass above, so the rail is the ledger alone now.)
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with North & Refine: questions, introductions, or the beginning of a project for your medical aesthetic or cosmetic surgery practice. We reply within two working days.",
  alternates: { canonical: "/contact" },
};

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

      {/* The canonical interior masthead — full width, and NOT `spacious`:
          see the note above for why that prop is the padding lever here. */}
      <PageHero
        align="split"
        overline="Contact"
        title={
          <>
            Talk to the <em>studio</em>.
          </>
        }
        lede="Questions, introductions, or the beginning of a project. Email us directly or use the form; we reply within two working days."
      />

      <GlowBand blob="left" pool>
        {/* THE FORM — FIRST IN THE DOM so the mobile stack reads masthead →
            form → details, then placed in the RIGHT columns on desktop.
            It keeps the gradient card from the first pass: ContactCTA's
            close-card recipe (warm ink-canvas + a contained HeroGlow at the
            card's own 0.35 + grain, rounded-plate-lg), which is what makes
            the page read branded without inventing imagery. */}
        <div className="md:col-span-6 md:col-start-7 md:row-start-1">
          <div className="relative overflow-hidden grain rounded-plate-lg bg-ink-canvas">
            <HeroGlow intensity={0.35} />
            <div className="relative z-10 p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* THE DETAILS — SECOND in the DOM, pulled to the LEFT columns on the
            same grid row. The kicker is the client's "little title above the
            details"; it takes clay because this is the block's OWN kicker on
            a dark ground, the sanctioned brand-tint use. */}
        <div className="md:col-span-5 md:col-start-1 md:row-start-1">
          <p className="overline mb-8 reveal text-clay">Details</p>
          <StudioFactsLedger />
        </div>
      </GlowBand>

    </main>
  );
}
