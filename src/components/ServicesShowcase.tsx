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

export default function ServicesShowcase({
  tone = "dark",
}: {
  /** THE GROUND (2026-08-09, born when What we do went light): the rule
      hairlines, the display titles and the ghost link all hardcode the
      on-ink ladder, so a light band needs the swap explicit. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const rule = light ? "rule-light" : "rule-dark";
  return (
    <div className={`border-t ${rule}`}>
      {SERVICES.map((title) => (
        <Link
          key={title}
          href="/services"
          className={`group flex flex-col items-start gap-5 border-b py-7 sm:flex-row sm:items-end sm:[align-items:last_baseline] sm:justify-between sm:gap-8 md:py-9 ${rule}`}
        >
          <span
            className={`display block transition-opacity duration-500 group-hover:opacity-70 ${light ? "text-ink" : "text-bone"}`}
          >
            {title}
          </span>
          {/* Visual affordance — the row itself is the link. Tertiary ghost,
              not a pill: rows are navigation, and the ghost's champagne-arrow
              hover reads through the whole row's group hover. */}
          <span className={`btn-ghost shrink-0 ${light ? "text-ink" : "text-bone"}`}>
            Read more
            <span aria-hidden className="transition-colors group-hover:text-champagne">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
