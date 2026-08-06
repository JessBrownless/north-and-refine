import type { ReactNode } from "react";

/**
 * THE STUDIO NARRATIVE BAND — the /about "who we are" section, in the 1a
 * comp's grammar: the kicker alone in the left rail, the narrative alone in
 * the right measure, no statement heading. The comp carries the section on
 * PROSE, which is why there is no H2 here: the lede paragraph opens at
 * `.body-lg` on full bone and the rest steps down to `.body` on bone-dim, so
 * the band reads as one voice getting quieter rather than as a headed
 * section. Kicker is bone per canon (the client chose canon colours over the
 * comp's gold).
 *
 * The paragraphs reveal in sequence, 80ms apart, so the narrative arrives in
 * reading order rather than all at once.
 *
 * ⚠ IT CARRIES NO GROUND OF ITS OWN, ON PURPOSE (2026-07-24). Render it
 * inside <SharedCanvas>: the canvas owns base, glow, grain and the foot
 * fade, and this band adds only its own quiet blob, placed RIGHT because the
 * canvas glow leans left. Giving it a ground of its own is exactly what
 * failed here twice — the SectionGlow seam handoff left a visible line at the
 * join both times, and the client called it: fix it the way that WORKED, one
 * wrapper.
 *
 * WHAT LEFT: the ruled STATS ROW that used to close this band was cut
 * 2026-07-24 at the client's call ("remove the stats section, I don't like
 * it"), which also took the flagged "3 projects at a time" placeholder off
 * the pre-launch list. The narrative closes the band now. The ghost marquee
 * that closed it before that was cut 2026-07-12 late; the parked device is
 * back in the drawer.
 */
export default function StudioNarrativeBand({
  kicker,
  lede,
  paragraphs,
}: {
  kicker: string;
  /** The opening paragraph, which carries the band at `.body-lg` on bone. */
  lede: ReactNode;
  /** The rest of the narrative, stepped down to `.body` on bone-dim. */
  paragraphs: ReactNode[];
}) {
  return (
    <section className="relative">
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-14%",
          top: "20%",
          width: "46%",
          height: "60%",
          borderRadius: "50%",
          background: "var(--champagne)",
          opacity: 0.05,
          filter: "blur(150px)",
          pointerEvents: "none",
        }}
      />
      <div className="shell relative z-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <p className="overline reveal md:col-span-4">{kicker}</p>
          <div className="max-w-2xl space-y-6 md:col-span-7 md:col-start-6">
            <p className="body-lg text-bone reveal" style={{ transitionDelay: "80ms" }}>
              {lede}
            </p>
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="body text-bone-dim reveal"
                style={{ transitionDelay: `${(i + 2) * 80}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
