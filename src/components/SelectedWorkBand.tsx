import CollectionHeader from "@/components/CollectionHeader";
import Carousel from "@/components/Carousel";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import SectionGlow from "@/components/SectionGlow";
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
 * PADDING, 2026-08-09 (client: "remove excessive padding", then later the
 * same day "the padding needs to be removed from the top" — so the band is
 * now bottom-padded only, `pb-16 md:pb-24`). First pass: `py-24 md:py-32`
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
  ground,
  actSelf = false,
}: {
  /** THE ACT SYSTEM (2026-08-11). Declaring a ground opts this band into the
      act rule in globals.css: a run of adjacent same-ground bands is padded
      as ONE act — generous at the outer edges, one small dose at the
      invisible joins between. Omit it and the band keeps its own padding,
      which is what every non-homepage consumer does. */
  ground?: "ink" | "bone";
  /** "I declare my ground for ADJACENCY only; I pace myself." For bands whose
      air comes from something other than padding. */
  actSelf?: boolean;
  projects: WorkEntry[];
  /** Accessible name for the mobile rail region. The band has no visible
      heading now, so this is the only thing naming the rail to a screen
      reader — it is load-bearing rather than decorative. */
  railLabel?: string;
}) {
  /* ⚠ GROUND DRIVES COLOUR AS WELL AS SPACING (2026-08-11). It began as a
     spacing declaration for the act rule, which left the actual background
     hardcoded separately — so a band could say data-ground="ink" while
     rendering bg-bone, and the act padding would be computed for a colour the
     page was not showing. One prop now decides the paint, the material, the
     type ladder threaded to the molecules AND the act padding, so they cannot
     disagree. Re-grounding a band is one word; this page's grounds have moved
     five times in a month. */
  const light = ground === "bone";
  return (
    <section
      {...(ground ? { "data-ground": ground } : {})}
      {...(actSelf ? { "data-act-self": "" } : {})}
      id="selected-work"
      className={`relative scroll-mt-14 overflow-hidden pb-16 md:pb-24 ${light ? "grain-light bg-bone text-ink" : ""}`}
    >
      {/* THE GLOW CARRIES OVER (2026-08-09, client: "the blurred gradient
          bits from the section above need to kind of come into this
          section"). The gradient was stopping dead at the boundary for a
          concrete reason rather than a stylistic one: ManifestoTrack carries
          `overflow-hidden`, which CLIPS its glow at its own bottom edge, so
          the light physically could not spill however bright it got.

          This is SectionGlow used exactly as briefed. Its own origin was the
          client asking for "a blob that helps it fade into the next section,
          AND THEN an individual blob in the next section" — a two-part
          device, not one glow stretched across a seam. So the tail (which
          starts at top:-12%, above this section's own edge) reads as the
          manifesto's light bleeding down, and the blob carries it on into
          the band. `seam` stays ON here, unlike the manifesto's blob-only
          call: the seam layers ARE the carry-over.

          RIGHT-WEIGHTED to match the band above, so the two read as one wash
          rather than two unrelated pools, and a step quieter (3 against the
          manifesto's 4) because a glow that travels should decay.

          ⚠ overflow-hidden is REQUIRED with a glow — the blob sits at
          right:-14% and would otherwise widen the page. Nothing here pins or
          sticks, so the clip carries no sticky hazard. */}
      {/* ⚠ THE GLOW IS A DARK-GROUND DEVICE AND MUST FOLLOW THE GROUND
          (2026-08-11, client: "this harsh fade is bad"). All three SectionGlow
          layers are painted for ink — the seam wash in particular is
          `linear-gradient(180deg, #14100B 0%, …)`, i.e. NEAR-BLACK AT THE TOP
          EDGE. When this band was re-grounded to bone the wash stayed, so a
          black gradient was being laid over the top of a bone section and
          fading out mid-band. That is the harsh fade she photographed, and it
          was my regression from the re-ground, not a tuning problem.

          Same lesson as `ground` driving paint: a band's ground has to carry
          EVERYTHING that is ground-dependent with it, glow included. On bone
          the band is flat paper — the light act does not carry the hero's
          warmth, it cuts away from it. */}
      {ground !== "bone" && <SectionGlow blob="right" intensity={3} />}

      {/* NO TOP PADDING (same call: "the padding needs to be removed from
          the top"). `py-16 md:py-24` → `pb-16 md:pb-24`. It was symmetric
          for one day, added on 2026-08-08 when the band sat under the bone
          act's hard colour CUT and needed to clear it. That cut is gone —
          the manifesto is ink again, this band is ink, and with the glow now
          crossing the boundary the two are meant to read as continuous. Air
          at the top would reinstate exactly the separation the glow is here
          to remove. */}
      <div className="shell relative z-10">
        {/* ⚠ THE HOUSE SECTION HEAD (2026-08-11). This band had NO head at all
            from 2026-08-09, then a 16px `.body` line with a down-arrow. Both were
            superseded when the client chose ONE grammar for every homepage band
            ("they don't look like they live on the same website"). Measured, this
            band was the hole in the page: its largest type was a 22px CARD
            CAPTION, sitting between bands at 100px and 100px, and it named itself
            in the BODY voice while every other band used the Geist Mono kicker.
            ⚠ THE "All work" LINK STAYS REMOVED (client, 2026-08-09) — only the
            head came back, which is why CollectionHeader's link is now optional. */}
        {/* ⚠ THE GAP LIVES HERE, NOT IN THE HEAD. CollectionHeader leaves outer
            spacing to its consumer (Blog supplies it via the carousel's mt-14
            md:mt-20). When this band's 16px signpost became the house head on
            2026-08-11 the signpost's own mb-10 md:mb-12 went with it and the
            title ended up flush against the plates — 0px. These are that
            signpost's original values, restored, not new spacing. */}
        <div className="mb-10 md:mb-12">
          <CollectionHeader kicker="Selected work" title="Recent work, up close." />
        </div>

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
      {/* THE BLACK FADE-OUT (2026-08-09, client: "any section that's black,
          as it goes up to the top of the screen on scroll, to fade into
          black… a little black fade over it"). This is the site's existing
          handover overlay, driven by <ExitFades> in the root layout, and the
          rule it has always carried is the one the client just described in
          her own words: the fade-to-INK belongs to DARK sections. That is
          precisely why it came OFF What we do, Kind words and the blog rail
          earlier today — those went bone, and an ink wash over a light band
          was the "fades to white as you scroll" bug. Now it goes back on the
          bands that are actually black.

          ⚠ It must stay a DIRECT child of this section: <ExitFades> measures
          el.parentElement to get its scope, so wrapping it changes the window
          it fades over. */}
      <ExitFadeOverlay />
    </section>
  );
}
