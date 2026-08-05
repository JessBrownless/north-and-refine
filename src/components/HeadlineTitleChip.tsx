/**
 * THE HEADLINE TITLE CHIP — a small 16:10 plate set INTO a display headline,
 * between the words (2026-07-23 comp, the /work `wide` masthead: "The work,
 * and ▯ the difference it ▯ made."). Sized in `em`, so it rides the display
 * clamp and grows with the H1 rather than against it.
 *
 * BLANK for now (same-day client call, matching the blanked mock-ups
 * sitewide): quiet dark glass until imagery is rechosen. When it is, these
 * should be REAL case-study captures. On /work decorative imagery would
 * cheapen the real work below, but the work itself woven into the sentence is
 * the page's own argument.
 *
 * DECORATIVE, so it stays a plain aria-hidden span with no image and nothing
 * for screen readers: the sentence has to read cleanly without it.
 *
 * ⚠ THE RAW `rounded-[0.12em]` CAME ACROSS FROM THE LIVE MARKUP UNCHANGED
 * (extracted 2026-08-05) and is the one sanctioned radius freelance in the
 * type. The plate tokens are fixed px or viewport clamps; this corner has to
 * scale with the letterform it sits inside, which nothing on either scale
 * does. Moving it onto a token would break the em lockup.
 *
 * ⚠ WRAP THE CHIP AND ITS NEIGHBOURING WORDS in `whitespace-nowrap` at the
 * call site: a chip orphaned onto its own line reads as a broken image.
 */
export default function HeadlineTitleChip() {
  return (
    <span
      aria-hidden
      className="mx-[0.06em] inline-block h-[0.72em] w-[1.15em] overflow-hidden rounded-[0.12em] bg-ink-raised align-[-0.06em]"
    />
  );
}
