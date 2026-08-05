import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface StudioBioCardProps {
  /** The kicker above the name. */
  kicker?: ReactNode;
  /** Who wrote it. Defaults to the studio, because the studio speaks as "we"
      and every entry is published under its name; an entry with a named
      guest author passes one instead. */
  name?: ReactNode;
  /** The one-paragraph description under the name. */
  blurb?: ReactNode;
  /** The onward ghost link. The label is a plain string so it can share one
      text node with the space before the arrow (see below). */
  link?: { href: string; label: string };
  /** The consumer's measure and the ruled gap above. The default is
      /blog/[slug]'s: the 720px reading column, so the rule under the article
      lines up with the prose it closes. */
  className?: string;
}

/**
 * THE STUDIO BIO CARD — the "Written by" aside that closes a journal entry's
 * body, above the back link. Extracted 2026-08-05.
 *
 * An `<aside>`, not a section: it is related to the article rather than part
 * of it, which is also why it sits on the article's own measure and carries
 * only a hairline rather than a ground of its own. The entry ends; this is
 * the byline the reader turns to afterwards.
 *
 * Its copy defaults to the studio's own because it is boilerplate that is
 * identical on every entry and belongs to the brand, not to the post. It
 * takes the ghost tier — the tertiary workhorse for a section's onward link
 * — never a pill: a bio card is not a call to action, and a second pill on
 * an article page would compete with the ContactCTA's flagship below.
 */
export default function StudioBioCard({
  kicker = "Written by",
  name = SITE.name,
  blurb = "A specialist design studio building considered brands and SEO-led websites for medical aesthetic and cosmetic surgery practices.",
  link = { href: "/about", label: "About the studio" },
  className = "max-w-[720px] mt-16 pt-10 border-t rule-dark",
}: StudioBioCardProps) {
  return (
    <aside className={className}>
      <p className="overline text-clay">{kicker}</p>
      <p className="heading-md text-bone mt-4">{name}</p>
      <p className="body mt-3 text-bone-dim">{blurb}</p>
      <Link href={link.href} className="btn-ghost text-bone mt-5 inline-flex">
        {/* Label and space in ONE text node: two adjacent text children make
            React emit a <!-- --> separator into the HTML. */}
        {`${link.label} `}
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
