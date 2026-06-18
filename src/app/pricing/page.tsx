import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing — Packages & engagements",
  description:
    "Transparent packages for medical aesthetic and cosmetic surgery practices — from focused website builds to full brand-and-web engagements with ongoing SEO.",
  alternates: { canonical: "/pricing" },
};

// ⚠️ Guide pricing — placeholder figures. Set real numbers before launch.
const PACKAGES = [
  {
    name: "Website",
    price: "from $9,000",
    summary: "A fast, SEO-ready website on your existing brand.",
    for: "Practices with a brand they're happy with that need a site that finally performs.",
    includes: [
      "Up to 8 core pages",
      "Bespoke design on your brand",
      "Next.js build, hosted on Netlify",
      "Technical SEO & schema",
      "Accessibility (WCAG AA)",
      "Analytics & enquiry tracking",
    ],
    featured: false,
  },
  {
    name: "Brand & Web",
    price: "from $18,000",
    summary: "A new identity and the website to carry it. Our core engagement.",
    for: "Practices ready to look — and rank — like the leader in their market.",
    includes: [
      "Full brand identity system",
      "Up to 15 pages",
      "Procedure / treatment architecture",
      "Technical & on-page SEO",
      "Structured data across the site",
      "Launch, redirects & handover",
    ],
    featured: true,
  },
  {
    name: "Growth retainer",
    price: "from $2,500 / mo",
    summary: "Ongoing SEO, content and refinement after launch.",
    for: "Practices that want search and conversion to compound month on month.",
    includes: [
      "Monthly SEO & content work",
      "Journal articles written for you",
      "Conversion testing & refinement",
      "Technical health monitoring",
      "Quarterly strategy review",
      "Priority studio access",
    ],
    featured: false,
  },
];

const FAQS = [
  {
    question: "Why isn't your exact pricing listed?",
    answer:
      "The figures here are starting points. Every practice is different in scope, page count and content readiness, so we quote precisely after a short discovery call rather than pretend one number fits all.",
  },
  {
    question: "Do you offer payment in stages?",
    answer:
      "Yes. Project work is typically split across milestones — a deposit to begin, a payment at design sign-off, and the balance at launch. Retainers are billed monthly.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You own the site and the brand outright. Many practices move onto a Growth retainer so search and conversion keep improving, but it's entirely optional — there's no lock-in.",
  },
  {
    question: "Can you work with our existing developer or marketer?",
    answer:
      "Often, yes. We're happy to collaborate with an in-house team or trusted freelancer and define clear boundaries so nothing is duplicated or dropped.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <JsonLd
        data={[
          ...PACKAGES.map((p) =>
            serviceSchema({ name: `${p.name} package`, description: p.summary, path: "/pricing" }),
          ),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />

      <PageHero
        overline="Pricing"
        title="Clear packages. No surprises."
        lede="Three ways to work with the studio, with guide pricing to help you plan. We quote precisely after a short discovery call."
      />

      {/* Packages */}
      <section className="bg-ink">
        <div className="shell py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGES.map((p, i) => (
              <div
                key={p.name}
                className={`reveal rounded-sm border p-8 flex flex-col ${
                  p.featured ? "border-champagne bg-ink-raised" : "rule-dark"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {p.featured && <p className="overline text-champagne">Most chosen</p>}
                <h2 className="heading-md text-bone mt-1">{p.name}</h2>
                <p className="stat text-bone mt-4" style={{ fontSize: "clamp(1.75rem,1.3rem+1.5vw,2.5rem)" }}>
                  {p.price}
                </p>
                <p className="body mt-3 text-bone-dim">{p.summary}</p>
                <p className="label mt-4 text-clay">{p.for}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {p.includes.map((item) => (
                    <li key={item} className="body flex gap-3 text-bone/85">
                      <span className="text-champagne" aria-hidden>
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn mt-8 ${p.featured ? "btn-primary-dark" : "btn-secondary-dark"}`}
                >
                  Enquire
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
          <p className="fineprint mt-8 max-w-2xl">
            Guide pricing shown to help you plan. Final quotes depend on scope, page count and
            content readiness, and are confirmed in writing after a discovery call.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone text-ink">
        <div className="shell py-20 md:py-28">
          <p className="overline text-clay reveal">Questions</p>
          <h2 className="heading-xl from-overline reveal" style={{ transitionDelay: "80ms" }}>
            Pricing questions
          </h2>
          <div className="mt-12 max-w-3xl divide-y rule-light">
            {FAQS.map((f) => (
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
