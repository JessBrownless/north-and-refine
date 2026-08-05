// MDX rendering: next-mdx-remote/rsc — compiles the case-study body read from
// content/work at build time inside this Server Component.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {
  getAllProjects,
  getAllSlugs,
  getProjectBySlug,
  getSectorLabel,
} from "@/lib/work";
import { caseStudySchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import ArticleHeader from "@/components/ArticleHeader";
import CaseStudyDeviceCluster from "@/components/CaseStudyDeviceCluster";
import ResultsBand from "@/components/ResultsBand";
import CaseStudyProseGrid, {
  caseStudyProseComponents,
} from "@/components/CaseStudyProseGrid";
import CaseStudyQuoteBand from "@/components/CaseStudyQuoteBand";
import NextProjectBand from "@/components/NextProjectBand";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const fm = project.frontmatter;
  const canonical = `/work/${project.slug}`;
  const ogImage = absoluteUrl(fm.heroImage);

  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url: canonical,
      ...(ogImage ? { images: [{ url: ogImage, alt: fm.heroImageAlt ?? fm.title }] } : {}),
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const fm = project.frontmatter;

  const { content } = await compileMDX({
    source: project.content,
    // The h2-as-kicker rule lives with the grid it is placed on.
    components: caseStudyProseComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  // Next project for the footer nav.
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[(idx + 1) % all.length];

  // Address-bar label for the hero browser mockup: explicit frontmatter
  // domain, else the live URL's host, else the client name.
  const domainLabel =
    fm.domain ??
    (fm.url ? new URL(fm.url).hostname.replace(/^www\./, "") : fm.client);

  return (
    <main className="bg-ink">
      <JsonLd
        data={[
          caseStudySchema({
            title: fm.title,
            description: fm.description,
            slug: project.slug,
            client: fm.client,
            publishedAt: fm.publishedAt,
            updatedAt: fm.updatedAt,
            services: fm.services,
            image: fm.heroImage,
            liveUrl: fm.url,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: fm.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      {/* Hero — title left, stacked project meta right (editorial pattern).
          The article-header rules it follows live in <ArticleHeader>. */}
      <section className="relative grain scene-ink overflow-hidden">
        <ArticleHeader
          className="shell-wide pt-16 pb-12 md:pt-24 md:pb-16 relative z-10"
          kicker={
            <>
              {getSectorLabel(fm.sector)} · {fm.year}
            </>
          }
          title={fm.title}
          lede={fm.summary}
          facts={[
            { term: "Client", value: fm.client },
            { term: "Sector", value: getSectorLabel(fm.sector) },
            { term: "Services", value: fm.services.join(", ") },
            {
              term: fm.url ? "Live" : "Year",
              value: fm.url ? (
                <a
                  href={fm.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-champagne underline underline-offset-4 hover:opacity-70"
                >
                  Visit site →
                </a>
              ) : (
                fm.year
              ),
            },
          ]}
          /* Hero media — the responsive device cluster lives INSIDE the hero
             section so the flat ink scene runs unbroken behind the lockup and
             the mockups alike. */
          media={
            fm.heroImage && (
              <CaseStudyDeviceCluster
                desktopImage={fm.heroImage}
                desktopAlt={fm.heroImageAlt ?? fm.title}
                domain={domainLabel}
                mobileImage={fm.mobileImage}
                mobileAlt={fm.mobileImageAlt ?? ""}
              />
            )
          }
        />
      </section>

      {/* Outcomes — the figures come from frontmatter and only from there. */}
      <ResultsBand metrics={fm.metrics ?? []} />

      <CaseStudyProseGrid>{content}</CaseStudyProseGrid>

      {fm.testimonial && (
        <CaseStudyQuoteBand
          quote={fm.testimonial.quote}
          author={fm.testimonial.author}
          role={fm.testimonial.role}
        />
      )}

      <NextProjectBand
        href={`/work/${next.slug}`}
        title={next.frontmatter.title}
      />

      <ContactCTA />
    </main>
  );
}
