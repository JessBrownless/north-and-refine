import ManifestoStatement from "@/components/ManifestoStatement";

/**
 * THE BELIEF — the studio's conviction, in the homepage manifesto's
 * compartment (2026-07-24, client: "the same, layout-wise… I don't want them
 * to feel too different"). The shared <ManifestoStatement> fills the words in
 * as you scroll, so this follows the homepage's grammar exactly: display
 * register, statement alone, and NO italic accent — the fill IS the emphasis,
 * which is why the homepage manifesto carries no <em> either. `text` is a
 * plain string for the same reason: the compartment splits it word by word.
 *
 * THE HANGING-KICKER INDENT (2026-07-24, client ref: the "[Our Approach]"
 * statement pattern) — the kicker sits inside the first line's indent, the
 * statement runs flush left underneath and fills the rail. The wrapper
 * carries `.belief-statement` too, so the kicker's em-offsets track the
 * statement's own clamp; the indent is md+ only, because 22% of a phone is
 * narrower than the label, and on mobile the kicker stacks above instead.
 * The kicker holds the belief-verb ("Our belief") so the big words can start
 * at the substance: the statement dropped its old "We believe that" opener
 * the same day.
 *
 * AIR: the handoff's 160px foot holds; the desktop top stepped 160 → 208
 * (2026-07-31, client: "a bit more padding on top of the We Believe
 * section… on desktop at least") because the hero's new foot hairline makes
 * the belief a stated new chapter and the deeper breath sells it. Mobile
 * keeps 96 (2026-07-24, client: "padding feels a bit off" on the phone,
 * where the desktop pads stacked into dead screens).
 *
 * The whole block rides `.reveal` (2026-07-24, client: the section "needs to
 * fade in a bit in some way") — the fill completes by mid-viewport per the
 * handoff, so a fast scroller met it already lit and static; the 1.1s
 * entrance fade gives it an arrival and the word opacities compose with it
 * untouched.
 *
 * ⚠ THE `data-manifesto-track` WRAPPER IS LOAD-BEARING. <ManifestoStatement>
 * scrubs against the nearest `[data-manifesto-track]`, falling back to the
 * nearest <section>. Here the belief SHARES its section with the prose pair
 * and the whole scroll index (see <BeliefCanvas>), so without the attribute
 * the scrub would measure the entire combined block and the fill would
 * complete deep inside the index rows instead of during the statement's own
 * dwell. Keep the attribute on the padded div that wraps the statement.
 *
 * ⚠ THE COMMENT THAT USED TO SIT HERE WAS WRONG, and this is the correction
 * rather than a change of behaviour. It claimed the belief ran on "the same
 * 140vh sticky track" as the homepage manifesto, and carried a note about the
 * track being "tightened 140vh → 118vh". Neither has been true since
 * 2026-07-24: what ships is a PLAIN PADDED DIV in normal flow, no sticky
 * wrapper and no track height at all. Git resolves which was intended — the
 * pin was REMOVED on purpose that day (commit 783826c, third pass: the client
 * felt "friction" at this section and the sticky pin was the culprit; the
 * 118vh track had cut the dwell to ~18vh, long enough to snag the scroll and
 * too short to read as a deliberate hold, so rather than lengthen the hold
 * the pin went). <ManifestoStatement> fills the words as the block travels
 * up the viewport. The homepage manifesto held its pin another fortnight on
 * centrepiece grounds ("the long dwell reads as intent"), then got the same
 * verdict from the same reader on 2026-08-07 — it "blocks the screen into
 * place" — and unpinned into a min-h air band. NO PIN ANYWHERE now; the
 * compartment runs in normal flow on both pages. (The stale sticky claim
 * once came back in with a comment rewrite (9713f54) that lost the removal
 * note — which is why this history stays written down.)
 */
export default function BeliefStatement({
  kicker,
  text,
}: {
  /** The hanging label. Holds the belief-verb; the statement doesn't. */
  kicker: string;
  /** PLAIN TEXT, no markup: the compartment splits it per word for the
      scroll-fill, and the fill is the emphasis. */
  text: string;
}) {
  return (
    <div data-manifesto-track className="relative z-10 py-24 md:pb-40 md:pt-52">
      <div className="shell">
        <div className="belief-statement reveal relative">
          <p className="overline mb-6 text-clay reveal md:absolute md:left-0 md:top-[0.3em] md:mb-0">
            {kicker}
          </p>
          <ManifestoStatement
            text={text}
            className="belief-statement max-w-none text-bone md:indent-[22%]"
          />
        </div>
      </div>
    </div>
  );
}
