// MDX rendering: next-mdx-remote/rsc — compiles the case-study body read from
// content/work at build time inside this Server Component.
import type { MDXComponents } from "mdx/types";
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

// Case-study prose follows the editorial two-column pattern: each h2 renders
// as a small kicker in the LEFT rail, sharing a grid row with the statement
// paragraph beside it (globals' `.prose-work > h2 + p` styles the statement
// and matches this mt-28 so their tops align).
const workProseComponents: MDXComponents = {
  ...proseMdxComponents,
  h2: ({ children, ...props }) => (
    <h2
      className="overline mt-16 lg:mt-28 lg:col-span-3 lg:col-start-2"
      {...props}
    >
      {children}
    </h2>
  ),
};

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
    components: workProseComponents,
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

      {/* Hero — title left, stacked project meta right (editorial pattern) */}
      <section className="relative grain scene-ink overflow-hidden">
        <div className="shell-wide pt-36 pb-12 md:pt-48 md:pb-16 relative z-10 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-baseline">
          <div className="lg:col-span-8">
            <p className="overline reveal">
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

          {/* Meta rail */}
          <dl
            className="mt-12 grid grid-cols-2 gap-8 lg:mt-0 lg:block lg:space-y-7 lg:col-span-3 lg:col-start-10 reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <div>
              <dt className="overline text-clay">Client</dt>
              <dd className="body text-bone mt-1.5">{fm.client}</dd>
            </div>
            <div>
              <dt className="overline text-clay">Sector</dt>
              <dd className="body text-bone mt-1.5">{getSectorLabel(fm.sector)}</dd>
            </div>
            <div>
              <dt className="overline text-clay">Services</dt>
              <dd className="body text-bone mt-1.5">{fm.services.join(", ")}</dd>
            </div>
            <div>
              <dt className="overline text-clay">{fm.url ? "Live" : "Year"}</dt>
              <dd className="body text-bone mt-1.5">
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
        </div>

        {/* Hero media — the responsive device cluster (BrowserMockup anchored
            right, PhoneMockup overlapping its lower-left corner) lives INSIDE
            the hero section so the flat ink scene runs unbroken behind the
            lockup and the mockup alike. */}
        {fm.heroImage && (
          <div className="shell-wide relative z-10 pb-24 md:pb-32">
          <div className="relative">
            {/* (Cluster glow retired with every background gradient 2026-07-09.) */}
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
                <div className="-rotate-[7deg]">
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
      </section>

      {/* Outcomes — a dedicated stats band, big bone numerals */}
      {fm.metrics && fm.metrics.length > 0 && (
        <section className="border-y rule-dark bg-ink-raised/30">
          <div className="shell py-14 md:py-20">
            <p className="overline reveal">The results</p>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {fm.metrics.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className="reveal sm:border-l sm:border-ink-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="stat text-bone">{m.value}</p>
                  <p className="label text-bone-dim mt-3">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body — editorial two-column grid on the WIDE canvas: figures span
          the near-full-width shell (or pair 6+6), while kickers and copy sit
          grid-indented at a reading measure. h2 kickers hold the LEFT rail;
          statements and copy flow in the right column. */}
      <article className="shell-wide pb-8 pt-12 md:pt-16">
        <div className="prose-work lg:grid lg:grid-cols-12 lg:gap-x-10 [&>*:not(h2):not(figure)]:lg:col-start-7 [&>*:not(h2):not(figure)]:lg:col-span-5 [&>*:first-child]:mt-0 [&>h3]:mt-10 [&>figure]:my-12 md:[&>figure]:my-20 [&>figure]:lg:col-start-2 [&>figure]:lg:col-span-10 [&>figure:has(+figure)]:lg:col-start-2 [&>figure:has(+figure)]:lg:col-span-5 [&>figure+figure]:lg:col-start-7 [&>figure+figure]:lg:col-span-5">
          {content}
        </div>
      </article>

      {/* Client testimonial — a centred interruption to the editorial
          left-right rhythm */}
      {fm.testimonial && (
        <section className="relative border-t rule-dark scene-ink grain overflow-hidden">
          <div className="shell py-20 md:py-28 text-center relative z-10">
            <p className="overline reveal">In the client&rsquo;s words</p>
            <blockquote
              className="statement text-bone max-w-[28ch] text-balance mx-auto mt-8 reveal"
              style={{ transitionDelay: "80ms" }}
            >
              &ldquo;{fm.testimonial.quote}&rdquo;
            </blockquote>
            <p className="label text-bone-dim mt-8 reveal" style={{ transitionDelay: "160ms" }}>
              {fm.testimonial.author}
              {fm.testimonial.role ? ` · ${fm.testimonial.role}` : ""}
            </p>
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="shell py-16 border-t rule-dark">
        <Link href={`/work/${next.slug}`} className="group block">
          <p className="overline text-clay">Next project</p>
          <h2 className="heading-lg text-bone from-overline transition-opacity group-hover:opacity-70">
            {next.frontmatter.title}
          </h2>
        </Link>
      </section>

      <ContactCTA />
    </main>
  );
}
