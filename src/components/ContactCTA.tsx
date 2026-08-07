import Link from "next/link";
import HeroGlow from "@/components/HeroGlow";

interface ContactCTAProps {
  /** Override the default heading (plain text — no italic accent). */
  heading?: string;
  /** Override the default supporting line. */
  body?: string;
}

/**
 * Standard "start a project" CTA band — the sitewide close. Drop at the foot
 * of most pages; don't hand-roll a parallel CTA block.
 *
 * THE GRADIENT CARD (2026-07-24, client: "a gradient card where the card's
 * inside the CTA, black background but gradienty card"). The cream back-cover
 * era (2026-07-10 → 24) ended here: the section is INK, and the close is a
 * rounded card carrying the HERO'S OWN GROUND — warm base + <HeroGlow> +
 * grain — with the CTA content inside it. The page opens under a warm glow
 * and shuts on the same light held in a card: bookends, in the site's one
 * gradient language. Rounded corners per the curved direction (the /about
 * tiles' family); the card, like the homepage craft card before it, is a
 * SCOPED exception to the flat-ground rule — the gradient lives INSIDE the
 * card, never on the section ground.
 *
 * THE CLOSE MIRRORS THE HERO (kept from the cream era): kicker, heading-xl
 * (the MOMENTS register), lede, flagship + ghost, left on the rail — and THE
 * CLOSE PLATE (Rowen 8, 16:10) right of the text, bottom-locked to the CTA
 * row (items-end). Static, never overlapping: the close is the back cover;
 * it resolves, it doesn't perform. Type is the ON-INK ladder now
 * (bone/bone-dim); the flagship is the dark-ground pair (btn-primary-dark).
 * Mobile: plate in flow after the buttons, right-anchored at 3/5.
 *
 * The exit-fade left with the cream: this band already ends every page on
 * ink, so there is nothing to fade into. data-nav-light removed — the band
 * is dark; LIGHT_TOP_ROUTES logic is untouched elsewhere.
 */
export default function ContactCTA({
  heading,
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
}: ContactCTAProps) {
  return (
    <section className="relative overflow-hidden grain bg-ink">
      {/* Statement-moment spacing tier: py-32 md:py-44 — the studio moment
          and this close share it; standard sections sit on py-24 md:py-32. */}
      <div className="shell relative z-10 py-32 md:py-44">
        {/* THE CARD — the hero ground, held. relative + overflow-hidden +
            grain per the .grain contract; content rides z-10 above the glow.
            Radius in the /about tiles' clamp family. */}
        <div className="reveal relative overflow-hidden grain rounded-plate-lg bg-ink-canvas">
          {/* The card's own contained dose — 0.8 → 0.5 in the 2026-08-08
              sitewide knock-back ("across the whole site"). Deliberately NOT
              the ground constant: a card's gradient is its content, and at
              ground dose the close would be a flat dark plate. */}
          <HeroGlow intensity={0.5} />
          <div className="relative z-10 p-10 sm:p-14 md:p-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-7">
                <p className="overline reveal">Start a project</p>
                <h2
                  className="heading-xl from-overline max-w-[24ch] text-balance text-bone reveal"
                  style={{ transitionDelay: "80ms" }}
                >
                  {heading ?? (
                    <>
                      Let&rsquo;s build something your patients <em>trust</em>.
                    </>
                  )}
                </h2>
                <p
                  className="body-xl mt-10 max-w-[44ch] text-bone-dim reveal md:mt-12"
                  style={{ transitionDelay: "160ms" }}
                >
                  {body}
                </p>
                {/* The foot view's flagship + the tertiary ghost — the hero
                    pair, on the card's dark ground. */}
                <div
                  className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 reveal md:mt-12"
                  style={{ transitionDelay: "240ms" }}
                >
                  <Link href="/start-a-project" className="btn btn-primary-dark btn-arrow">
                    Start a project
                    <span className="btn-arrow-chip" aria-hidden>↗</span>
                  </Link>
                  <Link href="/work" className="btn-ghost text-bone">
                    See the work <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
              {/* The close plate — col 8 stays empty (the hero's gutter of
                  air, mirrored). Below md it stacks after the buttons,
                  right-anchored like the hero's mobile plate. */}
              <div
                className="ml-auto w-3/5 max-w-[280px] reveal md:col-span-4 md:col-start-9 md:ml-0 md:w-auto md:max-w-none"
                style={{ transitionDelay: "320ms" }}
              >
                <div className="frame aspect-[16/10]">
                  {/* Rowen 8 with the real Dr Yalda desktop composited onto
                      the laptop screen — the hero plate's sibling frame. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/plates/cta-rowen-08.jpg"
                    alt="A laptop on a travertine plinth displaying the Dr Yalda Jamali website — web and brand design by North & Refine"
                    loading="lazy"
                    className="plate-develop absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
