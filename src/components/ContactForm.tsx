"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { EMAIL_RE, postNetlifyForm } from "@/lib/forms";
import FieldGroup from "@/components/FieldGroup";

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

export default function ContactForm({ title }: { title?: string }) {
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

      {/* THE FORM'S OWN TITLE (2026-08-09, client: "a little title on the
          form as well — small sans serif"). It takes `.form-title`, which is
          exactly the register CLAUDE.md reserved for this and even named this
          form as its likely second consumer: 15px at weight 600, sentence
          case, NO RULE UNDER IT. Form furniture leads by emphasis rather than
          size, which is legal because the house face has real weights.

          ⚠ IT IS A PROP, NOT UNCONDITIONAL, because this form has THREE
          consumers: /contact, the /stylesheet specimen, and
          HoldingEnquiryCard on the coming-soon page. Only /contact wants a
          title — the holding card already sits under its own heading, and a
          second one there would be a heading stuttering at the reader. */}
      {title && <p className="form-title text-bone">{title}</p>}
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
          /* A PERSON'S NAME IS NOT A DICTIONARY WORD (2026-08-09) — native
             spellcheck flags most real surnames, which is where the client
             saw a red squiggle under her own. The message field keeps its
             spellcheck: there it is checking prose the visitor wrote, which
             is the one place it earns its keep. */
          spellCheck={false}
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

      {/* ⚠ THE MARKETING CONSENT LINE WAS REMOVED 2026-08-09 (client: "remove
          this too I don't like it"), and it went from THREE PLACES AT ONCE —
          this UI, the POST body, and the project-enquiry definition in
          public/__forms.html. That is the same discipline the start-project
          form followed on 2026-08-01, and it is not tidiness: NO CONSENT
          RECORDED MEANS NO MARKETING MAY BE SENT to these addresses (Spam
          Act / PECR). A checkbox left in the static definition would keep an
          empty column in the Netlify export and imply a consent question was
          asked. If marketing ever returns to this form, the checkbox and the
          consent record come back TOGETHER.

          The NEWSLETTER form keeps its own marketing-opt-in, untouched —
          there the consent IS the transaction. */}

      <button type="submit" className="btn btn-primary-dark btn-arrow" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="btn-arrow-chip" aria-hidden>↗</span>
      </button>
      {/* ⚠ A NOTICE, NOT A CONSENT CHECKBOX (2026-08-09, answering the
          client's GDPR question). Replying to someone who wrote to us is
          lawful under legitimate interests / steps prior to a contract — it
          does not run on consent, and gating SUBMIT on a consent tick would
          actually weaken the position, because consent must be freely given
          and cannot be a condition of the service. What the UK/EU regime does
          require here is TRANSPARENCY at the point of collection: say what
          the data is for and where the full notice lives. That is this line.

          It can say "only to reply" truthfully BECAUSE the marketing checkbox
          was removed on 2026-08-09 — no marketing consent is collected, so no
          marketing may be sent. If marketing ever returns, this sentence is
          wrong and must change in the same commit as the checkbox.

          Matches NewsletterSignup's existing privacy-line pattern. */}
      <p className="fineprint">
        We&rsquo;ll only use these details to reply to your enquiry. See our{" "}
        <a
          href="/privacy"
          className="underline underline-offset-2 transition-colors hover:text-bone"
        >
          privacy policy
        </a>
        .
      </p>

      {status === "error" && (
        <p role="alert" className="fineprint text-champagne">
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
