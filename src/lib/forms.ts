/**
 * Shared form plumbing for the two Netlify forms (ContactForm and
 * StartProjectForm). Validation is DESIGNED INLINE ERRORS, not native browser
 * bubbles (2026-07-31, client: "do form errors / validation") — the bubbles
 * are OS chrome in a system that styles everything else, so forms set
 * `noValidate` and surface errors themselves: champagne fineprint under the
 * field, champagne rule on the field itself (form feedback is a sanctioned
 * champagne use). Keep the two forms on these helpers so their behaviour
 * can't drift.
 */

// Stricter than type="email" alone (which accepts "name@server" with no
// TLD): require a dot-separated domain.
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

/** The shared on-ink field treatment: bottom-rule only, champagne on focus.
    Border tone comes from `fieldBorder` so an invalid field can carry the
    champagne rule at rest. */
export const FIELD_BASE =
  "w-full bg-transparent border-0 border-b py-3 text-bone placeholder:text-clay/60 focus:outline-none focus:border-champagne transition-colors";

export function fieldBorder(error?: string) {
  return error ? "border-champagne" : "rule-dark";
}

/** POST url-encoded fields to the static definition file (the Next.js
    runtime-v5 Netlify Forms pattern). Resolves false on any failure so the
    caller can show the retry message. */
export async function postNetlifyForm(
  fields: Record<string, string>,
): Promise<boolean> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    body.append(key, value.trim());
  }
  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}
