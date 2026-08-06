/**
 * THE DOUBLE REAM (2026-07-23, client's call, replacing the 1a comp's
 * full-bleed Rowen scene band) — two staggered, edge-cropped rows of rounded
 * tiles serving as a hero's visual half. Each tile is a pane with a blank
 * device rising from its foot and cropping there: the tile is the frame, the
 * screen stays blank while imagery is being rechosen (the same call as the
 * homepage hero).
 *
 * ⚠ IT CARRIES NO GROUND OF ITS OWN, ON PURPOSE. Per-tile gradients were CUT
 * the same day at the client's call: the SECTION ground carries the gradient,
 * like the other pages' SectionGlow grounds, and the tiles let it read
 * through. Render it inside <SharedCanvas> (or any wrapper that owns
 * base + glow + grain); on a flat ground the panes read as holes rather than
 * windows cut into a warm canvas.
 *
 * TILE COLOUR, in three revisions of one day: dark glass → "make the
 * background lighter" (the .card-glass bone lift) → "try pure black". Solid
 * pure black won, and the devices contrast via their own WHITE BEZEL BORDER
 * rather than by the card behind them.
 *
 * SIZING: six larger tiles per row ≈ 170vw (same-day revision: six SHOWING
 * per row read as too many, so the tiles grew and ~3–4 sit in view). Each row
 * therefore always overflows and crops at the screen edges, like the homepage
 * device row. The second row shifts the device pattern AND slides the
 * opposite way, so the two reams read as a staggered contact sheet, not a
 * grid.
 *
 * Purely decorative, so the whole band is aria-hidden. It is first-paint
 * content, so it rides the LOAD-IN system (`animate-fade-in-slow`, continuing
 * the hero's stagger) rather than `.reveal`.
 */

function BlankPhone() {
  return (
    <div
      style={{
        position: "relative",
        width: "34%",
        aspectRatio: "320 / 680",
        background: "#060607",
        // White bezel edge (2026-07-23, with the pure-black tiles): the
        // device contrasts against the black pane by its own rim.
        border: "1px solid #FFFFFF",
        borderRadius: "clamp(14px,1.4vw,24px)",
        padding: "clamp(3px,0.3vw,5px)",
        boxShadow: "0 30px 60px -18px rgba(0,0,0,0.55)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(7px,0.7vw,12px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(24px,2.4vw,40px)",
          height: "clamp(7px,0.7vw,12px)",
          background: "#000",
          borderRadius: "999px",
          zIndex: 2,
        }}
      />
      <div style={{ width: "100%", height: "100%", borderRadius: "clamp(11px,1.15vw,20px)", background: "#121112" }} />
    </div>
  );
}

function BlankLaptop() {
  return (
    <div
      style={{
        width: "72%",
        background: "#060607",
        // White bezel edge — see BlankPhone.
        border: "1px solid #FFFFFF",
        borderRadius: "clamp(8px,0.8vw,14px)",
        padding: "clamp(4px,0.4vw,7px)",
        boxShadow: "0 30px 60px -18px rgba(0,0,0,0.55)",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "clamp(5px,0.5vw,9px)", background: "#121112" }} />
    </div>
  );
}

function MockupReam({ row }: { row: 0 | 1 }) {
  const tiles = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "clamp(12px,1.4vw,24px)",
        transform: row === 0 ? "translateX(-6vw)" : "translateX(6vw)",
      }}
    >
      {tiles.map((i) => {
        const phone = (i + row) % 2 === 0;
        return (
          <div
            key={i}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "max(280px, 27vw)",
              aspectRatio: "4 / 3",
              borderRadius: "clamp(18px,1.8vw,30px)",
              overflow: "hidden",
              // SOLID PURE BLACK (client, 2026-07-23, after white: "try pure
              // black") — the devices contrast via their WHITE BEZEL BORDER
              // instead of the card; the black panes read as windows cut
              // into the warm canvas.
              background: "#000000",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* Device rises from the tile's foot and crops there — the tile
                is the frame, the screen stays blank glass. */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                transform: phone ? "translateY(18%)" : "translateY(14%)",
              }}
            >
              {phone ? <BlankPhone /> : <BlankLaptop />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MockupReamBand({
  animationDelay = "0.45s",
}: {
  /** Where this lands in the host page's load-in stagger. The /about value
      continues the hero's sequence; it is composition, not decoration. */
  animationDelay?: string;
}) {
  return (
    <section aria-hidden className="relative">
      <div
        className="relative z-10 opacity-0 animate-fade-in-slow"
        style={{
          animationDelay,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px,1.4vw,24px)",
          // Modest air between the hero text and the tiles — same canvas,
          // so this is rhythm, not a seam.
          paddingBlock: "clamp(32px,5vh,72px) clamp(40px,6vw,80px)",
        }}
      >
        <MockupReam row={0} />
        <MockupReam row={1} />
      </div>
    </section>
  );
}
