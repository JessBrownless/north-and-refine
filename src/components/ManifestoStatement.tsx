"use client";

import { useEffect, useRef } from "react";

/**
 * THE STATEMENT COMPARTMENT — a big statement with a SCROLL-SCRUBBED word
 * highlight: every word starts dim (15% bone) and brightens to full as you
 * scroll through the statement's sticky track. Tied to scroll position, not
 * time, so it moves exactly at your pace and rewinds when you scroll back.
 * One rAF-throttled listener; measures the nearest <section>.
 * Reduced-motion users see the statement fully lit from the start.
 *
 * SHARED, NOT HOMEPAGE-ONLY (2026-07-24, client: "the same, layout-wise…
 * I don't want them to feel too different"): the homepage manifesto and the
 * /services belief both render through here. Consumers own the track, and it
 * must be the SAME one or the scrub timing differs — a `h-[140vh] pt-[10vh]
 * pb-[5vh]` section wrapping a `sticky top-0 flex h-screen items-center`
 * child. `text` is a PLAIN STRING (it is split per word), so a statement in
 * this compartment carries no italic accent: the fill is the emphasis.
 *
 * ⚠ position:sticky breaks under an overflow-hidden ancestor — if the section
 * also carries a SectionGlow, the glow needs its own absolutely-positioned
 * clipping layer as a SIBLING of the sticky child (see /services).
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

    // Measure the TRACK, not blindly the section: when the statement shares
    // a section with other content (/services — the belief + index share one
    // surface since 2026-07-24), closest("section") would measure the whole
    // combined block and the fill would complete deep in the neighbouring
    // content instead of during the dwell. A consumer whose track is an
    // inner div marks it with data-manifesto-track; a section that IS the
    // track (the homepage) needs no attribute.
    const section = el.closest<HTMLElement>("[data-manifesto-track]") ?? el.closest("section");
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

  return (
    /* FULL RAIL (2026-07-24, client: "I don't feel like the text goes wide
       enough"). Was max-w-5xl (1024px), which left ~330px of the rail empty
       and pushed a 15-word statement onto six narrow lines. Uncapped, it runs
       the .shell rail and settles into three or four long lines — the same
       long-line treatment the `wide` PageHero gives its display H1s, and the
       shell's own 1600px cap keeps line length bounded on big monitors.
       Applies to BOTH consumers on purpose: the homepage manifesto and the
       /services belief are meant to be the same compartment. */
    <p ref={ref} className="display max-w-none">
      {text.split(" ").map((word, i) => (
        /* willChange: the fill now also runs UNSTUCK (/services), so
           opacities change WHILE the text moves — without their own
           compositor layers the display-size glyphs repaint every scroll
           frame, which read as scroll friction (2026-07-24). */
        <span key={i} data-word style={{ opacity: 0.15, willChange: "opacity" }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
