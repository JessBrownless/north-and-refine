import type { Metadata } from "next";
import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";

// Internal design canon — noindex (also disallowed in robots.ts).
// Organised atomically (Frost): 01 Atoms → 02 Molecules → 03 Organisms.
// Rule of the house: if you add a token/utility to globals.css, add it here
// in the same change. Everything on this page already exists in the system —
// nothing here is aspirational.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

/* ── Data ─────────────────────────────────────────────────────────────── */

const COLOURS: { name: string; cls: string; hex: string; use: string; lightCard?: boolean }[] = [
  { name: "Ink", cls: "bg-ink", hex: "#0C0C0D", use: "Default page background" },
  { name: "Ink raised", cls: "bg-ink-raised", hex: "#161618", use: "Raised surfaces / cards on dark" },
  { name: "Ink line", cls: "bg-ink-line", hex: "#2A2A2C", use: "Hairline dividers on dark (rule-dark)" },
  { name: "Bone", cls: "bg-bone", hex: "#F2EEE6", use: "Light sections; primary text on ink", lightCard: true },
  { name: "Bone dim", cls: "bg-bone-dim", hex: "#CBC6BB", use: "Secondary text on ink", lightCard: true },
  { name: "Bone line", cls: "bg-bone-line", hex: "#DAD4C8", use: "Hairline dividers on light (rule-light)", lightCard: true },
  { name: "Clay", cls: "bg-clay", hex: "#8A8578", use: "Captions, fine print, meta" },
  { name: "Champagne", cls: "bg-champagne", hex: "#C2A878", use: "THE accent — use sparingly" },
  { name: "Champagne soft", cls: "bg-champagne-soft", hex: "#D8C6A4", use: "Soft accent tint", lightCard: true },
];

const TYPE_STYLES: { cls: string; label: string; note: string; sample: string }[] = [
  { cls: "display-mega", label: ".display-mega", note: "52→152px · marquee/billboard lockup", sample: "North & Refine" },
  { cls: "display", label: ".display", note: "44→112px · billboard display", sample: "Considered by design" },
  { cls: "heading-xl", label: ".heading-xl", note: "36→79px · page H1 / section H2", sample: "Brand & web design" },
  { cls: "statement", label: ".statement", note: "28→56px · centred editorial statement", sample: "A calmer first impression" },
  { cls: "heading-lg", label: ".heading-lg", note: "24→40px · section H2", sample: "What we do" },
  { cls: "heading-md", label: ".heading-md", note: "20→28px · card / sub-heading H3", sample: "Brand identity" },
  { cls: "heading-sm", label: ".heading-sm", note: "17→20px · smallest heading H4", sample: "The approach" },
  { cls: "body-lg", label: ".body-lg", note: "17→19px · lede / intro copy", sample: "We build considered brands and high-performing websites for practices." },
  { cls: "body", label: ".body", note: "16px · default UI/body copy", sample: "The studio takes on a limited number of projects at a time." },
  { cls: "body-reading", label: ".body-reading", note: "17px · long-form reading column", sample: "A cosmetic surgery website carries unusual weight." },
  { cls: "blockquote", label: ".blockquote", note: "pull-quote", sample: "Design is the silent ambassador of the practice." },
  { cls: "overline text-champagne", label: ".overline", note: "11px · uppercase MONO kicker", sample: "Selected work" },
  { cls: "nav-link text-bone", label: ".nav-link", note: "12px · uppercase nav item", sample: "Services" },
  { cls: "cta-label text-bone", label: ".cta-label", note: "11px · button microtype", sample: "Start a project" },
  { cls: "index-num text-champagne", label: ".index-num", note: "18→24px · MONO list numbering", sample: "01 /" },
  { cls: "stat text-champagne", label: ".stat", note: "40→72px · MONO stat numbers", sample: "156%" },
  { cls: "label text-clay", label: ".label", note: "13px · captions & meta", sample: "Brand · Web · SEO" },
  { cls: "fineprint", label: ".fineprint", note: "12px · fine print", sample: "© 2026 North & Refine Studio." },
];

const MOTION: { cls: string; note: string }[] = [
  { cls: "animate-fade-in-up", note: "0.8s ease-out · hero load-in (pair with opacity-0, stagger with animationDelay)" },
  { cls: "animate-fade-in", note: "1.2s ease-out · soft load-in for large media (the hero deck)" },
  { cls: "animate-track-in", note: "1.1s expo-out · overline reveal — fades in while letter-spacing eases open to 0.38em" },
  { cls: ".reveal", note: "scroll-reveal via the global <Reveal /> observer — stagger with transitionDelay" },
  { cls: ".reveal-words", note: "word-by-word statement reveal riding the same observer — pair with .reveal, stagger via inline --d per word (homepage manifesto)" },
  { cls: "animate-marquee", note: "28s linear loop · ghost text and the sector strip" },
  { cls: "animate-float-slow / -slower", note: "7s / 11s ease loops · floaty hero elements; mix speeds for depth" },
];

// Page-level organisms live in real routes — catalogued here, demoed there.
const ORGANISM_INDEX: { name: string; home: string; note: string }[] = [
  { name: "Navbar (glass pill)", home: "components/Navbar.tsx", note: "Tall transparent bar; condenses to a floating bone-glass pill past 48px of scroll. One nav — never fork it." },
  { name: "Deck (showreel)", home: "components/Deck.tsx", note: "Fanned auto-cycling card stack; front card links to the case study whose capture it shows. Homepage hero." },
  { name: "PageHero", home: "components/PageHero.tsx", note: "THE interior-page hero — extend via props (overline, title, lede, cta, meta, size); don't spawn HeroX." },
  { name: "Device cluster", home: "work/[slug]/page.tsx", note: "BrowserMockup + overlapping PhoneMockup over a champagne glow — the canonical responsive showcase." },
  { name: "Editorial article grid", home: "work/[slug]/page.tsx", note: "Kicker rail (cols 2–4) · one-sentence statement + copy (cols 7–11) · figures span cols 2–11, or pair 5+5." },
  { name: "Stats band", home: "work/[slug]/page.tsx", note: "Raised full-width panel, .stat numerals with hairline dividers. Renders only when frontmatter metrics exist." },
  { name: "Testimonial band", home: "work/[slug]/page.tsx", note: "Centred client quote on scene-ink — a deliberate symmetry break. Driven by testimonial frontmatter." },
  { name: "WorkCard", home: "components/WorkCard.tsx", note: "Case-study card for grids; typographic placeholder until a thumbImage exists." },
  { name: "ContactCTA", home: "components/ContactCTA.tsx", note: "The bone 'interruption' band that closes most pages." },
  { name: "ContactForm", home: "components/ContactForm.tsx", note: "Netlify runtime-v5 form; static twin in public/__forms.html — keep fields in sync." },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

function SectionKicker({ num, title, note }: { num: string; title: string; note: string }) {
  return (
    <div className="mt-28 border-t rule-dark pt-10">
      <p className="index-num text-champagne">{num} /</p>
      <h2 className="heading-lg mt-3">{title}</h2>
      <p className="label text-clay mt-2 max-w-xl">{note}</p>
    </div>
  );
}

function Sub({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mt-14">
      <h3 className="heading-sm text-bone">{title}</h3>
      {note && <p className="fineprint mt-1 max-w-xl">{note}</p>}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function StylesheetPage() {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <div className="shell pt-36 pb-24 md:pt-44">
        <p className="overline text-champagne">Internal reference</p>
        <h1 className="heading-xl from-overline">Design system</h1>
        <p className="lede body-lg text-bone-dim">
          The visual source of truth, organised atomically: atoms (the raw tokens), molecules
          (small compositions), organisms (full components). Everything here already exists in
          globals.css or a component — if you add a token, add it here in the same change.
        </p>

        {/* ════════════════════ 01 · ATOMS ════════════════════ */}
        <SectionKicker
          num="01"
          title="Atoms"
          note="Colour, type, containers, rules, surfaces and motion — the indivisible ingredients. All live in globals.css / tailwind.config.ts."
        />

        {/* Colour */}
        <Sub title="Colour" note="Tailwind classes in markup (bg-ink, text-bone…); raw hex only inside globals.css." />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {COLOURS.map((c) => (
            <div key={c.name}>
              <div className={`h-20 rounded-sm border rule-dark ${c.cls}`} />
              <p className="label mt-2 text-bone">
                {c.name} <span className="text-clay">· {c.hex}</span>
              </p>
              <p className="fineprint">{c.use}</p>
            </div>
          ))}
        </div>

        {/* Typography */}
        <Sub
          title="Typography"
          note="Single premium sans (Instrument Sans — note the sheared 'scalpel' terminals) + Geist Mono for engineered accents. One clamp() per class; never inline font sizes."
        />
        <div className="mt-6 divide-y rule-dark">
          {TYPE_STYLES.map((t) => (
            <div key={t.label} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 items-baseline">
              <div className="md:col-span-3">
                <p className="label text-bone">{t.label}</p>
                <p className="fineprint">{t.note}</p>
              </div>
              <div className="md:col-span-9 overflow-hidden">
                <span className={t.cls}>{t.sample}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Containers */}
        <Sub
          title="Containers"
          note=".shell for all body content; .shell-wide for heroes (plus one sanctioned exception: the case-study article uses it as the image canvas)."
        />
        <div className="mt-6 space-y-3">
          <div className="rounded-sm border rule-dark bg-ink-raised/40 py-3 text-center">
            <p className="label text-bone">.shell-wide <span className="text-clay">· max 1760px · padding clamp(1.5rem, 4vw, 4rem)</span></p>
          </div>
          <div className="mx-auto w-[72%] rounded-sm border rule-dark bg-ink-raised py-3 text-center">
            <p className="label text-bone">.shell <span className="text-clay">· max 1280px · padding clamp(1.5rem, 5vw, 5rem)</span></p>
          </div>
          <div className="mx-auto w-[40%] rounded-sm border border-champagne/40 py-3 text-center">
            <p className="label text-bone">reading measure <span className="text-clay">· ~60–70ch</span></p>
          </div>
        </div>

        {/* Rules */}
        <Sub title="Rules & hairlines" note="rule-dark / rule-light set border-colour only — always pair with a border-* utility." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-sm bg-ink-raised/40 p-6">
            <div className="border-t rule-dark" />
            <p className="fineprint mt-3">.rule-dark on ink · #2A2A2C</p>
          </div>
          <div className="rounded-sm bg-bone p-6">
            <div className="border-t rule-light" />
            <p className="fineprint mt-3 text-clay">.rule-light on bone · #DAD4C8</p>
          </div>
        </div>

        {/* Surfaces */}
        <Sub title="Surfaces & scenes" note="Backdrops and media wrappers. .grain needs relative + overflow-hidden on the parent and z-10 on content above it." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="scene-warm rounded-2xl p-8 text-ink">
            <p className="label">.scene-warm</p>
            <p className="fineprint">Champagne-lit light scene — device backdrops</p>
          </div>
          <div className="scene-ink rounded-2xl p-8 border rule-dark">
            <p className="label text-bone">.scene-ink</p>
            <p className="fineprint">Champagne glow on ink — dark hero backdrop</p>
          </div>
          <div className="relative overflow-hidden grain scene-ink rounded-2xl p-8 border rule-dark">
            <p className="label text-bone relative z-10">.grain</p>
            <p className="fineprint relative z-10">Film-grain overlay for dark heroes</p>
          </div>
          <div className="frame rounded-2xl p-8">
            <p className="label text-bone relative">.frame</p>
            <p className="fineprint relative">Media wrapper — relative, overflow-hidden, ink-raised</p>
          </div>
          <div className="portrait-fill rounded-2xl p-8 text-ink">
            <p className="label">.portrait-fill</p>
            <p className="fineprint text-ink/70">Abstract portrait gradient — client-imagery stand-in</p>
          </div>
          <div className="scene-ink rounded-2xl p-4">
            <div className="card-glass p-8">
              <p className="label text-bone">.card-glass</p>
              <p className="fineprint">Glassy card on dark surfaces</p>
            </div>
          </div>
        </div>
        <div className="mt-8 overflow-hidden">
          <p className="display text-ghost-on-dark whitespace-nowrap">.text-ghost-on-dark</p>
        </div>

        {/* Motion */}
        <Sub
          title="Motion"
          note="A reduced-motion guard snaps every animation to its end state. Load-in utilities pair with opacity-0 and play once on mount."
        />
        <div className="mt-6 divide-y rule-dark">
          {MOTION.map((m) => (
            <div key={m.cls} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
              <p className="label text-bone md:col-span-4">{m.cls}</p>
              <p className="fineprint md:col-span-8">{m.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="card-glass px-5 py-3 animate-float-slow">
            <p className="label text-bone">float-slow</p>
          </div>
          <div className="card-glass px-5 py-3 animate-float-slower" style={{ animationDelay: "1.2s" }}>
            <p className="label text-bone">float-slower</p>
          </div>
          <p className="overline text-bone-dim opacity-0 animate-track-in">Track-in overline</p>
        </div>

        {/* ════════════════════ 02 · MOLECULES ════════════════════ */}
        <SectionKicker
          num="02"
          title="Molecules"
          note="Small, reusable compositions of atoms — heading groups, buttons, prose furniture, data pairs."
        />

        {/* Heading group */}
        <Sub title="Heading group" note="Overline and heading as direct siblings; .from-overline scales the gap with the heading; .lede on the subtitle. Never set these gaps with ad-hoc mt-*." />
        <div className="mt-6 rounded-sm border rule-dark p-8">
          <p className="overline text-champagne">Kicker</p>
          <h3 className="heading-lg from-overline">A heading that follows it</h3>
          <p className="lede body-lg text-bone-dim">And the lede beneath, spaced by .lede — one system, three classes.</p>
        </div>

        {/* Buttons */}
        <Sub title="Buttons" note="Compose .btn + one variant; light/dark is the background the button sits on. One primary per view; → is optional child markup." />
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary-dark">Primary dark <span aria-hidden>→</span></button>
            <button className="btn btn-secondary-dark">Secondary dark</button>
            <button className="btn btn-secondary-dark btn-sm">Secondary sm</button>
            <span className="btn-ghost text-bone">Ghost link <span aria-hidden>→</span></span>
          </div>
          <div className="bg-bone rounded-sm p-8 flex flex-wrap gap-4">
            <button className="btn btn-primary-light">Primary light</button>
            <button className="btn btn-secondary-light">Secondary light</button>
            <span className="btn-ghost text-ink">Ghost link <span aria-hidden>→</span></span>
          </div>
        </div>

        {/* Prose furniture */}
        <Sub title="Prose furniture" note="Long-form elements from mdx-components.tsx (Journal + Work bodies). The ✦ bullet is the sector-strip motif hung in the margin." />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-sm border rule-dark p-8">
            <ul className="body-reading list-none space-y-3 text-bone/90 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.5em] [&>li]:before:text-[10px] [&>li]:before:leading-none [&>li]:before:text-champagne [&>li]:before:content-['✦']">
              <li>Unordered lists hang the champagne ✦</li>
              <li>With generous space between items</li>
              <li>Canonical classes live in mdx-components.tsx</li>
            </ul>
          </div>
          <div className="rounded-sm border rule-dark p-8">
            <blockquote className="blockquote text-bone">
              Pull-quotes use .blockquote, set in the bone.
            </blockquote>
            <p className="label mt-6 text-clay">Figure captions use .label in clay — opt-in via the image title in MDX.</p>
          </div>
        </div>

        {/* Statement pattern */}
        <Sub title="Kicker + statement (case-study prose)" note="Inside .prose-work, an h2 renders as the kicker and the paragraph directly after it takes statement scale automatically — one sentence max." />
        <div className="prose-work mt-6 rounded-sm border rule-dark p-8">
          <h2 className="overline text-champagne">The brief</h2>
          {/* !mt: the statement rule's lg margin exists to row-align with the
              case-study grid — irrelevant in this flat demo box */}
          <p className="lg:!mt-4">One strong sentence carries the section.</p>
          <p className="body-reading mt-4 text-bone/90">The evidence follows at reading size, exactly like this.</p>
        </div>

        {/* Data pairs */}
        <Sub title="Data & meta" note="Stat pairs for outcomes; overline/body pairs for project meta; index numbering for itemised lists." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 rounded-sm border rule-dark p-8">
          <div>
            <p className="stat text-champagne">#1–3</p>
            <p className="label text-bone-dim mt-3">Google positions, target keywords</p>
          </div>
          <div>
            <p className="overline text-clay">Client</p>
            <p className="body text-bone mt-1.5">Dr Jane Smith</p>
          </div>
          <div>
            <p className="index-num text-champagne">02 /</p>
            <h3 className="heading-md mt-4">Web design &amp; build</h3>
          </div>
        </div>

        {/* Form field */}
        <Sub title="Form field" note="The underline input — canonical classes live in ContactForm.tsx. Bone text, clay placeholder, champagne focus border." />
        <div className="mt-6 rounded-sm border rule-dark p-8 max-w-md">
          <label htmlFor="ss-field" className="overline text-clay">Your name</label>
          <input
            id="ss-field"
            type="text"
            placeholder="Dr Jane Smith"
            className="w-full bg-transparent border-0 border-b rule-dark py-3 text-bone placeholder:text-clay focus:outline-none focus:border-champagne transition-colors"
          />
        </div>

        {/* ════════════════════ 03 · ORGANISMS ════════════════════ */}
        <SectionKicker
          num="03"
          title="Organisms"
          note="Full components. The device mockups render below in placeholder mode; page-level organisms are catalogued with their homes — see them live on the routes."
        />

        {/* Device mockups */}
        <Sub title="Device mockups" note="BrowserMockup + PhoneMockup — pass a real screenshot to replace the CSS placeholder site. Pair them as the device cluster." />
        <div className="scene-ink rounded-2xl border rule-dark p-8 md:p-12 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <BrowserMockup />
            </div>
            <div className="md:col-span-4 flex justify-center">
              <PhoneMockup size="sm" />
            </div>
          </div>
        </div>

        {/* Cards */}
        <Sub title="Cards" note=".card-glass on dark (homepage services, journal teasers); .card-soft on light surfaces." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="card-glass p-8">
            <p className="index-num text-champagne">01 /</p>
            <h3 className="heading-md mt-4">Brand identity</h3>
            <p className="body mt-3 text-bone-dim">A considered visual language that signals the standard of care.</p>
          </div>
          <div className="bg-bone rounded-sm p-5">
            <div className="card-soft p-8 text-ink">
              <p className="overline text-clay">.card-soft</p>
              <h3 className="heading-md mt-3">Elevated on light</h3>
            </div>
          </div>
        </div>

        {/* Organism index */}
        <Sub title="Component index" note="Page-level organisms and where they live — one canonical implementation each; extend via props, never fork." />
        <div className="mt-6 divide-y rule-dark border-y rule-dark">
          {ORGANISM_INDEX.map((o) => (
            <div key={o.name} className="grid grid-cols-1 md:grid-cols-12 gap-3 py-6">
              <p className="label text-bone md:col-span-3">{o.name}</p>
              <p className="fineprint md:col-span-3">src/{o.home}</p>
              <p className="fineprint md:col-span-6">{o.note}</p>
            </div>
          ))}
        </div>

        <p className="fineprint mt-20">
          Voice, regulatory rules and drift patterns live in CLAUDE.md. This page is noindexed and
          excluded from the sitemap.
        </p>
      </div>
    </main>
  );
}
