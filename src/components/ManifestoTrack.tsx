import Link from "next/link";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import ManifestoStatement from "@/components/ManifestoStatement";
import SectionGlow from "@/components/SectionGlow";

/**
 * THE MANIFESTO BAND — the statement compartment in NORMAL FLOW, on the
 * hero-family glow.
 *
 * THE PIN IS GONE (2026-08-07, client: "I don't like how it blocks the screen
 * into place for a few scrolls — could it just have much bigger padding or
 * something so it feels more fluid?"). This was the site's LAST scroll pin:
 * /services removed its own on 2026-07-24 for the identical reason ("the
 * client felt friction here"), and the homepage's exemption — "its statement
 * is that page's centrepiece" — has now had the same verdict from the same
 * reader. The statement still fills word by word at your scroll pace
 * (ManifestoStatement is unchanged in kind; /services has run it unstuck for
 * a fortnight); the screen just never stops underneath you. The moment now
 * comes from AIR, not arrest: a min-h band with the statement centred, full
 * viewport height at md (70vh on phones, the PageHero mobile precedent —
 * a phone statement floating in 100vh of dead space reads abandoned).
 *
 * THE GROUND JOINED THE GLOW LANGUAGE IN THE SAME CHANGE (client: the
 * statement "fades in with just a plain black background… add some of the
 * blurred gradient fades so it relates to the hero"). This section was the
 * one big band still on unglowed flat ink — not by taste but by mechanism:
 * the glow recipe needs overflow-hidden, and OVERFLOW-HIDDEN KILLS STICKY,
 * so as long as the pin lived here the ground had to stay bare. Removing the
 * pin unlocked the canonical adjoining-section recipe, verbatim from
 * WorkIndexBand: relative + overflow-hidden + grain + bg-ink, SectionGlow
 * under z-10 content. The seam wash resumes from the hero's warmth on one
 * side of the boundary; the band's own blob sits LEFT, under the statement's
 * opening words.
 *
 * ⚠ data-manifesto-track ON THE INNER BLOCK IS LOAD-BEARING. The scrub
 * measures the nearest track element (falling back to the nearest section),
 * and its completion tuning assumes the track ≈ the statement block. Measure
 * this whole min-h section instead and the fill completes while the statement
 * is still entering at the fold — lit before it is ever read. The /services
 * belief proved this pattern; the homepage now follows it.
 *
 * ⚠ ExitFadeOverlay must stay a DIRECT child of the section — the ExitFades
 * driver measures el.parentElement (see that component's note).
 *
 * `text` is a PLAIN STRING: the compartment splits it per word, so the
 * statement carries no italic accent — the fill is the emphasis.
 */
export default function ManifestoTrack({
  text,
  cta,
  exitFade = false,
}: {
  /** The statement itself. One thought: the homepage runs four lines. */
  text: string;
  /** The onward link under the statement, if the band carries one. */
  cta?: { href: string; label: string };
  /** Mounts the fade-to-ink handover (homepage only — it pairs with the
      ExitFades driver, and the scene hands over to the offer). */
  exitFade?: boolean;
}) {
  return (
    <section className="relative z-10 overflow-hidden grain bg-ink">
      <SectionGlow blob="left" />
      <div className="relative z-10 flex min-h-[70vh] items-center md:min-h-[100vh]">
        <div data-manifesto-track className="shell w-full">
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
