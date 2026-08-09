/**
 * THE SECTION HANDOVER — the fade-to-ink overlay a section wears as it exits
 * the top of the viewport, handing the stage to the section arriving beneath
 * (restored 2026-07-11, "the live-era section handover the client loved").
 * Extracted 2026-08-05: it was the most-repeated unit on the homepage, three
 * verbatim copies of one div.
 *
 * ⚠ THE PARENT IS THE MEASURED SCOPE. `<ExitFades />` in the root layout
 * measures `el.parentElement`, so this must be a DIRECT child of the section
 * it fades, and that section must be `relative` — no wrapper div between them,
 * or the fade times against the wrong box. It renders nothing of its own
 * around the overlay for that reason.
 *
 * ⚠ THE FILL IS DARKER THAN --ink, AND THAT IS THE WHOLE POINT (2026-08-09,
 * client: "it works, but just not quite enough… make it a bit darker"). It
 * was `bg-ink` — THE SAME COLOUR AS THE BANDS IT FADES — so on a flat ink
 * section it could only ever dim the CONTENT; the ground was already at the
 * fill's own value and had nowhere to go. globals' own profile note conceded
 * this in passing ("dark CONTENT sections, whose ink-on-ink background can't
 * show a late fade"). #070505 is past the bottom of the scale, so the band
 * itself now deepens as it leaves rather than just losing its contents.
 *
 * It is a RAW VALUE on purpose and stays warm on purpose: no token is darker
 * than --ink (#110E0A), and this needs to go beyond it, which is the
 * sanctioned "unexpressible value" case in the adjudication rule. R > B
 * keeps it on the palette's warm axis — a fade to pure #000 would reintroduce
 * the cool black the 2026-07-31 re-tone removed, on the largest surface on
 * the page. Not tokenised because it has exactly one consumer: this file.
 *
 * `timing` picks the profile documented in globals.css: "long" is the early
 * window (bottom 78vh → 14vh) for dark CONTENT sections, whose ink-on-ink
 * ground can't show a late fade, and it is what every live consumer takes;
 * "late" (45vh → 8vh) is for sections whose foot is a full-bleed visual, and
 * has had no live consumer since the ContactCTA close stopped being the cream
 * back cover.
 *
 * Mount it only where the driver is wanted: a documentation specimen should
 * leave it off, or the overlay will ink the specimen over as it scrolls.
 */
export default function ExitFadeOverlay({
  timing = "long",
}: {
  timing?: "long" | "late";
}) {
  return (
    <div
      aria-hidden
      className={`exit-fade ${
        timing === "long" ? "exit-fade-long " : ""
      }absolute inset-0 z-20 bg-[#070505]`}
    />
  );
}
