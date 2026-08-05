"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * THE TYPE-SCALE EXPLORER (2026-08-05, client: "could you build what they've
 * got in Carbon, where there's a breakpoint switcher or a fluid knob you can
 * move… so I can understand how the display ladder works responsively").
 *
 * A slider rather than Carbon's breakpoint switcher, because our ladder is not
 * stepped: every rung is a `clamp()`, so its size is CONTINUOUS between a floor
 * and a ceiling. A switcher would show five snapshots of something that never
 * snaps; the knob shows the actual behaviour, including the two moments that
 * matter most and which no breakpoint lands on — where a rung leaves its floor
 * and where it hits its ceiling.
 *
 * ⚠ IT READS THE LIVE CSSOM, AND THAT IS THE WHOLE POINT. The clamps are parsed
 * out of the compiled stylesheet at runtime, never copied into this file.
 * Hardcoding them would have made this the eleventh thing on the page that
 * quietly disagrees with globals.css, which is the exact failure this rebuild
 * exists to end. Change a rung in globals.css and this tool follows in the same
 * reload, or it shows nothing at all — both are honest, a stale number is not.
 *
 * The inline `fontSize` on each preview is a sanctioned raw value under the
 * adjudication rule: the number DEPICTS a computed size rather than setting a
 * house one, and it is derived, never authored.
 */

/** The ladder, top to bottom. Names only — every value comes from the CSSOM. */
const RUNGS = [
  "display-mega",
  "display",
  "heading-xl",
  "heading-part",
  "statement",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "card-title",
] as const;

/** Tailwind's breakpoints, as quick stops on the knob. 390 is a real phone. */
const STOPS = [
  { w: 390, label: "phone" },
  { w: 640, label: "sm" },
  { w: 768, label: "md" },
  { w: 1024, label: "lg" },
  { w: 1280, label: "xl" },
  { w: 1536, label: "2xl" },
  { w: 1920, label: "wide" },
];

type Clamp = { min: number; base: number; vw: number; max: number };

/** `clamp(1.5rem, 1.17rem + 1.35vw, 2.25rem)` → the three numbers, in px. */
function parseClamp(value: string): Clamp | null {
  const m = value.match(
    /clamp\(\s*([\d.]+)rem\s*,\s*([\d.]+)rem\s*\+\s*([\d.]+)vw\s*,\s*([\d.]+)rem\s*\)/,
  );
  if (!m) return null;
  return {
    min: parseFloat(m[1]) * 16,
    base: parseFloat(m[2]) * 16,
    vw: parseFloat(m[3]),
    max: parseFloat(m[4]) * 16,
  };
}

/** Walk the CSSOM for a class's authored font-size, resolving one var() hop. */
function readClamp(cls: string): Clamp | null {
  const rootStyle = getComputedStyle(document.documentElement);
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet; ours are same-origin
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      if (rule.selectorText !== `.${cls}`) continue;
      let value = rule.style.fontSize;
      if (!value) continue;
      // .display-mega is `var(--masthead-size)`; resolve exactly one hop.
      const v = value.match(/^var\((--[\w-]+)\)$/);
      if (v) value = rootStyle.getPropertyValue(v[1]).trim();
      const parsed = parseClamp(value);
      if (parsed) return parsed;
    }
  }
  return null;
}

function resolve(c: Clamp, width: number) {
  return Math.min(Math.max(c.base + (c.vw / 100) * width, c.min), c.max);
}

export default function TypeScaleExplorer() {
  const [width, setWidth] = useState(1280);
  const [clamps, setClamps] = useState<Record<string, Clamp | null> | null>(null);

  useEffect(() => {
    const found: Record<string, Clamp | null> = {};
    for (const r of RUNGS) found[r] = readClamp(r);
    setClamps(found);
  }, []);

  const rows = useMemo(() => {
    if (!clamps) return [];
    return RUNGS.map((cls) => {
      const c = clamps[cls];
      if (!c) return { cls, px: null, state: "unreadable" as const };
      const px = resolve(c, width);
      const state =
        px <= c.min + 0.01 ? ("floor" as const)
        : px >= c.max - 0.01 ? ("ceiling" as const)
        : ("fluid" as const);
      return { cls, px, state, c };
    });
  }, [clamps, width]);

  return (
    <div className="mt-6 rounded-ui border rule-dark">
      {/* The knob */}
      <div className="border-b rule-dark p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <label htmlFor="tse-width" className="label text-bone">
            Viewport width
          </label>
          <p className="label text-champagne">{width}px</p>
        </div>
        <input
          id="tse-width"
          type="range"
          min={320}
          max={1920}
          step={10}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="mt-4 w-full accent-champagne"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {STOPS.map((s) => (
            <button
              key={s.w}
              type="button"
              onClick={() => setWidth(s.w)}
              className={`fineprint rounded-ui-sm border px-2 py-1 transition-colors ${
                width === s.w
                  ? "border-champagne text-champagne"
                  : "rule-dark text-clay hover:border-champagne/50 hover:text-bone-dim"
              }`}
            >
              {s.label} <span className="text-bone-dim">{s.w}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The ladder at that width */}
      <div>
        {!clamps && (
          <p className="fineprint p-5 sm:p-6">Reading the stylesheet…</p>
        )}
        {rows.map((row, i) => (
          <div
            key={row.cls}
            className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 p-5 sm:p-6 ${
              i > 0 ? "border-t rule-dark" : ""
            }`}
          >
            <div className="w-40 shrink-0">
              <p className="fineprint text-bone-dim">.{row.cls}</p>
              <p className="fineprint">
                {row.px === null ? (
                  <span className="text-champagne">not readable</span>
                ) : (
                  <>
                    <span className="text-bone">{row.px.toFixed(1)}px</span>
                    {row.state !== "fluid" && (
                      <span className="text-clay"> · at {row.state}</span>
                    )}
                    {i > 0 && rows[i - 1].px && row.px ? (
                      <span className="text-clay">
                        {" "}
                        · {(rows[i - 1].px! / row.px).toFixed(2)}× the rung above
                      </span>
                    ) : null}
                  </>
                )}
              </p>
            </div>
            {/* The specimen, drawn at the size the slider resolves to. */}
            <p
              className="min-w-0 flex-1 truncate text-bone"
              style={
                row.px
                  ? { fontSize: `${row.px}px`, lineHeight: 1.1 }
                  : undefined
              }
            >
              Practices that patients trust
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
