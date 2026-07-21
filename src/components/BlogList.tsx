"use client";

import { useState } from "react";
import Link from "next/link";

/** Serialisable card data — the server pre-formats everything (date, category
    label) so this client component imports nothing from @/lib/journal (that
    module pulls in server-only fs code and must not reach the browser). */
export type BlogCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  dateLabel: string;
  readingMinutes: number;
  featuredImage: string | null;
  featuredImageAlt: string | null;
};

export type BlogFilterOption = { value: string; label: string };

/**
 * The blog index listing + a CATEGORY FILTER STRIP (2026-07-12, client's
 * call: "another strip with a line under the hero ... use it as a filter").
 *
 * A client component so filtering is instant, but ALL posts are rendered on
 * the server into the DOM first (this only shows/hides them) — the filter is
 * progressive enhancement, so search engines still see every entry.
 *
 * The strip is a ruled band on the bone ground: its top rule is the hero's
 * borderBottom, its own border-b closes it before the posts (content-width so
 * it lines up with the hero line and the post dividers). Filters are the meta
 * voice (overline); active/hover is a CHAMPAGNE UNDERLINE — the sanctioned
 * interaction accent (never champagne on the label text itself, per canon).
 */
export default function BlogList({
  cards,
  filters,
}: {
  cards: BlogCard[];
  filters: BlogFilterOption[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? cards.filter((c) => c.category === active) : cards;
  const activeLabel = active ? filters.find((f) => f.value === active)?.label : null;

  // Only worth a filter when there's more than one category to choose between.
  const showFilter = filters.length > 1;
  const options: { value: string | null; label: string }[] = [
    { value: null, label: "All" },
    ...filters,
  ];

  return (
    <>
      {showFilter && (
        <section className="scene-warm text-ink">
          <div className="shell">
            <nav
              aria-label="Filter posts by category"
              className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b rule-light py-5 md:py-6"
            >
              {options.map((o) => {
                const isActive = o.value === active;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setActive(o.value)}
                    aria-pressed={isActive}
                    className={`group relative overline transition-colors ${
                      isActive ? "text-ink" : "text-ink-mute hover:text-ink"
                    }`}
                  >
                    {o.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-2 left-0 h-px bg-champagne transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </section>
      )}

      <section className="scene-warm text-ink">
        <div className="shell py-16 md:py-24">
          {/* Screen-reader feedback when the filter changes (WCAG 4.1.3
              Status Messages) — the visual list change is silent otherwise. */}
          <p className="sr-only" role="status" aria-live="polite">
            {`Showing ${filtered.length} ${filtered.length === 1 ? "post" : "posts"}${
              activeLabel ? ` in ${activeLabel}` : ""
            }`}
          </p>
          {filtered.length > 0 ? (
            <div className="divide-y rule-light border-b rule-light">
              {filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-10 md:py-14">
                  {/* Feature card (2026-07-12, client: the plain list "felt
                      undesigned"): image LEFT / text RIGHT on desktop, image
                      TOP / text below on mobile (so the image leads instead of
                      sitting buried at the foot). 16:10 per the ratio canon;
                      no hover motion on the plate (drift #14) — affordance is
                      the caption dim + the champagne "Read" arrow. */}
                  <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10">
                    <div className="frame aspect-[16/10]">
                      {post.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featuredImage}
                          alt={post.featuredImageAlt ?? ""}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                          <span className="index-num text-ink-faint" aria-hidden>
                            ✦
                          </span>
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <p className="overline text-clay">{post.categoryLabel}</p>
                        <span aria-hidden className="text-ink-faint">
                          ·
                        </span>
                        {/* text-ink-mute ≈ 5.0:1 on bone (AA) — quiet but legible. */}
                        <p className="label text-ink-mute">{post.dateLabel}</p>
                      </div>
                      <h2 className="card-title mt-4 text-ink line-clamp-2 transition-opacity group-hover:opacity-60">
                        {post.title}
                      </h2>
                      <p className="body mt-3 line-clamp-2 max-w-[54ch] text-ink-dim">
                        {post.description}
                      </p>
                      <div className="mt-6 flex items-center gap-4">
                        <span className="label text-ink-mute">{post.readingMinutes} min read</span>
                        <span aria-hidden className="text-ink-faint">
                          ·
                        </span>
                        <span className="cta-label inline-flex items-center gap-1.5 text-ink transition-all group-hover:gap-2.5">
                          Read
                          <span aria-hidden className="transition-colors group-hover:text-champagne">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="body text-ink-dim">No entries in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
