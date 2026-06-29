import Link from "next/link";
import { getFeaturedProjects, getSectorLabel, WORK_SECTORS } from "@/lib/work";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import Deck, { type DeckSlide } from "@/components/Deck";
import WorkCard from "@/components/WorkCard";
import ContactCTA from "@/components/ContactCTA";

// Homepage — the Obsidian direction. Champagne-lit ink scene, an asymmetric
// hero device cluster (desktop browser + overlapping phone), glass cards,
// ghost marquee, bone CTA close.

// Desktop capture shown across the hero deck cards (one shot, repeated for
// now — swap in per-sector captures as they're produced).
const SHOWREEL_SHOT = "/assets/desktops/dr-yalda-jamali.png";
const SHOWREEL_SHOT_ALT =
  "Dr Yalda Jamali — cosmetic doctor website, desktop view";

const SECTORS = [
  "Cosmetic Surgery",
  "Medical Aesthetics",
  "Dermatology",
  "Plastic Surgery",
  "Dental",
  "Wellness",
];

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

  // Hero deck — one card per sector. Every card carries the same desktop
  // capture for now; titles/tags still vary by sector (real client name where
  // a case study is featured, sector label otherwise).
  const featuredBySector = new Map(
    getFeaturedProjects().map((p) => [p.frontmatter.sector, p] as const),
  );
  const deckSlides: DeckSlide[] = WORK_SECTORS.map((sector) => {
    const project = featuredBySector.get(sector);
    return {
      title: project ? project.frontmatter.client : getSectorLabel(sector),
      tag: project ? getSectorLabel(sector) : "Selected work",
      screenshot: SHOWREEL_SHOT,
      screenshotAlt: SHOWREEL_SHOT_ALT,
    };
  });

  return (
    <main className="bg-ink text-bone">
      {/* ── Hero — centred type lockup over the cycling showreel deck ── */}
      <section className="scene-ink grain relative overflow-hidden">
        {/* Ambient champagne orbs — slow-drifting depth behind everything */}
        <div
          aria-hidden
          className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-champagne/15 blur-3xl animate-float-slower"
        />
        <div
          aria-hidden
          className="absolute bottom-[-10%] left-[-12%] h-[400px] w-[400px] rounded-full bg-champagne/10 blur-3xl"
        />

        <div className="shell-wide relative z-10 pt-40 pb-16 text-center md:pt-48 md:pb-20">
          {/* Type lockup — eyebrow over the centred headline */}
          <div className="mx-auto max-w-3xl">
            <p className="overline text-bone-dim opacity-0 animate-fade-in-up">
              The studio behind
            </p>
            <h1
              className="display from-overline opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Practices patients trust
            </h1>
          </div>

          <p
            className="lede body-lg mx-auto max-w-2xl text-bone-dim opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Brand, web design and SEO for cosmetic surgeons, medical aesthetic
            clinics and dermatology practices.
          </p>

          {/* Showreel deck — fades in after the hero copy has settled */}
          <div
            className="relative z-10 mt-14 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s", animationDuration: "1.4s" }}
          >
            <Deck slides={deckSlides} />
          </div>

          <div
            className="mt-12 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
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

        {/* Sector strip — full-bleed marquee, edge to edge under the hero */}
        <div className="relative z-10 border-t rule-dark py-5 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-marquee w-max">
            {[...SECTORS, ...SECTORS].map((s, i) => (
              <span key={i} className="overline text-bone-dim flex items-center gap-12">
                {s}
                <span className="text-champagne" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ──────────────────────────────────────────────────── */}
      <section>
        <div className="shell py-20 md:py-28">
          <p className="overline text-champagne reveal">Considered</p>
          <p className="statement from-overline max-w-4xl reveal" style={{ transitionDelay: "80ms" }}>
            After years of watching brilliant clinics undersold by template websites, we built a
            studio that treats a practice&rsquo;s digital presence with the same care as the
            medicine itself.
          </p>
        </div>
      </section>

      {/* ── Selected work ──────────────────────────────────────────────── */}
      <section className="border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline text-champagne reveal">Selected work</p>
              <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Practices we&rsquo;ve refined
              </h2>
            </div>
            <Link href="/work" className="btn-ghost text-bone reveal">
              All work <span aria-hidden>→</span>
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {featured.map((project, i) => (
                <WorkCard key={project.slug} project={project} index={i} />
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

      {/* ── What we do — glass bento ───────────────────────────────────── */}
      <section className="border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-6">
              <p className="overline text-champagne reveal">What we do</p>
              <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
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
                <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
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
