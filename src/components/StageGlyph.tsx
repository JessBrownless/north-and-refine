/**
 * StageGlyph — the process-plate glyphs, motion-ready (M·1 "drawn by the page").
 *
 * The rule system, curved: each glyph is the site's own 1px hairline
 * (--ink-line / .rule-dark) bent into a pure form. Invariants (see the
 * stage-glyphs brief — they are constraints, not suggestions):
 *
 *  - viewBox 0 0 64 64; forms keep ≥ 6 units of margin from every edge.
 *  - Every stroke: fill none / stroke currentColor / stroke-width 1 /
 *    vector-effect non-scaling-stroke (load-bearing — keeps the stroke
 *    identical to .rule-dark at every rendered size).
 *  - Allowed elements: circle, line, rect (square, no rx), polygon
 *    (triangles only). No <path>, no béziers, no arcs.
 *  - The only fill is the dot: a filled circle, r ≤ 3 — the NR gesture.
 *    (Not in the current working set — kept for alternates.)
 *  - One or two forms per glyph, never three.
 *  - Decorative always: aria-hidden; the plate's title + body must carry
 *    the full meaning with the glyph deleted.
 *
 * MOTION (M·1): strokes carry pathLength={100} and the .sg-stroke class.
 * The CSS in globals.css (see globals-additions.css) draws them in when
 * the glyph sits inside a `.reveal` that gains `.is-in` — the plate's
 * existing entry. Outside a .reveal the glyph renders fully drawn, so the
 * component is safe anywhere. Stagger per plate via a --sg-delay custom
 * property on the .reveal element. The global reduced-motion guard snaps
 * everything to the end state — no extra handling needed.
 *
 * Colour comes from the parent via currentColor:
 *   on light → text-ink/70
 *   on ink   → text-champagne per current canon; brand-white (bone /
 *              bone-dim) is the open decision in canon-updates.md §6.
 * Render at h-12 w-12 to h-14 w-14 (48–56px). Below ~32px overlaps muddy;
 * above ~80px the glyph competes with the type ladder.
 *
 * Working set R5 (2026-07-10): 01g · 02e · 03a · 04a · 05g.
 * The row reads as a sequence: two views focus (01), rings narrow (02),
 * forms compose (03), structure stands (04), the form is trued to its
 * rule (05).
 * Alternates on record — 01: 01e bearing, 01f survey. 05: 05h meridian,
 * 05i successive passes, 05j pare. Coordinates in canon-updates.md §3.
 */

type StageGlyphProps = {
  stage: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

/** Shared line props — reuse for every stroked element in every glyph. */
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

/** First form: draws on .reveal entry. pathLength 100 normalises every
 *  shape so one dash value fits all. */
const drawn = {
  ...line,
  pathLength: 100,
  className: "sg-stroke",
} as const;

/** Second form: same, +220ms. */
const drawnSecond = {
  ...line,
  pathLength: 100,
  className: "sg-stroke sg-stroke-2",
} as const;

export default function StageGlyph({ stage, className }: StageGlyphProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {/* 01 Discovery — the lens pair. Two views brought into focus;
          the overlap between them is literally a lens. */}
      {stage === 1 && (
        <>
          <circle cx="24" cy="32" r="16" {...drawn} />
          <circle cx="40" cy="32" r="16" {...drawnSecond} />
        </>
      )}

      {/* 02 Strategy — the rings. Concentric intent, options narrowing
          to a plan. */}
      {stage === 2 && (
        <>
          <circle cx="32" cy="32" r="20" {...drawn} />
          <circle cx="32" cy="32" r="10" {...drawnSecond} />
        </>
      )}

      {/* 03 Design — form studies; composition. Corner-lock: the circle
          centred exactly on the square's SE corner. */}
      {stage === 3 && (
        <>
          <rect x="14" y="14" width="24" height="24" {...drawn} />
          <circle cx="38" cy="38" r="12" {...drawnSecond} />
        </>
      )}

      {/* 04 Build & launch — structure. Equilateral, settled. */}
      {stage === 4 && <polygon points="32,13 51,46 13,46" {...drawn} />}

      {/* 05 Refine — trued. The form seated exactly on its rule:
          no gap, no overlap. Precision as tangency. */}
      {stage === 5 && (
        <>
          <circle cx="32" cy="28" r="18" {...drawn} />
          <line x1="10" y1="46" x2="54" y2="46" {...drawnSecond} />
        </>
      )}
    </svg>
  );
}
