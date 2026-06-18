"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/site";

/**
 * Site navigation. Transparent over the hero, then condenses to a solid ink
 * bar with a hairline once scrolled. Mobile opens a full-screen drawer.
 * Reuse this — don't fork a second nav.
 *
 * Pages whose top-of-page is LIGHT (bone hero) list their route here so the
 * unscrolled nav renders ink-on-light instead of bone-on-transparent.
 */
const LIGHT_TOP_ROUTES: string[] = [];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const lightTop =
    !scrolled && !open && LIGHT_TOP_ROUTES.some((r) => pathname.startsWith(r));
  const fg = lightTop ? "text-ink" : "text-bone";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink/95 backdrop-blur border-b rule-dark" : "bg-transparent"
      }`}
    >
      <nav className="shell-wide flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group" aria-label={`${SITE.name} home`}>
          <span className={`font-display ${fg} text-xl md:text-2xl tracking-tight transition-opacity group-hover:opacity-70`}>
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
    </header>
  );
}
