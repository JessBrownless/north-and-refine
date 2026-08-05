import Link from "next/link";
import type { JournalEntry } from "@/lib/journal";

// Editorial date for the teaser cards.
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/**
 * A BLOG TEASER — the plate, the date, the title. The whole card is the link;
 * affordance is the title's dim on hover, never a swelling plate.
 *
 * Imagery is 16:10 per the ratio canon: blog imagery is FIGURES, landscape,
 * matching the /blog index slots. Tall belongs to people.
 *
 * The title takes `.card-title` (2026-07-11): card titles are captions to
 * their images rather than headings, so they share one sans register with the
 * work-card client names and carry no italic accent.
 */
export default function BlogTeaserCard({ post }: { post: JournalEntry }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      {/* 16:10 per the ratio canon — blog imagery is FIGURES
          (landscape), matching the /blog index slots. */}
      <div className="frame aspect-[16/10]">
        {post.frontmatter.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.frontmatter.featuredImage}
            alt={post.frontmatter.featuredImageAlt ?? ""}
            loading="lazy"
            className="plate-develop h-full w-full object-cover"
          />
        ) : (
          <span className="portrait-fill absolute inset-0 flex items-center justify-center">
            <span className="index-num text-ink/30" aria-hidden>✦</span>
          </span>
        )}
      </div>
      <p className="overline mt-6 text-clay">{formatDate(post.frontmatter.publishedAt)}</p>
      <h3 className="card-title mt-3 max-w-[28ch] text-bone transition-opacity group-hover:opacity-70">
        {post.frontmatter.title}
      </h3>
    </Link>
  );
}
