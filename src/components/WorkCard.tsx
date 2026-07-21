import Link from "next/link";
import type { WorkEntry } from "@/lib/work";
import { getSectorLabel } from "@/lib/work";

/**
 * Case-study piece for the /work index — a HORIZONTAL editorial row (2026-07-14).
 * Big 16:10 image on one side, the case-study text on the other, ALTERNATING
 * sides down the page (flip on odd) for rhythm; the parent stacks them full-
 * width. Client name is elevated from the .card-title caption register to
 * .heading-md — each piece reads as a work in its own right, not a thumbnail
 * (reconcile the "card titles are captions" canon note if kept). Thumb falls
 * back to a typographic placeholder before real imagery lands. `tone`: "dark"
 * (ink, default) or "light" (bone). Only used on /work.
 *
 * (The scroll-driven NUMBERED INDEX explored here 2026-07-14 moved to /services,
 * which is where it was always meant to go.)
 */
export default function WorkCard({
  project,
  index,
  tone = "dark",
}: {
  project: WorkEntry;
  index: number;
  tone?: "dark" | "light";
}) {
  const { slug, frontmatter: fm } = project;
  const num = String(index + 1).padStart(2, "0");
  const light = tone === "light";
  const flip = index % 2 === 1; // alternate the image side down the list

  return (
    <Link href={`/work/${slug}`} className="group block reveal">
      <div className="grid grid-cols-1 gap-7 md:grid-cols-12 md:items-center md:gap-12">
        {/* Image — 7 cols; alternates side (no hover motion — plates don't
            swell, drift rule 14; the affordance is the caption dim + arrow). */}
        <div
          className={`md:row-start-1 md:col-span-7 ${flip ? "md:col-start-6" : "md:col-start-1"}`}
        >
          <div className="frame aspect-[16/10]">
            {fm.cardImage || fm.thumbImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={fm.cardImage ?? fm.thumbImage}
                alt={fm.cardImage ? (fm.cardImageAlt ?? "") : (fm.thumbImageAlt ?? "")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                <span className="index-num text-ink/25" aria-hidden>
                  {num}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Text — 5 cols, vertically centred against the image */}
        <div
          className={`md:row-start-1 md:col-span-5 ${flip ? "md:col-start-1" : "md:col-start-8"}`}
        >
          <p className="overline text-clay">{fm.services.slice(0, 2).join(" · ")}</p>
          <h3
            className={`heading-md from-overline transition-opacity group-hover:opacity-70 ${
              light ? "text-ink" : "text-bone"
            }`}
          >
            {fm.client}
          </h3>
          {fm.summary && (
            <p
              className={`body mt-4 max-w-[46ch] ${light ? "text-ink-dim" : "text-bone-dim"}`}
            >
              {fm.summary}
            </p>
          )}
          <p className="label mt-6 text-clay">
            {getSectorLabel(fm.sector)} · {fm.year}
          </p>
          <span className="cta-label mt-6 inline-flex items-center gap-1.5 transition-all group-hover:gap-2.5">
            View case study
            <span aria-hidden className="transition-colors group-hover:text-champagne">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
