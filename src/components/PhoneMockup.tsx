/**
 * Device mockup — the core "tech luxury" asset. Draws an iPhone-style frame
 * around either a REAL site screenshot (preferred — pass `screenshot`) or a
 * CSS-only miniature clinic micro-site (the placeholder until real client
 * imagery exists). Born in the /mockups explorations, promoted to canon with
 * the Obsidian direction; the homepage hero statement device.
 *
 * Screenshots: tall mobile-viewport captures (~390px wide) work best; the
 * screen crops top-aligned. Put files under public/assets/phones/.
 * Screens (placeholder mode): "editorial" (parchment) or "ink" (dark).
 * Sizes: "lg" (hero statement device), "md" (default), "sm" (bento cards).
 */
interface PhoneMockupProps {
  name?: string;
  specialty?: string;
  /** Path to a real mobile screenshot, e.g. "/assets/phones/client.png".
      When set, it replaces the CSS mini-site. */
  screenshot?: string;
  /** Required with screenshot (accessibility). */
  screenshotAlt?: string;
  screen?: "editorial" | "ink";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PhoneMockup({
  name = "Dr Elena Marsh",
  specialty = "Oculoplastic surgery",
  screenshot,
  screenshotAlt,
  screen = "editorial",
  size = "md",
  className = "",
}: PhoneMockupProps) {
  const light = screen === "editorial";
  const fg = light ? "text-ink" : "text-bone";
  const bar = light ? "bg-ink/10" : "bg-bone/15";
  const width = size === "sm" ? "w-40" : size === "lg" ? "w-64 sm:w-80" : "w-52 sm:w-56";

  return (
    <div className={`${width} shrink-0 ${className}`}>
      {/* Frame */}
      <div className="rounded-[2.75rem] border border-ink-line bg-ink p-[7px] shadow-[0_32px_64px_-28px_rgba(12,12,13,0.55)]">
        {/* Screen */}
        <div
          className={`relative overflow-hidden rounded-[2.35rem] aspect-[0.462] ${
            light ? "bg-bone" : "bg-ink-raised"
          }`}
        >
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-10 h-4 w-14 -translate-x-1/2 rounded-full border border-ink-line bg-ink" />

          {screenshot ? (
            /* Real site screenshot — fills the screen, crops top-aligned */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={screenshot}
              alt={screenshotAlt ?? ""}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            /* Placeholder: miniature clinic site */
            <div className={`flex h-full flex-col px-4 pb-4 pt-10 ${fg}`}>
              {/* mini nav */}
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] tracking-tight">
                  {name.split(" ").slice(-1)[0]}
                </span>
                <div className="flex flex-col gap-[3px]">
                  <span className={`h-px w-3.5 ${bar}`} />
                  <span className={`h-px w-3.5 ${bar}`} />
                </div>
              </div>

              {/* mini hero */}
              <p className="mt-5 font-sans text-[5px] font-medium uppercase tracking-[0.32em] text-champagne">
                {specialty}
              </p>
              <p className="mt-1.5 font-display text-[15px] leading-[1.05] tracking-tight">
                {name}
              </p>
              <div className={`mt-2.5 h-1 w-3/4 rounded-full ${bar}`} />
              <div className={`mt-1 h-1 w-1/2 rounded-full ${bar}`} />

              {/* abstract portrait */}
              <div className="portrait-fill mt-3 min-h-0 flex-1 rounded-xl" />

              {/* mini CTA row */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[5px] font-medium uppercase tracking-[0.28em] ${
                    light ? "bg-ink text-bone" : "bg-bone text-ink"
                  }`}
                >
                  Book
                </span>
                <div className={`h-1 w-10 rounded-full ${bar}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
