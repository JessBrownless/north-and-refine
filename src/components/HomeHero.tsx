import Link from "next/link";

/**
 * HOMEPAGE HERO — "1D: edge-to-edge devices, one big title" (2026-07-19,
 * client's Claude Design comp; source at design-refs/hero-edge). The warm
 * glow ground sits inside a rounded "big border" panel; a Geist-Mono kicker (the
 * shared .overline voice), a big Instrument headline with a Saol-italic "trust."
 * accent, and phone·desktop·phone. (The comp's bottom-bleed device crop ended
 * 2026-08-07 — devices render in full now; see the groundless-section note.)
 *
 * NAV: none here (2026-07-20, client: "the nav needs to be the same across
 * home & other pages"). The real site <Navbar> renders above this on the
 * homepage like every other page — one nav sitewide.
 *
 * FONTS: Saol (--font-saol) and Geist Mono (--font-geist-mono) are loaded
 * GLOBALLY in layout.tsx — no local loads here. The kicker uses the shared
 * .overline class (mono sitewide); the accent word uses the global Saol var.
 *
 * ⚠ REVIVES two retired things — the WARM GLOW GROUND (vs flat ink) and SAOL
 * ITALIC + GEIST MONO type. Reconcile CLAUDE.md + globals if this stays.
 * Device screens are real client captures — swappable; ideally real MOBILE
 * captures for the phones.
 */

// Device screens — BLANK for now (2026-07-23, client: the captures were
// throwing her eye). The frames hold their shape; screens are quiet dark
// glass until new imagery is chosen.
function Phone() {
  return (
    <div
      style={{
        position: "relative",
        // CAPPED 2026-08-07 (client: on desktop the side mock-ups render
        // "far too large… as a second and third desktop", not phones). The
        // old width — max(150px, 23vw), a floor with NO ceiling — dated from
        // the bottom-bleed era, when the hero's clip swallowed all but the
        // top ~180px of each phone and the crop did the proportion work; the
        // same day's un-crop revealed the full 700px+ towers that width
        // actually draws, TALLER than the desktop mockup beside them. The
        // clamp keeps phones at phone scale against the desktop's 51.5vw
        // (~14vw ≈ a real phone:laptop width ratio; ceiling 210px so big
        // monitors don't regrow the towers; floor 150px unchanged, so small
        // viewports render exactly as before). Consequence, deliberate: the
        // row now FITS the viewport (~88.5vw), ending the 1D comp's side
        // shear — the natural conclusion of the client's "clipped mock-ups
        // read as a mistake" direction. This also RESTORES THE MANIFESTO'S
        // AIR: the uncapped phones dangled ~390px into the band's top air,
        // which read as the statement having no top padding at all.
        width: "clamp(150px, 14vw, 210px)",
        aspectRatio: "320 / 680",
        background: "#060607",
        // FIXED-PX CHROME (2026-08-07, critique point 10): the box is capped
        // at 150–210px but the old vw-derived bezel, notch and radii kept
        // scaling with the viewport, so on a big monitor a capped phone grew
        // laptop-sized chrome. A ~200px phone's chrome is a known quantity —
        // fixed px, tuned once, correct at every viewport. (Sanctioned raw
        // values: device chrome depicts hardware; see the adjudication rule.)
        borderRadius: "34px",
        padding: "7px",
        boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)",
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "16px",
          background: "#000",
          borderRadius: "999px",
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "27px",
          overflow: "hidden",
          background: "#121112",
        }}
      />
    </div>
  );
}

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

       zIndex 10 lifts the whole hero above the canvas's grain film (z-1). */
    <section
      style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >

        {/* CENTRED TITLE BLOCK — nav clearance + air on top (the nav is
            absolute over the canvas; measure from its foot), then the stack. */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(180px,22vh,260px) 24px 0" }}>
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "clamp(34px,3.6vw,48px)", flexWrap: "wrap" }}>
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

        {/* DEVICE ROW — phone · desktop · phone, IN FLOW at the hero's foot
            (2026-08-07 layout pass; fully visible since the same morning's
            un-crop and phone cap — two client calls, one direction: cut-off
            devices "read as a mistake", uncapped phones rendered "far too
            large"). BOTTOM-ALIGNED (items-end): the capped phones sit on the
            desktop's own baseline like objects on a shelf, instead of
            levitating from a shared top line — and that common baseline is
            the edge the section below cuts against. margin-top auto takes
            the slack on tall viewports so the row stays at the foot; the
            explicit clamp is the minimum breathing gap under the CTAs. The
            gap tightened 4.5vw → 3vw so the trio reads as one group now that
            nothing shears at the edges. */}
        <div style={{ marginTop: "auto", paddingTop: "clamp(48px,7vh,96px)", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(20px,3vw,56px)", width: "100%" }}>
          <Phone />
          <div style={{ background: "#060607", borderRadius: "clamp(12px,1.5vw,20px)", padding: "clamp(6px,0.9vw,11px)", boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)", flexShrink: 0, width: "max(300px, 51.5vw)" }}>
            <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "11px", overflow: "hidden", position: "relative", background: "#121112" }} />
          </div>
          <Phone />
        </div>
    </section>
  );
}
