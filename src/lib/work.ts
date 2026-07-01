import {
  createCollection,
  isIsoDate,
  isKebabSlug,
  isNonEmptyString,
  isStringArray,
  type CollectionEntry,
} from "@/lib/content";

/**
 * Work — the case-study portfolio. A structured MDX collection (one file per
 * project) so each engagement gets its own indexable page, schema, and a
 * consistent content model: client, sector, the services delivered, headline
 * outcome metrics, and a long-form write-up in the MDX body.
 */

export const WORK_SECTORS = [
  "cosmetic-surgery",
  "medical-aesthetics",
  "dermatology",
  "dental",
  "wellness",
] as const;

export type WorkSector = (typeof WORK_SECTORS)[number];

export interface WorkMetric {
  /** The number/headline, e.g. "+212%" or "#1". */
  value: string;
  /** What it measures, e.g. "organic enquiries, 6 months". */
  label: string;
}

export interface WorkFrontmatter {
  title: string; // project title, e.g. "A calmer first impression for a Sydney rhinoplasty practice"
  slug?: string;
  description: string; // meta description / index summary
  client: string; // client/practice name
  sector: WorkSector;
  services: string[]; // e.g. ["Brand identity", "Web design", "SEO"]
  year: string; // "2026"
  publishedAt: string; // YYYY-MM-DD — controls ordering
  updatedAt?: string;
  location?: string; // "Sydney, AU"
  url?: string; // live site URL
  summary?: string; // one-line outcome shown on the index card
  metrics?: WorkMetric[]; // headline outcome stats
  domain?: string; // display domain for the hero browser mockup (fm.url wins)
  heroImage?: string; // desktop capture (~16:10) — fills the hero BrowserMockup
  heroImageAlt?: string;
  mobileImage?: string; // tall mobile capture — the overlapping PhoneMockup
  mobileImageAlt?: string;
  thumbImage?: string;
  thumbImageAlt?: string;
  featured?: boolean; // surface on the homepage
  readingTime?: number;
}

export type WorkEntry = CollectionEntry<WorkFrontmatter>;

const REQUIRED_STRINGS = [
  "title",
  "description",
  "client",
  "sector",
  "year",
  "publishedAt",
] as const;

function isMetricArray(v: unknown): v is WorkMetric[] {
  return (
    Array.isArray(v) &&
    v.every(
      (m) =>
        m &&
        typeof m === "object" &&
        isNonEmptyString((m as WorkMetric).value) &&
        isNonEmptyString((m as WorkMetric).label),
    )
  );
}

function validate(fileName: string, data: Record<string, unknown>): void {
  const errors: string[] = [];

  for (const field of REQUIRED_STRINGS) {
    if (!isNonEmptyString(data[field])) {
      errors.push(`"${field}" is required and must be a non-empty string`);
    }
  }

  if (isNonEmptyString(data.sector) && !WORK_SECTORS.includes(data.sector as WorkSector)) {
    errors.push(`"sector" must be one of: ${WORK_SECTORS.join(", ")} (got "${data.sector}")`);
  }

  if (!isStringArray(data.services)) {
    errors.push(`"services" is required and must be a non-empty array of strings`);
  }

  if (data.publishedAt !== undefined && !isIsoDate(data.publishedAt)) {
    errors.push(`"publishedAt" must be a YYYY-MM-DD date (got "${data.publishedAt}")`);
  }
  if (data.updatedAt !== undefined && !isIsoDate(data.updatedAt)) {
    errors.push(`"updatedAt", when set, must be a YYYY-MM-DD date (got "${data.updatedAt}")`);
  }

  if (data.metrics !== undefined && !isMetricArray(data.metrics)) {
    errors.push(`"metrics", when set, must be an array of { value, label } objects`);
  }

  if (data.heroImage !== undefined && !isNonEmptyString(data.heroImageAlt)) {
    errors.push(`"heroImageAlt" is required when "heroImage" is set (accessibility)`);
  }
  if (data.mobileImage !== undefined && !isNonEmptyString(data.mobileImageAlt)) {
    errors.push(`"mobileImageAlt" is required when "mobileImage" is set (accessibility)`);
  }
  if (data.thumbImage !== undefined && !isNonEmptyString(data.thumbImageAlt)) {
    errors.push(`"thumbImageAlt" is required when "thumbImage" is set (accessibility)`);
  }

  if (data.slug !== undefined && !isKebabSlug(data.slug)) {
    errors.push(`"slug", when set, must be lowercase kebab-case (got "${data.slug}")`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid Work case study "${fileName}":\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }
}

const work = createCollection<WorkFrontmatter>({
  label: "Work",
  dir: "work",
  validate,
});

export const getAllProjects = work.getAll;
export const getAllSlugs = work.getAllSlugs;
export const getProjectBySlug = work.getBySlug;
export const getFeaturedProjects = (limit?: number) => {
  const featured = work.getAll().filter((p) => p.frontmatter.featured);
  const list = featured.length > 0 ? featured : work.getAll();
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

export function getSectorLabel(sector: WorkSector): string {
  const labels: Record<WorkSector, string> = {
    "cosmetic-surgery": "Cosmetic Surgery",
    "medical-aesthetics": "Medical Aesthetics",
    dermatology: "Dermatology",
    dental: "Dental",
    wellness: "Wellness",
  };
  return labels[sector];
}
