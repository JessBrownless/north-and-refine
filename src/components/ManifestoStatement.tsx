"use client";

import { useEffect, useRef } from "react";

/**
 * The homepage manifesto with a SCROLL-SCRUBBED word highlight: every word
 * starts dim (15% bone) and brightens to full as you scroll through the
 * statement's sticky track — tied to scroll position, not time, so it moves
 * exactly at your pace and rewinds when you scroll back. One rAF-throttled
 * listener; measures the nearest <section> (the 170vh sticky track).
 * Reduced-motion users see the statement fully lit from the start.
 */
export default function ManifestoStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("span[data-word]"));
    if (words.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const w of words) w.style.opacity = "1";
      return;
    }

    const section = el.closest("section");
    if (!section) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // Progress 0→1: starts as the statement scrolls into view (section top
      // at 80% of the viewport), completes a third of the way through the
      // sticky dwell — so it finishes lighting while pinned, then holds.
      const start = vh * 0.8;
      const end = -(rect.height - vh) * 0.35;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const n = words.length;
      for (let i = 0; i < n; i++) {
        // Each word ramps over a short window, staggered across the run
        const t = (i / n) * 0.82;
        const o = 0.15 + 0.85 * Math.min(1, Math.max(0, (p - t) / 0.18));
        words[i].style.opacity = o.toFixed(3);
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

  return (
    <p ref={ref} className="statement from-overline">
      {text.split(" ").map((word, i) => (
        <span key={i} data-word style={{ opacity: 0.15 }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
