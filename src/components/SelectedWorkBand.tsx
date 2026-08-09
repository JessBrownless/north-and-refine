import Carousel from "@/components/Carousel";
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
 * NO COMING-SOON PLOT HERE SINCE 2026-08-09 (client: "remove the coming
 * soon from the selected work"), on the homepage BOTH layouts — the desktop
 * grid and the mobile rail. It had been added hours earlier ("just put more
 * coming soon") when the portfolio came down to two real pieces. The
 * component is untouched and still live on /work, where `WorkIndexBand`
 * closes the editorial index with `shape="row"`: the honest-gap argument
 * holds on the page whose whole job is the complete portfolio, and reads
 * differently on a homepage band that only ever showed a selection. A
 * SELECTION is not expected to be exhaustive, so it needs no note
 * explaining that it isn't.
 *
 * THE SIGNPOST replaced the header the same day (client: "a small label above the
 * portfolio pieces… body text styled with a downward arrow saying selected
 * work, almost like it looks like it's at the bottom of the text section
 * above"). It is deliberately NOT the header that just left, and the
 * difference is the whole point: a header ANNOUNCES the section beneath it,
 * a signpost POINTS at it. So this takes the BODY register rather than
 * `.overline` or a ladder rung — a kicker in tracked caps would read as
 * exactly the label the client removed — and the ↓ does the pointing.
 *
 * ⚠ IT SITS AT THE TOP OF THIS BAND, NOT THE FOOT OF THE MANIFESTO, even
 * though the client described it as looking like it belongs to the section
 * above. Putting it literally there would strand it: the manifesto is INK
 * and this band is BONE, so the designed colour cut runs between them, and
 * a label on the far side of that cut is separated from the very thing it
 * points at. The "bottom of the section above" feeling is carried by the
 * TREATMENT — small, quiet, body-weight, arrow-led — rather than by
 * position.
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
 * DARK AGAIN 2026-08-09 (client: "make all sections on the homepage dark
 * background by default"), reverting the light flip made earlier the same
 * day. It carries NO ground class of its own — it inherits main's bg-ink,
 * which is the pre-flip state and the reason it needs no grain either: a
 * dark section with no visible boundary of its own needs no material. The
 * tone="light" threading is withdrawn, so the mobile Carousel folio and
 * every WorkPlate speak the on-ink ladder again. Today's other work on this
 * band SURVIVES the revert: no header, the level pair, the tightened
 * padding and the signpost are all unrelated to ground.
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
      className="relative scroll-mt-14 py-16 md:py-24"
    >
      <div className="shell">
        {/* THE SIGNPOST — see the note above for why this is body register
            and not a kicker. `text-bone-dim` is the on-ink BODY tint (it was
            ink-dim while this band was light): the client asked for body
            text, so it takes the body tier rather than clay's meta tier. The arrow is aria-hidden — it is
            a direction, not a word, and a screen reader reading "Selected
            work down arrow" would be worse than reading "Selected work". */}
        <p
          className="body mb-10 flex items-baseline gap-2 text-bone-dim reveal md:mb-12"
        >
          Selected work
          <span aria-hidden>↓</span>
        </p>

        {/* Mobile: the contact-sheet rail (2026-07-11, client's call) —
            all four captures in one beat, reader-driven like the blog
            rail below. */}
        <div className="reveal md:hidden" style={{ transitionDelay: "120ms" }}>
          <Carousel
            ariaLabel={railLabel}
            className=""
            slideClassName="w-[76vw]"
          >
            {projects.map((project) => (
              <WorkPlate key={project.slug} project={project} />
            ))}
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
              className="reveal"
              delay={(i % 2) * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
