import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

/**
 * HERO 1D — "Edge-to-edge devices, one big title" (2026-07-19). A faithful,
 * responsive translation of the client's Claude Design comp (design-refs/
 * hero-edge). Revives, on purpose: a WARM GLOW ground (vs flat ink), SAOL
 * ITALIC (the "trust." accent + the wordmark &), and GEIST MONO (the kicker) —
 * all three were retired in the current canon; reconcile if this ships. The
 * device screens use our real client captures (swappable). The site nav is
 * hidden on this route (Navbar returns null) so the hero's own nav is the only
 * one. Internal only; /mockups is robots-disallowed.
 */
export const metadata: Metadata = {
  title: "Hero 1D — edge-to-edge devices",
  robots: { index: false, follow: false },
};

const saol = localFont({
  src: [
    { path: "../../../fonts/SaolDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../fonts/SaolDisplay-LightItalic.woff", weight: "300", style: "italic" },
  ],
  variable: "--font-saol",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Real client captures (swappable) — left phone · centre desktop · right phone.
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

export default function Hero1DPage() {
  return (
    <main
      className={`${saol.variable} ${geistMono.variable}`}
      style={{ background: "#0A0A0B", minHeight: "100vh", padding: "clamp(10px,1.6vw,20px)" }}
    >
      {/* THE HERO PANEL — rounded "big border" on the near-black page */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#16110C",
          borderRadius: "6px",
          minHeight: "calc(100vh - clamp(20px,3.2vw,40px))",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        }}
      >
        {/* Warm glow blobs + vignette */}
        <div aria-hidden style={{ position: "absolute", left: "-12%", top: "-24%", width: "62%", height: "68%", borderRadius: "50%", background: "#C2A878", opacity: 0.5, filter: "blur(130px)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", right: "-15%", top: "-13%", width: "57%", height: "66%", borderRadius: "50%", background: "#8A5A2E", opacity: 0.55, filter: "blur(140px)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", left: "30%", bottom: "-28%", width: "62%", height: "56%", borderRadius: "50%", background: "#3E2E1C", opacity: 0.85, filter: "blur(120px)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 18%, transparent 42%, rgba(10,8,6,0.55) 100%)" }} />

        {/* NAV (baked into the hero) */}
        <nav
          style={{ position: "relative", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(22px,3.5vw,44px) clamp(24px,5vw,72px)" }}
        >
          <span style={{ display: "flex", alignItems: "baseline", gap: "6px", fontSize: "16px", fontWeight: 500, letterSpacing: "0.04em", color: "#F2EEE6" }}>
            North{" "}
            <span style={{ fontFamily: "var(--font-saol), Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "#D8C6A4", fontSize: "18px" }}>&amp;</span>{" "}
            Refine
          </span>
          <span className="hidden md:flex" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", gap: "32px", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E7E1D4" }}>
            <span>Work</span>
            <span>Services</span>
            <span>Studio</span>
            <span>Journal</span>
          </span>
          <span style={{ border: "1px solid rgba(242,238,230,0.45)", borderRadius: "999px", padding: "11px 18px", whiteSpace: "nowrap", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2EEE6" }}>
            Start a project
          </span>
        </nav>

        {/* CENTRED TITLE BLOCK */}
        <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(36px,6vw,90px) 24px 0" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: "clamp(9px,0.9vw,11px)", letterSpacing: "0.24em", textTransform: "uppercase", color: "#F2EEE6", opacity: 0.85 }}>
            Web, search &amp; SEO for clinics
          </p>
          <h1 style={{ margin: "clamp(16px,2vw,26px) 0 0", fontSize: "clamp(38px,7vw,92px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.045em", color: "#F2EEE6" }}>
            Building websites
            <br />
            that patients{" "}
            <em style={{ fontFamily: "var(--font-saol), Georgia, serif", fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.01em", color: "#F6E8CD" }}>trust.</em>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "clamp(26px,3vw,38px)", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ background: "#F2EEE6", color: "#0C0C0D", borderRadius: "999px", padding: "16px 28px", whiteSpace: "nowrap", fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Start a project
            </Link>
            <Link href="/work" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2EEE6" }}>
              View the work →
            </Link>
          </div>
        </div>

        {/* DEVICE ROW — phone · desktop · phone, bled off the bottom edge (the
            panel's overflow-hidden clips them). Tops align ~58% down, tall
            phones run off the bottom. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "58%", zIndex: 10, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "clamp(8px,2vw,28px)", paddingInline: "clamp(8px,2vw,24px)" }}>
          <Phone src={SINCLAIR} label="SINCLAIR" />
          {/* Centre desktop */}
          <div style={{ background: "#060607", borderRadius: "clamp(12px,1.5vw,20px)", padding: "clamp(6px,0.9vw,11px)", boxShadow: "0 60px 120px -28px rgba(0,0,0,0.6)", flexShrink: 0, width: "clamp(300px,44vw,722px)" }}>
            <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "11px", overflow: "hidden", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ALDER} alt="A clinic website designed by North & Refine" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>
          <Phone src={LUMEN} label="LUMEN" />
        </div>
      </section>
    </main>
  );
}
