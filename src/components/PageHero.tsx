import Link from "next/link";
import HeroGlow from "@/components/HeroGlow";

interface PageHeroProps {
  overline?: string;
  title: React.ReactNode;
  lede?: string;
  /** Optional primary CTA. HERO-CTA POLICY (settled 2026-07-16): commercial
      pages only — /services, /pricing and the industries pages carry one;
      /work, /blog and /about stay button-free (the nav and the ContactCTA
      close carry theirs). */
  cta?: { label: string; href: string };
  /** Small meta line under the lede (e.g. breadcrumb-style context). */
  meta?: string;
  /** THE GRAPHIC SLOT (2026-07-16, client's call: "write space for nice
      graphics into the hero sections"). Split mode only. When present the
      split re-seats: the full text stack (kicker, heading, lede, actions)
      holds cols 1–6 and the media node rides cols 8–12, vertically centred
      in the band — the lede moves under the heading since the right columns
      are now the graphic's. The node styles itself (ratio, frame or none);
      brand GRAPHICS run at their native ratio — they're artwork/marks, not
      photography, so the 16:10 / 4:5 imagery canon doesn't apply to them.
      Load-in rides animate-fade-in-slow. Omit it and the split stays the
      text-only asymmetric masthead — pages whose imagery arrives directly
      below the hero (/work's grid, /about's scene band) should stay
      text-only on purpose. */
  media?: React.ReactNode;
  /**
   * Hero layout. THE SPLIT IS THE CANONICAL INTERIOR MASTHEAD (settled
   * 2026-07-16 — the client unified every interior page on it):
   * - "split": the SPACIOUS ASYMMETRIC hero (born on /blog 2026-07-12) — the
   *   display heading holds the left columns, the lede sits in the right
   *   columns locked to the heading's LAST baseline. Heavy title top-left,
   *   light subtitle bottom-right: asymmetric balance, built for air. Pair
   *   with `spacious` + `borderBottom` (the standard interior recipe).
   * - "left" / "center": legacy layouts, kept for completeness (the classic
   *   stacked masthead and the centred manifesto). No live consumers as of
   *   2026-07-16 — reach for split first.
   */
  align?: "left" | "center" | "split";
  /** "light" = a BONE hero: flat scene-warm ground, ink type, clay kicker,
      `text-ink-dim` lede (the on-light ladder), the light primary pill, and
      NO grain (grain is a dark-hero texture). The route MUST be registered
      in Navbar's LIGHT_TOP_ROUTES or the nav renders bone-on-bone. Default
      "dark". (No live consumers since /blog went back to ink, 2026-07-16.) */
  tone?: "dark" | "light";
  /** Extra-generous vertical padding + a taller min-vh band — air is the
      luxury. Part of the standard interior recipe. */
  spacious?: boolean;
  /** Close the hero with a hairline at its bottom edge (tone-aware,
      content-width — the shared rail, matching the editorial row rules, not
      the full-bleed nav chrome). Part of the standard interior recipe. */
  borderBottom?: boolean;
  /** Drop the film-grain texture on a DARK hero (default true — every dark
      hero is grained). Set false where the hero sits directly on top of
      another flat-ink section: the 4% grain lifts the black just enough to
      read as a lighter "different black" at the seam (2026-07-13, /work —
      the text hero flows straight into the work grid, so both must be ONE
      continuous flat ink). No effect on light heroes (grain is dark-only). */
  grain?: boolean;
}

/**
 * Canonical hero for interior pages. Dark by default, grain-textured. Extend
 * this via props rather than spawning HeroX variants. The homepage composes
 * its own bespoke hero (the three-section hero, 2026-07-16); every other
 * top-level page opens with the split recipe:
 *
 *   <PageHero align="split" spacious borderBottom ... />
 *
 * Detail pages (/work/[slug], /blog/[slug]) are ARTICLE HEADERS, not
 * mastheads — they keep their own openers and only share the load-in system.
 *
 * 2026-07-16 sweep (the hero-cohesion pass): the experimental `glow` prop
 * (anti-canon gradient-blur, evaluated on /blog) and the old left-mode
 * `aside` column were REMOVED; the split gained the `media` GRAPHIC SLOT
 * (see its prop note) so visual interest enters through one designed seam.
 * 2026-07-10 rules still hold: (1) sits on .shell — ONE
 * RAIL SITEWIDE. (2) Load-in is opacity-0 + animate-fade-in with
 * animationDelay staggers — heroes are first-paint content, never
 * IntersectionObserver sections. (3) CTA/meta row locks baselines, not boxes.
 */
export default function PageHero({
  overline,
  title,
  lede,
  cta,
  meta,
  media,
  align = "left",
  tone = "dark",
  spacious = false,
  borderBottom = false,
  grain = true,
}: PageHeroProps) {
  const light = tone === "light";
  const centered = align === "center";
  const split = align === "split";
  // Tone-aware bottom hairline. In the split hero it rides an inner
  // CONTENT-WIDTH wrapper (so it aligns with the section rules below, not the
  // shell border-box which would overhang by the shell padding).
  const shellBorder = borderBottom
    ? light
      ? " border-b rule-light"
      : " border-b rule-dark"
    : "";

  // Tone-dependent colours. The dark path reproduces the pre-tone strings
  // exactly, so the untouched interior pages render unchanged.
  const h1Color = light ? "text-ink" : "text-bone";
  const ledeColor = light ? "text-ink-dim" : "text-bone-dim";
  // text-ink-mute = the on-light meta tier (~5.0:1 AA on bone).
  const metaColor = light ? "text-ink-mute" : "text-clay";

  // Dark heroes now carry the WARM GRADIENT GROUND (2026-07-20, client: "the
  // heroes need a bit of gradient blend — they don't look like the same site").
  // Same warm base + <HeroGlow> the homepage 1D hero uses. `grain` still layers
  // its film texture over it if set.
  const sectionCls = light
    ? "relative scene-warm overflow-hidden"
    : `relative overflow-hidden bg-[#16110C]${grain ? " grain" : ""}`;
  const heroGlow = light ? null : <HeroGlow intensity={0.85} />;
  // The nav is IN FLOW (2026-07-12), so hero padding is pure, SYMMETRIC
  // top/bottom air. Set freely per page; no nav-height math anywhere.
  const padY = spacious ? "py-24 md:py-36" : "py-16 md:py-24";

  const overlineEl = overline ? (
    <p className={`overline ${light ? "text-clay " : ""}opacity-0 animate-fade-in`}>{overline}</p>
  ) : null;

  // Split heroes take the DISPLAY register (the luxury moment); every other
  // hero stays heading-xl (THE LADDER: interior H1s are moments, display is
  // the grand editorial tier).
  const h1Size = split ? "display" : "heading-xl";
  const h1El = (
    <h1
      className={`${h1Size} ${h1Color}${overline ? " from-overline" : ""}${
        centered ? " mx-auto max-w-[24ch]" : ""
      }${centered || split ? " text-balance" : ""} opacity-0 animate-fade-in`}
      style={{ animationDelay: "0.1s" }}
    >
      {title}
    </h1>
  );

  const actionsEl =
    cta || meta ? (
      <div
        className={`mt-10 flex flex-wrap items-baseline gap-6 opacity-0 animate-fade-in${
          centered ? " justify-center" : ""
        }`}
        style={{ animationDelay: "0.45s" }}
      >
        {cta && (
          <Link
            href={cta.href}
            className={`btn ${light ? "btn-primary-light" : "btn-primary-dark"}`}
          >
            {cta.label}
            <span aria-hidden>→</span>
          </Link>
        )}
        {meta && <p className={`label ${metaColor}`}>{meta}</p>}
      </div>
    ) : null;

  // SPLIT: the spacious asymmetric masthead. A min-vh band with the type
  // vertically centred in generous air (2026-07-12, client direction across
  // rounds). The DISPLAY heading holds cols 1–7 (span 7, FLUSH LEFT on the
  // rail), the lede cols 9–12 locked to the heading's LAST baseline, col 8
  // the gutter. Span 7 (not 6) keeps a MEDIUM display title on TWO lines at
  // the client's 1470px laptop. LEFT-ALIGNED at every width (mobile centring
  // read dead); the split + baseline lock engage at md. Mobile min-h is
  // shorter so the stack doesn't float in dead space on a phone.
  if (split) {
    // Optical balance is FREE: the nav is in flow (no overlap), so SYMMETRIC
    // padding + items-center centres the type in the band with equal air
    // above and below. Both the min-vh band height and the py were dialled
    // DOWN 2026-07-13 at the client's call.
    const splitBox = spacious
      ? "min-h-[48vh] py-20 md:min-h-[56vh] md:py-28"
      : "min-h-[40vh] py-16 md:min-h-[46vh] md:py-20";

    // SPLIT + MEDIA: the graphic variant. Text stack cols 1–6 (the lede
    // joins the left column), the media node cols 8–12, vertically centred
    // against the text — col 7 the gutter.
    if (media) {
      return (
        <section className={sectionCls}>
        {heroGlow}
          <div className="shell relative z-10 pt-28 md:pt-44">
            <div className={`flex items-center ${splitBox}${shellBorder}`}>
              <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
                <div className="md:col-span-6">
                  {overlineEl}
                  {h1El}
                  {lede && (
                    <p
                      className={`lede body-lg ${ledeColor} max-w-[46ch] opacity-0 animate-fade-in`}
                      style={{ animationDelay: "0.25s" }}
                    >
                      {lede}
                    </p>
                  )}
                  {actionsEl}
                </div>
                <div
                  className="opacity-0 animate-fade-in-slow md:col-span-5 md:col-start-8"
                  style={{ animationDelay: "0.35s" }}
                >
                  {media}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className={sectionCls}>
        {heroGlow}
        {/* .shell provides width + horizontal padding only; the inner wrapper
            (content width) carries the min-vh, the vertical centring and the
            bottom hairline — so the rule lands at content width, aligned with
            the section rules below. */}
        <div className="shell relative z-10 pt-24 md:pt-32">
          <div className={`flex items-center ${splitBox}${shellBorder}`}>
            {/* MOBILE gap-6 (24px) = the canonical .lede heading→subtitle
                spacing: on the single-column stack the row gap is the
                heading↔lede distance, so it must match the lede system, not
                the wider desktop column gap-8 (which only ever acts
                horizontally, the lede being baseline-locked at md). */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:[align-items:last_baseline] md:gap-8">
              <div className="md:col-span-7">
                {overlineEl}
                {h1El}
                {actionsEl}
              </div>
              {lede && (
                <p
                  className={`body-lg ${ledeColor} max-w-[46ch] opacity-0 animate-fade-in md:col-span-4 md:col-start-9`}
                  style={{ animationDelay: "0.25s" }}
                >
                  {lede}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = (
    <div className={centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      {overlineEl}
      {h1El}
      {lede && (
        <p
          className={`lede ${centered ? "body-xl" : "body-lg"} ${ledeColor} opacity-0 animate-fade-in${
            centered ? " mx-auto" : ""
          }`}
          style={{ animationDelay: "0.25s" }}
        >
          {lede}
        </p>
      )}
      {actionsEl}
    </div>
  );

  return (
    <section className={sectionCls}>
        {heroGlow}
      <div className={`shell ${padY} relative z-10${shellBorder}`}>{content}</div>
    </section>
  );
}
