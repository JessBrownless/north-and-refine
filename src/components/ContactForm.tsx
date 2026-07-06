"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * The /contact enquiry form, wired for Netlify Forms via the Next.js runtime
 * v5 pattern: build-time detection reads the static definition in
 * public/__forms.html, and this component POSTs url-encoded data to that
 * path. Field names must stay in sync with that file.
 *
 * `variant="minimal"` (the /coming-soon holding page) drops the practice and
 * interest fields — same form name, so every enquiry lands in one Netlify
 * inbox and the static definition needs no second entry.
 */

const FIELD =
  "w-full bg-transparent border-0 border-b rule-dark py-3 text-bone placeholder:text-clay/60 focus:outline-none focus:border-champagne transition-colors";

// Stricter than type="email" alone (which accepts "name@server" with no
// TLD): require a dot-separated domain. Mirrored in the email input's
// `pattern` so native bubbles catch it before JS does.
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ variant = "full" }: { variant?: "full" | "minimal" }) {
  const [status, setStatus] = useState<Status>("idle");

  // Surface a validation problem on a specific field via the native bubble.
  function reject(form: HTMLFormElement, selector: string, message: string) {
    const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
    el?.setCustomValidity(message);
    el?.reportValidity();
    el?.setCustomValidity("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Belt-and-braces: re-run native constraint validation explicitly, so
    // programmatic submits and quirky browsers can't skip it.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // JS-side re-checks that native constraints can't guarantee: minLength
    // only applies to user-typed ("dirty") values per spec, and none of the
    // native checks trim whitespace.
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) {
      return reject(form, "#name", "Please enter your name.");
    }
    if (!EMAIL_RE.test(email)) {
      return reject(form, "#email", "Enter a valid email address, e.g. name@example.com");
    }
    if (message.length < 10) {
      return reject(form, "#message", "Tell us a little more — at least a sentence.");
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
    const body = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      body.append(key, String(value).trim());
    }
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="space-y-4">
        <p className="overline text-champagne">Thank you</p>
        <h2 className="heading-md text-bone">Enquiry received.</h2>
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
    <form name="project-enquiry" onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value="project-enquiry" />
      {/* Honeypot — hidden from people, tempting to bots */}
      <p className="hidden">
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className="overline text-clay">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={FIELD}
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="overline text-clay">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]{2,}"
          title="Enter a valid email address, e.g. name@example.com"
          className={FIELD}
          placeholder="Your email address"
        />
      </div>
      {variant === "full" && (
        <>
          <div>
            <label htmlFor="practice" className="overline text-clay">
              Practice / clinic
            </label>
            <input id="practice" name="practice" type="text" maxLength={120} autoComplete="organization" className={FIELD} placeholder="Practice name" />
          </div>
          <div>
            <label htmlFor="interest" className="overline text-clay">
              What you&rsquo;re after
            </label>
            <select id="interest" name="interest" className={`${FIELD} appearance-none`}>
              <option className="bg-ink">Brand &amp; website</option>
              <option className="bg-ink">Website only</option>
              <option className="bg-ink">Brand only</option>
              <option className="bg-ink">Ongoing SEO &amp; growth</option>
              <option className="bg-ink">Not sure yet</option>
            </select>
          </div>
        </>
      )}
      <div>
        <label htmlFor="message" className="overline text-clay">
          Tell us a little more
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          className={`${FIELD} resize-none`}
          placeholder="Where your practice is now, and what you'd like to change."
        />
      </div>

      {/* Marketing consent — UNTICKED and optional (UK GDPR/PECR): the
          reply happens regardless; only ticked boxes join the mailing list.
          Same field name as the newsletter form = one consent record. */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="marketing-opt-in"
          value="yes"
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border rule-dark bg-transparent transition-colors checked:border-champagne checked:bg-champagne"
        />
        <span className="label text-bone-dim">
          Send me the occasional note on web &amp; search for clinics.
        </span>
      </label>

      <button type="submit" className="btn btn-primary-dark btn-arrow" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <span className="btn-arrow-chip" aria-hidden>↗</span>
      </button>
      {status === "error" && (
        <p className="fineprint text-champagne">
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
