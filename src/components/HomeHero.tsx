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
        // 23vw with a floor, NO ceiling — the row must always overflow the
        // viewport so the outer phones crop at the screen edges (the 1D
        // comp's edge-to-edge device row, restored 2026-07-23).
        width: "max(150px, 23vw)",
        aspectRatio: "320 / 680",
        background: "#060607",
        borderRadius: "clamp(26px,3vw,50px)",
        padding: "clamp(5px,0.6vw,9px)",
        boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)",
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(11px,1.4vw,22px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(46px,5vw,80px)",
          height: "clamp(13px,1.4vw,22px)",
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
          borderRadius: "clamp(22px,2.6vw,42px)",
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
       The clip now lives on the canvas, whose sides are the viewport's (so
       the side bleed crops exactly as before) but whose bottom is the
       manifesto's foot, ~160vh further down — so the devices render IN FULL,
       trailing onto the shared ground in the manifesto's air.

       zIndex 10 lifts the whole hero above the canvas's grain film (z-1);
       inside, the title block's 20 still rides above the device row's 10. */
    <section
      style={{ position: "relative", zIndex: 10, minHeight: "100vh", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >

        {/* CENTRED TITLE BLOCK */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(200px,24vh,290px) 24px 0" }}>
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

                ⚠ THIS IS THE ONE HERO WHERE GLASS HAS NOTHING BEHIND IT, and
                that was raised, seen and accepted (client: "looks fine to
                me"), so don't re-litigate it — but know the measurement before
                you touch this row. The DEVICE ROW below starts at 60% of the
                hero and the CTA row sits about 140px INSIDE it, so this pill
                blurs #060607 phone hardware, not the warm HeroGlow. Every
                other hero's pill sits on a lit ground, which is the whole
                argument for glass; this one reads quieter than the nav's solid
                bone pill directly above it. If it is ever reconsidered, the
                fix is the CAUSE — drop the device row so the pill lands on the
                glow — not a special-case pill for one page.

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

        {/* DEVICE ROW — phone · desktop · phone, bled off the SIDES only
            (2026-07-23, per the 1D comp: the row is wider than the viewport —
            ~106vw all told — so the outer phones crop at the screen edges;
            the CANVAS's overflow-hidden does that cropping now). The BOTTOM
            bleed ended 2026-08-07 (client: the cut-off devices "read as a
            mistake, not a design choice"): with the clip moved to the canvas,
            the row renders in full, trailing past the hero's 100vh line onto
            the shared ground — the manifesto's top air is ~46vh deep, which
            is what the overhang lands in. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "60%", zIndex: 10, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(16px,4.5vw,80px)" }}>
          <Phone />
          <div style={{ background: "#060607", borderRadius: "clamp(12px,1.5vw,20px)", padding: "clamp(6px,0.9vw,11px)", boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)", flexShrink: 0, width: "max(300px, 51.5vw)" }}>
            <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "11px", overflow: "hidden", position: "relative", background: "#121112" }} />
          </div>
          <Phone />
        </div>
    </section>
  );
}
