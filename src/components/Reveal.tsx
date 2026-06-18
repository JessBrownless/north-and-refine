"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal. Mounted once in the root layout. Watches every element
 * with the `.reveal` class and adds `.is-in` when it scrolls into view (see the
 * `.reveal` rule in globals.css). A single IntersectionObserver for the whole
 * page — don't add per-component scroll listeners that would fight it.
 *
 * Usage in markup:  <div className="reveal" style={{ transitionDelay: "120ms" }}>
 * Respects prefers-reduced-motion (handled in CSS — elements start visible).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (els.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
