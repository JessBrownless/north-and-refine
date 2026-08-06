import Link from "next/link";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import ManifestoStatement from "@/components/ManifestoStatement";

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
 * comes from AIR, not arrest: a min-h band with the statement centred.
 *
 * THE AIR WAS RAISED A LOT the same day (2026-08-07, client on the first
 * unpinned cut: "increase the padding on top and bottom a lot, so you feel
 * like you're scrolling quite a bit"): 100vh → 160vh at md, so the statement
 * sits in ~55vh of pure ground on EACH side — the hero ends, you travel,
 * the belief arrives, you travel, the work begins. Phones take 90vh (the
 * PageHero mobile precedent scaled to the same intent: proportionally
 * generous, never a statement abandoned in a dead screen). ⚠ The air lives
 * on MIN-H + CENTRING, deliberately not py-*: padding utilities are frozen
 * until the spacing sweep lands, and a min-h band says what it means — the
 * band has a minimum size, the statement floats at its centre. The scrub is
 * immune to this number: the track is the inner statement block, not the
 * band (see below), so air changes the journey, never the fill timing.
 *
 * GROUNDLESS SINCE LATER THE SAME DAY (2026-08-07). The first glowed cut
 * gave this section its OWN ground — the WorkIndexBand recipe plus a
 * SectionGlow resuming from a seam strip added to the hero — and the client
 * reported a visible line at the join, which is the documented failure mode
 * of colour-matched boundaries (it sank /about twice in July). Per the
 * shared-canvas rule, the fix removes the seam rather than tuning it: the
 * page wraps the hero and this band in ONE <SharedCanvas> owning base, glow,
 * grain and the foot fade, and this section paints NOTHING behind its
 * content. Two consequences worth knowing: the statement now sits on the
 * hero's own light (one glow spanning both, which is what "relates to the
 * hero" turned out to mean), and the hero's freed device mock-ups trail into
 * this band's top air — the section must never regain a background or an
 * overflow clip, or it would paint over / amputate them again.
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
    <section className="relative z-10">
      <div className="relative z-10 flex min-h-[90vh] items-center md:min-h-[160vh]">
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
