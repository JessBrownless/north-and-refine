import Link from "next/link";

interface PageHeroProps {
  overline?: string;
  title: React.ReactNode;
  lede?: string;
  /** Optional primary CTA. */
  cta?: { label: string; href: string };
  /** Small meta line under the lede (e.g. breadcrumb-style context). */
  meta?: string;
}

/**
 * Canonical hero for interior pages. Dark, grain-textured, left-aligned. Extend
 * this via props rather than spawning HeroX variants. The homepage composes its
 * own bespoke hero, but every secondary page uses this.
 *
 * 2026-07-10 sweep: (1) sits on .shell, not shell-wide — ONE RAIL SITEWIDE:
 * every page opens on the exact left rail its body, ContactCTA and footer
 * share (the homepage hero made the same move; the two-rail read was
 * rejected). (2) Load-in is opacity-0 + animate-fade-in with animationDelay
 * staggers — heroes are first-paint content, not IntersectionObserver
 * sections; matches the homepage masthead. (3) H1 hard-set to heading-xl
 * (THE LADDER: interior H1s are moments); the dead `size` prop is gone.
 * (4) CTA/meta row locks baselines, not boxes.
 */
export default function PageHero({ overline, title, lede, cta, meta }: PageHeroProps) {
  return (
    <section className="relative grain scene-ink overflow-hidden">
      <div className="shell pt-36 pb-16 md:pt-48 md:pb-24 relative z-10">
        <div className="max-w-4xl">
          {overline && (
            <p className="overline opacity-0 animate-fade-in">{overline}</p>
          )}
          <h1
            className={`heading-xl text-bone ${
              overline ? "from-overline" : ""
            } opacity-0 animate-fade-in`}
            style={{ animationDelay: "0.1s" }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="lede body-lg text-bone-dim opacity-0 animate-fade-in"
              style={{ animationDelay: "0.25s" }}
            >
              {lede}
            </p>
          )}
          {(cta || meta) && (
            <div
              className="mt-10 flex flex-wrap items-baseline gap-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.45s" }}
            >
              {cta && (
                <Link href={cta.href} className="btn btn-primary-dark">
                  {cta.label}
                  <span aria-hidden>→</span>
                </Link>
              )}
              {meta && <p className="label text-clay">{meta}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
