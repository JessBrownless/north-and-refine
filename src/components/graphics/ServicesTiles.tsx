import { GraphicScaler, MONO, SANS } from "./shared";

/**
 * THE /SERVICES ROW TILES (2026-08-02) — ported live from the client's
 * "Services Graphics - Export.dc.html" via the Claude Design MCP.
 *
 * WHY THESE STOPPED BEING FLAT IMAGES. They shipped as AVIF captures for a
 * day, which was right while they were still pictures. Then the design gained
 * MOTION: a `glassIn` entrance staggered across the panels, plus a ring
 * sweep and a drawn enquiries curve. A raster can only ever be the last
 * frame of that, which is what the handoff's "do NOT rasterise these" was
 * really about.
 *
 * THE SPLIT, and it is the whole design of this file: EVERY animated element
 * in the source sits inside a frosted panel — the devices, the photography
 * and the ember ground never move. So the tile is
 *
 *   PLATE (a raster)    ground + device + mock website + photography
 *   PANELS (live DOM)   the frosted overlays, and all the motion
 *
 * That buys three things a full live port would not. The photography stays
 * photography rather than 90 absolutely-positioned divs. The panels get a
 * REAL backdrop-filter, so the blur is computed against the plate underneath
 * instead of baked. And the mock practices' marketing copy — invented clinic
 * names, an invented review count, a competitor-vertical H1 — stays inside
 * the picture instead of becoming ~150 words of crawlable text on the
 * studio's most commercially important page. What remains in the DOM is the
 * panel copy only, and the whole composition is `role="img"` with a single
 * written label, so a screen reader gets one description rather than a
 * scatter of orphaned fragments.
 *
 * RE-CAPTURING A PLATE is cheap and needs no code change: hide the panels
 * (`[style*="glassIn"]{display:none}`), screenshot the tile at 900×600 in a
 * real browser at 2×, and convert. The panels here are positioned in the
 * source's own 900×600 coordinates, so they stay registered to any re-shot
 * plate.
 *
 * ⚠ THE SEO TILE'S PHOTOGRAPH IS WRONG in the current plate — slot `mock-15d`
 * still holds the therapy shot from the retired Islington Psychology version.
 * The practice became Halden Osteopathy; the picture never followed. Re-drop
 * that slot and re-capture the plate; nothing in this file changes.
 */

/* ── Panel plumbing ────────────────────────────────────────────────────────
   `.glass-float` is the house dark glass and already matches the design's
   panel recipe exactly (38% ink, blur 22, 24% bone rim, the three-part float
   shadow) — the handoff spec that produced that token came from these very
   tiles. `.reveal` owns the fade, `.glass-frost` the blur burn-off. */
const PANEL = "glass-float glass-frost reveal";

/** Positional style in the source's 900×600 coordinate space. */
type Pos = React.CSSProperties;

function Panel({
  at,
  delay,
  className = "",
  children,
}: {
  at: Pos;
  /** Stagger, straight from the source's animation-delay. */
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${PANEL} ${className}`}
      style={{ position: "absolute", zIndex: 3, transitionDelay: `${delay}ms`, ...at }}
    >
      {children}
    </div>
  );
}

/** The source's mono meta label: 9–10px, tracked caps, champagne-soft. */
function PanelLabel({ children, size = 9 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: "var(--champagne-soft)",
      }}
    >
      {children}
    </div>
  );
}

function Plate({ src }: { src: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      loading="lazy"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}

const SHELL: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  fontFamily: SANS,
  borderRadius: 24,
  overflow: "hidden",
};

/* ── 15d · SEO — local search, Halden Osteopathy ──────────────────────────── */
export function ServicesTileSeo({ className }: { className?: string }) {
  return (
    <GraphicScaler
      width={900}
      height={600}
      className={className}
      label="An osteopathy practice site on a phone ranking for “osteopath islington”, surrounded by frosted panels: local monthly search volume, a technical SEO audit score of 100, the practice’s schema markup and a rising enquiries curve."
    >
      <div style={SHELL}>
        <Plate src="/assets/graphics/services-plate-seo.avif" />

        {/* search intent */}
        <Panel at={{ left: 64, top: 100, width: 280, padding: "15px 18px" }} delay={350}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(244,237,223,.28)",
              borderRadius: 9999,
              padding: "9px 14px",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5" stroke="var(--champagne-soft)" strokeWidth="1.4" />
              <path d="M11 11l3.2 3.2" stroke="var(--champagne-soft)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 11.5, color: "var(--bone)", whiteSpace: "nowrap" }}>
              osteopath islington
            </span>
          </div>
          <div style={{ fontSize: 9, color: "rgba(244,237,223,.6)", marginTop: 9 }}>
            320 searches near you every month
          </div>
        </Panel>

        {/* site health — the ring sweeps on entry */}
        <Panel
          at={{ right: 64, top: 100, width: 280, padding: "16px 20px" }}
          delay={480}
          className="flex items-center gap-[14px]"
        >
          <div style={{ position: "relative", width: 58, height: 58, flex: "none" }}>
            <svg width="58" height="58" viewBox="0 0 58 58" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
              <circle cx="29" cy="29" r="24" fill="none" stroke="rgba(244,237,223,.18)" strokeWidth="5" />
              <circle
                className="tile-draw"
                style={{ ["--draw-len" as string]: "151" }}
                cx="29"
                cy="29"
                r="24"
                fill="none"
                stroke="var(--champagne)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontWeight: 300,
                fontSize: 14,
                color: "var(--bone)",
              }}
            >
              100
            </span>
          </div>
          <div>
            <PanelLabel>Site health</PanelLabel>
            <div style={{ fontSize: 9.5, color: "var(--bone-dim)", marginTop: 5 }}>
              Technical SEO audit
            </div>
          </div>
        </Panel>

        {/* schema snippet — depicted code, deliberately inert text (never a
            real <script type="application/ld+json">, which a crawler would
            parse as this site's own markup) */}
        <Panel
          at={{
            left: 64,
            bottom: 100,
            width: 280,
            padding: "15px 18px",
            fontFamily: MONO,
            fontSize: 10.5,
            lineHeight: 1.75,
            color: "var(--bone-dim)",
          }}
          delay={610}
        >
          <div style={{ color: "var(--clay)" }}>{"{"}</div>
          <div style={{ paddingLeft: 13 }}>
            <span style={{ color: "var(--champagne-soft)" }}>&quot;@type&quot;</span>: &quot;MedicalBusiness&quot;,
          </div>
          <div style={{ paddingLeft: 13 }}>
            <span style={{ color: "var(--champagne-soft)" }}>&quot;name&quot;</span>:{" "}
            <span style={{ whiteSpace: "nowrap" }}>&quot;Halden Osteopathy&quot;</span>,
          </div>
          <div style={{ paddingLeft: 13 }}>
            <span style={{ color: "var(--champagne-soft)" }}>&quot;areaServed&quot;</span>:{" "}
            <span style={{ whiteSpace: "nowrap" }}>&quot;Islington, London&quot;</span>
          </div>
          <div style={{ color: "var(--clay)" }}>{"}"}</div>
        </Panel>

        {/* enquiries — the curve draws on entry. NO axis labels: an
            illustration must not fake a dataset. */}
        <Panel at={{ right: 64, bottom: 100, width: 280, padding: "16px 18px 12px" }} delay={740}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PanelLabel size={10}>Enquiries</PanelLabel>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1.5 11.5l4-4.4 2.6 2.2 4.4-5.4" stroke="var(--champagne-soft)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 3.9h3.5v3.5" stroke="var(--champagne-soft)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <svg
            width="100%"
            height="44"
            viewBox="0 0 216 44"
            preserveAspectRatio="none"
            style={{ display: "block", marginTop: 9, overflow: "visible" }}
            aria-hidden
          >
            <path
              className="tile-draw"
              style={{ ["--draw-len" as string]: "230" }}
              d="M4,38 C56,34 96,28 130,20 C160,13 186,9 208,6"
              fill="none"
              stroke="rgba(216,198,164,.95)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="208" cy="6" r="4.5" fill="none" stroke="rgba(216,198,164,.95)" strokeWidth="1.3" />
            <circle cx="208" cy="6" r="1.8" fill="var(--champagne-soft)" />
          </svg>
          <div
            style={{
              position: "relative",
              height: 15,
              marginTop: 7,
              background:
                "repeating-linear-gradient(90deg,rgba(216,198,164,.5) 0 1px,transparent 1px 13px)",
              backgroundPosition: "3px 0",
            }}
          >
            <span style={{ position: "absolute", left: "50%", top: -3, bottom: 0, width: 2, background: "var(--champagne-soft)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <span
              style={{
                fontSize: 9,
                color: "var(--bone)",
                border: "1px solid rgba(244,237,223,.4)",
                borderRadius: 9999,
                padding: "3px 11px",
              }}
            >
              Month 6
            </span>
          </div>
        </Panel>
      </div>
    </GraphicScaler>
  );
}

/* ── 16e · Website — Aurelle, desktop + mobile ────────────────────────────── */
export function ServicesTileWeb({ className }: { className?: string }) {
  return (
    <GraphicScaler
      width={900}
      height={600}
      className={className}
      label="A non-surgical aesthetics clinic website on desktop and mobile, with frosted panels floating over it: the page’s own heading markup, and the practice’s next available appointment."
    >
      <div style={SHELL}>
        <Plate src="/assets/graphics/services-plate-web.avif" />

        {/* the depicted markup — escaped text, never real heading elements */}
        <Panel
          at={{
            left: 44,
            bottom: 84,
            padding: "18px 22px",
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.75,
            color: "var(--bone-dim)",
          }}
          delay={350}
        >
          <div style={{ color: "var(--clay)" }}>&lt;main&gt;</div>
          <div style={{ paddingLeft: 14 }}>&lt;h1&gt;Non Surgical Clinic&lt;/h1&gt;</div>
          <div style={{ color: "var(--clay)" }}>&lt;/main&gt;</div>
        </Panel>

        {/* booking CTA — z-index 4 in the source: it crosses the phone */}
        <Panel at={{ right: 44, top: 56, padding: "16px 20px", zIndex: 4 }} delay={610}>
          <PanelLabel>Next available</PanelLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
            <span style={{ fontSize: 13, color: "var(--bone)", whiteSpace: "nowrap" }}>
              Thu 18 Sep · 10:30
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--champagne)",
                color: "var(--ink)",
                borderRadius: 9999,
                padding: "9px 15px",
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginRight: ".5em" }} aria-hidden>
                <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="var(--ink)" strokeWidth="1.2" />
                <path d="M1 5h10M4 1v2M8 1v2" stroke="var(--ink)" strokeWidth="1.2" />
              </svg>
              Book <span aria-hidden style={{ marginLeft: ".5em" }}>→</span>
            </span>
          </div>
        </Panel>
      </div>
    </GraphicScaler>
  );
}

/* ── 16d · Brand identity — the norva brand board ─────────────────────────── */
export function ServicesTileBrand({ className }: { className?: string }) {
  const HELV = "Helvetica, Arial, sans-serif";
  return (
    <GraphicScaler
      width={900}
      height={600}
      className={className}
      label="A brand board for a women’s health practice open in a design canvas, with frosted panels beside it: the typeface specimen, and the document’s layer list."
    >
      <div style={SHELL}>
        <Plate src="/assets/graphics/services-plate-brand.avif" />

        {/* typeface */}
        <Panel at={{ right: 44, top: 122, width: 168, padding: "16px 20px", zIndex: 4 }} delay={740}>
          <PanelLabel>Typeface</PanelLabel>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontFamily: HELV, fontSize: 30, fontWeight: 700, lineHeight: 1, color: "var(--bone)" }}>
              Aa
            </span>
            <span style={{ fontSize: 10, color: "var(--bone-dim)" }}>Helvetica</span>
          </div>
          <div style={{ fontFamily: HELV, fontSize: 9, color: "var(--bone-dim)", marginTop: 8 }}>
            <b style={{ color: "var(--bone)" }}>Bold</b> · Regular
          </div>
        </Panel>

        {/* layers */}
        <Panel at={{ left: 44, bottom: 64, width: 150, padding: "16px 20px" }} delay={480}>
          <PanelLabel>Layers</PanelLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 9,
              marginTop: 12,
              fontFamily: MONO,
              fontSize: 11.5,
              color: "var(--bone-dim)",
            }}
          >
            {[
              ["Logotype", 0.85],
              ["Type specimen", 0.85],
              ["Palette", 0.85],
              ["Imagery", 0.35],
            ].map(([name, dot]) => (
              <div key={String(name)} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: `rgba(244,237,223,${dot})`,
                    flex: "none",
                  }}
                />
                {name}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </GraphicScaler>
  );
}
