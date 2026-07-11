import Link from "next/link";
import Deck, { type DeckSlide } from "@/components/Deck";
import ManifestoStatement from "@/components/ManifestoStatement";
import { getFeaturedProjects, getSectorLabel, type WorkEntry, type WorkSector } from "@/lib/work";
import { getAllPosts } from "@/lib/journal";
import LogoStrip, { type LogoStripItem } from "@/components/LogoStrip";
import ServicesShowcase from "@/components/ServicesShowcase";
import Carousel from "@/components/Carousel";
import ContactCTA from "@/components/ContactCTA";

// Homepage — TYPE-LED, FLAT, EDITED (decided 2026-07-09, "rip up the rule
// book"; tightened same day: "everything should earn its place"). The page
// works the way the studio's own Instagram posts work: huge Saol on flat
// warm ink, one italic accent word per statement, quiet kickers, hairlines,
// air. Nothing performs (no deck, no blend tricks, no scroll pin, no
// ambient pools, no grain, no exit fades, no marquee — all parked in the
// system, none invited here). Imagery: the hero plate (Rowen 5 portrait in
// the masthead's dead corner), the work captures (Selected work), and the
// close plate (Rowen 8 landscape in ContactCTA) — the two Rowen frames
// bookend the page: same room, same suite, the client's site on screen.
//
// Cut in the earn-its-place pass (2026-07-09 evening): the hero disciplines
// list, the proof four-up, the service-row leads, the "Who we work with"
// industries section, and the CTA's email/location rail. ("Kind words"
// was also cut that day, then returned the same evening as ONE visibly-
// placeholder testimonial after Selected work — see the section note.)
// The receipts strip (2026-07-09's compact return of the proof numbers)
// was cut for good 2026-07-10: audited against what we can actually
// stand behind, the numbers were positioning claims or too weak to
// publish. Real, client-approved metrics belong inside their case
// studies (work frontmatter `metrics`) when they exist — not here.

// One Selected-work plate — shared by the desktop pair grid and the mobile
// contact-sheet rail (2026-07-11: four stacked captures made the phone page
// a scroll marathon; the rail holds all four in one beat, reader-driven).
function WorkPlate({
  project,
  className = "",
  delay = 0,
}: {
  project: WorkEntry;
  className?: string;
  delay?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <div className="frame aspect-[16/10]">
        {project.frontmatter.thumbImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.frontmatter.thumbImage}
            alt={project.frontmatter.thumbImageAlt ?? `${project.frontmatter.client} — website design`}
            loading="lazy"
            className="plate-develop absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <span className="portrait-fill absolute inset-0 flex items-center justify-center">
            <span className="index-num text-ink/25" aria-hidden>
              ✦
            </span>
          </span>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t rule-dark pt-4">
        {/* .card-title (2026-07-11): card titles are captions, not headings —
            sans, shared with the blog teasers; no Saol em accent. */}
        <h3 className="card-title text-bone transition-opacity group-hover:opacity-70">
          {project.frontmatter.client}
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
  );
}

// Editorial date for the blog teaser cards.
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

// The homepage manifesto — This-January length: one thought, four lines.
const MANIFESTO =
  "A studio that treats the clinic\u2019s digital presence with the same care as the practice itself.";

// Deck order tuned to a dark / light / dark / light / dark rhythm (live-era).
const DECK_ORDER: WorkSector[] = [
  "dermatology",
  "cosmetic-surgery",
  "medical-aesthetics",
  "cosmetic-surgery",
  "dermatology",
];

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 6);

  const logoStripItems: LogoStripItem[] = featured.map((project) => ({
    name: project.frontmatter.client,
    href: `/work/${project.slug}`,
  }));

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

  return (
    <main className="bg-ink text-bone">
      {/* ══ LIVE-TOP RESTORE (2026-07-11, client-directed): the nav, hero
          and manifesto below are the LIVE site's versions (74ec384 era,
          same source as the frozen /mockups/old-hero). The 07-09→11 top —
          dead-corner plate hero, industries caps band, statement grid,
          pools trial, accent choreography — is STASHED at checkpoint
          commit 37f0db9; restore any of it from there. ══ */}

      {/* ── Hero — centred lockup over the fanned Deck showreel, crown
          glow + grain scoped here (live-era composition). ── */}
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
                className="display-mega from-overline mx-auto max-w-5xl text-balance opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                Practices that Patients Trust
              </h1>
            </div>
            <p
              className="lede body-lg md:text-[21px] mx-auto max-w-3xl text-bone/80 opacity-0 animate-fade-in-up"
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
        {/* Fade-to-ink as the hero scrolls out (restored 2026-07-11) */}
        <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── Manifesto (live-era) — the 180vh sticky track: the statement
          holds while the scroll-scrub lights its words, then releases.
          "A studio that treats..." in its original This-January form. ── */}
      {/* Track tightened 180vh -> 140vh (2026-07-11): the dwell was making
          the approach to What-we-do feel endless — 40vh of scrub keeps the
          word-lighting readable while roughly halving the toll. */}
      <section className="relative z-10 h-[140vh] pt-[10vh] pb-[5vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="shell w-full">
            <ManifestoStatement text={MANIFESTO} />
            <div className="mt-12 reveal" style={{ transitionDelay: "160ms" }}>
              <Link href="/about" className="btn btn-secondary-dark">
                <span aria-hidden>↳</span>
                Our story
              </Link>
            </div>
          </div>
        </div>
        {/* Fade-to-ink on exit — the scene hands over to the offer */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── What we do — three display-scale ruled rows. Sits BETWEEN the
          studio intro and the work (2026-07-09): both neighbours are
          asymmetric (offset statement grid; staggered work pairs), and the
          full-width ruled rows are the page's most formal element — the
          stabiliser between two deliberately jagged sections. ── */}
      {/* ── Selected work — the page's only imagery: plain frames, real
          captures, ruled captions (italic client name, services meta), and
          the project's one-line outcome from its frontmatter. The work IS
          the proof — the receipts strip that used to close this section
          was cut 2026-07-10 (see the header note). ── */}
      <section id="selected-work" className="relative scroll-mt-14 pb-24 md:pb-32">
        <div className="shell">
          <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
            <div>
              <p className="overline reveal">Selected work</p>
              {/* heading-xl (promoted from heading-lg 2026-07-10 late): on
                  the homepage the collection heads are MOMENTS — every
                  neighbouring beat (statement, service rows, close) speaks
                  at xl, and the work-card client names below are heading-lg,
                  which tied the old signpost to its own items. */}
              <h2 className="heading-part from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve <em>refined</em>
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-bone reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Mobile: the contact-sheet rail (2026-07-11, client's call) —
              all four captures in one beat, reader-driven like the blog
              rail below. */}
          <div className="reveal md:hidden" style={{ transitionDelay: "120ms" }}>
            <Carousel
              ariaLabel="Selected work"
              className="mt-14"
              slideClassName="w-[76vw]"
            >
              {featured.map((project) => (
                <WorkPlate key={project.slug} project={project} />
              ))}
            </Carousel>
          </div>

          {/* Desktop: the staggered pair rhythm — the right column starts a
              beat lower. */}
          <div className="mt-14 hidden grid-cols-1 gap-x-8 gap-y-16 md:mt-20 md:grid md:grid-cols-2">
            {featured.map((project, i) => (
              <WorkPlate
                key={project.slug}
                project={project}
                className={`reveal ${i % 2 === 1 ? "md:mt-28" : ""}`}
                delay={(i % 2) * 120}
              />
            ))}
          </div>

        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">What we do</p>
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <ServicesShowcase />
          </div>
        </div>
        {/* Fade-to-ink on exit (restored 2026-07-11 — the live-era section handover the client loved) */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>


      {/* ── Kind words — ONE testimonial, returned 2026-07-09 as the page's
          human proof (work → words). The big 4:5 slot carries a PORTRAIT
          MOCKUP at native orientation (client-directed 2026-07-10, after a
          landscape-recut was killed: RowenPhone 5 — her mobile site on a
          phone lying on TRAVERTINE, the same stone as the close plate's
          plinth, so the two plates read as one shoot; recipe in
          docs/briefs/hero-plates.md). The human stays present as the
          CIRCULAR avatar in the attribution (the corners rule's third
          exception — faces in circles read as people); her full portrait
          (assets/testimonials/client-portrait.jpg) is in reserve for
          /about.
          ⚠ THE QUOTE is VISIBLY-MARKED PLACEHOLDER until real client words
          + permission exist — we never draft quotes on a client's behalf
          (pre-launch checklist). Swap the words, keep the structure. ── */}
      <section className="relative py-24 md:py-32">
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
                  className="plate-develop absolute inset-0 h-full w-full object-cover"
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
              {/* Attribution — the client as a small CIRCULAR avatar chip
                  beside her name (corners rule, third exception: faces in
                  circles read as people). items-center, not baseline: the
                  row mixes image and type. */}
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
                  className="plate-develop h-10 w-10 rounded-full object-cover"
                />
                <p className="body-sm text-bone">Dr Yalda Jamali</p>
                <span aria-hidden className="hidden h-3 w-px bg-bone/15 sm:block" />
                <p className="body-sm text-bone-dim">Cosmetic doctor — real words to come</p>
              </div>
            </div>
          </div>
        </div>
        {/* Fade-to-ink on exit (restored 2026-07-11 — the live-era section handover the client loved) */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── Trust bar — under the testimonial (2026-07-11, second move of
          the day: first-screen → after The Studio → here): one client
          speaks in Kind words, then the roster corroborates — words, then
          receipts. Below the fold it reveals like its neighbours. ── */}
      <LogoStrip items={logoStripItems} />

      {/* ── (The process left the homepage entirely 2026-07-10 late — it
          burned through carousel, spine timeline and a slim method strip
          in one day before the client cut it altogether. /services owns
          the five steps in full; the homepage doesn't tease them. The
          method-strip pattern survives in git history.) ── */}

      {/* ── Blog teasers — a rail instead of a grid (2026-07-10): the
          carousel earns its place by holding SIX posts where the grid held
          three. ── */}
      {posts.length > 0 && (
        <section className="relative py-24 md:py-32">
          <div className="shell">
            <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
              <div>
                <p className="overline reveal">Blog</p>
                {/* heading-xl — promoted with Selected work's head (the
                    homepage collection heads are moments, see above). */}
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
                    {/* 16:10 per the ratio canon — blog imagery is FIGURES
                        (landscape), matching the /blog index slots. */}
                    <div className="frame aspect-[16/10]">
                      {post.frontmatter.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.frontmatter.featuredImage}
                          alt={post.frontmatter.featuredImageAlt ?? ""}
                          loading="lazy"
                          className="plate-develop h-full w-full object-cover"
                        />
                      ) : (
                        <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                          <span className="index-num text-ink/30" aria-hidden>✦</span>
                        </span>
                      )}
                    </div>
                    <p className="overline mt-6 text-clay">{formatDate(post.frontmatter.publishedAt)}</p>
                    <h3 className="card-title mt-3 max-w-[28ch] text-bone transition-opacity group-hover:opacity-70">
                      {post.frontmatter.title}
                    </h3>
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
          {/* Fade-to-ink on exit (restored 2026-07-11 — the live-era section handover the client loved) */}
          <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
        </section>
      )}

      {/* ── CTA — bone interruption, the close. ── */}
      <ContactCTA />
    </main>
  );
}
