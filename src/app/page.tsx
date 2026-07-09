import Link from "next/link";
import { getFeaturedProjects } from "@/lib/work";
import { getAllPosts } from "@/lib/journal";
import LogoStrip, { type LogoStripItem } from "@/components/LogoStrip";
import ServicesShowcase from "@/components/ServicesShowcase";
import ContactCTA from "@/components/ContactCTA";

// Homepage — TYPE-LED, FLAT, EDITED (decided 2026-07-09, "rip up the rule
// book"; tightened same day: "everything should earn its place"). The page
// works the way the studio's own Instagram posts work: huge Saol on flat
// warm ink, one italic accent word per statement, quiet kickers, hairlines,
// air. Nothing performs (no deck, no blend tricks, no scroll pin, no
// ambient pools, no grain, no exit fades, no marquee — all parked in the
// system, none invited here); imagery appears once, as the work itself.
//
// Cut in the earn-its-place pass (2026-07-09 evening): the hero disciplines
// list, the proof four-up, the service-row leads, the "Who we work with"
// industries section, and the CTA's email/location rail. ("Kind words"
// was also cut that day, then returned the same evening as ONE visibly-
// placeholder testimonial after the receipts — see the section note.)

// Editorial date for the blog teaser cards.
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

// The receipts — closes the Selected work section (returned 2026-07-09
// after the earn-its-place cut: proof belongs beside its evidence; the
// ranking is the Hawkes study's, the rest are definitionally true).
const PROOF = [
  { value: "#1–3", label: "Google positions won for a specialist's key procedures" },
  { value: "0", label: "templates used — every practice designed from scratch" },
  { value: "100%", label: "of our work is for medical aesthetics & surgery" },
  { value: "2", label: "countries our clients practise in — Sydney to London" },
] as const;

// How we work — same five steps as /services (kept in step with it; the
// homepage is the teaser, /services the detail).
const PROCESS = [
  { num: "01", title: "Discovery", body: "We learn your practice, your patients and your market — and define what success actually looks like." },
  { num: "02", title: "Strategy", body: "Positioning, information architecture and an SEO plan that the design and build will deliver against." },
  { num: "03", title: "Design", body: "Brand and interface design, refined together, until it feels unmistakably yours." },
  { num: "04", title: "Build & launch", body: "A fast, technically sound build, launched carefully — with the schema, analytics and redirects handled." },
  { num: "05", title: "Refine", body: "We measure, learn and improve. Search and conversion compound when you keep tending them." },
] as const;

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 3);

  const logoStripItems: LogoStripItem[] = featured.map((project) => ({
    name: project.frontmatter.client,
    href: `/work/${project.slug}`,
  }));

  return (
    <main className="bg-ink text-bone">
      {/* ── Hero — type only. Two big Saol lines with the italic accent, the
          lede in the sans, the flagship CTA pair. ── */}
      <section className="flex min-h-[92svh] flex-col justify-center">
        <div className="shell pt-24 md:pt-28">
          <h1 className="display-mega opacity-0 animate-fade-in-up">
            Practices that patients <em>trust</em>.
          </h1>
          <p
            className="body-lg mt-10 max-w-[44ch] text-bone-dim opacity-0 animate-fade-in-up md:mt-12"
            style={{ animationDelay: "0.25s" }}
          >
            Brand, web design and SEO for cosmetic surgeons, medical aesthetic
            clinics and dermatology practices.
          </p>
          {/* The view's ONE flagship (.btn-arrow — the nav demoted to a
              secondary outline in the same change), paired with the tertiary
              ghost. Primary action + quiet exploration. */}
          <div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 opacity-0 animate-fade-in-up md:mt-12"
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
        </div>
      </section>

      {/* ── Trust bar — a quiet ruled strip of client wordmarks. ── */}
      <LogoStrip items={logoStripItems} />

      {/* ── The studio — moved ABOVE the work 2026-07-09: the statement
          answers the H1's claim directly, so the page reads claim → who's
          behind it → proof → offer → method → act. ── */}
      <section className="py-32 md:py-44">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">The studio</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <p className="heading-xl max-w-[24ch] text-balance reveal md:col-span-8">
              A studio that treats the clinic&rsquo;s digital presence with the
              same care as the practice <em>itself</em>.
            </p>
            <div className="md:col-span-4 md:pt-3">
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
          the project's one-line outcome from its frontmatter. Closes with
          THE RECEIPTS: the proof numbers live here (returned 2026-07-09,
          compact) because they belong beside their evidence — the #1–3
          ranking is the Hawkes study's, shown directly above. ── */}
      <section id="selected-work" className="scroll-mt-14 py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline reveal">Selected work</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
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
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
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

          {/* The receipts — what the work above delivers. A CALL-OUT, not a
              footnote (bumped to heading-xl 2026-07-09): the numbers join
              the statement/service-row register. Defensible: the ranking is
              the Hawkes study's, the rest are definitionally true. */}
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t rule-dark pt-10 md:mt-28 md:grid-cols-4 md:pt-12">
            {PROOF.map((stat, i) => (
              <div key={stat.value} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <p className="heading-xl text-bone">{stat.value}</p>
                <p className="body-sm mt-3 max-w-[24ch] text-bone-dim">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kind words — ONE testimonial, returned 2026-07-09 as the page's
          human proof (work → numbers → words). Square portrait slot on the
          left (flat parchment until real photography lands — may yet become
          a text-only piece), the quote at statement register, ruled
          attribution.
          ⚠ EVERYTHING here is VISIBLY-MARKED PLACEHOLDER until real client
          words, a real portrait and permission exist — we never draft quotes
          on a client's behalf (pre-launch checklist). Swap the content, keep
          the structure. ── */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <p className="overline mb-8 reveal md:mb-10">Kind words</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
            {/* IMAGERY PLACEHOLDER — client portrait slot */}
            <div className="reveal md:col-span-4">
              <div className="frame aspect-[4/5]">
                <span className="portrait-fill absolute inset-0 flex items-end p-5">
                  <span className="overline text-ink/40">Portrait slot</span>
                </span>
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
                className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t rule-dark pt-5 reveal"
                style={{ transitionDelay: "160ms" }}
              >
                <p className="body-sm text-bone">Client name</p>
                <span aria-hidden className="hidden h-3 w-px bg-bone/15 sm:block" />
                <p className="body-sm text-bone-dim">Role, Practice — placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How we work — the five steps, same as /services. ── */}
      <section className="py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="overline reveal">How we work</p>
              <h2 className="heading-lg from-overline max-w-[16ch] reveal" style={{ transitionDelay: "80ms" }}>
                Clarity, not surprises
              </h2>
            </div>
            <Link href="/services" className="btn-ghost shrink-0 text-bone reveal">
              The full process <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <div
                key={p.num}
                className="border-t rule-dark pt-5 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="index-num text-clay">{p.num}</p>
                <h3 className="heading-sm mt-3">{p.title}</h3>
                <p className="body-sm mt-3 text-bone-dim">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog teasers ── */}
      {posts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="overline reveal">Blog</p>
                <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                  Thinking, written down
                </h2>
              </div>
              <Link href="/blog" className="btn-ghost text-bone reveal">
                All entries <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="frame aspect-[4/3]">
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
                  <h3 className="heading-md mt-3 max-w-[24ch] text-bone transition-opacity group-hover:opacity-70">
                    {post.frontmatter.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA — bone interruption, the close. ── */}
      <ContactCTA />
    </main>
  );
}
