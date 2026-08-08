/**
 * MORE WORK, IN PROGRESS — the honest gap at the end of the portfolio
 * (2026-08-09, client: "realistically I'm only going to have two portfolio
 * pieces… can you remove the other two and just put more coming soon").
 *
 * ⚠ IT IS DELIBERATELY NOT A CARD, and that is the whole design decision.
 * The obvious build — a `.frame`, a `portrait-fill` placeholder image, a
 * caption row shaped like a real one — was considered and rejected: on a
 * studio's own portfolio, anything wearing the exact costume of a case study
 * reads as a case study, and the two on this site are REAL client work. A
 * slot that mimics them invites the eye to count three pieces where there
 * are two. So there is no frame fill, no fake capture, no invented client
 * name, no "View case study" affordance, and nothing here links anywhere.
 *
 * What it is instead: an empty plot with a dashed edge, holding one line in
 * the studio's own restrained voice. The dashed border is the one visual
 * signal in the system that means "space reserved, nothing here yet" — a
 * solid `.frame` would be a plate, and a plate implies content.
 *
 * TWO SHAPES, one per surface, because the two portfolio surfaces are
 * genuinely different compositions rather than one component at two sizes:
 *   · `plate` matches SelectedWorkBand's 16:10 pair grid on the homepage —
 *     it occupies one cell of that grid and nothing more.
 *   · `row` matches /work's full-width WorkCard rhythm, where a 16:10 cell
 *     alone would read as a lost thumbnail rather than the end of a list.
 *
 * `tone` follows the same vocabulary as every other tonal component here
 * (WorkPlate, WorkCard, MetaRow): the homepage's Selected work band is bone
 * since 2026-08-09, /work's index is still ink, so this has to speak both.
 * Bone grounds take the on-light ladder; the dashed rule takes the ground's
 * own hairline token rather than a hand-mixed opacity.
 */
export default function WorkComingSoon({
  shape = "plate",
  tone = "dark",
  label = "More work, in progress",
}: {
  /** `plate` = one 16:10 cell (homepage pair grid). `row` = the full-width
      slot that closes /work's stacked editorial index. */
  shape?: "plate" | "row";
  tone?: "dark" | "light";
  /** The line itself. Kept a prop so the copy is the consumer's, per the
      band-owns-its-own-copy precedent — but it should stay a plain
      statement of fact, never a claim about work that doesn't exist yet. */
  label?: string;
}) {
  const light = tone === "light";
  // The ground's own hairline token, dashed. Not a hand-mixed opacity: the
  // rule tokens already encode what a divider weighs on each ground.
  const edge = light ? "rule-light" : "rule-dark";
  const text = light ? "text-ink-mute" : "text-clay";

  return (
    <div
      className={`reveal flex items-center justify-center rounded-plate border border-dashed ${edge} ${
        shape === "plate" ? "aspect-[16/10]" : "min-h-[220px] md:min-h-[280px]"
      }`}
    >
      <p className={`overline ${text}`}>{label}</p>
    </div>
  );
}
