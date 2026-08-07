/**
 * SECTION GLOW — the hero blend's CONTINUATION (2026-07-23, client: the hero
 * gradient "needs to go through to the next section… a blob or something that
 * helps it fade into the next section, and then an individual blob in the next
 * section of each"; tightened same day: "there's clear lines where one section
 * starts and ends — they need to almost be one").
 *
 * THE SEAM CONTRACT: dark PageHeroes resolve their ground to ONE FIXED TONE
 * (#14100B — the seam anchor strip in PageHero) at their bottom edge, and this
 * component's wash starts from exactly that tone at the section's top edge,
 * decaying to the section's flat ink by ~half its height. Same colour both
 * sides of the boundary → no visible line. Change the tone in one place,
 * change it in both.
 *
 * Layers (all absolute + pointer-events-none, painted in order):
 *  1. THE INDIVIDUAL BLOB — one quiet in-family glow deeper in the section,
 *     placed left or right per page so neighbouring pages don't repeat.
 *  2. THE AMBER TAIL — a faint warm pool bleeding down from the seam.
 *  3. THE SEAM WASH — #14100B solid at the top edge, gone by ~half height.
 *     Painted LAST so the seam tone wins over the blobs at the boundary.
 *
 * Same family as <HeroGlow> at a fraction of the dose — the ground below the
 * fold stays essentially flat ink; this is the blend's decay, not a second
 * hero. The parent section must be position:relative + overflow-hidden (keep
 * its bg-ink), with content above on z-10.
 */
export default function SectionGlow({
  blob = "right",
  intensity = 1,
  seamEmphasis = false,
}: {
  /** Which side the section's individual blob sits — vary per page. */
  blob?: "left" | "right";
  intensity?: number;
  /** The /services hero→belief seam ONLY (2026-07-24 services-pacing
      handoff): richer tail (opacity 0.16, ~44% tall, 84% wide) and a
      slightly stronger side blob (0.09), so the hero's warmth carries
      further into the belief before decaying to flat ink. Exact spec
      values — other pages keep the standard dose; don't reach for this
      to "warm up" a section. */
  seamEmphasis?: boolean;
}) {
  /* THE CANON DOSES (logged at /stylesheet → Atmosphere). THIRD trim
     2026-08-08 ("knock the glow back across the whole site — it's still
     too much!!") — blob 0.05 → 0.03, tail 0.08 → 0.05, seamEmphasis
     0.07/0.12 → 0.04/0.07, a ~40% step following the ~30% trims of
     2026-07-24 and 2026-08-01. Change these, change the /stylesheet
     Atmosphere entry in the same commit. */
  const blobOpacity = (seamEmphasis ? 0.04 : 0.03) * intensity;
  const tailOpacity = (seamEmphasis ? 0.07 : 0.05) * intensity;
  const tailHeight = seamEmphasis ? "44%" : "34%";
  const tailWidth = seamEmphasis ? "84%" : "80%";
  return (
    <>
      {/* 1 — the individual blob, one per section, side varies per page. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          [blob === "left" ? "left" : "right"]: "-14%",
          top: "34%",
          width: "46%",
          height: "40%",
          borderRadius: "50%",
          background: "var(--champagne)",
          // Doses trimmed ~30% 2026-07-24 (client: "a bit much" on some
          // pages) — blob 0.10 → 0.07, tail 0.16 → 0.11.
          opacity: blobOpacity,
          filter: "blur(150px)",
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />
      {/* 2 — the amber tail bleeding down from the seam. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "-12%",
          // translateZ composes WITH the centering — one transform key only
          // (a bare translateZ once overwrote the translateX and shoved the
          // tail off-centre, 2026-07-24).
          transform: "translateX(-50%) translateZ(0)",
          width: tailWidth,
          height: tailHeight,
          borderRadius: "50%",
          background: "#8A5A2E",
          opacity: tailOpacity,
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      {/* 3 — the seam wash: STARTS AT THE ANCHOR TONE (#14100B, matching the
          hero's foot exactly) and decays to the section's flat ink. Painted
          last so the boundary colour is authoritative. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: "52%",
          maxHeight: 640,
          background:
            "linear-gradient(180deg, #14100B 0%, rgba(20,16,11,0.7) 30%, rgba(20,16,11,0) 100%)",
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}
