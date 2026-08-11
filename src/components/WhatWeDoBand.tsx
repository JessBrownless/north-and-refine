import CollectionHeader from "@/components/CollectionHeader";
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
 * LIGHT AGAIN 2026-08-09 (client: "can you make blog, kind words and what we
 * do on the homepage be light background by default"). Third ground call on
 * this band in one day — light, then dark with "make all sections dark by
 * default", now light again — which is precisely why the `tone` props were
 * KEPT through the dark revert rather than stripped: this flip is a one-word
 * change per consumer instead of a re-plumb of five molecules.
 *
 * ⚠ THE SELECTION IS NOT THE SAME AS LAST TIME. Selected work stays DARK now
 * (it did not before) and Kind words joins the light run (it never was), so
 * the page reads dark · dark · dark · LIGHT · LIGHT · LIGHT · dark: one light
 * act of three bands in the middle rather than alternating stripes. Do not
 * "restore" the earlier grouping from git — it was a different arrangement.
 *
 * The kicker takes clay rather than ink-mute: this IS the section's own
 * kicker (the sanctioned clay-on-light exception), not a card's running meta.
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
  title = "Web, search and brand, working as one.",
  ground,
  actSelf = false,
}: {
  /** THE ACT SYSTEM (2026-08-11). Declaring a ground opts this band into the
      act rule in globals.css: a run of adjacent same-ground bands is padded
      as ONE act — generous at the outer edges, one small dose at the
      invisible joins between. Omit it and the band keeps its own padding,
      which is what every non-homepage consumer does. */
  ground?: "ink" | "bone";
  /** "I declare my ground for ADJACENCY only; I pace myself." For bands whose
      air comes from something other than padding. */
  actSelf?: boolean;
  kicker?: string;
  /** The part-title (2026-08-11 section-head grammar). */
  title?: string;
}) {
  return (
    <section className="relative grain-light bg-bone py-24 text-ink md:py-32"
      {...(ground ? { "data-ground": ground } : {})}
      {...(actSelf ? { "data-act-self": "" } : {})}
    >
      <div className="shell">
        <CollectionHeader kicker={kicker} title={title} tone="light" />
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <ServicesShowcase tone="light" />
        </div>
      </div>
    </section>
  );
}
