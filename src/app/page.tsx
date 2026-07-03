import Link from "next/link";
import {
  getFeaturedProjects,
  getSectorLabel,
  type WorkEntry,
  type WorkSector,
} from "@/lib/work";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import Deck, { type DeckSlide } from "@/components/Deck";
import WorkCard from "@/components/WorkCard";
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
// is no case-study page to open).
const SECTOR_SHOWCASE: Partial<
  Record<WorkSector, { shot: string; alt: string; label: string }>
> = {
  dermatology: {
    shot: "/assets/desktops/selv.jpg",
    alt: "selv — prescription skincare, consultant-led dermatology, desktop view",
    label: "selv",
  },
  dental: {
    shot: "/assets/desktops/aven.jpg",
    alt: "Aven Dental Rooms — private dentistry, Marylebone, desktop view",
    label: "Aven Dental Rooms",
  },
  wellness: {
    shot: "/assets/desktops/ostra.jpg",
    alt: "Ostra — women's health, hormones and menopause, desktop view",
    label: "Ostra",
  },
};

// Deck order tuned to a dark / light / dark / light / dark rhythm across the
// fan, with Dr Yalda (dark) as the centred default card:
//   selv (dark) · Hawkes (light) · Yalda (dark) · Aven (light) · Ostra (warm/dark)
const DECK_ORDER: WorkSector[] = [
  "dermatology",
  "cosmetic-surgery",
  "medical-aesthetics",
  "dental",
  "wellness",
];

const SECTORS = [
  "Cosmetic Surgery",
  "Medical Aesthetics",
  "Oculoplastic Surgery",
  "Dermatology",
  "Plastic Surgery",
  "Dental",
  "Wellness",
];

// The homepage manifesto — split into words for the scroll-staggered reveal.
const MANIFESTO =
  "After years of watching brilliant clinics undersold by template websites, we built a studio that treats a practice’s digital presence with the same care as the medicine itself.";

const SERVICES = [
  {
    num: "01",
    title: "Brand identity",
    body: "A considered visual language — name, mark, type, palette and tone — that signals the standard of your care before a word is read.",
  },
  {
    num: "02",
    title: "Web design & build",
    body: "Fast, accessible, beautifully made websites that hold attention and turn a nervous first visit into a booked consultation.",
  },
  {
    num: "03",
    title: "SEO & content",
    body: "Technical SEO, schema and an editorial content engine that compounds — so the right patients find you, on your own terms.",
  },
];

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
      {/* ── Dark scene: hero + sector strip + manifesto read as ONE continuous
          ink field. A single ambient champagne glow and one grain overlay span
          all three (absolute layers on this wrapper), so there's no per-section
          gradient restart, no divider line, and no texture break. The hard cut
          into the bone Selected Work section below is intentional. ── */}
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
          <div
            className="absolute left-[-12%] top-[58vh] h-[64vh] w-[46vw] animate-float-slow"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 7%, transparent) 0%, transparent 100%)",
            }}
          />
          <div className="grain absolute inset-0" />
        </div>

      {/* ── Hero — centred type lockup over the cycling showreel deck ── */}
      <section className="relative z-10 overflow-hidden">
        {/* Fade-to-ink as the hero scrolls out — hands the stage to the
            manifesto arriving beneath (scroll-driven, CSS-only) */}
        <div aria-hidden className="hero-fade absolute inset-0 z-20 bg-ink" />

        {/* The hero runs TALLER than the viewport (min-h 120vh on desktop) so
            the deck, seated at its foot, bleeds past the fold — cropped by the
            viewport edge, not by CSS. mt-auto opens a generous pocket of air
            between the copy (held near the top) and the deck. */}
        <div className="shell-wide relative z-10 flex min-h-screen flex-col md:min-h-[120vh]">
          {/* Type lockup — eyebrow over the centred headline. Deliberately a
              tier below .display: the restraint (plus the air around it) is
              what reads as luxury here. Load-in is a two-beat sequence: the
              eyebrow tracks in alone, then the copy, then the deck. flex-1 +
              justify-center holds the lockup at the OPTICAL centre of the gap
              between the nav (whose height the top padding mirrors) and the
              deck below, rather than a fixed distance from the top. */}
          <div className="flex flex-1 flex-col justify-center pt-24 pb-16 text-center md:pt-32">
            <div className="mx-auto max-w-5xl">
              <p className="overline text-bone-dim opacity-0 animate-track-in">
                The studio behind
              </p>
              <h1
                className="heading-xl from-overline opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                Practices patients trust
              </h1>
            </div>

            <p
              className="lede body-lg mx-auto max-w-2xl text-bone-dim opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              Brand, web design and SEO for cosmetic surgeons, medical aesthetic
              clinics and dermatology practices.
            </p>

            <div
              className="mt-10 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              <Link href="/work" className="btn btn-primary-dark">
                See the work
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary-dark">
                Start a project
              </Link>
            </div>
          </div>

          {/* Showreel deck — seated at the foot of the hero and bled past the
              fold; the cards run off the bottom edge for depth. Fades in last.
              (The copy block's flex-1 pushes it to the foot — no mt-auto.) */}
          <div
            className="relative z-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.5s", animationDuration: "1.4s" }}
          >
            <Deck slides={deckSlides} />
          </div>
        </div>

        {/* Sector strip — full-bleed marquee OVERLAID on the foot of the deck,
            capping the fan's ragged bottom edge (rotated card corners end at
            uneven heights): a fade-to-ink gradient dissolves the cards and the
            marquee runs across the dissolve. Negative margin pulls it up over
            the stage; z-20 sits it above the cards. Sized at the H3 tier so it
            holds its own between the deck and the manifesto. Slowed to keep
            the px/s calm at this scale. Two pixel-identical halves so the -50%
            loop point is seamless. */}
        {/* Padding maths: the negative margin overlaps the cards, so the
            VISIBLE gap above the text is pt minus that overlap — pt is
            therefore overlap + pb, centring the text between the card feet
            and the strip's bottom edge. */}
        <div className="relative z-20 -mt-24 overflow-hidden bg-gradient-to-t from-ink via-ink/95 to-transparent pt-[9.5rem] pb-14 md:-mt-36 md:pt-[14rem] md:pb-20">
          <div
            className="flex w-max whitespace-nowrap animate-marquee"
            style={{ animationDuration: "46s" }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {SECTORS.map((s) => (
                  <span key={s} className="heading-md flex items-center text-bone/45">
                    <span className="pr-10">{s}</span>
                    <span className="pr-10 text-champagne/60" aria-hidden>
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto — a full-viewport ink moment on the SAME continuous
          scene as the hero (no own background). The shared glow has faded to
          ink by here; its champagne orbs add the local light. Words fade in
          staggered as the section enters view. */}
      <section className="relative z-10 h-[170vh]">
        {/* Sticky screen — the statement holds the viewport for a short beat
            (the extra 70vh of track) before releasing: anchored, not scrubbed */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="shell relative z-10 w-full">
            <p className="overline text-champagne reveal">Considered</p>
            {/* .statement (down from heading-xl) — smaller, lighter, more
                considered. Words fade in on a slow, heavily-overlapping wave
                (75ms stagger, 1.3s each) so it illuminates rather than fills. */}
            <p className="statement from-overline max-w-4xl reveal reveal-words">
              {MANIFESTO.split(" ").map((word, i) => (
                <span key={i} style={{ "--d": `${i * 75}ms` } as React.CSSProperties}>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>

          {/* Scroll anchor — nudges the page on to the work */}
          <a
            href="#selected-work"
            aria-label="Scroll to selected work"
            className="group absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="overline text-bone-dim transition-colors group-hover:text-bone">Scroll</span>
            <span className="text-champagne transition-transform duration-500 group-hover:translate-y-1" aria-hidden>
              ↓
            </span>
          </a>
        </div>
      </section>
      </div>

      {/* ── Selected work — the light interruption after the ink manifesto.
          Cards stagger: even columns sit high, odd columns drop, so no two
          studies ever sit level. ── */}
      <section id="selected-work" data-nav-light className="bg-bone text-ink scroll-mt-14">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline text-clay reveal">Selected work</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve refined
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-ink reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {featured.map((project, i) => (
                <div key={project.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
                  <WorkCard project={project} index={i} tone="light" />
                </div>
              ))}
            </div>
          ) : (
            <p className="body text-ink/70 mt-10">
              Case studies are on the way. In the meantime,{" "}
              <Link href="/contact" className="text-clay underline underline-offset-4">
                start a conversation
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* ── What we do — glass bento ───────────────────────────────────── */}
      <section className="border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-6">
              <p className="overline text-champagne reveal">What we do</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Three disciplines, one coherent result.
              </h2>
            </div>
            <p className="body-lg text-bone-dim md:col-span-5 md:col-start-8 reveal" style={{ transitionDelay: "160ms" }}>
              Brand, web and search, delivered by one studio — so nothing falls between the
              cracks.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className="card-glass p-8 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="index-num text-champagne">{s.num} /</p>
                <h3 className="heading-md mt-4">{s.title}</h3>
                <p className="body mt-3 text-bone-dim">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/services" className="btn btn-secondary-dark">
              How we work
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Journal teaser ─────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="border-t rule-dark">
          <div className="shell py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="overline text-champagne reveal">From the Journal</p>
                <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                  Thinking, written down
                </h2>
              </div>
              <Link href="/journal" className="btn-ghost text-bone reveal">
                All entries <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group card-glass block p-8 reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="overline text-champagne">{getCategoryLabel(post.frontmatter.category)}</p>
                  <h3 className="heading-md mt-3 transition-opacity group-hover:opacity-70">
                    {post.frontmatter.title}
                  </h3>
                  <p className="body mt-3 text-bone-dim line-clamp-3">{post.frontmatter.description}</p>
                  <p className="label mt-4 text-bone-dim">{post.readingMinutes} min read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Ghost marquee — the midnight signature ─────────────────────── */}
      <section className="overflow-hidden border-t rule-dark py-10 md:py-16">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="display-mega text-ghost-on-dark pr-16">
              Clinics deserve designers who understand their world&nbsp;—&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA — bone interruption ────────────────────────────────────── */}
      <ContactCTA />
    </main>
  );
}
