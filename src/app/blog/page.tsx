import type { Metadata } from "next";
import { getAllPosts, getCategoryLabel, JOURNAL_CATEGORIES } from "@/lib/journal";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import BlogList, { type BlogCard, type BlogFilterOption } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog — Design, branding & SEO for aesthetic practices",
  description:
    "Practical writing on web design, branding, SEO and conversion for medical aesthetic and cosmetic surgery practices, from the North & Refine studio.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // Pre-serialise the cards + filter options here (server) so the client
  // <BlogList> imports nothing from @/lib/journal (server-only fs code).
  const cards: BlogCard[] = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.frontmatter.category,
    categoryLabel: getCategoryLabel(post.frontmatter.category),
    dateLabel: formatDate(post.frontmatter.publishedAt),
    readingMinutes: post.readingMinutes,
    featuredImage: post.frontmatter.featuredImage ?? null,
    featuredImageAlt: post.frontmatter.featuredImageAlt ?? null,
  }));
  // Only the categories that actually have posts, in the canonical order.
  const filters: BlogFilterOption[] = JOURNAL_CATEGORIES.filter((c) =>
    posts.some((p) => p.frontmatter.category === c),
  ).map((c) => ({ value: c, label: getCategoryLabel(c) }));

  return (
    /* BACK ON INK (2026-07-16, hero-cohesion pass): the 2026-07-12
       light-topped exploration + experimental glow left with the sweep —
       every hero now opens on the same flat ink ground ("/blog" removed
       from Navbar's LIGHT_TOP_ROUTES; the glow prop is deleted from
       PageHero). The LISTING below keeps its bone ground — sections may
       alternate; only the hero rejoined the ink family — so main stays
       bg-bone for the seams below the hero. Post DETAIL pages
       (/blog/[slug]) were always dark. */
    <main className="bg-bone">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* The canonical interior masthead (split, spacious, borderBottom).
          ⚠ H1: reader-facing, not studio-process ("the craft behind the
          work" read as behind-the-scenes; this is a blog FOR practices, not
          a how-we-work page). Medium length for the display face. Swap
          freely. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="The Blog"
        title={
          <>
            Notes on brand, web and <em>trust.</em>
          </>
        }
        lede="Writing on design, branding, SEO and conversion for practices in medical aesthetics and cosmetic surgery."
      />

      {/* The category filter strip + the (client-filtered) post list. The
          strip's top rule is the hero's borderBottom; all posts render into
          the DOM server-side (SEO), the client only shows/hides. */}
      {cards.length > 0 ? (
        <BlogList cards={cards} filters={filters} />
      ) : (
        <section className="scene-warm text-ink">
          <div className="shell py-16 md:py-24">
            <p className="body text-ink-dim">
              The first entries are being written. Check back soon.
            </p>
          </div>
        </section>
      )}

      <ContactCTA />
    </main>
  );
}
