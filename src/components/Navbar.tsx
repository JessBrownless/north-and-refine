"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";
import NRMonogram from "@/components/NRMonogram";

/**
 * Site navigation. A tall bar IN NORMAL FLOW at the top of the page
 * (refactored from absolute 2026-07-12): it takes its own height so heroes
 * no longer pad their tops to clear a floating bar — hero padding is now
 * pure, symmetric and independent (the client's "different padding under
 * things" ask). It still scrolls away (it's simply the first thing on the
 * page, not fixed). Tone-aware background so it owns its backdrop (ink on
 * dark pages, bone on light-top pages) and reads continuous with the hero
 * below. Mobile opens a full-screen drawer (solid bar while open). Reuse
 * this — don't fork a second nav.
 *
 * Pages whose top-of-page is LIGHT (bone hero) list their EXACT route here
 * so the nav renders ink-on-light instead of bone-on-transparent. Exact
 * match, not prefix. EMPTY since 2026-07-16 (the hero-cohesion pass): /blog
 * rejoined the ink family, so every page now opens dark. The machinery stays
 * for any future light-topped page.
 */
const LIGHT_TOP_ROUTES: string[] = [];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const lightTop = !open && LIGHT_TOP_ROUTES.includes(pathname);
  const fg = lightTop ? "text-ink" : "text-bone";

  // IMMERSIVE-RAIL PREVIEW (2026-07-14, client's call): the centred 1520 shell
  // strands hero content too far in on wide screens, so the print-hero
  // exploration sits on a near-full-bleed rail. The nav shares it so the logo
  // lines up with the hero's left edge. Scoped to those mockup routes — every
  // live page keeps the .shell rail — until the direction is settled.
  const immersive = pathname.startsWith("/mockups/print-hero");
  const rail = immersive ? "mx-auto w-full px-6 md:px-12 lg:px-40" : "shell";

  // Close the drawer on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The hero mockups bake their own nav; hide the site chrome there so there's
  // no double nav. (The homepage uses the real nav again, 2026-07-20 — one nav
  // sitewide; HomeHero no longer carries its own.)
  if (pathname === "/mockups/hero-1d") return null;

  return (
    // TRANSPARENT OVERLAY on the hero (2026-07-20, client: "the nav needs to be
    // intrinsically tied to the hero — the gradient runs through both"). Absolute
    // at the page top so each page's hero GROUND shows continuously behind it;
    // it scrolls away with the page. Heroes reserve top padding to clear it. The
    // drawer still goes fixed+solid when open.
    <header className="absolute inset-x-0 top-0 z-50">
      {/* When open, the wrapper becomes a fixed full-screen ink overlay:
          bar on top, menu filling the rest of the viewport.
          When closed it carries the TONE-AWARE BACKGROUND (ink on dark
          pages, bone on light-top pages) so the in-flow nav owns its
          backdrop and reads continuous with the hero, plus the full-bleed
          bottom hairline ("a thin border to help with layout"). The bg +
          border live on THIS full-width wrapper (not the .shell content grid,
          which insets and caps at 1520) so both run edge to edge. When the
          drawer is open the divider moves to .shell (between bar and menu).
          The nav CONTENT sits on .shell (2026-07-13, client's call) so the
          logo + links share ONE grid with every page's content — no more
          nav-on-shell-wide vs content-on-shell misalignment on wide screens. */}
      <div
        className={
          open
            ? "fixed inset-0 z-50 bg-ink flex flex-col"
            : "" /* transparent — the hero ground shows through (2026-07-20) */
        }
      >
        <div className={`${rail} ${open ? "border-b rule-dark" : ""}`}>
          <nav className="flex h-24 items-center justify-between md:h-32">
            <Link href="/" className="flex items-center gap-2 group" aria-label={`${SITE.name} home`}>
              {/* The NR monogram (swapped in for the text wordmark 2026-07-05);
                  currentColor via ${fg} keeps it correct on any nav tone */}
              <NRMonogram
                className={`h-5 w-auto md:h-6 ${fg} transition-opacity group-hover:opacity-70`}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-9">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${fg} transition-opacity duration-300 ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {/* Nav CTA — a .btn-sm SECONDARY (2026-07-16, hero-cohesion
                  pass): the homepage hero owns the flagship arrow CTA again
                  (the three-section hero), and the canon forbids a second
                  flagship in the first viewport, so the nav steps down to
                  the quiet tier sitewide. */}
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

        {/* Mobile menu — fills the rest of the viewport below the bar:
            centred serif links, with the Instagram handle pinned to the foot. */}
        {open && (
          <div className="md:hidden flex-1 overflow-y-auto flex flex-col">
            <nav className="shell w-full flex flex-1 flex-col justify-center gap-7 py-10">
              {NAV.map((item, i) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`heading-xl text-bone group relative w-fit opacity-0 animate-fade-in-up ${active ? "underline underline-offset-8 decoration-1" : ""}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => setOpen(false)}
                  >
                    {/* Hover crossfades the roman word out and the Saol italic in */}
                    <span className="transition-opacity duration-300 group-hover:opacity-0">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="italic absolute left-0 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              {/* Start a project — a serif word in line with the rest on
                  mobile, not the desktop pill CTA */}
              <Link
                href="/contact"
                className={`heading-xl text-bone group relative w-fit opacity-0 animate-fade-in-up ${pathname.startsWith("/contact") ? "underline underline-offset-8 decoration-1" : ""}`}
                style={{ animationDelay: `${NAV.length * 60}ms` }}
                onClick={() => setOpen(false)}
              >
                <span className="transition-opacity duration-300 group-hover:opacity-0">
                  Start a project
                </span>
                <span
                  aria-hidden
                  className="italic absolute left-0 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Start a project
                </span>
              </Link>
            </nav>

            {/* Instagram handle — fixed to the foot of the drawer */}
            <div className="shell w-full pb-10">
              <a
                href={SITE.sameAs[0]}
                target="_blank"
                rel="noreferrer"
                className="overline inline-flex items-center gap-2 text-bone opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(NAV.length + 1) * 60}ms` }}
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                  <circle cx="12" cy="12" r="4.4" />
                  <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                @northandrefine
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
