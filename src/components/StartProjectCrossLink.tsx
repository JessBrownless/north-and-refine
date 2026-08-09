import Link from "next/link";

/**
 * ⚠ PARKED 2026-08-09 — NO LIVE CONSUMER. The client removed it from
 * /contact ("maybe remove that Start a project bit on the contact page too")
 * in the pass that moved "What happens next" to the start-project success
 * screen. The reasoning: every page already carries a Start-a-project pill in
 * the nav, so this rail block was a second door to a room the reader could
 * already see. It still renders on /stylesheet, live from this file rather
 * than as a picture of it — parking is not deletion. If it stays unused, the
 * honest next step is deleting it and its stylesheet card together.
 *
 * THE SHORTER ROUTE — the block at the foot of /contact's rail that points
 * project enquiries at the full-page form, so the site's two conversion paths
 * cross-link. It exists because the client separated them 2026-07-31
 * ("contact and Start-a-project are two different things"): /contact went
 * back to plain contact and the project questions moved out, which left the
 * two paths needing a door between them.
 *
 * THE COPY IS THE COMPONENT (the ContactCTA precedent). It names the other
 * path and says what that path asks for; a consumer passing its own words
 * would be writing a different block.
 *
 * ⚠ THE HREF IS LOAD-BEARING. `StartProjectOverlay` intercepts every click on
 * `a[href="/start-a-project"]` in the capture phase and opens the form
 * overlay in place, so the ghost link is a trigger by virtue of its href
 * alone; the route stays the real no-JS, crawler and deep-link fallback.
 * Change the href and this block silently becomes an ordinary navigation.
 *
 * Extracted from /contact 2026-08-05.
 */
export default function StartProjectCrossLink({
  className = "",
  delay = 0,
}: {
  /** Outer spacing is the RAIL's business (mt-14 on /contact); the hairline
      and the air under it belong to the block. */
  className?: string;
  /** Entrance step, ms. The rail's stagger continues through this block, so
      the page owns the number. */
  delay?: number;
}) {
  return (
    <div
      className={`${className ? `${className} ` : ""}border-t rule-dark pt-8 reveal`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <h2 className="heading-sm text-bone">Starting a project?</h2>
      <p className="body-sm mt-3 max-w-[44ch] text-bone-dim">
        There&rsquo;s a form for that: a few questions about the
        practice and what you need, so the first conversation is a
        useful one.
      </p>
      <Link href="/start-a-project" className="btn-ghost mt-5 text-bone">
        Start a project <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
