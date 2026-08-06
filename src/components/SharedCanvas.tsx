import type { ReactNode } from "react";
import HeroGlow from "@/components/HeroGlow";

/**
 * THE SHARED CANVAS — one ground carrying several dark sections so they read
 * as a single surface (2026-07-23, third pass of the day). Live on /about
 * (hero, mock-up ream, who-we-are) and, since 2026-08-07, the HOMEPAGE
 * (hero + manifesto — a seam was reported at exactly that join, and this
 * component is the prescribed fix). Named AboutSharedCanvas until the second
 * consumer arrived; nothing about it was ever /about-specific.
 *
 * THIS IS THE ONE SANCTIONED WAY TO BLEND DARK SECTIONS (see CLAUDE.md,
 * "Blending dark sections"). When the client asks for the hero gradient to
 * "fade through" into what follows ("they need to almost be one"), ONE
 * wrapper owns the whole ground: warm base, ONE <HeroGlow> spanning every
 * band, `grain`, and a foot strip fading to page ink before the next normal
 * section. Children render GROUNDLESS on it — PageHero takes `ground={false}`.
 *
 * ⚠ DO NOT TRY TO BLEND TWO SEPARATELY-GROUNDED SECTIONS BY COLOUR-MATCHING
 * THEIR BOUNDARY. The seam contract (the hero fades to an anchor tone, the
 * next section's SectionGlow wash resumes from exactly that tone) shipped and
 * FAILED TWICE ON THIS PAGE. It fails because /about's glow is still bright
 * at the hero's foot: both sides dipped dark at the boundary and the join
 * read as a line with a film over the ream. Any residual mismatch does it —
 * a glow still lit at the foot, the 4% grain lift on one side only, a clipped
 * blur restarting warmth below the line. There is no seam to hide here
 * because no seam exists. The second attempt (end the canvas at the ream,
 * hand off to a SectionGlow in who-we-are) left a visible line too, which is
 * when the client called it: fix it the way that WORKED, one wrapper.
 *
 * THE FOOT FADE is part of the recipe, not decoration: the canvas resolves to
 * canonical ink over its last stretch so whatever follows joins invisibly
 * (ink meets ink) and the designed ink→bone cut happens where it was drawn,
 * not at the wrapper's edge.
 *
 * ⚠ `overflow-hidden` is required here (the glow blobs must be clipped), so
 * NOTHING INSIDE THIS CANVAS MAY USE position:sticky — an overflow-hidden
 * ancestor becomes the sticky element's scroll container and the pin silently
 * stops working. A canvas that needs to hold sticky content wants the
 * sibling-clipping-layer arrangement instead (see <BeliefCanvas>).
 */
export default function SharedCanvas({
  children,
  intensity = 0.7,
}: {
  children: ReactNode;
  /** Glow dose. 0.9 → 0.7 in the 2026-07-24 sitewide "bit much" trim; the
      canvas keeps a touch more than the interior heroes since it feeds the
      glass tiles of the ream too. */
  intensity?: number;
}) {
  return (
    <div className="relative overflow-hidden grain bg-ink-canvas">
      <HeroGlow intensity={intensity} />
      {/* The canvas foot resolves to page ink over its last stretch — what
          follows on /about is BONE, so the dark story ends on canonical ink
          before the designed ink→bone cut. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: "clamp(200px,26vh,340px)",
          background:
            "linear-gradient(180deg, rgba(17,14,10,0) 0%, var(--ink) 100%)",
          pointerEvents: "none",
        }}
      />

      {children}
    </div>
  );
}
