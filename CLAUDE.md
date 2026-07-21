# CLAUDE.md

Instructions for Claude when working in this repository. Read this **before** writing or editing code.

## Project

**North & Refine** — the marketing site for a design studio whose clients are medical aesthetic and cosmetic surgery practices. This is the studio's own shop window, so it has to look like the work we'd sell to a cosmetic surgeon. It is **SEO- and schema-led** by design.

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind 3 + a custom design-token system in `src/app/globals.css`
- **Content:** MDX collections read from `content/` at build time (no CMS) via `gray-matter` + `next-mdx-remote/rsc`
- **Hosting:** Netlify (`@netlify/plugin-nextjs`)
- **Fonts:** A TWO-FONT HOUSE (decided 2026-07-09) — **Saol Display** (`--font-display`, serif, `src/fonts/*.woff2/.woff`, licensed) carries EVERY heading tier (`.display-mega`→`.heading-sm`, h1–h6 defaults), the wordmark/monogram and `.wordmark-giant`; Regular 400 + Light Italic 300 only, so heading hierarchy comes from SIZE alone — never `font-medium` on display/heading text. The italic is the ACCENT-WORD device (from the studio's social voice — "The studio is *open*."): an `<em>` inside any display-tier utility renders Saol Light Italic via a globals.css rule; one word or short phrase per statement, sparingly. **Dia** (Schick Toikka, `--font-sans`) carries EVERYTHING else — body, UI, and the meta voice (`.overline`, `.index-num`, `.stat`) that Geist Mono used to carry; **the mono is retired from the brand** (it was the engineered accent of the old tech direction; `font-mono` survives only as system-mono fallback in device-chrome depictions). ⚠ **Dia is a TRIAL licence** — the OTFs are gitignored and MUST NOT ship: keep the `layout.tsx` font block uncommitted, hold it back from deploys (the manual Netlify flow stashes it), and production ships the committed Instrument Sans build until Dia is bought. Aeonik Pro trial evaluated and parked. Buy more Saol weights before leaning on bold headings.
- **Source of truth for the brand:** `src/app/globals.css` — all design tokens live there; rendered live at `/stylesheet`
- **Direction:** dark / premium agency. Deep neutral black (`ink`), bone off-white, one restrained champagne accent — plus a bright `ember` signal at 60-30-10 doses (live dots only).

## How to use this file

Before writing markup or styles, scan **Design tokens** and **Components**. If a token, utility class, or component already exists for what you're building, use it — don't write parallel implementations. If nothing fits and you're about to introduce a new token, **ask first**. The cost of asking is one round-trip; the cost of drift is months.

## Design tokens

All in `globals.css`, mirrored at `/stylesheet` (the visual canon — keep them in sync in the same change).

### Colour (Tailwind classes preferred; CSS vars only inside `globals.css`)

| Class | Hex | Use |
| --- | --- | --- |
| `bg-ink` / `text-ink` | `#0C0C0D` | Default page background — the DEEP NEUTRAL black (SETTLED 2026-07-10 night: the warm `#1C1710` era ran 2026-07-09→10, then the client trialled the old deep black side-by-side and kept it; ink-raised `#161618`, ink-line `#3A3A3E` moved with it). The warm cast now lives in the LIGHT surfaces, the accents and the PLATES — the Rowen plates keep their warm grade and read as lit warmth on the neutral ground. |
| `bg-ink-raised` | `#161618` | Raised surfaces / cards on dark |
| `rule-dark` (border) | `#3A3A3E` | Hairline dividers on dark |
| `bg-bone` / `text-bone` | `#F2EEE6` | Light sections; primary text on ink |
| `text-bone-dim` | `#C1B9B0` | Secondary text on ink (deepened from `#CBC6BB` 2026-07-10 — spaces the on-ink ladder into three clean tiers: bone ~17:1 / dim ~10:1 / clay ~5:1) |
| `rule-light` (border) | `#DAD4C8` | Hairline dividers on light |
| `text-clay` | `#8A8578` | Captions, fine print, meta — the third tier of the on-**INK** ladder. It is **sub-AA on bone** (~3.6:1): on LIGHT grounds use the ink ladder below, not clay. (The one sanctioned clay-on-light survivor is the `.overline` KICKER — tracked-caps brand ornament, not read as running meta; see the overline note.) |
| `text-ink-dim` | `#51504E` | **On-LIGHT ladder** (2026-07-13) — secondary text on bone: body & lede (~6.9:1 AA). The bone-ground mirror of `bone-dim`. |
| `text-ink-mute` | `#686664` | On-LIGHT ladder — meta/label on bone: dates, reading time, AA-required kickers (~5.0:1 AA). The bone-ground mirror of `clay`-on-ink. |
| `text-ink-faint` | `#ADAAA5` | On-LIGHT ladder — **DECORATIVE ONLY**: middots, placeholder glyphs (sub-AA; never body/label text). |
| `text-champagne` / `bg-champagne` | `#C2A878` | The one accent — details & interactions ONLY (ornament glyphs, link underlines, hovers, form feedback); never label type (2026-07-09) |
| `bg-champagne-soft` | `#D8C6A4` | Soft gold — hover fills only (a full scene-gold band was trialled and reverted 2026-07-10: too gold; champagne never fills) |
| `bg-ember` | `#FF7A00` | The 10 of 60-30-10 — the `.live-dot` availability signal ONLY, one per view; never text, never fills |

Note `rule-dark` / `rule-light` set `border-color` only — pair with Tailwind `border` / `border-t` / `border-y` etc.

### Typography utilities (use these, never raw `clamp()`/inline `fontFamily`)

Fluid modular scale, one `clamp()` per class. Body is fluid 14→16px (mobile→desktop); `.body-sm` (13→14) is the secondary/meta tier.

`.display-mega` · `.display` · `.heading-xl` · `.heading-part` · `.statement` · `.heading-lg` · `.heading-md` · `.heading-sm` · `.body-xl` (16→21px, THE LARGE LEDE — the centred manifesto hero + the ContactCTA close subtitle; one step above `.body-lg` (which stays the left/split hero lede), added 2026-07-13 to retire the ad-hoc `md:text-[21px]`) · `.body-lg` (lede) · `.body` · `.body-sm` (secondary/meta) · `.card-title` (sans card captions) · `.industry-band-title` (vw-sized band names) · `.body-reading` (long-form prose) · `.blockquote` (DEPRECATED) · `.overline` (kicker) · `.label` · `.fineprint` · `.stat` · `.index-num` · `.nav-link` · `.cta-label` · `.wordmark-giant` (the footer's cropped NORTH)

- **THE LADDER (decided 2026-07-09)** — pick sizes by REGISTER, not taste: `.display-mega` = the ODOMETER numeral (the /services scroll-index window; its old homepage-masthead use RETIRED 2026-07-16 — the three-section hero's H1 sits in a 5-col column, so it takes `.display` like every masthead) → `.display` = the MASTHEADS + the LEDGER ROWS (2026-07-16, hero-cohesion pass: every H1 sitewide — the homepage's three-section hero and every interior split hero — plus the What-we-do service titles, their first live use 2026-07-11) → `.heading-xl` = the MOMENTS (DETAIL-page H1s — /work/[slug], /blog/[slug] article headers; on the homepage: the studio statement, the ContactCTA close) → `.heading-part` = the PART TITLES (32→62px, rung added 2026-07-10: the homepage COLLECTION HEADS — "Practices we've refined", "Notes from the studio" — were too small at lg, tied to the work-card names below them, and too big at xl; part titles introduce a collection, one register below a moment) → `.statement` = the QUOTE register (testimonial quotes) → `.heading-lg` = the SIGNPOSTS (interior-page section H2s) → `.heading-md`/`.heading-sm` = items (cards, steps) → `.card-title` = THE CARD CAPTIONS (2026-07-11: work-card client names + blog teaser titles share one 17→22px SANS register — card titles are captions to their images, not headings, so they left the Saol ladder for the Dia meta voice; no `<em>` accent in sans). A list item must never outrank OR TIE its section's head; a signpost must never shout like a moment.
- `.blockquote` is DEPRECATED (2026-07-09) — a sans-era relic; quotes use `.statement` (Saol). It survives in globals only for the /mockups archive.
- **BASELINES LOCK (decided 2026-07-10)** — side-by-side type aligns on baselines, never box edges, and never with eyeballed `pt-*` nudges. Wherever a TITLE sits left and a LINK sits right, the link locks to the HEADING'S baseline — via FIRST baseline (`items-baseline`) when the heading leads its block (industries index rows, FAQ summaries, prose-beside-statement pairs, CTA kicker+statement, CTA pair labels, folio arrows+counter) or LAST baseline (`[align-items:last_baseline]`, declared after an `items-end` fallback for old browsers) when the heading closes its block or the link should sit on its bottom line (section header rows with kicker+H2, the service rows, Kind words' image-bottom-on-attribution). Print rules the page; boxes are invisible.
- `.overline` is BONE BY DEFAULT (2026-07-09, reversing the old champagne rule — the type system is TONAL; gold at 11px tracked caps reads brassy). On light sections override with `text-ink-mute` (the AA on-light meta tint) — or `text-clay` where the warm brand tint is wanted on the KICKER specifically (the tracked-caps ornament exception noted in the colour table; clay is sub-AA so never use it for on-light meta that must be read: dates, labels, body → `text-ink-mute`/`text-ink-dim`). It also collides with Tailwind's `overline` text-decoration utility — an **unlayered override at the end of globals.css** disables the decoration. Don't remove it or move it into a @layer.
- **Heading-group spacing:** put the overline and heading as direct siblings and add `.from-overline` to the heading (margin scales with the heading). Use `.lede` on the subtitle. **Never** set these gaps ad-hoc with `mt-*`/`mb-*`.
- h1–h6 default to Saol at 400, tight tracking (they have since 2026-07-05 — an older "sans at medium" note here was wrong). Don't override per-element without reason.

### Buttons — a FOUR-TIER hierarchy (2026-07-09). Always compose; never hand-roll a pill CTA.

`light`/`dark` = the **background the button sits on**, not the button's colour. **Gold is the hover**: every tier's hover state is where champagne lives (per the interactions-only colour rule) — never its resting state.

1. **Flagship** — `.btn` + primary variant + `.btn-arrow` (label left, circular ↗ chip: `<span class="btn-arrow-chip" aria-hidden>↗</span>`). ONE per view. The homepage hero owns it ("Start a project"); the ContactCTA band has the foot view's. The nav carries a `.btn-sm` secondary INSTEAD — never a second flagship in the first viewport. Hover: pill → champagne-soft, chip → champagne, arrow leans NE.
2. **Primary pill** — `.btn-primary-dark` (solid bone) / `.btn-primary-light` (solid ink). Hover → champagne-soft fill.
3. **Secondary outline** — `.btn-secondary-dark` / `.btn-secondary-light`. Hover → **champagne rim** + faint champagne wash. It must NEVER fill solid on hover (that made it impersonate the primary — fixed 2026-07-09).
4. **Ghost** — `.btn-ghost` + explicit text colour, arrow as `<span aria-hidden>→</span>`. The tertiary workhorse: every section's onward link ("All work →", "Our story →", "Read more →"). Hover: gap opens, arrow turns champagne. Never dim the whole link on hover — fading reads as disabled.

- `.btn-sm` size modifier. Padding sits on the **8px grid** — chunky by design: 16/32 (`.btn-sm` 16/24). Keep it there.
- `.live-dot` — the pulsing ember availability signal (PARKED: currently unused — it was the nav availability badge, removed 2026-07-04; the utility + swatch remain in the system).

### Layout helpers

- `.shell` — standard max-width **1520px** container with responsive padding (widened 1280 → 1400 → 1520 across 2026-07-04→10; on a MacBook Air it fills the screen minus padding — don't re-narrow below 1400 without the client asking). The **content grid** — use on all body sections so copy keeps a comfortable measure. The **NAV also sits on it** now (2026-07-13, client's call): its content shares this one rail with every page's content, so the logo/links/CTA align with the hero, sections and footer (the nav's bg + full-bleed border stay on a wider full-width wrapper). The homepage HERO also sits on it (one left rail with everything below — a shell-wide hero was trialled and read as two pages sharing a scroll). |
- `.shell-wide` — open, near-full-width container (max 1760px, lighter padding). **Heroes only**, with one sanctioned exception: the work/[slug] article uses it as the IMAGE canvas — figures span it (full or 5+5 pairs) while kickers/copy stay grid-indented to a reading measure. Everything else sits on `.shell` so content shares one max width. (A full edge-to-edge homepage was built and rolled back 2026-07-09 — the deck layout won; don't reintroduce without asking.)
- `.grain` — film-grain overlay for dark hero sections (needs `position: relative` + `overflow-hidden` on the parent, and `z-10` on content above it).
- `.frame` — media wrapper (relative, overflow-hidden, ink-raised background).
- `animate-float-slow` / `animate-float-slower` — floaty hero elements (orbs, glass chips); stagger with inline `animationDelay`. **ENTRANCES FADE IN PLACE (2026-07-10):** load-ins use `opacity-0 animate-fade-in` + delays; scroll sections use `.reveal` (now a pure 1.1s fade). The 16px rise (`animate-fade-in-up`, the old `.reveal` translate) is RETIRED from the brand — sliding in is a screen idiom, ink develops where it sits; `fade-in-up` survives only in the /mockups archive. A global reduced-motion guard at the end of globals.css snaps all animations to their end state.
- `.reveal` — scroll-reveal entry. Add the class; stagger with inline `style={{ transitionDelay: "120ms" }}`. The global `<Reveal />` (in the root layout) observes them. Respects reduced-motion.

### Surfaces & frames (tech-luxury direction)

- `.scene-warm` — FLAT bone light scene (the champagne-lit gradient was retired 2026-07-09; the class stays for section semantics).
- `.scene-cream` — the IVORY CLOSE (ContactCTA only, 2026-07-10): champagne-soft mixed 35% into bone (≈#E9E0CF) — a warmer stock of the same paper, softening the ink→bone cut. Text on it: full ink headings, `text-ink-dim` lede + `text-ink-dim` kicker (the on-light ladder; clay is sub-AA on light grounds). A full champagne-soft band was trialled and reverted the same day — too gold.
- `.scene-ink` — FLAT ink dark scene (the champagne glow was retired 2026-07-09).
- `.card-soft` — elevated card on light surfaces (straight corners, layered shadow).
- `.card-glass` — glassy blurred card on dark surfaces (straight corners).
- `.portrait-fill` — flat parchment client-imagery stand-in (flattened from a gradient 2026-07-09 — placeholders read as quiet paper, not content).
- `.text-ghost-on-dark` / `.text-ghost-on-light` — outlined display text. PARKED (folio-numeral and marquee uses both trialled and superseded; the process plates carry StageGlyph marks now).

### Imagery ratios (decided 2026-07-10) — two ratios, no freelancing

- **Landscape is 16:10** (`aspect-[16/10]`) — screens and editorial figures: case-study captures and frames, work cards, blog featured images. Desktop captures are **SHOT AT 1440×900** (a real laptop viewport, exactly 16:10) so the plate fits the work uncropped — never crop a capture to fit a frame; fix the capture.
- **Portrait is 4:5** (`aspect-[4/5]`) — every human on the site (the 8×10 studio-portrait standard) AND Instagram tiles: IG posts are always shot 4:5 portrait and the site NEVER crops them — one ratio means one shoot serves feed and site.
- Blog imagery is FIGURES, not fashion plates — landscape 16:10, never tall (tall belongs to people; a person inside an article may run 4:5 under the people rule, but teaser/featured slots stay landscape).
- Exceptions that stay exceptions: device-mockup bezels (hardware), the OG card at 1200×630 (platform chrome), and logos/wordmarks (marks, not imagery). **Square is retired from content imagery.**

## Components (canonical — reuse/extend these)

| Component | Purpose |
| --- | --- |
| `Navbar` / `Footer` | Site chrome (in `layout.tsx`). One each — don't fork. The nav is a tall bar IN NORMAL FLOW at the top of the page (REFACTORED from absolute 2026-07-12): it takes its own height (h-24/h-32) so **heroes no longer pad their tops to clear a floating bar — hero padding is pure, SYMMETRIC top/bottom air, set freely per page; no nav-height math anywhere**. It still scrolls away (it's simply the first box on the page, not fixed). It carries a TONE-AWARE BACKGROUND (`bg-ink` on dark pages, `bg-bone` on light-top pages via `LIGHT_TOP_ROUTES`) so it owns its backdrop and reads continuous with the hero, plus a full-bleed `border-b` hairline. The footer's back-to-top anchor covers the return trip. `data-nav-light` markers remain on bone sections but are currently unused. |
| `Reveal` | Global IntersectionObserver for `.reveal`. Don't add rival scroll listeners. |
| `SmoothScroll` | Lenis inertial scrolling, mounted once in the root layout. Native scroll stays authoritative (sticky/IO/scroll listeners all work); skips under reduced-motion. Don't add rival smooth-scroll libs or scroll hijacking. |
| `ExitFades` | Drives `.exit-fade` overlays (sections fading to ink as they exit) from one rAF-throttled scroll listener — JS, not CSS scroll-timeline, so it works in Safari too. Overlay's parent = measured scope; `.exit-fade-long` = earlier window for dark content sections. |
| `PageHero` | **The interior-page hero — THE SPLIT IS CANON (2026-07-16 hero-cohesion pass).** Every top-level interior page opens with the same recipe: `align="split" spacious borderBottom` — display heading left (cols 1–7), lede right (cols 9–12) on the heading's last baseline. Props: `overline`, `title`, `lede`, `cta` (COMMERCIAL PAGES ONLY — /services, /pricing, industries; /work, /blog, /about stay button-free), `meta`; `media` (THE GRAPHIC SLOT, 2026-07-16: a node on cols 8–12, text stack incl. lede moves to cols 1–6 — for the client's brand graphics, which run at their NATIVE ratio: artwork, not photography, so the 16:10/4:5 canon doesn't govern them; pages whose imagery arrives directly below the hero stay text-only on purpose); `align` (`"split"` canon · `"left"`/`"center"` legacy, no live consumers); `tone` (light requires `LIGHT_TOP_ROUTES` registration — no live consumers since /blog went back to ink); `spacious`; `borderBottom` (the hairline at the hero's foot, content-width); `grain` (default true; false where the hero sits on another flat-ink section, e.g. /work). The experimental `glow` and the old `aside` were REMOVED in the same pass. Extend via these props; don't spawn `HeroX`. Detail pages (/work/[slug], /blog/[slug]) are ARTICLE HEADERS, not mastheads — bespoke openers on the same load-in entrance. (Homepage has the bespoke three-section hero.) |
| `ContactCTA` | Standard "start a project" band (light section) — THE CLOSE MIRRORS THE HERO: kicker, heading-xl, lede, flagship + ghost, left on the rail (2026-07-10) + THE CLOSE PLATE (same day): Rowen 8 landscape 16:10 on cols 9–12, bottom-locked to the CTA row (`items-end`), STATIC — never overlapping; the close is the back cover, it resolves, it doesn't perform. Pairs with the hero's Rowen 5 portrait: one shoot bookending the page. Mobile: in flow after the buttons, 3/5 right-anchored. Drop at the foot of pages. |
| `NewsletterSignup` | Mailing-list capture (Netlify form `newsletter`; static definition in `public/__forms.html` — keep field names in sync). PARKED — the freebie band left the homepage 2026-07-04; destined for its own landing page. |
| `WorkCard` | Case-study card for grids (typographic placeholder when no image). |
| `LogoStrip` | The trust bar (under-hero 2026-07-10 → under the Kind words testimonial 2026-07-11) — a STILL nowrap row of client logos, spread on md+, reader-scrollable on mobile. Never wraps, never auto-moves (marquee trialled & retired 2026-07-10). LOGOS ARE ALWAYS MONOCHROME BONE (2026-07-10 — colour marks puncture the ink; flatten every fill to #F2EEE6 before a file enters the pool) with per-mark heights tuned to equal optical width; marks match their practice by name (images aria-hidden, links carry practice names), and practices without a file cycle the pool until more arrive. |
| `ServicesShowcase` | The "What we do" ruled rows — .display title (its first live use, 2026-07-11; the (0n) indices dropped the same day), ghost "Read more"; whole row links to /services. The homepage's formal stabiliser between asymmetric sections. |
| `JsonLd` | Renders one or many schema objects from `@/lib/schema`. |
| `StageGlyph` | Abstract geometric marks for the process stages — pure forms (circle/line/square/triangle) at a NON-SCALING 1px hairline, so the icon carries the same line as the rules. Working set R5 (2026-07-10): lens pair · rings · corner-lock · triangle · trued. MOTION M·1: strokes DRAW THEMSELVES IN on the plate's `.reveal` entry (`.sg-stroke` utilities in globals.css; stagger via `--sg-delay` on the reveal element; entrance-only, so print stillness holds; fully drawn outside a reveal + under reduced motion). currentColor: `text-champagne` on ink (the ornament-glyph use), `text-ink/70` on light. Props: `stage` (1–5 literal), `className`. Lives on the homepage spine + the /services process plates. Full rules: `docs/briefs/stage-glyphs.md`. NEVER an imported icon set. |
| `Carousel` | The contact-sheet rail (2026-07-10): native scroll-snap plates, hard-clipped at the shell edge, with a FOLIO line for controls (hairline · arrow buttons, champagne on hover · page counter). NEVER autoplays — the reader turns the pages; the folio hides itself when everything fits. Homepage: blog teasers (all sizes) + Selected work's MOBILE rail (2026-07-11 — desktop keeps the pair grid). Never stack two rails in the same viewport (the 2026-07-10 double-carousel lesson). |
| `PhoneMockup` | iPhone frame holding a real `screenshot` (preferred) or a CSS clinic micro-site. Props: `name`, `specialty`, `screenshot`, `screenshotAlt`, `screen` (editorial/ink), `size` (sm/md/lg). |
| `BrowserMockup` | macOS browser-window frame holding a real desktop `screenshot` or a CSS editorial desktop site. Props: `name`, `specialty`, `domain`, `screenshot`, `screenshotAlt`. The wide companion to `PhoneMockup`. |
| `Deck` | PARKED showreel (was the homepage hero until 2026-07-09). A fanned, auto-cycling stack of "desktop screen" cards (the OmenFlex shape). Prop: `slides` (`DeckSlide[]` — `title`, `tag`, optional `href`/`screenshot`/`screenshotAlt`). Pauses on hover, respects reduced-motion. With `href`, the FRONT card is a link (hover reveals a "View case study" pill); other cards click forward. The homepage feeds it one card per sector — each card shows a real case-study capture and links to the study that owns it (the sector's own where it has a `thumbImage`, else the newest featured study with one). Born in `/mockups/showreel`. |

### Design direction: flat editorial ink (decided 2026-07-09; supersedes Obsidian)

The taste reference is the studio's own Instagram voice: flat ink or bone, huge Saol, one italic accent word per statement, a quiet tracked kicker, a hairline, air. The foundational rules that follow from it:

**The ground is flat.** One deep neutral black (`--ink #0C0C0D`) and one bone, nothing else — every background gradient was retired 2026-07-09 (`.scene-ink`/`.scene-warm` are now flat paints; the ambient champagne pools, the cluster glow and the glass-card blobs are gone). If a section feels dead, the answer is content or type — never a glow.

**Corners are straight.** Saol is a high-contrast, scalpel-sharp Didone; its character is crisp edges and hairline strokes. Rounded corners are app logic — friendly, soft, SaaS. Straight corners are print logic, and everything else in this system is already print logic: hairline rules, mono kickers, editorial captions. Square frames behave like plates in a book, not cards in an app. Three deliberate exceptions: **device mockups keep their hardware radii** (a squared phone bezel or macOS window reads as an error, not a style), **the pill buttons stay** — a wax seal on a printed page — and **avatar chips are circles** (2026-07-10: a face in a circle reads as a person; a face in a square reads as a thumbnail). Nothing else curves.

### Homepage: the three-section hero (settled 2026-07-16)

THE HERO DIRECTION IS SETTLED (2026-07-16, hero-cohesion pass — the client chose "something new" over both the live-era top and the flat-editorial top): the homepage opens with the **THREE-SECTION HERO** (from `/mockups/hero-three`, the ThinkWise ref, adapted to canon). LEFT: the print masthead — kicker, `.display` H1 "Practices that patients *trust*." (sentence case, the italic accent device), lede, the FLAGSHIP arrow CTA + a secondary "See the work" (the nav stepped down to a `.btn-sm` secondary the same day), and a ⚠ placeholder trust row. RIGHT: three composed sections — the work as a `BrowserMockup` carrying a REAL featured capture, a `.card-glass` craft card with the ONE dosed in-family champagne gradient (a deliberate, scoped exception to the flat-ground rule — it lives inside a card, not on the ground; do not let it spread), and a ⚠ placeholder proof stat. The whole hero rides the fade-in-place LOAD-IN. RETIRED WITH THE OLD TOP: the crown glow, the Deck showreel (back in the parked drawer), `animate-track-in`, and the hero's `animate-fade-in-up` risers. STILL LIVE-ERA (untouched, next reconciliation candidates): the scroll-scrubbed MANIFESTO on its 140vh sticky track, and the EXIT FADES on every homepage section. The 2026-07-09→11 flat-editorial top stays STASHED at commit `37f0db9`; the live-era top survives frozen at `/mockups/old-hero`. Page order (2026-07-11): hero → manifesto → Selected work → What we do (`.display` ledger rows) → Kind words (+ trust bar) → Blog (Carousel) → ContactCTA. Everything below the manifesto follows the current canon (ratio rules, card-titles, part titles, plates, slow image tempo, baseline locks).

The **asymmetric device cluster** (`BrowserMockup` anchored + `PhoneMockup` overlapping its corner) remains the canonical "responsive showcase" pattern for work/case-study heroes. `/mockups` retains explorations for reference only (noindexed, robots-disallowed). Light-topped pages, if ever added, must be listed in `LIGHT_TOP_ROUTES` in `Navbar.tsx` or the unscrolled nav is bone-on-bone (invisible).

## Content & SEO architecture

This is the core of the site — treat schema and metadata as first-class.

- **Site facts:** `src/lib/site.ts` (`SITE`, `NAV`, `absoluteUrl`). Change brand facts here, never inline. **Set the real domain in `SITE.url` before launch.**
- **Schema builders:** `src/lib/schema.ts` → `organizationSchema`, `websiteSchema`, `breadcrumbSchema`, `articleSchema`, `caseStudySchema`, `serviceSchema`, `faqSchema`. Emit via `<JsonLd data={...} />`. Org + WebSite go once site-wide (root layout); every page adds its own breadcrumb; detail pages add Article/CreativeWork; Services/Pricing/Industries add Service + FAQ.
- **Metadata:** root `layout.tsx` sets defaults + title template + OG/Twitter. **Every page must export its own `metadata`** with a real `description` and `alternates.canonical`. Empty descriptions are a bug on this site.
- **Sitemap / robots:** `src/app/sitemap.ts` + `src/app/robots.ts`, driven by the content collections + `INDUSTRIES`. `/stylesheet` is intentionally excluded and noindexed.

### Collections

Generic factory in `src/lib/content.ts` (`createCollection`), with two instances:

- **Journal** (`src/lib/journal.ts`, `content/journal/*.mdx`) — the SEO blog. Categories enforced. Route: `/journal` + `/journal/[slug]`.
- **Work** (`src/lib/work.ts`, `content/work/*.mdx`) — case studies, with client/sector/services/metrics. Route: `/work` + `/work/[slug]`.

Both validate frontmatter at build time — a malformed entry **fails the build** with a precise message. Files starting with `_` (e.g. `_template.mdx`) never publish. Authoring: `cp _template.mdx my-entry.mdx` and edit.

- **Industries** (`src/lib/industries.ts`) — data-driven (not MDX) SEO landing pages targeting queries like "cosmetic surgery web design". Add an entry → a route renders automatically. Route: `/industries` + `/industries/[slug]`.

MDX element styling lives in `mdx-components.tsx` at the repo root (`proseMdxComponents`), passed to `compileMDX` in the `[slug]` pages.

## Voice and copy

- **Restrained, editorial, considered.** No exclamation marks, no superlatives, no "transform your life" language. Taste signals competence in this market.
- **Titles never trade on comparison or disparagement (2026-07-16, sitewide).** The claim is always the studio's or the work's OWN focus — never an implied dig at other practices or other studios ("practices that take care seriously" implies others don't; both /about and /work have been rewritten off this pattern). H1s are SENTENCE CASE.
- **Dashes are swept from drafted copy.** Prefer colons, semicolons, commas and full stops; restructure the sentence rather than punctuating around it (the client's standing rule — see also docs/briefs/about-page.md).
- **Australian English** ("personalised", "specialise", "recognised").
- **Regulatory caution.** Our clients work in regulated cosmetic medicine. In copy, don't name prescription (Schedule 4) substances or brand-name treatments — use generic terms ("injectables", "anti-wrinkle treatments"). Don't write claims a practice couldn't stand behind.
- The studio speaks as "we".

## Drift patterns to avoid

1. New `HeroX` instead of extending `PageHero` via props.
2. Bare `grid-cols-12` without `md:` — always `grid-cols-1 md:grid-cols-12` (mobile overflow).
3. Inline `clamp()` font sizes or `fontFamily` styles instead of the `.heading-*` / `.body-*` utilities.
4. Inline hex colours instead of `text-bone` / `bg-ink` / `text-champagne` etc.
5. Hand-rolled buttons instead of `.btn` + a variant.
6. A page with no exported `metadata`, or an empty `description`. This site is SEO-critical.
7. Adding structured data inline instead of via a `@/lib/schema` builder + `<JsonLd>`.
8. Rival scroll listeners instead of the `.reveal` / `<Reveal />` system.
9. Background gradients, glows or blobs — the ground is FLAT (2026-07-09). One scoped exception since 2026-07-16: the homepage craft card's dosed in-family gradient lives INSIDE its card, never on the ground — don't let it spread.
10. Rounded corners on imagery, frames, cards or inputs — corners are straight; only device-mockup hardware and the pill buttons curve.
11. Champagne on label type (kickers, indices, stats) — gold is for details and interactions only.
12. Sizing headings by taste instead of THE LADDER's registers (see Typography).
13. Box-aligning side-by-side type (`items-center`/`items-end` alone) or `pt-*` nudges where a baseline lock belongs (see BASELINES LOCK).
14. Hover motion on imagery (scale/zoom) — plates don't swell; affordance is the caption dim and the gold arrow. And nothing auto-moves, ever.
15. Imagery at freelance aspect ratios — landscape is 16:10, portrait is 4:5, nothing else (device hardware, the OG card and logo marks excepted). Desktop captures are shot at 1440×900, never cropped to fit.

## Pre-launch checklist (not yet done)

- [ ] Set the real domain in `src/lib/site.ts` (`SITE.url`) and confirm email/socials.
- [ ] Replace placeholder pricing in `src/app/pricing/page.tsx` with real figures.
- [ ] Add a real OG image at `public/og/default.png` (1200×630) — referenced by `SITE.ogImage`.
- [ ] Add real project imagery (`heroImage`/`thumbImage`) to the case studies.
- [ ] Replace the seed case studies + Journal posts with real ones (current ones are illustrative).
- [ ] Connect the Netlify form (`/contact`) and confirm submissions arrive.
- [ ] Replace the homepage "Kind words" PLACEHOLDER quote + star-rating label with real client words and live review data (never draft these).
- [ ] Homepage hero TRUST ROW is a placeholder ("Trusted by practices in London, Sydney & Dubai" + empty avatar chips) — confirm real locations/faces or cut the row (we never draft review claims).
- [ ] Homepage hero PROOF STAT ("156% average lift in organic enquiries*") is ILLUSTRATIVE — swap in a real, client-approved figure or cut the card (the 2026-07-10 receipts audit stands: no numbers we can't defend).
- [ ] The /services hero graphic (`public/services-hero-square.png`) depicts a MOCK practice ("Lumen") — confirm this sits comfortably beside the plates' real-client-work-only rule, and consider compressing the PNG (~1.7MB serving at ~600px).
- [ ] Produce the freebie ("What patients check before they book" checklist) and confirm `newsletter` form submissions arrive — including the `marketing-opt-in` value (consent record).
- [ ] Have `/privacy` reviewed by a professional before launch; keep it in sync with what the site actually collects (it currently, truthfully, says: two forms, no analytics, no trackers — update it if analytics are ever added).
- [ ] Every marketing email sent must include one-click unsubscribe + sender identification (Spam Act / PECR).
- [ ] Replace the homepage Instagram MOCKUP tiles with a real feed (or real recent posts).
- [ ] Update `themeColor` in `layout.tsx` to `#0C0C0D` (it still says #1C1710; the file is held back for the Dia licence, so the change must ride whenever it's next committed/deployed).
- [ ] Re-export the hero + close plates at retina scale (Rowen 5 and Rowen 8 from the PSD suite at 2000px+, currently 1000px) and re-run the composite recipe in `docs/briefs/hero-plates.md`. Rowen laptop 4 too: it serves the /about FULL-BLEED scene band at 100vw but is a 1200px blog export — re-export at 2400px+.
- [ ] Confirm Dr Yalda is happy for her site to be the featured screen on the homepage hero and close plates AND the /about full-bleed scene band (her work is named in the alt text in all three).

## Commands

```
npm run dev     # local dev (clears .next first)
npm run build   # production build — also runs the content validators
npm start       # serve the production build
```
