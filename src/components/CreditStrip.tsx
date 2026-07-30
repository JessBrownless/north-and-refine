import { INDUSTRIES } from "@/lib/industries";

/**
 * THE CREDIT STRIP — ⚠ PARKED (2026-07-24, same day it was built: "I think
 * we can drop the industries strip now… we might bring it back"). No live
 * consumers; it lived under the /services hero for one afternoon. Kept in
 * the drawer like Deck and NewsletterSignup because the client explicitly
 * wants the option back.
 *
 * What it is: the who-we-work-with fields as a one-row credit line — mono
 * label + marquee items at mono 12px/0.22em, gold ✦ separators, bone-alpha
 * hairlines, 64s loop with a 7% fade mask each end. THE ONE SANCTIONED
 * AUTO-MOTION on the site (globals.css `.animate-marquee:hover` pause; the
 * global reduced-motion guard freezes it). Its history, briefly: born as an
 * 80px-caps full-bleed ticker ("make it scroll so we can fit lots more
 * in"), demoted to this credit strip by the services-pacing handoff (at
 * band-title size it upstaged the H1), then dropped when the hub's dark
 * middle tightened around the belief + index.
 *
 * To revive: render inside a dark section, gutter width — it carries its
 * own hairlines and padding. FIELDS = the three landing-page industries
 * plus the wider fields served; names only, no links (client's call).
 */
const FIELDS = [
  ...INDUSTRIES.map((i) => i.name),
  "Plastic Surgery",
  "Dentistry",
  "Ophthalmology",
  "Hair Restoration",
  "Cosmetic Dentistry",
  "Fertility",
];

export default function CreditStrip() {
  return (
    <div className="relative z-10 pt-12 md:pt-16">
      <div className="shell">
        <div className="flex items-center gap-x-8 border-y border-bone/[.12] py-[22px]">
          <p className="overline shrink-0 text-clay">Who we work with</p>
          <div
            className="min-w-0 flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 7%, black 93%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 7%, black 93%, transparent)",
            }}
          >
            <div className="animate-marquee flex w-max" style={{ animationDuration: "64s" }}>
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                  {FIELDS.map((name) => (
                    <span key={name} className="flex items-center">
                      <span
                        className="overline whitespace-nowrap text-bone-dim"
                        style={{ fontSize: "12px", letterSpacing: "0.22em" }}
                      >
                        {name}
                      </span>
                      <span aria-hidden className="mx-6 text-[8px] text-champagne">
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
