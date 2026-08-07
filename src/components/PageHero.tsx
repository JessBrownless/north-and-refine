import Link from "next/link";
import HeroGlow, { GROUND_GLOW_INTENSITY } from "@/components/HeroGlow";

interface PageHeroProps {
  /** THE PAGE NAME, and it renders INSIDE the <h1> (2026-08-05). Pass what
      this page is called — "Work", "About", "Web design & build" — not a
      flavour line: the masthead's job is to name the page and then state its
      promise, and those are the two halves of one heading. A detail page
      names ITSELF rather than its section, which is why /services/web-design
      says "Web design & build" and not "Services". See `.with-overline` in
      globals.css for the markup rule and the reasoning. */
  overline?: string;
  /** The FEATURE-BENEFIT half of the H1 — what the page does for the reader,
      not what it is called (the overline already said that). Carries the
      accent-word <em> at the display register. */
  title: React.ReactNode;
  lede?: string;
  /** THE HERO PRIMARY, and it is ALWAYS THE GLASS PILL (2026-08-06, client:
      "add CTAs to all heroes where it makes sense and they should be glass as
      primary and text as secondary"). No variant prop: a hero CTA is glass,
      full stop. Glass is the right pill for this slot specifically because a
      hero is the one place on the site with a LIT GROUND behind the button —
      the warm HeroGlow — so the blur has something to do; the same pill on a
      flat section would be a sheet of glass over nothing.

      HERO-CTA POLICY (widened 2026-08-06, superseding the commercial-pages-
      only rule of 2026-07-16): /work and /about gained one, because someone
      reading either is evaluating the studio. Still button-free: /contact and
      /start-a-project, whose FORM is the close; /blog, where a pill competes
      with the reason the reader came; /privacy, which should not sell. */
  cta?: { label: string; href: string };
  /** THE SECOND ACTION — the ghost text link beside the primary (2026-08-06).
      Only where the page has a REAL onward step, never as a filler twin: a
      secondary saying "see the work" on /work is noise, so /work's says "How
      we work" instead. Renders `.btn-ghost`, the house tertiary, so its arrow
      turns champagne on hover rather than the whole link dimming. */
  ctaSecondary?: { label: string; href: string };
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
  /** Split only (2026-07-23, born on /work with the inline title chips): let
      the DISPLAY heading run the FULL rail (cols 1–12) instead of cols 1–7,
      with the lede dropping to a second row in the right columns. For pages
      whose H1 carries its own imagery or needs long-line energy — the
      narrow-column split wrapped it into short stacked lines against a dead
      right half at wide viewports. */
  wide?: boolean;
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
  /** THE SHARED-CANVAS ESCAPE HATCH (2026-07-23, born on /about): set false
      and the hero renders NO ground of its own — no bg, no HeroGlow, no seam
      strip, no overflow clip — so the PAGE can wrap the hero and its
      neighbour section in ONE relative/overflow-hidden canvas carrying ONE
      glow across both. For pages where the hero and the section below must
      be literally one surface (matching two separate gradients at a seam is
      brittle when the glow is still bright at the hero's foot). Dark tone
      only; the wrapper owns base colour, glow, grain and the fade to ink. */
  ground?: boolean;
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
  ctaSecondary,
  meta,
  media,
  align = "left",
  wide = false,
  tone = "dark",
  spacious = false,
  borderBottom = false,
  grain = true,
  ground = true,
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
    : ground
      ? `relative overflow-hidden bg-ink-canvas${grain ? " grain" : ""}`
      : "relative"; // shared canvas: the page's wrapper owns ground + clip
  const heroGlow = light || !ground ? null : (
    <>
      {/* THE ONE GROUND DOSE, read from HeroGlow's exported constant since
          the fourth trim (2026-08-08, "knock the glow back across the whole
          site — it's still too much!!") — the dose history and the reason it
          is one number now live on the constant itself. topLeft 0.3 holds
          from 2026-07-24 ("REALLY decrease the opacity of the top left
          gradient"). The vignette is untouched — depth stays, light drops. */}
      <HeroGlow intensity={GROUND_GLOW_INTENSITY} topLeft={0.3} />
      {/* THE SEAM ANCHOR (2026-07-23, client: hero and next section "need to
          almost be one"): the ground resolves to ONE FIXED TONE (#14100B) at
          the hero's foot, and SectionGlow's wash starts from exactly that
          tone on the other side of the boundary — matched colour, invisible
          seam. Change one, change both. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          height: "clamp(120px,18vh,220px)",
          background:
            "linear-gradient(180deg, rgba(20,16,11,0) 0%, #14100B 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
  // ⚠ The nav is ABSOLUTE + TRANSPARENT (the warm-glow era floats it over
  // the hero ground) — the old "nav in flow, no nav-height math" note here
  // was stale and cost a padding whiplash on 2026-07-24. Hero top padding
  // MUST include nav clearance (h-32 = 128px at md); judge air OPTICALLY
  // from the nav's foot. The split/media branches handle this themselves.
  const padY = spacious ? "py-24 md:py-36" : "py-16 md:py-24";

  // Split heroes take the DISPLAY register (the luxury moment); every other
  // hero stays heading-xl (THE LADDER: interior H1s are moments, display is
  // the grand editorial tier).
  const h1Size = split ? "display" : "heading-xl";
  const h1Base = `${h1Size} ${h1Color}${centered ? " mx-auto max-w-[24ch]" : ""}${
    centered || split ? " text-balance" : ""
  }`;

  // THE KICKER IS PART OF THE H1 (2026-08-05, client: "the overline on each
  // hero is actually part of the H1, but styled as an overline, and it mimics
  // the page name"). A masthead is one sentence in two registers — the page
  // naming itself, then what it does for the reader — so the H1 now says
  // both. The kicker was only ever a separate element because it needed
  // different type, and a <p> outside the heading meant the site's strongest
  // SEO signal never carried the page's own name. Full reasoning, and why the
  // gap is a flex `gap` rather than a margin, lives on `.with-overline` in
  // globals.css.
  //
  // The two children keep their SEPARATE entrances (kicker 0s, title 0.1s):
  // the h1 must not animate its own opacity, or it would multiply against the
  // children's and collapse the stagger the load-in system is built on.
  const h1El = overline ? (
    <h1 className={`${h1Base} with-overline`}>
      <span className={`overline${light ? " text-clay" : ""} opacity-0 animate-fade-in`}>
        {overline}
      </span>
      {/* ⚠ LOAD-BEARING SPACE. Without it the H1 extracts as "PrivacyWhat we
          collect" — the two spans sit adjacent in the HTML, so every consumer
          that reads text rather than boxes (crawlers, some screen readers)
          welds the last word of the kicker to the first word of the title,
          which would defeat the entire reason for moving the kicker in here.
          It costs nothing visually: a white-space-only text node in a flex
          container is explicitly NOT rendered as an anonymous flex item. */}{" "}
      <span
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        {title}
      </span>
    </h1>
  ) : (
    <h1
      className={`${h1Base} opacity-0 animate-fade-in`}
      style={{ animationDelay: "0.1s" }}
    >
      {title}
    </h1>
  );

  // THE HERO ACTION ROW (2026-08-06): glass primary, ghost secondary, both on
  // one baseline. The row already locks baselines rather than boxes, which is
  // what lets a 53px pill and an 11px tracked link sit together without a
  // nudge — the pill's label and the ghost's label share a line.
  //
  // The LIGHT fallback is not a style preference, it is a constraint: glass is
  // 9% bone over a backdrop-blur, which needs a lit dark ground to read as
  // anything. On bone it would be a faint smudge, so a light hero takes the
  // solid ink pill instead. (No live light heroes, but the branch has to be
  // right the day one appears.)
  const actionsEl =
    cta || ctaSecondary || meta ? (
      <div
        className={`mt-10 flex flex-wrap items-baseline gap-6 opacity-0 animate-fade-in${
          centered ? " justify-center" : ""
        }`}
        style={{ animationDelay: "0.45s" }}
      >
        {cta && (
          <Link
            href={cta.href}
            className={`btn ${light ? "btn-primary-light" : "btn-glass"}`}
          >
            {cta.label}
            <span aria-hidden>→</span>
          </Link>
        )}
        {ctaSecondary && (
          <Link
            href={ctaSecondary.href}
            className={`btn-ghost ${light ? "text-ink" : "text-bone"}`}
          >
            {ctaSecondary.label} <span aria-hidden>→</span>
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
    // THE TWO HERO STYLES (2026-08-08, client: "broadly speaking I think we
    // have 2 styles — text only and text + image. The text needs more
    // breathing room on all of them, and we need to be going for nice
    // spacious VH's for the text ones"). The presence of `media` IS the
    // style switch — no new prop:
    //
    //  · TEXT-ONLY (no media): the masthead is the whole event, so the band
    //    is a TALL VH STAGE — md:min-h-[72vh], up from 56 — with the type
    //    centred in it. The air is the composition.
    //  · TEXT + IMAGE (media set, /services; the homepage's bespoke hero is
    //    this style too): the graphic fills the band, so it keeps the
    //    56vh measure — pumping its VH would just stretch ground around an
    //    already-full stage.
    //
    // The breathing room rides MIN-H, not padding: the py values are frozen
    // until the spacing sweep lands, and items-center means taller bands
    // convert directly into air around the type. (The 2026-07-13 "dialled
    // down" call this reverses was about the OLD cramped composition; the
    // client has now asked for the opposite by name.)
    //
    // HEROES WITH BUTTONS RIDE A TOUCH TALLER (2026-08-08, client: "all h1
    // heros with buttons need a touch more top and bottom padding"). The
    // geometry behind the call: a CTA row makes the content stack taller,
    // so at the SAME band height a with-buttons hero has less air around it
    // than a button-free one — the +6vh (+4 on the media style) restores
    // the parity, and with items-center it lands as top AND bottom air
    // equally.
    const hasActions = Boolean(cta || ctaSecondary);
    const splitBox = spacious
      ? media
        ? hasActions
          ? "min-h-[52vh] py-20 md:min-h-[62vh] md:py-28"
          : "min-h-[48vh] py-20 md:min-h-[56vh] md:py-28"
        : hasActions
          ? "min-h-[60vh] py-20 md:min-h-[78vh] md:py-28"
          : "min-h-[56vh] py-20 md:min-h-[72vh] md:py-28"
      : hasActions
        ? "min-h-[48vh] py-16 md:min-h-[56vh] md:py-20"
        : "min-h-[44vh] py-16 md:min-h-[52vh] md:py-20";

    // SPLIT + MEDIA: the graphic variant. REBALANCED 2026-07-24 (client: the
    // hero "feels unbalanced" — measured on /services, three faults):
    //  1. AIR — corrected TWICE, record straight (2026-07-24): the NAV IS
    //     ABSOLUTE and transparent (the warm-glow era floats it over the
    //     hero ground; the docs' "nav in normal flow" note was stale), so
    //     the section's first ~128px sit BEHIND the nav and top padding MUST
    //     carry nav clearance. Stripping `pt-44` as "leftover nav math" put
    //     the kicker 40px under the nav. The target is OPTICAL symmetry —
    //     air below the nav's foot ≈ air below the content: with splitBox's
    //     md:py-28 (112) both sides, pt-40 (160) + pb-8 (32) gives
    //     160+112−128 = 144 above vs 112+32 = 144 below.
    //  2. THE MIDDLE. Text cols 1–6 + media cols 8–12 left a two-column
    //     trough: the H1's longest line ended at x=591 and the graphic began
    //     at x=851, so 260px of dead ground sat between the halves and they
    //     read as two separate things. Media now starts at col 7 — 6 and 6,
    //     no gutter column, the halves meeting in the middle.
    //  3. ALIGNMENT: bottom-lock → CENTRED (2026-07-24, client's call on the
    //     /services hero: "centre aligning the H1 to the image"). items-end
    //     had locked the graphic's foot to the CTA row; with the shortened
    //     three-word H1 the text stack is much shorter than the square, and
    //     the bottom-lock left the title riding low. items-center balances
    //     the stack against the graphic's midline instead.
    if (media) {
      return (
        <section className={sectionCls}>
        {heroGlow}
          <div className="shell relative z-10 pt-32 pb-6 md:pt-40 md:pb-8">
            <div className={`flex items-center ${splitBox}${shellBorder}`}>
              <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
                <div className="md:col-span-6">
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
                  className="opacity-0 animate-fade-in-slow md:col-span-6 md:col-start-7"
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
            <div
              className={`grid w-full grid-cols-1 gap-6 md:grid-cols-12 md:gap-8${
                wide ? "" : " md:items-end md:[align-items:last_baseline]"
              }`}
            >
              {/* WIDE (2026-07-23): the heading owns the FULL rail in long
                  lines and the WHOLE stack stays FLUSH LEFT — the lede sits
                  under the heading on the .lede system (client's call, same
                  day: the bottom-right lede read as scattered). The
                  last-baseline lock only applies to the two-column split. */}
              <div className={wide ? "md:col-span-12" : "md:col-span-7"}>
                {h1El}
                {wide && lede && (
                  <p
                    className={`lede body-lg ${ledeColor} max-w-[46ch] opacity-0 animate-fade-in`}
                    style={{ animationDelay: "0.25s" }}
                  >
                    {lede}
                  </p>
                )}
                {actionsEl}
              </div>
              {!wide && lede && (
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
      {/* The legacy left/center layouts joined the 2026-08-08 breathing-room
          pass through a MIN-H WELL rather than their frozen padY: these are
          text-only heroes too ("the text needs more breathing room on ALL of
          them"), so the type centres in a modest vh band. flex-COL, not flex:
          a row would shrink-wrap the max-w-4xl block to its content and
          re-wrap the lede. /privacy is the one live consumer. */}
      <div className={`shell ${padY} relative z-10${shellBorder}`}>
        <div className="flex min-h-[36vh] flex-col justify-center md:min-h-[46vh]">
          {content}
        </div>
      </div>
    </section>
  );
}
