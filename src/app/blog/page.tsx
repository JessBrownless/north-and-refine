import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

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

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <PageHero
        overline="The Blog"
        title="Notes from the studio."
        lede="Writing on design, branding, SEO and conversion for practices in medical aesthetics and cosmetic surgery."
      />

      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          {posts.length > 0 ? (
            <div className="divide-y rule-dark border-y rule-dark">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 reveal md:items-center rule-dark"
                  style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  <div className="md:col-span-2">
                    <p className="overline">{getCategoryLabel(post.frontmatter.category)}</p>
                    <p className="label text-clay mt-2">{formatDate(post.frontmatter.publishedAt)}</p>
                  </div>
                  <div className="md:col-span-6">
                    <h2 className="card-title text-bone line-clamp-2 transition-opacity group-hover:opacity-70">
                      {post.frontmatter.title}
                    </h2>
                    <p className="body mt-2 line-clamp-2 text-bone-dim">{post.frontmatter.description}</p>
                    <p className="label mt-3 text-clay">{post.readingMinutes} min read</p>
                  </div>
                  {/* Image slot — featuredImage, or quiet parchment until one
                      lands. 16:10 per the ratio canon (blog imagery is
                      figures); no hover motion (drift rule 14). */}
                  <div className="md:col-span-3 md:col-start-9">
                    <div className="frame aspect-[16/10]">
                      {post.frontmatter.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.frontmatter.featuredImage}
                          alt={post.frontmatter.featuredImageAlt ?? ""}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                          <span className="index-num text-ink/30" aria-hidden>✦</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-1 hidden md:flex justify-end">
                    <span className="text-bone-dim transition group-hover:translate-x-1 group-hover:text-champagne" aria-hidden>
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="body text-bone-dim">The first entries are being written. Check back soon.</p>
          )}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
