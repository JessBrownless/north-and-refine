import type { WorkEntry } from "@/lib/work";
import SectionGlow from "@/components/SectionGlow";
import WorkCard from "@/components/WorkCard";

/**
 * THE WORK INDEX BAND — the /work portfolio itself: every case study as a
 * full-width `WorkCard` row, stacked on a 24/32 gutter so each piece gets a
 * whole screen's attention rather than sharing one with a neighbour.
 *
 * THE GLOW IS PART OF THE SEAM, not decoration (2026-07-23): `SectionGlow`
 * carries the hero's warm ground PAST the hairline and parks this page's own
 * blob on the right. That is why the hero above runs with `borderBottom` off:
 * hero and grid must read as ONE surface, with no line at the boundary. The
 * content rides z-10 above the blob.
 *
 * `overflow-hidden` is here to clip the glow, not the grain (`.grain`'s
 * ::before is inset-0 and cannot overflow). Nothing in this band pins or
 * scrubs, so the clip carries no sticky hazard; if scroll-driven content ever
 * lands inside, the glow has to move into an absolutely-positioned clipped
 * SIBLING first.
 *
 * THE EMPTY STATE BELONGS TO THE COMPONENT, not the page: a portfolio with
 * nothing in it still has to say something, and this band is the only thing
 * that knows the list came back empty.
 */
export default function WorkIndexBand({
  projects,
}: {
  projects: readonly WorkEntry[];
}) {
  return (
    <section className="relative overflow-hidden grain bg-ink">
      <SectionGlow blob="right" />
      <div className="shell relative z-10 py-16 md:py-24">
        {projects.length > 0 ? (
          <div className="flex flex-col gap-24 md:gap-32">
            {projects.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : (
          <p className="body text-bone-dim">
            Case studies are being written up. Check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}
