import Link from "next/link";
import {
  getFeaturedProjects,
  getSectorLabel,
  type WorkEntry,
  type WorkSector,
} from "@/lib/work";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import { SITE } from "@/lib/site";
import Deck, { type DeckSlide } from "@/components/Deck";
import WorkCard from "@/components/WorkCard";
import NewsletterSignup from "@/components/NewsletterSignup";
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
// is no case-study page to open). (Aven — /assets/desktops/aven.jpg — is
// parked on disk; Ostra retired.)
const SECTOR_SHOWCASE: Partial<
  Record<WorkSector, { shot: string; alt: string; label: string }>
> = {
  dermatology: {
    shot: "/assets/desktops/selv.jpg",
    alt: "selv — prescription skincare, consultant-led dermatology, desktop view",
    label: "selv",
  },
};

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

// The homepage manifesto — revealed as one smooth block on scroll.
const MANIFESTO =
  "After years of watching brilliant clinics undersold by template websites, we built a studio that treats a practice’s digital presence with the same care as the medicine itself.";

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
      {/* ── Dark scene: the hero and the manifesto share ONE continuous ink
          field (single ambient glow, single grain overlay on this wrapper) —
          interrupted midway by the bone sector band, which caps the deck. ── */}
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
        <div className="shell-wide relative z-10 flex min-h-screen flex-col md:min-h-[120vh]">
          {/* Type lockup — eyebrow over the centred headline at .display
              scale (the H1 owns the hero). Load-in is a two-beat sequence:
              the eyebrow tracks in alone, then the copy, then the deck.
              flex-1 + justify-center holds the lockup at the OPTICAL centre
              of the gap between the nav (whose height the top padding
              mirrors) and the deck below, rather than a fixed distance from
              the top. */}
          <div className="flex flex-1 flex-col justify-center pt-24 pb-8 text-center md:pt-32 md:pb-10">
            <div className="mx-auto max-w-5xl">
              <p className="overline text-bone-dim opacity-0 animate-track-in">
                The studio behind
              </p>
              {/* Constrained measure + text-balance: the H1 wraps as TWO
                  balanced lines — the stacked lockup reads more editorial
                  than one long line */}
              <h1
                className="heading-xl from-overline mx-auto max-w-4xl text-balance opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                Practices Patients Trust
              </h1>
            </div>

            {/* Lede sits at 55% bone — visibly quieter than the headline */}
            <p
              className="lede body-lg mx-auto max-w-2xl text-bone/55 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              Brand, web design and SEO for cosmetic surgeons, medical aesthetic
              clinics and dermatology practices.
            </p>

            <div
              className="mt-10 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              {/* Flagship CTA — label left, circular ↗ chip right */}
              <Link href="/work" className="btn btn-primary-dark btn-arrow">
                See the work
                <span className="btn-arrow-chip" aria-hidden>↗</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary-dark">
                Start a project
              </Link>
            </div>
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
            {/* One smooth, single reveal — the whole statement fades up as a
                block (the word-by-word highlight read as gimmick, retired). */}
            <p
              className="statement from-overline max-w-4xl reveal"
              style={{ transitionDelay: "120ms" }}
            >
              {MANIFESTO}
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
        {/* Fade-to-ink on exit — every section hands over through darkness */}
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>
      </div>

      {/* ── Selected work — stays ON the ink scene (the hero is the style
          reference; the page reads as one continuous dark world until the
          bone CTA close). A single champagne pool drifts on the right for
          asymmetric light; cards stagger so no two studies sit level.
          Fade-scope wrapper: the exit-fade must sit outside the section's
          overflow-hidden or its view() timeline goes inactive. ── */}
      <div className="relative">
      <section id="selected-work" className="relative overflow-hidden scroll-mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-16%] top-[-4%] h-[64vh] w-[44vw] animate-float-slower"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 7%, transparent) 0%, transparent 100%)",
          }}
        />
        <div className="shell relative py-24 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline text-champagne reveal">Selected work</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve refined
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-bone reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {featured.map((project, i) => (
                <div key={project.slug} className={i % 2 === 1 ? "md:mt-36" : ""}>
                  <WorkCard project={project} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <p className="body text-bone-dim mt-10">
              Case studies are on the way. In the meantime,{" "}
              <Link href="/contact" className="text-champagne underline underline-offset-4">
                start a conversation
              </Link>
              .
            </p>
          )}
        </div>
      </section>
      <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </div>

      {/* ── Kind words — social proof, split layout (after Relume
          Testimonial 13): client portrait LEFT; stars, quote and an
          attribution row (name/role · divider · practice wordmark) RIGHT.
          ⚠️ EVERYTHING here is VISIBLY-MARKED PLACEHOLDER until real client
          words, a real portrait and live review data exist — we never draft
          quotes on a client's behalf. Swap the content, keep the structure. */}
      <section className="relative border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <p className="overline text-champagne reveal">Kind words</p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            {/* Portrait slot — swap for a real client photo */}
            <div className="md:col-span-5 reveal">
              <div className="frame aspect-[4/5] rounded-xl">
                <div className="portrait-fill absolute inset-0" />
                <span className="overline absolute bottom-5 left-5 text-ink/55">
                  Client portrait — placeholder
                </span>
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
                className="mt-9 flex items-center gap-6 reveal"
                style={{ transitionDelay: "160ms" }}
              >
                <div>
                  <p className="body font-medium text-bone">Client name</p>
                  <p className="body text-bone-dim">Role, Practice — placeholder</p>
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
        <section className="relative border-t rule-dark">
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
            {/* Cards cascade — each drops a step lower than the last */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className={`group card-glass block p-8 reveal ${
                    i === 1 ? "md:mt-14" : i === 2 ? "md:mt-28" : ""
                  }`}
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
          <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
        </section>
      )}

      {/* ── Instagram — MOCKUP feed for now (tiles are capture crops +
          brand gradients, all linking to the profile); swap for a real
          feed embed later ── */}
      <section className="relative border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline text-champagne reveal">Elsewhere</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                @northandrefine
              </h2>
            </div>
            <a
              href={SITE.sameAs[0]}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-bone reveal"
            >
              Follow along <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {[
              { kind: "shot", src: "/assets/desktops/dr-yalda-jamali.png", pos: "object-top" },
              { kind: "mark" },
              { kind: "shot", src: "/assets/desktops/dr-elizabeth-hawkes.jpg", pos: "object-left-top" },
              { kind: "fill", label: "✦" },
              { kind: "shot", src: "/assets/desktops/dr-yalda-jamali.png", pos: "object-bottom" },
              { kind: "fill", label: "01" },
            ].map((tile, i) => (
              <a
                key={i}
                href={SITE.sameAs[0]}
                target="_blank"
                rel="noreferrer"
                aria-label="North & Refine on Instagram"
                className="group frame aspect-square overflow-hidden rounded-lg reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {tile.kind === "shot" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tile.src}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover ${tile.pos} transition-transform duration-700 group-hover:scale-[1.04]`}
                  />
                ) : tile.kind === "mark" ? (
                  <span className="flex h-full w-full items-center justify-center font-display text-3xl tracking-tight text-bone/25">
                    N<span className="text-champagne/40">&amp;</span>R
                  </span>
                ) : (
                  <span className="portrait-fill flex h-full w-full items-center justify-center">
                    <span className="index-num text-ink/30">{tile.label}</span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

      {/* ── The freebie — mailing-list capture (Netlify form "newsletter").
          Rename the checklist / rewrite the pitch freely; the form and its
          static definition in public/__forms.html stay in sync. ── */}
      <section className="relative border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <p className="overline text-champagne reveal">The freebie</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                What patients check before they book
              </h2>
              <p className="body-lg lede text-bone-dim reveal" style={{ transitionDelay: "160ms" }}>
                A twelve-point audit of your practice&rsquo;s website, straight
                to your inbox — plus an occasional note on design and search
                for clinics. No noise.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8 reveal" style={{ transitionDelay: "240ms" }}>
              <NewsletterSignup />
            </div>
          </div>
        </div>
        <div aria-hidden className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink" />
      </section>

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
