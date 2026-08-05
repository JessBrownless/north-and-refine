import { SITE } from "@/lib/site";
import ContactForm from "./ContactForm";

/**
 * THE HOLDING PAGE'S ENQUIRY COLUMN — the right half of the 50/50 split:
 * kicker, the form inside frosted glass, and the email escape hatch.
 *
 * THE CARD IS PURELY THE FORM. The kicker sits ABOVE the glass and the
 * "prefer email" line BELOW it, close in: the panel wraps exactly what the
 * reader acts on, which is the same rule the Start-a-project overlay's panel
 * follows. `.card-glass` is right here rather than `.glass-float` because the
 * ground is FLAT ink: pick the material by the ground, never by taste (a 38%
 * ink fill on flat ink is invisible). This is the most-seen glass on the site
 * while HOLDING_PAGE is on, since /coming-soon serves every route.
 *
 * The form is the same lean Netlify form as /contact (name, email, message):
 * the old minimal variant became the only form when the project questions
 * moved to /start-a-project 2026-07-31.
 *
 * Its 1.1s entrance is the last beat of the shell's cross-column load-in
 * sequence; see `HoldingMasthead`.
 *
 * Extracted from /coming-soon 2026-08-05.
 */
export default function HoldingEnquiryCard() {
  return (
    <div
      className="md:col-span-6 opacity-0 animate-fade-in"
      style={{ animationDelay: "1.1s" }}
    >
      <p className="overline">
        Enquire <span aria-hidden>↓</span>
      </p>
      <div className="card-glass mt-4 px-8 py-5 md:px-9 md:py-6">
        <ContactForm />
      </div>
      <p className="body mt-4 text-bone-dim">
        Prefer email?{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-champagne underline underline-offset-4"
        >
          {SITE.email}
        </a>
      </p>
    </div>
  );
}
