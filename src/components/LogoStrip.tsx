import Link from "next/link";

export interface LogoStripItem {
  /** Practice / client name, rendered as a typographic wordmark. */
  name: string;
  /** Case-study route the wordmark links to. */
  href: string;
}

interface LogoStripProps {
  items: LogoStripItem[];
  /** Quiet kicker above the row. */
  label?: string;
}

// PLACEHOLDER LOGO MODE (2026-07-09): the strip renders REAL logo artwork —
// currently the Dr Yalda mark (public/assets/logos/dr-yalda.svg, white
// wordmark + pale-blue droplet, built for dark grounds) REPEATED in every
// slot until each client's own file exists. The strip was typographic
// before (Saol names, no files to source) — that treatment is preserved in
// git history if the logo direction is reverted. Because the repeated mark
// is wrong for three of the four practices, the images are aria-hidden and
// each link keeps its practice name as the accessible label.
const PLACEHOLDER_LOGO = "/assets/logos/dr-yalda.svg";

/**
 * The under-hero trust bar — a quiet, ruled strip of client logos, each
 * linking to its case study. Fed by the homepage from the work collection so
 * it never drifts. Sits on the shared ink scene, so it carries no background
 * of its own.
 */
export default function LogoStrip({
  items,
  label = "Trusted by",
}: LogoStripProps) {
  if (items.length === 0) return null;

  return (
    /* .shell (not shell-wide — that was an edge-to-edge era leftover): the
       kicker kisses the grid's LEFT edge like the H1 above it; the marquee
       clips at its RIGHT edge like the work frames below.

       NO .reveal anywhere in this strip (2026-07-10): it now lives above
       the fold, and the Reveal observer's rootMargin excludes the bottom
       10% of the viewport — reveal-gated items here stay invisible until
       first scroll. The strip must be present from first paint. */
    <div className="shell">
      <div className="flex flex-col items-start gap-8 border-y rule-dark py-10 md:flex-row md:items-center md:gap-12 md:py-12">
        <p className="overline shrink-0 text-clay">{label}</p>
        {/* A STILL row — the marquee was trialled and retired the same day
            (2026-07-10): print stillness — nothing on the page moves
            unbidden. Logos still NEVER wrap: the row is nowrap, spread
            static on md+ (four marks fit the measure), reader-scrollable
            where it overflows on mobile — motion only from the reader, the
            carousel's own logic. Hard-clipped, no fade mask. */}
        <ul className="flex w-full min-w-0 flex-nowrap items-center gap-x-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-auto md:flex-1 md:justify-end md:gap-x-16 md:overflow-visible">
          {items.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-label={item.name}
                className="block opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PLACEHOLDER_LOGO}
                  alt=""
                  aria-hidden
                  className="h-12 w-auto md:h-16"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
