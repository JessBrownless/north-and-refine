import type { ReactNode } from "react";

interface ArticleFeaturedFigureProps {
  src: string;
  /** Empty string where the image is decorative; the consumer decides, since
      only the entry's frontmatter knows whether the caption already says it. */
  alt: string;
  caption?: ReactNode;
  /** The consumer's canvas and the gap above it. The default is
      /blog/[slug]'s: 880px, wider than the 720px reading column it sits
      beside, which is the whole reason the figure rides `ArticleHeader`'s
      media slot instead of sitting inside the header. */
  className?: string;
}

/**
 * THE ARTICLE FEATURED FIGURE — the lead image under a journal entry's
 * header, with its optional caption. Extracted 2026-08-05.
 *
 * 16:10, always: landscape is the ratio for screens and editorial figures,
 * and blog imagery is FIGURES, not fashion plates (tall belongs to people).
 * It is not a prop for that reason — a freelance ratio here is drift #15. If
 * a capture does not fit, fix the capture; never crop the plate to suit it.
 *
 * `.frame` carries the plate radius, the ink-raised backing and the clip, so
 * the image is absolutely positioned inside it rather than sized itself. The
 * caption is the on-ink meta voice (`.label text-clay`), the third tier of
 * the on-INK ladder.
 */
export default function ArticleFeaturedFigure({
  src,
  alt,
  caption,
  className = "max-w-[880px] mt-12 md:mt-16",
}: ArticleFeaturedFigureProps) {
  return (
    <figure className={className}>
      <div className="frame aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {caption && <figcaption className="label mt-3 text-clay">{caption}</figcaption>}
    </figure>
  );
}
