"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { EMAIL_RE, postNetlifyForm } from "@/lib/forms";
import FieldGroup from "@/components/FieldGroup";
import { TickPath } from "@/components/TickBox";

/**
 * The /contact enquiry form, wired for Netlify Forms via the Next.js runtime
 * v5 pattern: build-time detection reads the static definition in
 * public/__forms.html, and this component POSTs url-encoded data to that
 * path. Field names must stay in sync with that file.
 *
 * LEAN SINCE 2026-07-31 (the contact/start split): /contact says CONTACT —
 * name, email, message. The what-do-you-need questions (practice, interests)
 * moved to the full-page form at /start-a-project (StartProjectForm), so the
 * old `practice` + `interest` fields and the full/minimal variant left with
 * them; the coming-soon page renders this same lean form.
 *
 * VALIDATION IS DESIGNED, NOT NATIVE (same pass): `noValidate` on the form,
 * inline champagne errors under each field (see lib/forms.ts). Fields
 * validate on blur once touched, clear as they're corrected, and a failed
 * submit focuses the first invalid field.
 *
 * FIELDS GO THROUGH `FieldGroup` SINCE 2026-08-05. The label, the underlined
 * control and the inline error were spelled out three times in this file and
 * a fourth to sixth time in StartProjectForm; they are one molecule now. Two
 * props here carry differences this file had and the stepped form did not, so
 * that the extraction moved no pixel: `blockLabel={false}` (these labels have
 * never carried `block`) and `errorGap="mt-2"` (the stepped form sits at
 * mt-1.5). Both are candidates for the spacing sweep, which reverts as one
 * commit and must not be pre-empted here.
 */

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

function validate(field: Field, raw: string): string | undefined {
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
      if (value.trim().length < 10)
        return "Tell us a little more; a sentence or two is plenty.";
      return undefined;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  function setFieldError(field: Field, message: string | undefined) {
    setErrors((prev) => {
      if (prev[field] === message) return prev;
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function handleBlur(field: Field) {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Don't scold an untouched empty field on a stray tab-through.
      if (e.target.value.trim() === "" && !errors[field]) return;
      setFieldError(field, validate(field, e.target.value));
    };
  }

  function handleChange(field: Field) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Only re-validate live once the field is already in error, so the
      // message clears the moment it's fixed but never nags mid-typing.
      if (errors[field]) setFieldError(field, validate(field, e.target.value));
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    for (const field of ["name", "email", "message"] as const) {
      const message = validate(field, String(data.get(field) ?? ""));
      if (message) next[field] = message;
    }
    setErrors(next);
    const firstInvalid = (["name", "email", "message"] as const).find(
      (f) => next[f],
    );
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    // Honeypot: bots that fill the hidden field get a silent "success" and
    // nothing is sent. (No submit-speed heuristic — browser autofill lets
    // real visitors submit fast, and a silently dropped enquiry costs more
    // than a spam email. Netlify's Akismet filter covers the rest.)
    if (String(data.get("bot-field") ?? "") !== "") {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const ok = await postNetlifyForm({
      "form-name": "project-enquiry",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      "marketing-opt-in": String(data.get("marketing-opt-in") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className="space-y-4">
        <p className="overline">Thank you</p>
        <h2 className="heading-md text-bone">Message received.</h2>
        <p className="body text-bone-dim">
          We&rsquo;ll reply within two working days. If anything&rsquo;s urgent in the
          meantime, email{" "}
          <a href={`mailto:${SITE.email}`} className="text-champagne underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    // No .reveal on the form — it's conversion-critical and must never sit
    // at opacity 0 waiting for an observer (it raced hydration on the
    // coming-soon overlay and could stay invisible). Entrances belong to the
    // surrounding section, not the form itself.
    <form
      ref={formRef}
      name="project-enquiry"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="project-enquiry" />
      {/* Honeypot — hidden from people, tempting to bots */}
      <p className="hidden">
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* The bare divs are this form's own layout, not FieldGroup's: the
          molecule renders no wrapper, so a consumer with no column of its own
          (the stepped form's last panel) is not handed an empty div. */}
      <div>
        <FieldGroup
          id="name"
          name="name"
          label="Name"
          required
          maxLength={100}
          autoComplete="name"
          error={errors.name}
          onBlur={handleBlur("name")}
          onChange={handleChange("name")}
          placeholder="Your full name"
          blockLabel={false}
          errorGap="mt-2"
        />
      </div>
      <div>
        <FieldGroup
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          error={errors.email}
          onBlur={handleBlur("email")}
          onChange={handleChange("email")}
          placeholder="Your email address"
          blockLabel={false}
          errorGap="mt-2"
        />
      </div>
      <div>
        <FieldGroup
          id="message"
          name="message"
          label="How can we help?"
          control="textarea"
          rows={4}
          required
          maxLength={2000}
          error={errors.message}
          onBlur={handleBlur("message")}
          onChange={handleChange("message")}
          placeholder="Your question, or a little about the practice."
          blockLabel={false}
          errorGap="mt-2"
        />
      </div>

      {/* Marketing consent — UNTICKED and optional (UK GDPR/PECR): the
          reply happens regardless; only ticked boxes join the mailing list.
          Same field name as the newsletter form = one consent record.

          NOT a `TickBox`, and deliberately (2026-08-05). This box is the same
          champagne-fill-under-an-ink-glyph idea, but a different instrument:
          the INPUT ITSELF is the square here (appearance-none, `peer`,
          uncontrolled), it is 16px rather than 20, it carries no radius and no
          card, and the tick reveals from `peer-checked` instead of React
          state. Making one component serve both would take five props that
          each have exactly one consumer, which is a fork wearing a component's
          name. What IS shared is the geometry, and that is `TickPath`. */}
      <label className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-1 inline-flex h-4 w-4 shrink-0">
          <input
            type="checkbox"
            name="marketing-opt-in"
            value="yes"
            className="peer h-4 w-4 cursor-pointer appearance-none border rule-dark bg-transparent transition-colors checked:border-champagne checked:bg-champagne"
          />
          {/* Ink checkmark over the champagne fill, revealed on tick */}
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-ink opacity-0 transition-opacity peer-checked:opacity-100"
          >
            <TickPath strokeWidth="2" />
          </svg>
        </span>
        <span className="label text-bone-dim">
          Send me the occasional note on web &amp; search for clinics.
        </span>
      </label>

      <button type="submit" className="btn btn-primary-dark btn-arrow" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="btn-arrow-chip" aria-hidden>↗</span>
      </button>
      {status === "error" && (
        <p role="alert" className="fineprint text-champagne">
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
