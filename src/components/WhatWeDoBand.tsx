import ExitFadeOverlay from "@/components/ExitFadeOverlay";
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
 * exception), unlike a card's running-meta caption. `exitFade` still fades
 * to ink as the band scrolls out; that reads correctly regardless of the
 * band's own ground, since the destination it is announcing (Kind words,
 * staying dark) hasn't changed.
 */
export default function WhatWeDoBand({
  kicker = "What we do",
  exitFade = false,
}: {
  kicker?: string;
  /** Mounts the fade-to-ink handover (restored 2026-07-11: the live-era
      section handover the client loved). Homepage only. */
  exitFade?: boolean;
}) {
  return (
    <section className="relative grain-light bg-bone py-24 text-ink md:py-32">
      <div className="shell">
        <p className="overline mb-8 reveal text-clay md:mb-10">{kicker}</p>
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ServicesShowcase tone="light" />
        </div>
      </div>
      {exitFade && <ExitFadeOverlay />}
    </section>
  );
}
