import Link from "next/link";

// Rebuilt 2026-07-09 as an editorial close, to match the homepage's index-rail
// layout. What went, and why:
//   · The floating imagery collage. Once .portrait-fill was flattened to
//     parchment it sat at 1.06:1 against this band's bone — literally
//     invisible. A placeholder you cannot see is not a placeholder.
//   · The TypewriterWord rotating verb (animated caret read tech-demo).
// Both components remain in components/, unused.

interface ContactCTAProps {
  /** Override the default heading (plain text — no italic accent). */
  heading?: string;
  /** Override the default supporting line. */
  body?: string;
}

/**
 * Standard "start a project" CTA band — the page's single light interruption.
 * Drop at the foot of most pages; don't hand-roll a parallel CTA block.
 *
 * Structure mirrors the homepage's editorial sections: a kicker on the left
 * rail, the statement at column 4, and a ruled footer row carrying the
 * supporting line and the actions. It sits on `.shell` so it lines up on the
 * interior pages that use it (nine of the eleven); the homepage's wider rail
 * is close enough that the seam doesn't read.
 */
export default function ContactCTA({
  heading,
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
}: ContactCTAProps) {
  return (
    <section data-nav-light className="scene-warm relative overflow-hidden text-ink">
      {/* Statement-moment spacing tier: py-32 md:py-44 — the manifesto and
          this close share it; standard sections sit on py-24 md:py-32. */}
      <div className="shell relative py-32 md:py-44">
        <div className="grid grid-cols-1 gap-10 border-t rule-light pt-10 md:grid-cols-12 md:items-baseline md:gap-8 md:pt-12">
          {/* Left rail — kicker sits in clay on light sections, never champagne */}
          <p className="overline text-clay reveal md:col-span-3">Start a project</p>

          <div className="md:col-span-9">
            <h2 className="statement max-w-[20ch] text-balance reveal" style={{ transitionDelay: "80ms" }}>
              {heading ?? (
                <>
                  Let&rsquo;s build something your patients <em>trust</em>.
                </>
              )}
            </h2>

            {/* Ruled footer — supporting line left, the actions right. The
                rule is what makes this read as a closing colophon rather than
                a marketing box. */}
            <div className="mt-16 grid grid-cols-1 gap-8 border-t rule-light pt-8 md:mt-20 md:grid-cols-12 md:items-baseline">
              <p
                className="body-sm max-w-[46ch] text-ink/60 reveal md:col-span-6"
                style={{ transitionDelay: "160ms" }}
              >
                {body}
              </p>

              <div
                className="flex flex-wrap items-center gap-4 reveal md:col-span-6 md:justify-end"
                style={{ transitionDelay: "240ms" }}
              >
                <Link href="/contact" className="btn btn-primary-light btn-arrow">
                  Start a project
                  <span className="btn-arrow-chip" aria-hidden>↗</span>
                </Link>
                <Link href="/work" className="btn btn-secondary-light">
                  See the work
                </Link>
              </div>
            </div>

            {/* (The email/location colophon rail was cut 2026-07-09 —
                "everything should earn its place"; the footer carries the
                studio's contact details.) */}
          </div>
        </div>
      </div>
      {/* Fade-to-ink on exit — the bone band dims into darkness as what
          follows arrives (JS-driven, pointer-events-none) */}
      <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
    </section>
  );
}
