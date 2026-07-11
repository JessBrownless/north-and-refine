import { SITE, absoluteUrl } from "@/lib/site";

/**
 * Schema.org JSON-LD builders. Each returns a plain object to hand to the
 * <JsonLd> component. Centralised so structured data stays consistent and
 * grounded in one set of brand facts (SITE). This site is SEO-led — schema is
 * a first-class concern, not an afterthought.
 *
 * @id values give nodes stable identifiers so they can reference each other
 * across pages (the Organization is the publisher of every Article, etc.).
 */

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** The studio as an Organization. Emitted once, site-wide, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    slogan: SITE.tagline,
    sameAs: [...SITE.sameAs],
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: [
      "Web design",
      "Brand identity",
      "Search engine optimisation",
      "Medical aesthetics marketing",
      "Cosmetic surgery websites",
    ],
  };
}

/** WebSite node — enables sitelinks search box eligibility and ties pages together. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
  };
}

/** BreadcrumbList from an ordered list of { name, path }. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface ArticleInput {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  section?: string;
  image?: string;
  author?: string;
}

/** Article schema for a blog post, published by the studio. */
export function articleSchema(a: ArticleInput) {
  const url = `${SITE.url}/blog/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.image ? { image: absoluteUrl(a.image) } : {}),
    author: { "@type": "Organization", "@id": ORG_ID, name: a.author ?? SITE.name },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

interface CaseStudyInput {
  title: string;
  description: string;
  slug: string;
  client: string;
  publishedAt: string;
  updatedAt?: string;
  services?: string[];
  image?: string;
  liveUrl?: string;
}

/** CreativeWork schema for a Work case study, created by the studio. */
export function caseStudySchema(c: CaseStudyInput) {
  const url = `${SITE.url}/work/${c.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    headline: c.title,
    description: c.description,
    datePublished: c.publishedAt,
    dateModified: c.updatedAt ?? c.publishedAt,
    ...(c.image ? { image: absoluteUrl(c.image) } : {}),
    ...(c.services && c.services.length ? { keywords: c.services.join(", ") } : {}),
    creator: { "@id": ORG_ID },
    author: { "@id": ORG_ID },
    about: { "@type": "Organization", name: c.client },
    ...(c.liveUrl ? { mainEntity: { "@type": "WebSite", url: c.liveUrl } } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

interface ServiceInput {
  name: string;
  description: string;
  path: string;
}

/** Service schema for a productised offering, provided by the studio. */
export function serviceSchema(s: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.name,
    name: s.name,
    description: s.description,
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
    url: absoluteUrl(s.path),
  };
}

/** FAQPage schema from question/answer pairs. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** ContactPage schema — the /contact page's own node. */
export function contactPageSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: absoluteUrl("/contact"),
    description,
  };
}
