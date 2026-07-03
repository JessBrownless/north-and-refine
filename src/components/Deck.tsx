"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// Deck — a fanned stack of "desktop screen" cards that cycles, the homepage
// hero showreel (and the /mockups/showreel exploration it grew out of). Each
// card is a SLOT: pass a real `screenshot` (a desktop capture / Screen Studio
// loop frame) or it falls back to a styled placeholder. Pure design tokens, no
// new globals. Auto-advances; pauses on hover; respects reduced-motion (no
// auto-cycle). Click a card to bring it forward (no dot controls — too busy
// for the hero; the cards themselves are the controls).

export type DeckSlide = {
  /** Big label on the card — a client/practice name or a sector. */
  title: string;
  /** Small pill label in the browser chrome — a domain or category. */
  tag: string;
  /** When set, the FRONT card links through (e.g. to a case study). */
  href?: string;
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
  // Default to the MIDDLE card so a dark/light/dark/light/dark deck opens
  // centred on its middle (dark) card.
  const [active, setActive] = useState(Math.floor(n / 2));
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
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 7800);
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
      className="relative mx-auto w-full [--spread:5.5rem] sm:[--spread:8.75rem] md:[--spread:12rem] lg:[--spread:13.5rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage — cards are absolutely centred and fanned out by their position.
          Sized for IMPACT: the centre card runs ~832px wide on desktop and the
          outer edges of the fan may bleed past the viewport — intentional. */}
      <div className="relative h-[250px] sm:h-[340px] md:h-[450px] lg:h-[520px]">
        {slides.map((slide, i) => {
          const pos = positionOf(i);
          const abs = Math.abs(pos);
          const isActive = pos === 0;
          const style: Record<string, string | number> = {
            "--pos": pos,
            "--abs": abs,
            zIndex: 50 - abs,
            // Cards stay opaque (no see-through — depth comes from the scrim
            // + scale below); only the outermost visible one eases its edge,
            // and abs>2 hides entirely.
            opacity: abs > 2 ? 0 : abs >= 2 ? 0.85 : 1,
            // Gentle falloff (2deg / 0.065 per step) keeps the outer cards'
            // bottom corners CLOSE to the centre card's, so the hero's clip
            // line can sit just past the cards' natural feet and still cut
            // all five — cap them off right at the end.
            transform:
              "translate(-50%, -50%) translateX(calc(var(--pos) * var(--spread))) rotate(calc(var(--pos) * 2deg)) scale(calc(1 - var(--abs) * 0.065))",
          };

          const cardClass =
            "group absolute left-1/2 top-1/2 aspect-[16/9] h-full cursor-pointer transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none";

          const face = (
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
              {/* Depth scrim — receding cards darken (staying opaque) rather
                  than turning see-through, so no card shows through another. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-ink transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: abs * 0.2 }}
              />
              {/* Click-through affordance — front card only, revealed on hover */}
              {isActive && slide.href && (
                <span className="btn btn-sm btn-secondary-dark pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 bg-ink/50 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  View case study
                  <span aria-hidden>→</span>
                </span>
              )}
            </div>
          );

          // The front card links through when it has somewhere to go; the
          // rest are buttons that bring their card forward.
          return isActive && slide.href ? (
            <Link
              key={`${slide.title}-${i}`}
              href={slide.href}
              aria-label={`View the ${slide.title} case study`}
              aria-current={isActive}
              style={style as CSSProperties}
              className={cardClass}
            >
              {face}
            </Link>
          ) : (
            <button
              key={`${slide.title}-${i}`}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={isActive}
              onClick={() => setActive(i)}
              style={style as CSSProperties}
              className={cardClass}
            >
              {face}
            </button>
          );
        })}
      </div>

    </div>
  );
}
