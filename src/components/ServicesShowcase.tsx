import Link from "next/link";

/**
 * What-we-do as statement typography: three .display service titles on ruled
 * rows — .display's FIRST live use (2026-07-11, client's call: sized back up
 * from heading-xl, reversing the 2026-07-09 step-down; the (0n) row indices
 * were dropped the same day — the last on the homepage, completing the
 * index-retirement arc the spine started). The whole row links to /services;
 * the accordion was removed 2026-07-05. Order is the sell: web first, search
 * second, brand third.
 */
// Titles only — the leads were trialled and cut the same day (2026-07-09,
// "everything should earn its place"): the display titles carry the rows.
const SERVICES = ["Web design & build", "SEO & content", "Brand identity"] as const;

export default function ServicesShowcase() {
  return (
    <div className="border-t rule-dark">
      {SERVICES.map((title) => (
        <Link
          key={title}
          href="/services"
          className="group flex flex-col items-start gap-5 border-b rule-dark py-7 sm:flex-row sm:items-end sm:[align-items:last_baseline] sm:justify-between sm:gap-8 md:py-9"
        >
          <span className="display block text-bone transition-opacity duration-500 group-hover:opacity-70">
            {title}
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
