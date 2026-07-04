import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";

/**
 * Site footer. Wordmark + tagline, navigation, and contact. Lives on the ink
 * base. Single footer for the whole site — don't fork.
 */
export default function Footer() {
  const year = "2026"; // bump annually; kept static to avoid hydration drift

  return (
    <footer className="bg-ink border-t rule-dark">
      <div className="shell py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-bone text-3xl tracking-tight">
              North <span className="text-champagne">&amp;</span> Refine
            </Link>
            <p className="body mt-5 text-bone-dim max-w-sm">{SITE.tagline}.</p>
            <a
              href={`mailto:${SITE.email}`}
              className="btn-ghost text-bone mt-8 inline-flex"
            >
              {SITE.email}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="overline text-clay">Explore</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="body text-bone-dim hover:text-bone transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="body text-bone-dim hover:text-bone transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <p className="overline text-clay">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {SITE.sameAs.map((href) => {
                const label = href.includes("instagram")
                  ? "Instagram"
                  : href.includes("linkedin")
                    ? "LinkedIn"
                    : "Link";
                return (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="body text-bone-dim hover:text-bone transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t rule-dark flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="fineprint">
            © {year} {SITE.legalName}. All rights reserved. ·{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-bone transition-colors">
              Privacy
            </Link>
          </p>
          <p className="fineprint">
            Brand &amp; web design for medical aesthetic &amp; cosmetic surgery practices.
          </p>
        </div>
      </div>

      {/* The signature close — a giant NORTH cropped by the page's end.
          translate-y (not margin) does the crop, so the footer's height ends
          exactly at the visible glyph line. Decorative only. */}
      <div aria-hidden className="select-none overflow-hidden pt-10 md:pt-16">
        <p className="wordmark-giant translate-y-[0.2em] text-center text-bone/[0.13]">
          NORTH
        </p>
      </div>
    </footer>
  );
}
