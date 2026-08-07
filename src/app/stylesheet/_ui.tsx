/**
 * DESIGN-SYSTEM PRIMITIVES (2026-08-02) — the furniture /stylesheet is built
 * from, extracted when the page was restructured into
 * Principles → Atoms → Molecules → Components.
 *
 * THE GROUND FLIPPER (2026-08-08) rides on `Stage`: any dark stage gets a
 * Dark/Light toggle, a specimen with a genuine light rendering passes it as
 * `light`, and a `component` stage without one reports "no light variant"
 * when flipped. It is an AUDIT instrument — see <StageFlip> for why faking
 * the light rendering was rejected.
 *
 * Why they live in their own module: the page is now authored as several
 * section files, and without a shared set of primitives each section drifts
 * into its own heading sizes and swatch shapes — which is precisely the
 * failure mode a design system exists to prevent. Ironic drift is still
 * drift.
 *
 * Every primitive here takes an `id` where the rail needs an anchor. Anchor
 * ids are kebab-case and must match the tree passed to <StylesheetNav>.
 *
 * ⚠ These are for /stylesheet ONLY. They are documentation chrome, not brand
 * components — nothing here should ever be imported by the site itself.
 */

import StageFlip from "./_StageFlip";
import { STAGE_GROUNDS } from "./_stage-grounds";

/** A tier heading: Principles, Atoms, Molecules, Components. */
export function Tier({
  id,
  num,
  title,
  note,
}: {
  id: string;
  num: string;
  title: string;
  note: string;
}) {
  return (
    <div id={id} className="scroll-mt-32 mt-32 border-t rule-dark pt-10 first:mt-0">
      <p className="index-num text-clay">{num} /</p>
      <h2 className="heading-lg mt-3">{title}</h2>
      <p className="body mt-3 max-w-[62ch] text-bone-dim">{note}</p>
    </div>
  );
}

/** A section inside a tier — the rail's second level. */
export function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 mt-16">
      <h3 className="heading-sm text-bone">{title}</h3>
      {note && <p className="body-sm mt-2 max-w-[68ch] text-bone-dim">{note}</p>}
      {children}
    </section>
  );
}

/** A labelled block inside a section. */
export function Sub({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mt-10">
      <p className="label text-bone">{title}</p>
      {note && <p className="fineprint mt-1.5 max-w-[68ch]">{note}</p>}
    </div>
  );
}

/** The class/token name in code voice. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <span className="fineprint rounded-ui-sm border rule-dark bg-ink-raised px-1.5 py-0.5 text-bone-dim">
      {children}
    </span>
  );
}

/**
 * A demo stage. `ground` is load-bearing documentation, not decoration:
 * several tokens only make sense on one ground (glass over imagery, the
 * on-light type ladder on bone), and showing them on the wrong one is how
 * the old page told half-truths.
 */
export function Stage({
  ground = "ink",
  flush = false,
  className = "",
  children,
  light,
  component = false,
  flip,
}: {
  ground?: "ink" | "raised" | "bone" | "ivory" | "image";
  /** THE GROUND FLIPPER (2026-08-08). The specimen's GENUINE light rendering
      — the same component with its real tone/variant prop. Omit it where the
      component has no light variant; with `component` set, flipping then
      reports the absence rather than faking one. Full reasoning, including
      the rejected token-swap version, lives on <StageFlip>. */
  light?: React.ReactNode;
  /** Marks a COMPONENT specimen, so a flip with no `light` rendering shows
      the "no light variant" finding. Token, colour and type stages leave it
      off — a swatch has no light variant to be missing. */
  component?: boolean;
  /** Force the flipper on or off. Defaults ON for DARK grounds, which is
      where there is something to flip to; a stage already on bone or ivory
      gets no toggle. */
  flip?: boolean;
  /**
   * Drop the stage's own padding so a full-width band sits edge to edge.
   * It exists because passing `p-0` through className does NOT work: both
   * are single-class utilities, so the winner is whichever Tailwind emits
   * last in the stylesheet, and that is `p-6` regardless of prop order. A
   * caller cannot fix that from outside, so the stage has to offer it.
   * Section BANDS want this; token specimens do not.
   */
  flush?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const grounds = STAGE_GROUNDS;
  // The flipper defaults ON for dark grounds (there is something to flip to)
  // and OFF for stages already on bone, ivory or the ember crop.
  const flippable = flip ?? (ground === "ink" || ground === "raised");
  if (flippable) {
    return (
      <StageFlip
        ground={ground}
        flush={flush}
        className={className}
        light={light}
        component={component}
      >
        {children}
      </StageFlip>
    );
  }
  return (
    <div
      className={`relative mt-5 overflow-hidden rounded-ui ${
        flush ? "" : "p-6 sm:p-8"
      } ${grounds[ground]} ${className}`}
    >
      {ground === "image" && (
        /* The something-to-blur: the ember ramp, one contained crop — the
           only ground on which the glass tokens can be judged. */
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 88%,rgba(244,237,223,.55) 0%,rgba(216,198,164,.3) 30%,transparent 58%),linear-gradient(150deg,var(--ember-deep) 0%,var(--ember-burnt) 45%,#A8511E 100%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

/** One documented entry: name, what it is, and where it is used. */
export function Entry({
  name,
  what,
  where,
  status,
}: {
  name: string;
  what: string;
  where?: string;
  status?: "live" | "parked" | "deprecated";
}) {
  return (
    <div className="flex flex-col gap-1 border-t rule-dark py-3 sm:flex-row sm:gap-6">
      <div className="sm:w-56 sm:shrink-0">
        <Code>{name}</Code>
        {status && status !== "live" && <StatusTag status={status} />}
      </div>
      <div className="min-w-0">
        <p className="body-sm text-bone-dim">{what}</p>
        {where && <p className="fineprint mt-1">{where}</p>}
      </div>
    </div>
  );
}

/**
 * PARKED is not DEAD, and the distinction is the whole reason this tag
 * exists: the canon keeps a handful of utilities deliberately in the drawer
 * with a written record. Marking them stops the next audit deleting them and
 * stops a reader assuming they are in play.
 */
export function StatusTag({ status }: { status: "parked" | "deprecated" }) {
  return (
    <span
      className={`fineprint ml-2 rounded-ui-sm border px-1.5 py-0.5 uppercase tracking-[.12em] ${
        status === "parked"
          ? "border-champagne/40 text-champagne"
          : "rule-dark text-clay"
      }`}
    >
      {status}
    </span>
  );
}
