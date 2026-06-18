import Link from "next/link";
import { getFeaturedProjects } from "@/lib/work";
import { getAllPosts, getCategoryLabel } from "@/lib/journal";
import PhoneMockup from "@/components/PhoneMockup";
import BrowserMockup from "@/components/BrowserMockup";
import WorkCard from "@/components/WorkCard";
import ContactCTA from "@/components/ContactCTA";

// Homepage — the Obsidian direction. Champagne-lit ink scene, an asymmetric
// hero device cluster (desktop browser + overlapping phone), glass cards,
// ghost marquee, bone CTA close.

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

  return (
    <main className="bg-ink text-bone">
      {/* ── Hero — immersive, asymmetric: copy left, one dynamic device ── */}
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

        <div className="shell-wide relative z-10 pt-40 pb-20 md:pt-48 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-8 items-center">
            {/* Copy — fades up on load */}
            <div className="lg:col-span-5 relative z-20">
              <h1
                className="display opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                The studio behind the practices patients trust.
              </h1>
              <p
                className="lede body-lg text-bone-dim opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                Considered brands and high-performing, SEO-led websites for cosmetic surgeons,
                medical aesthetic clinics and dermatology practices.
              </p>
              <div
                className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
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

            {/* Device cluster — desktop browser anchored, phone overlapping its
                corner: a responsive showcase that fills the width and bridges
                back toward the copy. Resolves last. */}
            <div
              className="lg:col-span-7 relative opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s", animationDuration: "1.6s" }}
            >
              {/* Ambient glow behind the cluster */}
              <div
                aria-hidden
                className="absolute inset-0 -m-10 rounded-[40%] bg-champagne/15 blur-3xl"
              />

              {/* Desktop cluster — lg and up */}
              <div className="relative hidden lg:block lg:translate-x-6 xl:translate-x-12">
                <div className="animate-float-slow">
                  <BrowserMockup
                    name="Dr Yalda Jamali"
                    specialty="Cosmetic doctor, Sydney"
                    domain="dryalda.com.au"
                    className="rotate-1"
                  />
                </div>

                {/* Phone overlapping the lower-left corner — the real capture */}
                <div className="absolute -bottom-12 -left-12 animate-float-slower">
                  <div className="-rotate-[8deg]">
                    <PhoneMockup
                      screenshot="/assets/phones/dr-yalda-hero.jpg"
                      screenshotAlt="Dr Yalda Jamali — Sydney cosmetic doctor. Mobile site designed by North & Refine"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Floaty capability chips */}
                <div
                  className="absolute -top-6 right-6 animate-float-slower"
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="card-glass inline-flex px-4 py-2.5 overline text-champagne">
                    Schema built-in
                  </span>
                </div>
                <div
                  className="absolute top-1/2 -right-6 animate-float-slow"
                  style={{ animationDelay: "1.4s" }}
                >
                  <span className="card-glass inline-flex px-4 py-2.5 overline text-bone">
                    Sub-second loads
                  </span>
                </div>
              </div>

              {/* Mobile — the real phone, centred */}
              <div className="lg:hidden flex justify-center">
                <div className="-rotate-3 animate-float-slow">
                  <PhoneMockup
                    screenshot="/assets/phones/dr-yalda-hero.jpg"
                    screenshotAlt="Dr Yalda Jamali — Sydney cosmetic doctor. Mobile site designed by North & Refine"
                    size="lg"
                  />
                </div>
              </div>
            </div>
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
