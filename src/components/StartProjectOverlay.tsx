"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import HeroGlow from "@/components/HeroGlow";
import StartProjectForm from "@/components/StartProjectForm";

/**
 * THE START-A-PROJECT OVERLAY (2026-07-31; REBUILT 2026-08-01).
 *
 * WHAT WENT WRONG THE FIRST TIME (the client: "isn't working. It seems to be
 * taller than the page… needs to dramatically fade in, and be easy to see all
 * the fields on load"), measured rather than guessed:
 *  1. HEIGHT — the ledger form ran 1217px inside a 900px viewport; 867px of
 *     it, including the submit button (y≈1587), sat below the fold.
 *  2. UNREACHABLE — worse than tall: Lenis intercepts wheel/touch globally,
 *     so a nested `overflow-y-auto` never received the events. The form below
 *     the fold could not be scrolled to at all. Fixed three ways: the content
 *     now FITS, the scroller carries `data-lenis-prevent`, and the overlay
 *     stops Lenis outright while it is open (SmoothScroll's modal handle).
 *  3. FRAGILE ENTRANCE — the shell relied on `opacity-0 animate-fade-in`, so
 *     anything that suppressed the animation left a full-screen invisible
 *     layer swallowing clicks. The entrance is now a MOUNTED-STATE opacity
 *     TRANSITION: the end state is plain CSS, reachable with or without
 *     motion, and reduced-motion simply arrives instantly.
 *
 * THE COMPOSITION — THE SPLIT PLATE. Two columns filling the viewport: a
 * full-height portrait plate carries the heading and the reassurance over a
 * graded scrim (so the form column pays no vertical rent for them), and the
 * form sits in the right column, vertically centred, whole and visible. It is
 * the /work hero's asymmetry and the ContactCTA card's material, in a modal.
 * Below md the plate becomes a short banner and the (short) form flows under
 * it, scrollable via the prevented scroller.
 *
 * THE ENTRANCE, layer by layer (all opacity only — the brand's entrances fade
 * IN PLACE; the 16px rise is retired): scrim 0→260ms, plate 120→800ms (the
 * slower plate tempo: images develop), plate type 300ms, form 380ms. Escape,
 * ✕ and browser-back all close; open pushes a history entry so a phone's back
 * gesture closes the overlay rather than leaving the page.
 */

/* One shared transition for every layer — opacity only, generous curve. The
   per-layer delay is what makes it read as a sequence. */
const LAYER = "transition-opacity duration-700 ease-out motion-reduce:transition-none";

export default function StartProjectOverlayHost() {
  const [open, setOpen] = useState(false);
  /** Drives the entrance: false on the first paint after mount, true on the
      next frame, so the CSS transition actually runs. */
  const [shown, setShown] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const pushedRef = useRef(false);

  const openOverlay = useCallback(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.history.pushState({ nrStartProject: true }, "");
    pushedRef.current = true;
    setOpen(true);
  }, []);

  const closeOverlay = useCallback((viaPopstate = false) => {
    setOpen(false);
    setShown(false);
    if (!viaPopstate && pushedRef.current) window.history.back();
    pushedRef.current = false;
    restoreFocusRef.current?.focus?.();
    restoreFocusRef.current = null;
  }, []);

  /* The sitewide trigger interceptor: any `a[href="/start-a-project"]` opens
     the overlay in place (capture phase, before Next's Link). The route stays
     the real page for no-JS, middle-click, crawlers and shared links, and on
     the route itself the interceptor stands down. */
  useEffect(() => {
    if (pathname === "/start-a-project") return;
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.getAttribute("href") !== "/start-a-project") return;
      if (anchor.target && anchor.target !== "_self") return;
      e.preventDefault();
      openOverlay();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, openOverlay]);

  /* Escape closes; browser/gesture back closes without a second back. */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeOverlay();
    }
    function onPop() {
      closeOverlay(true);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open, closeOverlay]);

  /* While open: stop the page's glide (Lenis owns wheel/touch — see the modal
     handle in SmoothScroll), lock the body, kick off the entrance on the next
     frame, and put focus on the close button. */
  useEffect(() => {
    if (!open) return;
    const lenis = window.__nrLenis;
    lenis?.stop();
    /* LOCK THE ROOT, NOT THE BODY (2026-08-01). `body { overflow: hidden }`
       is a NO-OP on this document: overflow only propagates to the viewport
       from the ROOT element, and body is as tall as its content, so there is
       nothing for it to clip — measured with the overlay open, a
       `window.scrollTo(0, 600)` still moved the page. It also makes body a
       scroll container, which silently breaks `position: sticky` on the page
       behind (the /services odometer, the manifesto tracks). Locking
       documentElement is what actually holds; lenis.stop() above handles the
       glide, and matters doubly under reduced motion where Lenis never
       mounts and the wheel would otherwise scroll the page behind.
       padding-right compensates for the scrollbar so the page beneath does
       not reflow on platforms with a classic (space-taking) scrollbar. */
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPadRight = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    /* Kick the entrance on the next frame so the transition has a from-state
       to animate out of. BELT AND BRACES: requestAnimationFrame is throttled
       (or parked entirely) in a backgrounded tab, and if it never fires the
       overlay would sit at opacity 0 swallowing clicks — the exact failure
       the rebuild exists to kill. The timer guarantees the reveal even if the
       frame callback never arrives; whichever lands first wins, and setting
       the same state twice is free. */
    const raf = requestAnimationFrame(() => setShown(true));
    const timer = setTimeout(() => setShown(true), 120);
    overlayRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadRight;
      lenis?.start();
    };
  }, [open]);

  /* A light focus trap — the overlay is aria-modal and covers the page. */
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !overlayRef.current) return;
    const focusables = Array.from(
      overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]):not(.sr-only), textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null || el.tagName === "INPUT");
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sp-overlay-title"
      /* The dialog itself takes focus on open (tabIndex -1) rather than the
         Close button: opening with a champagne focus ring around the EXIT
         reads as "leave", and a screen reader then announces the dialog's
         own label and contents instead of a lone button. */
      tabIndex={-1}
      onKeyDown={trapTab}
      /* h-[100dvh] so an iOS keyboard doesn't push the layout out of the
         viewport (100vh lies while the browser chrome collapses). */
      className="fixed inset-0 z-[70] h-[100dvh] w-screen"
    >
      {/* LAYER 1 — the ground: the site's warm hero material, fixed behind
          the content (grain's ::before is inset-0, so it must sit on a
          non-scrolling layer or it would scroll away). */}
      <div
        aria-hidden
        className={`absolute inset-0 overflow-hidden grain bg-[#16110C] ${LAYER} ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "260ms" }}
      >
        {/* 0.8 → 0.4 (2026-08-01, client: "the background blurs feel a bit
            too much — can we decrease opacity"). The overlay is a reading
            surface: the glow is atmosphere behind type, not a hero ground.
            topLeft steps down with it so the pool behind the H1 stays quiet. */}
        <HeroGlow intensity={0.4} topLeft={0.5} />
      </div>

      {/* THE SCROLL LAYER. data-lenis-prevent lets the wheel reach it on
          short screens; the content itself is sized to need no scroll on a
          laptop. */}
      <div
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col px-6 md:px-10">
          {/* The bar — kicker left, close right, on the nav's own height. */}
          <div
            className={`flex h-14 shrink-0 items-center justify-between md:h-16 ${LAYER} ${
              shown ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: shown ? "220ms" : "0ms" }}
          >
            <p className="overline">Start a project</p>
            <button
              type="button"
              onClick={() => closeOverlay()}
              className="nav-link inline-flex items-center gap-2 text-bone transition-colors hover:text-champagne"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          {/* THE SPLIT — TITLE COLUMN left (cols 1–5), form right (cols 7–12).
              RESTRUCTURED 2026-08-01 at the client's instruction: "There is NO
              breathing room around the H1 — if you can't add breathing room,
              put it to the left of the form and make the image smaller." The
              full-rail masthead row was the problem: it sat between the bar
              and the split, so every pixel of air above the H1 pushed the form
              down and got clawed back again. Moving the heading INTO the left
              column decouples the two — the title now has a whole column to
              breathe in, and the plate shrinks to sit beneath it. One H2
              still, so the dialog's aria-labelledby always resolves. */}
          <div className="grid flex-1 grid-cols-1 items-center gap-9 pb-8 pt-4 md:grid-cols-12 md:gap-12 md:pb-6 md:pt-4">
            {/* THE TITLE COLUMN — heading, one quiet line, then the plate. */}
            <div className="md:col-span-5">
              <div
                className={`${LAYER} ${shown ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: shown ? "180ms" : "0ms" }}
              >
                <h2
                  id="sp-overlay-title"
                  className="heading-xl text-balance text-bone"
                >
                  Tell us about your <em>practice</em>.
                </h2>
                {/* The invitation (the client's own line) and the reassurance,
                    together under the heading now the plate no longer carries
                    type. The reply promise stays once, by the button. */}
                <p className="body-lg mt-6 max-w-[30ch] text-bone-dim">
                  Ready to be the next top-rated clinic? We read every enquiry
                  ourselves.
                </p>
              </div>

              {/* THE PLATE — SMALLER (client's call), and it no longer needs a
                  scrim or a caption now the type lives above it: a clean
                  landscape figure closing the column. 16:10 per the imagery
                  ratio canon, on the plate radius scale. */}
              <div
                className={`relative mt-8 overflow-hidden rounded-plate ${LAYER} ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDuration: "800ms",
                  transitionDelay: shown ? "300ms" : "0ms",
                }}
              >
                <div className="aspect-[16/10] w-full max-w-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/graphics/start-project-portrait.avif"
                    alt=""
                    loading="eager"
                    className="h-full w-full rounded-plate object-cover object-[50%_28%]"
                  />
                </div>
              </div>
            </div>

            {/* THE FORM — cols 7–12, whole and visible at 1440×900. The
                wrapper owns the entrance so the form itself never carries an
                opacity class it could strand on. */}
            <div
              className={`md:col-span-6 md:col-start-7 ${LAYER} ${
                shown ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: shown ? "380ms" : "0ms" }}
            >
              {/* THE PANEL (2026-08-01, client: "the form feels like it maybe
                  needs a border or something"; padding bumped the same day —
                  "the form feels not nicely padded, bump it up a bit"). A
                  contained surface: hairline rim, a whisper of raised ink so
                  it reads as a card on the glow, rounded on the surface scale
                  (we are a rounded brand). */}
              <div className="rounded-ui border rule-dark bg-ink-raised/40 p-6 sm:p-8">
                <StartProjectForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
