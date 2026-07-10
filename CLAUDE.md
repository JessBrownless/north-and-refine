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
- **Direction:** dark / premium agency. Warm near-black (`ink`), bone off-white, one restrained champagne accent — plus a bright `ember` signal at 60-30-10 doses (live dots only).

## How to use this file

Before writing markup or styles, scan **Design tokens** and **Components**. If a token, utility class, or component already exists for what you're building, use it — don't write parallel implementations. If nothing fits and you're about to introduce a new token, **ask first**. The cost of asking is one round-trip; the cost of drift is months.

## Design tokens

All in `globals.css`, mirrored at `/stylesheet` (the visual canon — keep them in sync in the same change).

### Colour (Tailwind classes preferred; CSS vars only inside `globals.css`)

| Class | Hex | Use |
| --- | --- | --- |
| `bg-ink` / `text-ink` | `#1C1710` | Default page background (warm near-black — a deep shadow of the parchment; warmed + lifted from `#0C0C0D` 2026-07-09) |
| `bg-ink-raised` | `#26201A` | Raised surfaces / cards on dark |
| `rule-dark` (border) | `#484036` | Hairline dividers on dark |
| `bg-bone` / `text-bone` | `#F2EEE6` | Light sections; primary text on ink |
| `text-bone-dim` | `#CBC6BB` | Secondary text on ink |
| `rule-light` (border) | `#DAD4C8` | Hairline dividers on light |
| `text-clay` | `#8A8578` | Captions, fine print, meta |
| `text-champagne` / `bg-champagne` | `#C2A878` | The one accent — details & interactions ONLY (ornament glyphs, link underlines, hovers, form feedback); never label type (2026-07-09) |
| `bg-champagne-soft` | `#D8C6A4` | Soft gold — hover fills only (a full scene-gold band was trialled and reverted 2026-07-10: too gold; champagne never fills) |
| `bg-ember` | `#FF7A00` | The 10 of 60-30-10 — the `.live-dot` availability signal ONLY, one per view; never text, never fills |

Note `rule-dark` / `rule-light` set `border-color` only — pair with Tailwind `border` / `border-t` / `border-y` etc.

### Typography utilities (use these, never raw `clamp()`/inline `fontFamily`)

Fluid modular scale, one `clamp()` per class. Body is fluid 14→16px (mobile→desktop); `.body-sm` (13→14) is the secondary/meta tier.

`.display-mega` · `.display` · `.heading-xl` · `.statement` · `.heading-lg` · `.heading-md` · `.heading-sm` · `.body-lg` (lede) · `.body` · `.body-sm` (secondary/meta) · `.body-reading` (long-form prose) · `.blockquote` (DEPRECATED) · `.overline` (kicker) · `.label` · `.fineprint` · `.stat` · `.index-num` · `.nav-link` · `.cta-label` · `.wordmark-giant` (the footer's cropped NORTH)

- **THE LADDER (decided 2026-07-09)** — pick sizes by REGISTER, not taste: `.display-mega` = the masthead (the homepage H1, nothing else per page) → `.heading-xl` = the MOMENTS (interior-page H1s; on the homepage: the studio statement, the service-row titles, the ContactCTA close — the close mirrors the hero) → `.statement` = the QUOTE register (testimonial quotes) → `.heading-lg` = the SIGNPOSTS (section H2s, work-card client names) → `.heading-md`/`.heading-sm` = items (cards, steps). A list item must never outrank its section's statement; a signpost must never shout like a moment.
- `.blockquote` is DEPRECATED (2026-07-09) — a sans-era relic; quotes use `.statement` (Saol). It survives in globals only for the /mockups archive.
- **BASELINES LOCK (decided 2026-07-10)** — side-by-side type aligns on baselines, never box edges, and never with eyeballed `pt-*` nudges. Wherever a TITLE sits left and a LINK sits right, the link locks to the HEADING'S baseline — via FIRST baseline (`items-baseline`) when the heading leads its block (industries index rows, FAQ summaries, prose-beside-statement pairs, CTA kicker+statement, CTA pair labels, folio arrows+counter) or LAST baseline (`[align-items:last_baseline]`, declared after an `items-end` fallback for old browsers) when the heading closes its block or the link should sit on its bottom line (section header rows with kicker+H2, the service rows, Kind words' image-bottom-on-attribution). Print rules the page; boxes are invisible.
- `.overline` is BONE BY DEFAULT (2026-07-09, reversing the old champagne rule — the type system is TONAL; gold at 11px tracked caps reads brassy). Override with `text-clay` or `text-ink/45` on light sections. It also collides with Tailwind's `overline` text-decoration utility — an **unlayered override at the end of globals.css** disables the decoration. Don't remove it or move it into a @layer.
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

- `.shell` — standard max-width 1400px container with responsive padding. The **content grid** — use on all body sections so copy keeps a comfortable measure.
- `.shell-wide` — open, near-full-width container (max 1760px, lighter padding). **Heroes only**, with one sanctioned exception: the work/[slug] article uses it as the IMAGE canvas — figures span it (full or 5+5 pairs) while kickers/copy stay grid-indented to a reading measure. Everything else sits on `.shell` so content shares one max width. (A full edge-to-edge homepage was built and rolled back 2026-07-09 — the deck layout won; don't reintroduce without asking.)
- `.grain` — film-grain overlay for dark hero sections (needs `position: relative` + `overflow-hidden` on the parent, and `z-10` on content above it).
- `.frame` — media wrapper (relative, overflow-hidden, ink-raised background).
- `animate-float-slow` / `animate-float-slower` — floaty hero elements (orbs, glass chips); stagger with inline `animationDelay`. **ENTRANCES FADE IN PLACE (2026-07-10):** load-ins use `opacity-0 animate-fade-in` + delays; scroll sections use `.reveal` (now a pure 1.1s fade). The 16px rise (`animate-fade-in-up`, the old `.reveal` translate) is RETIRED from the brand — sliding in is a screen idiom, ink develops where it sits; `fade-in-up` survives only in the /mockups archive. A global reduced-motion guard at the end of globals.css snaps all animations to their end state.
- `.reveal` — scroll-reveal entry. Add the class; stagger with inline `style={{ transitionDelay: "120ms" }}`. The global `<Reveal />` (in the root layout) observes them. Respects reduced-motion.

### Surfaces & frames (tech-luxury direction)

- `.scene-warm` — FLAT bone light scene (the champagne-lit gradient was retired 2026-07-09; the class stays for section semantics).
- `.scene-cream` — the IVORY CLOSE (ContactCTA only, 2026-07-10): champagne-soft mixed 35% into bone (≈#E9E0CF) — a warmer stock of the same paper, softening the ink→bone cut. Text on it: full ink headings, ink/70 lede/kicker (clay is sub-AA on light grounds). A full champagne-soft band was trialled and reverted the same day — too gold.
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
| `Navbar` / `Footer` | Site chrome (in `layout.tsx`). One each — don't fork. The nav is a tall ABSOLUTE bar at the top of the page — it scrolls away (no fixed pill, no scroll transform; removed 2026-07-04). The footer's back-to-top anchor covers the return trip. `data-nav-light` markers remain on bone sections but are currently unused. |
| `Reveal` | Global IntersectionObserver for `.reveal`. Don't add rival scroll listeners. |
| `SmoothScroll` | Lenis inertial scrolling, mounted once in the root layout. Native scroll stays authoritative (sticky/IO/scroll listeners all work); skips under reduced-motion. Don't add rival smooth-scroll libs or scroll hijacking. |
| `ExitFades` | Drives `.exit-fade` overlays (sections fading to ink as they exit) from one rAF-throttled scroll listener — JS, not CSS scroll-timeline, so it works in Safari too. Overlay's parent = measured scope; `.exit-fade-long` = earlier window for dark content sections. |
| `PageHero` | **The interior-page hero.** Props: `overline`, `title`, `lede`, `cta`, `meta`, `size`. Extend via props; don't spawn `HeroX`. (Homepage has a bespoke hero.) |
| `ContactCTA` | Standard "start a project" band (light section) — THE CLOSE MIRRORS THE HERO: kicker, heading-xl, lede, flagship + ghost, left on the rail (2026-07-10) + THE CLOSE PLATE (same day): Rowen 8 landscape 16:10 on cols 9–12, bottom-locked to the CTA row (`items-end`), STATIC — never overlapping; the close is the back cover, it resolves, it doesn't perform. Pairs with the hero's Rowen 5 portrait: one shoot bookending the page. Mobile: in flow after the buttons, 3/5 right-anchored. Drop at the foot of pages. |
| `NewsletterSignup` | Mailing-list capture (Netlify form `newsletter`; static definition in `public/__forms.html` — keep field names in sync). PARKED — the freebie band left the homepage 2026-07-04; destined for its own landing page. |
| `WorkCard` | Case-study card for grids (typographic placeholder when no image). |
| `LogoStrip` | The under-hero trust bar — a STILL nowrap row of client logos (Dr Yalda mark repeated as placeholder; images aria-hidden, links carry practice names), spread on md+, reader-scrollable on mobile. Never wraps, never auto-moves (marquee trialled & retired 2026-07-10). |
| `ServicesShowcase` | The "What we do" ruled rows — (0n) index, heading-xl title, ghost "Read more"; whole row links to /services. The homepage's formal stabiliser between asymmetric sections. |
| `JsonLd` | Renders one or many schema objects from `@/lib/schema`. |
| `StageGlyph` | Abstract geometric marks for the process stages — pure forms (circle/line/square/triangle) at a NON-SCALING 1px hairline, so the icon carries the same line as the rules. Working set R5 (2026-07-10): lens pair · rings · corner-lock · triangle · trued. MOTION M·1: strokes DRAW THEMSELVES IN on the plate's `.reveal` entry (`.sg-stroke` utilities in globals.css; stagger via `--sg-delay` on the reveal element; entrance-only, so print stillness holds; fully drawn outside a reveal + under reduced motion). currentColor: `text-champagne` on ink (the ornament-glyph use), `text-ink/70` on light. Props: `stage` (1–5 literal), `className`. Lives on the homepage spine + the /services process plates. Full rules: `docs/briefs/stage-glyphs.md`. NEVER an imported icon set. |
| `Carousel` | The contact-sheet rail (2026-07-10): native scroll-snap plates, hard-clipped at the shell edge, with a FOLIO line for controls (hairline · arrow buttons, champagne on hover · page counter). NEVER autoplays — the reader turns the pages; the folio hides itself when everything fits. Homepage: blog teasers only — the How-we-work rail was recomposed as THE SPINE 2026-07-10 (two identical rails in a row read as template; never stack two carousels). |
| `PhoneMockup` | iPhone frame holding a real `screenshot` (preferred) or a CSS clinic micro-site. Props: `name`, `specialty`, `screenshot`, `screenshotAlt`, `screen` (editorial/ink), `size` (sm/md/lg). |
| `BrowserMockup` | macOS browser-window frame holding a real desktop `screenshot` or a CSS editorial desktop site. Props: `name`, `specialty`, `domain`, `screenshot`, `screenshotAlt`. The wide companion to `PhoneMockup`. |
| `Deck` | PARKED showreel (was the homepage hero until 2026-07-09). A fanned, auto-cycling stack of "desktop screen" cards (the OmenFlex shape). Prop: `slides` (`DeckSlide[]` — `title`, `tag`, optional `href`/`screenshot`/`screenshotAlt`). Pauses on hover, respects reduced-motion. With `href`, the FRONT card is a link (hover reveals a "View case study" pill); other cards click forward. The homepage feeds it one card per sector — each card shows a real case-study capture and links to the study that owns it (the sector's own where it has a `thumbImage`, else the newest featured study with one). Born in `/mockups/showreel`. |

### Design direction: flat editorial ink (decided 2026-07-09; supersedes Obsidian)

The taste reference is the studio's own Instagram voice: flat ink or bone, huge Saol, one italic accent word per statement, a quiet tracked kicker, a hairline, air. The foundational rules that follow from it:

**The ground is flat.** One warm off-black (`--ink #1C1710`) and one bone, nothing else — every background gradient was retired 2026-07-09 (`.scene-ink`/`.scene-warm` are now flat paints; the ambient champagne pools, the cluster glow and the glass-card blobs are gone). If a section feels dead, the answer is content or type — never a glow.

**Corners are straight.** Saol is a high-contrast, scalpel-sharp Didone; its character is crisp edges and hairline strokes. Rounded corners are app logic — friendly, soft, SaaS. Straight corners are print logic, and everything else in this system is already print logic: hairline rules, mono kickers, editorial captions. Square frames behave like plates in a book, not cards in an app. Two deliberate exceptions: **device mockups keep their hardware radii** (a squared phone bezel or macOS window reads as an error, not a style), and **the pill buttons stay** — the single soft shape in a sharp system, a wax seal on a printed page.

### Homepage: type-led and flat (2026-07-09)

Hero is TYPE-LED with **THE DEAD-CORNER PORTRAIT** (settled 2026-07-10, round five of the hero-image saga — the four dead forms: device cluster, Deck showreel, and two panel options including a built tipped-in landscape, all killed for costing the masthead or the fold). The plate that lived costs neither: the H1 wraps to a short second line, and a 4:5 portrait (Rowen 5, the client's own mockup suite, with a REAL client site composited on the laptop screen) fills exactly the corner that leaves — top rides `var(--masthead-line)` (globals token sharing `.display-mega`'s size — never a copied clamp), bottom locks to the CTA row, right edge on the shell grid, width derived from height. ZERO type overlap, ZERO fold cost, H1 at full measure — lg+ only. MOBILE: the same plate in flow below the CTAs, right-anchored at 3/5 width — accepting, knowingly, that the LogoStrip slips just below the phone fold ("the fold bends before the whitespace does"). The masthead itself is untouchable: `display-mega` H1 with the italic accent, sans lede, flagship CTA pair (.btn-arrow + a ghost); any future hero image must occupy leftover space, never take it (the arithmetic: hero + strip ≈ 816px against 820–900px laptop viewports). Plate recipe: `docs/briefs/hero-plates.md`. Then: trust bar (LogoStrip) → The studio (statement + positioning prose — moved ABOVE the work 2026-07-09: claim → who → proof) → What we do (ruled heading-xl rows — the formal stabiliser between two asymmetric neighbours) → Selected work (the page's only imagery: real captures in straight-cornered 16:10 frames, ruled captions, frontmatter `summary` — the work IS the proof) → How we work (THE SPINE, 2026-07-10: the five /services steps hang off one continuous centre hairline — the page's ONLY vertical rule. Each step is a BLOCK — glyph beside its text, no (0n) index (dropped same day; the spine does the sequencing) — tethered to the spine by a short horizontal hairline, sides alternating, blocks packing toward the centre; the glyphs ramp 40%→100% opacity down the five steps (the project coming into focus — a static print tint, not animation); on mobile the spine moves to the left edge. Its brief carousel was retired the same day — two consecutive rails with identical folio chrome, and the whole method should be visible at once) → Blog teasers (the Carousel's one homepage use) → ContactCTA. An earn-its-place pass (2026-07-09) cut the hero disciplines list, the proof four-up, the service-row leads, the industries section and the CTA colophon rail — resist re-adding furniture without cause. The RECEIPTS STRIP (proof numbers briefly closing Selected work) was cut FOR GOOD 2026-07-10: audited against what the studio can stand behind, the numbers were positioning claims or too weak — a homepage stat must be SPECIFIC, VERIFIABLE and CLIENT-APPROVED, and none currently qualify. Real metrics go inside their case study (work frontmatter `metrics`) or on /about when they exist; no stats strip returns without numbers that clear that bar. A "Kind words" testimonial section sits after Selected work (returned 2026-07-09 — human proof after the work): ONE quote at statement register, square portrait slot, ruled attribution — ALL content visibly-marked placeholder until real client words/portrait/permission exist (we never draft quotes on a client's behalf). NOTHING performs — print stillness: nothing on the page moves unbidden (the trust-bar marquee was trialled & retired 2026-07-10; the strip is a STILL nowrap row, spread on md+, reader-scrollable on mobile). The strip lives above the fold: present from first paint, never .reveal it (the observer's rootMargin excludes the bottom 10% of the viewport). Sanctioned motion: entrance reveals (pure fades, IN PLACE — the rise retired 2026-07-10: things develop where they sit, like ink coming up on paper), Lenis glide, the CTA exit-fade, and reader-driven rails — all deliberate keeps (2026-07-10 print audit). Deck, ghost marquee, ambient pools and the blend-weave hero stay parked.

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
9. Background gradients, glows or blobs — the ground is FLAT (2026-07-09).
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
- [ ] Produce the freebie ("What patients check before they book" checklist) and confirm `newsletter` form submissions arrive — including the `marketing-opt-in` value (consent record).
- [ ] Have `/privacy` reviewed by a professional before launch; keep it in sync with what the site actually collects (it currently, truthfully, says: two forms, no analytics, no trackers — update it if analytics are ever added).
- [ ] Every marketing email sent must include one-click unsubscribe + sender identification (Spam Act / PECR).
- [ ] Replace the homepage Instagram MOCKUP tiles with a real feed (or real recent posts).
- [ ] Re-export the hero + close plates at retina scale (Rowen 5 and Rowen 8 from the PSD suite at 2000px+, currently 1000px) and re-run the composite recipe in `docs/briefs/hero-plates.md`.
- [ ] Confirm Dr Yalda is happy for her site to be the featured screen on the homepage hero and close plates (her work is named in the alt text).

## Commands

```
npm run dev     # local dev (clears .next first)
npm run build   # production build — also runs the content validators
npm start       # serve the production build
```
