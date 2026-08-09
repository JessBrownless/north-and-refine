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
 * than left unpassed, following ManifestoTrack's precedent for retiring a
 * prop whose last consumer has gone.
 *
 * ⚠ THE REASON IS THE CLIENT'S INSTRUCTION, NOT THE GROUND — and that
 * distinction matters now, because the ground has since changed back. The
 * fade was REPORTED while this band was bone, where an ink overlay washed a
 * light band out on the way past; the band returned to ink hours later, so
 * "a light band cuts rather than dissolves" no longer describes anything
 * here. What stands is simply that she asked for the fade gone. Do not
 * reinstate it on the grounds that the band is dark again; that would be
 * reading the old rationale back as permission.
 *
 * TWO BANDS HAD IT, and only one was reported: the blog rail carried the
 * identical overlay and lost it in the same change. Kind words KEEPS its
 * fade — it was never part of the complaint.
 *
 * LIGHT AGAIN 2026-08-09 (client: "can you make blog, kind words and what we
 * do on the homepage be light background by default"). Third ground call on
 * this band in one day — light, then dark with "make all sections dark by
 * default", now light again — which is precisely why the `tone` props were
 * KEPT through the dark revert rather than stripped: this flip is a one-word
 * change per consumer instead of a re-plumb of five molecules.
 *
 * ⚠ THE SELECTION IS NOT THE SAME AS LAST TIME. Selected work stays DARK now
 * (it did not before) and Kind words joins the light run (it never was), so
 * the page reads dark · dark · dark · LIGHT · LIGHT · LIGHT · dark: one light
 * act of three bands in the middle rather than alternating stripes. Do not
 * "restore" the earlier grouping from git — it was a different arrangement.
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
    // LIGHT AGAIN 2026-08-09 — see the ground note in the docblock above.
    // tone threads back through CollectionHeader, the Carousel folio and
    // every BlogTeaserCard.
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
