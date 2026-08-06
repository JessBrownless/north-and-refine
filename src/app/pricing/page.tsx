import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingPackageGrid, { type PricingPackage } from "@/components/PricingPackageGrid";
import FaqSection from "@/components/FaqSection";
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
const PACKAGES: PricingPackage[] = [
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
      "Blog articles written for you",
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

      {/* The canonical interior masthead (2026-07-16 hero-cohesion pass) —
          gains the hero CTA per the settled policy: /pricing is a
          commercial page. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Pricing"
        title={
          <>
            Clear packages. No <em>surprises.</em>
          </>
        }
        lede="Three ways to work with the studio, with guide pricing to help you plan. We quote precisely after a short discovery call."
        cta={{ label: "Start a project", href: "/start-a-project" }}
        /* Proof before price: the honest second step for a reader who has
           just been shown figures. */
        ctaSecondary={{ label: "See the work", href: "/work" }}
      />

      {/* Packages — the figures above are PLACEHOLDERS (pre-launch
          checklist); the grid only renders what it is handed. */}
      <PricingPackageGrid packages={PACKAGES} />

      {/* FAQ — the shared <FaqSection> (2026-07-24: the last bespoke
          <details> block on the site folded into the one component, per the
          client's "make ALL FAQs the same styling"). */}
      <FaqSection
        kicker="Questions"
        heading="Pricing questions."
        faqs={FAQS}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
