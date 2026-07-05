import Link from "next/link";

/**
 * What-we-do as statement typography: three .display-scale service titles,
 * each on its own ruled row with a "Read more" button on the right — the
 * whole row links to /services. The click-to-reveal accordion was removed
 * 2026-07-05 (the titles carry the section alone; detail lives on
 * /services). Order is the sell: web first, search second, brand third.
 */
const SERVICES = ["Web design & build", "SEO & content", "Brand identity"] as const;

export default function ServicesShowcase() {
  return (
    <div>
      {SERVICES.map((title) => (
        <Link
          key={title}
          href="/services"
          className="group flex flex-col items-start gap-5 border-b rule-dark py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:py-9"
        >
          <span className="display block text-bone transition-opacity duration-500 group-hover:opacity-70">
            {title}
          </span>
          {/* Visual button — the row itself is the link */}
          <span className="btn btn-sm btn-secondary-dark shrink-0">
            Read more
            <span aria-hidden>→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
