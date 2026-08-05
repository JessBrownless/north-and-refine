// MDX rendering: next-mdx-remote/rsc — compiles the blog entry body read
// from content/blog at build time inside this Server Component.
import type { Metadata } from "next";
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
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFeaturedFigure from "@/components/ArticleFeaturedFigure";
import ArticleProseWell from "@/components/ArticleProseWell";
import StudioBioCard from "@/components/StudioBioCard";
import ArticleFootBackLink from "@/components/ArticleFootBackLink";
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
  const canonical = `/blog/${post.slug}`;
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

export default async function BlogPostPage({
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
            { name: "Blog", path: "/blog" },
            { name: fm.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="pb-8">
        {/* One .shell wrapper (2026-07-10 sweep): the reading column sits on
            the shared left rail, not centred — only work/[slug] holds the
            shell-wide licence. */}
        <div className="shell">
        {/* Header + featured image. The measures are passed as "" because
            this column already caps at 720px; the article-header rules the
            block follows live in <ArticleHeader>. The figure rides the media
            slot so it renders OUTSIDE that cap and keeps its 880px canvas. */}
        <ArticleHeader
          className="max-w-[720px] pt-16 md:pt-24"
          kicker={getCategoryLabel(fm.category)}
          title={fm.title}
          lede={fm.description}
          byline={byline}
          titleMeasure=""
          ledeMeasure=""
          media={
            fm.featuredImage && (
              <ArticleFeaturedFigure
                src={fm.featuredImage}
                alt={fm.featuredImageAlt ?? ""}
                caption={fm.featuredImageCaption}
              />
            )
          }
        />

        {/* Body */}
        <ArticleProseWell>{content}</ArticleProseWell>

        {/* Studio bio — the boilerplate byline; its copy is the component's
            own, since every entry publishes under the studio's name. */}
        <StudioBioCard />

        <ArticleFootBackLink href="/blog" label="More from the Blog" />
        </div>
      </article>

      <ContactCTA />
    </main>
  );
}
