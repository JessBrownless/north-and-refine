"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";

/**
 * Site navigation. A tall, transparent bar over the hero; once scrolled it
 * condenses into a floating glass pill — centred, blurred, hairline-bordered.
 * Mobile opens a full-screen drawer (full-width solid bar while open).
 * Reuse this — don't fork a second nav.
 *
 * Pages whose top-of-page is LIGHT (bone hero) list their route here so the
 * unscrolled nav renders ink-on-light instead of bone-on-transparent.
 */
const LIGHT_TOP_ROUTES: string[] = [];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [open, setOpen] = useState(false);

  const lightTop =
    !scrolled && !open && LIGHT_TOP_ROUTES.some((r) => pathname.startsWith(r));
  const fg = lightTop ? "text-ink" : "text-bone";

  // The condensed glass-pill state — scrolled, and not holding the drawer open.
  const pill = scrolled && !open;

  useEffect(() => {
    // One listener drives both states: the condensed pill, and whether the
    // nav is currently floating over a light section (elements marked with
    // data-nav-light, e.g. the bone manifesto and ContactCTA) so the pill
    // can flip to ink glass instead of vanishing bone-on-bone.
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      let light = false;
      document.querySelectorAll("[data-nav-light]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 88 && r.bottom > 16) light = true;
      });
      setOverLight(light);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close the drawer on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // pointer-events-none lets clicks fall through the transparent stage
    // around the pill; the nav (and open drawer) opt back in.
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className={open ? "pointer-events-auto bg-ink border-b rule-dark" : ""}>
        <div className="shell-wide">
          {/* Both states declare every animated property (same hue at zero
              alpha, blur-0, a max-width that MATCHES the rendered width) so
              the whole transition interpolates in lockstep — no dead zones,
              no colour pops. The unscrolled max-width mirrors .shell-wide's
              content width: 100vw minus twice its padding-inline clamp. */}
          <nav
            className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              pill
                ? `mx-auto mt-5 h-12 max-w-4xl rounded-full border px-5 shadow-xl shadow-ink/40 backdrop-blur-xl md:mt-6 md:h-14 md:px-7 ${
                    overLight
                      ? "border-ink/10 bg-ink/85"
                      : "border-bone/15 bg-bone/10"
                  }`
                : "mx-auto mt-0 h-20 max-w-[calc(100vw-clamp(3rem,8vw,8rem))] rounded-full border border-bone/0 bg-bone/0 px-0 backdrop-blur-0 md:h-24"
            }`}
          >
            <Link href="/" className="flex items-center gap-2 group" aria-label={`${SITE.name} home`}>
              {/* Scale (not font-size) so the wordmark shrinks without text
                  reflow — keeps the motion silky */}
              <span
                className={`font-display ${fg} text-xl md:text-2xl tracking-tight origin-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-70 ${
                  pill ? "scale-90" : "scale-100"
                }`}
              >
                North <span className="text-champagne">&amp;</span> Refine
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-9">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${fg} ${active ? "opacity-100" : "opacity-70"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`btn btn-sm ${lightTop ? "btn-secondary-light" : "btn-secondary-dark"}`}
              >
                Start a project
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-px w-6 ${lightTop ? "bg-ink" : "bg-bone"} transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span className={`block h-px w-6 ${lightTop ? "bg-ink" : "bg-bone"} transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-px w-6 ${lightTop ? "bg-ink" : "bg-bone"} transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </button>
          </nav>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-ink border-t rule-dark">
            <div className="shell-wide py-8 flex flex-col gap-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-bone text-2xl"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn btn-primary-dark mt-2 self-start"
                onClick={() => setOpen(false)}
              >
                Start a project
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
