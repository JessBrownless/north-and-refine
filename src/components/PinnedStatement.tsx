"use client";

import { useEffect, useRef } from "react";

/**
 * PinnedStatement — a full-viewport bone interruption that pins while the
 * user scrolls through a tall track; scroll progress scrubs a word-by-word
 * reveal of the statement. The inline mono kicker runs into the first line.
 *
 * NOTE on the "no rival scroll listeners" rule: the global <Reveal />
 * observer handles enter-once reveals; a scrub needs CONTINUOUS progress,
 * which an IntersectionObserver can't provide. This is the one sanctioned
 * scroll listener — rAF-throttled, passive, scoped to this component, and
 * skipped entirely under prefers-reduced-motion (words render visible).
 *
 * Words start dim and resolve sequentially: word i fades in as progress
 * crosses i/N → (i+1)/N, driven by a --p custom property set without React
 * re-renders. Default --p is 1 so no-JS/SSR renders fully readable.
 */
export default function PinnedStatement({
  kicker,
  text,
}: {
  kicker: string;
  text: string;
}) {
  const trackRef = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const n = words.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} data-nav-light className="relative h-[280vh] bg-bone text-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell w-full">
          <p className="statement">
            <span className="overline text-clay inline-block w-36 md:w-44 align-baseline">
              {kicker}
            </span>
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  opacity: `clamp(0.14, calc(var(--p, 1) * ${n} - ${i}), 1)`,
                }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
