import Link from "next/link";

interface PageHeroProps {
  overline?: string;
  title: React.ReactNode;
  lede?: string;
  /** Optional primary CTA. */
  cta?: { label: string; href: string };
  /** Small meta line under the lede (e.g. breadcrumb-style context). */
  meta?: string;
  /** Use the largest display size (homepage). Interior pages use heading-xl. */
  size?: "mega" | "page";
}

/**
 * Canonical hero for interior pages. Dark, grain-textured, left-aligned. Extend
 * this via props rather than spawning HeroX variants. The homepage composes its
 * own bespoke hero, but every secondary page uses this.
 */
export default function PageHero({
  overline,
  title,
  lede,
  cta,
  meta,
  size = "page",
}: PageHeroProps) {
  return (
    <section className="relative grain scene-ink overflow-hidden">
      <div className="shell-wide pt-36 pb-16 md:pt-48 md:pb-24 relative z-10">
        <div className="max-w-4xl">
          {overline && <p className="overline text-champagne reveal">{overline}</p>}
          <h1
            className={`${size === "mega" ? "display" : "heading-xl"} text-bone ${
              overline ? "from-overline" : ""
            } reveal`}
            style={{ transitionDelay: "80ms" }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="lede body-lg text-bone-dim reveal"
              style={{ transitionDelay: "160ms" }}
            >
              {lede}
            </p>
          )}
          {(cta || meta) && (
            <div
              className="mt-10 flex flex-wrap items-center gap-6 reveal"
              style={{ transitionDelay: "240ms" }}
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
