import type { Metadata } from "next";
import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";
import StageGlyph from "@/components/StageGlyph";

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
  { name: "Ink", cls: "bg-ink", hex: "#1C1710", use: "Default page background — warm near-black" },
  { name: "Ink raised", cls: "bg-ink-raised", hex: "#26201A", use: "Raised surfaces / cards on dark" },
  { name: "Ink line", cls: "bg-ink-line", hex: "#484036", use: "Hairline dividers on dark (rule-dark)" },
  { name: "Bone", cls: "bg-bone", hex: "#F2EEE6", use: "Light sections; primary text on ink", lightCard: true },
  { name: "Bone dim", cls: "bg-bone-dim", hex: "#CBC6BB", use: "Secondary text on ink", lightCard: true },
  { name: "Bone line", cls: "bg-bone-line", hex: "#DAD4C8", use: "Hairline dividers on light (rule-light)", lightCard: true },
  { name: "Clay", cls: "bg-clay", hex: "#8A8578", use: "Captions, fine print, meta" },
  { name: "Champagne", cls: "bg-champagne", hex: "#C2A878", use: "THE accent — details & interactions only (ornament glyphs, links, hovers); never label type (2026-07-09)" },
  { name: "Champagne soft", cls: "bg-champagne-soft", hex: "#D8C6A4", use: "Soft gold — hover fills only (a gold band was trialled & reverted 2026-07-10)", lightCard: true },
  { name: "Cream", cls: "scene-cream", hex: "≈#E9E0CF · champagne-soft 35% into bone", use: "The ivory close (.scene-cream) — a warmer stock of the same paper", lightCard: true },
  { name: "Ember", cls: "bg-ember", hex: "#FF7A00", use: "The 10 of 60-30-10 — live dots only, ONE per view" },
];

const TYPE_STYLES: { cls: string; label: string; note: string; sample: React.ReactNode }[] = [
  { cls: "display-mega", label: ".display-mega", note: "52→152px · marquee/billboard lockup", sample: "North & Refine" },
  { cls: "display", label: ".display", note: "42→100px · billboard display (no current page use — the homepage H1 is .display-mega)", sample: "Considered by design" },
  { cls: "heading-xl", label: ".heading-xl", note: "36→79px · THE MOMENTS register: interior-page H1s; homepage statement, service rows, the ContactCTA close", sample: "Brand & web design" },
  {
    cls: "statement",
    label: ".statement",
    note: "28→56px · the QUOTE register: testimonial quotes · <em> inside any display tier = Saol Light Italic accent word — one per statement",
    sample: (
      <>
        A calmer <em>first</em> impression
      </>
    ),
  },
  { cls: "heading-lg", label: ".heading-lg", note: "28→48px · section H2", sample: "What we do" },
  { cls: "heading-md", label: ".heading-md", note: "24→40px · card / sub-heading H3", sample: "Brand identity" },
  { cls: "heading-sm", label: ".heading-sm", note: "20→28px · smallest heading H4", sample: "The approach" },
  { cls: "body-lg", label: ".body-lg", note: "16→19px · lede / intro copy", sample: "We build considered brands and high-performing websites for practices." },
  { cls: "body", label: ".body", note: "14→16px · default UI/body copy", sample: "The studio takes on a limited number of projects at a time." },
  { cls: "body-sm", label: ".body-sm", note: "13→14px · secondary/meta copy (footer links, attributions)", sample: "Brand identity, web design and SEO — one studio, one standard." },
  { cls: "body-reading", label: ".body-reading", note: "17px · long-form reading column", sample: "A cosmetic surgery website carries unusual weight." },
  { cls: "blockquote", label: ".blockquote", note: "DEPRECATED (sans-era) — quotes use .statement; kept for the /mockups archive only", sample: "Design is the silent ambassador of the practice." },
  { cls: "overline", label: ".overline", note: "11px · uppercase Dia kicker — bone by default (tonal); text-clay or text-ink/45 on light sections", sample: "Selected work" },
  { cls: "nav-link text-bone", label: ".nav-link", note: "12px · uppercase nav item", sample: "Services" },
  { cls: "cta-label text-bone", label: ".cta-label", note: "11px · button microtype", sample: "Start a project" },
  { cls: "index-num text-clay", label: ".index-num", note: "18→24px · Dia list numbering", sample: "01 /" },
  { cls: "stat text-bone", label: ".stat", note: "40→72px · Dia stat numbers (Light 300)", sample: "156%" },
  { cls: "label text-clay", label: ".label", note: "13px · captions & meta", sample: "Brand · Web · SEO" },
  { cls: "fineprint", label: ".fineprint", note: "12px · fine print", sample: "© 2026 North & Refine Studio." },
  { cls: "wordmark-giant", label: ".wordmark-giant", note: "20vw (max 384px) · the footer's cropped NORTH — pair with overflow-hidden + translate-y", sample: "NORTH" },
];

const MOTION: { cls: string; note: string }[] = [
  { cls: "animate-fade-in", note: "1.2s ease-out · THE load-in (hero, mobile menu, coming-soon) — a pure fade, in place; pair with opacity-0, stagger with animationDelay" },
  { cls: "animate-fade-in-up", note: "RETIRED from the brand (2026-07-10) · the 16px rise is a screen idiom — ink develops where it sits; print never arrives from somewhere. Survives only in the /mockups archive" },
  { cls: "animate-track-in", note: "1.1s expo-out · overline reveal — fades in while letter-spacing eases open to 0.38em (typographic, not translational — it stays)" },
  { cls: ".reveal", note: "scroll-reveal via the global <Reveal /> observer — a pure 1.1s fade, IN PLACE (the rise retired 2026-07-10); stagger with transitionDelay" },
  { cls: ".sg-stroke / .sg-stroke-2", note: "M·1 draw-on (2026-07-10): StageGlyph strokes draw themselves in on the plate's .reveal entry — 1.1s, the reveal curve; the second form lands +220ms; stagger per plate via --sg-delay. Entrance-only (print stillness holds); fully drawn outside a reveal and under reduced motion" },
  { cls: ".exit-fade", note: "fade-to-ink overlay on an EXITING section — ContactCTA and interior pages only; homepage sections do NOT perform (2026-07-09). JS-driven by the global <ExitFades />; .exit-fade-long = earlier window" },
  { cls: "animate-marquee", note: "PARKED · 28s linear loop · both uses retired (ghost text 2026-07-09; the trust-bar ticker trialled & retired 2026-07-10 — print stillness: nothing moves unbidden)" },
  { cls: "animate-float-slow / -slower", note: "PARKED · 7s / 11s ease loops · was the floating-orb layer; nothing floats on the flat pages" },
];

// Page-level organisms live in real routes — catalogued here, demoed there.
const ORGANISM_INDEX: { name: string; home: string; note: string }[] = [
  { name: "Navbar", home: "components/Navbar.tsx", note: "Tall transparent bar at the top of the page — scrolls away (no fixed pill). One nav — never fork it." },
  { name: "Deck (showreel)", home: "components/Deck.tsx", note: "Fanned auto-cycling card stack; front card links to its case study. PARKED — the homepage is type-led now." },
  { name: "PageHero", home: "components/PageHero.tsx", note: "THE interior-page hero — extend via props (overline, title, lede, cta, meta, size); don't spawn HeroX." },
  { name: "Device cluster", home: "work/[slug]/page.tsx", note: "BrowserMockup + overlapping PhoneMockup — the canonical responsive showcase." },
  { name: "Editorial article grid", home: "work/[slug]/page.tsx", note: "Kicker rail (cols 2–4) · one-sentence statement + copy (cols 7–11) · figures span cols 2–11, or pair 5+5." },
  { name: "Stats band", home: "work/[slug]/page.tsx", note: "Raised full-width panel, .stat numerals with hairline dividers. Renders only when frontmatter metrics exist." },
  { name: "Testimonial band", home: "work/[slug]/page.tsx", note: "Centred client quote at .statement register (moved off the deprecated .blockquote 2026-07-09). Driven by testimonial frontmatter." },
  { name: "Kind words (homepage)", home: "app/page.tsx", note: "ONE testimonial: square portrait slot + .statement quote + ruled attribution. ALL content visibly-marked placeholder until real words/portrait/permission exist." },
  { name: "LogoStrip", home: "components/LogoStrip.tsx", note: "Under-hero trust bar — client logos (Dr Yalda mark repeated as placeholder for now) in a STILL nowrap row (marquee retired 2026-07-10), above the fold, present from first paint." },
  { name: "Process spine", home: "app/page.tsx", note: "How we work: five blocks (glyph beside title + body, no indices) hanging off ONE continuous centre hairline — the page's only vertical rule — each tethered by a short horizontal hairline, sides alternating; glyph opacity ramps 40→100% down the steps (the project coming into focus). Spine moves to the left edge on mobile. Replaced the section's carousel 2026-07-10 — never stack two rails." },
  { name: "StageGlyph", home: "components/StageGlyph.tsx", note: "Process-stage shape icons: pure geometric forms at a non-scaling 1px hairline — the rule system, curved. Working set R5 (lens pair · rings · corner-lock · triangle · trued); M·1 draw-on rides the plate's .reveal. On the homepage spine + /services plates. Brief: docs/briefs/stage-glyphs.md." },
  { name: "Carousel", home: "components/Carousel.tsx", note: "Contact-sheet rail: snap plates, hard clip, folio-line controls (arrows + page counter), never autoplays; folio hides when everything fits. Homepage: blog teasers only (the process rail became the spine 2026-07-10)." },
  { name: "WorkCard", home: "components/WorkCard.tsx", note: "Case-study card for grids; typographic placeholder until a thumbImage exists." },
  { name: "ContactCTA", home: "components/ContactCTA.tsx", note: "The bone close — mirrors the hero (kicker, heading-xl, lede, flagship + ghost); cover and back cover, inverted stock." },
  { name: "ContactForm", home: "components/ContactForm.tsx", note: "Netlify runtime-v5 form; static twin in public/__forms.html — keep fields in sync." },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

function SectionKicker({ num, title, note }: { num: string; title: string; note: string }) {
  return (
    <div className="mt-28 border-t rule-dark pt-10">
      <p className="index-num text-clay">{num} /</p>
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
        <p className="overline">Internal reference</p>
        <h1 className="heading-xl from-overline">Design system</h1>
        <p className="lede body-lg text-bone-dim">
          The visual source of truth, organised atomically: atoms (the raw tokens), molecules
          (small compositions), organisms (full components). Everything here already exists in
          globals.css or a component — if you add a token, add it here in the same change.
        </p>

        {/* ── House rules — the foundational decisions everything else
            hangs off (2026-07-09). ── */}
        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 border-y rule-dark py-10 md:grid-cols-2">
          <div>
            <p className="overline">The ground is flat</p>
            <p className="body mt-4 max-w-[52ch] text-bone-dim">
              One warm off-black and one bone — no background gradients,
              anywhere. The scenes, pools, glows and blobs were retired
              2026-07-09. If a section feels dead, the answer is content or
              type — never a glow.
            </p>
          </div>
          <div>
            <p className="overline">Corners are straight</p>
            <p className="body mt-4 max-w-[52ch] text-bone-dim">
              Saol is a scalpel-sharp Didone; its character is crisp edges and
              hairline strokes. Rounded corners are app logic — friendly,
              soft, SaaS. Straight corners are print logic, and this whole
              system is print logic: hairline rules, tracked kickers,
              editorial captions. Frames behave like plates in a book, not
              cards in an app. Two exceptions, both deliberate: device mockups
              keep their hardware radii, and the pill buttons stay — the
              single soft shape in a sharp system, a wax seal on a printed
              page.
            </p>
          </div>
          <div>
            <p className="overline">Colour is for touching</p>
            <p className="body mt-4 max-w-[52ch] text-bone-dim">
              The type system is tonal — bone, dim, clay. Champagne never sits
              on a label: it lives in details and interactions only (ornament
              glyphs, link underlines, form feedback) and every button&rsquo;s
              hover. Gold at rest is brassy; gold on touch is a reward. The
              close sits on cream — champagne-tinted bone, a warmer stock of
              the same paper — but champagne itself never fills.
            </p>
          </div>
          <div>
            <p className="overline">One ladder</p>
            <p className="body mt-4 max-w-[52ch] text-bone-dim">
              Sizes are picked by register, not taste: the masthead
              (display-mega), the moments (heading-xl — statements, service
              rows, the CTA close), the quote register (statement), the signposts
              (heading-lg — section H2s, client names), the items (heading-md
              and below). A list item never outranks its section&rsquo;s
              statement; a signpost never shouts like a moment.
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="overline">Baselines lock</p>
            <p className="body mt-4 max-w-[52ch] text-bone-dim">
              Side-by-side type aligns on baselines, never box edges — first
              baselines where prose sits beside a display line, last baselines
              where a link meets a heading&rsquo;s bottom line. No eyeballed
              padding nudges. Print rules the page; boxes are invisible.
            </p>
          </div>
        </div>

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
              <div className={`h-20 rounded-none border rule-dark ${c.cls}`} />
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
          note="Saol Display (serif, 400) for ALL headings and the wordmark + Instrument Sans for body/UI (the sheared 'scalpel' terminals) + Geist Mono for engineered accents. One clamp() per class; never inline font sizes."
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
          <div className="rounded-none border rule-dark bg-ink-raised/40 py-3 text-center">
            <p className="label text-bone">.shell-wide <span className="text-clay">· max 1760px · padding clamp(1.5rem, 4vw, 4rem)</span></p>
          </div>
          <div className="mx-auto w-[72%] rounded-none border rule-dark bg-ink-raised py-3 text-center">
            <p className="label text-bone">.shell <span className="text-clay">· max 1400px · padding clamp(1.5rem, 4vw, 4rem)</span></p>
          </div>
          <div className="mx-auto w-[40%] rounded-none border border-champagne/40 py-3 text-center">
            <p className="label text-bone">reading measure <span className="text-clay">· ~60–70ch</span></p>
          </div>
        </div>

        {/* Rules */}
        <Sub title="Rules & hairlines" note="rule-dark / rule-light set border-colour only — always pair with a border-* utility." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-none bg-ink-raised/40 p-6">
            <div className="border-t rule-dark" />
            <p className="fineprint mt-3">.rule-dark on ink · #484036</p>
          </div>
          <div className="rounded-none bg-bone p-6">
            <div className="border-t rule-light" />
            <p className="fineprint mt-3 text-clay">.rule-light on bone · #DAD4C8</p>
          </div>
        </div>

        {/* Surfaces */}
        <Sub title="Surfaces & scenes" note="Backdrops and media wrappers. .grain needs relative + overflow-hidden on the parent and z-10 on content above it." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="scene-warm rounded-none p-8 text-ink">
            <p className="label">.scene-warm</p>
            <p className="fineprint">Flat bone light scene (gradients retired 2026-07-09)</p>
          </div>
          <div className="scene-cream rounded-none p-8 text-ink">
            <p className="label">.scene-cream</p>
            <p className="fineprint text-ink/70">The ivory close — champagne-soft 35% into bone (2026-07-10)</p>
          </div>
          <div className="scene-ink rounded-none p-8 border rule-dark">
            <p className="label text-bone">.scene-ink</p>
            <p className="fineprint">Flat ink dark scene (gradients retired 2026-07-09)</p>
          </div>
          <div className="relative overflow-hidden grain scene-ink rounded-none p-8 border rule-dark">
            <p className="label text-bone relative z-10">.grain</p>
            <p className="fineprint relative z-10">Film-grain overlay for dark heroes</p>
          </div>
          <div className="frame rounded-none p-8">
            <p className="label text-bone relative">.frame</p>
            <p className="fineprint relative">Media wrapper — relative, overflow-hidden, ink-raised</p>
          </div>
          <div className="portrait-fill rounded-none p-8 text-ink">
            <p className="label">.portrait-fill</p>
            <p className="fineprint text-ink/70">Flat parchment — client-imagery stand-in (quiet paper, not content)</p>
          </div>
          <div className="scene-ink rounded-none p-4">
            <div className="card-glass p-8">
              <p className="label text-bone">.card-glass</p>
              <p className="fineprint">Glassy card on dark surfaces</p>
            </div>
          </div>
        </div>
        <div className="mt-8 overflow-hidden">
          <p className="display text-ghost-on-dark whitespace-nowrap">.text-ghost-on-dark</p>
        </div>

        {/* Stage glyphs — the weight test, made permanent (2026-07-10):
            all five at 48px on both grounds, sitting on a hairline. The
            pass condition: stroke and rule indistinguishable in weight. */}
        <Sub
          title="Stage glyphs"
          note="Working set R5: lens pair · rings · corner-lock · triangle · trued — the row reads focus → narrow → compose → stand → true. Strokes draw in on .reveal entry (M·1); fully drawn outside one. Brief: docs/briefs/stage-glyphs.md."
        />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="scene-ink border rule-dark p-8">
            <div className="flex items-center justify-between border-t rule-dark pt-6 text-champagne">
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <StageGlyph key={n} stage={n} className="h-12 w-12" />
              ))}
            </div>
            <p className="fineprint mt-4">On ink — text-champagne (the sanctioned ornament-glyph use)</p>
          </div>
          <div className="scene-warm p-8 text-ink">
            <div className="flex items-center justify-between border-t rule-light pt-6 text-ink/70">
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <StageGlyph key={n} stage={n} className="h-12 w-12" />
              ))}
            </div>
            <p className="fineprint mt-4 text-ink/70">On bone — text-ink/70</p>
          </div>
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
          <p className="overline opacity-0 animate-track-in">Track-in overline</p>
        </div>

        {/* ════════════════════ 02 · MOLECULES ════════════════════ */}
        <SectionKicker
          num="02"
          title="Molecules"
          note="Small, reusable compositions of atoms — heading groups, buttons, prose furniture, data pairs."
        />

        {/* Heading group */}
        <Sub title="Heading group" note="Overline and heading as direct siblings; .from-overline scales the gap with the heading; .lede on the subtitle. Never set these gaps with ad-hoc mt-*." />
        <div className="mt-6 rounded-none border rule-dark p-8">
          <p className="overline">Kicker</p>
          <h3 className="heading-lg from-overline">A heading that follows it</h3>
          <p className="lede body-lg text-bone-dim">And the lede beneath, spaced by .lede — one system, three classes.</p>
        </div>

        {/* Buttons */}
        <Sub title="Buttons" note="FOUR TIERS: flagship (btn-arrow, one per view) · primary pill · secondary outline (champagne-rim hover, never fills) · ghost (tertiary workhorse — gap opens, arrow goes champagne). Gold is the hover, never the resting state. light/dark is the background the button sits on. Padding sits on the 8px grid (16/32 · sm 16/24). One primary per view; → is optional child markup. The .live-dot ember signal marks availability — ONE per view." />
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary-dark btn-arrow">Flagship CTA <span className="btn-arrow-chip" aria-hidden>↗</span></button>
            <button className="btn btn-primary-dark">Primary dark <span aria-hidden>→</span></button>
            <button className="btn btn-secondary-dark">Secondary dark</button>
            <button className="btn btn-secondary-dark"><span className="live-dot" aria-hidden /> Live-dot CTA</button>
            <button className="btn btn-secondary-dark btn-sm">Secondary sm</button>
            <span className="btn-ghost text-bone">Ghost link <span aria-hidden>→</span></span>
          </div>
          <div className="bg-bone rounded-none p-8 flex flex-wrap gap-4">
            <button className="btn btn-primary-light">Primary light</button>
            <button className="btn btn-secondary-light">Secondary light</button>
            <span className="btn-ghost text-ink">Ghost link <span aria-hidden>→</span></span>
          </div>
        </div>

        {/* Prose furniture */}
        <Sub title="Prose furniture" note="Long-form elements from mdx-components.tsx (Journal + Work bodies). The ✦ bullet is the sector-strip motif hung in the margin." />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-none border rule-dark p-8">
            <ul className="body-reading list-none space-y-3 text-bone/90 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.5em] [&>li]:before:text-[10px] [&>li]:before:leading-none [&>li]:before:text-champagne [&>li]:before:content-['✦']">
              <li>Unordered lists hang the champagne ✦</li>
              <li>With generous space between items</li>
              <li>Canonical classes live in mdx-components.tsx</li>
            </ul>
          </div>
          <div className="rounded-none border rule-dark p-8">
            <blockquote className="blockquote text-bone">
              Pull-quotes use .blockquote, set in the bone.
            </blockquote>
            <p className="label mt-6 text-clay">Figure captions use .label in clay — opt-in via the image title in MDX.</p>
          </div>
        </div>

        {/* Statement pattern */}
        <Sub title="Kicker + statement (case-study prose)" note="Inside .prose-work, an h2 renders as the kicker and the paragraph directly after it takes statement scale automatically — one sentence max." />
        <div className="prose-work mt-6 rounded-none border rule-dark p-8">
          <h2 className="overline">The brief</h2>
          {/* !mt: the statement rule's lg margin exists to row-align with the
              case-study grid — irrelevant in this flat demo box */}
          <p className="lg:!mt-4">One strong sentence carries the section.</p>
          <p className="body-reading mt-4 text-bone/90">The evidence follows at reading size, exactly like this.</p>
        </div>

        {/* Data pairs */}
        <Sub title="Data & meta" note="Stat pairs for outcomes; overline/body pairs for project meta; index numbering for itemised lists." />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 rounded-none border rule-dark p-8">
          <div>
            <p className="stat text-bone">#1–3</p>
            <p className="label text-bone-dim mt-3">Google positions, target keywords</p>
          </div>
          <div>
            <p className="overline text-clay">Client</p>
            <p className="body text-bone mt-1.5">Dr Jane Smith</p>
          </div>
          <div>
            <p className="index-num text-clay">02 /</p>
            <h3 className="heading-md mt-4">Web design &amp; build</h3>
          </div>
        </div>

        {/* Form field */}
        <Sub title="Form field" note="The underline input — canonical classes live in ContactForm.tsx. Bone text, clay placeholder, champagne focus border." />
        <div className="mt-6 rounded-none border rule-dark p-8 max-w-md">
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
        <div className="scene-ink rounded-none border rule-dark p-8 md:p-12 mt-6">
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
            <p className="index-num text-clay">01 /</p>
            <h3 className="heading-md mt-4">Brand identity</h3>
            <p className="body mt-3 text-bone-dim">A considered visual language that signals the standard of care.</p>
          </div>
          <div className="bg-bone rounded-none p-5">
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
