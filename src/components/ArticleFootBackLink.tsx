import Link from "next/link";

interface ArticleFootBackLinkProps {
  href: string;
  /** The label after the arrow ("More from the Blog"). Names the collection
      the reader is returning to, so it stays with the consumer. A plain
      string, so it can share one text node with the space after the arrow. */
  label: string;
  /** The consumer's measure and the ruled gap above. The default is
      /blog/[slug]'s 720px reading column. */
  className?: string;
}

/**
 * THE ARTICLE FOOT BACK LINK — the ruled return to the collection that closes
 * a journal entry, under the studio bio and above the ContactCTA. Extracted
 * 2026-08-05.
 *
 * THE ARROW LEADS, pointing back: it is the only arrow on the site that sits
 * before its label, because the direction of travel is the message. Ghost
 * tier, per the canon that every section's onward link is the tertiary
 * workhorse; the hover opens the gap and turns the arrow champagne, and the
 * link is never dimmed as a whole (fading reads as disabled).
 *
 * /work/[slug] closes differently on purpose — a "Next project" row that
 * carries the reader onward to another case study rather than back to the
 * index — so this is deliberately not folded together with it.
 */
export default function ArticleFootBackLink({
  href,
  label,
  className = "max-w-[720px] mt-10 pt-8 border-t rule-dark",
}: ArticleFootBackLinkProps) {
  return (
    <div className={className}>
      <Link href={href} className="btn-ghost text-bone">
        <span aria-hidden>←</span>
        {/* Space and label in ONE text node: two adjacent text children make
            React emit a <!-- --> separator into the HTML. */}
        {` ${label}`}
      </Link>
    </div>
  );
}
