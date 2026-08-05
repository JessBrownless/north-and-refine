import type { FormTone } from "@/lib/forms";
import { TickPath } from "./TickBox";

/**
 * ProgressMarks (2026-08-05) — the stepped form's indicator, extracted from
 * StartProjectForm, its only consumer.
 *
 * COMPOSES: an `ol` labelled Progress · `h-8 w-8` circular `.label` chips ·
 * fixed `w-12` hairline connectors · three states.
 *
 * THE RULE: each state has its own voice, and all three are borrowed from
 * elsewhere in the system rather than invented here. Three calls from
 * 2026-08-01 shaped it, in order:
 *
 *  · COMPACT ("the 1-2-3 progress bar feels weirdly stretched out"): fixed
 *    w-12 connectors, never flex-1, or the row stretches across the measure.
 *  · PROGRESS STAYS FILLED ("the step numbers don't stay filled in… we need to
 *    signify progress"): done marks hold a solid fill and swap the numeral for
 *    a tick.
 *  · AND THEN OFF THE TEMPLATE ("feels a bit not on brand… maybe it's too dark
 *    or something, just looks templately"). The templately thing was TWO
 *    IDENTICAL INK CHIPS: current and done in the same solid made the row read
 *    as generic wizard chrome. So DONE is the CHECKBOX language (champagne
 *    fill, ink tick: the exact banked-answer treatment TickBox uses, and the
 *    same sanctioned champagne-at-rest, form feedback); CURRENT is the one
 *    solid ink or bone chip, the row's single anchor; UPCOMING is a hairline
 *    ring. One dark chip per row, and the trail behind the reader is literally
 *    the colour of its ticked boxes.
 *
 * Done marks are BUTTONS (go back, change an answer) and hover champagne to
 * champagne-soft, the house hover-fill move; current and upcoming marks are
 * spans, because there is nothing to go back to. The tick is `TickPath`, the
 * same geometry the choice cards carry, which is what makes the borrowing
 * literal instead of a resemblance.
 *
 * ⚠ THE NO-JUMP CONTRACT lives in the consumer, not here, but this row is
 * inside it: the stepped form's column is vertically centred, so any height
 * change re-centres the whole panel. This component renders the same box in
 * all three states by construction (the chips are fixed h-8, the connectors
 * fixed w-12, and a done mark swaps a numeral for a tick of the same chip
 * size), and it must keep doing so. A state that grows the row moves the
 * masthead above it.
 *
 * REPLACED: StartProjectForm.tsx's inline `ol`, and the five tone-table
 * entries that served only it.
 */

/* The five tints this row owns, lifted out of the form's tone table. `done` is
   constant across grounds for the reason recorded in TickBox: a champagne fill
   under an ink glyph is the one state the accent can carry on bone. */
const TONES = {
  light: {
    now: "border-ink bg-ink text-bone",
    done: "border-champagne bg-champagne text-ink hover:border-champagne-soft hover:bg-champagne-soft",
    next: "border-ink/25 text-ink-mute",
    line: "bg-ink/15",
    lineDone: "bg-ink",
  },
  dark: {
    now: "border-bone bg-bone text-ink",
    done: "border-champagne bg-champagne text-ink hover:border-champagne-soft hover:bg-champagne-soft",
    next: "border-bone/25 text-clay",
    line: "bg-bone/15",
    lineDone: "bg-bone",
  },
} as const;

export default function ProgressMarks({
  steps,
  current,
  onGoTo,
  tone = "dark",
}: {
  /** One mark per step. Only the key is read, so a caller can pass its own
      step objects straight in and keep the titles where they belong. */
  steps: readonly { id: string }[];
  current: number;
  /** Done marks call this to jump back. */
  onGoTo: (index: number) => void;
  tone?: FormTone;
}) {
  const t = TONES[tone === "light" ? "light" : "dark"];
  const last = steps.length - 1;

  return (
    <ol aria-label="Progress" className="flex items-center">
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "now" : "next";
        const mark = `label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
          state === "now" ? t.now : state === "done" ? t.done : t.next
        }`;
        return (
          <li key={s.id} className="flex items-center">
            {state === "done" ? (
              <button type="button" onClick={() => onGoTo(i)} className={mark}>
                <span className="sr-only">
                  Step {i + 1} complete. Back to step {i + 1}
                </span>
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                  <TickPath />
                </svg>
              </button>
            ) : (
              <span
                className={mark}
                aria-current={state === "now" ? "step" : undefined}
              >
                <span className="sr-only">
                  {state === "now" ? "Current step: " : "Step "}
                </span>
                {i + 1}
              </span>
            )}
            {i < last && (
              <span
                aria-hidden
                className={`mx-2.5 h-px w-12 ${i < current ? t.lineDone : t.line}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
