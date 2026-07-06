/**
 * Site-wide constants. Single source of truth for canonical URL, studio
 * identity, and the nav model. Imported by metadata, sitemap, robots, JSON-LD
 * schema, and the chrome (Navbar/Footer). Change brand facts here, not inline.
 */

export const SITE = {
  name: "North & Refine",
  legalName: "North & Refine Studio",
  // ⚠️ Update to the real production domain before launch.
  url: "https://northandrefine.com",
  tagline: "Web, search and brand, built for medical and surgical practitioners and clinics",
  description:
    "A design studio building considered brands and SEO-led websites for cosmetic surgeons, medical aesthetic clinics and dermatology practices.",
  email: "studio@northandrefine.com",
  // Primary service area — tune to where you actually take clients.
  areaServed: ["Australia", "United Kingdom", "United States"],
  sameAs: [
    "https://www.instagram.com/northandrefine",
    "https://www.linkedin.com/company/northandrefine",
  ],
  logo: "/logo.svg",
  ogImage: "/og/default.png",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

// Primary navigation — the lean header spine (MVP). Held to the core
// conversion path: see the work, what we do, who we are.
export const NAV: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
];

// Footer "Explore" column — fuller than the header so the secondary SEO
// surfaces (Industries, Journal) stay internally linked and crawlable without
// crowding the primary nav. Pricing is intentionally omitted until it carries
// real figures (see the pre-launch checklist in CLAUDE.md).
export const FOOTER_NAV: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/** Absolute URL from a path (or pass-through if already absolute). */
export function absoluteUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE.url}${pathOrUrl}`;
}
