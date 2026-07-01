"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * The /contact enquiry form, wired for Netlify Forms via the Next.js runtime
 * v5 pattern: build-time detection reads the static definition in
 * public/__forms.html, and this component POSTs url-encoded data to that
 * path. Field names must stay in sync with that file.
 */

const FIELD =
  "w-full bg-transparent border-0 border-b rule-dark py-3 text-bone placeholder:text-clay focus:outline-none focus:border-champagne transition-colors";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const body = new URLSearchParams(
      new FormData(event.currentTarget) as unknown as Record<string, string>,
    ).toString();
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
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
    <form name="project-enquiry" onSubmit={handleSubmit} className="reveal space-y-7">
      <input type="hidden" name="form-name" value="project-enquiry" />
      {/* Honeypot — hidden from people, tempting to bots */}
      <p className="hidden">
        <label>
          Don&rsquo;t fill this in: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className="overline text-clay">
          Your name
        </label>
        <input id="name" name="name" type="text" required className={FIELD} placeholder="Dr Jane Smith" />
      </div>
      <div>
        <label htmlFor="email" className="overline text-clay">
          Email
        </label>
        <input id="email" name="email" type="email" required className={FIELD} placeholder="you@practice.com" />
      </div>
      <div>
        <label htmlFor="practice" className="overline text-clay">
          Practice / clinic
        </label>
        <input id="practice" name="practice" type="text" className={FIELD} placeholder="Practice name" />
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
      <div>
        <label htmlFor="message" className="overline text-clay">
          Tell us a little more
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${FIELD} resize-none`}
          placeholder="Where your practice is now, and what you'd like to change."
        />
      </div>

      <button type="submit" className="btn btn-primary-dark" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <span aria-hidden>→</span>
      </button>
      {status === "error" && (
        <p className="fineprint text-champagne">
          Something went wrong sending that. Please try again, or email us at {SITE.email}.
        </p>
      )}
      <p className="fineprint">We&rsquo;ll only use your details to reply to this enquiry.</p>
    </form>
  );
}
