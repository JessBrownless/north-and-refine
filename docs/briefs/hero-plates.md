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

⚠ **Crop FIRST, composite SECOND.** sharp applies `.composite()` AFTER
`.extract()` regardless of call order — compositing in source coordinates
then cropping shifts the screen capture down by the crop offset (this bug
shipped once, 2026-07-10, caught by the client's eye).

```js
// 1. Crop the frame to its canon ratio → buffer.
// 2. Resize the site capture to the screen's inset rect, rotate to match
//    the screen's tilt (transparent background), composite at the screen
//    quad's centroid in CROPPED coords, −4px optical.
// 3. Export JPEG q85 mozjpeg.
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
