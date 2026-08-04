"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NRMonogram from "@/components/NRMonogram";
import StartProjectForm from "@/components/StartProjectForm";
import { SITE } from "@/lib/site";

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
 * THE COMPOSITION — THE HALF-AND-HALF (2026-08-01, the client's third and
 * settled direction, on a Relume split-screen reference: "we need to go for
 * this kind of layout. It doesn't feel immersive at all — maybe a light
 * background too on the form bit").
 *
 *   LEFT   the form column on BONE + `grain-light`: mark, close, masthead,
 *          then the STEPPED form (see StartProjectForm), then a quiet foot.
 *   RIGHT  the portrait, FULL BLEED, floor to ceiling.
 *
 * WHY LIGHT WON. The two dark attempts of the same day are the argument. The
 * warm hero ground read as one more page; dropping it to ink with a deepened
 * vignette made it darker but not more immersive, because the form was still
 * a small object floating in a large empty room. Immersion here is not a
 * ground treatment at all: it is the IMAGE holding half the screen and the
 * reader's own column being a lit, close, finite surface. The site's own
 * grammar already said so — a light act inside a dark site is the strongest
 * change of register it has.
 *
 * ONE ratio exception, deliberate: the image is architecture, not a plate. It
 * runs the full half at whatever the viewport is, flush to the edges — so no
 * 16:10/4:5 crop and no corner radius (the same reason a full-bleed band
 * doesn't round). The source is 1500×2000, so `object-cover` always has
 * portrait to work with.
 *
 * THE ENTRANCE, layer by layer (all opacity only — the brand's entrances fade
 * IN PLACE; the 16px rise is retired): ground 0→260ms, image 120→800ms (the
 * slower plate tempo: images develop), masthead 220ms, form 340ms. Escape, ✕
 * and browser-back all close; open pushes a history entry so a phone's back
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
      {/* THE GROUND — bone, so the whole overlay is a light act. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-bone ${LAYER} ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "260ms" }}
      />

      {/* THE HALF-AND-HALF. On md+ two equal columns; below it the image
          becomes a 12rem banner and the form column takes the rest. The DOM
          order is form-then-image (the form is what the reader came for, and
          the Close button must be first in the tab order); `order` does the
          visual flip. */}
      <div className="relative grid h-full grid-rows-[12rem_1fr] md:grid-cols-2 md:grid-rows-1">
        {/* ── THE FORM COLUMN ──────────────────────────────────────────────
            grain-light is the light ground's material (the one-material rule:
            every surface on the site carries grain or grain-light). It needs
            the clip + a z-10 content layer, and it must sit on the NON-scrolling
            wrapper: an inset-0 ::before inside a scroller scrolls away with the
            content. */}
        <div className="relative order-2 overflow-hidden bg-bone grain-light md:order-1">
          <div
            data-lenis-prevent
            className="relative z-10 h-full overflow-y-auto overscroll-contain"
          >
            <div className="flex min-h-full flex-col px-6 py-6 md:px-10 md:py-7 lg:px-16">
              {/* The bar — THE MARK alone (2026-08-01, client: "the logo
                  actually should be on it"). The overlay covers the nav, so
                  without it the studio's name leaves the screen at the exact
                  moment a visitor decides to hand over their details. It is a
                  STAMP, not a link: a form is the one place the brand must
                  not offer an exit. NRMonogram carries its own role="img" +
                  label, so the name is still read aloud. Close left this bar
                  for the overlay's true top-right corner — see the chip after
                  the grid. */}
              <div
                className={`flex shrink-0 items-center ${LAYER} ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: shown ? "220ms" : "0ms" }}
              >
                <NRMonogram className="h-5 w-auto text-ink md:h-6" />
              </div>

              {/* THE READING COLUMN — ONE PANEL holding masthead + form,
                  centred in whatever height is left. THE PANEL RETURNED
                  2026-08-01 ("it feels a little unstructured — do you think a
                  rounded border around the title and form fields is a good
                  idea?"), and it is NOT the panel we stripped that morning:
                  that one was a dark box around bare fields on a dark ground,
                  a container defending itself. RE-SCOPED the same evening
                  (client: "the border should just be around the stepper and
                  the form fields, not the whole thing"): the masthead sits
                  free on the bone above it, and the panel wraps exactly what
                  the reader ACTS on — marks, step title, fields, foot. The
                  title speaks, the panel is the instrument. Hairline stepped
                  ink/15 → ink/25 in the same pass ("needs to be darker to
                  help balance") — still a step under the fields' ink/35, so
                  furniture stays under affordance. Rounded on the surface
                  scale, no fill — the bone and its grain run through. */}
              <div className="flex flex-1 flex-col justify-center py-4 md:py-3">
                <div className="w-full max-w-[640px]">
                  <div
                    className={`${LAYER} ${shown ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: shown ? "260ms" : "0ms" }}
                  >
                    {/* The kicker over the H1, house grammar: direct
                        siblings, `.from-overline` carrying the gap. On light
                        the kicker takes clay — the sanctioned tracked-caps
                        exception. */}
                    <p className="overline text-clay">Start a project</p>
                    {/* The accent word is YOUR (2026-08-01, client's call) —
                        the possessive is the point of the sentence: their
                        practice, not practices in general. */}
                    <h2
                      id="sp-overlay-title"
                      className="heading-xl from-overline text-balance text-ink"
                    >
                      Tell us about <em>your</em> practice.
                    </h2>
                    {/* Short again: the reply promise moved to the proof
                        bento's wide tile (its third home, and the right one —
                        a real number, presented AS the number it is). */}
                    <p className="body mt-3 max-w-[46ch] text-ink-dim">
                      Ready to be the next top-rated clinic? Give us a few
                      details to get started.
                    </p>
                  </div>

                  {/* The form owns no opacity class of its own — the wrapper
                      carries the entrance, so a stranded animation can never
                      leave a conversion-critical form invisible. */}
                  <div
                    className={`mt-6 rounded-ui-lg border border-ink/25 p-6 sm:p-7 ${LAYER} ${
                      shown ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: shown ? "360ms" : "0ms" }}
                  >
                    <StartProjectForm tone="light" />
                  </div>
                </div>
              </div>

              {/* The foot line — the wireframe's © slot, earning its keep as
                  the escape hatch for anyone who would rather just email. */}
              <div
                className={`shrink-0 ${LAYER} ${shown ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: shown ? "420ms" : "0ms" }}
              >
                <p className="fineprint text-ink-mute">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-ink underline decoration-champagne underline-offset-4 transition-colors hover:text-champagne"
                  >
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── THE IMAGE ────────────────────────────────────────────────────
            Full bleed, floor to ceiling: architecture, not a plate, so no
            ratio box and no radius. RESTAGED 2026-08-01 to the client's
            ember-tile reference ("the image needs to match our imagery
            style… use social proof or stats overlayed over the BG image as a
            reason to continue"), in the tiles' own grammar:
             · THE GRADE — the stock shot is bright daylight; the reference
               is lit warmth on dark. An ember-burnt multiply wash + a slight
               settle on the img pull it onto the palette's warm axis (the
               in-image grade the ember-ramp rule sanctions), and an ink
               scrim rises from the foot for the stat to sit on.
             · THE GRAIN — the one material; the tiles are grainy too. (The
               big inset hairline frame retired when the bento arrived — the
               tiles carry their own hairlines; two frames was chrome.)
             · THE PROOF — the PROMISE BENTO at the foot (see its own
               comment below): the studio's true numbers, ready to take
               real anonymised client results when they exist. */}
        <div
          className={`relative order-1 overflow-hidden bg-ink grain md:order-2 ${LAYER} ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: "800ms",
            transitionDelay: shown ? "120ms" : "0ms",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/graphics/start-project-portrait.avif"
            alt=""
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-[50%_35%] [filter:brightness(0.92)_saturate(0.94)]"
          />
          {/* The warm cast, then the foot scrim. */}
          <div aria-hidden className="absolute inset-0 bg-ember-burnt/25 mix-blend-multiply" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
          />
          {/* THE PROMISE BENTO (2026-08-01 — the client's shape, retired
              figures: "the stats look great, but can we just say that
              randomly with nothing to tie it to? I don't think we can." She
              is right, and the receipts audit already said so: no numbers we
              can't defend. The illustrative results set (+212% · 3.4× · 2.1)
              lasted one round; there are NO real client results in the repo
              yet, so until she supplies real anonymised figures the tiles
              carry the numbers that are TRUE TODAY — the studio's own
              promises about what pressing send actually starts. Same tile
              grammar (one wide + two square), no asterisks because nothing
              needs disclaiming, and the trend chart went with the figures —
              it drew a shape no dataset backs.
              THE MATERIAL IS `.glass-float` (2026-08-02) — the house
              dark-glass recipe, which these tiles turned out to be an ad-hoc
              rehearsal of (ink/35 + bone/25 + blur-md, no shadow); they gain
              the deeper blur and the float stack. ⚠ Two honest caveats that
              do NOT apply to the hero graphic: the wide tile sits on the ink
              foot scrim, so its drop shadow lands on near-ink and barely
              reads; and this image column is `overflow-hidden` (it must be,
              it clips a full-bleed photograph), so the handoff's "let panels
              overhang the edges" cannot apply on this surface. The blur and
              the lit top edge are what earn their keep here.
              THE SWAP PATH: when real, client-approved, anonymised results
              exist ("a London skin clinic", never named), each tile takes a
              figure + label + one attribution line — the structure is
              already right for it. Never draft that data here.
              The reply promise's THIRD home (foot → subtitle → here) and its
              last: it is the one real number this surface owns, so it gets
              the numeral treatment instead of hiding in running copy. */}
          <div
            className={`absolute inset-x-5 bottom-5 z-10 hidden gap-3 md:grid md:grid-cols-2 lg:inset-x-6 lg:bottom-6 ${LAYER} ${
              shown ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: shown ? "480ms" : "0ms" }}
          >
            <div className="glass-float col-span-2 p-5 lg:p-6">
              <p className="stat text-bone">2</p>
              <p className="body-sm mt-2 text-bone-dim">
                Working days to a personal reply
              </p>
              <p className="fineprint mt-1 text-bone-dim/80">
                We read every enquiry ourselves.
              </p>
            </div>
            <div className="glass-float p-5 lg:p-6">
              <p className="stat text-bone">3</p>
              <p className="body-sm mt-2 text-bone-dim">
                Steps to send; about two minutes
              </p>
            </div>
            <div className="glass-float p-5 lg:p-6">
              {/* Zero is the honest headline for "no obligation". */}
              <p className="stat text-bone">0</p>
              <p className="body-sm mt-2 text-bone-dim">Obligation</p>
              <p className="fineprint mt-1 text-bone-dim/80">
                The first conversation commits you to nothing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CLOSE — the overlay's true top-right corner (2026-08-01, client: it
          "should be top right"; in the bar it sat at the form column's inner
          edge, the visual MIDDLE of a split screen). A round glass chip over
          the image so it owns its contrast on any crop: ink wash + blur under
          a bone glyph, champagne on hover per the gold rule. The opacity
          entrance rides a wrapper span — LAYER's transition-opacity and the
          chip's own transition-colors would fight over transition-property on
          one element. */}
      <span
        className={`absolute right-5 top-5 z-30 md:right-7 md:top-6 ${LAYER} ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: shown ? "220ms" : "0ms" }}
      >
        <button
          type="button"
          onClick={() => closeOverlay()}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/30 bg-ink/40 text-bone backdrop-blur-md transition-colors hover:border-champagne hover:text-champagne"
        >
          <span aria-hidden>✕</span>
        </button>
      </span>
    </div>
  );
}
