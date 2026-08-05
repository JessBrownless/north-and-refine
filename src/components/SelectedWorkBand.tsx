import type { ReactNode } from "react";
import Carousel from "@/components/Carousel";
import CollectionHeader from "@/components/CollectionHeader";
import WorkPlate from "@/components/WorkPlate";
import type { WorkEntry } from "@/lib/work";

/**
 * SELECTED WORK — the homepage's imagery beat: plain frames, real captures,
 * ruled captions and the project's own one-line outcome. THE WORK IS THE
 * PROOF: the receipts strip that used to close this section was cut 2026-07-10
 * when the numbers were audited against what we can actually stand behind, and
 * real client-approved metrics belong inside their case studies.
 *
 * TWO LAYOUTS, ONE SET OF PLATES:
 *   · mobile — the contact-sheet rail (2026-07-11, client's call), all four
 *     captures in one beat, reader-driven like the blog rail;
 *   · md+ — the staggered pair rhythm, the right column starting a beat lower
 *     (the deliberate jag that What-we-do's ruled rows stabilise).
 *
 * `id="selected-work"` is a live anchor target (SmoothScroll intercepts the
 * same-page jump), so it stays with the section, as does the `scroll-mt-14`
 * that keeps the head clear of the landing.
 *
 * The band's own copy is the section's identity rather than page content, so
 * it defaults here (the ContactCTA precedent) and the page passes only the
 * projects. Override the strings for a different collection; the data is
 * always the caller's.
 */
export default function SelectedWorkBand({
  projects,
  kicker = "Selected work",
  title = (
    <>
      Practices we&rsquo;ve <em>refined</em>
    </>
  ),
  linkHref = "/work",
  linkLabel = "All work",
  railLabel = "Selected work",
}: {
  projects: WorkEntry[];
  kicker?: string;
  title?: ReactNode;
  linkHref?: string;
  linkLabel?: string;
  /** Accessible name for the mobile rail region. */
  railLabel?: string;
}) {
  return (
    <section id="selected-work" className="relative scroll-mt-14 pb-24 md:pb-32">
      <div className="shell">
        <CollectionHeader
          kicker={kicker}
          title={title}
          linkHref={linkHref}
          linkLabel={linkLabel}
        />

        {/* Mobile: the contact-sheet rail (2026-07-11, client's call) —
            all four captures in one beat, reader-driven like the blog
            rail below. */}
        <div className="reveal md:hidden" style={{ transitionDelay: "120ms" }}>
          <Carousel
            ariaLabel={railLabel}
            className="mt-14"
            slideClassName="w-[76vw]"
          >
            {projects.map((project) => (
              <WorkPlate key={project.slug} project={project} />
            ))}
          </Carousel>
        </div>

        {/* Desktop: the staggered pair rhythm — the right column starts a
            beat lower. */}
        <div className="mt-14 hidden grid-cols-1 gap-x-8 gap-y-16 md:mt-20 md:grid md:grid-cols-2">
          {projects.map((project, i) => (
            <WorkPlate
              key={project.slug}
              project={project}
              className={`reveal ${i % 2 === 1 ? "md:mt-28" : ""}`}
              delay={(i % 2) * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
