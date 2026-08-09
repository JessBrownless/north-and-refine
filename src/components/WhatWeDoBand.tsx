import ServicesShowcase from "@/components/ServicesShowcase";

/**
 * WHAT WE DO — the band that carries the ruled service rows on the homepage.
 * It sits BETWEEN the studio's statement and the work (2026-07-09) because
 * both neighbours are asymmetric (the offset statement, the staggered work
 * pairs) and the full-width ruled rows are the page's most formal element: the
 * stabiliser between two deliberately jagged sections.
 *
 * A kicker and a band, nothing else — the rows themselves are
 * `ServicesShowcase`, which owns the order that is the sell (web first, search
 * second, brand third) and the `.display` register they speak in.
 *
 * DARK AGAIN 2026-08-09 (client: "make all sections on the homepage dark
 * background by default"), reverting the light flip made earlier the same
 * day. No ground class of its own — it inherits main's bg-ink, the pre-flip
 * state — so the kicker returns to bone by default and ServicesShowcase to
 * its on-ink rows.
 *
 * NO EXIT FADE (2026-08-09, client on the What-we-do rows: "fades to white
 * as you scroll — that needs to go"). The `exitFade` prop is DELETED rather
 * than left unpassed, following ManifestoTrack's precedent for retiring a
 * prop whose last consumer has gone.
 *
 * ⚠ THE REASON IS THE CLIENT'S INSTRUCTION, NOT THE GROUND — and that
 * distinction matters now, because the ground has since changed back. The
 * fade was REPORTED while this band was bone, where an ink overlay washed a
 * light band out on the way past; the band returned to ink hours later, so
 * "a light band cuts rather than dissolves" no longer describes anything
 * here. What stands is simply that she asked for the fade gone. Do not
 * reinstate it on the grounds that the band is dark again; that would be
 * reading the old rationale back as permission.
 *
 * TWO BANDS HAD IT, and only one was reported: the blog rail carried the
 * identical overlay and lost it in the same change. Kind words KEEPS its
 * fade — it was never part of the complaint.
 */
export default function WhatWeDoBand({
  kicker = "What we do",
}: {
  kicker?: string;
}) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <p className="overline mb-8 reveal md:mb-10">{kicker}</p>
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ServicesShowcase />
        </div>
      </div>
    </section>
  );
}
