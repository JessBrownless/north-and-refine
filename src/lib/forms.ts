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
/* Placeholder tone, WARMED TWICE (2026-08-01). The client flagged it once
   ("looks too blue-grey"), clay/60 → bone-dim/40 wasn't enough ("still looks
   really grey/blue"), so it now takes CHAMPAGNE at low alpha: the only tone
   in the palette with enough warm saturation to survive being dimmed against
   the warm ground. At 35% over ink it composites to ≈#524632 — a warm brown
   hint, nowhere near gold. This does NOT breach the champagne rule: that
   governs LABEL type and fills; a placeholder is neither (it's the field's
   own ghost, and it disappears the moment anything is typed). */
/* `field-on-dark` / `field-on-light` are the AUTOFILL classes (globals.css):
   Chrome paints its own pale blue over filled fields and only an opaque inset
   box-shadow can override it, so each ground carries a class that repaints
   the fill in its own colour. */
/* ⚠ THE PLACEHOLDER LEFT CHAMPAGNE 2026-08-09 (client, on the contact form:
   "can the placeholders and borders not be the gold tone? More of a bone vibe
   please?"). THIRD tone this placeholder has had, so the history matters: it
   was clay/60, then bone-dim/40 (client: "still looks really grey/blue"), then
   champagne/35 to escape the blue cast. Going back to bone is NOT a return to
   the rejected version — bone (#F4EDDF) is the warm cream, where bone-dim
   (#CFC5B2) is the desaturated grey that drew the complaint. bone/30 over ink
   composites to ≈#55514A: warm, clearly not blue, and clearly not gold.
   Do not "fix" this back to bone-dim; that is the tone she rejected. */
export const FIELD_BASE =
  "field-on-dark w-full bg-transparent border-0 border-b py-3 text-bone placeholder:text-bone/30 focus:outline-none focus:border-champagne transition-colors";

/** Which ground the form is sitting on. */
export type FormTone = "dark" | "light";

/* THE ON-LIGHT FIELD (2026-08-01, for the split overlay's bone column).
   Same anatomy — bottom rule only, no box — retuned for a light ground, and
   the retune is NOT a straight tone swap: CHAMPAGNE CANNOT CARRY STATE ON
   BONE. It measures 1.8:1 there (against ~4.3:1 on ink), so a gold focus rule
   is a rule you cannot see, and a gold error message is unreadable. On light,
   INK carries focus and error; champagne keeps hover and ornament, exactly as
   the colour rule intends (details and interactions, never load-bearing type).
   The placeholder takes ink-faint, the sanctioned decorative tint. */
export const FIELD_BASE_LIGHT =
  "field-on-light w-full bg-transparent border-0 border-b py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors";

export function fieldBase(tone: FormTone = "dark") {
  return tone === "light" ? FIELD_BASE_LIGHT : FIELD_BASE;
}

export function fieldBorder(error?: string, tone: FormTone = "dark") {
  /* The resting rule on light is ink/35, NOT rule-light (2026-08-01, client:
     "form fields feel weird and not clear — think they need a darker
     outline"). rule-light (#DED2BF) is the SECTION hairline tint, tuned to
     whisper; a field's underline is an affordance and has to read as one.
     ink/35 over bone ≈ the ink-faint band — clearly a line, still quieter
     than focus (full ink). Dark keeps rule-dark: bone-tinted rules on ink
     already read as fields. */
  /* ⚠ THE DARK RESTING RULE LEFT rule-dark 2026-08-09, same client note
     ("borders… more of a bone vibe"). It is bone/20 (≈#3E3B35 over ink) and
     that is MORE consistent with this file's own light-side principle, not
     less: on bone the field rests at ink/35 rather than the rule-light
     section hairline, precisely because "a section hairline whispers; an
     affordance must read". rule-dark IS the section hairline on ink, so the
     dark side had been breaking the rule the light side spells out. bone/20
     also sits just above the /contact form panel's bone/10, keeping the
     container quieter than the control inside it. */
  if (tone === "light") return error ? "border-ink" : "border-ink/35";
  return error ? "border-champagne" : "border-bone/20";
}

/* ⚠ CHAMPAGNE STAYS ON FOCUS AND ERROR, deliberately. The 2026-08-09 note
   asked for the RESTING placeholder and border to leave gold, and both did;
   focus and error are the house FEEDBACK language, which the colour rule
   reserves champagne for ("details & interactions ONLY… form feedback").
   Stripping gold from those too would be a different, larger decision about
   the interaction vocabulary sitewide, not a tone tweak on one form. */

/** Error text tone: champagne is the house feedback colour on ink; on bone it
    fails contrast, so the message goes full ink and the field's ink rule is
    what marks the field. */
export function errorTone(tone: FormTone = "dark") {
  return tone === "light" ? "text-ink" : "text-champagne";
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
