import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/industries";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const canonical = `/industries/${industry.slug}`;
  return {
    title: industry.heading,
    description: industry.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: industry.heading,
      description: industry.metaDescription,
      url: canonical,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: industry.heading,
            description: industry.metaDescription,
            path: `/industries/${industry.slug}`,
          }),
          faqSchema(industry.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
        ]}
      />

      <PageHero
        overline={industry.name}
        title={industry.heading}
        lede={industry.intro}
        cta={{ label: "Start a project", href: "/contact" }}
      />

      {/* What we do for this niche */}
      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <p className="overline reveal">How we help</p>
              <h2 className="heading-lg text-bone from-overline reveal" style={{ transitionDelay: "80ms" }}>
                What we bring to {industry.name.toLowerCase()}
              </h2>
            </div>
            <ul className="md:col-span-8 divide-y rule-dark border-y rule-dark">
              {industry.points.map((point, i) => (
                <li
                  key={point}
                  className="flex gap-5 py-5 reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="index-num text-clay shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="body-lg text-bone/85">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone text-ink">
        <div className="shell py-20 md:py-28">
          <p className="overline text-clay reveal">Questions</p>
          <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
            {industry.name} FAQs
          </h2>
          <div className="mt-12 max-w-3xl divide-y rule-light">
            {industry.faqs.map((f) => (
              <details key={f.question} className="group py-6">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                  <span className="heading-sm">{f.question}</span>
                  <span className="text-champagne text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="body mt-4 text-ink/70">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
