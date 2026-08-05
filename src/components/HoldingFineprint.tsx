import { SITE } from "@/lib/site";

/**
 * THE HOLDING PAGE'S FOOT — copyright, the studio line, and the one link the
 * page is willing to offer. Privacy is here because it must be reachable
 * wherever a form collects an address, and the holding page's form does; it
 * is deliberately the ONLY exit, since /coming-soon replaces the site chrome
 * (a full nav on a page whose point is that the site isn't ready yet).
 *
 * Extracted from /coming-soon 2026-08-05. It is the third child of the
 * shell's vertical column, and `HoldingPageShell` renders it there: the
 * middle band's centring depends on this sitting at the bottom of the flex
 * column, so the two are kept together on purpose.
 */
export default function HoldingFineprint() {
  return (
    <p className="fineprint text-clay">
      © 2026 {SITE.legalName}. {SITE.tagline}. ·{" "}
      <a href="/privacy" className="underline underline-offset-2 hover:text-bone transition-colors">
        Privacy
      </a>
    </p>
  );
}
