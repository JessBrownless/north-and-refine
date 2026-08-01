"use client";

import { useEffect, useRef, useState } from "react";

/**
 * THE GRAPHICS SET (2026-07-31) — shared plumbing for the nine export-ready
 * blocks imported from the client's "Website graphics request" design project
 * (`Website Graphics.dc.html`, claude.ai/design). Each graphic is ARTWORK:
 * a fixed-pixel composition (like a plate or an exported PNG), ported to DOM
 * so it ships crisp at any density with live text. House conversions applied
 * at import: palette hexes → the design tokens (the design was authored on
 * the 2026-07-31 ember palette, so they map 1:1); Instrument Sans/Geist Mono
 * → the site's --font-sans / --font-mono stacks (mono inside these blocks is
 * the sanctioned device-chrome/graphic-internal use). In-graphic GRADE tones
 * (browser chrome, screen glass, photo-grade tints) stay literal — they are
 * part of the artwork, not the system.
 *
 * <GraphicScaler> renders a fixed-px composition responsively: the plate is
 * laid out at its native size and transform-scaled to the container width,
 * so a graphic drops into any column the way an <img> would. Native sizes
 * come from the design doc.
 */

export const SANS = "var(--font-sans), system-ui, sans-serif";
export const MONO = "var(--font-mono), ui-monospace, monospace";

/* The rounded outer card blocks 01–08 sit on (the design's plate frame).
   Rounded per the curved-family direction (ContactCTA card, /about tiles) —
   part of the artwork. */
export const PLATE: React.CSSProperties = {
  borderRadius: 24,
  border: "1px solid var(--bone-line)",
  boxShadow: "0 40px 80px -44px rgba(0,0,0,.6)",
  overflow: "hidden",
  position: "relative",
};

export function GraphicScaler({
  width,
  height,
  children,
  className,
  label,
}: {
  /** Native composition size from the design doc. */
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
  /** Accessible name — the graphics are composed decorative artwork. */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      style={{ width: "100%", aspectRatio: `${width} / ${height}`, position: "relative" }}
    >
      <div
        aria-hidden={label ? true : undefined}
        style={{
          width,
          height,
          position: "absolute",
          top: 0,
          left: 0,
          transform: scale != null ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
          visibility: scale == null ? "hidden" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
