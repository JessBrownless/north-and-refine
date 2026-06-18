import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Base (dark, premium agency) ──────────────────────────────────
        ink: "#0C0C0D", // deepest — default page background
        "ink-raised": "#161618", // raised surfaces / cards on dark
        "ink-line": "#2A2A2C", // hairline dividers on dark
        // ── Light surfaces & text ────────────────────────────────────────
        bone: "#F2EEE6", // warm off-white — light sections, text on ink
        "bone-dim": "#CBC6BB", // muted bone — secondary text on ink
        "bone-line": "#DAD4C8", // hairline dividers on light
        clay: "#8A8578", // mid warm-grey — captions, fine print
        // ── Accent (single restrained metallic) ──────────────────────────
        champagne: "#C2A878", // brass/champagne — the one accent
        "champagne-soft": "#D8C6A4",
      },
      fontFamily: {
        // Single premium sans + mono accents. "display" aliases the sans so
        // font-display usages (wordmark, drawer, PhoneMockup) stay valid.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
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
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1.2s ease-out forwards",
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
