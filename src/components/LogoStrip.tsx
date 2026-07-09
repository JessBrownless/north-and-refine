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
       kicker kisses the grid's LEFT edge like the H1 above it, the marks
       reach its RIGHT edge like the work frames below. */
    <div className="shell">
      <div className="flex flex-col items-start gap-10 border-y rule-dark py-12 md:flex-row md:items-center md:justify-between md:gap-12 md:py-14">
        <p className="overline shrink-0 text-clay reveal">{label}</p>
        {/* The marks — sized to read as REAL logos; dimmed to sit with the
            tonal type, lifting to full strength on hover. Mobile wraps
            LEFT-ALIGNED like every other section (never a centred cluster —
            off-vibe, 2026-07-09); md+ hugs the grid's right edge. */}
        <ul className="flex flex-wrap items-center justify-start gap-x-8 gap-y-8 md:justify-end md:gap-x-16">
          {items.map((item, i) => (
            <li key={item.href} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
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
                  loading="lazy"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
