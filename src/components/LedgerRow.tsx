import type { ReactNode } from "react";

/**
 * THE LEDGER ROW — a hairline, cells locked on a baseline, nothing else.
 * Named in /stylesheet's Molecules tier 2026-08-02, built 2026-08-05.
 *
 * THE RULE IS THE ROW. It carries no background, no radius and no padding
 * beyond its own vertical rhythm; the cells lock on a FIRST baseline, never
 * on a box edge and never with an eyeballed pt-* nudge (BASELINES LOCK, and
 * drift pattern 13 is what happens without it). Those two things — the
 * hairline and the lock — are the only things a consumer cannot pass in or
 * turn off. Everything a row needs to be a particular row is a named layout.
 *
 * TWO SHIPPED SHAPES, and they are named rather than assembled:
 *
 *   "split"    label left, value right, two cells (/contact's studio facts).
 *   "indexed"  index numeral · title · body on a three-column grid, the body
 *              wrapping under the title on mobile (/about's method beats).
 *
 * The class strings are written out WHOLE, per shape, the way RuledLinkRows
 * writes its two. That is not laziness about a shared template: it is what
 * keeps a row's rhythm from being freelanced at the call site. A third shape
 * adds a NAMED layout here, with the argument for it in this comment; it
 * never arrives as a class string passed through a prop, and it never
 * re-tunes the gaps on an existing shape to get closer to itself.
 *
 * ⚠ EVERY SPACING VALUE BELOW IS THE LIVE ONE, unchanged on extraction. The
 * two shapes disagree (py-5 against py-8/md:py-10, gap-x-8 against
 * gap-x-5/md:gap-x-8) because one is a rail of three short facts and the
 * other is a full-rail beat with two columns of prose. Reconciling them is a
 * spacing decision, taken deliberately and in one place, not a tidy-up.
 *
 * TONE IS A PROP, NEVER A FORK (the FaqSection precedent). It selects the
 * hairline only: `rule-dark` on ink, `rule-light` on bone. The CELLS' tints
 * stay with the consumer, because the ladder that a cell reads on is a
 * property of the copy, not of the rule above it — /contact's clay kicker is
 * the sanctioned tracked-caps exception, /about's index numeral takes
 * `text-ink-mute` because clay is sub-AA on bone.
 *
 * WHICH EDGE. `rule="bottom"` closes each row and wants a `border-t` on the
 * container so the stack opens with one too (the facts rail); `rule="top"`
 * opens each row and leaves the stack's foot open (the method beats, which
 * run into the section's own padding). Pick by what the last row should do.
 *
 * REPLACED: the hand-rolled rows in `StudioFactsLedger` and `MethodSection`.
 *
 * ⚠ TWO OF THE FOUR CONSUMERS THE MOLECULES TIER NAMES ARE NOT THIS SHAPE,
 * and were deliberately left alone:
 *  · ServicesScrollIndex's DELIVERABLES are a dash-ruled LIST, not ruled
 *    rows: one hairline above the whole `ul`, two columns of `li`, each
 *    carrying a 16px dash GLYPH and locked with items-center. Nothing
 *    separates the items, so there is no row and no rule to be the row.
 *    (It also has no live consumer: the /services hub stopped passing
 *    `deliverables` in the 2026-07-24 split, so that branch renders nowhere.)
 *  · work/[slug] has no deliverables at all. Its meta rail is ArticleHeader's
 *    `<dl>` of term-over-value pairs, stacked and unruled; the deliverables
 *    the tier is thinking of live on /services/[slug], via OfferBand.
 */

/** The two shipped shapes, verbatim, with the hairline spliced in where the
    live strings carry it. Read the layout note above before adding a third. */
const LAYOUT = {
  split: (rule: string) =>
    `flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 ${rule} py-5 reveal`,
  indexed: (rule: string) =>
    `grid grid-cols-[3rem_1fr] items-baseline gap-x-5 gap-y-3 ${rule} py-8 reveal md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-8 md:gap-y-0 md:py-10`,
} as const;

export default function LedgerRow({
  layout,
  children,
  tone = "dark",
  rule = "bottom",
  delay,
}: {
  /** The shape. See the two named above; pick by what the row IS. */
  layout: keyof typeof LAYOUT;
  /** The cells, in reading order. The consumer owns their type and tints. */
  children: ReactNode;
  /** The ground the row sits on. Selects the hairline and nothing else. */
  tone?: "dark" | "light";
  /** Which edge the hairline sits on. */
  rule?: "top" | "bottom";
  /** Entrance step in ms, as an inline transitionDelay on the row's own
      `.reveal`. Undefined emits no style attribute, so a first row can start
      the moment it enters; zero is a real value and emits `0ms`. */
  delay?: number;
}) {
  const hairline = `${rule === "top" ? "border-t" : "border-b"} ${
    tone === "light" ? "rule-light" : "rule-dark"
  }`;

  return (
    <div
      className={LAYOUT[layout](hairline)}
      style={delay === undefined ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
