"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import HeroGlow from "@/components/HeroGlow";
import StartProjectForm from "@/components/StartProjectForm";

/**
 * THE START-A-PROJECT OVERLAY (2026-07-31, client: "Start a project" is a
 * BUTTON — "when you click it anywhere on the site, it does a form overlay";
 * /contact stays a plain contact page). A full-page form overlay on the warm
 * hero ground, carrying <StartProjectForm> (the services-ledger questions).
 *
 * HOW TRIGGERS WORK — the interceptor, not per-site wiring: this host mounts
 * once (inside Navbar, so the held-back layout.tsx stays untouched) and
 * listens for clicks on ANY `a[href="/start-a-project"]` in CAPTURE phase —
 * before Next's Link handler runs — then prevents the navigation and opens
 * the overlay instead. So every "Start a project" CTA sitewide (nav pill,
 * hero flagships, ContactCTA, pricing Enquire, the /contact pointer) opens
 * the overlay by simply linking to /start-a-project, and each stays a real
 * link underneath: no JS, middle-click, or a crawler gets the real page,
 * which remains the canonical fallback. New CTAs need no wiring — link to
 * /start-a-project and they're triggers.
 *
 * On /start-a-project itself the interceptor stands down (an overlay over
 * its own fallback page would be noise).
 *
 * HISTORY: opening pushes a state entry, so the browser/gesture BACK closes
 * the overlay instead of leaving the page (a phone user's instinct mid-form);
 * closing via ✕ or Escape pops that entry to keep history clean.
 */
export default function StartProjectOverlayHost() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  // Whether the current open state owns a pushed history entry (popstate
  // closes consume it; UI closes must history.back() past it).
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
    if (!viaPopstate && pushedRef.current) {
      // Consume the entry we pushed so BACK after closing doesn't no-op.
      window.history.back();
    }
    pushedRef.current = false;
    restoreFocusRef.current?.focus?.();
    restoreFocusRef.current = null;
  }, []);

  // The trigger interceptor (capture phase — see the component note).
  useEffect(() => {
    if (pathname === "/start-a-project") return;
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor || anchor.getAttribute("href") !== "/start-a-project") return;
      if (anchor.target && anchor.target !== "_self") return;
      e.preventDefault();
      openOverlay();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, openOverlay]);

  // Escape closes; browser back (popstate) closes without a second back.
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

  // Body scroll lock + initial focus while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // A light focus trap: Tab cycles within the overlay (it's aria-modal, and
  // the page behind is fully covered).
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !overlayRef.current) return;
    const focusables = Array.from(
      overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]), textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
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
      aria-label="Start a project"
      onKeyDown={trapTab}
      className="fixed inset-0 z-[60] opacity-0 animate-fade-in"
    >
      {/* The ground — the hero's own warm gradient language, FIXED behind
          the scrolling content (grain's ::before is inset-0, so it must sit
          on this non-scrolling layer or it would scroll away). */}
      <div aria-hidden className="absolute inset-0 overflow-hidden grain bg-[#16110C]">
        <HeroGlow intensity={0.8} />
      </div>

      {/* The scroll layer. */}
      <div className="absolute inset-0 overflow-y-auto overscroll-contain">
        <div className="shell relative">
          {/* The overlay's own bar — kicker left, close right, on the nav's
              height so the ✕ lands where the trigger pill was. */}
          <div className="flex h-24 items-center justify-between md:h-32">
            <p className="overline">Start a project</p>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => closeOverlay()}
              className="nav-link text-bone transition-colors hover:text-champagne"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          <div className="pb-24 pt-6 md:pb-32 md:pt-10">
            {/* heading-xl per the ladder: the overlay is a MOMENT over the
                page, not a masthead of its own. */}
            <h2 className="heading-xl max-w-[24ch] text-balance text-bone">
              Tell us about your <em>practice</em>.
            </h2>
            <p className="lede body-lg max-w-[46ch] text-bone-dim">
              Five questions, two minutes. Enough for the first conversation to
              be a useful one; nothing here commits you to anything.
            </p>
            <div className="mt-12 md:mt-16">
              <StartProjectForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
