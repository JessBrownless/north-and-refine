"use client";

import { useState } from "react";
import { STAGE_GROUNDS } from "./_stage-grounds";

/**
 * THE GROUND FLIPPER (2026-08-08, client: "add a little theme flipper to each
 * component where I can toggle it to a light background and dark text and
 * then flip it back").
 *
 * ⚠ IT IS AN AUDIT INSTRUMENT, NOT A PREVIEW TRICK, and that was the call
 * made when it was specified. Only ELEVEN of the site's ~70 components carry
 * a real light variant (a `tone` or `variant` prop); the rest hard-code
 * bg-ink / text-bone. So the flipper does exactly two honest things:
 *
 *   · a specimen WITH a genuine light rendering swaps to it (`light`), and
 *   · a component specimen WITHOUT one renders exactly as it truly would on
 *     bone, flagged "no light variant" (`component`).
 *
 * The rejected alternative was swapping --ink and --bone inside the stage so
 * every component "worked" on light. It would have shown colour combinations
 * that exist nowhere on the site, which is precisely the aspirational content
 * the 2026-08-02 rebuild was written to end ("nothing on that page is
 * aspirational"). A flipper that lies about a component is worse than no
 * flipper, because it invites someone to design against a rendering the code
 * cannot produce.
 *
 * The badge therefore isn't an apology — it is the finding. One click tells
 * you which components are ground-locked, which is real system information.
 *
 * Client component because the toggle holds state; the specimens themselves
 * arrive as already-rendered children from the server sections, which is why
 * a genuine light rendering must be PASSED IN (`light`) rather than derived —
 * a client boundary cannot re-render a server child with a different prop.
 */
export default function StageFlip({
  ground,
  flush,
  className,
  light,
  component,
  children,
}: {
  ground: string;
  flush: boolean;
  className: string;
  /** The specimen's GENUINE light rendering (the same component with its
      real tone/variant prop). Omit where the component has none. */
  light?: React.ReactNode;
  /** Marks this stage as a COMPONENT specimen, so flipping without a `light`
      rendering reports the absence. Token and type stages leave it off: a
      colour swatch has no "light variant" to be missing. */
  component?: boolean;
  children: React.ReactNode;
}) {
  const [isLight, setIsLight] = useState(false);
  const missing = isLight && component && !light;

  const chip = (active: boolean) =>
    `overline rounded-ui-sm px-2.5 py-1 transition-colors ${
      active ? "bg-bone text-ink" : "text-clay hover:text-bone"
    }`;

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-end gap-3">
        {missing && (
          <span className="fineprint text-clay">
            No light variant &mdash; shown as it truly renders
          </span>
        )}
        <div
          role="group"
          aria-label="Specimen ground"
          className="inline-flex items-center gap-0.5 rounded-ui-sm border rule-dark p-0.5"
        >
          <button
            type="button"
            onClick={() => setIsLight(false)}
            aria-pressed={!isLight}
            className={chip(!isLight)}
          >
            Dark
          </button>
          <button
            type="button"
            onClick={() => setIsLight(true)}
            aria-pressed={isLight}
            className={chip(isLight)}
          >
            Light
          </button>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-ui ${
          flush ? "" : "p-6 sm:p-8"
        } ${isLight ? STAGE_GROUNDS.bone : STAGE_GROUNDS[ground]} ${className}`}
      >
        {ground === "image" && !isLight && (
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
        <div className="relative">{isLight && light ? light : children}</div>
      </div>
    </div>
  );
}
