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

    // THE MODAL HANDLE (2026-08-01). Lenis swallows wheel/touch globally, so
    // a full-screen overlay cannot simply rely on `body { overflow: hidden }`
    // — the page keeps glide-scrolling underneath and, worse, a nested
    // scroll container inside the overlay never receives the events (this is
    // exactly why the Start-a-project overlay's form was unreachable below
    // the fold). Anything that opens a modal calls stop() on the way in and
    // start() on the way out; nested scrollers also carry
    // `data-lenis-prevent`, which Lenis honours natively.
    window.__nrLenis = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__nrLenis === lenis) delete window.__nrLenis;
    };
  }, []);

  return null;
}
