import Link from "next/link";
import MetaRow from "@/components/MetaRow";
import type { WorkEntry } from "@/lib/work";

/**
 * ONE SELECTED-WORK PLATE — a real capture in a plain frame, a ruled caption
 * (client name, services meta) and the project's one-line outcome from its
 * frontmatter. Shared by the desktop pair grid and the mobile contact-sheet
 * rail (2026-07-11: four stacked captures made the phone page a scroll
 * marathon; the rail holds all four in one beat, reader-driven).
 *
 * Landscape 16:10, the ratio canon for screens and editorial figures — the
 * capture is never cropped to fit the frame.
 *
 * The whole plate is the link. Affordance is the caption dim and nothing else:
 * plates don't swell, so there is no hover scale here by design.
 *
 * `delay` is the entrance stagger, applied as an inline transitionDelay by the
 * consumer's beat (the pair grid runs the right column 120ms behind); the
 * `.reveal` class itself comes in through `className`, because whether a plate
 * reveals depends on where it sits — inside the mobile rail the wrapper
 * already reveals.
 */
export default function WorkPlate({
  project,
  className = "",
  delay = 0,
}: {
  project: WorkEntry;
  className?: string;
  delay?: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <div className="frame aspect-[16/10]">
        {project.frontmatter.thumbImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.frontmatter.thumbImage}
            alt={project.frontmatter.thumbImageAlt ?? `${project.frontmatter.client} — website design`}
            loading="lazy"
            className="plate-develop absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <span className="portrait-fill absolute inset-0 flex items-center justify-center">
            <span className="index-num text-ink/25" aria-hidden>
              ✦
            </span>
          </span>
        )}
      </div>
      {/* The caption is a MetaRow in its SPREAD shape: the two items are
          pushed to the ends of the row, so the space between them is the
          separator and the glyph is turned off.
          ⚠ The services string still joins its own middot, which is the one
          thing MetaRow's rule forbids. The row cannot fix it, because the
          molecule owns the gap BETWEEN items and never reaches inside one:
          splitting that string into two items is a change to what renders,
          not an extraction. See the note in MetaRow.tsx.
          NO HAIRLINE (2026-08-08, client: "remove the dividing lines under
          the images on the selected work section") — `rule` dropped, so the
          caption sits on the plate's own air rather than under a ruled line.
          Scoped to this component only: /work's own index uses WorkCard, a
          different horizontal editorial layout with no MetaRow or hairline
          of its own, so nothing there is affected. */}
      <MetaRow
        tone="dark"
        spread
        separator={null}
        wrap={false}
        gap="gap-4"
        className="mt-5"
        items={[
          // .card-title (2026-07-11): card titles are captions, not headings —
          // sans, shared with the blog teasers; no Saol em accent.
          <h3 key="client" className="card-title text-bone transition-opacity group-hover:opacity-70">
            {project.frontmatter.client}
          </h3>,
          <span key="services" className="overline text-clay">
            {project.frontmatter.services.slice(0, 2).join(" · ")}
          </span>,
        ]}
      />
      {project.frontmatter.summary && (
        <p className="body-sm mt-3 max-w-[52ch] text-bone-dim">
          {project.frontmatter.summary}
        </p>
      )}
    </Link>
  );
}
