"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { EMAIL_RE, FIELD_BASE, fieldBorder, postNetlifyForm } from "@/lib/forms";

/**
 * The Start-a-project form (2026-07-31; REBUILT 2026-08-01).
 *
 * WHY IT WAS REBUILT — the client, on the overlay: "isn't working. It seems
 * to be taller than the page… it needs to be easy to see all the fields on
 * load. Use beautiful UI elements… maybe even some stunning styled radio
 * buttons for what service do you need?" The first pass set the five
 * questions as full-width ruled LEDGER ROWS (the /services row grammar),
 * which measured 1217px of form inside a 900px viewport — 867px of it below
 * the fold, and unreachable, because Lenis swallows wheel events before a
 * nested scroller sees them (see SmoothScroll's modal handle).
 *
 * THE COMPACT GRID: the same questions, re-set as a two-column field grid
 * that fits one laptop viewport with air to spare (~640px tall). Name and
 * email share a row; the practice takes a row; the service question is a
 * 2×2 block of RADIO CARDS; the project note is a three-row textarea. The
 * heading and reassurance live on the overlay's plate, not in this column,
 * so the form pays no vertical rent for them.
 *
 * THE RADIO CARDS: real radio semantics (one `name="needs"` group, so arrow
 * keys move between options natively and the value posts as one string) with
 * an sr-only input and the card as the label. Resting = ink hairline;
 * hover = champagne rim at half strength; SELECTED = champagne rim + a 7%
 * champagne wash + the dot fills champagne. Straight corners per the print
 * rule (only the dot is round — a square radio reads as a checkbox), and
 * champagne only ever appears as rim/dot/wash: form feedback, never a label
 * colour or a fill. Focus rings ride `peer-focus-visible` on the card.
 * SINGLE-SELECT is the client's explicit ask ("radio buttons"); "Not sure
 * yet" carries the visitor who doesn't want to choose.
 *
 * Netlify form `start-project`; field names must stay in sync with
 * public/__forms.html. Validation is the house pattern from lib/forms.ts:
 * noValidate + designed inline champagne errors, validate on blur once
 * touched, clear as corrected, failed submit focuses the first invalid
 * field. NOTHING here starts at opacity 0 — the form is conversion-critical
 * and must never wait on an animation to become visible.
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

type Field = "name" | "email" | "needs" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const ORDER: Field[] = ["name", "email", "needs", "message"];

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

/* One label above a control. `.overline` in clay is the site's field-label
   treatment (see ContactForm); the row owns its own spacing so the grid
   stays predictable. */
function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="overline block text-clay">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="fineprint mt-1.5 text-champagne">
      {message}
    </p>
  );
}

/* SECTION TITLES (2026-08-01). First pass set these as tracked `.overline`
   kickers and the client rejected them — "they look like eyebrow text. I want
   actual titles that are from this website's design system." So they take
   `.heading-sm` (20→28px Saol), THE LADDER's item register: a real heading in
   the house serif, the same tier the process steps and card items use. The
   hairline beneath is the studio's section rule, not decoration around a
   kicker. `id` lets a control group be labelled by its own visible title. */
function SectionTitle({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 id={id} className="heading-sm text-bone">
        {children}
      </h3>
      <span aria-hidden className="mt-3 block h-px w-full bg-ink-line" />
    </div>
  );
}

export default function StartProjectForm({
  /** The overlay supplies its own heading, so the form omits one there; the
      /start-a-project fallback page does the same (its PageHero is the
      masthead). Kept as a prop for any future host that wants the pair. */
  className,
}: {
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  /* MULTI-SELECT since 2026-08-01 (client: "the radio selects should be
     multiple select") — a practice usually wants two of the three. Posts as
     one comma-joined `needs` string, so the Netlify field is unchanged.
     "Not sure yet" is mutually exclusive with the three disciplines: picking
     it clears them, and picking a discipline clears it. */
  const [needs, setNeeds] = useState<string[]>([]);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    for (const field of ["name", "email", "message"] as const) {
      const message = validateText(field, String(data.get(field) ?? ""));
      if (message) next[field] = message;
    }
    if (needs.length === 0) next.needs = "Pick at least one. Not sure yet counts.";
    setErrors(next);

    const firstInvalid = ORDER.find((f) => next[f]);
    if (firstInvalid) {
      const target = form.querySelector<HTMLElement>(
        firstInvalid === "needs" ? 'input[name="needs"]' : `#sp-${firstInvalid}`,
      );
      target?.focus();
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
      "marketing-opt-in": String(data.get("marketing-opt-in") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className={className}>
        <p className="overline">Thank you</p>
        <h2 className="heading-lg from-overline text-bone">Received.</h2>
        <p className="body mt-5 max-w-[46ch] text-bone-dim">
          We&rsquo;ll read it properly and reply within two working days. If
          we&rsquo;re not the right studio for it, we&rsquo;ll say so and
          suggest a better route.
        </p>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <Link href="/work" className="btn-ghost text-bone">
            See the work <span aria-hidden>→</span>
          </Link>
          <a href={`mailto:${SITE.email}`} className="btn-ghost text-bone">
            Email us directly <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
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

      <SectionTitle>About you</SectionTitle>

      {/* Row 1 — name + email share the rail. */}
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="sp-name">Your name</FieldLabel>
          <input
            id="sp-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "sp-name-error" : undefined}
            onBlur={handleBlur("name")}
            onChange={handleChange("name")}
            className={`${FIELD_BASE} ${fieldBorder(errors.name)}`}
            placeholder="Full name"
          />
          <FieldError id="sp-name-error" message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="sp-email">Your email</FieldLabel>
          <input
            id="sp-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "sp-email-error" : undefined}
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            className={`${FIELD_BASE} ${fieldBorder(errors.email)}`}
            placeholder="name@practice.com"
          />
          <FieldError id="sp-email-error" message={errors.email} />
        </div>
      </div>

      {/* Row 2 — the practice (optional). */}
      <div className="mt-6">
        <FieldLabel htmlFor="sp-practice">The practice</FieldLabel>
        <input
          id="sp-practice"
          name="practice"
          type="text"
          maxLength={160}
          autoComplete="organization"
          className={`${FIELD_BASE} rule-dark`}
          placeholder="Practice name, or a web address (optional)"
        />
      </div>

      {/* SECTION BREAK — mt-11 (2026-08-01, client: "there needs to be more
          room between the sections in the form"). */}
      <SectionTitle id="sp-req-title" className="mt-11">
        Your requirements
      </SectionTitle>

      {/* Row 3 — THE CHOICE CARDS. The visible "What do you need? (choose
          any)" legend is GONE (client: it "should be able to be deleted when
          there's a proper title in there") — the section title above is the
          label now, so the group is labelled by it, and the multi-select
          affordance survives for screen readers in the sr-only legend. */}
      <fieldset className="mt-6">
        <legend className="sr-only">
          What do you need? Choose any that apply.
        </legend>
        <div
          role="group"
          aria-labelledby="sp-req-title"
          className="grid grid-cols-2 gap-3"
          aria-describedby={errors.needs ? "sp-needs-error" : undefined}
        >
          {SERVICES.map((s) => {
            const on = needs.includes(s.value);
            return (
              <label
                key={s.value}
                /* rounded-ui-sm: choice cards are contained surfaces, and
                   surfaces curve (the 2026-08-01 rounded-brand pass). */
                className={`group relative flex cursor-pointer items-start gap-3 rounded-ui-sm border p-3 transition-colors ${
                  on
                    ? "border-champagne bg-champagne/[0.07]"
                    : "rule-dark hover:border-champagne/50"
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
                {/* SQUARE indicator with the champagne tick — multi-select, so
                    a checkbox is the honest control (a round dot promises
                    one-of). Straight corners, per the print rule; matches the
                    consent box below. */}
                <span
                  aria-hidden
                  className={`mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                    on ? "border-champagne bg-champagne" : "border-bone/45"
                  }`}
                >
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-2.5 w-2.5 text-ink transition-opacity ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <path
                      d="M2 6.5 L5 9 L10 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="label block text-bone">{s.label}</span>
                  <span className="fineprint mt-0.5 block text-bone-dim">{s.hint}</span>
                </span>
                {/* Keyboard focus ring on the CARD, driven by the sr-only
                    input's focus-visible state. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-ui-sm ring-1 ring-champagne opacity-0 peer-focus-visible:opacity-100"
                />
              </label>
            );
          })}
        </div>
        <FieldError id="sp-needs-error" message={errors.needs} />
      </fieldset>

      {/* Row 4 — the project note. */}
      <div className="mt-6">
        <FieldLabel htmlFor="sp-message">The project</FieldLabel>
        {/* rows 2 → 4 (2026-08-01, client: "the text area for where the
            practice is now feels too slim") — the one question that invites a
            paragraph should look like it expects one. */}
        <textarea
          id="sp-message"
          name="message"
          rows={3}
          required
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "sp-message-error" : undefined}
          onBlur={handleBlur("message")}
          onChange={handleChange("message")}
          className={`${FIELD_BASE} ${fieldBorder(errors.message)} resize-none`}
          placeholder="Where the practice is now, and what you'd like to change."
        />
        <FieldError id="sp-message-error" message={errors.message} />
      </div>

      {/* THE FOOT — the flagship first, then consent BENEATH it (2026-08-01,
          client: the consent tick "basically isn't visible and I think it
          should be under the CTA"). The box also gained a visible rim
          (bone/45 rather than the ink hairline, which vanished on the panel)
          and a touch more size. */}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
        <button
          type="submit"
          className="btn btn-primary-dark btn-arrow"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send your details"}
          <span className="btn-arrow-chip" aria-hidden>↗</span>
        </button>
        <p className="fineprint text-bone-dim">We reply within two working days.</p>
      </div>

      <label className="mt-3 flex w-fit cursor-pointer items-center gap-3">
        <span className="relative inline-flex h-[18px] w-[18px] shrink-0">
          <input
            type="checkbox"
            name="marketing-opt-in"
            value="yes"
            className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-bone/45 bg-transparent transition-colors checked:border-champagne checked:bg-champagne"
          />
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-ink opacity-0 transition-opacity peer-checked:opacity-100"
          >
            <path
              d="M2 6.5 L5 9 L10 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="fineprint text-bone-dim">
          Send me the occasional note on web &amp; search for clinics.
        </span>
      </label>
      {status === "error" && (
        <p role="alert" className="fineprint mt-3 text-champagne">
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
