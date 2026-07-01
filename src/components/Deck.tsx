"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Deck — a fanned stack of "desktop screen" cards that cycles, the homepage
// hero showreel (and the /mockups/showreel exploration it grew out of). Each
// card is a SLOT: pass a real `screenshot` (a desktop capture / Screen Studio
// loop frame) or it falls back to a styled placeholder. Pure design tokens, no
// new globals. Auto-advances; pauses on hover; respects reduced-motion (no
// auto-cycle). Click a card or a dot to bring it forward.

export type DeckSlide = {
  /** Big label on the card — a client/practice name or a sector. */
  title: string;
  /** Small pill label in the browser chrome — a domain or category. */
  tag: string;
  /** Optional real screenshot; fills the card when present. */
  screenshot?: string;
  /** Required with `screenshot` (accessibility). */
  screenshotAlt?: string;
};

// Default placeholder slots — used by the /mockups/showreel exploration.
const DEFAULT_SLIDES: DeckSlide[] = [
  { title: "Dr Yalda Jamali", tag: "dryalda.com.au" },
  { title: "Aesthetic Clinic", tag: "clinic.example" },
  { title: "Rhinoplasty Practice", tag: "practice.example" },
  { title: "Dermatology Group", tag: "derm.example" },
  { title: "Plastic Surgery Co.", tag: "surgery.example" },
];

export default function Deck({ slides = DEFAULT_SLIDES }: { slides?: DeckSlide[] }) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduced.current || n < 2) return;
    // Unhurried dwell per card — the pace is part of the luxury read.
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 5600);
    return () => window.clearInterval(id);
  }, [paused, n]);

  // Signed circular position around the active card: … -2, -1, 0, 1, 2 …
  const positionOf = (i: number) => {
    let pos = i - active;
    if (pos > n / 2) pos -= n;
    if (pos < -n / 2) pos += n;
    return pos;
  };

  return (
    <div
      className="relative mx-auto w-full [--spread:4.5rem] sm:[--spread:7rem] md:[--spread:9.5rem] lg:[--spread:11rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage — cards are absolutely centred and fanned out by their position */}
      <div className="relative h-[230px] sm:h-[300px] md:h-[380px] lg:h-[430px]">
        {slides.map((slide, i) => {
          const pos = positionOf(i);
          const abs = Math.abs(pos);
          const isActive = pos === 0;
          const style: Record<string, string | number> = {
            "--pos": pos,
            "--abs": abs,
            zIndex: 50 - abs,
            opacity: abs > 2 ? 0 : 1 - abs * 0.14,
            transform:
              "translate(-50%, -50%) translateX(calc(var(--pos) * var(--spread))) rotate(calc(var(--pos) * 2.5deg)) scale(calc(1 - var(--abs) * 0.08))",
          };

          return (
            <button
              key={`${slide.title}-${i}`}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={isActive}
              onClick={() => setActive(i)}
              style={style as CSSProperties}
              className="group absolute left-1/2 top-1/2 aspect-[16/10] h-full cursor-pointer transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none"
            >
              <div className="frame h-full w-full rounded-2xl shadow-2xl">
                {/* Just the capture — cropped to fill, no browser chrome */}
                {slide.screenshot ? (
                  /* Real desktop capture — fills the card, crops top-aligned */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={slide.screenshot}
                    alt={slide.screenshotAlt ?? ""}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  /* Placeholder slot — swap in a screenshot / video later */
                  <div className="portrait-fill relative flex h-full w-full items-center justify-center">
                    <span className="index-num text-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="overline absolute bottom-4 left-4 text-ink/55">
                      {slide.title}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dot controls — jump straight to any card */}
      <div className="mt-12 flex items-center justify-center gap-3">
        {slides.map((slide, i) => (
          <button
            key={`${slide.title}-dot-${i}`}
            type="button"
            aria-label={`Go to ${slide.title}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-champagne" : "w-1.5 bg-bone/25 hover:bg-bone/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
