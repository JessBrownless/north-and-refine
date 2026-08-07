"use client";

import { useState } from "react";

/**
 * The interactive half of <DesignFlip>. See that file for the rules; this one
 * only holds the toggle state and stamps `data-flip-sketch` on the wrapper,
 * which is what the dev-only inversion rules at the end of globals.css hook.
 *
 * ⚠ The toggle's own colours are RAW HEX on purpose, and this is the one
 * place on the site where that is not drift: every token-based colour inside
 * a flipped band inverts, so a toggle built from tokens would invert with it
 * and become unreadable at exactly the moment it is needed. It is also dev
 * chrome rather than site UI — it depicts a tool, not the brand.
 */
export default function DesignFlipClient({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative" {...(flipped ? { "data-flip-sketch": "" } : {})}>
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "5px 8px 5px 10px",
          borderRadius: 999,
          border: "1px solid rgba(244,237,223,0.28)",
          background: "rgba(17,14,10,0.82)",
          backdropFilter: "blur(8px)",
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#F4EDDF",
          pointerEvents: "auto",
        }}
      >
        <span style={{ opacity: 0.55 }}>{label}</span>
        {flipped && (
          <span
            style={{
              color: "#110E0A",
              background: "#C2A878",
              borderRadius: 999,
              padding: "1px 6px",
              letterSpacing: "0.14em",
            }}
          >
            sketch
          </span>
        )}
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          style={{
            color: "#F4EDDF",
            border: "1px solid rgba(244,237,223,0.35)",
            borderRadius: 999,
            padding: "2px 9px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          Flip
        </button>
      </div>
      {children}
    </div>
  );
}
