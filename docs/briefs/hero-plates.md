# Hero & close plates — the Rowen pair (recipe)

**Decided 2026-07-10** (round five of the hero-image saga — see CLAUDE.md's
homepage section for the four dead forms and why this one lived).

Two photographic plates bookend the homepage, both from the client's own
**Rowen** mockup suite (PSDs in her files; flat exports arrive as AVIF), both
showing a REAL client site composited onto the laptop screen:

| Plate | Frame | Ratio | Slot |
| --- | --- | --- | --- |
| `public/assets/plates/hero-rowen-05.jpg` | Rowen 5 — laptop on black side table, boucle curve | 4:5 (1000×1250) | Hero dead corner (lg+ absolute; mobile in-flow) |
| `public/assets/plates/cta-rowen-08.jpg` | Rowen 8 — laptop on travertine plinth, sheer curtain | 16:10 (1000×625) | ContactCTA, cols 9–12, bottom-locked |

| `public/assets/plates/kind-words-rowen-phone-05.jpg` | RowenPhone 5 — phone flat on travertine (the close plate's stone) | 4:5 (1200×1500) | Kind words big slot. Source 3141×4713: crop `top:393, 3141×3926` → grade → resize 1200×1500. Screen rect (412,367)→(796,1167), corner radius 54, capture `assets/phones/dr-yalda-hero.jpg` masked with a rounded rect (no rotation — the phone is upright) |

Rule of thumb (learned 2026-07-10, when a landscape→portrait recut of Rowen
8 was trialled for Kind words and killed on sight): use frames at their
NATIVE orientation — if a slot needs a portrait mockup, export a
portrait-composed frame; never recut a landscape one. Phone screens need
the ROUNDED-RECT MASK on the capture (blend: dest-in) — laptop screens
don't.

The pairing is deliberate: portrait in the cover, landscape in the back
cover, same room, same suite — one photographic decision, not two images.

## Content rules

- The screen carries a REAL client site (currently the Dr Yalda desktop
  capture, `public/assets/desktops/dr-yalda-jamali.png`). Never lorem, never
  a stranger's work. The plate is CONTENT: `loading="eager"` in the hero,
  real descriptive alt naming the client, never `aria-hidden`.
- Plates are photography of devices IN A ROOM — not CSS chrome. Anyone
  reaching for `BrowserMockup` on the homepage: don't (Selected work's bare
  16:10 frames are the de-chromed screen mockup).

## Composite recipe (sharp, via node_modules — no ImageMagick on this Mac)

⚠ **Bake the base COMPLETELY first (crop + grade + resize → buffer), then
composite in the FINAL coordinate space.** sharp applies `.composite()`
AFTER `.extract()` AND `.resize()` regardless of call order — compositing
in source coordinates then cropping/resizing lands the capture in the
wrong place at the wrong scale (both variants of this bug have now been
shipped once each, 2026-07-10 — crop-shift on the hero plate, resize-scale
on the contact plate).

```js
// 1. Crop the frame to its canon ratio → buffer.
// 2. WARM GRADE the room: .linear([1.015, 1.0, 0.955], [0,0,0]) — the
//    suite's photographed blacks are camera-neutral (#1c1c1d, B ≥ R); the
//    grade pushes them to the ink's R>B cast (#1c1710 direction) so the
//    plates sit tonally inside the page. Grade the BASE ONLY, before the
//    screen composite — the client's site stays true. Keep it gentle:
//    heavier grades cook the cream midtones. (2026-07-10: the client asked
//    whether the INK should derive from the table instead — no: the ink is
//    the parchment's shadow and the token never chases a stock asset; the
//    photo obeys the brand.)
// 3. Resize the site capture to the screen's inset rect, rotate to match
//    the screen's tilt (transparent background), composite at the screen
//    quad's centroid in CROPPED coords, −4px optical.
// 4. Export JPEG q85 mozjpeg.
```

Measured geometry (1000px-wide exports; re-measure if re-exported larger —
scale linearly):

- **Rowen 5** (1000×1500 source): crop `top:190, 1000×1250`. Screen quad
  (source coords) TL(230,819) TR(748,808) BR(750,1175) BL(232,1187) →
  capture `resize(500,350,cover)`, `rotate(-1.2)`, centroid (490, 807)
  in cropped coords.
- **Rowen 8** (1000×667 source): crop `top:30, 1000×625`. Screen quad
  TL(428,190) TR(693,185) BR(692,363) BL(432,370) → capture
  `resize(254,164,cover)`, `rotate(-1.08)`, centroid (561, 247) in cropped
  coords.

Verify by extracting + upscaling the screen region and eyeballing: the
site's announcement bar must sit at the glass's top edge, the black bezel
must show no capture spill.

## Layout invariants (the reason round five lived)

- Hero plate top = `calc(var(--masthead-line) + 0.75rem)` — the globals
  token, never a copied clamp. Bottom/right lock to the deck row and shell
  edge. Any future hero image must OCCUPY LEFTOVER SPACE, never take it
  from the masthead or the fold.
- Close plate: static, never overlapping — the close is the back cover.
- Mobile: both plates in flow, 3/5 width, right-anchored; the phone
  LogoStrip-below-fold cost is accepted and recorded in CLAUDE.md.
