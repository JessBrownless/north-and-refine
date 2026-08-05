import type { Metadata } from "next";
import { getAllProjects } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import HeadlineTitleChip from "@/components/HeadlineTitleChip";
import WorkIndexBand from "@/components/WorkIndexBand";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Work — Case studies",
  description:
    "Selected work: brand identities and SEO-led websites for cosmetic surgeons, medical aesthetic clinics and dermatology practices, with the outcomes they delivered.",
  alternates: { canonical: "/work" },
};

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
          left. The chips are blank placeholders and why is recorded in
          HeadlineTitleChip. Still no separate hero graphic: the imagery
          proper arrives in the grid directly below (the media-slot
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
              and <HeadlineTitleChip /> the
            </span>{" "}
            <em>difference</em>{" "}
            <span className="whitespace-nowrap">
              it <HeadlineTitleChip /> made.
            </span>
          </>
        }
        lede="A look at the brands and websites we've built, and what changed for the practices behind them."
      />

      {/* The hero blend decays THROUGH this band: its SectionGlow carries the
          warm ground past the hairline, which is why the hero above runs with
          no borderBottom. See WorkIndexBand. */}
      <WorkIndexBand projects={projects} />

      <ContactCTA />
    </main>
  );
}
