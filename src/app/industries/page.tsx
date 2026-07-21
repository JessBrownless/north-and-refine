import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Industries — Who we design for",
  description:
    "We design brands and websites for cosmetic surgeons, medical aesthetic clinics and dermatology practices. Explore our work by specialty.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      {/* The canonical interior masthead (2026-07-16 hero-cohesion pass) —
          carries the hero CTA per the settled policy: the industries pages
          are commercial. Lede dash swept the same day. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Industries"
        title="We design for one world, and we know it well."
        lede="Working within medical aesthetics and cosmetic surgery means we understand the patient, the regulation and the search landscape, as specialists rather than outsiders."
        cta={{ label: "Start a project", href: "/contact" }}
      />

      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          <div className="divide-y rule-dark border-y rule-dark">
            {INDUSTRIES.map((industry, i) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-8 reveal rule-dark"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="max-w-2xl">
                  <h2 className="heading-lg text-bone transition-opacity group-hover:opacity-70">
                    {industry.heading}
                  </h2>
                  <p className="body mt-2 text-bone-dim">{industry.intro.split(". ")[0]}.</p>
                </div>
                <span className="btn-ghost text-bone shrink-0">
                  Explore <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
