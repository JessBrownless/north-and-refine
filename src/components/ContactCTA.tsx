import Link from "next/link";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import HeroGlow from "@/components/HeroGlow";
import TypewriterWord from "@/components/TypewriterWord";

interface ContactCTAProps {
  /** THE ACT SYSTEM (2026-08-11) — declaring a ground opts this band into the
      act rule in globals.css. Omit it and the band keeps its own padding,
      which is what all twelve non-homepage consumers do. */
  ground?: "ink" | "bone";
  /** "I declare my ground for ADJACENCY only; I pace myself." */
  actSelf?: boolean;

  /** THE BLACK FADE-OUT as this band leaves the top of the viewport
      (2026-08-09, client: "any section that's black… fade into black"). A
      PROP rather than unconditional, unlike the homepage's other dark bands,
      for one reason: this component renders on twelve routes, and firing the
      overlay on all of them from a homepage request would be a sitewide
      change made by accident. The homepage opts in; extending it is one prop
      per page if the same treatment is wanted elsewhere. */
  exitFade?: boolean;
  /** Override the default heading (plain text — no italic accent and NO
      typewriter: the rotating word belongs to the default heading only). */
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
 * SIMPLIFIED 2026-08-08 (client: "simplify the CTA — maybe remove the image
 * and just set the text nicely"): THE CLOSE PLATE IS GONE (Rowen 8 returns
 * to the drawer; the checklist's close-plate items retired with it) and the
 * card is TYPE ALONE on the gradient — kicker, heading-xl, lede, flagship +
 * ghost, left on the rail, one column. The hero-mirror grammar survives in
 * the type; the imagery half of the mirror ended here.
 *
 * THE TYPEWRITER (same call: "the typewriter thing where it rubs out the
 * last word and rewrites it — trust, book from…"): the heading's LAST WORD
 * cycles through what a practice's patients do — trust, book from, come
 * back to, recommend — via <TypewriterWord>, the site's SECOND sanctioned
 * auto-motion (contracts on the component: SSR/no-JS/reduced-motion/SR all
 * get the static "trust"). THE ACCENT MOVED WITH IT, at her call: <em> sits
 * on "your" now, NOT the rotating word — the typewriter word stays roman so
 * the two devices never stack on one word.
 *
 * THE NO-JUMP CONTRACT (2026-08-08, client: as the words change "it cannot
 * grow in size… it feels jarring — is there any way we can make sure that
 * doesn't happen?"): the heading is a SIZER STACK. An invisible copy of the
 * full sentence set with the LONGEST word ("come back to", caret included)
 * sits in normal flow and owns the box; the visible animated copy renders
 * absolutely over it. A longer tail can only ever wrap further than a
 * shorter one, so the box is permanently sized for the maximum state and
 * the card cannot change height at ANY viewport — desktop and mobile both,
 * structurally, with no measuring JS. If the word list changes, THE SIZER
 * MUST CARRY WHICHEVER ENTRY IS LONGEST. text-balance left the heading in
 * the same change: balanced wrapping redistributes every line as the tail
 * types, which shuffled mid-sentence words between lines — the exact
 * jarring the sizer exists to kill.
 *
 * MORE ROOM ON DESKTOP (same day, client: "more room… the overline, the H1
 * and the subtitle"): the stack's md gaps stepped mt-12 → mt-16 (an
 * existing census value, per the freeze-breach rule) for the lede and the
 * button row. The kicker→H1 gap stays .from-overline on purpose — it is
 * the sitewide heading-group voice, and the close desyncing from every
 * masthead would read as a mistake.
 *
 * THE SPLIT RETURNED (same day again, client on the one-column cut: "looks
 * a bit left heavy — let's try subtitle and button right"): type-alone
 * lasted one round before the card's asymmetric grammar reasserted itself.
 * Kicker + heading hold the LEFT columns (1–7); the subtitle and button
 * row hold the RIGHT (9–12), feet locked to the heading's foot
 * (items-end) — the hero-split balance, in type only. The SIZER makes the
 * lock stable: the heading's box never changes while the word cycles, so
 * the right stack cannot bounce. Below md the card stacks in DOM order.
 *
 * Type is the ON-INK ladder (bone/bone-dim); the flagship is the dark-ground
 * pair (btn-primary-dark). The exit-fade left with the cream: this band
 * already ends every page on ink, so there is nothing to fade into.
 */
export default function ContactCTA({
  heading,
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
  exitFade = false,
  ground,
  actSelf = false,
}: ContactCTAProps) {
  return (
    <section className="relative overflow-hidden grain bg-ink"
      {...(ground ? { "data-ground": ground } : {})}
      {...(actSelf ? { "data-act-self": "" } : {})}
    >
      {/* Statement-moment spacing tier: py-32 md:py-44 — the studio moment
          and this close share it; standard sections sit on py-24 md:py-32. */}
      <div className="shell relative z-10 py-32 md:py-44">
        {/* THE CARD — the hero ground, held. relative + overflow-hidden +
            grain per the .grain contract; content rides z-10 above the glow.
            Radius in the /about tiles' clamp family. */}
        <div className="reveal relative overflow-hidden grain rounded-plate-lg bg-ink-canvas">
          {/* The card's own contained dose — 0.8 → 0.5 → 0.35 across the two
              2026-08-08 sitewide knock-backs. Deliberately NOT the ground
              constant: a card's gradient is its content, and at ground dose
              the close would be a flat dark plate. */}
          <HeroGlow intensity={0.35} />
          <div className="relative z-10 p-10 sm:p-14 md:p-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-7">
              <p className="overline reveal">Start a project</p>
              <h2
                className="heading-xl from-overline relative max-w-[24ch] text-bone reveal"
                style={{ transitionDelay: "80ms" }}
              >
                {heading ?? (
                  <>
                    {/* THE SIZER — invisible, owns the box, set with the
                        longest word so the heading can never grow. Keep its
                        text in lockstep with the visible copy below. */}
                    <span className="invisible" aria-hidden>
                      Let&rsquo;s build something <em>your</em> patients{" "}
                      <span className="whitespace-nowrap">
                        come back to
                        <span className="type-caret" />
                      </span>
                      .
                    </span>
                    <span className="absolute inset-0">
                      Let&rsquo;s build something <em>your</em> patients{" "}
                      <TypewriterWord
                        words={["trust", "book from", "come back to", "recommend"]}
                      />
                      .
                    </span>
                  </>
                )}
              </h2>
              </div>
              <div className="md:col-span-4 md:col-start-9">
              <p
                className="body-xl mt-10 max-w-[44ch] text-bone-dim reveal md:mt-0"
                style={{ transitionDelay: "160ms" }}
              >
                {body}
              </p>
              {/* The foot view's flagship + the tertiary ghost — the hero
                  pair, on the card's dark ground. */}
              <div
                className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 reveal md:mt-16"
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
            </div>
          </div>
        </div>
      </div>
      {/* Direct child of the section on purpose — <ExitFades> measures
          el.parentElement for its scope. */}
      {exitFade && <ExitFadeOverlay />}
    </section>
  );
}
