import BrowserMockup from "@/components/BrowserMockup";
import PhoneMockup from "@/components/PhoneMockup";

/**
 * THE ASYMMETRIC DEVICE CLUSTER — a `BrowserMockup` anchored right with a
 * `PhoneMockup` overlapping its lower-left corner, each given a half-degree
 * of counter-rotation so the pair reads as two objects set down together
 * rather than one flat composite.
 *
 * CLAUDE.md names this THE CANONICAL "responsive showcase" pattern for work
 * and case-study heroes: it is the lockup that proves a practice's site is a
 * SITE and not a picture, because the same work is shown resolving at two
 * widths. Reuse it; do not re-compose the overlap by hand.
 *
 * IT LIVES INSIDE THE HERO SECTION (passed to `ArticleHeader`'s `media` slot,
 * which renders it as a sibling of the header so it escapes the header's
 * reading measure) — so the flat ink scene runs unbroken behind both the
 * lockup and the mockups. It is a hero canvas, not a `.frame`: no ratio box,
 * no plate radius. The devices carry their own hardware radii, which is the
 * standing exception to the rounded-brand rule.
 *
 * THE ENTRANCE IS THE SITEWIDE LOAD-IN, never `.reveal` — this is first-paint
 * content at the top of the document, and the browser leads the phone by
 * 0.15s so the cluster assembles in depth order rather than arriving flat.
 *
 * THE PHONE IS sm+ ONLY. Below that the overlap has nowhere to go and would
 * cover the capture it is meant to accompany, so it is dropped rather than
 * stacked: the desktop capture alone still tells the truth about the work.
 *
 * (The cluster glow that sat behind this retired 2026-07-09 with every other
 * background gradient. The ground is flat.)
 */
export default function CaseStudyDeviceCluster({
  desktopImage,
  desktopAlt,
  domain,
  mobileImage,
  mobileAlt = "",
  className = "shell-wide relative z-10 pb-24 md:pb-32",
}: {
  /** The desktop capture filling the browser window: shot at 1440×900, the
      real 16:10 viewport, so the plate fits uncropped. */
  desktopImage: string;
  desktopAlt: string;
  /** Address-bar label. The consumer resolves it (explicit frontmatter
      domain, else the live URL's host, else the client name) because only the
      consumer knows which sources exist. */
  domain: string;
  /** The tall mobile capture. Optional: a case study may ship desktop-only,
      and then the cluster is simply the one window. */
  mobileImage?: string;
  /** Empty by default, matching the live markup: the phone repeats the
      desktop capture's subject, so an empty alt is correct when frontmatter
      has nothing more specific to say. */
  mobileAlt?: string;
  /** The canvas the cluster is set on. The default is the case-study hero's:
      the wide shell, above the scene, with the phone's overhang paid for in
      bottom padding. Override to drop the cluster into a narrower frame. */
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <div
          className="relative sm:ml-20 md:ml-32 lg:ml-44 opacity-0 animate-fade-in-slow"
          style={{ animationDelay: "0.35s" }}
        >
          <BrowserMockup
            screenshot={desktopImage}
            screenshotAlt={desktopAlt}
            domain={domain}
            className="rotate-[0.5deg]"
          />
        </div>
        {mobileImage && (
          <div
            className="absolute -bottom-10 left-0 hidden sm:block md:-bottom-14 opacity-0 animate-fade-in-slow"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="-rotate-[7deg]">
              <PhoneMockup
                screenshot={mobileImage}
                screenshotAlt={mobileAlt}
                size="md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
