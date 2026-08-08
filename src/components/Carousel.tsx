"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Carousel — the brand's contact-sheet rail (born 2026-07-10 for the blog
// and How-we-work sections). Print logic, like everything else:
//   · Plates in a row: native scroll-snap, hard-clipped at the shell edge
//     (no fade masks), slides sized so the next plate PEEKS as the
//     invitation to scroll.
//   · A FOLIO line below for controls: hairline, two arrow buttons (bone,
//     champagne on touch — gold is the hover), and a page counter in the
//     meta voice.
//   · NEVER autoplay — the trust-bar marquee is the page's one self-moving
//     element. The reader turns the pages.
//   · Mobile: edge-bleeding within the shell gutter (the -mx-6/px-6
//     device from the old mobile carousels); md+: contained, plates clip
//     at the content edge like every other rule and frame.
// Buttons respect prefers-reduced-motion (instant jump, no smooth glide).

interface CarouselProps {
  /** Accessible name for the region, e.g. "Latest blog posts". */
  ariaLabel: string;
  /** Tailwind width classes for each slide (the peek is set here). */
  slideClassName: string;
  className?: string;
  children: ReactNode;
  /** THE FOLIO'S GROUND (2026-08-09, born when Selected work and the blog
      rail went light): the prev/next arrows and the page counter hardcode
      the on-ink ladder, and the folio's own top hairline picks rule-dark —
      none of that reads on bone. Defaults dark so every other consumer
      (the /stylesheet specimen, the archived /mockups/old-hero) is
      unchanged. */
  tone?: "dark" | "light";
}

export default function Carousel({
  ariaLabel,
  slideClassName,
  className = "",
  children,
  tone = "dark",
}: CarouselProps) {
  const light = tone === "light";
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const slides = Children.toArray(children);
  const count = slides.length;

  // One slide's stride = distance between the first two slides' left edges
  // (slide width + gap, measured live so breakpoints never desync).
  const stride = useCallback(() => {
    const t = trackRef.current;
    if (!t || t.children.length < 2) return t?.clientWidth ?? 0;
    const a = t.children[0] as HTMLElement;
    const b = t.children[1] as HTMLElement;
    return b.offsetLeft - a.offsetLeft;
  }, []);

  const syncState = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const s = stride() || 1;
    setIndex(Math.min(count - 1, Math.max(0, Math.round(t.scrollLeft / s))));
    setAtEnd(t.scrollLeft >= t.scrollWidth - t.clientWidth - 4);
    setScrollable(t.scrollWidth > t.clientWidth + 4);
  }, [count, stride]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    syncState();
    t.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);
    return () => {
      t.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  const page = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * stride(), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <ul
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:gap-8 md:scroll-pl-0 md:px-0"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            className={`snap-start flex-none ${slideClassName}`}
            aria-label={`${i + 1} of ${count}`}
          >
            {slide}
          </li>
        ))}
      </ul>

      {/* The folio line — hairline, arrows, page counter. A book with one
          page needs no page-turner: hidden entirely when everything already
          fits (e.g. the blog rail while the collection is small), so the
          rail degrades to a calm static row rather than showing dead
          arrows. */}
      {scrollable && (
      <div className={`mt-8 flex items-baseline gap-7 border-t pt-5 md:mt-10 ${light ? "rule-light" : "rule-dark"}`}>
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => page(-1)}
            disabled={index <= 0}
            className={`-m-2 p-2 text-lg leading-none transition-colors hover:text-champagne disabled:pointer-events-none disabled:opacity-30 ${light ? "text-ink" : "text-bone"}`}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => page(1)}
            disabled={atEnd}
            className={`-m-2 p-2 text-lg leading-none transition-colors hover:text-champagne disabled:pointer-events-none disabled:opacity-30 ${light ? "text-ink" : "text-bone"}`}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
        <p className={`overline ${light ? "text-ink-mute" : "text-clay"}`}>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
      )}
    </div>
  );
}
