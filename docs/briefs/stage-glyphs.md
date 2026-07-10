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

## The current vocabulary (extend in this voice)

Compass / lens / axes — optical and cartographic, echoing the NR dot-compass
mark. Not arrows-and-gears, not nature, not metaphor soup.

| Stage | Forms | Reading |
| --- | --- | --- |
| 01 Discovery | circle + centre dot | the lens; the compass |
| 02 Strategy | crossed axes (2 lines) | the map; the plan |
| 03 Design | square overlapping circle | form studies; composition |
| 04 Build & launch | triangle | structure |
| 05 Refine | concentric circles | honing; iteration |

## Colour (reference the tokens, never hex)

`currentColor` from the parent. On ink: `text-champagne` (the sanctioned
ornament-glyph use — at a 1px hairline gold is a whisper, not a label). On
light grounds (`scene-warm`/`scene-cream`): `text-ink/70`. Never full-strength
bone on ink (outranks the type), never `text-ember` (dots only, and not these
dots), never a fill of any colour.

## Sizing

Render at `h-12 w-12` to `h-14 w-14` (48–56px). Below ~32px overlapping forms
muddy; above ~80px a glyph starts competing with the type MOMENTS register
(see THE LADDER in CLAUDE.md). Placement (THE SPINE, 2026-07-10): the glyph
sits BESIDE its step's text — the item's mark, where a numeral would go in
a printed index (the `(0n)` indices were dropped for exactly that reason:
the glyph does the marking, the spine does the sequencing). Each block is
tethered to the centre hairline by a short horizontal rule; the glyph is
the first thing on the line after the tether. The five glyphs ramp from
40% to 100% opacity down the sequence — the project coming into focus — a
STATIC print tint stepped per item, never an animation. Presence comes
from placement, not inflation — resist sizing up before giving the mark
more air.

## How to design a new glyph (the procedure)

1. Name the stage's meaning in one word (e.g. Refine → "honing").
2. Find the pure-form composition: at most two allowed elements from the
   vocabulary's voice. Sketch coordinates on the 64-grid; centre compositions
   on (32, 32) unless asymmetry carries the meaning (see stage 3).
3. Apply the test: **if it can't be drawn from circle, line, square and
   triangle in two forms, it doesn't belong in this system.**
4. Add the `stage === n` block to `StageGlyph.tsx` using the shared `line`
   props. Run `npx tsc --noEmit`.
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
