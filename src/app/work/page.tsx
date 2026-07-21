import type { Metadata } from "next";
import { getAllProjects } from "@/lib/work";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import WorkCard from "@/components/WorkCard";
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

      {/* Text-only SPLIT hero (2026-07-13): the plain left masthead read as
          "text plonked" with a dead right half. The spacious asymmetric split
          (display heading left, lede right on its last baseline) makes it a
          moment and fills the space — kept text-only on purpose, the imagery
          arrives in the work grid directly below. grain={false} so the hero
          is FLAT ink, tonally identical to that grid (the 4% grain read as a
          lighter "different black" at the seam); borderBottom draws the one
          hairline that separates the text hero from the imagery.
          H1 REWRITTEN 2026-07-16 (voice sweep): "…practices that take care
          seriously" read as disparaging other practices — the same pattern
          fixed on /about 2026-07-12. The claim is now the work's own. */}
      <PageHero
        align="split"
        spacious
        grain={false}
        borderBottom
        overline="Selected work"
        title={
          <>
            The work, and the <em>difference</em> it made.
          </>
        }
        lede="A look at the brands and websites we've built, and what changed for the practices behind them."
      />

      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
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
