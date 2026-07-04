import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/journal";
import { getAllProjects } from "@/lib/work";
import { INDUSTRIES } from "@/lib/industries";

// Public, indexable routes. The /stylesheet design canon is intentionally
// excluded (it's an internal reference, also blocked in robots.ts). /pricing
// is parked while it carries placeholder figures — the page still resolves by
// URL but isn't advertised here or linked in the nav until it has real numbers.
const STATIC_ROUTES = [
  "",
  "/work",
  "/services",
  "/industries",
  "/about",
  "/journal",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const workEntries: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${SITE.url}/work/${p.slug}`,
    lastModified: p.frontmatter.updatedAt ?? p.frontmatter.publishedAt,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const journalEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/journal/${p.slug}`,
    lastModified: p.frontmatter.updatedAt ?? p.frontmatter.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const industryEntries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${SITE.url}/industries/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...workEntries, ...journalEntries, ...industryEntries];
}
