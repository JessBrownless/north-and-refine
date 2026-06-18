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

      <PageHero
        overline="Selected work"
        title="Considered work for practices that take care seriously."
        lede="A look at the brands and websites we've built — and the difference they made to the practices behind them."
      />

      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
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
