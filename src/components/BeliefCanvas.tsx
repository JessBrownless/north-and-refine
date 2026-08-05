import type { ReactNode } from "react";
import SectionGlow from "@/components/SectionGlow";

/**
 * THE BELIEF CANVAS — the /services dark middle, one surface carrying the
 * belief statement, the supporting prose pair and the scroll index.
 *
 * WHY ONE SURFACE (2026-07-24, client: the belief and the index read as "two
 * completely separate text sections"): this section owns the ground, the
 * belief's track runs first, and the index rows begin as the statement
 * releases, so the statement reads as the index's opening line rather than
 * its own island. Children compose the beats; the canvas only holds the
 * ground and the atmosphere.
 *
 * THE GROUND: ink + grain + one clipped glow layer. This section adjoins the
 * hero, so it owns the seam blend; everything below it sits on plain ink. The
 * glow is the STANDARD dose (2026-07-31, stepped down from `seamEmphasis`):
 * with the hero's foot hairline the boundary is a stated divide, so the
 * warmth resolves at the line instead of washing over it. The two canvas
 * blobs are the /about shared-canvas grammar at hub doses (2026-07-24,
 * "blurred gradient blobs" down the dark middle), placed past the seam glow's
 * reach so the belief and the rows sit in atmosphere, not on flat ink.
 *
 * ⚠ THE CLIPPING LAYER IS LOAD-BEARING, AND SO IS ITS POSITION IN THE TREE.
 * A sticky device lives in this canvas (the scroll index's odometer numeral),
 * and an overflow-hidden ANCESTOR becomes a sticky element's scroll
 * container: the pin then silently stops working. So the glow's blobs get
 * their own absolutely-positioned overflow-hidden layer that is a SIBLING of
 * the children, never their parent, and the section itself is never clipped.
 * `grain` alone is safe (its ::before is inset-0, so nothing can overflow and
 * it needs no clip). This regressed twice on 2026-07-24 before the client
 * caught it: don't "tidy" the clip upward. (There were TWO sticky devices in
 * here until the belief's own pin was removed the same day — see
 * <BeliefStatement>. The constraint did not leave with it.)
 */
export default function BeliefCanvas({ children }: { children: ReactNode }) {
  return (
    <section className="relative grain bg-ink">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {/* Standard dose since 2026-07-31 (was seamEmphasis, the handoff's
            richer amber tail): with the hero's new foot hairline the
            boundary is a stated divide, so the warmth resolves at the
            line rather than carrying through it. */}
        <SectionGlow blob="left" />
        {/* The canvas blobs (2026-07-24, "blurred gradient blobs" down the
            dark middle): two quiet pools past the seam glow's reach, so
            the belief and the index rows sit in atmosphere rather than on
            flat ink — the /about shared-canvas grammar, hub doses. */}
        <div
          style={{
            position: "absolute",
            right: "-12%",
            top: "38%",
            width: "44%",
            height: "26%",
            borderRadius: "50%",
            background: "var(--champagne)",
            opacity: 0.04,
            filter: "blur(150px)",
            transform: "translateZ(0)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-10%",
            top: "68%",
            width: "48%",
            height: "26%",
            borderRadius: "50%",
            background: "#8A5A2E",
            opacity: 0.06,
            filter: "blur(150px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {children}
    </section>
  );
}
