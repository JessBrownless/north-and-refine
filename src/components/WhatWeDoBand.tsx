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
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <p className="overline mb-8 reveal md:mb-10">{kicker}</p>
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ServicesShowcase />
        </div>
      </div>
      {exitFade && <ExitFadeOverlay />}
    </section>
  );
}
