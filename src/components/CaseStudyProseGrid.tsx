import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { proseMdxComponents } from "../../mdx-components";

/**
 * THE CASE-STUDY PROSE GRID — the editorial two-column canvas the /work/[slug]
 * write-up flows through. Kickers hold the LEFT rail, statements and copy run
 * in the right column at a reading measure, and FIGURES break out across the
 * wide shell between them.
 *
 * IT SITS ON `shell-wide`, which is the ONE sanctioned exception to the
 * everything-else-uses-`.shell` rule: the case study is the site's image
 * canvas, so figures get the near-full-width rail while the words stay
 * indented to a measure the eye can hold. That split is the whole reason the
 * placement lives in arbitrary variants rather than in the markup: the MDX
 * body is authored as plain prose, and the grid decides where each element
 * lands by WHAT IT IS.
 *
 * THE PLACEMENT CONTRACT, which is what all that class soup says:
 *   · anything that is not an h2 or a figure  → cols 7–11, the reading column
 *   · a lone figure                           → cols 2–11, the wide plate
 *   · two ADJACENT figures                    → 5 + 5, a compared pair
 *   · h2 (see `caseStudyProseComponents`)     → cols 2–4, the kicker rail
 * `[&>figure:has(+figure)]` is what makes the pair work: a figure followed by
 * another figure narrows itself, and the one after it takes the second half.
 *
 * ⚠ THE h2 RULE TRAVELS WITH THIS FILE (co-located 2026-08-05, and this is
 * the point of the extraction). The kicker's columns and the grid's columns
 * are ONE contract, and they were living in two files: an edit to either
 * silently broke the other. `caseStudyProseComponents` is exported from here
 * so the page can hand it to `compileMDX` without owning the geometry.
 *
 * ⚠ ITS `mt-16 lg:mt-28` IS MATCHED IN globals.css by `.prose-work > h2 + p`,
 * which styles the statement paragraph beside it. The two margins align the
 * kicker and its statement on the same grid row; change one and the pair
 * comes apart.
 */

/** The MDX map for a case-study body: the shared prose components, with h2
    demoted from a heading to a tracked-caps KICKER in the left rail. It is
    not a signpost here — the statement paragraph beside it is what the reader
    actually reads, so the h2 steps out of the ladder entirely. */
export const caseStudyProseComponents: MDXComponents = {
  ...proseMdxComponents,
  h2: ({ children, ...props }) => (
    <h2
      className="overline mt-16 lg:mt-28 lg:col-span-3 lg:col-start-2"
      {...props}
    >
      {children}
    </h2>
  ),
};

export default function CaseStudyProseGrid({
  children,
}: {
  /** The compiled MDX body. */
  children: ReactNode;
}) {
  return (
    <article className="shell-wide pb-8 pt-12 md:pt-16">
      <div className="prose-work lg:grid lg:grid-cols-12 lg:gap-x-10 [&>*:not(h2):not(figure)]:lg:col-start-7 [&>*:not(h2):not(figure)]:lg:col-span-5 [&>*:first-child]:mt-0 [&>h3]:mt-10 [&>figure]:my-12 md:[&>figure]:my-20 [&>figure]:lg:col-start-2 [&>figure]:lg:col-span-10 [&>figure:has(+figure)]:lg:col-start-2 [&>figure:has(+figure)]:lg:col-span-5 [&>figure+figure]:lg:col-start-7 [&>figure+figure]:lg:col-span-5">
        {children}
      </div>
    </article>
  );
}
