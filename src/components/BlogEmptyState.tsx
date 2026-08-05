import type { ReactNode } from "react";

interface BlogEmptyStateProps {
  /** The holding line. Defaults to the live /blog copy so a specimen of this
      component shows the sentence a reader would actually meet. */
  message?: ReactNode;
}

/**
 * THE BLOG ZERO STATE — the band /blog renders in place of the listing when
 * the collection has no published entries at all. Extracted 2026-08-05.
 *
 * It is a SECTION, not a paragraph, because it stands in for `BlogList`: the
 * page needs the bone ground and the py-16/24 band to survive between the
 * hero's borderBottom and the ContactCTA, or an empty blog collapses into a
 * hairline and the close sits straight under the masthead. `BlogList` keeps
 * its own, different empty state ("No entries in this category yet.") — that
 * one is a FILTER result inside an existing band, so it is bare copy with no
 * ground of its own. Two states, two shapes, on purpose.
 *
 * The copy defaults rather than being passed because a zero state is a state
 * of the system, not editorial page content: the sentence belongs with the
 * band the way ContactCTA's copy belongs with the close.
 *
 * `text-ink-dim` is the on-LIGHT secondary tint (~6.9:1 on bone); clay is
 * sub-AA on light grounds and must not be used for copy meant to be read.
 */
export default function BlogEmptyState({
  message = "The first entries are being written. Check back soon.",
}: BlogEmptyStateProps) {
  return (
    <section className="scene-warm text-ink">
      <div className="shell py-16 md:py-24">
        <p className="body text-ink-dim">{message}</p>
      </div>
    </section>
  );
}
