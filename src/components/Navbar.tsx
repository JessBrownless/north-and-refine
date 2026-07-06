"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";
import NRMonogram from "@/components/NRMonogram";

/**
 * Site navigation. A tall, transparent bar sitting at the TOP of the page —
 * it scrolls away with the hero (no fixed pill, no scroll transform; the
 * footer's back-to-top anchor covers the return trip). Mobile opens a
 * full-screen drawer (solid bar while open). Reuse this — don't fork a
 * second nav.
 *
 * Pages whose top-of-page is LIGHT (bone hero) list their route here so the
 * nav renders ink-on-light instead of bone-on-transparent.
 */
const LIGHT_TOP_ROUTES: string[] = [];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const lightTop = !open && LIGHT_TOP_ROUTES.some((r) => pathname.startsWith(r));
  const fg = lightTop ? "text-ink" : "text-bone";

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
    // absolute (not fixed): the nav belongs to the top of the page and
    // scrolls away with it.
    <header className="absolute inset-x-0 top-0 z-50">
      {/* When open, the wrapper becomes a fixed full-screen ink overlay:
          bar on top, menu filling the rest of the viewport. */}
      <div className={open ? "fixed inset-0 z-50 bg-ink flex flex-col" : ""}>
        <div className={`shell-wide ${open ? "border-b rule-dark" : ""}`}>
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
              {/* Flagship arrow CTA (moved up from the hero 2026-07-05) */}
              <Link
                href="/contact"
                className={`btn ${lightTop ? "btn-primary-light" : "btn-primary-dark"} btn-arrow`}
              >
                Start a project
                <span className="btn-arrow-chip" aria-hidden>↗</span>
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
            <nav className="shell-wide w-full flex flex-1 flex-col justify-center gap-7 py-10">
              {NAV.map((item, i) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`heading-xl opacity-0 animate-fade-in-up ${active ? "text-champagne" : "text-bone"}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {/* Start a project — a serif word in line with the rest on
                  mobile, not the desktop pill CTA */}
              <Link
                href="/contact"
                className={`heading-xl opacity-0 animate-fade-in-up ${pathname.startsWith("/contact") ? "text-champagne" : "text-bone"}`}
                style={{ animationDelay: `${NAV.length * 60}ms` }}
                onClick={() => setOpen(false)}
              >
                Start a project
              </Link>
            </nav>

            {/* Instagram handle — fixed to the foot of the drawer */}
            <div className="shell-wide w-full pb-10">
              <a
                href={SITE.sameAs[0]}
                target="_blank"
                rel="noreferrer"
                className="overline inline-flex items-center gap-2 opacity-0 animate-fade-in-up"
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
