import Link from "next/link";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import ManifestoStatement from "@/components/ManifestoStatement";

/**
 * THE MANIFESTO TRACK — the statement compartment WITH the scroll track it
 * needs. The statement holds on screen while the scroll-scrub lights its
 * words, then releases.
 *
 * ⚠ THE WRAPPER IS LOAD-BEARING, WHICH IS WHY IT LIVES HERE. The scrub in
 * `ManifestoStatement` measures the nearest section and reads a track TALLER
 * than the viewport as the sticky case: the section must be
 * `h-[140vh] pt-[10vh] pb-[5vh]` with a `sticky top-0 flex h-screen
 * items-center` child. That recipe was documented inside ManifestoStatement
 * but only ever shipped in the homepage's own markup, where any edit could
 * lose it; wrapper and statement are one component now so it can't be.
 * Change the heights and you change the scrub timing, not just the spacing.
 *
 * The track was tightened 180vh → 140vh (2026-07-11): the dwell made the
 * approach to What-we-do feel endless, and 40vh of scrub keeps the
 * word-lighting readable while roughly halving the toll.
 *
 * ⚠ NEVER give this section (or any ancestor) `overflow-hidden` — an
 * overflow-hidden ancestor becomes the sticky element's scroll container and
 * the pin silently stops working. A glow, if one is ever wanted here, goes in
 * its own absolutely-positioned clipping layer as a SIBLING of the sticky
 * child. This regressed the /services odometer twice on 2026-07-24.
 *
 * `text` is a PLAIN STRING: the compartment splits it per word, so the
 * statement carries no italic accent — the fill is the emphasis.
 *
 * /services runs the same compartment against its own inner
 * `data-manifesto-track` div (the belief shares a surface with the scroll
 * index there), so it imports `ManifestoStatement` directly rather than this.
 */
export default function ManifestoTrack({
  text,
  cta,
  exitFade = false,
}: {
  /** The statement itself. One thought: the homepage runs four lines. */
  text: string;
  /** The onward link under the statement, if the track carries one. */
  cta?: { href: string; label: string };
  /** Mounts the fade-to-ink handover (homepage only — it pairs with the
      ExitFades driver, and the scene hands over to the offer). */
  exitFade?: boolean;
}) {
  return (
    <section className="relative z-10 h-[140vh] pt-[10vh] pb-[5vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="shell w-full">
          <ManifestoStatement text={text} />
          {cta && (
            <div className="mt-12 reveal" style={{ transitionDelay: "160ms" }}>
              <Link href={cta.href} className="btn btn-secondary-dark">
                <span aria-hidden>↳</span>
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
      {exitFade && <ExitFadeOverlay />}
    </section>
  );
}
