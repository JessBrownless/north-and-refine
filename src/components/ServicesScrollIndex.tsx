"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  num: string;
  title: string;
  lead: string;
  body: string;
  deliverables: string[];
};

/**
 * The /services scroll index (2026-07-14, client ref: Relume layout485). ONE
 * big number pinned on the left in a CLIPPED WINDOW; as you scroll the content
 * rows, the digit stack slides so the active number rolls into the window like
 * an odometer/slot-machine (you never see the other numbers elsewhere — they
 * change within the frame). A hairline DRAWS in on each row as it enters.
 *
 * Both effects are JS-driven (IntersectionObserver + inline styles) rather than
 * CSS `.reveal` descendant rules — that path hit a Tailwind cascade-layer quirk
 * where an `!important` override was still outranked, so we set width/transform
 * directly here where nothing can outrank it. Content still fades via `.reveal`.
 */
export default function ServicesScrollIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const drawn = useRef<Set<number>>(new Set());
  const N = services.length;

  useEffect(() => {
    // Active number — the row whose top reaches the trigger line wins. The
    // line sits at 40% from the top (not the 50% centre) so the number changes
    // once the section has more fully arrived, not the moment it hits the
    // middle (client: "changes a bit too soon"). Lower the first % to delay
    // further (e.g. -30%/-70%).
    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    // Line draw — fill each row's hairline once, as it enters.
    const drawObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (drawn.current.has(idx)) return;
          drawn.current.add(idx);
          const fill = fillRefs.current[idx];
          if (fill) fill.style.width = "100%";
        });
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    rowRefs.current.forEach((el) => {
      if (!el) return;
      activeObs.observe(el);
      drawObs.observe(el);
    });
    return () => {
      activeObs.disconnect();
      drawObs.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      {/* Sticky rolling number (desktop). The stack of digits slides so the
          active one sits in the clipped 1em window — the odometer roll. */}
      <div className="hidden md:col-span-4 md:block">
        <div className="sticky top-40">
          <div
            className="display-mega overflow-hidden leading-none text-bone-dim"
            style={{ height: "1em" }}
            aria-hidden
          >
            {/* Smooth, symmetric ease (easeInOutCubic) — glides the whole roll
                instead of snapping to place (the old expo-out read as bouncy). */}
            <div
              className="transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateY(-${(active * 100) / N}%)` }}
            >
              {services.map((s) => (
                <div key={s.num} style={{ height: "1em" }}>
                  {s.num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="flex flex-col gap-24 md:col-span-7 md:col-start-6 md:gap-36">
        {services.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            data-idx={i}
            className="reveal"
          >
            {/* Mobile keeps a small inline number (the rolling one is desktop-only) */}
            <p className="index-num text-clay md:hidden">{s.num}</p>
            {/* Progress hairline: faint track + the fill that draws (JS width) */}
            <div className="relative mt-4 h-px w-full overflow-hidden bg-ink-line md:mt-0">
              <span
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 h-px w-0 bg-bone transition-[width] duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <h2 className="heading-lg mt-12 text-bone">{s.title}</h2>
            <p className="body-lg mt-4 max-w-[36ch] text-bone-dim">{s.lead}</p>
            <p className="body mt-5 max-w-[54ch] text-bone-dim">{s.body}</p>
            <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-3.5 border-t rule-dark pt-7 sm:grid-cols-2">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="body-sm flex items-center gap-3 text-bone-dim"
                >
                  <span aria-hidden className="h-px w-4 shrink-0 bg-clay" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
