import type { ReactNode } from "react";

/**
 * THE BALANCED PROSE PAIR — the elaboration that answers a display-scale
 * statement (2026-07-24, client: "a paragraph of text after the we believe
 * section… aligned off to the right"). The prose-beside-statement grammar:
 * the statement speaks at display scale flush left, this answers at body
 * scale seated in the right columns.
 *
 * A SIBLING OF THE STATEMENT'S TRACK, NEVER A CHILD OF IT: inside the
 * `data-manifesto-track` div the extra height could tip the word-fill scrub
 * into its sticky-dwell branch and stall the fill.
 *
 * THE SPAN (2026-07-25, four seats in one morning — full-rail edges, then
 * right-half 3+3, then "it needs to span the width of the border above the
 * image below", then the spare-column gutter looking "huge"): the pair
 * occupies EXACTLY the /services index rows' content column, cols 6–12, so
 * the left edge and the right edge align with the row hairline's ends below.
 * The outer grid runs `gap-10` to MATCH the index grid (which runs gap-10,
 * not the usual md:gap-8), so the col-6 edge sits exactly on the hairline's
 * start.
 *
 * CSS MULTI-COLUMNS, NOT A GRID (fifth seat, client: "paragraphs need to be
 * even… any fancy css stuff?"): every paragraph FLOWS through columns-2 and
 * the browser BALANCES them (column-fill: balance is the default), so the two
 * columns bottom out even at every viewport regardless of copy length — true
 * newspaper setting. The trade is that a paragraph may break across the
 * gutter mid-sentence, which is exactly how editorial columns behave.
 * `[orphans:1]`/`[widows:1]` are not decoration: browsers default both to 2
 * in column fragmentation, so the balancer can only move lines in PAIRS, and
 * that quantisation was the stubborn two-line offset. Allowing single-line
 * breaks lets balance land within one line.
 *
 * The reveal rides the WRAPPER, not the paragraphs: per-paragraph reveals
 * would fade a column-split paragraph in two stages.
 *
 * FLOWING, NOT MARKED (2026-07-31, client: an indent made the second
 * paragraph "jut in" and unbalance the columns — "make it very flowing"): at
 * md there is no inter-paragraph margin and no first-line indent, so the
 * paragraphs read as one continuous stream through the balanced columns. A
 * margin stays off the table at md, since it defeats column-fill: balance.
 * Mobile keeps the stacked mb-6 separation. The newspaper first-line indent
 * lives in git history if paragraph marks are ever wanted back.
 *
 * FOOT AIR: desktop 144 → 192 (2026-07-31, client asking for more air "under
 * the two paragraphs") so the pair releases with a fuller breath before
 * whatever answers it arrives.
 */
export default function BalancedProsePair({
  paragraphs,
}: {
  /** Two or more paragraphs, which FLOW through the balanced columns rather
      than sitting one per column: copy lengths need not match. */
  paragraphs: ReactNode[];
}) {
  return (
    <div className="shell relative z-10 pb-24 md:pb-48">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="reveal md:col-span-7 md:col-start-6 md:columns-2 md:gap-10 [orphans:1] [widows:1]">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={
                i < paragraphs.length - 1
                  ? "body-lg mb-6 text-bone-dim md:mb-0"
                  : "body-lg text-bone-dim"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
