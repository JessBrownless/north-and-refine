import StatPair from "@/components/StatPair";
import type { WorkMetric } from "@/lib/work";

/**
 * THE RESULTS BAND — the outcomes of a case study as up to three big bone
 * numerals, ruled apart, on the raised ink wash between the hero and the
 * write-up. The one place on a case study where the argument is a number
 * rather than a sentence.
 *
 * ⚠ IT NEVER HOLDS A FIGURE OF ITS OWN. Every value and label arrives as
 * DATA from the case study's frontmatter, because the standing rule is no
 * numbers we can't defend (the 2026-07-10 receipts audit). A metric baked
 * into this file would be a claim about a real practice with nothing behind
 * it. It renders nothing at all when the list is empty, which is the correct
 * state for a study whose results are not yet measured or not yet approved
 * for publication.
 *
 * THREE IS THE CAP, not a coincidence: the row is `sm:grid-cols-3`, so a
 * fourth metric would wrap into a lonely second row and read as an
 * afterthought. Extra metrics are dropped rather than re-flowed; pick the
 * three that carry the study.
 *
 * The hairline dividers hang off the LEFT of each column and are suppressed
 * on the first, so the rules sit BETWEEN the figures and never fence the band.
 * Entrance steps at 80ms across the row, left to right, the reading order.
 *
 * The figures themselves are `<StatPair>` (2026-08-05): the numeral-and-caption
 * molecule this band shares with the Start-a-project promise bento. The
 * divider, the reveal and the stagger stay HERE, because they are properties
 * of the band rather than of a pair — a pair carrying its own hairline could
 * not be set into a glass tile.
 */
export default function ResultsBand({
  metrics,
  kicker = "The results",
}: {
  /** From the case study's frontmatter. Only the first three render. */
  metrics: readonly WorkMetric[];
  kicker?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <section className="border-y rule-dark bg-ink-raised/30">
      <div className="shell py-14 md:py-20">
        <p className="overline reveal">{kicker}</p>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {metrics.slice(0, 3).map((m, i) => (
            <StatPair
              key={i}
              className="reveal sm:border-l sm:border-ink-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
              delay={i * 80}
              value={m.value}
              caption={m.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
