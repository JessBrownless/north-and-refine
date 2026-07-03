"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide inertial smooth scrolling (Lenis), mounted once in the root
 * layout. Native scroll stays the source of truth — position: sticky, the
 * Reveal IntersectionObserver and the Navbar scroll listener all keep
 * working; Lenis only interpolates wheel/touch input into a buttery glide.
 * Skips entirely under prefers-reduced-motion. Don't add rival smooth-scroll
 * libraries or scroll hijacking alongside this.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Low lerp = long, silky settle. The glide is the point.
      lerp: 0.08,
      // Intercept same-page anchor links (e.g. the manifesto's #selected-work
      // nudge) so they ride the same easing.
      anchors: true,
    });

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
