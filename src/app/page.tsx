import Link from "next/link";
import {
  getFeaturedProjects,
  getSectorLabel,
  type WorkEntry,
  type WorkSector,
} from "@/lib/work";
import { getAllPosts } from "@/lib/journal";
import Deck, { type DeckSlide } from "@/components/Deck";
import ServicesShowcase from "@/components/ServicesShowcase";
import ManifestoStatement from "@/components/ManifestoStatement";
import ContactCTA from "@/components/ContactCTA";

// Homepage — the Obsidian direction. Champagne-lit ink scene, an asymmetric
// hero device cluster (desktop browser + overlapping phone), glass cards,
// ghost marquee, bone CTA close.

// Desktop capture shown across the hero deck cards (fallback shot).
const SHOWREEL_SHOT = "/assets/desktops/dr-yalda-jamali.png";
const SHOWREEL_SHOT_ALT =
  "Dr Yalda Jamali — cosmetic doctor website, desktop view";

// Concept/showcase captures for sectors without a live case study yet — they
// give the hero deck real range across sectors. Showcase-only (no href: there
// is no case-study page to open). Currently empty: every deck sector's study
// now carries its own thumbImage (selv's capture moved into its frontmatter,
// so its card links to the case study; Ostra retired).
const SECTOR_SHOWCASE: Partial<
  Record<WorkSector, { shot: string; alt: string; label: string }>
> = {};

// Deck order tuned to a dark / light / dark / light / dark rhythm across the
// fan, with Dr Yalda (dark) as the centred default card. selv and the Hawkes
// study REPEAT on the outer slots as tonal placeholders — their colours are
// the target for the final captures, which will replace them later:
//   selv (dark) · Hawkes (light) · Yalda (dark) · Hawkes (light) · selv (dark)
const DECK_ORDER: WorkSector[] = [
  "dermatology",
  "cosmetic-surgery",
  "medical-aesthetics",
  "cosmetic-surgery",
  "dermatology",
];

// Editorial date for the Journal teaser cards — 26 June 2026. (Brackets
// removed everywhere 2026-07-05 — they read sci-fi, not editorial.)
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
  "A studio that treats the clinic’s digital presence with the same care as the practice itself.";


// One soft champagne pool for a dark section — the same ambient device as
// the hero/manifesto scene, so the WHOLE page swims in the light rather
// than going flat after the bone interruption. Phone-first sizing; pulled
// back on md+ like its scene siblings.
function AmbientPool({ className }: { className: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute w-[95vw] sm:w-[60vw] md:opacity-85 ${className}`}
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 14%, transparent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 3);

  // Hero deck — one card per sector. A sector with a real featured case study
  // shows its capture and LINKS to it (Hawkes, Yalda); the rest show a concept
  // showcase mockup (selv, Aven, Ostra) with no link; anything else falls back
  // to the newest real capture.
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
        screenshotAlt: project.frontmatter.thumbImageAlt ?? SHOWREEL_SHOT_ALT,
      };
    }
    const showcase = SECTOR_SHOWCASE[sector];
    if (showcase) {
      return {
        title: showcase.label,
        tag: getSectorLabel(sector),
        screenshot: showcase.shot,
        screenshotAlt: showcase.alt,
      };
    }
    return {
      title: captureFallback ? captureFallback.frontmatter.client : getSectorLabel(sector),
      tag: captureFallback ? getSectorLabel(captureFallback.frontmatter.sector) : "Selected work",
      href: captureFallback ? `/work/${captureFallback.slug}` : undefined,
      screenshot: captureFallback?.frontmatter.thumbImage ?? SHOWREEL_SHOT,
      screenshotAlt: captureFallback?.frontmatter.thumbImageAlt ?? SHOWREEL_SHOT_ALT,
    };
  });

  return (
    <main className="bg-ink text-bone">
      {/* ── Dark scene: hero and manifesto share ONE continuous ink field
          (single ambient glow + pools + one grain overlay on this wrapper) —
          no seam or fade separates them. (The stats moved below the bone work
          section — "the proof, straight after the work it came from".) ── */}
      <div className="relative bg-ink">
        {/* One continuous ambient field across ALL THREE dark sections — but
            RESTRAINED: the scene is ink first, lit second. Built from the SAME
            recipe as .scene-ink on the interior pages (an opaque gradient that
            mixes champagne INTO ink) — no filter-blurred divs, which band into
            visible rings on dark and read as "badly blurred". One crown glow
            over the headline (vh-sized, not % of this 300vh wrapper), one soft
            gradient pool beside the deck, true darkness below; one grain
            texture spans it all. The overflow-hidden clips the pool
            horizontally WITHOUT touching the manifesto's sticky — that's a
            sibling subtree, not a descendant. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[90vh]"
            style={{
              background:
                "radial-gradient(90% 100% at 50% 0%, color-mix(in srgb, var(--champagne) 11%, var(--ink)) 0%, var(--ink) 70%)",
            }}
          />
          {/* Pools are sized for PHONES first (vw units shrink them to
              puddles on small screens) — intensity is raised at base and
              pulled back to the old strength on md+ via opacity */}
          <div
            className="absolute left-[-12%] top-[52vh] h-[52vh] w-[95vw] animate-float-slow sm:left-[-12%] sm:top-[58vh] sm:h-[64vh] sm:w-[46vw] md:opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 10%, transparent) 0%, transparent 100%)",
            }}
          />
          {/* Pool at the manifesto's TOP-LEFT — the statement opens inside
              light rather than flat black */}
          <div
            className="absolute left-[-12%] top-[110vh] h-[55vh] w-[95vw] animate-float-slow sm:left-[-15%] sm:top-[120vh] sm:h-[62vh] sm:w-[52vw] md:opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 10%, transparent) 0%, transparent 100%)",
            }}
          />
          {/* Pool under the manifesto's lower reaches — carries the scene's
              light into the work that follows */}
          <div
            className="absolute right-[-15%] bottom-[4%] h-[55vh] w-[100vw] animate-float-slower sm:right-[-10%] sm:h-[70vh] sm:w-[48vw] md:opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 11%, transparent) 0%, transparent 100%)",
            }}
          />
          <div className="grain absolute inset-0" />
        </div>

      {/* ── Hero — centred type lockup over the cycling showreel deck.
          The fade scope wrapper exists for the .exit-fade overlay: it must
          live OUTSIDE the section's overflow-hidden (an overflow-hidden
          ancestor is a scroll container, which hijacks the view() timeline
          and leaves it inactive — the fade silently never runs). ── */}
      <div className="relative z-10">
      <section className="relative overflow-hidden">

        {/* The hero runs TALLER than the viewport (min-h 120vh on desktop) so
            the deck, seated at its foot, bleeds past the fold — cropped by the
            viewport edge, not by CSS. mt-auto opens a generous pocket of air
            between the copy (held near the top) and the deck. */}
        {/* Mobile: a FULL first screen (100svh) with the deck seated at the
            fold and clipped by it — same device as desktop's 120vh bleed */}
        <div className="shell-wide relative z-10 flex min-h-[100svh] flex-col md:min-h-[120vh]">
          {/* Type lockup — eyebrow over the centred headline at .display
              scale (the H1 owns the hero). Load-in is a two-beat sequence:
              the eyebrow tracks in alone, then the copy, then the deck.
              flex-1 + justify-center holds the lockup at the OPTICAL centre
              of the gap between the nav (whose height the top padding
              mirrors) and the deck below, rather than a fixed distance from
              the top. */}
          <div className="flex flex-1 flex-col justify-center pt-24 pb-8 text-center md:pt-32 md:pb-10">
            <div className="mx-auto max-w-5xl">
              <p className="overline opacity-0 animate-track-in">
                The studio behind
              </p>
              {/* Constrained measure + text-balance: the H1 wraps as TWO
                  balanced lines — the stacked lockup reads more editorial
                  than one long line */}
              <h1
                className="display from-overline mx-auto max-w-4xl text-balance opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                Practices that Patients Trust
              </h1>
            </div>

            {/* Lede sits at 55% bone — visibly quieter than the headline */}
            <p
              className="lede body-lg mx-auto max-w-2xl text-bone/80 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              Brand, web design and SEO for cosmetic surgeons, medical aesthetic
              clinics and dermatology practices.
            </p>

            {/* (Hero CTAs removed 2026-07-05 — the nav's "Start a project"
                carries the flagship arrow style instead; the deck below is
                the hero's own invitation to explore.) */}
          </div>

          {/* Showreel deck — seated at the foot of the hero and CLIPPED by it:
              the negative bottom margin pushes the cards past the section's
              bottom edge and its overflow-hidden cuts all five on one straight
              line (deep enough that every rotated corner crosses it — no
              ragged bottom). The sector band's hairline sits right on the cut.
              Fades in last. */}
          <div
            className="relative z-10 -mb-10 opacity-0 animate-fade-in md:-mb-20"
            style={{ animationDelay: "1.5s", animationDuration: "1.4s" }}
          >
            <Deck slides={deckSlides} />
          </div>
        </div>

      </section>
      {/* Fade-to-ink as the hero scrolls out — it dims to black rather than
          staying fully lit while the manifesto arrives (scroll-driven,
          CSS-only, pointer-events-none) */}
      <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
      </div>

      {/* ── Manifesto — a normal-flow ink moment on the SAME continuous
          scene as the hero (no own background, and NO sticky pin — the old
          70vh dwell read as the page being stuck). The statement scrolls
          through at reading pace while the scrub lights the words. ── */}
      <section className="relative z-10 h-[180vh] pt-[15vh] pb-[15vh]">
        {/* Sticky screen — the statement HOLDS while the words finish
            lighting (the scrub runs deep into the dwell), then releases.
            The extra 50vh is what makes the text "take longer to get
            past", This-January style. */}
        <div className="sticky top-0 flex h-screen items-center">
        <div className="shell w-full">
          {/* Scroll-scrubbed word highlight — words brighten at the pace
              you scroll (see ManifestoStatement). No kicker: the statement
              opens cold, This-January style. */}
          <ManifestoStatement text={MANIFESTO} />
          <div className="mt-12 reveal" style={{ transitionDelay: "160ms" }}>
            <Link href="/about" className="btn btn-secondary-dark">
              <span aria-hidden>↳</span>
              Our story
            </Link>
          </div>
        </div>
        </div>
        {/* Fade-to-ink on exit — the scene hands over to the work */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>
      </div>

      {/* ── Selected work — on the ink scene like everything else (the
          bone treatment was retired 2026-07-05; the CTA band is now the
          page's single light interruption). Title-only cards; the story
          surfaces on hover. NOTE: bespoke to the homepage — /work keeps
          the canonical WorkCard. ── */}
      <section id="selected-work" className="relative scroll-mt-14">
        <AmbientPool className="right-[-12%] top-[-5%] h-[70vh] animate-float-slow" />
        <AmbientPool className="left-[-15%] bottom-[10%] h-[75vh] animate-float-slower" />
        <div className="shell py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline reveal">Selected work</p>
              <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve refined
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-bone reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Staggered columns: the right column starts a beat lower, so
              every row reads as an offset pair rather than a flat grid */}
          {/* Mobile: an edge-bleeding snap carousel (swipe through the
              projects); md+: the staggered two-column grid */}
          <div className="-mx-6 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0">
            {featured.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`group block reveal w-[74vw] flex-none snap-start md:w-auto ${i % 2 === 1 ? "md:mt-32" : ""}`}
                style={{ transitionDelay: `${(i % 2) * 120}ms` }}
              >
                <div className="frame aspect-[16/10] rounded-xl">
                  {/* TEMP vibe-check (2026-07-05): Yalda and Hawkes captures
                      ALTERNATING to judge how real imagery sits in this
                      layout. Wire real per-project art in the imagery pass. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i % 2 === 0 ? "/assets/desktops/dr-yalda-jamali.png" : "/assets/desktops/dr-elizabeth-hawkes.jpg"}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Hover — sector and summary rise inside the frame */}
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 via-ink/50 to-transparent p-6 pt-16 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="overline block">{getSectorLabel(project.frontmatter.sector)}</span>
                    {project.frontmatter.summary && (
                      <span className="body-sm mt-2 block text-bone-dim">{project.frontmatter.summary}</span>
                    )}
                  </span>
                </div>
                <h3 className="heading-md mt-5 transition-opacity group-hover:opacity-70">
                  {project.frontmatter.client}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── What we do — three BIG full-measure headings (the image panel
          was dropped 2026-07-05); selecting one reveals its line. ── */}
      <section className="relative">
        <AmbientPool className="right-[-12%] top-[-10%] h-[70vh] animate-float-slow" />
        <div className="shell py-24 md:py-32">
          {/* Kicker gets its own hairline; the ruled service rows hang
              straight off it */}
          <div className="border-b rule-dark pb-6 reveal">
            <p className="overline">What we do</p>
          </div>
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <ServicesShowcase />
          </div>
        </div>
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── Stats — THE PROOF, under What we do: the services state the
          offer, the numbers back it. An asymmetric bento: one tall EXHIBITS card (the receipts
          stack — artefact fragments every build ships) + four glass stat
          cards at varied widths, each lit by its own champagne gradient
          blob. Numbers are defensible: the ranking is the Hawkes study's,
          the rest are definitionally true. ── */}
      <section className="relative z-10">
        <AmbientPool className="left-[-12%] bottom-[-15%] h-[75vh] animate-float-slower" />
        <AmbientPool className="right-[-15%] top-[-10%] h-[60vh] animate-float-slow" />
        <div className="shell py-24 md:py-32">
          <p className="overline reveal">The proof</p>
          <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
            Numbers a practice can stand behind
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {/* Human card — hands holding the Hawkes mobile site (composited
                from the Adobe hand-tapping mockup; regenerate via the
                compositing script with any client capture). The screen shown
                IS the project behind the #1–3 stat. ProofExhibits (the
                receipts stack) is parked in components/ if we rotate back. */}
            <div className="frame relative min-h-[420px] rounded-2xl reveal md:col-span-5 md:min-h-0" style={{ transitionDuration: "1.4s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hands/hand-tapping-dr-hawkes.jpg"
                alt="A patient's hands holding a phone showing the Dr Elizabeth Hawkes website — the project behind the page-one rankings"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="overline absolute bottom-5 left-5 text-bone">The work behind the numbers</p>
            </div>

            {/* Stat cards — a strict 2×2 (rows of two at every width),
                beside the imagery card rather than bento-woven around it */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:col-span-7 md:gap-6">
              {[
                {
                  value: "#1–3",
                  label: "Google positions won for a specialist's key procedures",
                  blob: "radial-gradient(120% 120% at 85% -10%, color-mix(in srgb, var(--champagne) 16%, transparent) 0%, transparent 70%)",
                },
                {
                  value: "0",
                  label: "templates used — every practice designed from scratch",
                  blob: "radial-gradient(130% 130% at -10% 110%, color-mix(in srgb, var(--champagne) 13%, transparent) 0%, transparent 70%)",
                },
                {
                  value: "100%",
                  label: "of our work is for medical aesthetics & surgery",
                  blob: "radial-gradient(140% 110% at 50% 120%, color-mix(in srgb, var(--champagne) 15%, transparent) 0%, transparent 72%)",
                },
                {
                  value: "2",
                  label: "countries our clients practise in — Sydney to London",
                  blob: "radial-gradient(120% 130% at 110% 40%, color-mix(in srgb, var(--champagne) 14%, transparent) 0%, transparent 70%)",
                },
              ].map((stat, i) => (
                <div
                  key={stat.value}
                  className="card-glass relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl p-5 reveal sm:min-h-[220px] sm:p-8 md:p-9"
                  style={{
                    // Slow, staggered roll-in — softer than the stock reveal
                    transitionDuration: "1.4s",
                    transitionDelay: `${(i + 1) * 160}ms`,
                  }}
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: stat.blob }} />
                  <p className="stat relative text-champagne">{stat.value}</p>
                  <p className="label relative mt-8 max-w-[26ch] text-bone-dim">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Fade-to-ink on exit — the proof hands over through darkness */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── Kind words — social proof, split layout (after Relume
          Testimonial 13): client portrait LEFT; stars, quote and an
          attribution row (name/role · divider · practice wordmark) RIGHT.
          ⚠️ EVERYTHING here is VISIBLY-MARKED PLACEHOLDER until real client
          words, a real portrait and live review data exist — we never draft
          quotes on a client's behalf. Swap the content, keep the structure. */}
      <section className="relative">
        <AmbientPool className="right-[-15%] top-[5%] h-[70vh] animate-float-slow" />
        <div className="shell py-24 md:py-32">
          <p className="overline reveal">Kind words</p>
          <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
            In their words
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            {/* Portrait — real client photo (attribution name/role pending) */}
            <div className="md:col-span-5 reveal">
              <div className="frame aspect-square rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/testimonials/client-portrait.jpg"
                  alt="Portrait of our client on a Sydney balcony"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Quote column */}
            <div className="md:col-span-6 md:col-start-7">
              <div
                className="flex items-center gap-2 text-champagne reveal"
                role="img"
                aria-label="Rated five stars"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} aria-hidden className="text-lg">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="blockquote mt-7 reveal" style={{ transitionDelay: "80ms" }}>
                &ldquo;Placeholder — a client&rsquo;s real words will sit
                here. We don&rsquo;t write these ourselves.&rdquo;
              </blockquote>
              <div
                className="mt-9 flex items-center gap-5 reveal"
                style={{ transitionDelay: "160ms" }}
              >
                {/* Avatar — face crop of the client portrait */}
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/testimonials/client-avatar.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </span>
                <div>
                  <p className="body font-medium text-bone">Client name</p>
                  <p className="body-sm text-bone-dim">Role, Practice — placeholder</p>
                </div>
                <div aria-hidden className="h-10 w-px bg-bone/15" />
                <span className="font-display text-lg tracking-tight text-bone-dim">
                  Practice wordmark
                </span>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── Journal teaser — no overflow-hidden here, so the exit-fade can
          live inside the section directly ── */}
      {posts.length > 0 && (
        <section className="relative">
          <AmbientPool className="left-[-12%] top-[-10%] h-[75vh] animate-float-slower" />
          <AmbientPool className="right-[-12%] bottom-[-10%] h-[65vh] animate-float-slow" />
          <div className="shell py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="overline reveal">Journal</p>
                <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
                  Thinking, written down
                </h2>
              </div>
              <Link href="/journal" className="btn-ghost text-bone reveal">
                All entries <span aria-hidden>→</span>
              </Link>
            </div>
            {/* Editorial teaser cards — image, bracketed date, title with a
                circular ↗ chip. Mobile: an edge-bleeding snap carousel (same
                treatment as Selected work) with every frame landscape so the
                row keeps one height; md+: the grid, where image aspects
                ALTERNATE (landscape / portrait / landscape) so the text lines
                stagger naturally. featuredImage when set, gradient until then. */}
            <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group reveal w-[74vw] flex-none snap-start md:w-auto"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`frame rounded-lg aspect-[4/3] ${i % 2 === 1 ? "md:aspect-[3/4]" : ""}`}>
                    {post.frontmatter.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.featuredImageAlt ?? ""}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                        <span className="index-num text-ink/30" aria-hidden>✦</span>
                      </span>
                    )}
                  </div>
                  <p className="overline mt-6 text-clay">{formatDate(post.frontmatter.publishedAt)}</p>
                  <div className="mt-3 flex items-start justify-between gap-5">
                    <h3 className="heading-md max-w-[24ch] text-bone transition-opacity group-hover:opacity-70">
                      {post.frontmatter.title}
                    </h3>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bone/10 text-bone transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
        </section>
      )}

      {/* ── Ghost marquee — the midnight signature ─────────────────────── */}
      <section className="overflow-hidden py-10 md:py-16">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="display-mega text-ghost-on-dark pr-16">
              Clinics deserve designers who understand their world&nbsp;—&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA — bone interruption, the close ─────────────────────────── */}
      {/* (The freebie / newsletter band was parked 2026-07-04 → /mockups/freebie,
          destined for its own landing page.) */}
      <ContactCTA />

    </main>
  );
}
