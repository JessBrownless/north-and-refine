import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/work";
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

// Editorial date for the blog teaser cards.
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 6);

  const logoStripItems: LogoStripItem[] = featured.map((project) => ({
    name: project.frontmatter.client,
    href: `/work/${project.slug}`,
  }));

  return (
    <main className="bg-ink text-bone">
      {/* ── First screen — hero AND the trust bar compose ONE viewport
          (decided 2026-07-10): the H1 makes the claim, the client logos are
          the receipt, and a first impression should hold both in a single
          glance. The wrapper is exactly 100svh; the hero flexes to fill
          whatever the strip doesn't take, so the strip's bottom rule sits on
          the fold line. min-h (never a hard height): on short laptop
          viewports the composition takes slightly more than a screen rather
          than crushing the hero's air — the fold bends before the
          whitespace does. ── */}
      <div className="flex min-h-[100svh] flex-col">
        {/* Hero — type only. Two big Saol lines with the italic accent, the
            lede in the sans, the flagship CTA pair. pt clears the absolute
            nav. */}
        <section className="flex flex-1 flex-col justify-center">
          <div className="shell pt-28 md:pt-32">
            {/* THE DEAD-CORNER PORTRAIT (round 5, KEPT 2026-07-10 — the
                composition that ended the hero-image saga after four dead
                forms: cluster, Deck, panel paste-up, tipped-in landscape).
                It survives because it competes with nothing: the H1 wraps
                to a short second line, leaving the right of line 2 + the
                deck row genuinely empty, and the 4:5 plate fills exactly
                that corner. Absolutely positioned in this relative wrapper:
                top clears the H1's FIRST line via var(--masthead-line)
                (globals token — shares .display-mega's size so it cannot
                drift), bottom locks to the CTA row's bottom, width derives
                from height via the ratio (~304×380 at 1440). ZERO overlap
                with type, ZERO pixels added to the fold, H1 at full
                measure. lg+ gets this absolute plate; below lg the corner
                doesn't exist, so mobile carries the in-flow plate below. */}
            <div className="relative">
              <h1 className="display-mega opacity-0 animate-fade-in">
                Practices that patients <em>trust</em>.
              </h1>
              {/* The OFFICIAL TAGLINE (2026-07-10) — referenced from
                  SITE.tagline (src/lib/site.ts, the single source of brand
                  facts) so the hero can never drift from the canonical
                  line. Change it there, never here. */}
              <p
                className="body-lg mt-10 max-w-[44ch] text-bone-dim opacity-0 animate-fade-in md:mt-12"
                style={{ animationDelay: "0.25s" }}
              >
                {SITE.tagline}.
              </p>
              {/* The view's ONE flagship (.btn-arrow — the nav demoted to a
                  secondary outline in the same change), paired with the
                  tertiary ghost. Primary action + quiet exploration. */}
              <div
                className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 opacity-0 animate-fade-in md:mt-12"
                style={{ animationDelay: "0.45s" }}
              >
                <Link href="/contact" className="btn btn-primary-dark btn-arrow">
                  Start a project
                  <span className="btn-arrow-chip" aria-hidden>↗</span>
                </Link>
                <Link href="#selected-work" className="btn-ghost text-bone">
                  See the work <span aria-hidden>→</span>
                </Link>
              </div>
              {/* MOBILE plate (kept with the set) — in flow below the CTAs,
                  right-anchored like its desktop sibling, modest width.
                  COST, accepted knowingly (2026-07-10): the phone first
                  screen was exactly full, so this bends the fold and the
                  LogoStrip slips just below it on phones — "the fold bends
                  before the whitespace does". */}
              <div
                className="mt-12 ml-auto w-3/5 max-w-[260px] opacity-0 animate-fade-in lg:hidden"
                style={{ animationDelay: "0.65s" }}
              >
                <div className="frame aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/plates/hero-rowen-05.jpg"
                    alt="A laptop on a black side table displaying the Dr Yalda Jamali website — brand and web design by North & Refine"
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-0 right-0 hidden aspect-[4/5] opacity-0 animate-fade-in lg:block"
                style={{
                  top: "calc(var(--masthead-line) + 0.75rem)",
                  animationDelay: "0.65s",
                }}
              >
                <div className="frame h-full w-full">
                  {/* Rowen 5 with the real Dr Yalda desktop composited onto
                      the laptop screen. Content, not decoration. Same asset
                      as the mobile plate above — one image, two placements. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/plates/hero-rowen-05.jpg"
                    alt="A laptop on a black side table displaying the Dr Yalda Jamali website — brand and web design by North & Refine"
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust bar — above the fold, closing the first screen. Present
            from FIRST PAINT (no load-in, no reveal — 2026-07-10): the hero
            copy may fade in, but the receipt is just there. ── */}
        <LogoStrip items={logoStripItems} />
      </div>

      {/* ── The studio — moved ABOVE the work 2026-07-09: the statement
          answers the H1's claim directly, so the page reads claim → who's
          behind it → proof → offer → method → act. ── */}
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

      {/* ── What we do — three display-scale ruled rows. Sits BETWEEN the
          studio intro and the work (2026-07-09): both neighbours are
          asymmetric (offset statement grid; staggered work pairs), and the
          full-width ruled rows are the page's most formal element — the
          stabiliser between two deliberately jagged sections. ── */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">What we do</p>
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <ServicesShowcase />
          </div>
        </div>
      </section>

      {/* ── Selected work — the page's only imagery: plain frames, real
          captures, ruled captions (italic client name, services meta), and
          the project's one-line outcome from its frontmatter. The work IS
          the proof — the receipts strip that used to close this section
          was cut 2026-07-10 (see the header note). ── */}
      <section id="selected-work" className="scroll-mt-14 py-24 md:py-32">
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

          {/* Staggered pair rhythm — the right column starts a beat lower. */}
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

      {/* ── (The process left the homepage entirely 2026-07-10 late — it
          burned through carousel, spine timeline and a slim method strip
          in one day before the client cut it altogether. /services owns
          the five steps in full; the homepage doesn't tease them. The
          method-strip pattern survives in git history.) ── */}

      {/* ── Blog teasers — a rail instead of a grid (2026-07-10): the
          carousel earns its place by holding SIX posts where the grid held
          three. ── */}
      {posts.length > 0 && (
        <section className="py-24 md:py-32">
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

      {/* ── CTA — bone interruption, the close. ── */}
      <ContactCTA />
    </main>
  );
}
