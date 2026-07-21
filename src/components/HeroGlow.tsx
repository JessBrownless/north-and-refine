/**
 * HERO GLOW — the warm gradient ground SHARED by every hero (2026-07-20, client:
 * "make the heroes consistent… a bit of gradient blend… they don't look like
 * they're from the same website"). One source for the homepage 1D hero and the
 * interior PageHeroes so they read as one site. Renders the warm glow blobs +
 * vignette as absolute, pointer-events-none layers; the parent must be
 * position:relative + overflow:hidden and set the warm base (#16110C), with
 * content above on its own z-index.
 *
 * `intensity` scales blob opacity: 1 = the full homepage ground; ~0.7 = the
 * quieter interior heroes ("a bit of blend", not the full wash).
 *
 * NOTE: a "less muddy" lift (lighter dark blob + softer vignette) was trialled
 * 2026-07-20 and REVERTED the same day — the client kept the deeper ground: the
 * darker vignette gives white elements (the logo, nav) the contrast they need.
 * These are the original values; don't lighten without checking logo contrast.
 */
export default function HeroGlow({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <div aria-hidden style={{ position: "absolute", left: "-12%", top: "-24%", width: "62%", height: "68%", borderRadius: "50%", background: "#C2A878", opacity: 0.5 * intensity, filter: "blur(130px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", right: "-15%", top: "-13%", width: "57%", height: "66%", borderRadius: "50%", background: "#8A5A2E", opacity: 0.55 * intensity, filter: "blur(140px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", left: "30%", bottom: "-28%", width: "62%", height: "56%", borderRadius: "50%", background: "#3E2E1C", opacity: 0.85 * intensity, filter: "blur(120px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 18%, transparent 42%, rgba(10,8,6,0.55) 100%)" }} />
    </>
  );
}
