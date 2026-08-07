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
 * THE AIR: min-h 80vh at md (56vh on phones), statement centred in the band.
 * The number has fallen twice as the band's ARCHITECTURE changed, which is
 * the useful record here: 160vh when it was an edgeless DARK field and only
 * sheer distance could suggest an edge; 120vh once the bone act gave it two
 * designed colour cuts and the air no longer had to do that work; 80vh when
 * the client read the result as simply "too tall" (2026-08-08). At 120 the
 * statement held 40% of its own band and sat in ~300px of air per side; at
 * 80 it holds ~60%, which is a slab with margin rather than a statement
 * adrift in one. THE LESSON, since this is the third setting: air is
 * relative to what BOUNDS it, so re-judge this number whenever the band's
 * edges change, and never carry a value across an architecture change.
 * Still MIN-H + CENTRING, deliberately not py-*: padding utilities are
 * frozen until the spacing sweep lands. The scrub is immune to the number:
 * the track is the inner statement block, not the band.
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
    /* THE SHEET EDGE (2026-08-08, client — straight after reverting the
       card-homepage trial: "can we try 'A studio that treats' with rounded
       corners just at the top? I've seen websites do that before and it
       looks nice"). The bone act's TOP corners take the big-card radius, so
       the band reads as a light sheet rising over the dark hero — the ink
       shows through the two corner notches, which is what sells it. The
       radius is the PLATE-LG token, not a raw value (drift pattern 10), and
       ONLY the top curves: the bottom cut into Selected work stays a hard
       straight edge on purpose — one curved lift, one clean cut, so the
       device reads as an entrance, not a pill. The card trial died the same
       hour this was born; this is the one survivor of it the client kept. */
    <section className="relative z-10 overflow-hidden rounded-t-plate-lg grain-light bg-bone text-ink">
      <div className="relative z-10 flex min-h-[56vh] items-center md:min-h-[80vh]">
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
