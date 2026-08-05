import type { FormTone } from "@/lib/forms";

/**
 * TickBox (2026-08-05) — the house checkbox, and the choice card built around
 * it. Extracted from StartProjectForm, which was its only consumer and also
 * the only place the tick geometry was written twice.
 *
 * COMPOSES: an sr-only peer checkbox · a 20px square carrying a 1.75 weight
 * tick · a `rounded-ui-sm` card holding a `.label` and a `.fineprint` hint ·
 * a focus ring drawn on the CARD from the input's focus-visible state.
 *
 * THE RULE, and the reason this survives a ground change at all: the BOX is
 * champagne-filled with an ink tick on BOTH grounds. Champagne LINES and
 * champagne TEXT die on bone at 1.8:1, which is why the card's selected rim
 * has to follow the ground instead (champagne on ink, ink plus a champagne/10
 * wash on bone, the cream family). But a champagne FILL under an ink glyph
 * measures about 7:1 anywhere, so the ticked box is the one piece of state the
 * palette can carry unchanged. That asymmetry is the whole tone table below:
 * the rim states, the box does not.
 *
 * Cards are MULTI-SELECT (2026-08-01, client: "the radio selects should be
 * multiple select"), which the box shape has to say on sight; a circular
 * control would read as a radio and promise the opposite.
 *
 * REPLACED: StartProjectForm.tsx's four hand-rolled choice cards. `TickPath`
 * additionally replaces the two loose copies of the tick that lived in
 * ProgressMarks' done chip and ContactForm's consent box.
 */

/* THE TICK, and nothing else. Only the PATH is shared: each of the three sites
   wraps it in its own svg because each sizes and reveals it differently (the
   card toggles opacity from React state, the consent box from `peer-checked`,
   the progress chip is always on and simply larger). Hoisting the wrapper too
   would mean a variant prop per site, which is a fork wearing a component's
   name. The consent box is the odd weight at 2: it sits on a 16px control
   rather than 20px, and a 1.75 stroke goes spindly there. */
export function TickPath({ strokeWidth = "1.75" }: { strokeWidth?: string }) {
  return (
    <path
      d="M2 6.5 L5 9 L10 3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/* Eight tints, and only two of them ignore the ground. See the rule above:
   `boxOn` and `tick` are constant because a champagne fill under an ink glyph
   is legible on ink and on bone alike. */
const TONES = {
  light: {
    cardRest: "border-ink/25 hover:border-ink/50",
    cardOn: "border-ink bg-champagne/10",
    boxRest: "border-ink/35",
    boxOn: "border-champagne bg-champagne",
    tick: "text-ink",
    cardLabel: "text-ink",
    cardHint: "text-ink-mute",
    ring: "ring-ink",
  },
  dark: {
    cardRest: "rule-dark hover:border-champagne/50",
    cardOn: "border-champagne bg-champagne/[0.07]",
    boxRest: "border-bone/45",
    boxOn: "border-champagne bg-champagne",
    tick: "text-ink",
    cardLabel: "text-bone",
    cardHint: "text-bone-dim",
    ring: "ring-champagne",
  },
} as const;

export default function TickBox({
  name,
  value,
  label,
  hint,
  checked,
  onChange,
  tone = "dark",
}: {
  /** The posted field name. Several cards share one, and the form joins them. */
  name: string;
  value: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  tone?: FormTone;
}) {
  const t = TONES[tone === "light" ? "light" : "dark"];
  return (
    <label
      /* p-4/p-5 with a 16px gap (2026-08-01, client: "a bit more padded, they
         seem a bit techy"). rounded-ui-sm: choice cards are contained
         surfaces, and surfaces curve. */
      className={`group relative flex cursor-pointer items-start gap-4 rounded-ui-sm border p-4 transition-colors sm:p-5 ${
        checked ? t.cardOn : t.cardRest
      }`}
    >
      {/* The real control, sr-only rather than hidden: it stays focusable, it
          posts, and its focus-visible drives the ring drawn on the card. */}
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      {/* 20px on a 6px radius with a 1.75 stroke, sized to the type beside it
          rather than to a checklist widget.
          ⚠ THE RAW 6px HOLDS, ADJUDICATED 2026-08-05. The surface scale starts
          at --radius-ui-sm (10px), which is HALF this box: 10px on a 20px
          square is a circle, and a circular multi-select control reads as a
          radio button. So this is not radius freelancing, it is a control
          smaller than the scale's smallest stop can serve: a real gap, and
          minting a stop below ui-sm is the client's call, not a sweep's. */}
      <span
        aria-hidden
        className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
          checked ? t.boxOn : t.boxRest
        }`}
      >
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 ${t.tick} transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        >
          <TickPath />
        </svg>
      </span>
      <span className="min-w-0">
        <span className={`label block ${t.cardLabel}`}>{label}</span>
        <span className={`fineprint mt-0.5 block ${t.cardHint}`}>{hint}</span>
      </span>
      {/* Keyboard focus ring on the CARD, driven by the sr-only input's
          focus-visible state. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-ui-sm ring-1 ${t.ring} opacity-0 peer-focus-visible:opacity-100`}
      />
    </label>
  );
}
