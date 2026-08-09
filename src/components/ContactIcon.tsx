/**
 * THE CONTACT MARKS (2026-08-09, client: "maybe some icons or something for
 * the socials", then a Relume contact1 reference whose details list is
 * ICON-LED — glyph and value on one line, no label column). It was
 * SocialIcon for half a day; the email row needed a mark too the moment the
 * labels went, and an "email" case does not belong in something called
 * SocialIcon.
 *
 * HAND-DRAWN, NEVER AN IMPORTED ICON SET — the StageGlyph rule, and for the
 * same reason: an icon library arrives with its own line weight, its own
 * corner radii and its own optical sizing, none of which are ours, and the
 * moment one lands every future icon is chosen from that set instead of
 * drawn for this brand.
 *
 * They are drawn at a NON-SCALING 1px hairline in `currentColor`, so a social
 * mark carries the SAME LINE as the ledger rules it sits between and inherits
 * the row's own colour (bone at rest, champagne on hover) with no per-state
 * plumbing. That is the whole reason these are strokes rather than the filled
 * glyphs the platforms ship: a solid black-and-white logo dropped into this
 * page would be the only filled shape in a column made entirely of hairlines.
 *
 * ⚠ THESE ARE SIMPLIFIED WORDLESS MARKS, not the platforms' official logo
 * files, and they are used only to label a link to the studio's OWN profile.
 * Don't redraw them "more accurately" — closer to the real trademark is worse
 * here, not better, both legally and visually.
 *
 * Size is fixed at 18px rather than em-scaled: these sit beside `.body` text
 * in one place, and an icon that tracked a fluid type scale would wobble
 * against the ledger's fixed hairlines.
 */
export type ContactChannel = "email" | "instagram" | "linkedin";

export default function ContactIcon({
  name,
  className = "",
}: {
  name: ContactChannel;
  /** Colour comes from the consumer via currentColor; this is for layout. */
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 18 18"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      /* Decorative. ⚠ THIS PUTS THE BURDEN ON THE CONSUMER: since the
         ledger's visible LABEL column went away, the row's own aria-label is
         now the only thing naming the channel to a screen reader. Keep it
         there, or these rows become "studio@northandrefine.com" with no
         indication of what the glyph beside it means. */
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {name === "email" ? (
        <>
          {/* Envelope: the body, then the flap folding to the centre. Drawn
              open-flap rather than closed so it reads at 18px — a closed
              envelope at this size is just a rectangle. */}
          <rect x="2.5" y="4" width="13" height="10" rx="1.5" />
          <path d="M2.9 4.9 9 9.7l6.1-4.8" />
        </>
      ) : name === "instagram" ? (
        <>
          <rect x="2.5" y="2.5" width="13" height="13" rx="4" />
          <circle cx="9" cy="9" r="3.25" />
          {/* The lens dot is the one filled mark — at 1.2px across a hairline
              ring would read as a smudge rather than a dot. */}
          <circle cx="12.9" cy="5.1" r="0.6" fill="currentColor" stroke="none" />
        </>
      ) : (
        <>
          <rect x="2.5" y="2.5" width="13" height="13" rx="2.5" />
          {/* i */}
          <circle cx="6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
          <path d="M6 8.3V12.4" />
          {/* n — stem, then the shoulder turning into the second leg */}
          <path d="M9 12.4V8.3" />
          <path d="M9 10.1c.2-1.1 1-1.8 2-1.8s2.4.6 2.4 2.1v2" />
        </>
      )}
    </svg>
  );
}
