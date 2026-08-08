import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";

/**
 * HOMEPAGE HERO — "1D: edge-to-edge devices, one big title" (2026-07-19,
 * client's Claude Design comp; source at design-refs/hero-edge — the NAME
 * survives as the comp's own title, not a description of the current build:
 * "edge-to-edge" described the comp's own composition, which this file
 * departed from once the devices went in FLOW (2026-08-07) and then onto
 * `.shell` (2026-08-09, below) — the row is grid-contained now, not
 * viewport-bleeding). A Geist-Mono kicker (the shared .overline voice), a
 * big Instrument headline with a Saol-italic "trust." accent, and
 * phone·desktop·phone on one shelf line.
 *
 * THE DEVICES ARE THE SYSTEM'S OWN (2026-08-07 night, client: "doesn't the
 * design system have a 'style'? Like the white ones we use in graphics?").
 * The hand-rolled black boxes this file drew for three weeks were drift the
 * whole time — the system already owned canonical device frames, and this
 * hero was the one place on the site depicting devices any other way. Now:
 * `BrowserMockup` + two `PhoneMockup`s in their EDITORIAL placeholder mode —
 * ink frames, ink-line borders, and the BONE mini-site screens ("the white
 * ones") — so the hero's centrepiece stopped being three black voids without
 * waiting on real captures (the client's layout-first ruling stands; real
 * screenshots drop into the same components' `screenshot` props when chosen).
 * The phones ride the new `size="fluid"`, whose container-query chrome keeps
 * an iPhone's corner a RATIO of its body — the fix for "the mockup frames
 * are too rounded on mobile", where fixed 34px corners on a 98px phone had
 * read 35%-round.
 *
 * NAV: none here (2026-07-20, client: "the nav needs to be the same across
 * home & other pages"). The real site <Navbar> renders above this on the
 * homepage like every other page — one nav sitewide.
 *
 * FONTS: Saol (--font-saol) and Geist Mono (--font-geist-mono) are loaded
 * GLOBALLY in layout.tsx — no local loads here. The kicker uses the shared
 * .overline class (mono sitewide); the accent word uses the global Saol var.
 */

/* HEIGHT PARITY (2026-08-07 evening, client: "like all the same height"),
   re-derived for the system components the same night. The phone's width is
   DERIVED from the BrowserMockup's height so the tops stay level at every
   viewport. The browser is taller than the old bare box (its macOS chrome
   bar adds ~48px of fixed height on top of the 1.6 viewport), so parity is
   now an AFFINE relation, not a pure ratio: at equal heights a 0.462-aspect
   phone is a fraction of the desktop's width plus the chrome offset,
   floored in step with the desktop's own 320px floor.

   CQW, NOT VW (2026-08-09, client: "the device mockups perhaps need to go
   to the same content grid as everything else on desktop"). Measured before
   touching anything, at 2200px: .shell's content capped at 1504px (its own
   1600px ceiling minus padding) while the vw-derived row kept growing on
   raw viewport width, so the two phones sat 238px outside the shell's own
   edges on each side — the desktop mockup between them was still inside by
   coincidence, only the phones visibly bled past the rail everything else
   respects. cqw measures against the QUERY CONTAINER (the shell-nested
   wrapper below, containerType:"inline-size", zero padding of its own) —
   the exact same content box .shell hands every other section — so once
   that box stops growing at the 1600px cap, these widths stop growing with
   it. Below the cap the two bases track closely (a shell's own padding is
   the only difference), so the coefficients are re-tuned, not renamed: were
   51.5vw / 15.6vw+24px, now the cqw equivalents measured live at 1470 and
   2200px against the new container. No ceiling beyond the container's own
   — parity is still the tower-guard, both ends scale with the same unit. */
const PHONE_W = "max(121px, 16cqw + 20px)";
const DESKTOP_W = "max(320px, 52.7cqw)";

/* THE OUTER PAIR (2026-08-09, client: "I like how the mockups are now set
   in the content grid, but I want things on the outsides too… even if
   they're trimmed off the edges" — two more frames, one either side).

   DELIBERATELY VW, NOT CQW: the whole point of PHONE_W/DESKTOP_W going cqw
   a few commits ago was to make the CENTRE TRIO stop overflowing the shell
   at wide viewports. These two are the opposite job — they exist ONLY to
   overflow, so they revive the plain, uncapped vw formula the centre trio
   used to carry before that fix (this file's own "1D: edge-to-edge" era).
   cqw is capped by the shell's own 1600px ceiling; a vw value never is, so
   the outer pair keeps pushing past the viewport edge at any width instead
   of eventually fitting inside the shell and reading as just two more
   grid-safe phones — the one outcome the client explicitly welcomed
   ("even if they're trimmed off the edges").

   No separate positioning mechanism needed: they're plain flex children of
   the SAME centred row as the trio. Once the row's total content exceeds
   its own box (guaranteed once these are vw-sized), a flex row overflows
   its container by default — no clip of its own — and the OUTER SECTION's
   overflow:hidden (already there, for the shelf's own bottom trim) is what
   crops them at the true viewport edge. Sized close to PHONE_W's own scale
   at typical widths (~16vw either way) so the five read as one shelf, not
   two different devices.

   ⚠ MEASURED, NOT ASSUMED: this genuinely bleeds past the viewport at
   ORDINARY widths (1470px: ~36% of the outer phone sits outside 0/vw,
   cropped) but STOPS bleeding on a big external monitor once `.shell`'s own
   1600px cap binds — at 2200px there is 300px of gutter on each side
   between the capped shell and the true viewport edge, comfortably wider
   than a 16vw (352px at that width) phone, so it renders whole. Not a bug:
   the client's "even if they're trimmed off the edges" was permission for
   the crop, not a demand for it at every width, and a full extra phone in
   spare gutter on a wide monitor is a reasonable, non-broken outcome. If a
   future ask wants the crop GUARANTEED at any width, the fix is pushing
   these on a value that keeps outrunning the gutter (e.g. anchored to the
   true viewport edge with a transform, not flex overflow) — a different,
   larger mechanism than this one. */
const OUTER_PHONE_W = "max(140px, 16vw)";

export default function HomeHero() {
  return (
    /* GROUNDLESS SINCE 2026-08-07 (client: a visible seam at the hero →
       manifesto join, and the device mock-ups "visibly cut off… reads as a
       mistake"). The section paints NO ground of its own — no background, no
       HeroGlow, no overflow clip, no seam strip. The page wraps this hero and
       the manifesto in ONE <SharedCanvas> that owns base, glow, grain and the
       foot fade, which is the sanctioned fix for a reported seam (CLAUDE.md:
       don't colour-match a boundary, remove it — the anchor-strip contract
       this hero carried for one day went with it).

       LOSING THE CLIP IS ALSO WHAT FREED THE DEVICES: this section's
       overflow-hidden was doing two jobs — the 1D comp's INTENTIONAL
       edge-to-edge side crop (the ~106vw device row bleeding off both sides)
       and an unintentional BOTTOM crop that amputated the phones mid-bezel.
       The clip lives on the canvas now, and since the phone cap the row fits
       the viewport anyway.

       THE LAYOUT WENT TO FLOW (2026-08-07, the layout pass — the client's
       critique list, points 3 and 4: the CTA pills collided with the desktop
       bezel, and the hero had no vertical rhythm). The old build was TWO
       ABSOLUTE LAYERS positioned independently — title block padded from the
       top, device row pinned at top:60% — which is why the pills could land
       on the laptop's bezel at some viewports and why nothing was composed
       against anything. It dated from the bleed-crop era, when the devices
       were background texture and overlap was the point. Now they are
       fully-visible foreground objects, so the hero reads top-to-bottom in
       FLOW: kicker → H1 → CTAs → devices, one column, explicit gaps, a
       collision impossible by construction. The devices sit at the section's
       FOOT (margin-top auto takes the slack when the viewport is tall), so
       the canvas's ink fade lands behind them and the band below cuts where
       their feet end. The section GROWS past 100vh when the stack needs it —
       an intro that scrolls beats an intro that overlaps.

       zIndex 10 lifts the whole hero above the canvas's grain film (z-1).

       THE SHELL WRAP (2026-08-09, client: "the device mockups perhaps need
       to go to the same content grid as everything else on desktop"). The
       hero used to be the one section on the page that wasn't on `.shell` —
       CLAUDE.md's own layout note says the nav and every section share that
       one rail "so the logo/links/CTA align with the hero, sections and
       footer," but the rebuilt-in-flow hero (2026-08-07) never actually
       rejoined it; the title block ran flat 24px side padding with no
       max-width, and the device row sized itself off the raw viewport. Both
       track the viewport near-identically below ~1600px, which is why this
       went unnoticed at typical laptop widths — the divergence only opens
       up once `.shell`'s own 1600px cap binds. Measured before fixing, at
       2200px: shell content 341–1845px, the device row's phones 103–2082px,
       238px outside the rail on each side while Selected work and every
       other band stayed inside it. Now `flex-1` so the shell itself fills
       the section's height and the device row's `marginTop:auto` still
       pushes correctly against IT rather than the section directly. */
    <section
      style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      <div className="shell relative z-10 flex w-full flex-1 flex-col">
        {/* CENTRED TITLE BLOCK — nav clearance + air on top (the nav is
            absolute over the canvas; measure from its foot), then the stack.
            Top air 22vh → 25vh in the 2026-08-08 breathing-room pass ("the
            text needs more breathing room on all of them" — the homepage is
            the text+image style, so its room comes from these two inline
            knobs, not the text-only heroes' vh pump), then → 27vh → 30vh the
            same day with the with-buttons touch ("all h1 heros with buttons
            need a touch more top and bottom padding" — the 27vh first cut
            was +16px at her viewport, invisible, hence "made no
            difference"); the shelf gap moved 9 → 10 → 12vh with it. Side
            padding dropped 2026-08-09: `.shell` provides it now, so a flat
            24px here would have DOUBLE-padded the H1 against the rail. */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(230px,30vh,360px) 0 0" }}>
          {/* THE MASTHEAD RULE (2026-08-05, client: "we've got five or six
              different hero sections and they're kind of the same, let's build
              a rule in that they all use the same heading style. Right now the
              homepage is smaller").

              It was smaller because it was the ONE hero that never used the
              utility. Every other masthead takes `.display` through PageHero;
              this one hand-rolled clamp(38px,7vw,92px) against .display's
              42→100px, so it ran ~8% short at every width and nobody could see
              why without opening two files.

              Four house rules were being broken in this one tag, and adopting
              the class fixes all four at once rather than one at a time:
              the size is now the ladder's, `fontWeight: 500` is gone (headings
              never take a weight — the size IS the hierarchy), the tracking
              and leading come from the rung, and the <em> drops its inline
              Saol so the ACCENT-WORD DEVICE applies from globals instead of a
              hand-typed copy of it that had drifted to a raw #F6E8CD.

              THE KICKER CAME INSIDE (2026-08-05, the masthead-grammar pass:
              "the overline on each hero is actually part of the H1, but
              styled as an overline, and it mimics the page name"). Every
              other masthead's kicker names its page; THE HOMEPAGE IS THE
              EXCEPTION the client named, because a home page has no page name
              to mimic — so its kicker states the offer instead, which is the
              nearest true thing to a page name a landing page has.

              ⚠ This is the one place the change MOVES A PIXEL, and it does so
              on purpose. The hand-rolled clamp(22px,2.4vw,32px) below was the
              from-overline gap typed out by hand — flagged a commit ago as a
              spacing-sweep candidate precisely because it was not the system
              value. Moving the kicker inside the H1 leaves that margin with
              nothing to space, so it goes now and `.with-overline` carries
              the gap: 32px → 35px at desktop, 22px → 15px at 375. The sweep
              inherits one fewer hand-rolled number, not one more. */}
          <h1 className="display text-bone with-overline" style={{ margin: 0 }}>
            <span className="overline" style={{ opacity: 0.85 }}>
              Web, search &amp; SEO for clinics
            </span>
            {/* ⚠ Load-bearing space — see the note in PageHero: without it the
                H1 reads "…for clinicsBuilding websites" to anything parsing
                text rather than layout. Not rendered as a flex item. */}{" "}
            <span>
              {/* The trailing space is the same load-bearing kind, and this
                  one is an OLD bug the move surfaced: JSX drops whitespace
                  around a newline, so this H1 has always extracted as
                  "Building websitesthat patients trust." — the site's most
                  important heading, welded at the line break for every
                  crawler that reads text instead of boxes. The <br/> is a
                  typographic instruction, not a word separator. */}
              Building websites{" "}
              <br />
              that patients <em>trust.</em>
            </span>
          </h1>
          {/* SIDE BY SIDE AGAIN (2026-08-08 late, client: "make the hero
              buttons sit side by side" — reversing the STACKED-AT-EVERY-
              WIDTH call from earlier the same day). That call was measured
              and correct on its own terms (the pill's optical centre sat at
              −83px, the ghost's at +129px, so a centred ROW read left-heavy)
              — but the client has now seen both and prefers the row despite
              the asymmetry. Not re-litigated: items-baseline + justify-center
              is the same row treatment PageHero and ContactCTA already use
              for a glass-or-primary + ghost pair, so the hero rejoins that
              one recipe instead of carrying its own bespoke column. */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-5" style={{ marginTop: "clamp(34px,3.6vw,48px)" }}>
            {/* THE GLASS PRIMARY AND ITS GHOST.

                2026-08-05 put both on the button system: they were hand-rolled
                pills (drift pattern #5), which is why this primary had no
                arrow chip while every other primary on the site did. It took
                the FLAGSHIP — solid bone, circular ↗ chip — because the canon
                said this hero owned it.

                2026-08-06 REPLACED THAT WITH GLASS (client: hero CTAs "should
                be glass as primary and text as secondary"), and the client
                took the homepage with the rest rather than exempting it. ONE
                HERO PRIMARY SITEWIDE now — no page gets a louder button than
                any other by virtue of being the front door.

                ⚠ RESOLVED BY THE FLOW LAYOUT (2026-08-07): this used to be
                the one hero where glass had nothing behind it — the absolute
                device row started at 60% of the hero and the CTA row sat
                ~140px INSIDE it, so the pill blurred #060607 phone hardware.
                That was raised, seen and accepted at the time; the layout
                pass then fixed the CAUSE exactly as this note prescribed (the
                devices moved below the CTAs in flow), so the pill now sits on
                the warm glow like every other hero's. No special case left.

                ⚠ CONSEQUENCE: the flagship tier (.btn-arrow + chip) now has
                exactly ONE consumer left, the ContactCTA close band. It is a
                backlog candidate on the same terms as .btn-secondary-light and
                .heading-part — a token with a single consumer either earns its
                place or folds into its neighbour. It is not folded here
                because the close band is a different question from the hero
                and the client has not nominated it. */}
              <Link href="/start-a-project" className="btn btn-glass">
                Start a project
                <span aria-hidden>→</span>
              </Link>
              <Link href="/work" className="btn-ghost text-bone">
                View the work <span aria-hidden>→</span>
              </Link>
          </div>
        </div>

        {/* DEVICE ROW — phone · phone · desktop · phone · phone, IN FLOW at
            the hero's foot (2026-08-07 layout pass; fully visible since the
            same morning's un-crop and phone cap — two client calls, one
            direction: cut-off devices "read as a mistake", uncapped phones
            rendered "far too large"). FIVE, NOT THREE, since 2026-08-09
            (client: "I want things on the outsides too… even if they're
            trimmed off the edges") — the inner trio stays grid-safe on
            OUTER_PHONE_W's cqw-capped siblings (PHONE_W/DESKTOP_W), and the
            two new outer phones use plain vw so they keep bleeding past the
            shell at any width; see the constants above and the note beside
            them below for why one pair is capped and the other isn't.
            BOTTOM-ALIGNED (items-end): every phone sits on the desktop's own
            baseline like objects on one shelf, instead of levitating from a
            shared top line — and that common baseline is the edge the
            section below cuts against. margin-top auto takes the slack on
            tall viewports so the row stays at the foot; the explicit clamp
            is the minimum breathing gap under the CTAs. The gap tightened
            4.5vw → 3vw so the group reads as one shelf now that nothing
            shears at the edges. */}
        {/* Gap floor 20 → 12 with the parity pass: on a phone the shelf's
            margins are all the phones get to show through, and 8px of gap
            was the difference between a visible sliver and none. The gap
            UNDER the CTAs went 7vh → 9vh in the breathing-room pass — the
            text block's air below, matching the raised air above. */}
        {/* THE TRIM, RESTORED (2026-08-08, latest pass: the trust bar left
            the hero again, and it and this trim were documented as mutually
            exclusive — "if the strip goes again, restore the margin with
            it"). Full lineage: the client asked for the trim ("the case
            studies need to be a bit trimmed horizontally on the bottom —
            why was that dropped"); it was zeroed the same evening to make
            room for the under-hero trust bar ("can the logo strip look like
            it's clipping the bottom of the device mockups off"), which is
            also when the section gained its own overflow:hidden so the crop
            happens locally rather than depending on the canvas or a
            neighbour; now the strip is parked again, so the margin returns
            to the same mechanism, unwitnessed change to the clip itself.

            The negative bottom margin pushes the shelf's feet past the
            hero's own bottom edge, and the section's overflow:hidden trims
            them there — landing the ink→bone cut ON the devices rather than
            under them, which is what makes a crop read as a decision rather
            than an accident (the bone-act lesson). ~8% of the device height
            at desktop, a touch less on phones.

            ⚠ containerType:"inline-size" ADDED 2026-08-09, ON THIS SAME DIV
            (it was already the flex row AND the flex item taking the
            auto-margin push — no extra wrapper needed). It makes this box a
            CSS container-query context sized by ITS OWN width alone (100%,
            explicit, so containment has something to measure without
            depending on its children — required by the spec), and PHONE_W /
            DESKTOP_W read `cqw` against exactly that box rather than the
            raw viewport. Since the box is a direct, unpadded child of the
            new `.shell` wrapper, its width already IS the shell's own
            content box — no separate padding math to duplicate. */}
        <div style={{ containerType: "inline-size", marginTop: "auto", paddingTop: "clamp(80px,12vh,160px)", marginBottom: "clamp(-56px, -4vh, -20px)", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(12px,3vw,56px)", width: "100%" }}>
          {/* REAL CAPTURES, 2026-08-09 (client: "put dr yalda mockups in
              them please") — the editorial CSS placeholder mode retired from
              this hero the moment real work was chosen for it; the client's
              own layout-first ruling ("waiting on captures" per the note
              above) was exactly this trade, made now. Both files are the
              live captures already on record for her featured case study
              (content/work/dr-yalda-jamali.mdx: heroImage / mobileImage),
              reused rather than re-described — one client, one true set of
              alt text, whichever component is showing it.

              ALT TEXT: the desktop capture (centre) carries the real
              descriptive alt, reused verbatim from the work entry's own
              heroImageAlt. The LEFT phone carries mobileImageAlt for the
              same reason; the RIGHT phone is the identical capture mirrored
              for the composition, not new content, so it goes alt=""
              — the CaseStudyDeviceCluster precedent (desktopAlt required,
              mobileAlt="" default) for exactly this one-real/one-decorative
              shape.

              THE OUTER PAIR (2026-08-09, client: "I want things on the
              outsides too… even if they're trimmed off the edges") are two
              MORE instances of the same mobile capture — not new content,
              purely compositional continuations of the shelf — so both go
              alt="" like the right inner phone already does. They sit
              OUTSIDE the trio deliberately: first and last children of this
              same row, on OUTER_PHONE_W (plain vw, no shell cap), so the row's
              own content now exceeds the shell's width and overflows it
              symmetrically — cropped only by the section's own
              overflow:hidden, the same mechanism that already trims the
              shelf's bottom edge.

              ⚠ THE PULL-IN MARGIN IS LOAD-BEARING, not decorative spacing:
              the row's own `gap` alone (shared with every other pair in the
              row) left only ~42px of a ~235px phone inside the viewport at
              1470px — a rounded-corner sliver, not legibly a phone. A fixed
              negative margin overlaps the outer phone further onto its own
              inner neighbour, which reads as depth (one device tucked partly
              behind the next, a fanned pair) rather than a stray shape —
              measured live at 1470px: ~64% of the outer phone lands inside
              the viewport (152 of 235px). Fixed px, not vw: the amount of
              OVERLAP wanted is a constant relationship between two adjacent
              objects, not a fraction of the viewport. */}
          <div style={{ width: OUTER_PHONE_W, flexShrink: 0, marginRight: "-110px" }}>
            <PhoneMockup
              size="fluid"
              screen="editorial"
              screenshot="/assets/phones/dr-yalda-hero.jpg"
              screenshotAlt=""
            />
          </div>
          <div style={{ width: PHONE_W, flexShrink: 0 }}>
            <PhoneMockup
              size="fluid"
              screen="editorial"
              screenshot="/assets/phones/dr-yalda-hero.jpg"
              screenshotAlt="Dr Yalda Jamali website homepage on mobile — serif wordmark over a cinematic film still"
            />
          </div>
          {/* Desktop floor 320 (the client's "and the desktop bigger", which
              on mobile is where the floor binds); the phone's parity width is
              derived from this — change one, re-measure the other. */}
          <div style={{ width: DESKTOP_W, flexShrink: 0 }}>
            <BrowserMockup
              domain="dryalda.com.au"
              screenshot="/assets/desktops/dr-yalda-jamali.png"
              screenshotAlt="Dr Yalda Jamali website homepage — cinematic full-bleed hero beneath the serif wordmark, desktop view"
            />
          </div>
          <div style={{ width: PHONE_W, flexShrink: 0 }}>
            <PhoneMockup
              size="fluid"
              screen="editorial"
              screenshot="/assets/phones/dr-yalda-hero.jpg"
              screenshotAlt=""
            />
          </div>
          <div style={{ width: OUTER_PHONE_W, flexShrink: 0, marginLeft: "-110px" }}>
            <PhoneMockup
              size="fluid"
              screen="editorial"
              screenshot="/assets/phones/dr-yalda-hero.jpg"
              screenshotAlt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
