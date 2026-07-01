// MDX rendering: next-mdx-remote/rsc — compiles the case-study body read from
// content/work at build time inside this Server Component.
import type { Metadata } from "next";
import Link from "next/link";
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
import { proseMdxComponents } from "../../../../mdx-components";
import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";
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
    components: proseMdxComponents,
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

      {/* Hero */}
      <section className="relative grain scene-ink overflow-hidden">
        <div className="shell-wide pt-36 pb-12 md:pt-48 md:pb-16 relative z-10">
          <p className="overline text-champagne reveal">
            {getSectorLabel(fm.sector)} · {fm.year}
          </p>
          <h1 className="heading-xl text-bone from-overline max-w-4xl reveal" style={{ transitionDelay: "80ms" }}>
            {fm.title}
          </h1>
          {fm.summary && (
            <p className="lede body-lg text-bone-dim max-w-2xl reveal" style={{ transitionDelay: "160ms" }}>
              {fm.summary}
            </p>
          )}
        </div>
      </section>

      {/* Hero media — the responsive device cluster (BrowserMockup anchored
          right, PhoneMockup overlapping its lower-left corner). The canonical
          showcase pattern from the original homepage hero. */}
      {fm.heroImage && (
        <div className="shell-wide relative z-10 mb-20 md:mb-28">
          <div className="relative">
            {/* Ambient glow behind the cluster */}
            <div
              aria-hidden
              className="absolute inset-0 -m-10 rounded-[40%] bg-champagne/15 blur-3xl"
            />
            <div className="relative sm:ml-20 md:ml-32 lg:ml-44">
              <BrowserMockup
                screenshot={fm.heroImage}
                screenshotAlt={fm.heroImageAlt ?? fm.title}
                domain={domainLabel}
                className="rotate-[0.5deg] reveal"
              />
            </div>
            {fm.mobileImage && (
              <div
                className="absolute -bottom-10 left-0 hidden sm:block md:-bottom-14 reveal"
                style={{ transitionDelay: "160ms" }}
              >
                <div className="-rotate-[7deg] animate-float-slower">
                  <PhoneMockup
                    screenshot={fm.mobileImage}
                    screenshotAlt={fm.mobileImageAlt ?? ""}
                    size="md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Project facts */}
      <section className="shell py-12 md:py-16">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y rule-dark py-8">
          <div>
            <dt className="overline text-clay">Client</dt>
            <dd className="body text-bone mt-2">{fm.client}</dd>
          </div>
          <div>
            <dt className="overline text-clay">Sector</dt>
            <dd className="body text-bone mt-2">{getSectorLabel(fm.sector)}</dd>
          </div>
          <div>
            <dt className="overline text-clay">Services</dt>
            <dd className="body text-bone mt-2">{fm.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="overline text-clay">{fm.url ? "Live" : "Year"}</dt>
            <dd className="body text-bone mt-2">
              {fm.url ? (
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
              )}
            </dd>
          </div>
        </dl>
      </section>

      {/* Outcomes — a dedicated stats band, big champagne numerals */}
      {fm.metrics && fm.metrics.length > 0 && (
        <section className="border-y rule-dark bg-ink-raised/30">
          <div className="shell py-14 md:py-20">
            <p className="overline text-champagne reveal">The results</p>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {fm.metrics.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className="reveal sm:border-l sm:border-ink-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="stat text-champagne">{m.value}</p>
                  <p className="label text-bone-dim mt-3">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body — reading column with asymmetric figure breakouts: figures
          escape the measure, alternating reach (odd wider right, even pulled
          left) for an editorial left-right rhythm. */}
      <article className="shell pb-8 pt-4 overflow-x-clip">
        <div className="max-w-[720px] [&>h2]:mt-16 [&>h3]:mt-10 [&>*:first-child]:mt-0 [&>figure]:my-12 md:[&>figure]:my-16 [&>figure]:md:w-[calc(100%+8rem)] [&>figure:nth-of-type(odd)]:lg:w-[calc(100%+20rem)] [&>figure:nth-of-type(even)]:lg:w-[calc(100%+14rem)] [&>figure:nth-of-type(even)]:lg:-ml-12">
          {content}
        </div>
      </article>

      {/* Next project */}
      <section className="shell py-16 border-t rule-dark">
        <Link href={`/work/${next.slug}`} className="group block">
          <p className="overline text-clay">Next project</p>
          <h2 className="heading-lg text-bone mt-3 transition-opacity group-hover:opacity-70">
            {next.frontmatter.title}
          </h2>
        </Link>
      </section>

      <ContactCTA />
    </main>
  );
}
