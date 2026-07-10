# Stage glyphs — a design brief for Claude

**You are designing within a living system, not from taste.** This brief is
written for a Claude session with access to this repo. Read these before
drawing anything:

1. `CLAUDE.md` — the colour rules (champagne = details & interactions ONLY;
   ornament glyphs are one of its sanctioned uses) and the corners rule
   (pure forms or straight edges; never the soft middle).
2. `src/components/StageGlyph.tsx` — the component you are extending. Five
   glyphs exist; the pattern is a `stage === n` block per glyph.
3. `src/app/globals.css` — find `--ink-line` / `.rule-dark`: the 1px hairline
   every glyph's stroke must visually match.
4. This file's **Invariants** — they are constraints, not suggestions.

**Component:** `src/components/StageGlyph.tsx` · **Live:** homepage → How we
work plates · **Decided:** 2026-07-10

## Why this system exists (so you don't re-litigate it)

The process plates needed a visual. Photography was trialled and pulled
(overkill for a summary; abstract stages photograph as stock). Ghost folio
numerals (`text-ghost-on-dark`) were trialled and superseded (read as type,
not image). Pictorial icons — magnifying glasses, pencils, any imported
library — are permanently rejected: they would be the one template-flavoured
subsystem on an editorial page. What survived is abstract geometry drawn from
the site's own hairline. **Do not propose icon libraries. Do not propose
photography here. Both decisions are settled.**

## The one-line rule

**The icon system is the rule system, curved.** A glyph is the page's own
1px hairline bent into a pure form. If a glyph looks like it was *placed on*
the page rather than drawn *by* the page, it is wrong.

## Invariants (violating any of these = wrong, regardless of how it looks)

- ViewBox is `0 0 64 64`. Forms keep ≥ 6 units of margin from every edge.
- Every stroke: `fill: none; stroke: currentColor; stroke-width: 1;
  vector-effect: non-scaling-stroke`. The non-scaling stroke is load-bearing —
  it is what keeps the glyph's line identical to `.rule-dark` hairlines at
  every rendered size. Reuse the component's shared `line` props object.
- Allowed elements: `<circle>`, `<line>`, `<rect>` (square proportions,
  square corners — no `rx`), `<polygon>` limited to triangles. **No `<path>`,
  no béziers, no arcs, no freeform drawing.**
- The only permitted fill is a **dot**: a filled circle, radius ≤ 3 units —
  the NR logo's own gesture. Nothing else ever fills.
- **One or two forms per glyph, never three.** If a meaning seems to need
  three shapes, the meaning is too specific — abstract it further.
- Decorative always: `aria-hidden` on the `<svg>`; the plate's title + body
  must carry the full meaning with the glyph deleted.

## The current vocabulary (working set R5, 2026-07-10 — extend in this voice)

Optical and cartographic — lenses, rings, forms trued to their rule —
echoing the NR dot-compass mark. Not arrows-and-gears, not nature, not
metaphor soup. The row reads as a sequence: focus → narrow → compose →
stand → true.

| Stage | Forms | Coordinates (64-grid) | Reading |
| --- | --- | --- | --- |
| 01 Discovery | two overlapping circles | circle 24,32 r16 · circle 40,32 r16 | the lens pair — two views brought into focus; the overlap is the insight |
| 02 Strategy | concentric circles | r20 + r10, both 32,32 | the rings — options narrowing to a plan (moved from Refine at R3) |
| 03 Design | square overlapping circle | square 14,14 24u · circle 38,38 r12 | form studies; composition — circle centred on the square's corner |
| 04 Build & launch | triangle | 32,13 · 51,46 · 13,46 (equilateral) | structure |
| 05 Refine | circle + line (tangent) | circle 32,28 r18 · line 10,46→54,46 | trued — the form seated exactly on its rule; precision as tangency |

Voice note: with 05g the dot leaves the working set entirely — the NR
gesture survives only in the alternates. "Crossed axes" left the table at
R5 (superseded by the lens pair / rings pairing).

Alternates on record — 01: 01e bearing (circle 32,32 r17 · dot 44,20 on the
ring) · 01f survey (line 24,10→24,54 · line 10,40→54,40). 05: 05h meridian
(line 32,10→32,54 · circle 32,32 r14) · 05i successive passes (line
12,26→52,26 · line 24,38→40,38) · 05j pare (circle 30,32 r18 · line
10,10→54,32 — explored R5, declined: tool depictions are closed by this
brief, and a cut reads risky beside treatment copy). Rejected at R4: 05d
bullseye, 05e tolerances, 05f finishing stroke.

## Motion (M·1 "drawn by the page" — adopted 2026-07-10)

Strokes carry `pathLength={100}` + `.sg-stroke` (`drawn` props); a second
form takes `.sg-stroke-2` (`drawnSecond`, +220ms). The CSS lives in
globals.css directly after the `.reveal` block: inside a `.reveal` that
hasn't entered, the dash offset hides the stroke; on `.is-in` the line
draws itself in — 1.1s, the reveal curve. ENTRANCE-ONLY, riding the plate's
existing reveal, so print stillness holds; no new tokens, no scroll
listeners. Stagger per plate via `--sg-delay` on the `.reveal` element.
Outside a `.reveal` a glyph renders fully drawn (safe anywhere). Reduced
motion: fully drawn instantly (Reveal.tsx adds `.is-in` at once; the global
guard zeroes durations and delays). M·2 (hover-to-full-champagne) is held
in reserve until plates become links.

## Colour (reference the tokens, never hex)

`currentColor` from the parent. On ink: `text-champagne` (the sanctioned
ornament-glyph use — at a 1px hairline gold is a whisper, not a label). On
light grounds (`scene-warm`/`scene-cream`): `text-ink/70`. Never full-strength
bone on ink (outranks the type), never `text-ember` (dots only, and not these
dots), never a fill of any colour.

## Sizing

Render at `h-12 w-12` to `h-14 w-14` (48–56px). Below ~32px overlapping forms
muddy; above ~80px a glyph starts competing with the type MOMENTS register
(see THE LADDER in CLAUDE.md). Placement (2026-07-10, third form that day):
the HOMEPAGE METHOD STRIP — the glyph sits beside its step's TITLE in a
slim ruled band at `h-9` (36px, just above the ~32px muddy floor), five
pairs across one row; and the /SERVICES process plates — glyph left on the
plate's rule, `(0n)` index right, at `h-12` (48px). The spine timeline's
placement (glyph + tether + opacity ramp) was retired with the spine —
the ramp was the spine's device; in a single row it reads as an error.
Presence comes from placement, not inflation — resist sizing up before
giving the mark more air.

## How to design a new glyph (the procedure)

1. Name the stage's meaning in one word (e.g. Refine → "honing").
2. Find the pure-form composition: at most two allowed elements from the
   vocabulary's voice. Sketch coordinates on the 64-grid; centre compositions
   on (32, 32) unless asymmetry carries the meaning (see stage 3).
3. Apply the test: **if it can't be drawn from circle, line, square and
   triangle in two forms, it doesn't belong in this system.**
4. Add the `stage === n` block to `StageGlyph.tsx` using the shared props:
   `drawn` for the first form, `drawnSecond` for the second (they carry the
   `line` invariants plus the M·1 draw-on). Run `npx tsc --noEmit`.
5. Verify in the browser at 48px next to a `.rule-dark` hairline — the
   stroke weights must be indistinguishable. Check the overlap still reads.
6. Register it: add the row to this brief's vocabulary table. If the usage
   context changed (new page/section), update the `StageGlyph` rows in
   `CLAUDE.md`'s component table and `/stylesheet`'s organism index — the
   canon rule is: token or component change → canon change, same commit.

## Anti-goals (repeated because they are the likely failure modes)

- No imported icon set, ever — not "just for one icon".
- No rounded rectangles: the corners rule allows true circles and true
  squares; the soft middle is app language.
- No third form, no paths, no fills beyond the dot.
- No new colour behaviour — if a context seems to need one, the context is
  wrong, not the colour rules.
