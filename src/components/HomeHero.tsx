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

// Device screens (our real client captures) — left phone · centre desktop · right phone.
const SINCLAIR = "/assets/desktops/selv.jpg";
const ALDER = "/assets/desktops/aven.jpg";
const LUMEN = "/assets/desktops/dr-yalda-jamali.png";

function Phone({ src, label }: { src: string; label: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(150px,18vw,320px)",
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
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
        <span
          style={{
            position: "absolute",
            top: "clamp(40px,5vw,58px)",
            left: "clamp(14px,1.6vw,22px)",
            fontSize: "clamp(9px,0.9vw,12px)",
            letterSpacing: "0.34em",
            fontWeight: 500,
            color: "#F2EEE6",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section
      style={{ position: "relative", overflow: "hidden", background: "#16110C", minHeight: "100vh", fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
        {/* Warm gradient ground — shared with the interior heroes via HeroGlow
            (full-bleed; the ground runs up behind the transparent nav) */}
        <HeroGlow intensity={1} />

        {/* CENTRED TITLE BLOCK */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(200px,24vh,290px) 24px 0" }}>
          <p className="overline" style={{ margin: 0, opacity: 0.85 }}>
            Web, search &amp; SEO for clinics
          </p>
          <h1 style={{ margin: "clamp(22px,2.4vw,32px) 0 0", fontSize: "clamp(38px,7vw,92px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.045em", color: "#F2EEE6" }}>
            Building websites
            <br />
            that patients{" "}
            <em style={{ fontFamily: "var(--font-saol), Georgia, serif", fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.01em", color: "#F6E8CD" }}>trust.</em>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "clamp(34px,3.6vw,48px)", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ background: "#F2EEE6", color: "#0C0C0D", borderRadius: "999px", padding: "16px 28px", whiteSpace: "nowrap", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Start a project
            </Link>
            <Link href="/work" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2EEE6" }}>
              View the work →
            </Link>
          </div>
        </div>

        {/* DEVICE ROW — phone · desktop · phone, bled off the bottom edge */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "60%", zIndex: 10, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(8px,2vw,28px)", paddingInline: "clamp(8px,2vw,24px)" }}>
          <Phone src={SINCLAIR} label="SINCLAIR" />
          <div style={{ background: "#060607", borderRadius: "clamp(12px,1.5vw,20px)", padding: "clamp(6px,0.9vw,11px)", boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)", flexShrink: 0, width: "clamp(300px,44vw,722px)" }}>
            <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "11px", overflow: "hidden", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ALDER} alt="A clinic website designed by North & Refine" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>
          <Phone src={LUMEN} label="LUMEN" />
        </div>
    </section>
  );
}
