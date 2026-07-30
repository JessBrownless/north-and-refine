# Handoff: /services hero handover & pacing refinements

Target repo: `JessBrownless/north-and-refine` (branch `main`, Next.js / Tailwind).
This brief translates an approved design review into concrete code changes. Work against the repo's existing components and patterns — do not introduce new libraries or restructure the page.

## About the design files
`Services Current.dc.html` and `Services Refined.dc.html` in this bundle are **HTML design references**, not production code. "Current" is a faithful rebuild of the page as shipped; "Refined" is the approved target. Recreate the *deltas* between them inside the existing Next.js components. `Services Teardown.dc.html` documents the reasoning.

## Fidelity
**High-fidelity.** All hex values, sizes, paddings and easing below are final. Where a value maps to an existing Tailwind token in the repo, use the token.

## The approved arc (the one-line brief)
The page becomes **three acts, two ground flips**:
1. **Dark act** — hero, credit strip and belief statement read as one continuously decaying scene (`#16110C` → `#0C0C0D`).
2. **Light act** — service index on bone `#F2EEE6`, stepping **up** to near-white ivory `#FBF8F1` for the testimonial.
3. **Dark close** — FAQ returns to ink `#0C0C0D` and fuses with the existing ContactCTA + Instagram strip + footer. (If the Instagram strip is light, either tone it dark or move it above the FAQ — the close must stay unbroken dark.)

## Changes by file

### 1. `src/app/services/page.tsx`
- **Demote the fields marquee to a credit strip.** Replace the full-bleed 80px-caps ticker with a single row directly under the hero: label `WHO WE WORK WITH` (Geist Mono, 11px, tracking 0.24em, `#8a8578`, flex-shrink-0) + the same marquee items at **Geist Mono 12px, tracking 0.22em, uppercase, `#c1b9b0`**, gold `✦` separators (8px, `#C2A878`), inside `border-top`/`border-bottom: 1px solid rgba(242,238,230,0.12)`, `padding: 22px 0`, page gutter width (not full-bleed). Marquee duration ~64s, pause on hover, with a 7% fade mask each end (`mask-image: linear-gradient(90deg, transparent, black 7%, black 93%, transparent)`).
- **Belief statement block:** padding `160px` top and bottom (was pt-56/pb-40 scale). Type steps DOWN from the H1: `font-size: clamp(32px, 1rem + 4.5vw, 80px)`, `line-height: 1.08`, `letter-spacing: -0.03em`, `max-width: 24ch`, weight 500.
- **Light act opens with structure:** first 120px of the bone section = kicker row `WHAT WE DO` (left) / `THREE DISCIPLINES, ONE STUDIO` (right), both Geist Mono 11px tracking 0.24em `#686664`, then a full-width 1px rule `#DAD4C8` 20px below, then the service rows 72px below. No imagery in this section — keep it editorial.
- **Testimonial ("Kind words") gets its own section** on `#FBF8F1` (near-white ivory), `padding: 112px gutter 128px`, grain overlay at 0.05 multiply, same internal layout as today. It is a separate `<section>`, not part of the bone block.
- **Section order/tones:** hero (dark) → credit strip + belief (dark) → service index (bone `#F2EEE6`) → kind words (ivory `#FBF8F1`) → FAQ (ink `#0C0C0D`) → CTA/footer (dark, unchanged).

### 2. `src/components/ManifestoStatement.tsx`
- Resting word opacity `0.15` → **`0.35`**.
- Scroll-fill window: start `0.8vh`, end `0.45vh` (was 0.55 → 0.12) so the fill **completes by mid-viewport** — a fast scroller never passes an unlit statement.
- Keep stagger `0.82` and ramp `0.24` as-is.

### 3. `src/components/SectionGlow.tsx`
- On the /services hero→belief seam only (use the existing intensity prop): amber tail opacity `0.11` → **`0.16`**, height up (~44% of section vs 34%), width ~84%. Side blob `0.07` → `0.09`. The glow must fully decay to flat `#0C0C0D` before the cut to bone.
- Do not change other pages' doses.

### 4. `src/components/FaqSection.tsx` usage on /services
- FAQ runs **dark** (ink `#0C0C0D`, `#F2EEE6` text): hairlines `rgba(242,238,230,0.16)`, plus-glyph `#C2A878` rotating 45° on open, answers `#c1b9b0`, kicker `#8a8578`, outline pill button `border: 1px solid rgba(242,238,230,0.4)` with `#C2A878` border + `rgba(194,168,120,0.08)` bg on hover.
- If the component's `tone` contract says light-middle pages take cream, this page is the sanctioned exception: the FAQ *is* the start of the dark close.

### 5. `src/components/ContactCTA.tsx`
- No changes. The warm gradient card is the hero's bookend — the point of the dark close.

## The seam rules (apply when in doubt)
- **Dark into dark:** both sides resolve to the same anchor tone; the glow decays to flat ink. No visible line.
- **Dark into light:** always a deliberate cut, and the light side leads with structure (kicker + rule) inside its first 120px.
- **Never two devices at one boundary** — glow handover *or* page-turn, never both.

## Design tokens used
- Inks: `#0C0C0D` (page), `#16110C` (hero anchor), `#14100B` (wash target)
- Lights: `#F2EEE6` (bone), `#FBF8F1` (ivory), `#DCD3C3` (deep cream — unused in final, kept as option)
- Gold: `#C2A878`, hover gold `#D8C6A4`, muted gold `#A9884E`
- Muted text: `#c1b9b0` (on dark), `#51504E` / `#686664` (on light), `#8a8578` (mono labels)
- Hairlines: `rgba(242,238,230,0.12–0.16)` on dark, `#DAD4C8` on light
- Type: Instrument Sans (400/450/500), Geist Mono (labels), Saol Display Light Italic (em accents)
- Easing: reveals `cubic-bezier(0.16,1,0.3,1)` 1.1s; odometer `cubic-bezier(0.65,0,0.35,1)` 900ms; line-fills 1.3s

## Files in this bundle
- `Services Refined.dc.html` — the target (open in a browser; scroll it)
- `Services Current.dc.html` — the as-shipped rebuild, for diffing by eye
- `Services Teardown.dc.html` — the five findings and rationale

## Suggested prompt for Claude Code
> Read design_handoff_services_pacing/README.md. Implement the changes exactly as specified in "Changes by file", against src/app/services/page.tsx, ManifestoStatement.tsx, SectionGlow.tsx and the FaqSection usage on /services. The HTML files are references only — reuse our existing components, Tailwind tokens and patterns. Don't touch other pages.
