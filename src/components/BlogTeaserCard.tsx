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
export default function BlogTeaserCard({
  post,
  tone = "dark",
}: {
  post: JournalEntry;
  /** THE GROUND (2026-08-09, born when the blog rail went light): the date
      and the title both hardcode the on-ink ladder. The date takes
      text-ink-mute on light, not clay — it is running caption meta, not the
      section's own kicker (that exception is narrower, see CollectionHeader). */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
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
      <p className={`overline mt-6 ${light ? "text-ink-mute" : "text-clay"}`}>
        {formatDate(post.frontmatter.publishedAt)}
      </p>
      <h3
        className={`card-title mt-3 max-w-[28ch] transition-opacity group-hover:opacity-70 ${light ? "text-ink" : "text-bone"}`}
      >
        {post.frontmatter.title}
      </h3>
    </Link>
  );
}
