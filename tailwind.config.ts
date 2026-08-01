import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Root-level MDX element overrides (prose styling for Journal/Work bodies)
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      // THE PLATE RADIUS SCALE (2026-08-01) — all imagery rounds, sized to
      // the plate. Values live in globals.css :root (decision record there);
      // these mirrors must match. rounded-plate is the standard (.frame
      // carries it in CSS); -sm for small figures, -lg for the big cards.
      borderRadius: {
        "plate-sm": "var(--radius-plate-sm)",
        plate: "var(--radius-plate)",
        "plate-lg": "var(--radius-plate-lg)",
      },
      colors: {
        // ── Base (dark, premium agency) ──────────────────────────────────
        // RE-TONED 2026-07-31 (ember-palette handoff): the whole neutral
        // family moved onto the warm axis (h 32–40°) to tone with the ember
        // ramp — lightness held per token; see the decision record in
        // globals.css. Mirrors must match globals.css exactly.
        ink: "#110E0A",
        "ink-raised": "#1A1610",
        "ink-line": "#2F2820",
        // ── Light surfaces & text ────────────────────────────────────────
        bone: "#F4EDDF", // warm off-white — light sections, text on ink
        ivory: "#FDF8EF", // near-white — the light act's STEP UP (2026-07-24 services-pacing handoff); warm-leaned with the family 2026-07-31
        "bone-dim": "#CFC5B2", // muted bone — secondary text on ink (three-tier spacing settled 2026-07-10 holds)
        "bone-line": "#DED2BF", // hairline dividers on light
        clay: "#8E8270", // mid warm-grey — captions, fine print
        // ── On-LIGHT ink text ladder (2026-07-13) — mirror of --ink-dim/mute/faint
        // in globals.css; the bone-ground counterpart of bone-dim/clay. Keep in sync.
        // Re-derived 2026-07-31 from the new ink/bone endpoints (same composite maths).
        "ink-dim": "#55514A", // secondary text on light — body/lede (≈ ink/70 on bone, ~6.8:1)
        "ink-mute": "#6C675F", // meta/label on light (≈ ink/60 on bone, ~4.9:1 AA)
        "ink-faint": "#B0AA9F", // DECORATIVE ONLY — dots, placeholder marks (≈ ink/30, sub-AA)
        // ── Accent (single restrained metallic) ──────────────────────────
        champagne: "#C2A878", // brass/champagne — the one accent
        "champagne-soft": "#D8C6A4",
        // ── Signal (the 10 of 60-30-10) ──────────────────────────────────
        ember: "#FF7A00", // bright ember — live/availability dots only, one per view
        // ── The ember ramp (2026-07-31) — hero-IMAGERY tones only, never
        // section grounds; contract comment lives with the CSS vars.
        "ember-burnt": "#8A3411",
        "ember-deep": "#5E1F0A",
      },
      fontFamily: {
        // Two-font house: Dia (--font-sans) for body/UI/meta, Saol Display for
        // display — every font-display usage is heading/wordmark territory (Navbar/Footer
        // wordmarks, coming-soon, mockup mini-sites). The mono stack survives only
        // for device-chrome depictions (BrowserMockup address bar) — system mono.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        // RETIRED from the brand (2026-07-10): entrances are pure fades, in
        // place — the rise is a screen idiom (print never arrives from
        // somewhere). Kept only for the /mockups archive.
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        // Overline reveal — fades in while the letters ease apart, settling
        // wider than the .overline default. Ends past 0.22em on purpose: the
        // extra tracking is part of the effect, held by fill-mode forwards.
        trackIn: {
          "0%": { opacity: "0", letterSpacing: "0.1em" },
          "100%": { opacity: "1", letterSpacing: "0.38em" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-in-slow": "fadeIn 2.4s ease-out forwards", // the plate tempo — images develop slower than type (2026-07-11)
        "track-in": "trackIn 1.1s cubic-bezier(0.16,1,0.3,1) forwards",
        // 28s → 60s (2026-07-24): back in live service for the /services
        // fields ribbon — the ONE sanctioned auto-motion; ~80px/s reads as
        // drift, not scroll. Pause-on-hover lives in globals.css.
        marquee: "marquee 60s linear infinite",
        // Floaty hero elements — stagger depths by mixing the two speeds.
        "float-slow": "float 7s ease-in-out infinite",
        "float-slower": "float 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
