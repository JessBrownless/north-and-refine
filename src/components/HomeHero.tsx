import Link from "next/link";
import HeroGlow from "@/components/HeroGlow";

/**
 * HOMEPAGE HERO — "1D: edge-to-edge devices, one big title" (2026-07-19,
 * client's Claude Design comp; source at design-refs/hero-edge). The warm
 * glow ground sits inside a rounded "big border" panel; a Geist-Mono kicker (the
 * shared .overline voice), a big Instrument headline with a Saol-italic "trust."
 * accent, and phone·desktop·phone bled off the bottom.
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
    <section
      style={{ position: "relative", overflow: "hidden", background: "var(--ink-canvas)", minHeight: "100vh", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
        {/* Warm gradient ground — shared with the interior heroes via HeroGlow
            (full-bleed; the ground runs up behind the transparent nav) */}
        <HeroGlow intensity={1} />

        {/* CENTRED TITLE BLOCK */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(200px,24vh,290px) 24px 0" }}>
          <p className="overline" style={{ margin: 0, opacity: 0.85 }}>
            Web, search &amp; SEO for clinics
          </p>
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

              ⚠ The margin stays inline on purpose. It is the from-overline
              gap hand-rolled, and swapping it for `.from-overline` would be a
              SPACING change — those are being swept last as one revertable
              commit, so this is left as a candidate rather than fixed here. */}
          <h1 className="display text-bone" style={{ margin: "clamp(22px,2.4vw,32px) 0 0" }}>
            Building websites
            <br />
            that patients <em>trust.</em>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "clamp(34px,3.6vw,48px)", flexWrap: "wrap" }}>
            <Link href="/start-a-project" style={{ background: "var(--bone)", color: "var(--ink)", borderRadius: "999px", padding: "16px 28px", whiteSpace: "nowrap", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Start a project
            </Link>
            <Link href="/work" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bone)" }}>
              View the work →
            </Link>
          </div>
        </div>

        {/* DEVICE ROW — phone · desktop · phone, bled off the bottom edge AND
            the sides (2026-07-23, per the 1D comp: the row is wider than the
            viewport — ~106vw all told — so the outer phones crop at the
            screen edges; no padding, no ceilings, the section's
            overflow-hidden does the cropping). */}
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
