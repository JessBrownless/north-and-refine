import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";

// The footer's Instagram strip — MOCKUP tiles (capture crops + brand
// gradients) until a real feed embed exists; every tile links to the profile.
const IG_TILES: (
  | { kind: "shot"; src: string; pos: string }
  | { kind: "mark" }
  | { kind: "fill"; label: string }
)[] = [
  { kind: "shot", src: "/assets/desktops/dr-yalda-jamali.png", pos: "object-top" },
  { kind: "mark" },
  { kind: "shot", src: "/assets/desktops/dr-elizabeth-hawkes.jpg", pos: "object-left-top" },
  { kind: "fill", label: "✦" },
  { kind: "shot", src: "/assets/desktops/dr-yalda-jamali.png", pos: "object-bottom" },
  { kind: "fill", label: "01" },
];

/**
 * Site footer. Opens with the full-bleed Instagram strip (seamless tiles,
 * edge to edge), then wordmark + tagline, navigation, contact, and the giant
 * cropped NORTH. A floating back-to-top button rides the lower right (plain
 * anchor to #top — Lenis smooths it). Single footer for the whole site —
 * don't fork.
 */
export default function Footer() {
  const year = "2026"; // bump annually; kept static to avoid hydration drift

  return (
    <footer className="relative bg-ink">
      {/* ── Instagram — seamless full-bleed strip, connected to the footer ── */}
      <div className="shell flex flex-wrap items-end justify-between gap-4 pt-14 pb-8 md:pt-20">
        <div>
          <p className="overline reveal">[ Elsewhere ]</p>
          <p className="heading-md from-overline text-bone reveal" style={{ transitionDelay: "80ms" }}>
            @northandrefine
          </p>
        </div>
        <a
          href={SITE.sameAs[0]}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost text-bone reveal"
        >
          Follow along <span aria-hidden>→</span>
        </a>
      </div>
      <div className="grid w-full grid-cols-3 gap-px md:grid-cols-6">
        {IG_TILES.map((tile, i) => (
          <a
            key={i}
            href={SITE.sameAs[0]}
            target="_blank"
            rel="noreferrer"
            aria-label="North & Refine on Instagram"
            className="group frame aspect-square"
          >
            {tile.kind === "shot" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tile.src}
                alt=""
                loading="lazy"
                className={`h-full w-full object-cover ${tile.pos} transition-transform duration-700 group-hover:scale-[1.04]`}
              />
            ) : tile.kind === "mark" ? (
              <span className="flex h-full w-full items-center justify-center font-display text-3xl tracking-tight text-bone/25">
                N<span className="text-champagne/40">&amp;</span>R
              </span>
            ) : (
              <span className="portrait-fill flex h-full w-full items-center justify-center">
                <span className="index-num text-ink/30">{tile.label}</span>
              </span>
            )}
          </a>
        ))}
      </div>

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

      {/* Floating back-to-top — plain anchor so Lenis carries the glide */}
      <a
        href="#top"
        aria-label="Back to top"
        className="absolute bottom-8 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 bg-ink-raised/80 text-bone backdrop-blur-md transition-colors hover:border-champagne hover:text-champagne md:bottom-12 md:right-10"
      >
        <span aria-hidden>↑</span>
      </a>

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
