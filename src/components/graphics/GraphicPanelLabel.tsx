import { MONO } from "./shared";

/**
 * GRAPHIC PANEL LABEL — the kicker inside a frosted graphic panel. Extracted
 * 2026-08-05 from the local `PanelLabel` in ServicesTiles.tsx, which was the
 * only home the graphics set had for it.
 *
 * COMPOSES: the kicker voice (Geist Mono via `MONO`) · tracked caps at 0.2em ·
 * the champagne family · sized in the graphic's own pixels. It is `.overline`
 * spoken at graphic scale, and every one of those words is the reason it is a
 * component rather than the utility.
 *
 * WHY IT CANNOT JUST BE `.overline`. The utility is a PAGE-scale decision:
 * 11px at 0.24em with line-height 1.4 and a bone default, tuned to sit above a
 * heading in the shell. Inside a graphic none of that survives contact.
 * `GraphicScaler` lays a composition out at its native size and transform-
 * scales the whole plate to the container, so every px inside is a px of the
 * ARTWORK'S coordinate space and shrinks with it: an 11px utility dropped into
 * the 900-wide tiles renders at about 7.5px in the /services rows, and it
 * would keep its page-scale proportions while the panel around it scaled by a
 * different logic. Type inside artwork has to be drawn to the artwork, which
 * is also what keeps the live panels registered to the raster plate under
 * them. And the colour is wrong either way round: the kicker is bone on the
 * page (gold at 11px tracked caps reads brassy, 2026-07-09) and champagne
 * inside the graphics, where it is an ornament on a photograph rather than
 * label type on a ground.
 *
 * WHY `size` IS A PROP AND NOT DERIVED FROM THE CANVAS. Tempting, because the
 * canvas is the thing that sets the scale, but it does not survive the first
 * example: 9px and 10px coexist on the SAME 900x600 tile, one panel apart.
 * The size is a compositional call about how loud a label is next to the mark
 * beside it, not arithmetic on the canvas width, so the graphic makes it. The
 * unit is the graphic's own px, exactly as the design doc specifies it.
 *
 * TONE IS A PROP, NEVER A FORK — the FaqSection precedent, applied to the only
 * ground distinction the graphics set actually has:
 *   "glass"  (default) champagne-soft, for a label on `.glass-float` over
 *            imagery, where the softer gold holds against the ink wash.
 *   "screen" full champagne, for a kicker inside a DEPICTED bone plate or
 *            phone screen, where the label is brighter because the surface is.
 * ⚠ "screen" is PARKED: no consumer today. It exists because the champagne /
 * champagne-soft split is live in the graphics set right now, not because a
 * future might want it, and it names the four instances waiting for it: the
 * two kickers in showcases.tsx (11px/0.22em "What we do", 11px/0.22em
 * "Mobile-first", 10px/0.18em "Step 1 of 3") and the depicted Harley Street
 * kicker on the ServicesHeroGraphic phone (9.5px/0.22em). All four sit at a
 * tracking this molecule does not offer, which is the actual finding: the
 * graphic kicker is drawn at 0.18em, 0.2em and 0.22em depending on which
 * afternoon it was ported. Folding them in is a decision about which tracking
 * is right, not a prop, so it waits for the sweep that can move pixels.
 *
 * There is no light-ground tone. Champagne on bone is 1.8:1 and cannot carry
 * anything the reader must read; where a graphic needs a kicker on a bone
 * PLATE it is depicted ornament inside the artwork, which is what "screen"
 * covers. Do not invent an ink tone here without a real graphic asking for it.
 *
 * REPLACED: the five hand-rolled labels in ServicesTiles.tsx (Site health,
 * Enquiries, Next available, Typeface, Layers).
 */
export default function GraphicPanelLabel({
  children,
  size = 9,
  tone = "glass",
}: {
  children: React.ReactNode;
  /** Size in the GRAPHIC'S OWN pixels, scaled with the plate. 9 is the tile
      default; 10 where a panel gives the label room. */
  size?: number;
  /** The surface under the label, not the page's ground. See above. */
  tone?: "glass" | "screen";
}) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: tone === "screen" ? "var(--champagne)" : "var(--champagne-soft)",
      }}
    >
      {children}
    </div>
  );
}
