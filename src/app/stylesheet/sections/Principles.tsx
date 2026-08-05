import { Tier, Section, Sub, Code, Entry, StatusTag } from "../_ui";

/**
 * TIER 01 — PRINCIPLES.
 *
 * The canon that governs before anything is drawn. Deliberately PROSE: no
 * swatches, no specimens. Those live in Atoms; a rule that has to be looked
 * at rather than read has already failed.
 *
 * Every claim in this file was checked against the code it describes
 * (globals.css, layout.tsx, lib/forms.ts and the named consumers) during the
 * 2026-08-05 rebuild. The page it replaces had drifted into describing a
 * retired direction, which is the failure mode this tier exists to prevent.
 */

/** A rule list: rows on the same hairline rhythm as <Entry>. */
function Points({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6">{children}</ul>;
}

function Point({ children }: { children: React.ReactNode }) {
  return <li className="body-sm border-t rule-dark py-3 text-bone-dim">{children}</li>;
}

export default function PrinciplesTier() {
  return (
    <>
      <Tier
        id="principles"
        num="01"
        title="Principles"
        note="The canon that governs before anything is drawn. A page has to satisfy these before a single token is chosen: what the ground does, how a thing is picked, what may be claimed, and who has to be able to read it. Everything in the tiers below is downstream of this."
      />

      {/* ── How to read this page ────────────────────────────────────────── */}
      <Section
        id="principles-truth-contract"
        title="How to read this page"
        note="This page is the SOURCE, not the mirror. It says how things should be, and where the live site disagrees with it, the SITE is wrong. That is an inversion of what this section said when it was written on 2026-08-02, and the reason for the change is worth keeping: a page that may only describe what already ships can never lead a change. You could not say “all hero buttons take this tier”, only report which ones happen to. ⚠ BUT PRESCRIPTION WITHOUT A CHECK IS HOW THIS PAGE STARTED LYING. Its claim that Saol carried every heading was true, then became an intention, then a falsehood, and nothing on the page could tell the difference — an audit found 32 statements the code contradicted. So the contract has two halves and needs both: the page prescribes, AND every prescription is mechanically checkable against the code. A statement the site does not yet satisfy is allowed here only while a ticket exists to make it true; without that ticket it is not a standard, it is a wish, and a wish on this page is indistinguishable from a lie."
      >
        <Points>
          <Point>
            The tokens and this page change together. If a token is added to{" "}
            <Code>globals.css</Code>, it is documented here in the same change; if
            one is deleted, its entry goes with it. A design system that lags its
            own stylesheet stops being consulted, and once it stops being
            consulted it starts being contradicted.
          </Point>
          <Point>
            Three states are marked. LIVE is the default and carries no tag.
            <StatusTag status="parked" /> means deliberately kept but currently
            unused, with the reason recorded.
            <StatusTag status="deprecated" /> means superseded: it survives only
            for the archive that still references it, and it is not for new work.
          </Point>
          <Point>
            Parked is not dead, and the tag is the whole point of the
            distinction: it stops the next audit deleting something the canon put
            in the drawer on purpose, and it stops a reader assuming the thing is
            in play.
          </Point>
          <Point>
            Where a decision has a recorded reason, the reason is given in a
            clause. A rule with no reason attached is a rule the next reader will
            quietly break, usually within the month.
          </Point>
          <Point>
            Anything the code does not support is not written here. The
            page this one replaces still described a two-font house built on a
            licensed serif, a retired mono and a set of utilities that no longer
            exist; the type facts, the ladders and the parked register below were
            all re-read from source for this rebuild.
          </Point>
        </Points>
      </Section>

      {/* ── The ground is flat ───────────────────────────────────────────── */}
      <Section
        id="principles-flat-ground"
        title="The ground is flat"
        note="Flat ink and flat bone are the DEFAULT ground: every section background gradient was retired on 2026-07-09. What survives is a short list of named, scoped exceptions, each of which had to be argued for. 'No gradients anywhere' would be a tidier rule and an untrue one."
      >
        <Sub
          title="The named exceptions"
          note="Each lives inside something: a hero's own ground, a card, a plate. None of them paints a body section."
        />
        <Entry
          name="<HeroGlow>"
          what="The warm glow ground shared by the homepage hero and every interior hero, so the heroes read as one site rather than several. Blobs plus a vignette, rendered as absolute pointer-events-none layers."
          where="HomeHero, PageHero, SectionGlow, the /about shared canvas and the ContactCTA close card. The parent owns the warm base and the clip; the glow never becomes a section paint."
        />
        <Entry
          name="ContactCTA close card"
          what="The close carries the hero's own ground INSIDE a rounded card: warm base, HeroGlow, grain. The page opens under the warm light and shuts on the same light held in a card."
          where="The section around it stays flat ink with grain. The gradient is contained by the card, and that containment is the exception's whole licence."
        />
        <Entry
          name="Ember grades"
          what="The ember ramp tints CONTAINED imagery only: a photograph graded, not a ground painted. At most one per page."
          where="Live on the Start-a-project overlay's portrait, as an ember-burnt multiply wash under an ink foot scrim."
        />
        <Entry
          name="ServicesScrollIndex tiles"
          what="The 1-2-3 tile plates run a quiet diagonal wash across the three paper stocks, ivory to bone to cream, so each row reads as a lit plate against the dark ground."
          where="Inside the tile, at the client's call. The section holding the tiles stays flat."
        />
        <Points>
          <Point>
            If a section feels dead, the answer is content, type or grain, never a
            new glow. Grain is the material and is constant; glow is light and
            decays. A second glow is never added further down a page to continue a
            blend: let the first one decay and keep the grain continuous.
          </Point>
          <Point>
            Two separately-grounded dark sections are never blended by
            colour-matching their boundary. That approach shipped and failed
            twice: any residual mismatch reads as a cut. The sanctioned technique
            is ONE wrapper that owns the whole ground, with the children rendering
            groundless on it, which is what /about does.
          </Point>
          <Point>
            The homepage craft card that older canon names as a gradient
            exception is NOT live. The hero was rebuilt as the edge-to-edge device
            hero and the card left with it; the exception list above is the
            current one.
          </Point>
        </Points>
      </Section>

      {/* ── Pick by ground ───────────────────────────────────────────────── */}
      <Section
        id="principles-pick-by-ground"
        title="Pick by ground, never by taste"
        note="Several tokens only work on one ground. Choosing between them is a question about what sits BEHIND the element, and it has a right answer; swapped, both halves of a pair fail in ways that read as bugs rather than as choices."
      >
        <Points>
          <Point>
            <Code>.glass-float</Code> goes over imagery or a gradient, where there
            is something to blur and something to float above.{" "}
            <Code>.card-glass</Code> goes over a flat ink section. Swapped, both
            fail: a 38% ink fill on flat ink is invisible, and a 44px drop shadow
            on a flat ground is a shadow cast by nothing.
          </Point>
          <Point>
            The type ladders come in pairs, one per ground. On ink: bone,
            bone-dim, clay. On bone: ink, ink-dim, ink-mute. A ladder cannot be
            carried across a ground switch unchanged, because clay is sub-AA on
            light and ink-mute is sub-AA on either cream.
          </Point>
          <Point>
            Champagne cannot carry state on a light ground: against bone it
            measures under 2:1, so a gold focus rule is a rule you cannot see and
            a gold error message is unreadable. On light, INK carries focus,
            errors and a selected control's rim while champagne keeps hover and
            ornament. A champagne FILL under an ink glyph survives on either
            ground, which is why the tick box is the same on both.
          </Point>
          <Point>
            Grain comes in two. <Code>.grain</Code> is 4% at normal blend for dark
            grounds; <Code>.grain-light</Code> is the same noise at 5% with
            multiply for bone and cream, where the dark overlay's normal blend
            would wash the stock out. Every section on the site carries one or the
            other, so no ground is a flat paint next to a material.
          </Point>
          <Point>
            <Code>.grain</Code> does NOT need <Code>overflow-hidden</Code>: its
            pseudo-element is inset-0, so nothing can overflow. Only glow blobs
            need the clip, and the clip is expensive: an overflow-hidden ancestor
            silently becomes a sticky element's scroll container and the pin stops
            working with no error. Put the glow in an absolutely-positioned
            clipped layer that is a SIBLING of the sticky content.
          </Point>
        </Points>
      </Section>

      {/* ── Entrances ────────────────────────────────────────────────────── */}
      <Section
        id="principles-entrances"
        title="Entrances fade in place"
        note="Sliding in is a screen idiom; ink develops where it sits, and print never arrives from somewhere. The 16px rise was retired on 2026-07-10 and the fade was slowed to suit, because fades read best unhurried."
      >
        <Points>
          <Point>
            <Code>.reveal</Code> is a pure 1.1s opacity fade, driven by ONE global
            IntersectionObserver mounted in the root layout. Stagger with an
            inline transitionDelay; never add a rival scroll listener.
          </Point>
          <Point>
            The retired rise has one live exception, recorded here rather than
            quietly tolerated: the mobile nav drawer still runs{" "}
            <Code>animate-fade-in-up</Code> on its links and its Instagram line,
            staggered 60ms apart. An overlay arriving is arguably a different act
            from a page section developing; until that is either argued properly
            or fixed, the exception stands in the open.
          </Point>
          <Point>
            Imagery is the slow layer: <Code>.plate-develop</Code> fades over 2.4s
            against type's 1.1s, so prints come up after the ink has set. Outside
            a reveal an image is simply visible, so the utility is safe anywhere.
          </Point>
          <Point>
            Glass has its own entrance, and it obeys this rule rather than
            escaping it: the design source&rsquo;s version rode a translate and a
            scale, the transform was dropped on import, and the blur burn-off IS
            the develop. The composition is the frosted panel in Molecules.
          </Point>
          <Point>
            Nothing auto-moves, and nothing swells on hover.{" "}
            <Code>animate-marquee</Code> is the one sanctioned auto-motion, it
            pauses on hover, and its only site consumer is currently parked.
          </Point>
        </Points>
      </Section>

      {/* ── Rounded brand ────────────────────────────────────────────────── */}
      <Section
        id="principles-rounded-brand"
        title="We are a rounded brand"
        note="Settled 2026-08-01 across two passes: first every plate, then the rest of the furniture. Anything with an AREA rounds. The straight-corner era is over for imagery and for surfaces alike, and the radius is chosen from a scale, never from the design at hand."
      >
        <Points>
          <Point>
            Imagery takes a PLATE token:{" "}
            <Code>rounded-plate-sm</Code> <Code>rounded-plate</Code>{" "}
            <Code>rounded-plate-lg</Code>. These are fluid clamps that grow with
            the viewport: less curve on small plates, more on large.{" "}
            <Code>.frame</Code> carries the standard stop automatically, so most
            imagery needs no radius class at all.
          </Point>
          <Point>
            Surfaces take a UI token: <Code>rounded-ui-sm</Code> 10px for chips
            and choice cards, <Code>rounded-ui</Code> 16px as the standard for
            panels, cards and glass, <Code>rounded-ui-lg</Code> 22px for the
            largest contained surfaces. Fixed px, not clamps: a picture may grow
            its corner with the viewport, a control should not.
          </Point>
          <Point>
            What does not round is what has no corner to round: hairline rules,
            underline-only text inputs whose only edge is the rule beneath, tracked
            type, and the wordmark. The letterform's character is still set by its
            edges; the curve belongs to the furniture.
          </Point>
          <Point>
            Standing exceptions keep their own radii. Pills stay pills, the wax
            seal on a printed page; avatar chips are circles; device bezels keep
            their hardware radii; logo marks and the OG card are untouched,
            because they are marks and platform chrome rather than imagery.
          </Point>
          <Point>
            A raw bracketed radius on imagery or a surface is drift. If a rung is
            genuinely missing, add it to the scale in globals and to the Tailwind
            mirror. <Code>.glass-float</Code> took the 16px token rather than the
            handoff's 14px for exactly this reason: two pixels at panel scale is
            imperceptible, a fourth token is not worth minting, and an inline
            radius is worth even less.
          </Point>
        </Points>
      </Section>

      {/* ── Imagery ──────────────────────────────────────────────────────── */}
      <Section
        id="principles-imagery"
        title="Imagery"
        note="Two ratios, no freelancing. One ratio means one shoot serves more than one slot, and it means a plate never has to be cropped into a shape it was not composed for."
      >
        <Points>
          <Point>
            Landscape is 16:10 for screens and editorial figures: case-study
            captures and frames, work cards, journal featured images. Journal
            imagery is figures, not fashion plates, so it stays landscape.
          </Point>
          <Point>
            Portrait is 4:5 for every human on the site, the 8x10 studio-portrait
            standard, and for Instagram tiles: posts are shot 4:5 and the site
            never crops them, so one shoot serves the feed and the page.
          </Point>
          <Point>
            Desktop captures are shot at 1440x900, a real laptop viewport and
            exactly 16:10, so the plate fits the work uncropped. Never crop a
            capture to fit a frame; re-shoot the capture.
          </Point>
          <Point>
            Exceptions that stay exceptions: device-mockup bezels (hardware), the
            OG card at 1200x630 (platform chrome), and logo marks and wordmarks
            (marks, not imagery). Square is retired from content imagery.
          </Point>
          <Point>
            Plates do not swell. Hover motion on imagery, scale or zoom, is not a
            house behaviour: the affordance is the caption dimming and the arrow
            turning champagne.
          </Point>
        </Points>
      </Section>

      {/* ── Numbers and claims ───────────────────────────────────────────── */}
      <Section
        id="principles-numbers-and-claims"
        title="Numbers and claims"
        note="Our clients work in regulated cosmetic medicine and this site is the studio's own shop window, so a number we cannot defend is a liability pointing in both directions. The rule has held since the 2026-07-10 receipts audit."
      >
        <Points>
          <Point>
            No numbers we cannot defend. A result, a lift or a percentage needs a
            real, client-approved source before it goes near a page. Where an
            illustrative figure is standing in, it is labelled as one in the code
            and listed in the pre-launch checklist, so nothing gets to launch by
            being forgotten.
          </Point>
          <Point>
            Never draft review claims, testimonials or star ratings. A placeholder
            quote stays visibly a placeholder rather than being written into
            something plausible: plausible is precisely the failure, because it
            survives review.
          </Point>
          <Point>
            The medium does not matter. A figure baked into an exported image is
            still a claim, and it is harder to audit than one in the DOM because
            no grep will find it. The /services testimonial plate is the live
            example: its panels assert performance and rating numbers about a real
            client's site, and they sit on the checklist until each is verified or
            the plate is re-cut.
          </Point>
          <Point>
            Graphics that depict mock practices are checked against the
            real-client-work-only rule, and their alt text is rewritten every time
            a plate is re-cut. Alt text describing the previous drop is the one
            thing that drifts silently, because nothing on screen looks wrong.
          </Point>
        </Points>
      </Section>

      {/* ── Voice ────────────────────────────────────────────────────────── */}
      <Section
        id="principles-voice"
        title="Voice"
        note="Restrained, editorial, considered. Taste signals competence in this market, so the writing carries as much of the brand as the type does. The studio speaks as 'we'."
      >
        <Points>
          <Point>
            No exclamation marks, no superlatives, no "transform your life"
            language. The claim is always specific and always something a practice
            could stand behind.
          </Point>
          <Point>
            H1s are sentence case, and a title never trades on comparison or
            disparagement. The claim is the studio's or the work's own focus:
            "practices that take care seriously" implies others do not, and both
            /about and /work were rewritten off that pattern.
          </Point>
          <Point>
            Brand is never named first. Wherever the disciplines are listed the
            order is web, then search, then brand: the studio is website-led and
            the architecture already says so, so the copy has to agree with it.
            This governs H1s, ledes, metadata descriptions and alt text. The one
            sanctioned exception is genuine sequencing advice, where the answer
            argues for the order it states.
          </Point>
          <Point>
            Dashes are swept from drafted copy: prefer colons, semicolons, commas
            and full stops, and restructure the sentence rather than punctuating
            around it. Spelling is Australian and UK first, so enquiry rather than
            inquiry and speciality rather than specialty. Machine vocabulary stays
            American only where the platform demands it: real code, the CSS{" "}
            <Code>color</Code> property, real schema.org type names. Depicted code
            inside a marketing graphic follows the reader's rule, not the
            machine's.
          </Point>
          <Point>
            Regulatory caution. Copy does not name prescription (Schedule 4)
            substances or brand-name treatments; use the generic term
            ("injectables", "anti-wrinkle treatments"), and never write a claim a
            practice could not defend to its regulator.
          </Point>
        </Points>
      </Section>

      {/* ── Accessibility ────────────────────────────────────────────────── */}
      <Section
        id="principles-accessibility"
        title="The accessibility contract"
        note="Measured, not assumed. Both type ladders were derived to hit AA on their own ground, and every ground switch re-runs the maths rather than reusing the answer."
      >
        <Points>
          <Point>
            Two ladders, both AA on their own ground. On ink: bone about 17:1,
            bone-dim about 11:1, clay about 5:1, three clean tiers. On bone: full
            ink, then ink-dim about 6.8:1 and ink-mute about 4.9:1.{" "}
            <Code>--ink-faint</Code> is DECORATIVE only, for separators and
            placeholder glyphs, and never carries text.
          </Point>
          <Point>
            Creams are not bone. On <Code>.scene-cream</Code> and{" "}
            <Code>.scene-cream-deep</Code> ink-mute measures 4.36:1 and 3.85:1,
            both sub-AA, so the meta tier on either cream is ink-dim. Clay is
            sub-AA on any light ground; the one sanctioned survivor is the
            tracked-caps <Code>.overline</Code> kicker, which is brand ornament
            rather than running meta.
          </Point>
          <Point>
            Focus is visible and it is champagne: a 2px outline at 3px offset on{" "}
            <Code>:focus-visible</Code>, declared once in the base layer so
            nothing has to re-state it and nothing is tempted to remove it. On
            bone, where champagne dies, ink carries the field state instead.
          </Point>
          <Point>
            Reduced motion snaps every animation to its end state. One global
            guard zeroes animation duration, iteration count, transition duration
            AND transition delay, which is what stops opacity-0 content that waits
            on a keyframe stranding invisible; <Code>.reveal</Code>,{" "}
            <Code>.glass-frost</Code> and <Code>.tile-draw</Code> each carry their
            own guard as well. The delay is zeroed deliberately: without it,
            staggered entrances would still trickle in one by one.
          </Point>
          <Point>
            A decorative graphic carries exactly ONE written label. The
            composition is marked <Code>role=&quot;img&quot;</Code> with an{" "}
            <Code>aria-label</Code> and everything inside it is hidden from the
            accessibility tree, so a reader gets one sentence rather than a bag of
            fragments, and the invented copy inside a mock practice never reaches
            a screen reader as if it were ours.
          </Point>
        </Points>
      </Section>
    </>
  );
}
