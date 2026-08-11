"use client";

import { useEffect } from "react";

/**
 * THE GROUND THEME — the page holds ONE ground at a time, and it changes as
 * you scroll (2026-08-11, client, pointing at agencyhabitat.com: "as a section
 * scrolls into view, the background colour changes as it scrolls into view, so
 * it feels more seamless").
 *
 * ⚠ WHAT THE REFERENCE ACTUALLY DOES, because the first attempt got this wrong
 * and shipped a gradient instead. Habitat carries `data-theme` on the BODY, its
 * sections paint nothing at all (every one of them reports the same background
 * colour), and a plain `transition: 0.65s ease-in-out` animates the swap while
 * ScrollTrigger flips the attribute. There is no gradient anywhere. The whole
 * page changes at once — which is precisely why it reads as seamless rather
 * than as a seam you scroll past.
 *
 * ⚠ THAT MODEL ONLY WORKS IF NOTHING PAINTS ITSELF. If bands keep their own
 * grounds, a page-level colour can never show through, and if TWO bands are on
 * screen with opposite polarities one of them must be wrong for the whole
 * transition. So the theme owns the ground AND both type ladders, and the bands
 * inherit. The type half is not optional: a ground that lightens under
 * unchanged bone text is invisible text, which is the trap that made me argue
 * against this effect in the first place. Habitat's answer — transition the
 * type on the same clock — is the right one.
 *
 * NO GSAP, NO SCROLL LISTENER. `IntersectionObserver` with a
 * `-50%` root margin on both edges leaves a one-pixel band at the viewport's
 * middle, so EXACTLY ONE section can intersect at a time: whichever the
 * midpoint is currently over. That is the whole trigger. It costs no scroll
 * work, it is correct after a jump-scroll or a deep link, and it agrees with
 * the site's existing IO-based `.reveal` rather than adding a rival driver.
 *
 * ⚠ IT DEGRADES TO TODAY'S PAGE. Every theme rule in globals.css is scoped
 * under `html[data-theme]`, an attribute that only exists once this component
 * has mounted. With JS off, or before hydration, the bands paint themselves
 * exactly as they always have. Nothing depends on the theme to be legible.
 *
 * REDUCED MOTION is handled in CSS: the transition duration collapses to 0, so
 * the ground still changes but never animates.
 *
 * ⚠ THREE PAGES SINCE 2026-08-11 EVENING (client: "the about page and
 * services page would really benefit from the same treatment") — the homepage,
 * /about and /services each mount one driver. The "homepage only" line that
 * stood here lasted a day; what held is the principle behind it: the theme is
 * a property of a page whose acts are designed as one run of colour, opted
 * into per page, never a sitewide default. The vocabulary also grew past
 * ink/bone that evening — /services' testimonial declares IVORY and /about's
 * FAQ declares CREAM, with their remaps beside the others in globals.
 *
 * ⚠ `data-ground-opaque` arrived with them: a compound canvas (SharedCanvas,
 * BeliefCanvas) declares its ground for THIS driver's sampling but keeps its
 * own paint, because its glow only works on its own dark ground. The driver
 * needs no knowledge of it — it only reads data-ground.
 */
export default function GroundTheme() {
  useEffect(() => {
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ground]"),
    );
    if (bands.length === 0) return;

    const root = document.documentElement;
    /* Seed from the first band so the very first paint after mount already
       agrees with what is on screen, rather than flashing through a default. */
    const apply = (g: string | null) => {
      if (g && root.dataset.theme !== g) root.dataset.theme = g;
    };

    /* ⚠ THE OBSERVER IS A TRIGGER, NOT THE ANSWER. Applying each intersecting
       entry in callback order is wrong: after a jump-scroll or a deep link
       several bands cross the sampling line in ONE batch, they arrive in
       document order rather than relevance order, and the last one written
       wins — which is whichever band happens to be furthest down, not the one
       under the midpoint. That shipped a page painting bone while the
       attribute said ink. So the callback only asks "did anything change?",
       and the ground is then read from geometry, which cannot disagree with
       what is on screen. */
    const groundAtMidpoint = () => {
      const mid = window.innerHeight / 2;
      for (const b of bands) {
        const r = b.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) return b.dataset.ground ?? null;
      }
      return null;
    };

    /* Seed from what is actually on screen, so the first paint after mount
       already agrees rather than flashing through a default. */
    apply(groundAtMidpoint() ?? bands[0].dataset.ground ?? null);

    const io = new IntersectionObserver(
      () => {
        apply(groundAtMidpoint());
      },
      /* The 1px sampling line at the viewport's middle. Both margins are -50%,
         which collapses the root box to a line; a band intersects it only
         while the midpoint is inside that band. */
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    bands.forEach((b) => io.observe(b));

    return () => {
      io.disconnect();
      /* Leave the page as we found it when navigating away, or an interior
         route inherits the homepage's last theme. */
      delete root.dataset.theme;
    };
  }, []);

  return null;
}
