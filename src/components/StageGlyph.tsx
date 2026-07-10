// Stage glyphs — abstract geometric SVG marks for the five process stages
// (2026-07-10, user-directed: "SVG shape icons"). NOT pictograms — pure
// forms in a compass/optical vocabulary, echoing the NR dot-compass mark:
//   1 Discovery — circle + centre dot (the lens)
//   2 Strategy  — crossed axes (the map)
//   3 Design    — square overlapping circle (form studies)
//   4 Build     — triangle (structure)
//   5 Refine    — concentric circles (honing)
// Drawn at a NON-SCALING 1px stroke so the icons carry the same hairline as
// the rules — the icon system is the rule system, curved. Colour comes from
// currentColor: champagne is the sanctioned ornament-glyph use.

interface StageGlyphProps {
  /** Stage number, 1–5. */
  stage: number;
  className?: string;
}

export default function StageGlyph({ stage, className = "" }: StageGlyphProps) {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      {stage === 1 && (
        <>
          <circle cx="32" cy="32" r="22" {...line} />
          <circle cx="32" cy="32" r="2.5" fill="currentColor" stroke="none" />
        </>
      )}
      {stage === 2 && (
        <>
          <line x1="32" y1="6" x2="32" y2="58" {...line} />
          <line x1="6" y1="32" x2="58" y2="32" {...line} />
        </>
      )}
      {stage === 3 && (
        <>
          <rect x="11" y="11" width="30" height="30" {...line} />
          <circle cx="41" cy="41" r="14" {...line} />
        </>
      )}
      {stage === 4 && <polygon points="32,9 55,52 9,52" {...line} />}
      {stage === 5 && (
        <>
          <circle cx="32" cy="32" r="22" {...line} />
          <circle cx="32" cy="32" r="11" {...line} />
        </>
      )}
    </svg>
  );
}
