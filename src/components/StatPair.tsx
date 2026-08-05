import type { ReactNode } from "react";

/**
 * THE STAT PAIR — a `.stat` numeral with its caption beneath it, and
 * optionally a `.fineprint` qualifier under that. Named in /stylesheet's
 * Molecules tier 2026-08-02, built 2026-08-05.
 *
 * THE RULE: the numeral is the whole register and the caption never competes
 * with it. Three per band at most, divided by a left hairline from the second
 * onward rather than by boxes. And every figure must be one the studio could
 * defend in front of the client it came from (the 2026-07-10 receipts audit),
 * which is why this component NEVER carries a value of its own: both live
 * bands hand it data, one from a case study's frontmatter and one from a list
 * of promises the studio controls.
 *
 * WHAT IT DOES NOT OWN. The divider, the reveal and the tile surface all
 * arrive through `className`, because they belong to the BAND, not the pair:
 * ResultsBand rules its columns apart and staggers them left to right,
 * the Start-a-project bento sets each pair in a `.glass-float` tile. A pair
 * that carried its own divider could not be used in either.
 *
 * THE CAPTION REGISTER CARRIES ITS OWN GAP, and that is deliberate rather
 * than an oversight to be swept: `.label` is 11px tracked caps and needs more
 * air off a numeral than a 13px `.body-sm` sentence, so the two shipped
 * treatments are written out whole in CAPTION below. Neither value moved on
 * extraction. If they are ever reconciled it is a spacing decision made in
 * one place, which is the point of the table.
 *
 * DARK GROUND ONLY, today. Both live bands sit on ink, so the tints are
 * fixed rather than resolved through a tone prop — an unused light branch
 * would be a claim this page has never tested. When a light consumer arrives,
 * tone becomes a PROP resolved through the same table (the FaqSection
 * precedent), never a fork: on bone the numeral takes `text-ink` and the
 * caption the on-light ladder, because `text-bone-dim` on paper is nothing.
 *
 * ⚠ THE START-A-PROJECT CAPTIONS ARE LOAD-BEARING COPY. "Working days to a
 * personal reply", "Steps to send", "Obligation" are the studio's true
 * promises, standing in for client results that do not exist in the repo yet
 * (the illustrative +212% set lasted one round on 2026-08-01 before the
 * client killed it). Change the wording and you change a promise.
 *
 * REPLACED: the hand-rolled pairs in `ResultsBand` (work/[slug]'s results
 * band) and `StartProjectOverlay` (the promise bento). /pricing's package
 * price is NOT one of these — see the note at the foot of this file.
 */

/** The two shipped caption treatments, verbatim. Order and spacing are the
    live strings; see the register note above before touching either. */
const CAPTION = {
  /** The meta register: work/[slug]'s results band. */
  label: "label text-bone-dim mt-3",
  /** The short-sentence register: the Start-a-project promise bento. */
  "body-sm": "body-sm mt-2 text-bone-dim",
} as const;

export default function StatPair({
  value,
  caption,
  captionAs = "label",
  note,
  className = "",
  delay,
}: {
  /** The numeral, exactly as it should read. A ReactNode and never a number:
      the qualifier is part of the claim ("156%", "3", "from $9,000"), and no
      component on this site formats or rounds a figure. */
  value: ReactNode;
  /** The line under the numeral. One phrase; it is a caption, not a sentence
      the numeral introduces. */
  caption: ReactNode;
  /** Which register the caption sits in. `.label` for a band of metrics,
      `.body-sm` where the caption is a short clause. The gap rides with it. */
  captionAs?: keyof typeof CAPTION;
  /** The optional `.fineprint` qualifier under the caption: the sentence that
      says what the promise actually means. Omit it and nothing renders. */
  note?: ReactNode;
  /** The band's own concerns: the divider, the `.reveal`, the tile surface.
      Passed through untouched. */
  className?: string;
  /** Entrance step in ms, as an inline transitionDelay. Undefined emits no
      style attribute at all, so a first row that starts the moment it enters
      stays free of one. Zero is a real value and emits `0ms`. */
  delay?: number;
}) {
  return (
    <div
      className={className}
      style={delay === undefined ? undefined : { transitionDelay: `${delay}ms` }}
    >
      <p className="stat text-bone">{value}</p>
      <p className={CAPTION[captionAs]}>{caption}</p>
      {note && <p className="fineprint mt-1 text-bone-dim/80">{note}</p>}
    </div>
  );
}

/* ⚠ /PRICING IS NOT A CONSUMER, and the Molecules tier's list is wrong to
   name it. `PricingPackageGrid` renders a lone `.stat` price mid-flow in a
   card: the line above it is the package NAME at `.heading-md` and the line
   below is the card's `.body` summary sentence. Neither is a caption to the
   figure — the summary describes the package, not the price — so there is no
   pair to extract. Folding it in would mean wrapping one paragraph in a div
   that does not exist today, which moves the rendered output for no gain.
   The price stays where it is until it earns a caption. */
