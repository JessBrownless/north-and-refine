"use client";

import { useEffect, useRef } from "react";

/**
 * THE STATEMENT COMPARTMENT — a big statement with a SCROLL-SCRUBBED word
 * highlight: every word rests at 35% opacity of ITS OWN COLOUR and develops
 * to full as the statement travels up the viewport — bone words lighting on
 * a dark ground (/services), ink words coming up like letterpress on the
 * homepage's bone act. Tied to scroll position, not time, so it moves
 * exactly at your pace and rewinds when you scroll back.
 * One rAF-throttled listener; measures the nearest <section>.
 * Reduced-motion users see the statement fully lit from the start.
 *
 * SHARED, NOT HOMEPAGE-ONLY (2026-07-24, client: "the same, layout-wise…
 * I don't want them to feel too different"): the homepage manifesto and the
 * /services belief both render through here — and since 2026-08-07 both run
 * in NORMAL FLOW. The homepage's 140vh sticky track was the last pin on the
 * site; the client removed it with the same words that removed the /services
 * pin a fortnight earlier (it "blocks the screen into place"). The fill now
 * always happens WHILE the text moves, at the reader's own pace.
 *
 * THE TRACK IS THE STATEMENT BLOCK. Consumers mark the block wrapping this
 * statement with `data-manifesto-track` (nearest <section> is the fallback
 * for a section that IS just the statement). The completion tuning assumes
 * track ≈ statement: it fills from entry and completes by mid-viewport. Do
 * NOT hand it a tall air-padded section as the track — the fill would
 * complete while the words are still at the fold, lit before they are read.
 *
 * `text` is a PLAIN STRING (it is split per word), so a statement in this
 * compartment carries no italic accent: the fill is the emphasis.
 */
export default function ManifestoStatement({
  text,
  className = "display max-w-none",
}: {
  text: string;
  /** Type register override (2026-07-24 services-pacing handoff): the
      homepage keeps the .display default; /services passes the stepped-down
      .belief-statement so the hero stays the loudest voice on that page. */
  className?: string;
}) {
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

    // Measure the TRACK, not blindly the section. Both live consumers mark
    // an inner block with data-manifesto-track: /services because the belief
    // shares its section with the whole scroll index, the homepage because
    // its section is a min-h air band much taller than the statement — in
    // either case closest("section") would measure the wrong box and the
    // fill would complete at the wrong scroll moment. The section fallback
    // survives for a consumer whose section IS just the statement.
    const section = el.closest<HTMLElement>("[data-manifesto-track]") ?? el.closest("section");
    if (!section) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // Progress 0→1 against the track's top edge: the fill starts as the
      // statement enters (track top at 80% of the viewport) and COMPLETES BY
      // MID-VIEWPORT (top at 45%), so a fast scroller never passes an unlit
      // statement. Window retuned 2026-07-24 (services-pacing handoff).
      // The sticky-track branch that used to live here (end = deep in the
      // dwell when the track was taller than the viewport) was DELETED
      // 2026-08-07 with the homepage pin — its last consumer. If a pin ever
      // returns, the branch is in this file's history; don't re-derive it.
      const start = vh * 0.8;
      const end = vh * 0.45;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const n = words.length;
      for (let i = 0; i < n; i++) {
        // Each word ramps over a short window, staggered across the run
        const t = (i / n) * 0.82;
        // Resting 0.35 (was 0.15, services-pacing handoff) — the dim words
        // stay legible while they wait for the fill.
        const o = 0.35 + 0.65 * Math.min(1, Math.max(0, (p - t) / 0.24));
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
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        /* willChange: the fill now also runs UNSTUCK (/services), so
           opacities change WHILE the text moves — without their own
           compositor layers the display-size glyphs repaint every scroll
           frame, which read as scroll friction (2026-07-24). */
        <span key={i} data-word style={{ opacity: 0.35, willChange: "opacity" }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
