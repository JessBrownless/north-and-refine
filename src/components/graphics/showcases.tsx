import { GraphicScaler, MONO, PLATE, SANS } from "./shared";

/**
 * Graphics 01 + 02 — the FEATURE SHOWCASES (desktop and mobile) from the
 * Website Graphics design doc. Bone plates carrying a depicted clinic site
 * ("Lumen", the standing mock practice) — an in-graphic browser and an
 * in-graphic phone. All type inside is depiction, not page copy.
 */

/* 01 · Feature showcase — Desktop (native 1180×600) */
export function FeatureShowcaseDesktop({ className }: { className?: string }) {
  const row = (label: string, last = false): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0",
    borderTop: "1px solid var(--bone-line)",
    ...(last ? { borderBottom: "1px solid var(--bone-line)" } : {}),
  });
  return (
    <GraphicScaler
      width={1180}
      height={600}
      className={className}
      label="Feature showcase graphic: a clinic website shown in a browser window beside a web design service panel"
    >
      <div style={{ ...PLATE, width: "100%", height: "100%", background: "var(--bone)", display: "flex", fontFamily: SANS }}>
        {/* left */}
        <div style={{ width: 432, flex: "none", padding: "56px 46px", display: "flex", flexDirection: "column" }}>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--champagne)", margin: "0 0 auto" }}>What we do</p>
          <h3 style={{ fontWeight: 500, fontSize: 38, lineHeight: 1.04, letterSpacing: "-.025em", color: "var(--ink)", margin: "24px 0 0" }}>Web design</h3>
          <p style={{ fontSize: 16, lineHeight: 1.62, color: "var(--clay)", margin: "16px 0 26px" }}>
            Fast, editorial websites built to earn trust in seconds and turn quiet browsers into booked consultations.
          </p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: ".7em", background: "var(--ink)", color: "var(--bone)", borderRadius: 9999, padding: ".9rem 1.5rem", fontSize: 11, fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase", width: "max-content" }}>
            Learn more <span aria-hidden>→</span>
          </span>
          <div style={{ marginTop: 34 }}>
            {(["Brand identity", "SEO & content", "Care & hosting"] as const).map((label, i, arr) => (
              <div key={label} style={row(label, i === arr.length - 1)}>
                <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-.01em", color: "var(--ink)" }}>{label}</span>
                <span style={{ color: "var(--clay)", fontSize: 15 }} aria-hidden>⌄</span>
              </div>
            ))}
          </div>
        </div>
        {/* right — the graded ground + in-graphic browser */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "linear-gradient(150deg,#EFC49C 0%,#F2EAE0 48%,#E7DFD0 100%)" }}>
          <div style={{ position: "absolute", width: 560, height: 560, right: -130, top: -140, borderRadius: "50%", background: "radial-gradient(circle,rgba(219,68,30,.62),rgba(228,110,52,.36) 42%,transparent 74%)", filter: "blur(30px)" }} />
          <div style={{ position: "absolute", left: 52, top: 66, right: -160, bottom: -40, background: "#FBF6EC", borderRadius: "14px 14px 0 0", border: "1px solid #E4DDCF", boxShadow: "0 30px 60px -30px rgba(0,0,0,.35)", overflow: "hidden" }}>
            {/* browser bar */}
            <div style={{ height: 42, background: "#EDE7DB", borderBottom: "1px solid #E1D9CA", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#D8CFBE" }} />
              ))}
              <span style={{ marginLeft: 14, flex: 1, maxWidth: 280, height: 22, background: "#F6F1E8", border: "1px solid #E1D9CA", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px", fontFamily: MONO, fontSize: 11, color: "var(--clay)" }}>
                lumenaesthetics.co.uk
              </span>
            </div>
            {/* depicted site */}
            <div style={{ padding: "22px 30px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: ".18em", color: "var(--ink)" }}>LUMEN</span>
                <div style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--clay)" }}>
                  <span>Treatments</span>
                  <span>Team</span>
                  <span>Results</span>
                  <span style={{ background: "var(--champagne)", color: "var(--ink)", borderRadius: 9999, padding: "8px 16px", fontWeight: 500 }}>Book</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 26, marginTop: 44, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 500, fontSize: 40, lineHeight: 1.05, letterSpacing: "-.03em", color: "var(--ink)", margin: 0 }}>
                    Naturally refined, expertly delivered.
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--clay)", margin: "18px 0 24px", maxWidth: "34ch" }}>
                    A Harley Street practice for facial aesthetics — precise, understated, and entirely bespoke.
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: ".6em", background: "var(--ink)", color: "var(--bone)", borderRadius: 9999, padding: "12px 22px", fontSize: 11, fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>
                    Book a consultation
                  </span>
                </div>
                <div style={{ width: 230, height: 280, flex: "none", borderRadius: 12, background: "linear-gradient(160deg,var(--champagne-soft),#B7A587 55%,var(--clay))", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.15)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GraphicScaler>
  );
}

/* 02 · Feature showcase — Mobile (native 400×780) */
export function FeatureShowcaseMobile({ className }: { className?: string }) {
  const option = (
    title: string,
    meta: string,
    selected: boolean,
  ): React.ReactNode => (
    <div key={title} style={{ border: `1px solid ${selected ? "var(--ink)" : "#E1D9CA"}`, borderRadius: 14, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", whiteSpace: "nowrap" }}>{title}</div>
        <div style={{ fontSize: 11, color: "var(--clay)", marginTop: 3, whiteSpace: "nowrap" }}>{meta}</div>
      </div>
      <span style={{ width: 18, height: 18, borderRadius: "50%", ...(selected ? { background: "var(--champagne)" } : { border: "1.5px solid var(--bone-dim)" }) }} />
    </div>
  );
  return (
    <GraphicScaler
      width={400}
      height={780}
      className={className}
      label="Mobile-first booking graphic: a phone showing a three-step treatment booking flow"
    >
      <div style={{ ...PLATE, width: "100%", height: "100%", background: "var(--bone)", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: SANS }}>
        <div style={{ position: "absolute", width: 400, height: 400, top: -70, borderRadius: "50%", background: "radial-gradient(circle,rgba(219,68,30,.5),rgba(228,110,52,.28) 44%,transparent 72%)", filter: "blur(26px)" }} />
        {/* phone */}
        <div style={{ position: "relative", marginTop: 48, width: 262, height: 512, background: "var(--ink)", borderRadius: 42, padding: 11, boxShadow: "0 30px 55px -24px rgba(0,0,0,.55)" }}>
          <div style={{ width: "100%", height: "100%", background: "#FBF6EC", borderRadius: 32, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 96, height: 22, background: "var(--ink)", borderRadius: 12 }} />
            <div style={{ padding: "16px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: 11, color: "var(--ink)" }}>
              <span>9:41</span>
              <span style={{ letterSpacing: ".1em" }}>● ● ●</span>
            </div>
            <div style={{ padding: "26px 20px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: ".16em", color: "var(--ink)" }}>LUMEN</span>
                <span style={{ color: "var(--clay)", fontSize: 16 }} aria-hidden>≡</span>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--champagne)", margin: "26px 0 8px" }}>Step 1 of 3</p>
              <h4 style={{ fontWeight: 500, fontSize: 23, lineHeight: 1.1, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>Choose a treatment</h4>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                {option("Consultation", "45 min · with a specialist", true)}
                {option("Rhinoplasty review", "30 min · follow-up", false)}
                {option("Skin & injectables", "30 min · with a nurse", false)}
              </div>
              <div style={{ marginTop: 20, background: "var(--champagne)", color: "var(--ink)", borderRadius: 9999, padding: 14, textAlign: "center", fontSize: 11, fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>
                Continue
              </div>
            </div>
          </div>
        </div>
        {/* caption */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 30px 30px" }}>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--champagne)", margin: "0 0 8px" }}>Mobile-first</p>
          <h3 style={{ fontWeight: 500, fontSize: 26, lineHeight: 1.1, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>Booking, minus the friction</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--clay)", margin: "10px 0 0" }}>Three taps from interest to a confirmed appointment.</p>
        </div>
      </div>
    </GraphicScaler>
  );
}
