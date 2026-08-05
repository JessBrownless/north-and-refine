"use client";

import { useEffect, useState } from "react";

/**
 * THE DESIGN-SYSTEM RAIL (2026-08-02, client: "a little thing on the left
 * that is anchor links to the different sections").
 *
 * A sticky index for /stylesheet, which is now long enough that scrolling it
 * blind is the main way to miss something. Two levels — TIER (Principles,
 * Atoms, Molecules, Components) then the sections inside it — because the
 * whole point of the restructure is that the tier tells you what KIND of
 * thing you are looking at.
 *
 * SCROLLSPY, not a click-only highlight: the rail has to be right when you
 * arrive by scroll or by deep link, not just when you click it. One
 * IntersectionObserver over every section, and the topmost intersecting
 * section wins — a plain "last one that fired" reads wrong when two short
 * sections are on screen together.
 *
 * ⚠ This is an INTERNAL page, so the rail deliberately does not use the
 * site's `.reveal` entrance: a navigation aid that fades in is a navigation
 * aid you cannot use for a second. It is also hidden below xl — at that
 * width the rail would eat the measure the specimens need, and the page
 * reads perfectly well as a linear document.
 */

export type NavTier = {
  /** Anchor id of the tier heading itself. */
  id: string;
  title: string;
  sections: { id: string; title: string }[];
};

export default function StylesheetNav({ tiers }: { tiers: NavTier[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = tiers.flatMap((t) => [t.id, ...t.sections.map((s) => s.id)]);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    /* rootMargin pulls the trigger line to just under the (absolute,
       transparent) site nav so a section counts as "current" when its
       heading reaches reading position, not when its last pixel leaves. */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [tiers]);

  return (
    <nav
      aria-label="Design system sections"
      className="hidden xl:block sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto pr-6"
    >
      <p className="overline text-clay">Contents</p>
      <ul className="mt-5 space-y-6">
        {tiers.map((tier) => {
          const tierActive =
            active === tier.id || tier.sections.some((s) => s.id === active);
          return (
            <li key={tier.id}>
              <a
                href={`#${tier.id}`}
                className={`label block transition-colors ${
                  tierActive ? "text-bone" : "text-bone-dim hover:text-bone"
                }`}
              >
                {tier.title}
              </a>
              <ul className="mt-2 space-y-1.5 border-l rule-dark pl-3">
                {tier.sections.map((s) => {
                  const on = active === s.id;
                  return (
                    <li key={s.id} className="relative">
                      {/* The champagne marker is the one accent on this rail:
                          gold marks position, it never colours the label
                          (label type is never gold — the colour rule). */}
                      {on && (
                        <span
                          aria-hidden
                          className="absolute -left-[13px] top-1/2 h-3 w-px -translate-y-1/2 bg-champagne"
                        />
                      )}
                      <a
                        href={`#${s.id}`}
                        aria-current={on ? "true" : undefined}
                        className={`fineprint block transition-colors ${
                          on ? "text-bone" : "text-clay hover:text-bone-dim"
                        }`}
                      >
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
