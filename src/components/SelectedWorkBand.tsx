import Carousel from "@/components/Carousel";
import WorkComingSoon from "@/components/WorkComingSoon";
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
 *   · md+ — a LEVEL pair. The right column used to start a beat lower (a
 *     deliberate jag); the client levelled it 2026-08-09, in the same breath
 *     as removing the header. The two calls belong together: the jag was
 *     legible as rhythm while a header sat above it setting the section's
 *     baseline, and with the header gone the offset just read as one plate
 *     hanging lower than the other.
 *
 * NO HEADER SINCE 2026-08-09 (client: remove "Selected work / Practices
 * we've refined / All work"). The plates introduce themselves — each already
 * carries its client name and its one-line outcome — so the band is now the
 * work and nothing else. ⚠ CONSEQUENCE WORTH KNOWING: the "All work" link
 * went with it, so this section no longer routes anywhere. /work is still
 * reachable from the nav and the footer, but if this band is meant to feed
 * the case-study index, that link needs a home.
 *
 * `id="selected-work"` is a live anchor target (SmoothScroll intercepts the
 * same-page jump), so it stays with the section, as does the `scroll-mt-14`
 * that keeps the head clear of the landing.
 *
 * PADDING, 2026-08-09 (client: "remove excessive padding"). `py-24 md:py-32`
 * → `py-16 md:py-24`, and the grid's own `mt-14 md:mt-20` lead-in is gone
 * outright. That lead-in was the gap BETWEEN the header and the plates; with
 * the header removed it became a second helping of top padding stacked on
 * the section's own, which is most of what read as excessive — 128px of
 * section padding plus 80px of grid margin put the first plate 208px below
 * the band's edge. Both values are already in the sitewide census, so this
 * is a re-use rather than a new number. (It supersedes the 2026-08-08 note
 * that had just restored symmetric padding here for the opposite reason.)
 *
 * The band's own copy is the section's identity rather than page content, so
 * it defaults here (the ContactCTA precedent) and the page passes only the
 * projects. Override the strings for a different collection; the data is
 * always the caller's.
 *
 * LIGHT, 2026-08-09 (client: "Work: (light BG)" on the homepage): bg-bone +
 * text-ink + grain-light, the exact light-band recipe ManifestoTrack and
 * Testimonial's light tone already use. This band carried NO ground class of
 * its own before — it silently inherited main's bg-ink, which is why it
 * never needed grain either (a dark section with no visible boundary needs
 * no material of its own). Now that it is its own light region it takes
 * grain-light like every other section on the site, per the one-material
 * rule. tone="light" threads through the mobile Carousel's folio and every
 * WorkPlate, so nothing here still speaks the on-ink ladder.
 */
export default function SelectedWorkBand({
  projects,
  railLabel = "Selected work",
}: {
  projects: WorkEntry[];
  /** Accessible name for the mobile rail region. The band has no visible
      heading now, so this is the only thing naming the rail to a screen
      reader — it is load-bearing rather than decorative. */
  railLabel?: string;
}) {
  return (
    <section
      id="selected-work"
      className="relative scroll-mt-14 grain-light bg-bone py-16 text-ink md:py-24"
    >
      <div className="shell">
        {/* Mobile: the contact-sheet rail (2026-07-11, client's call) —
            all four captures in one beat, reader-driven like the blog
            rail below. */}
        <div className="reveal md:hidden" style={{ transitionDelay: "120ms" }}>
          <Carousel
            ariaLabel={railLabel}
            className=""
            slideClassName="w-[76vw]"
            tone="light"
          >
            {projects.map((project) => (
              <WorkPlate key={project.slug} project={project} tone="light" />
            ))}
            {/* The honest gap closes the rail too, not just the desktop grid
                — otherwise the phone reader reaches the end of a two-plate
                rail with no indication the portfolio is still growing. */}
            <WorkComingSoon key="coming-soon" shape="plate" tone="light" />
          </Carousel>
        </div>

        {/* Desktop: a LEVEL pair — the stagger came off 2026-08-09 with the
            header (see the note above for why the two go together). The
            plates now share one top line, and `items-start` keeps that true
            when their captions run to different depths: without it the grid
            stretches both cells to the tallest and a shorter plate's caption
            drifts from its neighbour's. */}
        <div className="hidden grid-cols-1 items-start gap-x-8 gap-y-16 md:grid md:grid-cols-2">
          {projects.map((project, i) => (
            <WorkPlate
              key={project.slug}
              project={project}
              tone="light"
              className="reveal"
              delay={(i % 2) * 120}
            />
          ))}
          {/* THE HONEST GAP (2026-08-09, client: down to two real pieces,
              "just put more coming soon"). With the stagger gone it simply
              takes the next cell — first column of the second row. */}
          <WorkComingSoon shape="plate" tone="light" />
        </div>
      </div>
    </section>
  );
}
