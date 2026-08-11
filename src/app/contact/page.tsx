import type { Metadata } from "next";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import GlowBand from "@/components/GlowBand";
import StudioFactsLedger from "@/components/StudioFactsLedger";

/**
 * ONE BAND, TWO COLUMNS — the Relume contact1 shape (2026-08-09, third pass,
 * client: "let's try something a bit more like this" + the reference).
 *
 * WHAT THE REFERENCE ACTUALLY DOES, since that is the whole brief: the
 * heading, the subtitle and the contact details all live in the LEFT column,
 * and the form fills the RIGHT column starting level with the heading. There
 * is no masthead band above it. That single move is what makes the form reach
 * the top of the page — the thing this page has been chased about for three
 * passes — because the form no longer waits for a masthead to finish.
 *
 * ⚠ THIS PAGE NO LONGER OPENS WITH `PageHero`, AND THAT IS A REAL DEPARTURE
 * FROM CANON ("every top-level interior page opens with the same recipe").
 * It is deliberate and it is the client's direction, but it should be an
 * argued exception rather than a quiet one:
 *  · The layout is not expressible through PageHero. Its text column takes a
 *    kicker, a title, a lede and actions — there is no slot for a details
 *    rail beneath them, and the one pass that put the FORM in its `media`
 *    slot could not also place the details on the left.
 *  · Nor is it a HeroX (drift pattern 1): nothing here is a hero variant.
 *    /contact simply has no masthead band any more; it has a contact band.
 *  · THE MASTHEAD GRAMMAR SURVIVES VERBATIM, which is the part that actually
 *    matters for an SEO-led site. The H1 is still
 *    `<h1 class="display with-overline">` with the kicker as its first span,
 *    still carries the LOAD-BEARING {" "} between the spans (without it the
 *    H1 extracts as "ContactTalk to the studio."), and still reads "Contact
 *    Talk to the studio." to a crawler exactly as it did through PageHero.
 *    Verified by extracting the rendered H1, not by reading the JSX.
 *  · The load-in stagger is PageHero's own: kicker 0s, title 0.1s, lede
 *    0.25s.
 * If a second page ever wants this shape, that is the moment to make it a
 * component — not now, on a sample of one.
 *
 * NAV CLEARANCE MOVED WITH THE BAND. The nav is ABSOLUTE and transparent, so
 * the first ~128px of the page sit behind it. PageHero was carrying that
 * clearance; with it gone the band has to, hence `pt-40` passed through
 * GlowBand's existing `padding` prop — PageHero's own value, so no new
 * spacing value enters the census. (It was `pt-32 md:pt-40` until the client
 * asked for more mobile air on 2026-08-09; one value now serves both, since
 * the mobile step landed on the figure md was already using.) Miss this and
 * the kicker sits under the nav, which is exactly how the 2026-07-24
 * hero-padding whiplash started.
 *
 * ⚠ THE FORM IS WRITTEN BEFORE THE DETAILS — the client's standing
 * rule, now three passes old: "it definitely shouldn't be before the form on
 * mobile". The three blocks are written masthead → FORM → details and placed
 * with explicit grid coordinates (masthead col 1-5/row 1; form col 7-12
 * spanning BOTH rows; details col 1-5/row 2). So the desktop reads heading
 * over details on the left with the form beside them, while the phone reads
 * heading, form, details. Read the file top to bottom and you are reading the
 * mobile order.
 *
 * THE DETAILS ARE ICON-LED to match the reference: a mark and a value on one
 * line, no label column. The kicker above them is the client's from the
 * previous pass ("a little title above the details on the left") and is kept.
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

      {/* ⚠ SPACING-FREEZE BREACHES, BOTH ON EXPLICIT REQUEST, both using
          values that already exist in the census — no new value is minted.

          MOBILE (2026-08-09): "more padding above and below Contact / Talk to
          the studio / [the lede] on mobile". pt-32 → pt-40 (the figure this
          band already used at md) plus pb-8 md:pb-0 on the masthead block.

          DESKTOP (2026-08-09, same day): "increase the padding on the page on
          desktop so it feels a bit more luxurious". THIS WAS A REAL DEFICIT,
          not a taste top-up, and the cause is worth recording: PageHero's
          `splitBox` contributed md:py-28 (112px) of hero air on every other
          page, and when this page stopped using PageHero only the nav
          clearance came with it. Measured, /contact had 32px of OPTICAL AIR
          below the nav's foot against the house hero target of 144px — it was
          short by almost exactly the 112px the component used to add.

          ⚠ IT CANNOT SIMPLY BE RESTORED TO 144, and this is the one page
          where that trade is real: every other page puts the hero ABOVE its
          content, so hero air costs nothing downstream. Here the masthead and
          the form share ONE band, so top padding pushes the send button down.
          Measured at md:pt-64 (the house figure): optical air 128px, but Send
          needed 63px of scroll at an 800px viewport — re-breaking the exact
          complaint that started this page's three redesigns.

          md:pt-52 / md:pb-44 is the balance point: optical air 80px (2.5× what
          it was), all fields above the fold, Send fully visible at 900px and
          15px down at 800px. If more air is ever wanted, the honest lever is
          shortening the form or the masthead, not more padding. */}
      <GlowBand blob="left" pool padding="pt-40 pb-24 md:pt-52 md:pb-44">
        {/* ── 1. THE MASTHEAD — left column, first row. PageHero's exact H1
               markup and stagger, kept by hand because the component is not
               in this page any more. */}
        {/* pb-8 md:pb-0 is the "below" half of the same request: on mobile
            the grid's gap-12 was the only thing between the lede and the
            form, and she wanted the masthead to breathe. At md the grid owns
            the spacing again, so the padding is reset rather than left to
            double up with the row gap. */}
        <div className="pb-8 md:col-span-5 md:col-start-1 md:row-start-1 md:pb-0">
          <h1 className="display with-overline">
            <span className="overline opacity-0 animate-fade-in">Contact</span>
            {/* ⚠ LOAD-BEARING SPACE — without it the H1 extracts as
                "ContactTalk to the studio." */}{" "}
            <span
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Talk to the <em>studio</em>.
            </span>
          </h1>
          <p
            className="lede body-lg max-w-[46ch] text-bone-dim opacity-0 animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            Questions, introductions, or the beginning of a project. Email us
            directly or use the form; we reply within two working days.
          </p>
        </div>

        {/* ── 2. THE FORM — written BEFORE the details (the mobile order),
               placed in the right columns and spanning BOTH rows so it runs
               the full height of the left rail, as the reference's does.

               ⚠ THE GRADIENT CARD IS GONE (2026-08-09, client: the form
               "conflicts with the background because it's repeating it, but
               just making it less see-through… doesn't feel classy at all…
               the container, for starters, is just ruining everything").
               That diagnosis was exactly right and worth keeping: the card
               was `bg-ink-canvas` + a contained `HeroGlow`, which is THE SAME
               GRADIENT LANGUAGE as the SectionGlow already burning behind
               this band. So it was not a distinct surface at all — it was the
               ground, repeated at a different opacity, which is precisely how
               a panel ends up reading as a smudge. A card can only carry the
               hero's ground where nothing else is (the ContactCTA close sits
               on flat ink; that is why the recipe works THERE and fails here).

               WHAT REPLACES IT IS THE HOUSE FORM PANEL — the same device the
               Start-a-project overlay uses, which is what she pointed at:
               `rounded-ui-lg`, ONE hairline, NO FILL, panel padding. A form's
               container exists to bound what the reader ACTS on, nothing more.

               THE HAIRLINE IS bone/10, AND THE VALUE IS ARGUED. On the
               overlay's bone column the panel is ink/25 while the fields rest
               at ink/35 — the container is deliberately QUIETER than the
               affordance inside it. Preserving that on ink: bone/10
               composites to ≈#28241F against `rule-dark`'s #2F2820, so it
               lands just under the field rule. bone/15 (the nearest existing
               step) computes to ≈#332F2A — BRIGHTER than rule-dark — which
               would invert the relationship, so it was rejected rather than
               reached for because it already existed. */}
        {/* ⚠ THE BASELINE LOCK (2026-08-09, client: "baseline align 'Name',
            the label on the right, with the line that says 'Talk to the' on
            the left, on desktop"). BASELINES LOCK is house canon and it
            forbids eyeballed pt-* nudges, so this offset is DERIVED, and the
            derivation is here so it can be re-derived rather than re-guessed:

              from the H1's top down to its FIRST DISPLAY LINE's baseline
                15.4px   the kicker's line box (.overline, 11px, fixed)
              + 0.35em   the .with-overline flex gap at display tier
              + 1.11em   that line's baseline within its own line box
              from the panel's top down to the FORM TITLE's baseline
              − 68.0px   sm:p-7 padding (28px) + .form-title's own metrics

              offset = 1.46em − 52.6px, em = --display-size

            ⚠ THE LOCKED ELEMENT CHANGED 2026-08-09. It was the NAME label
            (constant 55.1px); the client added the form title and asked for
            THAT line to carry the alignment instead. Only the right-hand
            term moved — the 1.46em is the left column's geometry and is
            unchanged. Re-measure the right-hand term, not the whole thing,
            if the panel padding or the title's register ever changes.

            IT CANNOT BE A STATIC PX VALUE: the display size is a clamp, so
            the true offset runs from ~27px at the small end to ~91px at
            100px display. That is the whole reason `--display-size` exists as
            a token — see globals.css.

            IT IS SCALE-INVARIANT for a good reason: `.display` sets
            `line-height: 1`, so a line box is exactly 1em tall and the
            baseline sits at a FIXED FRACTION of the font-size. Change that
            line-height, the kicker's size, or the panel's padding, and the
            two constants above must be re-measured.

            ⚠ NOT EXPRESSIBLE WITH `items-baseline`, which would otherwise be
            the canon answer. `.with-overline` is a COLUMN FLEX, so the H1's
            first baseline is the KICKER's — CSS would happily lock NAME to
            "Contact", which is not what was asked for. There is no selector
            for "the second line's baseline".

            md+ only: on a phone the columns are stacked and there is nothing
            to align to. */}
        <div className="md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1 md:mt-[calc(1.46*var(--display-size)-52.6px)]">
          <div className="rounded-ui-lg border border-bone/10 p-6 sm:p-7">
            <ContactForm title="Fill out the form" />
          </div>
        </div>

        {/* ── 3. THE DETAILS — last in the DOM, pulled up to the left column's
               second row so they sit under the masthead on desktop. */}
        <div className="md:col-span-5 md:col-start-1 md:row-start-2">
          <p className="overline mb-8 reveal text-clay">Details</p>
          <StudioFactsLedger />
        </div>
      </GlowBand>

    </main>
  );
}
