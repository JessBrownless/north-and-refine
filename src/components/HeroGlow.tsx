/**
 * HERO GLOW — the warm gradient ground SHARED by every hero (2026-07-20, client:
 * "make the heroes consistent… a bit of gradient blend… they don't look like
 * they're from the same website"). One source for the homepage 1D hero and the
 * interior PageHeroes so they read as one site. Renders the warm glow blobs +
 * vignette as absolute, pointer-events-none layers; the parent must be
 * position:relative + overflow:hidden and set the warm base (--ink-canvas /
 * bg-ink-canvas — the token exists for exactly these parents), with content
 * above on its own z-index.
 *
 * `intensity` scales blob opacity: 1 = the full homepage ground; ~0.7 = the
 * quieter interior heroes ("a bit of blend", not the full wash).
 *
 * NOTE: a "less muddy" lift (lighter dark blob + softer vignette) was trialled
 * 2026-07-20 and REVERTED the same day — the client kept the deeper ground: the
 * darker vignette gives white elements (the logo, nav) the contrast they need.
 * These are the original values; don't lighten without checking logo contrast.
 */
/**
 * THE ONE GROUND DOSE — every page ground that renders a HeroGlow reads this
 * number (PageHero, SharedCanvas, and through it the homepage and /about).
 * Dose history, every step a client call: heroes 0.85 → 0.6 ("a bit much",
 * 2026-07-24) → 0.4 ("wayyyyyy too powerful", 2026-08-08) → 0.25 ("knock the
 * glow back across the whole site — it's still too much!!", same day). It is
 * exported as ONE constant because the first three trims were chased
 * per-consumer; the next one is a one-number edit. The ContactCTA close card
 * deliberately does NOT read it — a card's gradient is its content, and at
 * ground dose it would be a flat dark plate; it keeps its own contained dose
 * (0.5 since the sitewide knock-back).
 */
export const GROUND_GLOW_INTENSITY = 0.25;

export default function HeroGlow({
  intensity = 1,
  topLeft = 1,
  vignette = 1,
}: {
  intensity?: number;
  /** Extra multiplier on the TOP-LEFT champagne pool alone (2026-07-24,
      client: "really decrease the opacity of the top left gradient on the
      services page hero") — the interior PageHero passes a low value so the
      pool behind the H1 quietens; the homepage, the /about canvas and the
      CTA card keep the full pool. */
  topLeft?: number;
  /** Multiplier on the VIGNETTE alone (2026-08-01). `intensity` scales the
      blobs only, so turning the glow down on its own makes a ground flatter,
      not darker — the edges stay exactly as lit as the middle. The knob exists
      because the Start-a-project overlay wanted the opposite of a hero (quiet
      blobs, DEEP corners): >1 pulls the edges toward black and holds the eye
      in the middle.
      ⚠ PARKED — that overlay went LIGHT the same day (see
      docs/briefs/start-project-overlay.md), so nothing passes this today and
      every hero renders exactly as it did before the prop existed. Do not
      raise it on a page ground, where the corners carry content. */
  vignette?: number;
}) {
  return (
    <>
      {/* The champagne pool takes the TOKEN (2026-08-05): a glow may keep a
          raw value the system has no word for (#8A5A2E below), but never a
          duplicate of one it does — see the adjudication rule in globals.css. */}
      <div aria-hidden style={{ position: "absolute", left: "-12%", top: "-24%", width: "62%", height: "68%", borderRadius: "50%", background: "var(--champagne)", opacity: 0.5 * intensity * topLeft, filter: "blur(130px)", pointerEvents: "none", transform: "translateZ(0)" }} />
      <div aria-hidden style={{ position: "absolute", right: "-15%", top: "-13%", width: "57%", height: "66%", borderRadius: "50%", background: "#8A5A2E", opacity: 0.55 * intensity, filter: "blur(140px)", pointerEvents: "none", transform: "translateZ(0)" }} />
      <div aria-hidden style={{ position: "absolute", left: "30%", bottom: "-28%", width: "62%", height: "56%", borderRadius: "50%", background: "#3E2E1C", opacity: 0.85 * intensity, filter: "blur(120px)", pointerEvents: "none", transform: "translateZ(0)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none",
          transform: "translateZ(0)", background: `radial-gradient(120% 90% at 50% 18%, transparent 42%, rgba(10,8,6,${Math.min(0.55 * vignette, 0.95)}) 100%)` }} />
    </>
  );
}
