/**
 * WHAT HAPPENS NEXT — a kicker over numbered steps at RAIL scale: index
 * numeral beside a line of body, the process grammar the site uses wherever
 * it explains a sequence. Born on /contact 2026-07-31, filling the lower half
 * of the facts column where the phone plate used to sit. Extracted 2026-08-05.
 *
 * The steps are DATA, not copy the component owns: /contact's three are the
 * promise its own FAQ makes ("What happens when we get in touch?"), and any
 * other page's sequence is its own.
 *
 * The heavier sibling is `MethodSection`'s band, where the numeral, a title
 * and a body split a full-rail grid over rule-light. This one is the rail
 * version: no rules, no titles, one line per step, because it sits in a
 * 5-column column beside a form rather than across the page.
 */
export default function NextStepsList({
  steps,
  kicker = "What happens next",
  className = "",
  delay = 0,
}: {
  /** One line per step. Numbering is the component's (01, 02, 03). */
  steps: readonly string[];
  /** Names the sequence. Defaults to /contact's. */
  kicker?: string;
  /** Outer spacing is the RAIL's business, not the list's: the block sits in
      a stack the page paces (mt-14 on /contact). */
  className?: string;
  /** Entrance step, ms. The rail's stagger continues through this block, so
      the page owns the number. */
  delay?: number;
}) {
  return (
    <div
      className={className ? `${className} reveal` : "reveal"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <p className="overline text-clay">{kicker}</p>
      <ol className="mt-7 space-y-6">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-5">
            <span className="index-num text-clay">0{i + 1}</span>
            <p className="body text-bone-dim">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
