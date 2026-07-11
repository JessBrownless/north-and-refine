import Link from "next/link";
import type { WorkEntry } from "@/lib/work";
import { getSectorLabel } from "@/lib/work";

/**
 * Case-study card for the Work index grids. (The homepage selected-work
 * band renders its own bespoke hover-reveal card in page.tsx — decided
 * 2026-07-04.) The thumb area falls back to a typographic placeholder when
 * no image is set, so the studio site looks intentional before real project
 * imagery lands. `tone` matches the section it sits on: "dark" (ink,
 * default) or "light" (bone).
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
    /* THE EXTENDED SELECTED-WORK BAND (2026-07-10 sweep): /work adopts the
       homepage's card grammar wholesale — ruled caption (italic client name
       + services meta on a baseline lock), body-sm summary, and the
       staggered pair rhythm (odd cards start a beat lower) — so "All work →"
       lands in the extended edition of the band that sent the reader. */
    <Link
      href={`/work/${slug}`}
      className={`group block reveal ${index % 2 === 1 ? "md:mt-28" : ""}`}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
    >
      {/* Thumb — the styled device COMPOSITE (cardImage on its own matte,
          so no chrome needed here), falling back to the raw capture
          (thumbImage) or the typographic placeholder until imagery lands.
          16:10 per the ratio canon (2026-07-10: landscape is 16:10 —
          captures shot at 1440×900 fit uncropped; re-export any 4:3-era
          cardImage composites on the new plate). No hover motion — plates
          don't swell (drift rule 14). */}
      <div className="frame aspect-[16/10]">
        {fm.cardImage || fm.thumbImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fm.cardImage ?? fm.thumbImage}
            alt={fm.cardImage ? (fm.cardImageAlt ?? "") : (fm.thumbImageAlt ?? "")}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="portrait-fill absolute inset-0 flex items-center justify-center">
            <span className="index-num text-ink/25" aria-hidden>
              {num}
            </span>
          </span>
        )}
      </div>

      {/* Ruled caption — the homepage Selected-work grammar (page.tsx):
          sans .card-title client name, services meta in clay overline,
          baseline-locked on one hairline. */}
      <div className={`mt-5 flex items-baseline justify-between gap-4 border-t pt-4 ${light ? "rule-light" : "rule-dark"}`}>
        <h3 className={`card-title transition-opacity group-hover:opacity-70 ${light ? "text-ink" : "text-bone"}`}>
          {fm.client}
        </h3>
        <span className="overline text-clay">{fm.services.slice(0, 2).join(" · ")}</span>
      </div>
      {fm.summary && (
        <p className={`body-sm mt-3 max-w-[52ch] ${light ? "text-ink/70" : "text-bone-dim"}`}>{fm.summary}</p>
      )}
      <p className="label mt-4 text-clay">
        {getSectorLabel(fm.sector)} · {fm.year}
      </p>
    </Link>
  );
}
