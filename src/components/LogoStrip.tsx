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

// THE LOGO POOL (2026-07-10): real client marks, ALWAYS flattened to
// MONOCHROME BONE (#F2EEE6) before they enter the strip — colour logos
// would puncture the ink; the trust bar is tonal like the type system.
// (The earlier white + pale-blue dr-yalda.svg is retired from the strip
// for exactly that reason.) Each mark matches its own practice by name so
// the accessible labels stay honest; practices without a file yet cycle
// the pool (client-sanctioned repeats until more files arrive). Heights
// are tuned PER MARK — the two wordmarks differ 6:1 vs 13:1 in aspect, so
// equal heights would render wildly unequal widths; these values normalise
// them to roughly equal optical width (~200px at base).
const LOGO_POOL = [
  { match: /hawkes/i, src: "/assets/logos/dr-elizabeth-hawkes.svg", cls: "h-8 w-auto md:h-9" },
  { match: /yalda/i, src: "/assets/logos/dr-yalda-clinics.svg", cls: "h-4 w-auto md:h-[18px]" },
] as const;

function logoFor(name: string, index: number) {
  return LOGO_POOL.find((l) => l.match.test(name)) ?? LOGO_POOL[index % LOGO_POOL.length];
}

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
          {items.map((item, i) => {
            const logo = logoFor(item.name, i);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-label={item.name}
                  className="block opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt="" aria-hidden className={logo.cls} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
