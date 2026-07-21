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
      colors: {
        // ── Base (dark, premium agency) ──────────────────────────────────
        ink: "#0C0C0D",
        "ink-raised": "#161618",
        "ink-line": "#3A3A3E",
        // ── Light surfaces & text ────────────────────────────────────────
        bone: "#F2EEE6", // warm off-white — light sections, text on ink
        "bone-dim": "#C1B9B0", // muted bone — secondary text on ink (deepened from #CBC6BB, settled 2026-07-10)
        "bone-line": "#DAD4C8", // hairline dividers on light
        clay: "#8A8578", // mid warm-grey — captions, fine print
        // ── On-LIGHT ink text ladder (2026-07-13) — mirror of --ink-dim/mute/faint
        // in globals.css; the bone-ground counterpart of bone-dim/clay. Keep in sync.
        "ink-dim": "#51504E", // secondary text on light — body/lede (≈ ink/70 on bone, ~6.9:1)
        "ink-mute": "#686664", // meta/label on light (≈ ink/60 on bone, ~5.0:1 AA)
        "ink-faint": "#ADAAA5", // DECORATIVE ONLY — dots, placeholder marks (≈ ink/30, sub-AA)
        // ── Accent (single restrained metallic) ──────────────────────────
        champagne: "#C2A878", // brass/champagne — the one accent
        "champagne-soft": "#D8C6A4",
        // ── Signal (the 10 of 60-30-10) ──────────────────────────────────
        ember: "#FF7A00", // bright ember — live/availability dots only, one per view
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
        marquee: "marquee 28s linear infinite",
        // Floaty hero elements — stagger depths by mixing the two speeds.
        "float-slow": "float 7s ease-in-out infinite",
        "float-slower": "float 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
