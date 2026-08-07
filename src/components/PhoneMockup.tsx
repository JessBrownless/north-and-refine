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
 *
 * ⚠ ITS RADII ARE HARDWARE, NOT OURS (adjudicated 2026-08-05): the bezel's
 * 2.75rem, the screen's 2.35rem and the placeholder's rounded-xl DEPICT an
 * iPhone, so they sit outside the plate and surface scales. See the
 * adjudication rule in globals.css.
 *
 * THE FLUID SIZE (2026-08-07, born for the homepage hero's parity shelf,
 * client: "the mockup frames are too rounded on mobile"): `size="fluid"`
 * fills the CONSUMER'S width box, and the hardware chrome switches from the
 * fixed rem/px values to CONTAINER-QUERY units — the same proportions the
 * md tuning has at its 208px width (radius 21cqw ≈ 44px at 208), now held
 * at every width. Fixed px chrome on a variable box is how a 98px phone
 * ends up with 35%-round corners: an iPhone's corner is a RATIO of its
 * body, so a fluid phone's chrome must be too. The three fixed sizes keep
 * their tuned rem/px values untouched — their widths are known quantities.
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
  /** "fluid" fills the consumer's width box and scales the hardware chrome
      proportionally (container-query units). The consumer owns the width. */
  size?: "sm" | "md" | "lg" | "fluid";
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
  const fluid = size === "fluid";
  const fg = light ? "text-ink" : "text-bone";
  const bar = light ? "bg-ink/10" : "bg-bone/15";
  const width =
    size === "sm" ? "w-40" : size === "lg" ? "w-64 sm:w-80" : size === "fluid" ? "w-full" : "w-52 sm:w-56";

  // Fluid chrome in cqw, so the hardware holds its ratio at any width the
  // consumer sets. RATIO RETUNED 21cqw → 15cqw (2026-08-08, client: mobile
  // still "looks too rounded"): 21% was the md size's tuned proportion, but
  // a real iPhone's body corner is ~15% of its width, and small objects
  // want optically TIGHTER corners, not equal ones — the plate radius
  // scale encodes the same taste (less curve on small plates). The screen
  // follows at 12cqw (outer minus the 3.4cqw bezel). Fixed sizes keep
  // their tuned rem/px values.
  // The fluid bezel padding rides an inline style, not a p-[3.4cqw] class:
  // spacing utilities are frozen until the sweep lands, and hardware
  // depiction has no business joining that census anyway.
  const frameChrome = fluid ? "rounded-[15cqw]" : "rounded-[2.75rem] p-[7px]";
  const screenChrome = fluid ? "rounded-[12cqw]" : "rounded-[2.35rem]";
  const islandChrome = fluid
    ? "top-[4.8cqw] h-[7.7cqw] w-[27cqw]"
    : "top-2.5 h-4 w-14";

  return (
    <div
      data-device="phone"
      className={`${width} shrink-0 ${className}`}
      style={fluid ? { containerType: "inline-size" } : undefined}
    >
      {/* Frame */}
      <div
        className={`${frameChrome} border border-ink-line bg-ink shadow-[0_32px_64px_-28px_rgba(17,14,10,0.55)]`}
        style={fluid ? { padding: "3.4cqw" } : undefined}
      >
        {/* Screen */}
        <div
          className={`relative overflow-hidden ${screenChrome} aspect-[0.462] ${
            light ? "bg-bone" : "bg-ink-raised"
          }`}
        >
          {/* Dynamic island */}
          <div className={`absolute left-1/2 ${islandChrome} z-10 -translate-x-1/2 rounded-full border border-ink-line bg-ink`} />

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
