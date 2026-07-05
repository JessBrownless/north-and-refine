/**
 * Desktop browser-window mockup — the wide companion to PhoneMockup. A macOS-
 * style window (traffic lights + address pill) around either a REAL desktop
 * screenshot (`screenshot`) or a CSS-rendered editorial clinic site (the
 * placeholder until a real capture lands). Pairs with PhoneMockup to form the
 * homepage hero's responsive device cluster.
 *
 * Screenshots: wide desktop captures (~16:10). Put files in public/assets/phones/.
 */
interface BrowserMockupProps {
  name?: string;
  specialty?: string;
  /** Address-bar label, e.g. "dryalda.com.au". */
  domain?: string;
  /** Path to a real desktop screenshot. Replaces the CSS mini-site when set. */
  screenshot?: string;
  screenshotAlt?: string;
  className?: string;
}

export default function BrowserMockup({
  name = "Dr Elena Marsh",
  specialty = "Oculoplastic surgery",
  domain = "northandrefine.com",
  screenshot,
  screenshotAlt,
  className = "",
}: BrowserMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-ink-line bg-ink-raised shadow-[0_44px_90px_-36px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b rule-dark bg-ink/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-clay/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-clay/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-clay/25" />
        <div className="ml-3 flex h-6 max-w-[55%] flex-1 items-center justify-center rounded-md border border-ink-line bg-ink/70 px-3">
          <span className="font-mono text-[10px] tracking-wide text-bone-dim">{domain}</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative aspect-[1.6] bg-bone">
        {screenshot ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={screenshot}
            alt={screenshotAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          /* Placeholder: a miniature editorial desktop clinic site (light) */
          <div className="flex h-full flex-col text-ink">
            {/* mini nav */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-3.5">
              <span className="font-display text-[13px] tracking-tight">
                {name.split(" ").slice(-1)[0]}
              </span>
              <div className="hidden items-center gap-5 sm:flex">
                <span className="h-1 w-7 rounded-full bg-ink/15" />
                <span className="h-1 w-7 rounded-full bg-ink/15" />
                <span className="h-1 w-7 rounded-full bg-ink/15" />
                <span className="rounded-full bg-ink px-3 py-1.5 text-[6px] font-medium uppercase tracking-[0.28em] text-bone">
                  Book
                </span>
              </div>
            </div>

            {/* split hero */}
            <div className="grid flex-1 grid-cols-2">
              <div className="flex flex-col justify-center px-6">
                <p className="font-mono text-[6px] uppercase tracking-[0.3em] text-champagne">
                  {specialty}
                </p>
                <p className="mt-2 font-display text-[22px] leading-[1.02] tracking-tight">
                  {name}
                </p>
                <div className="mt-3 h-1 w-3/4 rounded-full bg-ink/12" />
                <div className="mt-1.5 h-1 w-2/3 rounded-full bg-ink/12" />
                <span className="mt-5 inline-flex w-max rounded-full bg-ink px-3 py-1.5 text-[6px] font-medium uppercase tracking-[0.28em] text-bone">
                  Book a consultation
                </span>
              </div>
              <div className="portrait-fill m-4 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
