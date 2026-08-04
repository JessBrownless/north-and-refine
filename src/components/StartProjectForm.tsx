"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import {
  EMAIL_RE,
  errorTone,
  fieldBase,
  fieldBorder,
  postNetlifyForm,
  type FormTone,
} from "@/lib/forms";

/**
 * The Start-a-project form (2026-07-31; rebuilt 2026-08-01, STEPPED the same
 * day).
 *
 * THE THREE STEPS (client's call, on a Relume split-screen reference whose
 * form runs 1-2-3-4): the overlay's form column is now HALF the viewport, and
 * six fields plus a masthead do not fit a 720px column at 900px tall. The
 * reference solves that with steps, and steps suit the ask anyway — one
 * question at a time reads as a conversation, which is what an enquiry is.
 * THREE, not the reference's four: we have six fields, and a fourth step
 * would be a screen carrying one optional question.
 *
 *   1  About you        name, email, the practice
 *   2  Your requirements  the multi-select choice cards
 *   3  The project      the note, consent, send
 *
 * EVERY STEP STAYS MOUNTED, inactive ones behind the `hidden` attribute. The
 * form posts via FormData on the real <form>, so unmounting a step would drop
 * its values; `hidden` keeps them in the DOM, out of the tab order and out of
 * the a11y tree. It also means the submit handler can validate ALL fields at
 * the end, not just the last screen's.
 *
 * TONE (`tone="light"`) — the overlay's bone column, per the FaqSection
 * precedent: one component, two grounds, never a fork. The light tone is not
 * a straight swap: CHAMPAGNE CANNOT CARRY STATE ON BONE (1.8:1), so focus,
 * errors and the selected card all state in INK there. See lib/forms.ts.
 *
 * Netlify form `start-project`; field names must stay in sync with
 * public/__forms.html. Validation is the house pattern from lib/forms.ts:
 * noValidate + designed inline errors, validate on blur once touched, clear
 * as corrected, a failed Next or submit focuses the first invalid field.
 * NOTHING here starts at opacity 0 — the form is conversion-critical and must
 * never wait on an animation to become visible.
 */

/* Order is web → search → brand, per the sitewide rule (brand is never
   named first). Hints keep each card to one short line. */
const SERVICES = [
  { value: "Website design & build", label: "Website", hint: "Design and build" },
  { value: "Search & SEO", label: "Search", hint: "SEO and content" },
  { value: "Brand identity", label: "Brand", hint: "Identity and voice" },
  { value: "Not sure yet", label: "Not sure yet", hint: "Talk it through" },
] as const;

const UNSURE = "Not sure yet";

/* The step titles take `.form-title` (the UI register). Hints are OPTIONAL
   and nearly extinct (2026-08-01, two culls the same day: "So we know who
   we're speaking with" — "feels unnecessary" — then "Choose any that apply.
   Not sure yet is a real answer" went too). Only step 3's survives, because
   it changes behaviour: it sets the effort bar for the one free-text
   question. The multi-select affordance lives in the sr-only legend and in
   the checkbox shape itself. */
const STEPS: readonly { id: string; title: string; hint?: string }[] = [
  {
    id: "you",
    title: "About you",
  },
  {
    id: "needs",
    title: "Your requirements",
  },
  {
    id: "project",
    title: "The project",
    hint: "A sentence or two is plenty.",
  },
] as const;

const LAST = STEPS.length - 1;

type Field = "name" | "email" | "needs" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const ORDER: Field[] = ["name", "email", "needs", "message"];

/** Which step owns a field — a failed submit jumps back to it. */
const FIELD_STEP: Record<Field, number> = {
  name: 0,
  email: 0,
  needs: 1,
  message: 2,
};

/* One label above a control. `.overline` is the site's field-label treatment
   (see ContactForm); the tint comes from the caller's tone table, since clay
   is sub-AA on a light ground. Hoisted OUT of the form component on purpose:
   a component defined inside a render is a new type every keystroke, and
   React unmounts and rebuilds whatever it wraps. */
function FieldLabel({
  htmlFor,
  tint,
  children,
}: {
  htmlFor: string;
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={`overline block ${tint}`}>
      {children}
    </label>
  );
}

function FieldError({
  id,
  tint,
  message,
}: {
  id: string;
  tint: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className={`fineprint mt-1.5 ${tint}`}>
      {message}
    </p>
  );
}

function validateText(field: Exclude<Field, "needs">, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (value.length < 2) return "Please tell us your name.";
      return undefined;
    case "email":
      if (value.length === 0) return "Please add your email so we can reply.";
      if (!EMAIL_RE.test(value))
        return "That email doesn’t look complete. Check for a typo, e.g. name@example.com";
      return undefined;
    case "message":
      if (value.length < 10)
        return "A sentence or two about the practice is plenty.";
      return undefined;
  }
}

export default function StartProjectForm({
  /** The host supplies the heading: the overlay's masthead, or the fallback
      page's PageHero. Kept as a prop for any future host that wants a pair. */
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: FormTone;
}) {
  const light = tone === "light";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  /* MULTI-SELECT since 2026-08-01 (client: "the radio selects should be
     multiple select") — a practice usually wants two of the three. Posts as
     one comma-joined `needs` string, so the Netlify field is unchanged.
     "Not sure yet" is mutually exclusive with the three disciplines. */
  const [needs, setNeeds] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  /* Only move focus when the reader CHANGED step — not on the first paint,
     where stealing focus would yank them past the heading they're reading. */
  const movedRef = useRef(false);

  /* THE TONE TABLE. Every colour the form uses, resolved once. On light,
     champagne is demoted from STATE to ORNAMENT — a 1px champagne line or
     champagne text on bone is 1.8:1, invisible — so ink carries focus,
     errors and the selected card's RIM. But a champagne FILL under an ink
     tick survives anywhere (the tick on it measures ~7:1): the champagne
     tick-box is the house checkbox on BOTH grounds (2026-08-01, client:
     "filled states on checkboxes — anything we can take from DS?" — this is
     what the DS had to give), and the selected card's wash on light is
     champagne/10, the cream family (champagne mixed into bone, the same move
     as .scene-cream). See lib/forms.ts for the measurements. */
  const T = light
    ? {
        title: "text-ink",
        hint: "text-ink-dim",
        label: "text-ink-mute",
        fine: "text-ink-mute",
        body: "text-ink-dim",
        cardRest: "border-ink/25 hover:border-ink/50",
        cardOn: "border-ink bg-champagne/10",
        boxRest: "border-ink/35",
        boxOn: "border-champagne bg-champagne",
        tick: "text-ink",
        cardLabel: "text-ink",
        cardHint: "text-ink-mute",
        ring: "ring-ink",
        markNow: "border-ink bg-ink text-bone",
        markDone:
          "border-champagne bg-champagne text-ink hover:border-champagne-soft hover:bg-champagne-soft",
        markNext: "border-ink/25 text-ink-mute",
        line: "bg-ink/15",
        lineDone: "bg-ink",
        primary: "btn-primary-light",
        ghost: "text-ink",
      }
    : {
        title: "text-bone",
        hint: "text-bone-dim",
        label: "text-clay",
        fine: "text-bone-dim",
        body: "text-bone-dim",
        cardRest: "rule-dark hover:border-champagne/50",
        cardOn: "border-champagne bg-champagne/[0.07]",
        boxRest: "border-bone/45",
        boxOn: "border-champagne bg-champagne",
        tick: "text-ink",
        cardLabel: "text-bone",
        cardHint: "text-bone-dim",
        ring: "ring-champagne",
        markNow: "border-bone bg-bone text-ink",
        markDone:
          "border-champagne bg-champagne text-ink hover:border-champagne-soft hover:bg-champagne-soft",
        markNext: "border-bone/25 text-clay",
        line: "bg-bone/15",
        lineDone: "bg-bone",
        primary: "btn-primary-dark",
        ghost: "text-bone",
      };

  /* On a step change, put focus on the new panel's first control. Queried
     inside the ACTIVE panel only: `hidden` panels are display:none, and
     focus() on those is a silent no-op. */
  useEffect(() => {
    if (!movedRef.current) return;
    movedRef.current = false;
    const scope = `[data-step="${step}"]`;
    const el = formRef.current?.querySelector<HTMLElement>(
      `${scope} input:not([type="hidden"]), ${scope} textarea`,
    );
    el?.focus();
  }, [step]);

  function toggleNeed(value: string) {
    setNeeds((prev) => {
      let next: string[];
      if (prev.includes(value)) {
        next = prev.filter((v) => v !== value);
      } else if (value === UNSURE) {
        next = [UNSURE];
      } else {
        next = [...prev.filter((v) => v !== UNSURE), value];
      }
      if (next.length > 0) setFieldError("needs", undefined);
      return next;
    });
  }

  function setFieldError(field: Field, message: string | undefined) {
    setErrors((prev) => {
      if (prev[field] === message) return prev;
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function handleBlur(field: Exclude<Field, "needs">) {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value.trim() === "" && !errors[field]) return;
      setFieldError(field, validateText(field, e.target.value));
    };
  }

  function handleChange(field: Exclude<Field, "needs">) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (errors[field]) setFieldError(field, validateText(field, e.target.value));
    };
  }

  /** Validate one step's own fields. The practice is optional, so step 1
      passes on name + email alone. */
  function validateStep(index: number): Errors {
    const form = formRef.current;
    const data = form ? new FormData(form) : new FormData();
    const found: Errors = {};
    if (index === 0) {
      for (const field of ["name", "email"] as const) {
        const message = validateText(field, String(data.get(field) ?? ""));
        if (message) found[field] = message;
      }
    } else if (index === 1) {
      if (needs.length === 0) found.needs = "Pick at least one. Not sure yet counts.";
    } else {
      const message = validateText("message", String(data.get("message") ?? ""));
      if (message) found.message = message;
    }
    return found;
  }

  function focusField(field: Field) {
    const form = formRef.current;
    if (!form) return;
    const target = form.querySelector<HTMLElement>(
      field === "needs" ? 'input[name="needs"]' : `#sp-${field}`,
    );
    target?.focus();
  }

  function goTo(index: number) {
    movedRef.current = true;
    setStep(index);
  }

  function goNext() {
    const found = validateStep(step);
    setErrors(found);
    const firstInvalid = ORDER.find((f) => found[f]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }
    goTo(Math.min(step + 1, LAST));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /* ENTER SAFETY: a return key in any text field submits the form. On a
       step that isn't the last, that must mean "next", never "send". */
    if (step < LAST) {
      goNext();
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    for (const field of ["name", "email", "message"] as const) {
      const message = validateText(field, String(data.get(field) ?? ""));
      if (message) next[field] = message;
    }
    if (needs.length === 0) next.needs = "Pick at least one. Not sure yet counts.";
    setErrors(next);

    /* A field can only be corrected on its own step, so jump there first. */
    const firstInvalid = ORDER.find((f) => next[f]);
    if (firstInvalid) {
      const owner = FIELD_STEP[firstInvalid];
      if (owner !== step) {
        goTo(owner);
        /* The panel is display:none until the render lands; focus after it. */
        requestAnimationFrame(() => focusField(firstInvalid));
      } else {
        focusField(firstInvalid);
      }
      return;
    }

    // Honeypot — bots that fill the hidden field get a silent success.
    if (String(data.get("bot-field") ?? "") !== "") {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const ok = await postNetlifyForm({
      "form-name": "start-project",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      practice: String(data.get("practice") ?? ""),
      needs: needs.join(", "),
      message: String(data.get("message") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className={className}>
        <p className={`overline ${light ? T.label : ""}`}>Thank you</p>
        <h2 className={`heading-lg from-overline ${T.title}`}>Received.</h2>
        <p className={`body mt-5 max-w-[46ch] ${T.body}`}>
          We&rsquo;ll read it properly and reply within two working days. If
          we&rsquo;re not the right studio for it, we&rsquo;ll say so and
          suggest a better route.
        </p>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <Link href="/work" className={`btn-ghost ${T.ghost}`}>
            See the work <span aria-hidden>→</span>
          </Link>
          <a href={`mailto:${SITE.email}`} className={`btn-ghost ${T.ghost}`}>
            Email us directly <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <form
      ref={formRef}
      name="start-project"
      onSubmit={handleSubmit}
      noValidate
      className={className}
    >
      <input type="hidden" name="form-name" value="start-project" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* THE PROGRESS MARKS — numerals in circles on a hairline track.
          Three calls from 2026-08-01 shaped them, in order:
           · COMPACT ("the 1-2-3 progress bar feels weirdly stretched out") —
             fixed w-12 connectors, never flex-1 across the measure.
           · PROGRESS STAYS FILLED ("the step numbers don't stay filled in…
             we need to signify progress") — done marks hold a solid fill and
             swap the numeral for a tick.
           · AND THEN OFF THE TEMPLATE ("feels a bit not on brand… maybe it's
             too dark or something, just looks templately") — the templately
             thing was TWO IDENTICAL INK CHIPS: current and done in the same
             solid made the row read as generic wizard chrome. Now each state
             has its own voice, all three borrowed from elsewhere in the DS:
             DONE is the CHECKBOX language (champagne fill + ink tick — the
             exact banked-answer treatment the choice cards use, and the same
             sanctioned champagne-at-rest: form feedback); CURRENT is the one
             solid ink/bone chip, the single anchor; UPCOMING is a hairline
             ring. One dark chip per row, and the trail behind the reader is
             literally the colour of its ticked boxes. Done marks are buttons
             (go back, change an answer); hover steps champagne → soft, the
             house hover-fill move. */}
      <ol aria-label="Progress" className="flex items-center">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "now" : "next";
          const mark = `label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            state === "now" ? T.markNow : state === "done" ? T.markDone : T.markNext
          }`;
          return (
            <li key={s.id} className="flex items-center">
              {state === "done" ? (
                <button type="button" onClick={() => goTo(i)} className={mark}>
                  <span className="sr-only">
                    Step {i + 1} complete. Back to step {i + 1}
                  </span>
                  <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                    <path
                      d="M2 6.5 L5 9 L10 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
              {i < LAST && (
                <span
                  aria-hidden
                  className={`mx-2.5 h-px w-12 ${i < step ? T.lineDone : T.line}`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* The one announcement a screen reader needs when the panel swaps. */}
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {STEPS.length}: {current.title}
      </p>

      <h3 className={`form-title mt-6 ${T.title}`}>{current.title}</h3>

      {/* THE STEP WELL — a FIXED min-height across all three panels
          (2026-08-01, client: "there's a jump up when you move to step two.
          Make sure it never jumps"). The column is vertically centred, so
          when a shorter step swapped in, the whole block re-centred and the
          masthead lurched. min-h pins the well to the TALLEST step (step 2's card grid,
          measured 172px + its mt-7) so the
          masthead, the marks and the foot never move between steps.
          ⚠ Re-measure if a step gains a field — a well shorter than its
          tallest step brings the jump straight back. The HINT renders INSIDE
          the well for the same reason: only step 3 has one, and outside the
          well it re-grew the panel on the last step (measured +29px).
          `flow-root` is load-bearing: without it the active panel's mt-7
          COLLAPSES THROUGH the well's top edge on hint-less steps while the
          hint's smaller mt-2 collapses through on step 3 — a 20px height
          difference from margins the min-h never saw (measured, the hard
          way). flow-root contains them, so the well is the same box on
          every step. 204, not 200: step 2 renders a sub-pixel over 200 and
          the min-h must clear the tallest step with margin to spare. */}
      <div className="min-h-[204px] flow-root">
      {current.hint && (
        <p className={`body-sm mt-2 ${T.hint}`}>{current.hint}</p>
      )}

      {/* ── STEP 1 — About you ─────────────────────────────────────────── */}
      <div data-step="0" hidden={step !== 0} className="mt-7">
        {/* Name + email share the rail; the practice takes its own. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="sp-name" tint={T.label}>Your name</FieldLabel>
            <input
              id="sp-name"
              name="name"
              type="text"
              maxLength={100}
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "sp-name-error" : undefined}
              onBlur={handleBlur("name")}
              onChange={handleChange("name")}
              className={`${fieldBase(tone)} ${fieldBorder(errors.name, tone)}`}
              placeholder="Full name"
            />
            <FieldError id="sp-name-error" tint={errorTone(tone)} message={errors.name} />
          </div>
          <div>
            <FieldLabel htmlFor="sp-email" tint={T.label}>Your email</FieldLabel>
            <input
              id="sp-email"
              name="email"
              type="email"
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "sp-email-error" : undefined}
              onBlur={handleBlur("email")}
              onChange={handleChange("email")}
              className={`${fieldBase(tone)} ${fieldBorder(errors.email, tone)}`}
              placeholder="name@practice.com"
            />
            <FieldError id="sp-email-error" tint={errorTone(tone)} message={errors.email} />
          </div>
        </div>

        <div className="mt-6">
          <FieldLabel htmlFor="sp-practice" tint={T.label}>The practice</FieldLabel>
          <input
            id="sp-practice"
            name="practice"
            type="text"
            maxLength={160}
            autoComplete="organization"
            className={`${fieldBase(tone)} ${fieldBorder(undefined, tone)}`}
            placeholder="Practice name, or a web address (optional)"
          />
        </div>
      </div>

      {/* ── STEP 2 — Your requirements ─────────────────────────────────── */}
      <div data-step="1" hidden={step !== 1} className="mt-7">
        <fieldset>
          <legend className="sr-only">
            What do you need? Choose any that apply.
          </legend>
          <div
            role="group"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            aria-describedby={errors.needs ? "sp-needs-error" : undefined}
          >
            {SERVICES.map((s) => {
              const on = needs.includes(s.value);
              return (
                <label
                  key={s.value}
                  /* p-4/p-5 with a 16px gap (2026-08-01, client: "a bit more
                     padded, they seem a bit techy"). rounded-ui-sm: choice
                     cards are contained surfaces, and surfaces curve. */
                  className={`group relative flex cursor-pointer items-start gap-4 rounded-ui-sm border p-4 transition-colors sm:p-5 ${
                    on ? T.cardOn : T.cardRest
                  }`}
                >
                  <input
                    type="checkbox"
                    name="needs"
                    value={s.value}
                    checked={on}
                    onChange={() => toggleNeed(s.value)}
                    className="peer sr-only"
                  />
                  {/* 20px on a 6px radius with a 1.75 stroke — sized to the
                      type beside it rather than to a checklist widget. */}
                  <span
                    aria-hidden
                    className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                      on ? T.boxOn : T.boxRest
                    }`}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-2.5 w-2.5 ${T.tick} transition-opacity ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <path
                        d="M2 6.5 L5 9 L10 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className={`label block ${T.cardLabel}`}>{s.label}</span>
                    <span className={`fineprint mt-0.5 block ${T.cardHint}`}>
                      {s.hint}
                    </span>
                  </span>
                  {/* Keyboard focus ring on the CARD, driven by the sr-only
                      input's focus-visible state. */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-ui-sm ring-1 ${T.ring} opacity-0 peer-focus-visible:opacity-100`}
                  />
                </label>
              );
            })}
          </div>
          <FieldError id="sp-needs-error" tint={errorTone(tone)} message={errors.needs} />
        </fieldset>
      </div>

      {/* ── STEP 3 — The project ───────────────────────────────────────── */}
      <div data-step="2" hidden={step !== 2} className="mt-7">
        <FieldLabel htmlFor="sp-message" tint={T.label}>Where things stand</FieldLabel>
        {/* rows 3, not 4 — at 4 the last step ran 925px in a 900px viewport
            (measured 2026-08-01); the everything-visible rule outranks the
            extra line. */}
        <textarea
          id="sp-message"
          name="message"
          rows={3}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "sp-message-error" : undefined}
          onBlur={handleBlur("message")}
          onChange={handleChange("message")}
          className={`${fieldBase(tone)} ${fieldBorder(errors.message, tone)} resize-none`}
          placeholder="Where the practice is now, and what you'd like to change."
        />
        <FieldError id="sp-message-error" tint={errorTone(tone)} message={errors.message} />
      </div>

      {/* Closes THE STEP WELL. */}
      </div>

      {/* ── THE FOOT — Back on the left rail, the FORWARD action on the
          RIGHT (2026-08-01, client: "Next button should be right aligned").
          The reference's grammar: back is a retreat along the reading
          direction, forward sits where the eye is going. justify-between
          needs both ends, so an empty span holds the left on step 1.
          GONE FROM HERE the same day: the reply promise ("looks awful where
          it is" — it lives in the host's subtitle now, said once where the
          reader actually starts) and the marketing consent line ("kinda
          looks awful too - remove it") — removed from the POST and from
          public/__forms.html with it, so no consent is recorded and no
          marketing may be sent to these addresses. If marketing ever
          returns, checkbox and consent record come back together. */}
      {/* min-h pins the row: the arrow-chip send pill measures 1px shorter
          than the Next pill, and in a centred column even 1px re-centres. */}
      <div className="mt-7 flex min-h-[54px] flex-wrap items-center justify-between gap-x-7 gap-y-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className={`btn-ghost ${T.ghost}`}
          >
            <span aria-hidden>←</span> Back
          </button>
        ) : (
          <span aria-hidden />
        )}
        {step < LAST ? (
          <button type="button" onClick={goNext} className={`btn ${T.primary}`}>
            Next
          </button>
        ) : (
          <button
            type="submit"
            className={`btn ${T.primary} btn-arrow`}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send your details"}
            <span className="btn-arrow-chip" aria-hidden>↗</span>
          </button>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className={`fineprint mt-3 ${errorTone(tone)}`}>
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
