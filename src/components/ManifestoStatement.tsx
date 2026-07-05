"use client";

import { useEffect, useRef } from "react";

/**
 * The homepage manifesto with a SCROLL-SCRUBBED word highlight: every word
 * starts dim (15% bone) and brightens to full as you scroll through the
 * statement's sticky track — tied to scroll position, not time, so it moves
 * exactly at your pace and rewinds when you scroll back. One rAF-throttled
 * listener; measures the nearest <section> (sticky track OR normal flow —
 * both are handled). Reduced-motion users see the statement fully lit from
 * the start.
 *
 * `text` also accepts an array — each entry renders as its own line and the
 * scrub runs continuously across all of them (used by the homepage
 * "What we do" section, where the three services stack as one statement).
 */
export default function ManifestoStatement({ text }: { text: string | string[] }) {
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
      // Progress 0→1: starts as the statement enters (section top at 88%
      // of the viewport). In a sticky track (section taller than the
      // viewport) it completes 75% of the way through the dwell — the
      // words keep filling WHILE the screen holds; in normal flow it
      // completes with the section high on screen.
      // Weighted so ~half the fill happens DURING the pin: it begins once
      // the statement is well into view and completes only near the end of
      // the dwell — the hold always has something happening in it.
      const start = vh * 0.55;
      const end = rect.height > vh * 1.1 ? -(rect.height - vh) * 0.9 : vh * 0.12;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const n = words.length;
      for (let i = 0; i < n; i++) {
        // Each word ramps over a short window, staggered across the run
        const t = (i / n) * 0.82;
        const o = 0.15 + 0.85 * Math.min(1, Math.max(0, (p - t) / 0.24));
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

  const lines = Array.isArray(text) ? text : [text];

  return (
    <p ref={ref} className="heading-xl max-w-4xl">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, i) => (
            <span key={i} data-word style={{ opacity: 0.15 }}>
              {word}{" "}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
