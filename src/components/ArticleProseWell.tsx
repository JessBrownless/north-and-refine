import type { ReactNode } from "react";

/** The vertical rhythm between compiled MDX blocks. It has to live on the
    WELL rather than in `mdx-components.tsx`, because these are relationships
    between siblings (a heading's air above it, the tight join to the
    paragraph that answers it) and an element cannot style its own
    neighbours. `[&>*:first-child]:mt-0` hands the gap above the article body
    back to the well's own margin, so the consumer controls it in one place. */
const PROSE_RHYTHM =
  "[&>h2]:mt-16 [&>h2+*]:mt-4 [&>h3]:mt-10 [&>*:first-child]:mt-0";

interface ArticleProseWellProps {
  /** The compiled MDX body. */
  children: ReactNode;
  /** Measure and the gap above. The default is /blog/[slug]'s 720px reading
      column: journal entries read straight down a single column, unlike
      /work/[slug], whose prose is indented into a 12-col editorial grid on
      the wide canvas and so keeps its own well. */
  className?: string;
}

/**
 * THE ARTICLE PROSE WELL — the measure and vertical rhythm the compiled MDX
 * body of a journal entry renders into. Extracted 2026-08-05.
 *
 * The element styling of the prose itself (paragraphs, headings, lists,
 * figures, links) is NOT here: it lives in `proseMdxComponents` in
 * mdx-components.tsx at the repo root, passed to `compileMDX`. This component
 * owns only what the container decides — how wide the reading column runs and
 * how the blocks space against each other.
 */
export default function ArticleProseWell({
  children,
  className = "max-w-[720px] mt-12 md:mt-16",
}: ArticleProseWellProps) {
  return <div className={`${className} ${PROSE_RHYTHM}`}>{children}</div>;
}
