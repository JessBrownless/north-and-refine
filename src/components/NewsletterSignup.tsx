"use client";

import { useState } from "react";

/**
 * Mailing-list capture for the homepage freebie band. Wired for Netlify
 * Forms via the Next.js runtime v5 pattern (same as ContactForm): the static
 * definition lives in public/__forms.html under the name "newsletter", and
 * this component POSTs url-encoded data to that path. Field names must stay
 * in sync with that file.
 */

type Status = "idle" | "sending" | "sent" | "error";

export default function NewsletterSignup() {
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
      <div>
        <p className="overline text-champagne">Thank you</p>
        <p className="body-lg mt-3 text-bone">
          It&rsquo;s on its way — check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden aria-hidden="true">
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
        <label className="w-full">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourpractice.com.au"
            className="w-full bg-transparent border-0 border-b rule-dark py-3 text-bone placeholder:text-clay focus:outline-none focus:border-champagne transition-colors"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary-dark shrink-0"
        >
          {status === "sending" ? "Sending…" : "Get the checklist"}
        </button>
      </div>
      {status === "error" && (
        <p className="label mt-3 text-champagne">
          That didn&rsquo;t send — please try again.
        </p>
      )}
    </form>
  );
}
