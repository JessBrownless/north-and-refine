"use client";

import { useEffect } from "react";

/**
 * Drives every .exit-fade overlay from scroll: as a section exits the top of
 * the viewport, its overlay fades it to ink, handing the stage to the section
 * arriving beneath. JS-driven (one rAF-throttled listener) rather than CSS
 * scroll-timeline, so it behaves identically in every browser — Safari has no
 * scroll-driven-animation support — and stays frame-synced with Lenis.
 *
 * The overlay's PARENT is the measured scope. Two timing profiles:
 *   .exit-fade        late window — bottom 45vh → 8vh (full-bleed feet:
 *                     the hero's deck, the bone CTA)
 *   .exit-fade-long   early window — bottom 78vh → 14vh (dark content
 *                     sections, where a late fade would dim only padding)
 * Skips entirely under prefers-reduced-motion.
 */
export default function ExitFades() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Re-query each frame (a handful of nodes — negligible): the layout
      // mounts once, but route changes swap in fresh .exit-fade overlays.
      const overlays = document.querySelectorAll<HTMLElement>(".exit-fade");
      for (const el of overlays) {
        const scope = el.parentElement;
        if (!scope) continue;
        const bottom = scope.getBoundingClientRect().bottom;
        const long = el.classList.contains("exit-fade-long");
        // WINDOW WIDENED AND RAISED 2026-08-09 (client: "not quite enough"),
        // long profile only: 0.78→0.14 became 0.88→0.28. Two effects, both
        // wanted — it STARTS sooner (the band begins deepening while it is
        // still well on screen) and it FINISHES sooner (full depth with
        // ~28vh still showing, instead of a sliver), so the darkening is
        // something you watch happen rather than something that completes
        // just as the band disappears. The `late` profile is untouched; it
        // has no live consumer.
        const start = (long ? 0.88 : 0.45) * vh; // fade begins (bottom here)
        const end = (long ? 0.28 : 0.08) * vh; // fully dark (bottom here)
        const p = (start - bottom) / (start - end);
        el.style.opacity = String(Math.min(1, Math.max(0, p)));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
