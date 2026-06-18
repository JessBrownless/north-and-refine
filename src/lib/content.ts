import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * Generic MDX content-collection reader.
 *
 * Both the Journal (blog) and Work (case studies) collections are flat
 * directories of `*.mdx` files under `content/<name>/`, read from disk at build
 * time. No CMS — the repo is the source of truth. Each collection supplies its
 * own frontmatter type and a validator; everything else (slug resolution,
 * draft-skipping, sorting, reading time) is shared here.
 *
 * Authoring flow for any collection: `cp _template.mdx my-entry.mdx` (drop the
 * leading underscore) and edit. Files starting with "_" never publish.
 */

export interface CollectionEntry<TFrontmatter> {
  /** Resolved slug — frontmatter `slug` if present, else the filename. */
  slug: string;
  /** Raw MDX body with frontmatter stripped — compile this in the page. */
  content: string;
  frontmatter: TFrontmatter;
  /** Reading-time estimate in minutes (frontmatter override or auto-computed). */
  readingMinutes: number;
}

export interface CollectionConfig<TFrontmatter> {
  /** Human label, used in validation error messages. */
  label: string;
  /** Directory name under content/, e.g. "journal" or "work". */
  dir: string;
  /** Throws (aggregating errors) if the parsed frontmatter is invalid. */
  validate: (fileName: string, data: Record<string, unknown>) => void;
  /** Field used to sort newest-first. Defaults to "publishedAt". */
  sortField?: keyof TFrontmatter & string;
}

export interface Collection<TFrontmatter> {
  getAll: () => CollectionEntry<TFrontmatter>[];
  getAllSlugs: () => string[];
  getBySlug: (slug: string) => CollectionEntry<TFrontmatter> | null;
}

// ── Shared frontmatter validators (reused by each collection's validate fn) ──

export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function isIsoDate(v: unknown): boolean {
  return (
    typeof v === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(v) &&
    !Number.isNaN(new Date(v).getTime())
  );
}

export function isKebabSlug(v: unknown): boolean {
  return isNonEmptyString(v) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(v));
}

export function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => isNonEmptyString(x));
}

function isMdxFile(file: string): boolean {
  return file.endsWith(".mdx") || file.endsWith(".md");
}

function isPublishable(file: string): boolean {
  return isMdxFile(file) && !file.startsWith("_");
}

function fileToSlug(file: string): string {
  return file.replace(/\.mdx?$/, "");
}

/**
 * Build a collection accessor from its config. Returns memo-free readers —
 * Next.js caches the module graph and these run at build time, so re-reading
 * the small content dir per call is fine and keeps the API simple.
 */
export function createCollection<TFrontmatter extends { slug?: string; readingTime?: number }>(
  config: CollectionConfig<TFrontmatter>,
): Collection<TFrontmatter> {
  const contentDir = path.join(process.cwd(), "content", config.dir);
  const sortField = config.sortField ?? "publishedAt";

  function readEntry(fileSlug: string): CollectionEntry<TFrontmatter> | null {
    const mdxPath = path.join(contentDir, `${fileSlug}.mdx`);
    const mdPath = path.join(contentDir, `${fileSlug}.md`);
    const filePath = fs.existsSync(mdxPath)
      ? mdxPath
      : fs.existsSync(mdPath)
        ? mdPath
        : null;
    if (!filePath) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    // Gate: an entry that fails validation throws here and stops the build.
    config.validate(path.basename(filePath), data);
    const frontmatter = data as TFrontmatter;

    const slug = frontmatter.slug?.trim() || fileSlug;
    const readingMinutes =
      frontmatter.readingTime ?? Math.max(1, Math.round(readingTime(content).minutes));

    return { slug, content, frontmatter, readingMinutes };
  }

  function getAll(): CollectionEntry<TFrontmatter>[] {
    if (!fs.existsSync(contentDir)) return [];
    return fs
      .readdirSync(contentDir)
      .filter(isPublishable)
      .map((file) => readEntry(fileToSlug(file)))
      .filter((e): e is CollectionEntry<TFrontmatter> => e !== null)
      .sort((a, b) => {
        const av = String((a.frontmatter as Record<string, unknown>)[sortField] ?? "");
        const bv = String((b.frontmatter as Record<string, unknown>)[sortField] ?? "");
        return new Date(bv).getTime() - new Date(av).getTime();
      });
  }

  return {
    getAll,
    getAllSlugs: () => getAll().map((e) => e.slug),
    getBySlug: (slug) => getAll().find((e) => e.slug === slug) ?? null,
  };
}
