import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import ExitFades from "@/components/ExitFades";

// ── ONE-FONT HOUSE: Instrument Sans ─────────────────────────────────────────
// (2026-07-14, client's big call: "make all headings and text Instrument Sans"
// — the Saol serif wasn't working.) A single free Google face now carries every
// tier. `--font-sans` holds Instrument Sans and `--font-display` is ALIASED to
// it on <html> below, so the ~27 heading/body rules in globals.css that read
// those two vars all resolve to Instrument Sans with no per-rule edits.
//
// This also RETIRES both licence blockers: Dia (trial) and Saol (licensed) are
// gone, so this layout can finally ship COMMITTED — no more held-back font block
// or Instrument-Sans production swap. The old faces stay in src/fonts/ unused.
// NOTE: the <em> accent-word device now renders Instrument Sans italic, not Saol
// Light Italic — revisit that device (and the "size-only hierarchy" rule, now
// that a weighted family is available) separately.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

// Saol Display — the ACCENT face only (2026-07-20, reintroduced for the hero
// title device: "one italic serif part in the title"). Headings/body stay
// Instrument; `--font-saol` is used solely by the <em> accent rule in globals.
const saol = localFont({
  src: [
    { path: "../fonts/SaolDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SaolDisplay-LightItalic.woff", weight: "300", style: "italic" },
  ],
  variable: "--font-saol",
  display: "swap",
});

// Geist Mono — THE KICKER / META VOICE (2026-07-20, client: "unify the kicker").
// The homepage hero kicker is mono; loading it globally lets .overline (and the
// homepage inline kicker) share ONE mono face, so every tracked-caps kicker
// sitewide reads the same. Restores the meta voice the retired-canon note
// describes ("overlines… that Geist Mono used to carry"). Used by the .overline
// rule in globals + the homepage hero's inline kicker.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#1C1710",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${saol.variable} ${geistMono.variable}`}
      style={{ "--font-display": "var(--font-sans)" } as React.CSSProperties}
    >
      <body id="top">
        {/* Site-wide structured data: the studio + the website node. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <ExitFades />
        <Reveal />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
