import Link from "next/link";

interface ContactCTAProps {
  /** Override the default heading (plain text — no italic accent). */
  heading?: string;
  /** Override the default supporting line. */
  body?: string;
}

/**
 * Standard "start a project" CTA band — the page's single light interruption,
 * and its close. Drop at the foot of most pages; don't hand-roll a parallel
 * CTA block.
 *
 * THE CLOSE MIRRORS THE HERO (rebuilt 2026-07-10 — the previous side-kicker
 * grid with its second hairline and split footer row read "bitty" and
 * matched nothing else on the page). Same grammar as every section and the
 * hero itself: kicker above, heading, lede, flagship + ghost — left on the
 * rail. The page opens with the claim + CTA pair on ink and shuts with the
 * invitation + CTA pair on bone: cover and back cover, inverted stock.
 * The heading sits at heading-xl (the MOMENTS register) to answer the
 * hero's display-mega; .statement is the quote register.
 */
export default function ContactCTA({
  heading,
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
}: ContactCTAProps) {
  return (
    <section data-nav-light className="scene-cream relative overflow-hidden text-ink">
      {/* Statement-moment spacing tier: py-32 md:py-44 — the studio moment
          and this close share it; standard sections sit on py-24 md:py-32. */}
      <div className="shell relative py-32 md:py-44">
        {/* Kicker at ink/70 — clay is sub-AA on light grounds */}
        <p className="overline text-ink/70 reveal">Start a project</p>
        <h2
          className="heading-xl from-overline max-w-[24ch] text-balance reveal"
          style={{ transitionDelay: "80ms" }}
        >
          {heading ?? (
            <>
              Let&rsquo;s build something your patients <em>trust</em>.
            </>
          )}
        </h2>
        <p
          className="body-lg mt-10 max-w-[44ch] text-ink/70 reveal md:mt-12"
          style={{ transitionDelay: "160ms" }}
        >
          {body}
        </p>
        {/* The foot view's flagship + the tertiary ghost — the hero pair,
            on light. */}
        <div
          className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 reveal md:mt-12"
          style={{ transitionDelay: "240ms" }}
        >
          <Link href="/contact" className="btn btn-primary-light btn-arrow">
            Start a project
            <span className="btn-arrow-chip" aria-hidden>↗</span>
          </Link>
          <Link href="/work" className="btn-ghost text-ink">
            See the work <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      {/* Fade-to-ink on exit — the bone band dims into darkness as what
          follows arrives (JS-driven, pointer-events-none) */}
      <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
    </section>
  );
}
