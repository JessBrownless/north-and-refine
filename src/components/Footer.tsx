import Link from "next/link";
import NRMonogram from "@/components/NRMonogram";
import { FOOTER_NAV, SITE } from "@/lib/site";

// The footer's Instagram tiles — ALL quiet brand-gradient placeholders until
// a real feed exists (site-capture crops were too loud this close to the
// wordmark, 2026-07-04 — the "shot" kind stays for when real posts land);
// three sit each side of the centred monogram, all linking to the profile.
const IG_TILES: ({ kind: "shot"; src: string; pos: string } | { kind: "fill"; label: string })[] = [
  { kind: "fill", label: "✦" },
  { kind: "fill", label: "01" },
  { kind: "fill", label: "✦" },
  { kind: "fill", label: "02" },
  { kind: "fill", label: "✦" },
  { kind: "fill", label: "03" },
];

// One Instagram tile, linking to the profile. 4:5 — Instagram portrait is
// the feed's native ratio and the site NEVER crops it (ratio canon,
// 2026-07-10: portrait is 4:5, same as people).
function IgTile({ tile, profile }: { tile: (typeof IG_TILES)[number]; profile: string }) {
  return (
    <a
      href={profile}
      target="_blank"
      rel="noreferrer"
      aria-label="North & Refine on Instagram"
      className="group frame aspect-[4/5] w-full"
    >
      {tile.kind === "shot" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tile.src}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover ${tile.pos}`}
        />
      ) : (
        <span className="portrait-fill flex h-full w-full items-center justify-center">
          <span className="label text-ink/30">{tile.label}</span>
        </span>
      )}
    </a>
  );
}

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
    <footer className="relative overflow-hidden bg-ink">
      {/* (The footer's ambient champagne pool was retired with every other
          background gradient 2026-07-09 — the ground is flat ink now.) */}
      {/* ── Instagram — a strict SEVEN-COLUMN band spanning the content grid
          edge to edge: three tiles · the monogram cell · three tiles. Equal
          rhythm, flush margins — no floating cluster. Mobile stacks the
          monogram over a 3-up tile grid. ── */}
      <div className="shell pt-16 md:pt-20">
        <div className="grid grid-cols-3 items-center gap-3 md:grid-cols-7 md:gap-4">
          {IG_TILES.slice(0, 3).map((tile, i) => (
            <IgTile key={i} tile={tile} profile={SITE.sameAs[0]} />
          ))}
          <a
            href={SITE.sameAs[0]}
            target="_blank"
            rel="noreferrer"
            className="group order-first col-span-3 py-6 text-center md:order-none md:col-span-1 md:py-0"
          >
            <span className="inline-block text-bone transition-opacity group-hover:opacity-70">
              <NRMonogram className="mx-auto h-7 w-auto" />
            </span>
            <span className="overline mt-2 block">@northandrefine</span>
          </a>
          {IG_TILES.slice(3).map((tile, i) => (
            <IgTile key={i} tile={tile} profile={SITE.sameAs[0]} />
          ))}
        </div>
      </div>

      <div className="shell py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="North & Refine home" className="inline-block text-bone transition-opacity hover:opacity-70">
              <NRMonogram className="h-9 w-auto" />
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
                  <Link href={item.href} className="body-sm text-bone-dim hover:text-bone transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="body-sm text-bone-dim hover:text-bone transition-colors">
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
                      className="body-sm text-bone-dim hover:text-bone transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t rule-dark flex flex-col sm:flex-row gap-4 sm:items-baseline sm:justify-between">
          <p className="fineprint">
            © {year} {SITE.legalName}. All rights reserved. ·{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-bone transition-colors">
              Privacy
            </Link>
          </p>
          <p className="fineprint">
            Web, search and brand, built for medical and surgical practitioners and clinics.
          </p>
        </div>
      </div>

      {/* Floating back-to-top — plain anchor so Lenis carries the glide */}
      <a
        href="#top"
        aria-label="Back to top"
        className="absolute bottom-8 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 bg-ink-raised text-bone transition-colors hover:border-champagne hover:text-champagne md:bottom-12 md:right-10"
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
