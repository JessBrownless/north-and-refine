"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { EMAIL_RE, FIELD_BASE, fieldBorder, postNetlifyForm } from "@/lib/forms";

/**
 * The /start-a-project full-page form (2026-07-31, client: a "Start project"
 * button anywhere on site "launches a full page form … a few questions about
 * what they want"; /contact stays plain contact).
 *
 * THE COMPOSITION IS THE SERVICES LEDGER: numbered ruled rows (index-num +
 * heading-sm left, the field in the right columns), the same grammar as the
 * hub's scroll-index rows and the detail pages' "other disciplines" band —
 * a form set like a page of the book, not an app panel. Netlify form
 * `start-project`; static definition in public/__forms.html (field names
 * must stay in sync).
 *
 * The NEEDS chips are FORM CONTROLS, not CTAs — straight-cornered bordered
 * tags per the corners rule (pills are reserved for the wax-seal buttons).
 * Selected = champagne rim + faint champagne wash (form feedback is a
 * sanctioned champagne use). Multi-select; they post as one comma-joined
 * `needs` value. Order is web → search → brand per the sitewide rule.
 *
 * Validation matches ContactForm: noValidate + designed inline errors from
 * lib/forms.ts, validate on blur once touched, clear as corrected, failed
 * submit focuses the first invalid field. No .reveal anywhere on the form —
 * it's conversion-critical and must never wait at opacity 0.
 */

const NEEDS = [
  "Website design & build",
  "Search & SEO",
  "Brand identity",
  "Not sure yet",
] as const;

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
        return "Tell us a little about the practice; a few sentences is plenty.";
      return undefined;
  }
}

/* One ledger row: numeral + question in the left columns, the answer in the
   right — the services index grammar. `top` keeps the textarea row from
   centring against its taller field. */
function Row({
  num,
  label,
  hint,
  labelId,
  htmlFor,
  top = false,
  children,
}: {
  num: string;
  label: string;
  hint?: string;
  labelId?: string;
  htmlFor?: string;
  top?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 border-b rule-dark py-8 md:grid-cols-12 md:gap-8 md:py-12">
      <div className="md:col-span-4">
        <p className="index-num text-clay">{num}</p>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="heading-sm mt-2 block text-bone">
            {label}
          </label>
        ) : (
          <p id={labelId} className="heading-sm mt-2 text-bone">
            {label}
          </p>
        )}
        {hint && <p className="body-sm mt-2 text-bone-dim">{hint}</p>}
      </div>
      <div className={`md:col-span-7 md:col-start-6 ${top ? "" : "md:self-center"}`}>
        {children}
      </div>
    </div>
  );
}

export default function StartProjectForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [needs, setNeeds] = useState<string[]>([]);

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

  function toggleNeed(option: string) {
    setNeeds((prev) => {
      const next = prev.includes(option)
        ? prev.filter((n) => n !== option)
        : [...prev, option];
      if (next.length > 0) setFieldError("needs", undefined);
      return next;
    });
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
    if (needs.length === 0) {
      next.needs = "Pick at least one. Not sure yet counts.";
    }
    setErrors(next);
    const firstInvalid = ORDER.find((f) => next[f]);
    if (firstInvalid) {
      const target = form.querySelector<HTMLElement>(
        firstInvalid === "needs" ? "#needs-group button" : `#${firstInvalid}`,
      );
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    // Honeypot — same silent "success" as ContactForm.
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
    // The full-page thank-you moment — heading-xl per the ladder (a moment,
    // not a masthead).
    return (
      <div className="py-16 md:py-24">
        <p className="overline">Thank you</p>
        <h2 className="heading-xl from-overline text-bone">Received.</h2>
        <p className="body-lg mt-6 max-w-[52ch] text-bone-dim">
          We&rsquo;ll read it properly and reply within two working days. If
          we&rsquo;re not the right studio for it, we&rsquo;ll say so and
          suggest a better route.
        </p>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <Link href="/work" className="btn-ghost text-bone">
            See the work <span aria-hidden>→</span>
          </Link>
          <Link href="/" className="btn-ghost text-bone">
            Back to the studio <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form name="start-project" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="form-name" value="start-project" />
      {/* Honeypot — hidden from people, tempting to bots */}
      <p className="hidden">
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="border-t rule-dark">
        <Row num="01" label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            onBlur={handleBlur("name")}
            onChange={handleChange("name")}
            className={`${FIELD_BASE} ${fieldBorder(errors.name)} body-lg`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="fineprint mt-2 text-champagne">
              {errors.name}
            </p>
          )}
        </Row>

        <Row num="02" label="Your email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            className={`${FIELD_BASE} ${fieldBorder(errors.email)} body-lg`}
            placeholder="Your email address"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="fineprint mt-2 text-champagne">
              {errors.email}
            </p>
          )}
        </Row>

        <Row
          num="03"
          label="The practice"
          hint="Optional. The clinic or practice name, and a link if it's online."
          htmlFor="practice"
        >
          <input
            id="practice"
            name="practice"
            type="text"
            maxLength={160}
            autoComplete="organization"
            className={`${FIELD_BASE} rule-dark body-lg`}
            placeholder="Practice name, or a web address"
          />
        </Row>

        <Row
          num="04"
          label="What do you need?"
          hint="Choose any that apply."
          labelId="needs-label"
        >
          <div
            id="needs-group"
            role="group"
            aria-labelledby="needs-label"
            aria-describedby={errors.needs ? "needs-error" : undefined}
            className="flex flex-wrap gap-3"
          >
            {NEEDS.map((option) => {
              const on = needs.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleNeed(option)}
                  className={`label border px-5 py-3.5 transition-colors ${
                    on
                      ? "border-champagne bg-champagne/10 text-bone"
                      : "rule-dark text-bone-dim hover:border-champagne/60 hover:text-bone"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errors.needs && (
            <p id="needs-error" role="alert" className="fineprint mt-3 text-champagne">
              {errors.needs}
            </p>
          )}
        </Row>

        <Row
          num="05"
          label="The project"
          hint="Where the practice is now, and what you'd like to change."
          htmlFor="message"
          top
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={2000}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            onBlur={handleBlur("message")}
            onChange={handleChange("message")}
            className={`${FIELD_BASE} ${fieldBorder(errors.message)} body-lg resize-none`}
            placeholder="A few sentences is plenty. We'll ask the right questions on the call."
          />
          {errors.message && (
            <p id="message-error" role="alert" className="fineprint mt-2 text-champagne">
              {errors.message}
            </p>
          )}
        </Row>
      </div>

      {/* The foot: consent, the flagship send, and the promise. */}
      <div className="mt-10 md:mt-12">
        <label className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-1 inline-flex h-4 w-4 shrink-0">
            <input
              type="checkbox"
              name="marketing-opt-in"
              value="yes"
              className="peer h-4 w-4 cursor-pointer appearance-none border rule-dark bg-transparent transition-colors checked:border-champagne checked:bg-champagne"
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
          <span className="label text-bone-dim">
            Send me the occasional note on web &amp; search for clinics.
          </span>
        </label>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-5">
          <button
            type="submit"
            className="btn btn-primary-dark btn-arrow"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send your details"}
            <span className="btn-arrow-chip" aria-hidden>↗</span>
          </button>
          <p className="body-sm text-bone-dim">
            We reply within two working days. If we&rsquo;re not the right fit,
            we&rsquo;ll tell you that too.
          </p>
        </div>
        {status === "error" && (
          <p role="alert" className="fineprint mt-4 text-champagne">
            Something went wrong sending that. Please try again, or email us at {SITE.email}.
          </p>
        )}
      </div>
    </form>
  );
}
