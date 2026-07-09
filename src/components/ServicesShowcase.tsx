import Link from "next/link";

/**
 * What-we-do as statement typography: three .heading-xl service titles (stepped down from .display 2026-07-09 so a list item never outranks the studio statement),
 * each on its own ruled row with a "Read more" button on the right — the
 * whole row links to /services. The click-to-reveal accordion was removed
 * 2026-07-05 (the titles carry the section alone; detail lives on
 * /services). Order is the sell: web first, search second, brand third.
 */
// Titles only — the leads were trialled and cut the same day (2026-07-09,
// "everything should earn its place"): the display titles carry the rows.
const SERVICES = ["Web design & build", "SEO & content", "Brand identity"] as const;

export default function ServicesShowcase() {
  return (
    <div className="border-t rule-dark">
      {SERVICES.map((title, i) => (
        <Link
          key={title}
          href="/services"
          className="group flex flex-col items-start gap-5 border-b rule-dark py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-9"
        >
          <span className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
            {/* Row index — the same ( 0n ) device as the section rail */}
            <span className="index-num shrink-0 text-clay" aria-hidden>
              ({String(i + 1).padStart(2, "0")})
            </span>
            <span className="heading-xl block text-bone transition-opacity duration-500 group-hover:opacity-70">
              {title}
            </span>
          </span>
          {/* Visual affordance — the row itself is the link. Tertiary ghost,
              not a pill: rows are navigation, and the ghost's champagne-arrow
              hover reads through the whole row's group hover. */}
          <span className="btn-ghost shrink-0 text-bone">
            Read more
            <span aria-hidden className="transition-colors group-hover:text-champagne">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
