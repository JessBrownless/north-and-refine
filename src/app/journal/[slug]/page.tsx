// MDX rendering: next-mdx-remote/rsc — compiles the Journal entry body read
// from content/journal at build time inside this Server Component.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {
  getAllSlugs,
  getPostBySlug,
  getCategoryLabel,
} from "@/lib/journal";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, absoluteUrl } from "@/lib/site";
import { proseMdxComponents } from "../../../../mdx-components";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const canonical = `/journal/${post.slug}`;
  const ogImage = absoluteUrl(fm.featuredImage);

  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url: canonical,
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      authors: [fm.author ?? SITE.name],
      ...(ogImage ? { images: [{ url: ogImage, alt: fm.featuredImageAlt ?? fm.title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: fm.title,
      description: fm.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const author = fm.author ?? SITE.name;

  const { content } = await compileMDX({
    source: post.content,
    components: proseMdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const byline = `${author} · ${post.readingMinutes} min read · ${formatDate(fm.publishedAt)}`;

  return (
    <main className="bg-ink text-bone">
      <JsonLd
        data={[
          articleSchema({
            title: fm.title,
            description: fm.description,
            slug: post.slug,
            publishedAt: fm.publishedAt,
            updatedAt: fm.updatedAt,
            section: getCategoryLabel(fm.category),
            image: fm.featuredImage,
            author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: fm.title, path: `/journal/${post.slug}` },
          ]),
        ]}
      />

      <article className="pb-8">
        {/* Header */}
        <header className="mx-auto max-w-[720px] px-6 md:px-8 pt-36 md:pt-48 reveal">
          <div className="flex flex-col">
            <p className="overline text-champagne">{getCategoryLabel(fm.category)}</p>
            <h1 className="heading-xl from-overline">{fm.title}</h1>
          </div>
          <p className="lede body-lg text-bone-dim">{fm.description}</p>
          <p className="overline text-clay mt-8">{byline}</p>
        </header>

        {/* Featured image */}
        {fm.featuredImage && (
          <figure className="mx-auto max-w-[880px] px-6 md:px-8 mt-12 md:mt-16">
            <div className="frame rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fm.featuredImage}
                alt={fm.featuredImageAlt ?? ""}
                className="w-full h-auto"
              />
            </div>
            {fm.featuredImageCaption && (
              <figcaption className="label mt-3 text-clay">{fm.featuredImageCaption}</figcaption>
            )}
          </figure>
        )}

        {/* Body */}
        <div className="mx-auto max-w-[720px] px-6 md:px-8 mt-12 md:mt-16 [&>h2]:mt-16 [&>h2+*]:mt-4 [&>h3]:mt-10 [&>*:first-child]:mt-0">
          {content}
        </div>

        {/* Studio bio */}
        <aside className="mx-auto max-w-[720px] px-6 md:px-8 mt-16 pt-10 border-t rule-dark">
          <p className="overline text-clay">Written by</p>
          <p className="heading-md text-bone mt-4">{SITE.name}</p>
          <p className="body mt-3 text-bone-dim">
            A specialist design studio building considered brands and SEO-led websites for medical
            aesthetic and cosmetic surgery practices.
          </p>
          <Link href="/about" className="btn-ghost text-champagne mt-5 inline-flex">
            About the studio <span aria-hidden>→</span>
          </Link>
        </aside>

        <div className="mx-auto max-w-[720px] px-6 md:px-8 mt-10 pt-8 border-t rule-dark">
          <Link href="/journal" className="btn-ghost text-bone">
            <span aria-hidden>←</span> More from the Journal
          </Link>
        </div>
      </article>

      <ContactCTA />
    </main>
  );
}
