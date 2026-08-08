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
 * LIGHT, 2026-08-09 (client: "What we do: Light BG" on the homepage): the
 * same bg-bone + grain-light + text-ink recipe as its now-light neighbours.
 * The kicker keeps clay on light rather than stepping down to text-ink-mute
 * — this IS the section's own kicker (the sanctioned clay-on-light
 * exception), unlike a card's running-meta caption.
 *
 * NO EXIT FADE (2026-08-09, client on the What-we-do rows: "fades to white
 * as you scroll — that needs to go"). The `exitFade` prop is DELETED rather
 * than left unpassed, following the precedent ManifestoTrack set when it
 * went bone: the fade-to-ink handover belongs to DARK sections dissolving
 * into one another, and a light band does not dissolve — it CUTS.
 *
 * ⚠ THE OVERLAY WAS A LEFTOVER FROM THIS BAND'S DARK ERA, not a new bug.
 * ExitFadeOverlay paints `bg-ink`, which was right while the band was ink —
 * it read as one dark section handing over to the next. The light flip
 * earlier the same day changed the ground and left the overlay behind, so a
 * bone band was being washed out by a dark sheet on the way past. The stale
 * claim that it "reads correctly regardless of the band's own ground" is
 * removed with it; that was true only while the ground was dark.
 *
 * TWO BANDS HAD IT, and only one was reported: the blog rail carried the
 * identical leftover from the identical flip. Kind words KEEPS its fade —
 * still an ink band, still dissolving into ink.
 */
export default function WhatWeDoBand({
  kicker = "What we do",
}: {
  kicker?: string;
}) {
  return (
    <section className="relative grain-light bg-bone py-24 text-ink md:py-32">
      <div className="shell">
        <p className="overline mb-8 reveal text-clay md:mb-10">{kicker}</p>
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ServicesShowcase tone="light" />
        </div>
      </div>
    </section>
  );
}
