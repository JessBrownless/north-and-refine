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

/**
 * The under-hero trust bar — a quiet, ruled strip of client practice names set
 * as Saol wordmarks (the same treatment as the testimonial attribution), each
 * linking to its case study. Typographic by design: no logo image files to
 * source or invent, and it stays in sync with the work collection because the
 * homepage feeds it the featured practices. Sits on the shared ink scene, so it
 * carries no background of its own.
 */
export default function LogoStrip({
  items,
  label = "Trusted by",
}: LogoStripProps) {
  if (items.length === 0) return null;

  return (
    <div className="shell border-y rule-dark py-10 md:py-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
        <p className="overline shrink-0 text-clay reveal">{label}</p>
        {/* The wordmarks — quieter than a heading (dim bone), lifting to full
            bone on hover. Wraps to a centred cluster on mobile; spreads across
            the measure on md+. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {items.map((item, i) => (
            <li key={item.href} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <Link
                href={item.href}
                className="font-display text-2xl tracking-tight text-bone-dim transition-opacity duration-300 hover:text-bone md:text-3xl"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
