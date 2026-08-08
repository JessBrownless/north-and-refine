import type { Metadata } from "next";
import { getAllPosts, getCategoryLabel, JOURNAL_CATEGORIES } from "@/lib/journal";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import BlogList, { type BlogCard, type BlogFilterOption } from "@/components/BlogList";
import BlogEmptyState from "@/components/BlogEmptyState";

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
    /* HERO BACK ON BONE (2026-08-09, client: "hero: Light BG" on /blog) —
       reversing the 2026-07-16 hero-cohesion call that put it back on ink.
       This now makes /blog a SINGLE CONTINUOUS BONE GROUND top to bottom:
       the hero and the listing below were already the same colour in
       every case except this one, so the flip removes the page's one
       ink→bone cut rather than introducing a new seam. PageHero's own
       tone="light" branch already picks rule-light for borderBottom, so
       the hero's foot hairline reads as a soft divider on a continuous
       ground rather than a colour boundary. Registered in Navbar's
       LIGHT_TOP_ROUTES (required by PageHero's own tone="light" contract,
       or the unscrolled nav renders bone-on-bone). Post DETAIL pages
       (/blog/[slug]) are unaffected — always dark, untouched here. */
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
        tone="light"
        /* "Blog", not "The Blog" (2026-08-05): the kicker is the page name
           exactly as the nav says it, article included. */
        overline="Blog"
        title={
          <>
            Notes on web, brand and <em>trust.</em>
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
        <BlogEmptyState />
      )}

      <ContactCTA />
    </main>
  );
}
