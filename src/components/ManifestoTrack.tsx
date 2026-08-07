import Link from "next/link";
import ManifestoStatement from "@/components/ManifestoStatement";

/**
 * THE MANIFESTO BAND — THE HOMEPAGE'S BONE ACT (2026-08-07, the layout pass).
 *
 * The band went LIGHT at the client's own suggestion, closing two of her
 * critique points with one move. The dark version's 160vh of air had no
 * edges — same-colour ground stretching until it happened to stop, which
 * read as "forgot to put something here" rather than margin — and the
 * hero's devices had always cut off into that same-colour field awkwardly
 * ("they felt weird cutting off with such a big airy next section of the
 * same colour"). A COLOUR CUT is an absolute edge: the hero's canvas
 * resolves to ink at its foot, then ink meets bone, and at the band's other
 * end bone meets Selected work's ink. Inside a BOUNDED band the air reads
 * as generous margin. This is /about's shipped architecture (canvas → foot
 * fade → designed cut), and the light-act register is the strongest change
 * the system has — on this site's dark ground, a bone band is a turned page.
 *
 * THE PIN IS GONE (2026-08-07 morning, client: it "blocks the screen into
 * place… much bigger padding or something so it feels more fluid") — the
 * site's last scroll pin, ending on the same verdict that unpinned /services
 * on 2026-07-24. The statement fills word by word at the reader's scroll
 * pace, in normal flow; on bone the words develop from dim ink to full ink,
 * which reads as letterpress coming up rather than the old bone-on-dark
 * lighting. Statement stays FLUSH LEFT on the rail (client's call — the
 * /services belief precedent; the hero above remains the page's one centred
 * moment) and stays at .display (client: "it's okay" to the two-display
 * critique point).
 *
 * THE AIR: min-h 120vh at md (70vh on phones), statement centred in the
 * band. Down from the dark era's 160vh — a bounded bone slab reads generous
 * at 120 where the edgeless field needed 160 to feel like anything. Still
 * MIN-H + CENTRING, deliberately not py-*: padding utilities are frozen
 * until the spacing sweep lands. The scrub is immune to the number: the
 * track is the inner statement block, not the band.
 *
 * NO EXIT FADE, and the old `exitFade` prop is DELETED rather than parked:
 * the fade-to-ink handover belongs to dark sections dissolving into each
 * other, and a bone band does not dissolve — it CUTS. (Its one consumer was
 * this band's dark era; the overlay component lives on under the dark bands
 * below.) `grain-light` is the paper tooth, multiply-blended per the one-
 * material rule; the section needs relative + overflow-hidden for it, which
 * is safe — nothing inside pins.
 *
 * ⚠ data-manifesto-track ON THE INNER BLOCK IS LOAD-BEARING. The scrub
 * measures the nearest track element, and its completion tuning assumes the
 * track ≈ the statement block. Measure the tall air band instead and the
 * fill completes while the words are still at the fold.
 *
 * `text` is a PLAIN STRING: the compartment splits it per word, so the
 * statement carries no italic accent — the fill is the emphasis.
 */
export default function ManifestoTrack({
  text,
  cta,
}: {
  /** The statement itself. One thought: the homepage runs four lines. */
  text: string;
  /** The onward link under the statement, if the band carries one. */
  cta?: { href: string; label: string };
}) {
  return (
    <section className="relative z-10 overflow-hidden grain-light bg-bone text-ink">
      <div className="relative z-10 flex min-h-[70vh] items-center md:min-h-[120vh]">
        <div data-manifesto-track className="shell w-full">
          <ManifestoStatement text={text} />
          {cta && (
            <div className="mt-12 reveal" style={{ transitionDelay: "160ms" }}>
              {/* The on-LIGHT secondary — .btn-secondary-light's SECOND live
                  consumer (it had one, FaqSection's cream band, and was a
                  fold-or-earn backlog item on exactly those grounds). The
                  pill itself is unchanged by the band's re-grounding: the
                  client's "okay for now" on the stranded-object critique. */}
              <Link href={cta.href} className="btn btn-secondary-light">
                <span aria-hidden>↳</span>
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
