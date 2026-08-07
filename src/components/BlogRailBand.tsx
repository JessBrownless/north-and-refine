import type { ReactNode } from "react";
import BlogTeaserCard from "@/components/BlogTeaserCard";
import Carousel from "@/components/Carousel";
import CollectionHeader from "@/components/CollectionHeader";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import type { JournalEntry } from "@/lib/journal";

/**
 * NOTES FROM THE STUDIO — the blog teasers as a RAIL rather than a grid
 * (2026-07-10): the carousel earns its place by holding six posts where the
 * grid held three, and the reader turns the pages (nothing here autoplays).
 *
 * Never stack two rails in the same viewport (the 2026-07-10 double-carousel
 * lesson) — on the homepage this one sits well clear of Selected work's
 * mobile rail.
 *
 * Renders NOTHING when there are no posts: the guard lived at the call site
 * before this was extracted, and a header over an empty track is not a state
 * the band has.
 *
 * The band's own copy is the section's identity rather than page content, so
 * it defaults here (the ContactCTA precedent) and the page passes only the
 * posts.
 *
 * CARDS NOW FILL THE ROW AT lg (2026-08-08, client: "make the posts…
 * actually go to the edge of the content grid or off-screen"). The old
 * `lg:w-[30%]` was measured live leaving 74px of dead ground between the
 * last card and the shell's own content edge — with only three real posts
 * in `content/blog` today, 3 × 30% plus two gap-8 gaps simply falls short
 * of the container, and nothing peeks in to signal there's more. The width
 * is now computed to fill exactly 3 cards across the row — `calc((100% -
 * 4rem) / 3)`, 4rem being two gap-8 gaps — closing the dead space rather
 * than guessing a bigger percentage. ⚠ THIS MATH ASSUMES ~3 VISIBLE CARDS:
 * once there are enough real posts to peek a 4th at lg, re-derive the width
 * (or drop back to a percentage) so a partial card returns as the
 * invitation to scroll, per the Carousel's own contract.
 */
export default function BlogRailBand({
  posts,
  kicker = "Blog",
  title = "Notes from the studio",
  linkHref = "/blog",
  linkLabel = "All entries",
  railLabel = "Latest blog posts",
  exitFade = false,
}: {
  posts: JournalEntry[];
  kicker?: string;
  title?: ReactNode;
  linkHref?: string;
  linkLabel?: string;
  /** Accessible name for the rail region. */
  railLabel?: string;
  /** Mounts the fade-to-ink handover (restored 2026-07-11: the live-era
      section handover the client loved). Homepage only. */
  exitFade?: boolean;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <CollectionHeader
          kicker={kicker}
          title={title}
          linkHref={linkHref}
          linkLabel={linkLabel}
        />
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <Carousel
            ariaLabel={railLabel}
            className="mt-14 md:mt-20"
            slideClassName="w-[76vw] sm:w-[48%] lg:w-[calc((100%-4rem)/3)]"
          >
            {posts.map((post) => (
              <BlogTeaserCard key={post.slug} post={post} />
            ))}
          </Carousel>
        </div>
      </div>
      {exitFade && <ExitFadeOverlay />}
    </section>
  );
}
