/**
 * Services — one page per discipline (2026-07-24). /services became a HUB and
 * each service earned its own route, so each can rank for its own queries
 * ("medical website design", "medical SEO", "medical practice branding")
 * instead of three disciplines sharing one URL.
 *
 * Data-driven (not MDX), exactly like `industries.ts`: the structure is fixed
 * and repeating, so a new service is an entry here and the route renders
 * itself. The hub reads the same array for its index rows, so the hub and the
 * detail pages can never drift apart.
 *
 * PROCESS PER DISCIPLINE — the point of the split (2026-07-24, the client's
 * read): the old single five-step process on the hub was a WEBSITE process
 * ("schema, analytics and redirects", "search and conversion compound") sold
 * under a heading that claimed it ran "every time". A brand-only engagement
 * never reaches those steps. Each service now carries the process it actually
 * runs, and the counts differ because the disciplines differ.
 *
 * VOICE: no dashes (the standing rule — the 2026-07-24 sweep took the em
 * dashes out of the copy inherited from the old hub), Australian English,
 * sentence-case headings, no claim a practice could not stand behind.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  /** Display order on the hub index (also the odometer numeral). */
  num: string;
  /** Short nav/index label. */
  name: string;
  /** Page H1 — sentence case, reads naturally while carrying the query. */
  heading: string;
  /** The search intent this page targets (used in copy + meta, not stuffed). */
  targetQuery: string;
  /** ~155-char meta description. */
  metaDescription: string;
  /** The one-line promise, shown on the hub row and as the page lede. */
  lead: string;
  /** Opening paragraph beneath the hero. */
  intro: string;
  /** What the engagement includes. */
  deliverables: string[];
  /** Signpost + lede over the process timeline. */
  processHeading: string;
  processLede: string;
  /** How this discipline actually runs. Counts differ by design. */
  process: ServiceStep[];
  faqs: ServiceFaq[];
}

/* Order: web + SEO lead, BRAND LAST (2026-07-14, client: "make brand last — I
   don't really want to do that service a lot"). Nums track display order. */
export const SERVICES: Service[] = [
  {
    slug: "web-design",
    num: "01",
    name: "Web design & build",
    heading: "Web design and build for medical practices.",
    targetQuery: "medical website design",
    metaDescription:
      "Web design and build for surgical and medical practices: fast, accessible, SEO-led websites that turn a patient's first search into a booked consultation.",
    lead: "A first consultation that happens before they call.",
    intro:
      "We design and build fast, accessible, beautifully crafted websites on a modern stack. Considered information architecture, procedure-led page structures and friction-free enquiry flows turn an anxious first visit into a booked consultation, without ever feeling like a sales pitch.",
    deliverables: [
      "UX & IA",
      "Bespoke design",
      "Next.js build",
      "Accessibility (WCAG)",
      "Analytics & enquiry flows",
    ],
    processHeading: "A website project, in five steps.",
    processLede:
      "No two practices are quite the same; the work bends to each one. The shape of it doesn't: five stages, in order, every time.",
    process: [
      {
        num: "01",
        title: "Discovery",
        body: "We learn your practice, your patients and your market, and define what success actually looks like.",
      },
      {
        num: "02",
        title: "Strategy",
        body: "Positioning, information architecture and an SEO plan that the design and build will deliver against.",
      },
      {
        num: "03",
        title: "Design",
        body: "Brand and interface design, refined together, until it feels unmistakably yours.",
      },
      {
        num: "04",
        title: "Build & launch",
        body: "A fast, technically sound build, launched carefully, with the schema, analytics and redirects handled.",
      },
      {
        num: "05",
        title: "Refine",
        body: "We measure, learn and improve. Search and conversion compound when you keep tending them.",
      },
    ],
    faqs: [
      {
        question: "What is the site built on?",
        answer:
          "A modern React stack (Next.js), chosen so pages load quickly, stay maintainable for years and can be read cleanly by search engines. Structured data, analytics and redirects are handled as part of the build rather than bolted on after launch.",
      },
      {
        question: "Do you design for the phone first?",
        answer:
          "Most patients find a practice on a phone, often late at night. The phone layout is designed as its own composition rather than a squeezed version of the desktop one, because that is the version most people will actually judge you by.",
      },
      {
        question: "Can you build the site around our existing brand?",
        answer:
          "Yes. If the identity underneath is sound we will happily build on it. If it is working against the practice we will say so honestly before any website work begins, rather than dressing up a problem we can see.",
      },
    ],
  },
  {
    slug: "seo",
    num: "02",
    name: "SEO & content",
    heading: "SEO and content for medical practices.",
    targetQuery: "medical SEO",
    metaDescription:
      "SEO and content for surgical and medical practices: technical foundations, structured data and a content plan built around how patients actually search.",
    lead: "Found by the right patients, on your terms.",
    intro:
      "SEO is not bolted on afterwards; it is in the foundations. Technical SEO, structured data and a content engine built around how patients actually search mean each procedure and condition can earn its own ranking. The model compounds over time, lowering your reliance on paid advertising.",
    deliverables: [
      "Technical SEO",
      "Schema / structured data",
      "Keyword & content strategy",
      "Local SEO",
      "Editorial content engine",
    ],
    processHeading: "How the search work runs.",
    processLede:
      "Search rewards patience and punishes shortcuts. Four stages, and then the part that never really stops.",
    process: [
      {
        num: "01",
        title: "Audit",
        body: "Where the practice ranks today, what the current site does to help or hinder that, and what patients in your area are genuinely searching for.",
      },
      {
        num: "02",
        title: "Plan",
        body: "The procedures, conditions and questions worth owning, mapped to the pages that will own them.",
      },
      {
        num: "03",
        title: "Foundations",
        body: "Structured data, site speed, internal linking and the technical work that lets good content rank at all.",
      },
      {
        num: "04",
        title: "Publish and compound",
        body: "Pages and articles written to the plan, in your voice, then measured and extended. Search rewards the practices that keep tending it.",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Longer than paid advertising, and for longer. Technical improvements can register within weeks; content built around how patients search compounds over months. We would rather set that expectation honestly at the start than promise a number we cannot hold.",
      },
      {
        question: "Would you work with a competing practice nearby?",
        answer:
          "No. We champion one practice per field in a given area, because ranking two competitors against each other would be pointless for both of them.",
      },
      {
        question: "What is structured data, and why does it matter here?",
        answer:
          "It is the markup that tells a search engine what a page actually is: a procedure, a practitioner, a question, a review. It is how a practice earns the richer results patients see before they click, and it is built into every page we make.",
      },
    ],
  },
  {
    slug: "brand-identity",
    num: "03",
    name: "Brand identity",
    heading: "Brand identity for medical practices.",
    targetQuery: "medical practice branding",
    metaDescription:
      "Brand identity for surgical and medical practices: name, logotype, palette, typography, art direction and voice, built to read as calm and credible.",
    lead: "The standard of your care, made visible.",
    intro:
      "Before a patient reads a word, your brand has already told them what to expect. We build identity systems, from name and logotype through palette, typography, art direction and voice, that feel calm, credible and premium, and that hold together across every touchpoint from signage to social.",
    deliverables: [
      "Logo & wordmark",
      "Type & colour system",
      "Art direction",
      "Brand guidelines",
      "Tone of voice",
    ],
    processHeading: "How an identity gets built.",
    processLede:
      "A brand is a set of decisions, made in order. Four stages, each one spending the decisions made before it.",
    process: [
      {
        num: "01",
        title: "Discovery",
        body: "Who the practice serves, what patients ask before they book, and what the practitioner wants to be known for.",
      },
      {
        num: "02",
        title: "Positioning",
        body: "What the practice stands for, and how it should sound saying it.",
      },
      {
        num: "03",
        title: "Identity",
        body: "Logotype, palette, typography and art direction, designed together until it feels unmistakably yours.",
      },
      {
        num: "04",
        title: "The system",
        body: "Guidelines and templates so the identity holds in every hand that uses it later, from signage to social to the site.",
      },
    ],
    faqs: [
      {
        question: "Do we need a new brand, or just a website?",
        answer:
          "Often just a website. A brand only needs rebuilding when it is actively working against the practice: when it looks dated beside the care you give, or says something you have outgrown. We will tell you honestly which of the two you are looking at.",
      },
      {
        question: "Does a rebrand mean changing our name?",
        answer:
          "Rarely. Most practices carry the practitioner's name, and that name holds hard-won recognition. More often the work is everything around it: how it is set, what it sits beside, and how the practice sounds when it speaks.",
      },
      {
        question: "What do we actually receive at the end?",
        answer:
          "The marks and files you need in every format you will use, a type and colour system, art direction for photography, and written guidelines so that anyone applying the brand later does it the way you intended.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
