import Link from "next/link";
import type { WorkEntry } from "@/lib/work";
import { getSectorLabel } from "@/lib/work";

/**
 * Case-study card for the Work index and the homepage selected-work grid.
 * The thumb area falls back to a typographic placeholder when no image is set,
 * so the studio site looks intentional before real project imagery lands.
 * `tone` matches the section it sits on: "dark" (ink, default) or "light"
 * (the bone selected-work band on the homepage).
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

  return (
    <Link href={`/work/${slug}`} className="group block reveal" style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      {/* Thumb — a slim faux-browser (echoing BrowserMockup) so every capture
          sits at a PROPER browser aspect (16:10 viewport) under a chrome bar.
          Falls back to the typographic placeholder until imagery lands. */}
      <div className="overflow-hidden rounded-xl border border-ink-line bg-ink-raised">
        <div className="flex items-center gap-1.5 border-b rule-dark bg-ink/60 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-clay/50" />
          <span className="h-2 w-2 rounded-full bg-clay/35" />
          <span className="h-2 w-2 rounded-full bg-clay/25" />
          {fm.domain && (
            <span className="ml-2.5 flex h-5 items-center rounded-md border border-ink-line bg-ink/70 px-2.5 font-mono text-[9px] tracking-wide text-bone-dim">
              {fm.domain}
            </span>
          )}
        </div>
        <div className="frame aspect-[1.6] w-full">
          {fm.thumbImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fm.thumbImage}
              alt={fm.thumbImageAlt ?? ""}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-bone/20 text-6xl">{num}</span>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className={`overline ${light ? "text-clay" : "text-champagne"}`}>{getSectorLabel(fm.sector)}</p>
        <p className="label text-clay">{fm.year}</p>
      </div>
      <h3 className={`heading-md mt-2 transition-opacity group-hover:opacity-70 ${light ? "text-ink" : "text-bone"}`}>
        {fm.title}
      </h3>
      {fm.summary && <p className={`body mt-2 ${light ? "text-ink/70" : "text-bone-dim"}`}>{fm.summary}</p>}
      <p className="label mt-4 text-clay">{fm.services.join(" · ")}</p>
    </Link>
  );
}
