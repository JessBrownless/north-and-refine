/**
 * Industries / niches — high-intent SEO landing pages. Each targets a specific
 * search like "cosmetic surgery web design" with its own H1, copy, FAQs and
 * schema. Data-driven (not MDX) because the structure is fixed and repeating;
 * to add a niche, append an entry here and a route renders automatically.
 */

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface Industry {
  slug: string;
  /** Short nav/card label. */
  name: string;
  /** Page H1 — written to read naturally while capturing the target query. */
  heading: string;
  /** The search intent this page targets (used in copy + meta, not stuffed). */
  targetQuery: string;
  /** ~155-char meta description. */
  metaDescription: string;
  /** Opening paragraph(s) shown beneath the hero. */
  intro: string;
  /** What we do for this niche — three to five points. */
  points: string[];
  faqs: IndustryFaq[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "cosmetic-surgery-web-design",
    name: "Cosmetic Surgery",
    heading: "Web design for cosmetic surgeons",
    targetQuery: "cosmetic surgery web design",
    metaDescription:
      "Web design for cosmetic surgeons: considered, fast, SEO-led sites that build trust and turn searches into consultations. See how North & Refine works.",
    intro:
      "A cosmetic surgery website carries unusual weight. A prospective patient is making a considered, often anxious decision, and your site is where credibility is won or lost before they ever call. We design surgical practice sites that feel calm and authoritative, load fast, and are built from the ground up to rank for the procedures you perform.",
    points: [
      "Procedure-led information architecture that maps to how patients actually search",
      "Before-and-after galleries handled with taste and the right consent framework",
      "Technical SEO and schema so each procedure page can rank on its own merits",
      "Considered, regulation-aware copy that reassures without overclaiming",
    ],
    faqs: [
      {
        question: "Do you understand the advertising rules for cosmetic surgery?",
        answer:
          "Yes. We design within the relevant advertising and patient-safety frameworks for the markets we work in, and we build sites that keep you on the right side of them: careful claims, appropriate disclaimers, and consent-led handling of before-and-after imagery.",
      },
      {
        question: "Can you help us rank for specific procedures?",
        answer:
          "That's the core of how we build. Each procedure gets its own properly structured, schema-marked page targeting the way patients search for it, supported by a content plan and a fast, technically sound site.",
      },
      {
        question: "Do you only work with surgeons in one country?",
        answer:
          "No. We work with cosmetic surgery practices across Australia, the UK and the US, and tailor the approach to each market's regulatory and search landscape.",
      },
    ],
  },
  {
    slug: "medical-aesthetic-clinic-branding",
    name: "Medical Aesthetics",
    heading: "Branding & websites for medical aesthetic clinics",
    targetQuery: "medical aesthetic clinic branding",
    metaDescription:
      "Brand identity and websites for medical aesthetic clinics: a considered look and a site that ranks, converts and reflects the standard of your care.",
    intro:
      "Medical aesthetics is a crowded, design-literate market. The clinics that stand out are the ones whose brand feels as considered as their treatments. We build identities and websites for aesthetic clinics that look the part and do the work: attracting the right clients and converting them into bookings.",
    points: [
      "Brand identity systems that read as premium without tipping into clinical coldness",
      "Treatment pages structured for both search and genuine patient education",
      "Booking and enquiry flows designed to reduce friction, not add it",
      "A content engine, the blog model, that compounds in search over time",
    ],
    faqs: [
      {
        question: "We already have a logo. Can you just do the website?",
        answer:
          "Of course. We're happy to design and build a site that works within your existing identity, and we'll flag honestly if anything in the current brand is holding the site back.",
      },
      {
        question: "How do you handle treatment names and regulated language?",
        answer:
          "Carefully. We write treatment copy that educates and ranks while respecting the advertising rules around prescription treatments in your market: generic, compliant language rather than brand-name claims.",
      },
    ],
  },
  {
    slug: "dermatology-website-design",
    name: "Dermatology",
    heading: "Website design for dermatology practices",
    targetQuery: "dermatology website design",
    metaDescription:
      "Website design for dermatology practices that balances medical credibility with cosmetic appeal: fast, accessible, SEO-led and built to convert.",
    intro:
      "Dermatology sits between medical and cosmetic, and the website has to speak to both. A patient might arrive worried about a mole or curious about skin rejuvenation; the same site has to serve both with clarity and reassurance. We design dermatology sites that are credible, accessible, and findable across the full range of conditions and treatments you offer.",
    points: [
      "Clear separation of medical and cosmetic pathways without fragmenting the brand",
      "Condition and treatment libraries structured for search and patient understanding",
      "Accessibility and performance treated as non-negotiable, not nice-to-have",
      "Local SEO so you're found by patients in the areas you serve",
    ],
    faqs: [
      {
        question: "Can you build a large condition and treatment library?",
        answer:
          "Yes: our content collections are built exactly for this. Each condition or treatment becomes its own structured, schema-marked page, scalable to dozens of entries without the site becoming unwieldy.",
      },
      {
        question: "Is accessibility part of what you do?",
        answer:
          "Always. We build to recognised accessibility standards as a baseline. For a medical practice it's both an ethical obligation and increasingly a legal one.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
