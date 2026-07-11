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
 *
 * THE CLOSE PLATE (round 5, KEPT 2026-07-10). Static, never overlapping —
 * the close is the back cover; it resolves, it doesn't perform. Rowen 8
 * LANDSCAPE (16:10) right of the text on md+, bottom-locked to the CTA row
 * (items-end — the hero plate's bottom-lock, mirrored); the hero holds
 * Rowen 5 PORTRAIT — same room, same suite, same client on screen: one
 * shoot bookending the page. Mobile: in flow after the buttons,
 * right-anchored at 3/5 width like the hero's mobile plate. Bone-on-cream
 * keeps it tonally inside the band; the black table is the ink accent.
 * Plate rebuild recipe: docs/briefs/hero-plates.md.
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
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
              className="body-lg md:text-[21px] mt-10 max-w-[44ch] text-ink/70 reveal md:mt-12"
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
          {/* The close plate — col 8 stays empty (the hero's gutter of air,
              mirrored). Below md it stacks after the buttons, right-anchored
              like the hero's mobile plate. */}
          <div
            className="ml-auto w-3/5 max-w-[280px] reveal md:col-span-4 md:col-start-9 md:ml-0 md:w-auto md:max-w-none"
            style={{ transitionDelay: "320ms" }}
          >
            <div className="frame aspect-[16/10]">
              {/* Rowen 8 with the real Dr Yalda desktop composited onto the
                  laptop screen — the hero plate's sibling frame. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/plates/cta-rowen-08.jpg"
                alt="A laptop on a travertine plinth displaying the Dr Yalda Jamali website — brand and web design by North & Refine"
                loading="lazy"
                className="plate-develop absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Fade-to-ink on exit — the bone band dims into darkness as what
          follows arrives (JS-driven, pointer-events-none) */}
      <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
    </section>
  );
}
