import {
  createCollection,
  isIsoDate,
  isKebabSlug,
  isNonEmptyString,
  type CollectionEntry,
} from "@/lib/content";

/**
 * The Journal — North & Refine's editorial/SEO blog. Long-form pieces on web
 * design, branding, SEO and conversion for medical aesthetic and cosmetic
 * surgery practices.
 */

export const JOURNAL_CATEGORIES = [
  "seo",
  "web-design",
  "branding",
  "conversion",
  "studio-notes",
] as const;

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number];

export interface JournalFrontmatter {
  title: string;
  slug?: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: JournalCategory;
  author?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  readingTime?: number;
}

export type JournalEntry = CollectionEntry<JournalFrontmatter>;

const REQUIRED_STRINGS = ["title", "description", "publishedAt", "category"] as const;

function validate(fileName: string, data: Record<string, unknown>): void {
  const errors: string[] = [];

  for (const field of REQUIRED_STRINGS) {
    if (!isNonEmptyString(data[field])) {
      errors.push(`"${field}" is required and must be a non-empty string`);
    }
  }

  if (
    isNonEmptyString(data.category) &&
    !JOURNAL_CATEGORIES.includes(data.category as JournalCategory)
  ) {
    errors.push(
      `"category" must be one of: ${JOURNAL_CATEGORIES.join(", ")} (got "${data.category}")`,
    );
  }

  if (data.publishedAt !== undefined && !isIsoDate(data.publishedAt)) {
    errors.push(`"publishedAt" must be a YYYY-MM-DD date (got "${data.publishedAt}")`);
  }
  if (data.updatedAt !== undefined && !isIsoDate(data.updatedAt)) {
    errors.push(`"updatedAt", when set, must be a YYYY-MM-DD date (got "${data.updatedAt}")`);
  }

  if (data.featuredImage !== undefined) {
    if (!isNonEmptyString(data.featuredImage)) {
      errors.push(`"featuredImage", when set, must be a non-empty path string`);
    }
    if (!isNonEmptyString(data.featuredImageAlt)) {
      errors.push(`"featuredImageAlt" is required when "featuredImage" is set (accessibility)`);
    }
  }

  if (data.slug !== undefined && !isKebabSlug(data.slug)) {
    errors.push(`"slug", when set, must be lowercase kebab-case (got "${data.slug}")`);
  }

  if (
    data.readingTime !== undefined &&
    (typeof data.readingTime !== "number" || data.readingTime <= 0)
  ) {
    errors.push(`"readingTime", when set, must be a positive number`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid Journal entry "${fileName}":\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }
}

const journal = createCollection<JournalFrontmatter>({
  label: "Journal",
  dir: "journal",
  validate,
});

export const getAllPosts = journal.getAll;
export const getAllSlugs = journal.getAllSlugs;
export const getPostBySlug = journal.getBySlug;

export function getCategoryLabel(category: JournalCategory): string {
  const labels: Record<JournalCategory, string> = {
    seo: "SEO",
    "web-design": "Web Design",
    branding: "Branding",
    conversion: "Conversion",
    "studio-notes": "Studio Notes",
  };
  return labels[category];
}
