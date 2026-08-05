"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Service = {
  num: string;
  title: string;
  lead: string;
  /** Both OPTIONAL since the 2026-07-24 split, but note WHAT actually moved:
      only the DASH-RULED DELIVERABLES went to the detail pages ("the
      excessive text with the lines"). The client's follow-up was explicit —
      keep the paragraphs, move just the bits after the dashes — because a row
      of heading + one line reads far too thin on desktop beside the big
      rolling numeral. So the hub passes `body`; it omits `deliverables`. */
  body?: string;
  deliverables?: string[];
  /** Detail page for this service (2026-07-24, the /services split). When
      present the row title links to it and gains a ghost onward link. */
  href?: string;
  /** THE ROW TILE (2026-07-24, client experiment: "an image above each
      thing… a little mockup for each maybe with a gradient blob
      background"). A rounded warm-gradient tile above the title carrying a
      BLANK device (the /about ream language — screens stay blank sitewide
      until imagery is chosen). Device fits the discipline: laptop for web,
      phone for search, a square plate for brand. Omit for no tile. */
  art?: "laptop" | "phone" | "plate";
  /** THE REAL TILE IMAGE (2026-08-01, client: "put these images in the
      services 123") — a finished graphic from the Website Graphics design
      set, one per discipline. Renders at its NATIVE ratio (artwork, not
      photography — the brand-graphic exception to the 16:10/4:5 canon),
      replacing the blank-device tile; `art` remains the fallback for rows
      without an image. No grain over it: grain is a GROUND material,
      imagery ships as exported. */
  image?: { src: string; alt: string };
  /** THE LIVE TILE (2026-08-02) — supersedes `image` for the three rows that
      have one. The design gained motion (a staggered frost-in on the glass
      panels, a sweeping ring, a drawn curve), and a raster can only be its
      last frame. See ServicesTiles.tsx for the plate/panel split: the
      photography stays a picture, the frosted panels are live DOM. `image`
      remains for any row whose graphic ships before it is ported. */
  tile?: React.ReactNode;
};

/* The tile grounds — the /about ream's retired TILE_GRADIENTS, back in
   service: dosed, in-family, warm ink with one low champagne bloom, always
   INSIDE a tile (never on the ground). Cycled per row. */
/* PURE BLACK TILES (2026-07-25, closing the ground search — gradients were
   trialled bright then darkened and still "idk why" didn't sit right): the
   /about ream answered this exact question weeks ago after its own cycle
   (gradients → glass → white → BLACK with white-rimmed devices), and the
   services tiles now speak the same dialect — cross-page cohesion is the
   point. Devices carry the white bezel rim for contrast, as on /about.
   The gradient presets live in git history if the ground ever reopens.
   2026-07-25: solid black → TRANSLUCENT black ("a transparent black like
   very low opacity") — the section's warm ground and canvas blobs now read
   through the pane, deepened rather than blocked; the tile is tinted glass
   over the atmosphere instead of a hole cut in it. */
/* THE LIGHT-TILE TRIAL (2026-07-31, client: "try lighter backgrounds…
   on the background images in the 1-2-3 section, to have some contrast
   against the dark. Maybe like bone with some gradient in"). The tile
   flips to the site's own paper ladder — ivory → bone → cream, the three
   light stocks, as one quiet diagonal wash — with `grain-light` for the
   paper tooth, so each row carries a lit plate against the dark ground.
   Devices swap their white rims for a soft ink hairline (a white rim
   vanishes on bone) and the fragment chips move from dark glass to
   .card-soft with the on-light ink ladder. Flip LIGHT_TILES to false to
   restore the translucent-black glass tiles wholesale. */
const LIGHT_TILES = true;
/* Stops re-toned 2026-07-31 with the ember-palette handoff: the new warm
   stocks — ivory #FDF8EF → bone #F4EDDF → cream (champagne-soft 35% into
   the new bone). Rim/shadow rgb = the new ink (17,14,10). */
const TILE_GROUND = LIGHT_TILES
  ? "linear-gradient(165deg, #FDF8EF 0%, #F4EDDF 48%, #EADFCA 100%)"
  : "rgba(0,0,0,0.32)";
const DEVICE_RIM = LIGHT_TILES
  ? "1px solid rgba(17,14,10,0.18)"
  : "1px solid #FFFFFF";
const DEVICE_SHADOW = LIGHT_TILES
  ? "0 30px 60px -18px rgba(17,14,10,0.35)"
  : "0 30px 60px -18px rgba(0,0,0,0.55)";
/* Fragment-chip surfaces + type tones per ground. */
const CHIP = LIGHT_TILES ? "card-soft" : "card-glass";
const CHIP_META = LIGHT_TILES ? "text-ink-mute" : "text-bone-dim";

/* THE ROW HAIRLINES ARE PARKED (2026-07-31, client: "hide the little borders
   on top of the images… I might bring them back, but I'm not sure they're
   actually adding anything"). Flip to true to restore the draw-in progress
   rules above each row — the observers still run and null-guard the refs, so
   nothing else changes. */
const SHOW_ROW_RULES = false;

/* Blank devices — the ream's shapes, sized for the row tile. Dark bezel,
   dark glass; decorative only. */
function TileDevice({ art }: { art: NonNullable<Service["art"]> }) {
  if (art === "phone") {
    return (
      <div
        style={{
          position: "relative",
          width: "22%",
          aspectRatio: "320 / 680",
          background: "#060607",
          border: DEVICE_RIM,
          borderRadius: "clamp(12px,1.2vw,22px)",
          padding: "clamp(3px,0.3vw,5px)",
          boxShadow: DEVICE_SHADOW,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "clamp(6px,0.6vw,10px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(22px,2.2vw,36px)",
            height: "clamp(6px,0.6vw,10px)",
            background: "#000",
            borderRadius: "999px",
            zIndex: 2,
          }}
        />
        <div style={{ width: "100%", height: "100%", borderRadius: "clamp(9px,0.95vw,18px)", background: "#121112" }} />
      </div>
    );
  }
  if (art === "plate") {
    return (
      <div
        style={{
          width: "34%",
          aspectRatio: "1 / 1",
          background: "#060607",
          border: DEVICE_RIM,
          borderRadius: "clamp(10px,1vw,18px)",
          padding: "clamp(4px,0.4vw,7px)",
          boxShadow: DEVICE_SHADOW,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: "clamp(7px,0.7vw,13px)", background: "#121112" }} />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "62%",
        background: "#060607",
        border: DEVICE_RIM,
        borderRadius: "clamp(8px,0.8vw,14px)",
        padding: "clamp(4px,0.4vw,7px)",
        boxShadow: DEVICE_SHADOW,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "clamp(5px,0.5vw,9px)", background: "#121112" }} />
    </div>
  );
}

/* THE FLYING FRAGMENTS (2026-07-24, client: "little bits flying out like
   code or a #1 result or like a pen tool") — two floating chips per tile,
   signing the discipline: mono code chips for web (font-mono is sanctioned
   here: these are device-chrome depictions), a #1-result chip for search,
   a hand-drawn pen-tool glyph + swatch dots for brand (never an imported
   icon set — the StageGlyph rule; hairline strokes, champagne on ink, the
   ornament-glyph colour). They ride the canon float utilities
   (animate-float-slow/-slower, staggered inline delays; the global
   reduced-motion guard stills them). Glass = .card-glass, straight corners
   per the print rule. Decorative → aria-hidden.
   TYPE SIZE COMES FROM .label (2026-08-05, the conformance sweep): the FACE
   is a depiction and stays mono, but the chip is a real DOM caption the
   reader's eye lands on, so its size sits on the meta register like every
   other caption. Both web chips were raw (11px and 13px) and are now one
   register — the 2px difference was never a decision. */
function TileFragments({ art }: { art: NonNullable<Service["art"]> }) {
  if (art === "phone") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <div
          className={`${CHIP} animate-float-slow absolute flex items-baseline gap-2 px-4 py-3`}
          style={{ left: "16%", top: "24%", rotate: "-5deg" }}
        >
          <span className="text-champagne" style={{ fontSize: "clamp(14px,1.3vw,20px)", fontWeight: 500 }}>
            #1
          </span>
          <span className={`overline ${CHIP_META}`} style={{ fontSize: "9px" }}>
            Result
          </span>
        </div>
        <div
          className={`${CHIP} animate-float-slower absolute px-3 py-2.5`}
          style={{ right: "16%", top: "44%", rotate: "4deg", animationDelay: "1.2s" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-champagne">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1" />
            <path d="M10 10 L14 14" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    );
  }
  if (art === "plate") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <div
          className={`${CHIP} animate-float-slow absolute px-3 py-2.5`}
          style={{ left: "18%", top: "26%", rotate: "-4deg" }}
        >
          {/* Pen tool — anchor, handles, nib: hand-drawn, hairline. */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-champagne">
            <path d="M9 2 L13.5 9 L9 16 L4.5 9 Z" stroke="currentColor" strokeWidth="1" />
            <circle cx="9" cy="9" r="1.4" stroke="currentColor" strokeWidth="1" />
            <path d="M2 4 L7.5 7.5 M16 4 L10.5 7.5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div
          className={`${CHIP} animate-float-slower absolute flex items-center gap-2 px-3 py-2.5`}
          style={{ right: "17%", top: "46%", rotate: "5deg", animationDelay: "0.9s" }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-champagne" />
          <span className={`h-2.5 w-2.5 rounded-full ${LIGHT_TILES ? "bg-ink" : "bg-bone"}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${LIGHT_TILES ? "bg-ink-faint" : "bg-bone-dim"}`} />
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <div
        className={`${CHIP} animate-float-slow absolute px-3.5 py-2.5 font-mono label ${CHIP_META}`}
        style={{ left: "15%", top: "24%", rotate: "-5deg" }}
      >
        {"<h1>"}
      </div>
      <div
        className={`${CHIP} animate-float-slower absolute px-3.5 py-2.5 font-mono label text-champagne`}
        style={{ right: "15%", top: "42%", rotate: "4deg", animationDelay: "1.4s" }}
      >
        {"</>"}
      </div>
    </div>
  );
}

/**
 * The /services scroll index (2026-07-14, client ref: Relume layout485). ONE
 * big number pinned on the left in a CLIPPED WINDOW; as you scroll the content
 * rows, the digit stack slides so the active number rolls into the window like
 * an odometer/slot-machine (you never see the other numbers elsewhere — they
 * change within the frame). A hairline DRAWS in on each row as it enters.
 *
 * Both effects are JS-driven (IntersectionObserver + inline styles) rather than
 * CSS `.reveal` descendant rules — that path hit a Tailwind cascade-layer quirk
 * where an `!important` override was still outranked, so we set width/transform
 * directly here where nothing can outrank it. Content still fades via `.reveal`.
 */
export default function ServicesScrollIndex({
  services,
  tone = "dark",
}: {
  services: Service[];
  /** Ground the rows sit on (2026-07-24, the /services light-act trial).
      Dark by default; light swaps the whole ladder — the odometer numeral,
      the row rules, the drawing hairline and the ghost. */
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const numeralColor = dark ? "text-bone-dim" : "text-ink-faint";
  const indexColor = dark ? "text-clay" : "text-ink-mute";
  const trackColor = dark ? "bg-ink-line" : "bg-bone-line";
  const fillColor = dark ? "bg-bone" : "bg-ink";
  const headingColor = dark ? "text-bone" : "text-ink";
  const bodyColor = dark ? "text-bone-dim" : "text-ink-dim";
  const ruleCls = dark ? "rule-dark" : "rule-light";
  const dashColor = dark ? "bg-clay" : "bg-ink-mute";
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const drawn = useRef<Set<number>>(new Set());
  const N = services.length;

  useEffect(() => {
    // Active number — the row whose top reaches the trigger line wins. The
    // line sits at 40% from the top (not the 50% centre) so the number changes
    // once the section has more fully arrived, not the moment it hits the
    // middle (client: "changes a bit too soon"). Lower the first % to delay
    // further (e.g. -30%/-70%).
    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    // Line draw — fill each row's hairline once, as it enters.
    const drawObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (drawn.current.has(idx)) return;
          drawn.current.add(idx);
          const fill = fillRefs.current[idx];
          if (fill) fill.style.width = "100%";
        });
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    rowRefs.current.forEach((el) => {
      if (!el) return;
      activeObs.observe(el);
      drawObs.observe(el);
    });
    return () => {
      activeObs.disconnect();
      drawObs.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
      {/* Sticky rolling number (desktop). The stack of digits slides so the
          active one sits in the clipped 1em window — the odometer roll. */}
      <div className="hidden md:col-span-4 md:block">
        <div className="sticky top-40">
          <div
            className={`display-mega overflow-hidden leading-none ${numeralColor}`}
            style={{ height: "1em" }}
            aria-hidden
          >
            {/* Smooth, symmetric ease (easeInOutCubic) — glides the whole roll
                instead of snapping to place (the old expo-out read as bouncy). */}
            <div
              className="transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateY(-${(active * 100) / N}%)` }}
            >
              {services.map((s) => (
                <div key={s.num} style={{ height: "1em" }}>
                  {s.num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content rows */}
      <div className="flex flex-col gap-24 md:col-span-7 md:col-start-6 md:gap-36">
        {services.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            data-idx={i}
            className="reveal"
          >
            {/* Mobile keeps a small inline number (the rolling one is desktop-only) */}
            <p className={`index-num ${indexColor} md:hidden`}>{s.num}</p>
            {/* Progress hairline: faint track + the fill that draws (JS
                width). PARKED behind SHOW_ROW_RULES — see the flag note. */}
            {SHOW_ROW_RULES && (
              <div className={`relative mt-4 h-px w-full overflow-hidden ${trackColor} md:mt-0`}>
                <span
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  className={`absolute left-0 top-0 h-px w-0 ${fillColor} transition-[width] duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                />
              </div>
            )}
            {s.tile && (
              /* No rounded-plate here — the tile draws its own 24px corner
                 (it is the design's own plate frame) and clipping it again
                 would also clip the panels that overhang the device. */
              <div className="mt-10">{s.tile}</div>
            )}
            {!s.tile && s.image && (
              <div className="mt-10 overflow-hidden rounded-plate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
            )}
            {!s.tile && !s.image && s.art && (
              <div
                className={`relative mt-10 flex items-end justify-center overflow-hidden rounded-plate${
                  LIGHT_TILES ? " grain-light" : ""
                }`}
                style={{
                  background: TILE_GROUND,
                  aspectRatio: "16 / 9",
                }}
              >
                {/* Device rises from the tile's foot and crops there — the
                    ream grammar. z-10 lifts device + fragments above the
                    grain-light film (its ::before sits at z-index 1). */}
                <div
                  className="relative z-10 flex w-full items-end justify-center"
                  style={{ transform: "translateY(14%)" }}
                >
                  <TileDevice art={s.art} />
                </div>
                <TileFragments art={s.art} />
              </div>
            )}
            <h2 className={`heading-lg mt-12 ${headingColor}`}>
              {s.href ? (
                <Link href={s.href} className="transition-opacity hover:opacity-70">
                  {s.title}
                </Link>
              ) : (
                s.title
              )}
            </h2>
            <p className={`body-lg mt-4 max-w-[36ch] ${bodyColor}`}>{s.lead}</p>
            {s.body && (
              <p className={`body mt-5 max-w-[54ch] ${bodyColor}`}>{s.body}</p>
            )}
            {s.deliverables && s.deliverables.length > 0 && (
              <ul className={`mt-9 grid grid-cols-1 gap-x-10 gap-y-3.5 border-t ${ruleCls} pt-7 sm:grid-cols-2`}>
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className={`body-sm flex items-center gap-3 ${bodyColor}`}
                  >
                    <span aria-hidden className={`h-px w-4 shrink-0 ${dashColor}`} />
                    {d}
                  </li>
                ))}
              </ul>
            )}
            {s.href && (
              <div className="mt-9">
                <Link href={s.href} className={`btn-ghost ${headingColor}`}>
                  More on {s.title.toLowerCase()} <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
