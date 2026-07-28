import type { Metadata } from "next";
import { getAllProjects } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import WorkCard from "@/components/WorkCard";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Work — Case studies",
  description:
    "Selected work: brand identities and SEO-led websites for cosmetic surgeons, medical aesthetic clinics and dermatology practices, with the outcomes they delivered.",
  alternates: { canonical: "/work" },
};

/* An inline plate set INTO the headline (2026-07-23 comp): a small 16:10
   chip sized in em so it rides the display clamp. BLANK for now (same-day
   client call, matching the blanked mock-ups sitewide) — quiet dark glass
   until imagery is rechosen; drop a capture back in when it is. Lightly
   rounded per the current curved direction. Decorative → plain span, no
   image, nothing for screen readers beyond the clean sentence. */
function TitleChip() {
  return (
    <span
      aria-hidden
      className="mx-[0.06em] inline-block h-[0.72em] w-[1.15em] overflow-hidden rounded-[0.12em] bg-ink-raised align-[-0.06em]"
    />
  );
}

export default function WorkIndexPage() {
  const projects = getAllProjects();

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      {/* WIDE SPLIT hero with INLINE TITLE CHIPS (2026-07-23, client's comp:
          small plates set INTO the headline between words). `wide` runs the
          H1 across the full rail in long lines with the whole stack flush
          left. Chips are BLANK placeholders for now (the sitewide blanked-
          mock-up call); when imagery is rechosen they should be REAL
          case-study captures — on this page decorative imagery would cheapen
          the real work below, but the work itself woven into the sentence is
          the page's own argument. Still no separate hero graphic: the
          imagery proper arrives in the grid directly below (the media-slot
          rule). GRAIN RESTORED 2026-07-24: the hero ran grain={false} because
          the ungrained grid below made the 4% lift read as a lighter
          "different black" at the seam — now that every dark section on the
          site carries the grain, both sides match and /work stops being the
          one untextured page. borderBottom REMOVED 2026-07-23 (with the
          SectionGlow seam work): hero and grid must read as ONE surface — no
          line at the boundary.
          H1 REWRITTEN 2026-07-16 (voice sweep): "…practices that take care
          seriously" read as disparaging other practices — the same pattern
          fixed on /about 2026-07-12. The claim is now the work's own. */}
      <PageHero
        align="split"
        wide
        spacious
        overline="Selected work"
        title={
          <>
            The work,{" "}
            <span className="whitespace-nowrap">
              and <TitleChip /> the
            </span>{" "}
            <em>difference</em>{" "}
            <span className="whitespace-nowrap">
              it <TitleChip /> made.
            </span>
          </>
        }
        lede="A look at the brands and websites we've built, and what changed for the practices behind them."
      />

      {/* The hero blend decays THROUGH this section (2026-07-23): SectionGlow
          carries the warm ground past the hairline and parks this page's
          individual blob on the right. Content rides z-10 above it. */}
      <section className="relative overflow-hidden grain bg-ink">
        <SectionGlow blob="right" />
        <div className="shell relative z-10 py-16 md:py-24">
          {projects.length > 0 ? (
            <div className="flex flex-col gap-24 md:gap-32">
              {projects.map((project, i) => (
                <WorkCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <p className="body text-bone-dim">
              Case studies are being written up. Check back shortly.
            </p>
          )}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
