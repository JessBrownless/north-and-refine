import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

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
              never took a weight then — the size WAS the whole hierarchy;
              since 2026-08-09 the ladder carries --heading-weight, so this H1
              is 500 like every other rung), the tracking
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
          {/* THE SUBTITLE (2026-08-09, client: "the homepage hero needs a
              subtitle"). It was the ONE hero on the site without a lede —
              every PageHero has carried one since the hero-cohesion pass, so
              this closes the last gap rather than inventing a slot.

              `.body-xl`, NOT `.body-lg`, and the ladder decides that rather
              than taste: CLAUDE.md names body-xl "THE LARGE LEDE — the
              centred manifesto hero…", one step above body-lg which "stays
              the left/split hero lede". PageHero encodes the same fork in
              code (`centered ? "body-xl" : "body-lg"`). This hero is the
              site's one centred masthead, so it takes the large rung, plus
              `.lede` for the gap and 46ch measure and `mx-auto` to centre
              that measure — exactly PageHero's centred branch.

              COPY NOTES, since it is new: it does NOT restate the kicker
              above it ("Web, search & SEO for clinics" already lists the
              disciplines), so it names the AUDIENCE and the span of the work
              instead. No dash (house rule), Australian English, and nothing
              in it is a claim a practice would have to stand behind. */}
          <p
            className="lede body-xl mx-auto text-bone-dim opacity-0 animate-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            A specialist studio for private medical and surgical practices,
            from the first search to the booked consultation.
          </p>
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
          {/* ⚠ THE LOAD-IN DELAY ARRIVED WITH THE SUBTITLE (2026-08-09).
              This row had no entrance at all while the kicker and H1 both
              faded in, which went unnoticed while it was the last element:
              it simply appeared with the page. Putting a lede ABOVE it made
              the gap visible — the buttons would have been up before the
              sentence they follow. 0.45s is PageHero's own value for the
              same row, so the homepage now runs the house sequence in full:
              kicker 0s, heading 0.1s, lede 0.25s, actions 0.45s. */}
          <div
            className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-5 opacity-0 animate-fade-in"
            style={{ marginTop: "clamp(34px,3.6vw,48px)", animationDelay: "0.45s" }}
          >
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

      </div>

      {/* THE CAROUSEL — figure 20a, replacing the five-device shelf that stood
          here (2026-08-09). It sits OUTSIDE `.shell` on purpose and is the one
          thing in this hero that does: the strip is full-bleed by design, its
          edge fades resolve to the page's own ink, and a shell-contained
          marquee would fade to ink in the middle of the rail with bare ground
          either side. The title block above keeps the shell rail it joined
          earlier the same day.

          WHAT WENT WITH THE SHELF: PHONE_W / DESKTOP_W / OUTER_PHONE_W and the
          container-query wrapper they were measured against, the negative
          bottom margin that cropped the shelf's feet against this section's
          own clip, and the BrowserMockup / PhoneMockup imports. The section
          keeps its `overflow:hidden` — the carousel needs it for the same
          reason the shelf did, to keep the deliberately-overflowing track from
          widening the page.

          `marginTop:auto` moved onto this element with the shelf's job: hold
          the strip at the hero's foot and let the section grow past 100vh only
          when the stack needs it. */}
      <div style={{ marginTop: "auto", paddingTop: "clamp(80px,12vh,160px)", position: "relative", zIndex: 10 }}>
        <HeroCarousel />
      </div>
    </section>
  );
}
