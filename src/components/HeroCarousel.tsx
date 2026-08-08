import { MONO, SANS } from "@/components/graphics/shared";

/**
 * THE HOMEPAGE HERO CAROUSEL — figure 20a from the client's "Website graphics
 * request" design project (`Website Graphics.dc.html`, claude.ai/design),
 * imported 2026-08-09 to replace the hero's row of repeated client-site device
 * tiles.
 *
 * WHAT IT IS: a full-bleed marquee of EIGHT mixed-width cards, all one height,
 * scrolling continuously on the page's own ink ground behind left/right edge
 * fades. Three card grounds carry the whole set — a blurred ember texture, the
 * near-black ink gradient, and one light bone card — so the strip reads as one
 * system rather than eight unrelated tiles.
 *
 * ⚠ THIS IS THE SITE'S THIRD SANCTIONED AUTO-MOTION. "Nothing auto-moves,
 * ever" is drift pattern 14, and it has had exactly two exceptions (the
 * /services CreditStrip marquee, and the ContactCTA typewriter) — both minted
 * at the client's explicit call, as this one is ("a full-width, continuously
 * scrolling marquee"). Keep the list closed: a fourth needs asking for.
 *
 * HOUSE CONVERSIONS APPLIED AT IMPORT (the graphics-set rules in
 * `graphics/shared.tsx`):
 *  · Palette hexes → tokens wherever the design's value IS a token: #110E0A →
 *    --ink, #F4EDDF → --bone, #C2A878 → --champagne, #D8C6A4 →
 *    --champagne-soft, #FDF8EF → --ivory, #8A3411 → --ember-burnt. A literal
 *    that equals a token is drift wherever it sits (the adjudication rule), so
 *    none of those six survive as hexes here.
 *  · In-graphic GRADE tones — the ember gradient's own stops, the browser
 *    chrome, the screen glass — stay literal. They depict artwork the system
 *    has no opinion about, which is exactly what the rule sanctions.
 *  · The dark glass panels are `.glass-float`, NOT a hand-rolled copy: the
 *    design's spec (38% ink, blur 22, 24% bone rim, three-part shadow) is
 *    where that token came from in the first place. It carries --radius-ui
 *    (16px) against the design's 14px — the documented house deviation, since
 *    14 is not on the surface scale and a raw radius is drift pattern 10.
 *  · Instrument Sans / Geist Mono → SANS / MONO. Mono is confined to the small
 *    tracked-caps panel labels and code-style strings, per the brief.
 *
 * MOTION: the existing `animate-marquee` utility (translateX(0) → -50%), retimed
 * to the design's 52s with an inline `animationDuration` rather than a new
 * keyframe — that keeps BOTH behaviours the utility already owns: the
 * `.animate-marquee:hover` pause in globals.css, and the global
 * reduced-motion guard, which collapses the animation to its end state so the
 * strip renders as a static row. The row is duplicated once inside a
 * `w-max` track, so -50% is a seamless loop and the duplicate is aria-hidden.
 * No entrance animation and no layout shift: the cards are fixed-size and the
 * marquee is running at frame 0.
 *
 * ⚠ ONE IMAGE, RENDERED TWICE. The design tool ships `carousel-mirror.js` to
 * copy dropped images into the mirrored row's slots — a design-tool
 * workaround, deliberately NOT ported. Here the same `CARDS` array renders
 * twice, so every asset is referenced once in source and once on the network.
 *
 * ⚠ THREE CARDS ARE STILL PLACEHOLDER GROUNDS (3, 7, 8) — the design's slots
 * were empty at export. They render the designed empty ground; see the TODOs.
 */

/* Card geometry. Height is the one variable — every width is a RATIO of it,
   so the whole strip scales from a single custom property and the cards keep
   their designed proportions at any height. Design heights: 380px desktop,
   ~300px on phones (the brief's own number). */
const CARD_H = "var(--nr-card-h)";
const w = (px: number) => `calc(${CARD_H} * ${(px / 380).toFixed(4)})`;

/* THE THREE GROUNDS. Literal gradient stops: these are the artwork's own
   ember/ink ramps, which the token set has no equivalent for (only the two
   endpoints, --ember-burnt and --ink, are tokens and are used as such). */
const GROUND_EMBER =
  "radial-gradient(112% 92% at 70% 14%,#A85A2A 0%,var(--ember-burnt) 30%,#67240E 58%,#331106 100%)";
const GROUND_INK =
  "radial-gradient(120% 110% at 76% -10%,#3A1A0C 0%,#241108 34%,#170D07 64%,#0B0705 100%)";
const GROUND_BONE =
  "radial-gradient(112% 92% at 68% 12%,#F6D9B4 0%,#EFC79B 34%,#E6B98C 62%,#D8A87C 100%)";
/* The empty-slot ground the design uses for its two un-dropped imagery cards. */
const GROUND_PLACEHOLDER = "#241A14";

const cardBase: React.CSSProperties = {
  position: "relative",
  flex: "none",
  height: CARD_H,
  borderRadius: 20,
  overflow: "hidden",
};

/* The design's dark glass panel, positioned. Fill/rim/shadow/radius all come
   from `.glass-float`; only placement is the composition's business. */
const panelDark: React.CSSProperties = {
  position: "absolute",
  left: 26,
  right: 26,
  top: "50%",
  transform: "translateY(-50%)",
  padding: "20px 22px",
};

const monoLabel: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 9,
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color: "var(--champagne-soft)",
};

/* The blurred ember texture behind cards 1 and 6 — inset past the card edge so
   the 48px blur never shows a seam, exactly as the design has it. */
function EmberTexture() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -60,
          filter: "blur(48px) saturate(.92) brightness(.8)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-carousel/ember-texture.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 50% 38%,rgba(17,14,10,0) 30%,rgba(17,14,10,.42) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          /* Translucent fallback so the layer still reads where
             backdrop-filter is unsupported (the brief's requirement). */
          background: "rgba(17,14,10,.08)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ── 1 · THE PHONE ON EMBER ─────────────────────────────────────────────── */
function CardPhone() {
  return (
    <div style={{ ...cardBase, width: w(260), background: GROUND_EMBER }}>
      <EmberTexture />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: w(172),
          height: w(348),
          background: "color-mix(in srgb, var(--ivory) 22%, transparent)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid color-mix(in srgb, var(--ivory) 65%, transparent)",
          borderRadius: 30,
          padding: 9,
          boxShadow:
            "inset 0 1px 0 rgba(253,248,239,.5),0 44px 80px -30px rgba(17,14,10,.8)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#1A1512",
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 0 0 1px rgba(17,14,10,.16)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-carousel/client-mobile.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 7,
              left: "50%",
              transform: "translateX(-50%)",
              width: 58,
              height: 14,
              borderRadius: 8,
              background: "var(--ink)",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── 2 · THE BOOKING PANEL ──────────────────────────────────────────────── */
function CardBooking() {
  return (
    <div style={{ ...cardBase, width: w(300), background: GROUND_INK }}>
      <div className="glass-float" style={panelDark}>
        <span style={monoLabel}>Next available</span>
        <div style={{ fontSize: 17, color: "var(--bone)", marginTop: 10 }}>
          Thursday · 10:30
        </div>
        <div style={{ fontSize: 11.5, color: "rgba(244,237,223,.6)", marginTop: 4 }}>
          Initial consultation · 45 min
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".6em",
            background: "var(--champagne)",
            color: "var(--ink)",
            borderRadius: 9999,
            fontFamily: MONO,
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            padding: "11px 0",
            marginTop: 16,
          }}
        >
          Book <span aria-hidden>→</span>
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid rgba(244,237,223,.16)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 12,
              height: 12,
              flex: "none",
              borderRadius: "50%",
              background: "var(--champagne)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
              <path
                d="M1 4.2l2 2L7 1.6"
                stroke="#110E0A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span style={{ fontSize: 11, color: "rgba(244,237,223,.7)" }}>
            Reminder sent · no deposit taken
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 3 · IMAGERY SLOT (empty in the design export) ──────────────────────── */
function CardImageryWarm() {
  return (
    <div style={{ ...cardBase, width: w(280), background: GROUND_PLACEHOLDER }}>
      {/* TODO(client asset): "Drop Adobe Stock imagery — warm, editorial".
          The design's slot was empty at export; this renders its ground. Drop
          the file in as an absolutely-positioned object-cover <img> here. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(17,14,10,.16),rgba(17,14,10,0) 30%,rgba(17,14,10,0) 70%,rgba(17,14,10,.3))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── 4 · THE ENQUIRIES TREND ────────────────────────────────────────────── */
function CardTrend() {
  return (
    <div style={{ ...cardBase, width: w(300), background: GROUND_INK }}>
      <div className="glass-float" style={{ ...panelDark, padding: "20px 22px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={monoLabel}>Enquiries</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1.5 11.5l4-4.4 2.6 2.2 4.4-5.4"
              stroke="#D8C6A4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 3.9h3.5v3.5"
              stroke="#D8C6A4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <svg
          width="100%"
          height="56"
          viewBox="0 0 216 56"
          preserveAspectRatio="none"
          style={{ display: "block", marginTop: 12, overflow: "visible" }}
          aria-hidden
        >
          <path
            d="M4,48 C56,44 96,36 130,26 C160,17 186,12 208,8"
            fill="none"
            stroke="rgba(216,198,164,.95)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="208" cy="8" r="4.5" fill="none" stroke="rgba(216,198,164,.95)" strokeWidth="1.3" />
          <circle cx="208" cy="8" r="1.8" fill="#D8C6A4" />
        </svg>
        <div
          aria-hidden
          style={{
            position: "relative",
            height: 14,
            marginTop: 8,
            background:
              "repeating-linear-gradient(90deg,rgba(216,198,164,.5) 0 1px,transparent 1px 13px)",
            backgroundPosition: "3px 0",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: -3,
              bottom: 0,
              width: 2,
              background: "var(--champagne-soft)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 9 }}>
          <span
            style={{
              fontSize: 10,
              color: "var(--bone)",
              border: "1px solid rgba(244,237,223,.4)",
              borderRadius: 9999,
              padding: "3px 12px",
            }}
          >
            Month 6
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 5 · THE LIGHT SEARCH CARD ──────────────────────────────────────────── */
function CardSearch() {
  return (
    <div style={{ ...cardBase, width: w(320), background: GROUND_BONE }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 100% at 50% 30%,rgba(253,248,239,.3) 20%,rgba(200,140,86,.2) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          ...panelDark,
          background: "color-mix(in srgb, var(--ivory) 50%, transparent)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,.7)",
          borderRadius: "var(--radius-ui)",
          boxShadow:
            "0 30px 60px -26px rgba(94,31,10,.35),inset 0 1px 0 rgba(255,255,255,.8)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid rgba(17,14,10,.3)",
            borderRadius: 9999,
            padding: "10px 15px",
            background: "color-mix(in srgb, var(--ivory) 55%, transparent)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="5" stroke="#8A3411" strokeWidth="1.4" />
            <path d="M11 11l3.2 3.2" stroke="#8A3411" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12.5, color: "var(--ink)", whiteSpace: "nowrap" }}>
            osteopath islington
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#5C4232", marginTop: 11 }}>
          1,900 searches near you every month
        </div>
        <div style={{ height: 1, background: "rgba(17,14,10,.14)", margin: "13px 0 11px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            aria-hidden
            style={{
              width: 26,
              height: 26,
              flex: "none",
              borderRadius: 7,
              background: "linear-gradient(140deg,#A8511E,var(--ember-burnt))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--bone)",
            }}
          >
            H
          </span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              Halden Osteopathy
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: "var(--ember-burnt)",
                marginTop: 2,
              }}
            >
              haldenosteopathy.co.uk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6 · THE TESTIMONIAL ON EMBER ───────────────────────────────────────── */
function CardQuote() {
  return (
    <div style={{ ...cardBase, width: w(280), background: GROUND_EMBER }}>
      <EmberTexture />
      <div className="glass-float" style={{ ...panelDark, padding: "22px 24px" }}>
        <span
          aria-hidden
          style={{ color: "var(--champagne)", fontSize: 11, letterSpacing: ".26em" }}
        >
          ★★★★★
        </span>
        <div style={{ fontSize: 16, lineHeight: 1.45, color: "var(--bone)", marginTop: 12 }}>
          &ldquo;It finally sounds like us.&rdquo;
        </div>
        <div style={{ ...monoLabel, marginTop: 12 }}>Practice owner · London</div>
      </div>
    </div>
  );
}

/* ── 7 · THE DESKTOP FRAME (slot empty in the design export) ────────────── */
function CardDesktop() {
  return (
    <div style={{ ...cardBase, width: w(460), background: GROUND_INK }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          right: -80,
          top: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(168,81,30,.34),transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: "50%",
          transform: "translateY(-50%)",
          height: w(290),
          borderRadius: "var(--radius-ui)",
          background: "color-mix(in srgb, var(--ivory) 22%, transparent)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid color-mix(in srgb, var(--ivory) 65%, transparent)",
          boxShadow:
            "inset 0 1px 0 rgba(253,248,239,.5),0 44px 80px -30px rgba(17,14,10,.8)",
          padding: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 9,
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(180deg,#F7F1E4,#EAE0CB)",
            boxShadow: "0 0 0 1px rgba(17,14,10,.16)",
          }}
        >
          <div
            style={{
              height: 30,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 12px",
              background: "color-mix(in srgb, var(--ivory) 80%, transparent)",
              borderBottom: "1px solid rgba(17,14,10,.12)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "rgba(17,14,10,.22)",
                }}
              />
            ))}
            <span
              style={{
                marginLeft: 8,
                flex: 1,
                maxWidth: 190,
                height: 18,
                border: "1px solid rgba(17,14,10,.22)",
                borderRadius: 9999,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontFamily: MONO,
                fontSize: 9,
                color: "#5C5545",
              }}
            >
              clientsite.co.uk
            </span>
          </div>
          {/* TODO(client asset): "Drop client website" — the design's slot was
              empty at export; this is its designed empty screen ground. */}
          <div
            style={{ position: "absolute", left: 0, right: 0, top: 30, bottom: 0, background: "#E3D7C3" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── 8 · IMAGERY SLOT (empty in the design export) ──────────────────────── */
function CardImagerySkin() {
  return (
    <div style={{ ...cardBase, width: w(240), background: GROUND_PLACEHOLDER }}>
      {/* TODO(client asset): "Drop Adobe Stock imagery — skin / texture
          detail". Renders the designed empty ground until the file lands. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(17,14,10,.16),rgba(17,14,10,0) 30%,rgba(17,14,10,0) 70%,rgba(17,14,10,.3))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* The design's own order — the widths alternate deliberately (260·300·280·300·
   320·280·460·240) so the strip never falls into a visible rhythm. */
const CARDS = [
  CardPhone,
  CardBooking,
  CardImageryWarm,
  CardTrend,
  CardSearch,
  CardQuote,
  CardDesktop,
  CardImagerySkin,
];

function CardRow({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      /* ⚠ THE TRAILING MARGIN IS WHAT MAKES THE LOOP SEAMLESS, and it is the
         one place this deviates from the design file's own DOM. The design
         puts `gap:22` on the TRACK holding both rows, which makes the track
         `row + gap + row` — so the -50% the keyframe travels is `row +
         gap/2`, eleven pixels short of the `row + gap` needed to land card 1
         of the mirror exactly where card 1 started. Measured live before the
         fix: -2605px travelled against 2616px needed, an 11px jump every 52s.
         Giving each ROW the trailing gap instead makes the track
         `(row+gap) + (row+gap)`, so -50% is exactly one row plus one gap. */
      style={{ display: "flex", gap: 22, flex: "none", marginRight: 22 }}
      {...(mirrored ? { "aria-hidden": true } : {})}
    >
      {CARDS.map((Card, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}

export default function HeroCarousel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`nr-hero-carousel relative w-full overflow-hidden ${className}`}
      style={{ fontFamily: SANS }}
    >
      {/* The track sits in normal flow, so the strip is exactly as tall as its
          cards — no absolute positioning and therefore no reserved-height
          guesswork, which is what keeps load free of layout shift. The wrapper
          above clips it; the design's separate inner clipper was redundant. */}
      <div
        className="animate-marquee flex w-max"
        style={{ animationDuration: "52s" }}
      >
        <CardRow />
        <CardRow mirrored />
      </div>

      {/* EDGE FADES — the design's 110px, narrowed to 48px on phones per the
          brief so they never eat a whole card. Ink to transparent, so they
          only work on the page's own ink ground (which is where this sits). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 md:w-[110px]"
        style={{ background: "linear-gradient(90deg,var(--ink),rgba(17,14,10,0))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 md:w-[110px]"
        style={{ background: "linear-gradient(270deg,var(--ink),rgba(17,14,10,0))" }}
      />
    </div>
  );
}
