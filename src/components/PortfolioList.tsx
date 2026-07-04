"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Selected work as a QUIET list (after Relume Portfolio 19): centred stack
 * of big project names with a small sector chip; hovering a name fades its
 * composite in BEHIND the list while the other names recede. Click through
 * to the case study. On touch (no hover) it's simply a clean list of links.
 * Lives on the bone section — colours are ink-on-light.
 */

export interface PortfolioListItem {
  name: string;
  tag: string;
  href: string;
  image?: string;
  imageAlt?: string;
}

export default function PortfolioList({ items }: { items: PortfolioListItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Hover image — centred behind the list */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        {items.map(
          (item, i) =>
            item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.href}
                src={item.image}
                alt=""
                loading="lazy"
                className={`absolute w-full max-w-xl rounded-xl shadow-[0_48px_96px_-48px_rgba(12,12,13,0.4)] transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ),
        )}
      </div>

      {/* The list — names stay legible OVER the image (hovered name full ink,
          the rest recede) */}
      <ul className="relative z-10 text-center">
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group inline-flex items-start gap-3 py-4 md:py-5"
            >
              <span
                className={`heading-xl transition-colors duration-500 ${
                  active === null || active === i ? "text-ink" : "text-ink/20"
                }`}
              >
                {item.name}
              </span>
              <span
                className={`label mt-2 rounded-full border rule-light px-2.5 py-1 transition-colors duration-500 md:mt-3 ${
                  active === null || active === i ? "text-clay" : "text-clay/40"
                }`}
              >
                {item.tag}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
