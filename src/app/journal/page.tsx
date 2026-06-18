import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Journal — Design, branding & SEO for aesthetic practices",
  description:
    "Practical writing on web design, branding, SEO and conversion for medical aesthetic and cosmetic surgery practices, from the North & Refine studio.",
  alternates: { canonical: "/journal" },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function JournalIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />

      <PageHero
        overline="The Journal"
        title="What we've learned, written down."
        lede="Field notes on design, branding, SEO and conversion for practices in medical aesthetics and cosmetic surgery."
      />

      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          {posts.length > 0 ? (
            <div className="divide-y rule-dark border-y rule-dark">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 reveal items-baseline"
                  style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  <div className="md:col-span-3">
                    <p className="overline text-champagne">{getCategoryLabel(post.frontmatter.category)}</p>
                    <p className="label text-clay mt-2">{formatDate(post.frontmatter.publishedAt)}</p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="heading-md text-bone transition-opacity group-hover:opacity-70">
                      {post.frontmatter.title}
                    </h2>
                    <p className="body mt-2 text-bone-dim">{post.frontmatter.description}</p>
                    <p className="label mt-3 text-clay">{post.readingMinutes} min read</p>
                  </div>
                  <div className="md:col-span-1 hidden md:flex justify-end">
                    <span className="text-champagne transition-transform group-hover:translate-x-1" aria-hidden>
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
