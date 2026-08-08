import type { ReactNode } from "react";
import BlogTeaserCard from "@/components/BlogTeaserCard";
import Carousel from "@/components/Carousel";
import CollectionHeader from "@/components/CollectionHeader";
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
 *
 * NO EXIT FADE (2026-08-09, client on the What-we-do rows: "fades to white
 * as you scroll — that needs to go"). The `exitFade` prop is DELETED rather
 * than left unpassed, following the precedent ManifestoTrack set when it
 * went bone: the fade-to-ink handover belongs to DARK sections dissolving
 * into one another, and a light band does not dissolve — it CUTS.
 *
 * ⚠ THE OVERLAY WAS A LEFTOVER FROM THIS BAND'S DARK ERA, not a new bug.
 * ExitFadeOverlay paints `bg-ink`, which was right while the band was ink —
 * it read as one dark section handing over to the next. The light flip
 * earlier the same day changed the ground and left the overlay behind, so a
 * bone band was being washed out by a dark sheet on the way past. The stale
 * claim that it "reads correctly regardless of the band's own ground" is
 * removed with it; that was true only while the ground was dark.
 *
 * TWO BANDS HAD IT, and only one was reported: the blog rail carried the
 * identical leftover from the identical flip. Kind words KEEPS its fade —
 * still an ink band, still dissolving into ink.
 */
export default function BlogRailBand({
  posts,
  kicker = "Blog",
  title = "Notes from the studio",
  linkHref = "/blog",
  linkLabel = "All entries",
  railLabel = "Latest blog posts",
}: {
  posts: JournalEntry[];
  kicker?: string;
  title?: ReactNode;
  linkHref?: string;
  linkLabel?: string;
  /** Accessible name for the rail region. */
  railLabel?: string;
}) {
  if (posts.length === 0) return null;

  return (
    // LIGHT, 2026-08-09 (client: "Blog: Light BG" on the homepage) — the
    // same bg-bone + grain-light recipe as its now-light siblings. tone
    // threads through CollectionHeader, the Carousel folio and every
    // BlogTeaserCard.
    <section className="relative grain-light bg-bone py-24 text-ink md:py-32">
      <div className="shell">
        <CollectionHeader
          kicker={kicker}
          title={title}
          linkHref={linkHref}
          linkLabel={linkLabel}
          tone="light"
        />
        <div className="reveal" style={{ transitionDelay: "120ms" }}>
          <Carousel
            ariaLabel={railLabel}
            className="mt-14 md:mt-20"
            slideClassName="w-[76vw] sm:w-[48%] lg:w-[calc((100%-4rem)/3)]"
            tone="light"
          >
            {posts.map((post) => (
              <BlogTeaserCard key={post.slug} post={post} tone="light" />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
