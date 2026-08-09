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
 * ⚠ ITS HOME MOVED 2026-08-09 (client: "What happens next? That's quite
 * nice, but that'll be better as a success message on the start-project
 * form, because on the contact page, if you think about it, they could be
 * getting in touch about anything"). That reasoning is worth keeping: a
 * numbered proposal sequence is a PROMISE ABOUT A PROJECT, and /contact
 * takes questions, introductions and press as readily as briefs, so the
 * steps were answering a question half its readers had not asked. On the
 * start-project success screen every reader has, by definition, just asked
 * it. Its only live consumer is now `StartProjectForm`'s sent state.
 *
 * TONE (2026-08-09) — the FaqSection precedent, added in the same move
 * because the success screen renders on the overlay's BONE column as well as
 * the dark fallback page. Defaults to "dark", so the change was inert
 * everywhere it already rendered.
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
  tone = "dark",
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
  /** Which ground it sits on. Light takes the on-LIGHT ladder: ink-mute for
      the kicker and the numerals (the AA meta tint; clay is sub-AA on bone)
      and ink-dim for the step body. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const meta = light ? "text-ink-mute" : "text-clay";
  const body = light ? "text-ink-dim" : "text-bone-dim";
  return (
    <div
      className={className ? `${className} reveal` : "reveal"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <p className={`overline ${meta}`}>{kicker}</p>
      <ol className="mt-7 space-y-6">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-5">
            <span className={`index-num ${meta}`}>0{i + 1}</span>
            <p className={`body ${body}`}>{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
