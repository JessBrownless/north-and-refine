# CLAUDE.md

Instructions for Claude when working in this repository. Read this **before** writing or editing code.

## Project

**North & Refine** — the marketing site for a design studio whose clients are medical aesthetic and cosmetic surgery practices. This is the studio's own shop window, so it has to look like the work we'd sell to a cosmetic surgeon. It is **SEO- and schema-led** by design.

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind 3 + a custom design-token system in `src/app/globals.css`
- **Content:** MDX collections read from `content/` at build time (no CMS) via `gray-matter` + `next-mdx-remote/rsc`
- **Hosting:** Netlify (`@netlify/plugin-nextjs`)
- **Fonts:** SINGLE PREMIUM SANS — **Instrument Sans** (`--font-sans`, Google, chosen for its sheared "scalpel" terminals — a brand signature, see the lowercase t) + Geist Mono (`--font-mono`) for engineered accents (`.overline`, `.index-num`, `.stat`). Aeonik Pro trial evaluated and parked (loader commented in `layout.tsx`, files in `src/fonts/`, archive in `./font-trials/`).
- **Source of truth for the brand:** `src/app/globals.css` — all design tokens live there; rendered live at `/stylesheet`
- **Direction:** dark / premium agency. Warm near-black (`ink`), bone off-white, one restrained champagne accent — plus a bright `ember` signal at 60-30-10 doses (live dots only).

## How to use this file

Before writing markup or styles, scan **Design tokens** and **Components**. If a token, utility class, or component already exists for what you're building, use it — don't write parallel implementations. If nothing fits and you're about to introduce a new token, **ask first**. The cost of asking is one round-trip; the cost of drift is months.

## Design tokens

All in `globals.css`, mirrored at `/stylesheet` (the visual canon — keep them in sync in the same change).

### Colour (Tailwind classes preferred; CSS vars only inside `globals.css`)

| Class | Hex | Use |
| --- | --- | --- |
| `bg-ink` / `text-ink` | `#0C0C0D` | Default page background (warm near-black) |
| `bg-ink-raised` | `#161618` | Raised surfaces / cards on dark |
| `rule-dark` (border) | `#2A2A2C` | Hairline dividers on dark |
| `bg-bone` / `text-bone` | `#F2EEE6` | Light sections; primary text on ink |
| `text-bone-dim` | `#CBC6BB` | Secondary text on ink |
| `rule-light` (border) | `#DAD4C8` | Hairline dividers on light |
| `text-clay` | `#8A8578` | Captions, fine print, meta |
| `text-champagne` / `bg-champagne` | `#C2A878` | The one accent — use sparingly |
| `bg-ember` | `#FF7A00` | The 10 of 60-30-10 — the `.live-dot` availability signal ONLY, one per view; never text, never fills |

Note `rule-dark` / `rule-light` set `border-color` only — pair with Tailwind `border` / `border-t` / `border-y` etc.

### Typography utilities (use these, never raw `clamp()`/inline `fontFamily`)

Fluid modular scale, one `clamp()` per class. Body is 16px fixed.

`.display-mega` · `.display` (homepage H1) · `.heading-xl` (interior-page H1) · `.statement` · `.heading-lg` (H2) · `.heading-md` (H3) · `.heading-sm` (H4) · `.body-lg` (lede) · `.body` · `.body-reading` (long-form prose) · `.blockquote` · `.overline` (kicker) · `.label` · `.fineprint` · `.stat` · `.index-num` · `.nav-link` · `.cta-label` · `.wordmark-giant` (the footer's cropped NORTH)

- `.overline` collides with Tailwind's `overline` text-decoration utility — an **unlayered override at the end of globals.css** disables the decoration. Don't remove it or move it into a @layer.
- **Heading-group spacing:** put the overline and heading as direct siblings and add `.from-overline` to the heading (margin scales with the heading). Use `.lede` on the subtitle. **Never** set these gaps ad-hoc with `mt-*`/`mb-*`.
- h1–h6 default to the sans at medium (500), tight tracking. Don't override per-element without reason.

### Buttons — always `.btn` + one variant. Never hand-roll a pill CTA.

`light`/`dark` = the **background the button sits on**, not the button's colour.

- On dark: `.btn-primary-dark` (solid bone), `.btn-secondary-dark` (outline)
- On light: `.btn-primary-light` (solid ink), `.btn-secondary-light` (outline)
- `.btn-sm` size modifier · `.btn-ghost` = minimal arrow text-link
- One primary per view. The `→` is optional child markup.
- Padding sits on the **8px grid** — chunky by design: 16/32 (`.btn-sm` 16/24). Keep it there.
- `.live-dot` — the pulsing ember availability signal, ONE per view (the homepage hero eyebrow: ● Available for projects).

### Layout helpers

- `.shell` — standard max-width 1280px container with responsive padding. The **content grid** — use on all body sections so copy keeps a comfortable measure.
- `.shell-wide` — open, near-full-width container (max 1760px, lighter padding). **Heroes only**, with one sanctioned exception: the work/[slug] article uses it as the IMAGE canvas — figures span it (full or 5+5 pairs) while kickers/copy stay grid-indented to a reading measure. Everything else sits on `.shell` so content shares one max width. (A homepage "content to the edges" experiment was tried and reverted 2026-07-03 — don't reintroduce it without asking.)
- `.grain` — film-grain overlay for dark hero sections (needs `position: relative` + `overflow-hidden` on the parent, and `z-10` on content above it).
- `.frame` — media wrapper (relative, overflow-hidden, ink-raised background).
- `animate-float-slow` / `animate-float-slower` — floaty hero elements (orbs, glass chips); stagger with inline `animationDelay`. Hero load-in uses `opacity-0 animate-fade-in-up` + delays (scroll sections use `.reveal`). A global reduced-motion guard at the end of globals.css snaps all animations to their end state.
- `.reveal` — scroll-reveal entry. Add the class; stagger with inline `style={{ transitionDelay: "120ms" }}`. The global `<Reveal />` (in the root layout) observes them. Respects reduced-motion.

### Surfaces & frames (tech-luxury direction)

- `.scene-warm` — champagne-lit light scene; backdrop for device mockups on light sections.
- `.scene-ink` — champagne glow rising from the ink base; dark hero/gallery backdrop.
- `.card-soft` — elevated card on light surfaces (1.5rem radius, layered shadow).
- `.card-glass` — glassy blurred card on dark surfaces.
- `.portrait-fill` — abstract portrait gradient; stands in for client imagery in device mockups.
- `.text-ghost-on-dark` / `.text-ghost-on-light` — outlined display text for oversized marquee statements (pair with `.display-mega` + `animate-marquee`).

## Components (canonical — reuse/extend these)

| Component | Purpose |
| --- | --- |
| `Navbar` / `Footer` | Site chrome (in `layout.tsx`). One each — don't fork. The scrolled pill flips to ink glass while floating over any element marked `data-nav-light` (the bone manifesto, `ContactCTA`) — mark new light sections the same way or the pill goes bone-on-bone. |
| `Reveal` | Global IntersectionObserver for `.reveal`. Don't add rival scroll listeners. |
| `SmoothScroll` | Lenis inertial scrolling, mounted once in the root layout. Native scroll stays authoritative (sticky/IO/scroll listeners all work); skips under reduced-motion. Don't add rival smooth-scroll libs or scroll hijacking. |
| `PageHero` | **The interior-page hero.** Props: `overline`, `title`, `lede`, `cta`, `meta`, `size`. Extend via props; don't spawn `HeroX`. (Homepage has a bespoke hero.) |
| `ContactCTA` | Standard "start a project" band (light section). Drop at the foot of pages. |
| `WorkCard` | Case-study card for grids (typographic placeholder when no image). |
| `JsonLd` | Renders one or many schema objects from `@/lib/schema`. |
| `PhoneMockup` | iPhone frame holding a real `screenshot` (preferred) or a CSS clinic micro-site. Props: `name`, `specialty`, `screenshot`, `screenshotAlt`, `screen` (editorial/ink), `size` (sm/md/lg). |
| `BrowserMockup` | macOS browser-window frame holding a real desktop `screenshot` or a CSS editorial desktop site. Props: `name`, `specialty`, `domain`, `screenshot`, `screenshotAlt`. The wide companion to `PhoneMockup`. |
| `Deck` | **The homepage hero showreel.** A fanned, auto-cycling stack of "desktop screen" cards (the OmenFlex shape). Prop: `slides` (`DeckSlide[]` — `title`, `tag`, optional `href`/`screenshot`/`screenshotAlt`). Pauses on hover, respects reduced-motion. With `href`, the FRONT card is a link (hover reveals a "View case study" pill); other cards click forward. The homepage feeds it one card per sector — each card shows a real case-study capture and links to the study that owns it (the sector's own where it has a `thumbImage`, else the newest featured study with one). Born in `/mockups/showreel`. |

The homepage hero is the **`Deck` showreel** — a centred type lockup over the cycling card deck. The earlier **asymmetric device cluster** (`BrowserMockup` anchored + `PhoneMockup` overlapping its corner) remains the canonical "responsive showcase" pattern — reuse it for work/case-study heroes rather than a lone centred device.

### Design direction: Obsidian (decided 2026-06)

The site's visual direction is **Obsidian** — dark-led tech luxury. Champagne-lit ink scenes (`.scene-ink`), the cycling `Deck` showreel hero, glass cards (`.card-glass`), ghost marquee text, and a bone CTA "interruption" as the close. The homepage is the canonical expression; `PageHero` carries `.scene-ink` so interior pages match. `/mockups` retains the winning mockup for reference only (noindexed, robots-disallowed). Light-topped pages, if ever added, must be listed in `LIGHT_TOP_ROUTES` in `Navbar.tsx` or the unscrolled nav is bone-on-bone (invisible).

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

## Pre-launch checklist (not yet done)

- [ ] Set the real domain in `src/lib/site.ts` (`SITE.url`) and confirm email/socials.
- [ ] Replace placeholder pricing in `src/app/pricing/page.tsx` with real figures.
- [ ] Add a real OG image at `public/og/default.png` (1200×630) — referenced by `SITE.ogImage`.
- [ ] Add real project imagery (`heroImage`/`thumbImage`) to the case studies.
- [ ] Replace the seed case studies + Journal posts with real ones (current ones are illustrative).
- [ ] Connect the Netlify form (`/contact`) and confirm submissions arrive.

## Commands

```
npm run dev     # local dev (clears .next first)
npm run build   # production build — also runs the content validators
npm start       # serve the production build
```
