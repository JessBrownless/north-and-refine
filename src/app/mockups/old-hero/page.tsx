import type { Metadata } from "next";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import ContactCTA from "@/components/ContactCTA";
import Deck, { type DeckSlide } from "@/components/Deck";
import LogoStrip, { type LogoStripItem } from "@/components/LogoStrip";
import ServicesShowcase from "@/components/ServicesShowcase";
import { getAllPosts } from "@/lib/journal";
import { getFeaturedProjects, getSectorLabel, type WorkEntry, type WorkSector } from "@/lib/work";

// COMPARISON MOCKUP — ⚠ FROZEN (client's request, 2026-07-10): the verdict
// went to the NEW hero; this page is kept as a HISTORICAL REFERENCE of the
// pre-redesign Deck hero (74ec384) on the body as it stood the night of the
// comparison. DO NOT sync its body with the evolving site, do not update,
// do not delete. Internal only; /mockups is robots-disallowed.
export const metadata: Metadata = {
  title: "Old hero comparison — design exploration",
  robots: { index: false, follow: false },
};

const DECK_ORDER: WorkSector[] = [
  "dermatology",
  "cosmetic-surgery",
  "medical-aesthetics",
  "cosmetic-surgery",
  "dermatology",
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function OldHeroComparisonPage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 6);

  const featuredBySector = new Map<WorkSector, WorkEntry>();
  for (const p of getFeaturedProjects()) {
    if (!featuredBySector.has(p.frontmatter.sector)) {
      featuredBySector.set(p.frontmatter.sector, p);
    }
  }
  const captureFallback = getFeaturedProjects().find((p) => p.frontmatter.thumbImage);
  const deckSlides: DeckSlide[] = DECK_ORDER.map((sector) => {
    const project = featuredBySector.get(sector);
    if (project?.frontmatter.thumbImage) {
      return {
        title: project.frontmatter.client,
        tag: getSectorLabel(project.frontmatter.sector),
        href: `/work/${project.slug}`,
        screenshot: project.frontmatter.thumbImage,
        screenshotAlt: project.frontmatter.thumbImageAlt ?? `${project.frontmatter.client} — website`,
      };
    }
    return {
      title: captureFallback ? captureFallback.frontmatter.client : getSectorLabel(sector),
      tag: captureFallback ? getSectorLabel(captureFallback.frontmatter.sector) : "Selected work",
      href: captureFallback ? `/work/${captureFallback.slug}` : undefined,
      screenshot: captureFallback?.frontmatter.thumbImage,
      screenshotAlt: captureFallback?.frontmatter.thumbImageAlt ?? "Website capture",
    };
  });

  const logoStripItems: LogoStripItem[] = featured.map((project) => ({
    name: project.frontmatter.client,
    href: `/work/${project.slug}`,
  }));

  return (
    <main className="bg-ink text-bone">
      {/* ══ THE OLD HERO (74ec384, verbatim) — centred lockup over the
          fanned auto-cycling Deck, crown glow + grain scoped here. ══ */}
      <section className="grain relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[90vh]"
            style={{
              background:
                "radial-gradient(90% 100% at 50% 0%, color-mix(in srgb, var(--champagne) 11%, var(--ink)) 0%, var(--ink) 70%)",
            }}
          />
        </div>
        <div className="shell-wide relative z-10 flex min-h-[100svh] flex-col md:min-h-[120vh]">
          <div className="flex flex-1 flex-col justify-center pt-24 pb-8 text-center md:pt-32 md:pb-10">
            <div className="mx-auto max-w-5xl">
              <p className="overline opacity-0 animate-track-in">The studio behind</p>
              <h1
                className="display from-overline mx-auto max-w-4xl text-balance opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                Practices that Patients Trust
              </h1>
            </div>
            <p
              className="lede body-lg mx-auto max-w-2xl text-bone/80 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              Brand, web design and SEO for cosmetic surgeons, medical aesthetic
              clinics and dermatology practices.
            </p>
          </div>
          <div
            className="relative z-10 -mb-10 opacity-0 animate-fade-in md:-mb-20"
            style={{ animationDelay: "1.5s", animationDuration: "1.4s" }}
          >
            <Deck slides={deckSlides} />
          </div>
        </div>
      </section>

      <div className="pt-10 md:pt-14">
        <LogoStrip items={logoStripItems} />
      </div>

      {/* ══ EVERYTHING BELOW = the CURRENT homepage body, unchanged. ══ */}
      <section className="py-32 md:py-44">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">The studio</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-baseline md:gap-8">
            <p className="heading-xl max-w-[24ch] text-balance reveal md:col-span-8">
              A studio that treats the clinic&rsquo;s digital presence with the
              same care as the practice <em>itself</em>.
            </p>
            <div className="md:col-span-4">
              <p className="body text-bone-dim reveal" style={{ transitionDelay: "120ms" }}>
                We exist for one kind of client: the practice whose standard of
                care outruns its website. Clinicians spend years earning trust
                in the room — then hand the first impression to a template.
              </p>
              <p className="body mt-5 text-bone-dim reveal" style={{ transitionDelay: "200ms" }}>
                So we take on a few projects at a time and design everything —
                identity, site, search — as one piece. It reads calm because it
                is considered, and it ranks because the foundations are built
                for search from day one.
              </p>
              <div className="mt-8 reveal" style={{ transitionDelay: "280ms" }}>
                <Link href="/about" className="btn-ghost text-bone">
                  Our story <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">What we do</p>
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <ServicesShowcase />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
            <div>
              <p className="overline reveal">Selected work</p>
              <h2 className="heading-part from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve <em>refined</em>
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-bone reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2">
            {featured.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`group block reveal ${i % 2 === 1 ? "md:mt-28" : ""}`}
                style={{ transitionDelay: `${(i % 2) * 120}ms` }}
              >
                <div className="frame aspect-[16/10]">
                  {project.frontmatter.thumbImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.frontmatter.thumbImage}
                      alt={project.frontmatter.thumbImageAlt ?? `${project.frontmatter.client} — website design`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                      <span className="index-num text-ink/25" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t rule-dark pt-4">
                  <h3 className="heading-lg transition-opacity group-hover:opacity-70">
                    <em>{project.frontmatter.client}</em>
                  </h3>
                  <span className="overline text-clay">
                    {project.frontmatter.services.slice(0, 2).join(" · ")}
                  </span>
                </div>
                {project.frontmatter.summary && (
                  <p className="body-sm mt-3 max-w-[52ch] text-bone-dim">
                    {project.frontmatter.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">Kind words</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:[align-items:last_baseline] md:gap-8">
            <div className="reveal md:col-span-4">
              <div className="frame aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/plates/kind-words-rowen-phone-05.jpg"
                  alt="A phone on travertine displaying the Dr Yalda Jamali mobile site — brand and web design by North & Refine"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <blockquote
                className="statement max-w-[24ch] text-balance reveal"
                style={{ transitionDelay: "80ms" }}
              >
                &ldquo;Placeholder — the client&rsquo;s real words will sit
                here. We don&rsquo;t write these <em>ourselves</em>.&rdquo;
              </blockquote>
              <div
                className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t rule-dark pt-5 reveal"
                style={{ transitionDelay: "160ms" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/testimonials/client-avatar.jpg"
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <p className="body-sm text-bone">Dr Yalda Jamali</p>
                <span aria-hidden className="hidden h-3 w-px bg-bone/15 sm:block" />
                <p className="body-sm text-bone-dim">Cosmetic doctor — real words to come</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="shell">
            <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
              <div>
                <p className="overline reveal">Blog</p>
                <h2 className="heading-part from-overline reveal" style={{ transitionDelay: "80ms" }}>
                  Notes from the studio
                </h2>
              </div>
              <Link href="/blog" className="btn-ghost text-bone reveal">
                All entries <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <Carousel
                ariaLabel="Latest blog posts"
                className="mt-14 md:mt-20"
                slideClassName="w-[76vw] sm:w-[48%] lg:w-[30%]"
              >
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
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
                    <p className="overline mt-6 text-clay">{formatDate(post.frontmatter.publishedAt)}</p>
                    <h3 className="heading-sm mt-3 max-w-[28ch] text-bone transition-opacity group-hover:opacity-70">
                      {post.frontmatter.title}
                    </h3>
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </main>
  );
}
