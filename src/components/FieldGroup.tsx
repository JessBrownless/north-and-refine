import { errorTone, fieldBase, fieldBorder, type FormTone } from "@/lib/forms";

/**
 * FieldGroup (2026-08-05) — the atom of every form on this site, extracted
 * from the two that hand-rolled it.
 *
 * COMPOSES: an `.overline` label · an underline-only control (`fieldBase`) ·
 * a resting or error rule (`fieldBorder`) · an inline `.fineprint` error
 * (`errorTone`).
 *
 * THE RULE: no boxes, only the rule beneath, which is why inputs are one of
 * the few things on a rounded brand that still do not round. Validation is
 * DESIGNED, never native: both forms set `noValidate`, fields validate on blur
 * once touched, clear as they are corrected, and a failed submit focuses the
 * first invalid field. That behaviour stays with the forms; what lives here is
 * the anatomy and the tone resolution, so the two can never disagree about
 * what a field looks like.
 *
 * TONE IS A PROP, NEVER A FORK (the FaqSection precedent). On light the label
 * drops from clay to `ink-mute` (clay is sub-AA on bone) and INK carries the
 * focus rule, the resting rule and the error message, because CHAMPAGNE CANNOT
 * CARRY STATE ON BONE at 1.8:1. All three swaps are resolved by lib/forms.ts,
 * so this component holds one tint of its own: the label's.
 *
 * IT RENDERS NO WRAPPER, on purpose. The box a field sits in is the
 * consumer's layout: ContactForm gives each field a bare `div`, StartProjectForm
 * puts two in a grid and lets the last one sit straight in its step panel. A
 * wrapper here would either add a div where a step panel has none, or force a
 * className prop that every consumer has to think about. The molecule is the
 * three parts and the rules binding them; the column is not its business.
 *
 * ⚠ PROP ORDER IN THE JSX BELOW IS LOAD-BEARING. React serialises attributes
 * in prop order, so reordering these silently rewrites the HTML of every form
 * on the site. The order chosen is the one both consumers already rendered.
 * (`name` is exempt on an `input`: React hoists it to the end of the tag
 * itself. On a `textarea` it does not, which is why `name` sits second.)
 *
 * REPLACED: ContactForm.tsx, which spelled the label, input and error out
 * three times over; StartProjectForm.tsx, whose four fields went through local
 * `FieldLabel` and `FieldError` components.
 *
 * ⚠ FieldError IS HOISTED TO MODULE SCOPE and must stay there. It was written
 * out of StartProjectForm's render for a reason recorded in that file: a
 * component declared inside a render is a NEW TYPE on every keystroke, so
 * React unmounts and rebuilds whatever it wraps, and a rebuilt input loses its
 * caret. Living in this module gives it a stable identity for free. Never
 * inline it back into a form body.
 */

/* THE TWO LEGACY DIFFERENCES, kept as props with the current value as the
   default rather than normalised away. ContactForm's labels have never carried
   `block` (`.overline` sets no display, so its labels are inline boxes that
   stack only because the control below them is `w-full`), and its errors sit
   at `mt-2` against the stepped form's `mt-1.5`. Both are one-line fixes and
   neither is this pass's to make: markup and spacing sweep as their own
   revertable commits, and a value changed here would poison that revert. */
const DEFAULT_ERROR_GAP = "mt-1.5";

/** The label tint by ground. Clay is the on-ink meta tier; on bone it measures
    ~3.6:1, so a light form takes `ink-mute`, the AA on-light meta tint. */
function labelTone(tone: FormTone) {
  return tone === "light" ? "text-ink-mute" : "text-clay";
}

export function FieldError({
  id,
  message,
  tone = "dark",
  gap = DEFAULT_ERROR_GAP,
}: {
  id: string;
  /** Undefined renders nothing, so a caller can pass its error state raw. */
  message?: string;
  tone?: FormTone;
  gap?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className={`fineprint ${gap} ${errorTone(tone)}`}>
      {message}
    </p>
  );
}

export default function FieldGroup({
  id,
  name,
  label,
  tone = "dark",
  control = "input",
  type = "text",
  rows,
  required,
  maxLength,
  autoComplete,
  inputMode,
  spellCheck,
  placeholder,
  error,
  onBlur,
  onChange,
  blockLabel = true,
  errorGap = DEFAULT_ERROR_GAP,
}: {
  /** Also the stem of the error id, so `sp-name` describes `sp-name-error`. */
  id: string;
  name: string;
  label: React.ReactNode;
  tone?: FormTone;
  control?: "input" | "textarea";
  /** Input only. */
  type?: string;
  /** Textarea only. Rows are counted against the everything-visible rule, not
      chosen: the stepped form runs 3 because 4 overflowed a 900px viewport. */
  rows?: number;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "url" | "text" | "numeric" | "search";
  spellCheck?: boolean;
  placeholder?: string;
  /** The message itself. Its presence is what turns the rule and wires aria. */
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /** See DEFAULT_ERROR_GAP: a preserved difference, not a design choice. */
  blockLabel?: boolean;
  errorGap?: string;
}) {
  const errorId = `${id}-error`;
  /* One error state drives four things at once: the message, the field's own
     rule, aria-invalid and aria-describedby. Deriving all four from the single
     `error` prop is the point of the molecule; wiring them by hand is how a
     field ends up looking wrong but announcing right, or the reverse. */
  const describedBy = error ? errorId : undefined;
  const invalid = error ? true : undefined;
  const controlClass = `${fieldBase(tone)} ${fieldBorder(error, tone)}${
    /* A textarea never resizes: the drag handle is browser chrome in a system
       that draws its own, and on the stepped form a dragged corner would break
       the fixed-height well the no-jump contract depends on. */
    control === "textarea" ? " resize-none" : ""
  }`;

  return (
    <>
      <label
        htmlFor={id}
        className={`overline${blockLabel ? " block" : ""} ${labelTone(tone)}`}
      >
        {label}
      </label>
      {control === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          maxLength={maxLength}
          /* ⚠ WIRED 2026-08-09. `spellCheck` was declared in this component's
             props and applied to the INPUT branch only, so passing it to a
             textarea silently did nothing — the prop existed and lied. */
          spellCheck={spellCheck}
          /* ⚠ THIRD-PARTY WRITING OVERLAYS ARE TURNED OFF ON EVERY HOUSE
             FIELD (2026-08-09, client: "a spell checker thing appeared under
             my name… which turned the text black, which is not good"). That
             was Grammarly, whose extension injects its own absolutely
             positioned text layer over the real control to draw its
             underlines. That layer carries ITS OWN colour, so on our dark
             grounds the value rendered near-black on near-black and the field
             looked broken — a third party silently overriding the one thing
             the field must get right, which is that typed text is legible.

             `data-gramm` is Grammarly's documented opt-out; the other two are
             the older attribute names its earlier builds honour, kept because
             we cannot know which build a visitor is running. It is applied
             HERE, unconditionally, rather than per consumer: no form on this
             site wants a third-party layer repainting its values, and a prop
             would just be a way to forget it. */
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onBlur={onBlur}
          onChange={onChange}
          className={controlClass}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          spellCheck={spellCheck}
          /* ⚠ THIRD-PARTY WRITING OVERLAYS ARE TURNED OFF ON EVERY HOUSE
             FIELD (2026-08-09, client: "a spell checker thing appeared under
             my name… which turned the text black, which is not good"). That
             was Grammarly, whose extension injects its own absolutely
             positioned text layer over the real control to draw its
             underlines. That layer carries ITS OWN colour, so on our dark
             grounds the value rendered near-black on near-black and the field
             looked broken — a third party silently overriding the one thing
             the field must get right, which is that typed text is legible.

             `data-gramm` is Grammarly's documented opt-out; the other two are
             the older attribute names its earlier builds honour, kept because
             we cannot know which build a visitor is running. It is applied
             HERE, unconditionally, rather than per consumer: no form on this
             site wants a third-party layer repainting its values, and a prop
             would just be a way to forget it. */
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onBlur={onBlur}
          onChange={onChange}
          className={controlClass}
          placeholder={placeholder}
        />
      )}
      <FieldError id={errorId} message={error} tone={tone} gap={errorGap} />
    </>
  );
}
