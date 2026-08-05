import type { ReactNode } from "react";
import SectionGlow from "@/components/SectionGlow";

interface OfferBandProps {
  /** Kicker above the heading ("What it is", "How we help"). */
  kicker: string;
  /** Section heading — heading-lg, the signpost register. */
  heading: ReactNode;
  /** Optional paragraph. Placement follows `list` (see below); falsy copy
      renders nothing, which is how /industries/[slug] handles an intro whose
      first sentence was spent on the hero lede. */
  prose?: ReactNode;
  /** The ruled list itself — the strings are the rows. */
  items: readonly string[];
  /** THE RIGHT COLUMN'S REGISTER, and with it the split. Two shipped shapes:

      "points" (default) — full-sentence claims, wide: kicker, heading and
      prose share a 4-col rail, the list runs 8 columns as a divided stack
      with index numerals at body-lg. The prose is part of the rail's
      heading group, so it takes `.lede`.

      "deliverables" — short phrases, tighter: the rail is 5 columns and
      carries ONLY the heading group, the prose moves across to lead the
      list column at body-lg, and the items sit two-up under a single rule
      with dash marks at body-sm. Ten short phrases stacked one per line
      would run the band twice as long as it needs to be.

      One prop rather than a fork, per the FaqSection `tone` precedent: the
      register is one editorial decision, and everything it moves moves
      together. */
  list?: "points" | "deliverables";
  /** Paint the SectionGlow. TRUE only where this band is the section
      ADJOINING THE HERO, because then it owns the seam blend (the /services
      detail pages). /industries/[slug] sits below a bordered hero and takes
      the flat ink, so the glow is opt-in rather than default. */
  glow?: boolean;
  /** Roomier band: py-20/28 rather than py-16/24, with the grid gap opening
      to match. The /services detail pages run it, holding the extra air the
      belief band beneath their hero was built with. */
  spacious?: boolean;
}

/**
 * THE OFFER BAND — kicker and heading in the left rail, the offer ruled
 * alongside. The one band that answers "what do we actually do here", and it
 * shipped twice, identically: as the /services/[slug] "What it is" (intro +
 * deliverables) and the /industries/[slug] "How we help" (intro remainder +
 * points). Extracted 2026-08-05; the two were the same wrapper, the same
 * shell, the same 80/160ms reveal ladder and the same i*60ms list stagger,
 * differing only in the register of the right-hand column (see `list`).
 *
 * THE READING ORDER IS THE ENTRANCE: kicker, then heading at 80ms, then
 * prose at 160ms, then the list opening on its own 60ms ladder from zero.
 * The list restarts the count on purpose: it is a second block the eye
 * arrives at, not the tail of the first.
 *
 * Both grounds carry the grain — the one-material rule.
 */
export default function OfferBand({
  kicker,
  heading,
  prose,
  items,
  list = "points",
  glow = false,
  spacious = false,
}: OfferBandProps) {
  const deliverables = list === "deliverables";
  const pad = spacious ? "py-20 md:py-28" : "py-16 md:py-24";
  const gap = spacious ? "gap-10 md:gap-12" : "gap-8 md:gap-12";
  const rail = deliverables ? "md:col-span-5" : "md:col-span-4";

  return (
    <section className="relative overflow-hidden grain bg-ink">
      {glow && <SectionGlow blob="left" />}
      <div className={`shell relative z-10 ${pad}`}>
        <div className={`grid grid-cols-1 md:grid-cols-12 ${gap}`}>
          <div className={rail}>
            <p className="overline reveal">{kicker}</p>
            <h2
              className="heading-lg from-overline text-bone reveal"
              style={{ transitionDelay: "80ms" }}
            >
              {heading}
            </h2>
            {!deliverables && prose && (
              <p
                className="lede body text-bone-dim reveal"
                style={{ transitionDelay: "160ms" }}
              >
                {prose}
              </p>
            )}
          </div>

          {deliverables ? (
            <div className="md:col-span-6 md:col-start-7">
              {prose && (
                <p
                  className="body-lg text-bone-dim reveal"
                  style={{ transitionDelay: "160ms" }}
                >
                  {prose}
                </p>
              )}
              {/* Two-up under ONE rule: short phrases, so the dash marks and
                  the single top hairline do the ruling a divided stack would
                  otherwise over-draw. */}
              <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3.5 border-t rule-dark pt-7 sm:grid-cols-2">
                {items.map((item, i) => (
                  <li
                    key={item}
                    className="body-sm flex items-center gap-3 text-bone-dim reveal"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <span aria-hidden className="h-px w-4 shrink-0 bg-clay" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="md:col-span-8 divide-y rule-dark border-y rule-dark">
              {items.map((item, i) => (
                /* rule-dark on the row as well as the list: divide-y sets the
                   border WIDTH on the children, and the colour has to be set
                   where the border is or Preflight's default wins. */
                <li
                  key={item}
                  className="flex gap-5 py-5 reveal rule-dark"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="index-num text-clay shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="body-lg text-bone-dim">{item}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
