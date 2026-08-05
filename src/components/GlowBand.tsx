import type { ReactNode } from "react";
import SectionGlow from "./SectionGlow";

/**
 * GLOW BAND — the section that carries a dark hero's warmth PAST the seam
 * (the 2026-07-23 seam contract): `relative grain overflow-hidden` +
 * <SectionGlow> + the shell's 12-col content grid lifted onto z-10. Both
 * conversion pages are built this way — the canonical split masthead, then
 * one banded section holding the page's real content: /contact's ledger and
 * form, /start-a-project's stepped form.
 *
 * ⚠ `overflow-hidden` KILLS `position: sticky`. An overflow-hidden ancestor
 * becomes the sticky element's scroll container, so the pin silently stops
 * working and the element just scrolls away; that regressed the /services
 * rolling numeral twice on 2026-07-24 before the client caught it. This band
 * clips, so it must never wrap sticky content. A page that needs both puts
 * the glow in an absolutely-positioned overflow-hidden layer that is a
 * SIBLING of the sticky content, and leaves the section itself unclipped.
 * Neither live consumer has sticky content, so both keep the section's own
 * clip.
 */
export default function GlowBand({
  children,
  blob = "right",
  padding = "pt-16 pb-24 md:pt-20 md:pb-32",
  grid = "grid grid-cols-1 gap-12 md:grid-cols-12",
  pool = false,
}: {
  children: ReactNode;
  /** Which side SectionGlow's individual blob sits. VARY IT PER PAGE so
      neighbours don't repeat: /contact right, behind the form column;
      /start-a-project left, so the right columns stay quiet behind the
      fields. */
  blob?: "left" | "right";
  /** The shell's vertical rhythm. The default is /contact's;
      /start-a-project opens tighter under its masthead. */
  padding?: string;
  /** The content grid. The default is /contact's gapped ledger-and-form
      pair; /start-a-project carries one column and drops the gap. */
  grid?: string;
  /** ONE QUIET CANVAS POOL low-left under the content (the /services
      shared-canvas grammar at hub doses), so a long facts rail doesn't sit
      on flat ink. /contact only. */
  pool?: boolean;
}) {
  return (
    <section className="relative grain overflow-hidden">
      <SectionGlow blob={blob} />
      {pool && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-10%",
            top: "62%",
            width: "44%",
            height: "30%",
            borderRadius: "50%",
            background: "#8A5A2E",
            opacity: 0.06,
            filter: "blur(150px)",
            pointerEvents: "none",
            transform: "translateZ(0)",
          }}
        />
      )}
      <div className={`shell relative z-10 ${padding}`}>
        <div className={grid}>{children}</div>
      </div>
    </section>
  );
}
