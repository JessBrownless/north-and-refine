import { GraphicScaler, MONO, SANS } from "./shared";

/**
 * GRAPHIC 09 — the SERVICES HERO (2026-07-31), ported live from the client's
 * Website Graphics design doc. Replaces the exported PNG
 * (public/services-hero-square.png, ~1.7MB) in the /services masthead's
 * media slot: same composition, but DOM — crisp at every density, live type,
 * and the ember-ramp gradient comes straight from the tokens.
 *
 * THE COMPOSITION: the square ember crop (the ONE ember-ramp image on the
 * page, per the ramp contract — gradient runs ember-deep → ember-burnt →
 * champagne/bone blooms) carrying the depicted Lumen phone with the bound
 * portrait, and THREE FROSTED GLASS PANELS floating over its edges
 * (`.glass-float` — the dark-polarity house glass; see globals.css for why
 * the bone-wash recipe this file used to inline was retired) — the h1
 * markup, the SEO meta preview, the clinic schema:
 * web → search → schema, the studio's disciplines signed in artefacts.
 * The depicted schema is UK-FIRST (2026-08-01, the design-system rule:
 * reader-facing vocabulary is never American even when it depicts code) —
 * MedicalClinic + PlasticSurgery, both real schema.org vocabulary, replaced
 * the design doc's Physician/FacialSurgery.
 *
 * Panels are RE-SEATED from the design's 1180-wide canvas onto a 760×800
 * compact canvas so the composition survives the hero's ~620px media column
 * (the design's placements assumed a full-page canvas; at hero scale its
 * panel type fell below legibility). Two panels ride the sanctioned float
 * utilities (the tile-fragment precedent); reduced-motion stills them.
 *
 * ⚠ The depicted practice is the standing "Lumen" mock — same pre-launch
 * confirmation item as the PNG it replaces.
 */

/* THE PANEL MATERIAL NOW LIVES IN THE DESIGN SYSTEM (2026-08-02): the
   `.glass-float` recipe in globals.css, per the handoff's "frosted glass
   panels must read as FLOATING, not stuck on". What changed from the values
   this file used to inline, and why each move matters:
     · fill  bone 7% → ink 38%  — a POLARITY FLIP. The bone wash lightened
       the ember crop behind it, so bone type sat on a raised light ground
       and the panel read as printed ON the image. An ink wash darkens what
       is behind it, so the type gains contrast and the panel reads as a
       thing in front.
     · rim   bone 16% → bone 24%, and the flat 0 30px 60px shadow becomes
       the three-part stack (broad lift + contact + inset top highlight).
       The contact shadow and the lit top edge are what actually sell
       "floating"; the old single soft shadow just tinted the ground.
   Only POSITION stays here — placement is the composition's business, and
   these panels deliberately overhang the phone (z-index 3, and nothing in
   the scaler clips them).

   THE PANELS ANIMATE IN (2026-08-02, client: "the glassy bits animate in"):
   `.reveal` on each panel, staggered 140 / 300 / 460ms, so the crop lands
   first and the glass arrives over it in reading order — markup, then the
   search result, then the schema. Three reasons it is `.reveal` and not a
   keyframe: it is the house scroll-entrance and this graphic sits at the
   fold, where a load-in would fire off-screen on a short viewport; it is a
   TRANSITION to a static end state, so it cannot strand invisible the way
   an `opacity-0` + keyframe can (the overlay's own bug); and it touches
   OPACITY ONLY, which is what lets it coexist with the float animations on
   two of these panels — a keyframe entrance would fight the float for the
   `animation` shorthand and one of them would lose.
   The fade is doing more here than on type: the panel's backdrop blur fades
   up with it, so the ground behind genuinely frosts over rather than
   cutting in. Reduced motion snaps them visible and stills the float. */
const GLASS: React.CSSProperties = {
  position: "absolute",
  zIndex: 3,
};

export default function ServicesHeroGraphic({ className }: { className?: string }) {
  return (
    <GraphicScaler
      width={760}
      height={800}
      className={className}
      label="A clinic website shown on a phone against a warm ember ground, with floating panels of page markup, a search result preview and clinic schema — web design by North & Refine"
    >
      <div style={{ width: "100%", height: "100%", position: "relative", fontFamily: SANS }}>
        {/* THE SQUARE CROP — the ember-ramp image (contained imagery only). */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 60,
            width: 600,
            height: 600,
            borderRadius: 28,
            overflow: "hidden",
            background:
              "radial-gradient(120% 90% at 78% 88%,rgba(244,237,223,.8) 0%,rgba(216,198,164,.38) 30%,transparent 58%),radial-gradient(90% 70% at 18% 12%,rgba(216,198,164,.5) 0%,transparent 52%),linear-gradient(150deg,var(--ember-deep) 0%,var(--ember-burnt) 38%,#A8511E 64%,var(--ember-burnt) 100%)",
            boxShadow: "0 50px 100px -34px rgba(94,31,10,.65),inset 0 0 0 1px rgba(244,237,223,.1)",
            zIndex: 1,
          }}
        >
          <div style={{ position: "absolute", left: "8%", bottom: "2%", width: 520, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(244,237,223,.55),rgba(216,198,164,.28) 46%,transparent 72%)", filter: "blur(46px)" }} />
          <div style={{ position: "absolute", left: "56%", top: "12%", width: 360, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(216,198,164,.4),transparent 68%)", filter: "blur(44px)" }} />
          {/* The depicted phone */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 300, height: 556, background: "linear-gradient(160deg,#242426,var(--ink))", borderRadius: 44, padding: 12, boxShadow: "0 50px 90px -30px rgba(0,0,0,.55),0 0 0 1px rgba(244,237,223,.06)" }}>
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(175deg,#221510 0%,#120D0B 46%,var(--ink) 100%)", borderRadius: 33, overflow: "hidden", position: "relative" }}>
              {/* portrait fills the screen (the design project's bound slot) */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3A2418,#17100C 78%)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/graphics/hero-phone-face.webp"
                  alt=""
                  loading="eager"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* cinematic grade over the portrait */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(17,14,10,.55) 0%,rgba(17,14,10,0) 26%,rgba(17,14,10,0) 44%,rgba(17,14,10,.92) 78%,var(--ink) 100%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 102, height: 23, background: "#000", borderRadius: 12, zIndex: 4 }} />
              {/* depicted nav */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "44px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 3, pointerEvents: "none" }}>
                <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: ".18em", color: "var(--bone)" }}>LUMEN</span>
                <span style={{ color: "var(--bone)", fontSize: 16, opacity: 0.85 }} aria-hidden>≡</span>
              </div>
              {/* depicted copy over the fade */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 22px 24px", zIndex: 3, pointerEvents: "none" }}>
                <p style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--champagne)", margin: 0 }}>Harley Street</p>
                <h4 style={{ fontWeight: 500, fontSize: 26, lineHeight: 1.1, letterSpacing: "-.025em", color: "var(--bone)", margin: "10px 0 0" }}>
                  The art of subtle transformation.
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                  <span style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--champagne)", color: "var(--ink)", borderRadius: 9999, padding: "12px 0", fontSize: 10, fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>
                    Book a consult
                  </span>
                  <span style={{ width: 40, height: 40, flex: "none", borderRadius: "50%", border: "1px solid rgba(244,237,223,.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bone)", fontSize: 14 }} aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* frosted panel: live HTML */}
        <div className="glass-float reveal animate-float-slow" style={{ ...GLASS, transitionDelay: "140ms", left: 0, top: 96, width: 302, padding: "22px 24px", fontFamily: MONO, fontSize: 15, lineHeight: 1.75, color: "var(--bone-dim)" }}>
          <div style={{ color: "var(--clay)" }}>&lt;main&gt;</div>
          <div style={{ paddingLeft: 16 }}>&lt;h1&gt;Facial Aesthetics&lt;/h1&gt;</div>
          <div style={{ color: "var(--clay)" }}>&lt;/main&gt;</div>
        </div>

        {/* frosted panel: SEO meta preview (static — the composition's anchor) */}
        <div className="glass-float reveal" style={{ ...GLASS, transitionDelay: "300ms", right: 0, top: 300, width: 366, padding: "26px 28px" }}>
          <div style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.28, color: "var(--bone)", letterSpacing: "-.01em" }}>
            Lumen Aesthetics | Rhinoplasty &amp; Facial Surgery, London
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "var(--champagne)", marginTop: 14 }}>lumenaesthetics.co.uk</div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--bone-dim)", marginTop: 14, WebkitMaskImage: "linear-gradient(180deg,#000 45%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 45%,transparent 100%)" }}>
            Award-winning consultant surgeons specialising in natural-looking rhinoplasty and advanced facial aesthetics in the heart of London.
          </div>
        </div>

        {/* frosted panel: schema JSON */}
        <div className="glass-float reveal animate-float-slower" style={{ ...GLASS, transitionDelay: "460ms", left: 36, bottom: 20, width: 378, padding: "22px 26px", fontFamily: MONO, fontSize: 14.5, lineHeight: 1.8, color: "var(--bone-dim)", animationDelay: "1.2s" }}>
          <div style={{ color: "var(--clay)" }}>{"{"}</div>
          <div style={{ paddingLeft: 16 }}>
            <span style={{ color: "var(--champagne)" }}>&quot;@type&quot;</span>: &quot;MedicalClinic&quot;,
          </div>
          <div style={{ paddingLeft: 16 }}>
            <span style={{ color: "var(--champagne)" }}>&quot;medicalSpecialty&quot;</span>: &quot;PlasticSurgery&quot;
          </div>
          <div style={{ color: "var(--clay)" }}>{"}"}</div>
        </div>
      </div>
    </GraphicScaler>
  );
}
