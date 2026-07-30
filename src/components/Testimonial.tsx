/**
 * KIND WORDS — the one-testimonial band, componentised 2026-07-24 when
 * /services asked for it (client: "I don't like the recent work as social
 * proof. Let's just put a testimonial. We can use the Dr Yalda one from the
 * homepage. Image left, text."). One quote, image left, the words right —
 * the homepage grammar exactly, now shared so the two consumers can't drift.
 *
 * The big 4:5 slot carries a PORTRAIT MOCKUP at native orientation
 * (client-directed 2026-07-10: RowenPhone 5 — her mobile site on a phone
 * lying on TRAVERTINE, the same stone as the close plate's plinth, so the
 * plates read as one shoot; recipe in docs/briefs/hero-plates.md). The human
 * stays present as the CIRCULAR avatar in the attribution (the corners
 * rule's third exception — faces in circles read as people).
 *
 * ⚠ THE QUOTE is VISIBLY-MARKED PLACEHOLDER until real client words +
 * permission exist — we never draft quotes on a client's behalf (pre-launch
 * checklist). Swap the words HERE (one place now), keep the structure.
 *
 * Props: `rule` adds the section-level top hairline (dark-on-dark band
 * boundaries, e.g. /services); `exitFade` mounts the homepage's fade-to-ink
 * exit overlay (homepage only — it pairs with the ExitFades driver);
 * `image` overrides the plate (2026-07-24, client on /services: the photo
 * plate "doesn't fit the rest of the site" — it passes the hero's Lumen
 * graphic as a stand-in "to get more of a feel". `square` renders the frame
 * 1:1 for native-ratio artwork, per the graphics-run-native rule; the 4:5
 * default stays the photographic canon); `tone` swaps the ground and the
 * whole type ladder (2026-07-24, the homepage light-act trial — bone band
 * with the on-light ladder, clay kicker per the tracked-caps exception).
 * `spacious` is the statement-moment padding tier, for a light act that
 * wants room.
 */
export default function Testimonial({
  rule = false,
  exitFade = false,
  tone = "dark",
  spacious = false,
  image = {
    src: "/assets/plates/kind-words-rowen-phone-05.jpg",
    alt: "A phone on travertine displaying the Dr Yalda Jamali mobile site — brand and web design by North & Refine",
  },
}: {
  rule?: boolean;
  exitFade?: boolean;
  /** "ivory" (2026-07-24 services-pacing handoff): the light act's STEP UP —
      near-white #FBF8F1 with its own tighter padding (112/128), so the
      testimonial lifts off the bone index above it. Light ladder otherwise. */
  tone?: "dark" | "light" | "ivory";
  spacious?: boolean;
  image?: { src: string; alt: string; square?: boolean };
}) {
  const dark = tone === "dark";
  const ivory = tone === "ivory";
  const ground = dark
    ? "grain bg-ink"
    : `grain-light ${ivory ? "bg-ivory" : "bg-bone"} text-ink`;
  const ruleCls = dark ? "rule-dark" : "rule-light";
  // Kicker: bone on ink; clay on bone — the tracked-caps ornament exception
  // (the one sanctioned clay-on-light, as MethodSection uses).
  const kickerColor = dark ? "" : " text-clay";
  const nameColor = dark ? "text-bone" : "text-ink";
  const metaColor = dark ? "text-bone-dim" : "text-ink-dim";
  const middot = dark ? "bg-bone/15" : "bg-ink/15";
  // Ivory carries the handoff's exact pads (112 top / 128 bottom).
  const pad = ivory
    ? "pt-28 pb-32"
    : spacious
      ? "py-32 md:py-44"
      : "py-24 md:py-32";

  return (
    <section
      className={`relative overflow-hidden ${ground}${
        rule ? ` border-t ${ruleCls}` : ""
      }`}
    >
      <div className={`shell relative z-10 ${pad}`}>
        <p className={`overline${kickerColor} mb-8 reveal md:mb-10`}>Kind words</p>
        {/* 5 / break / 5 / break (2026-07-24, client's call, third shape of
            the day — 4/7 → 6/6 → this): image cols 1–5, col 6 the gutter,
            words cols 7–11, col 12 open air on the right — the balanced
            split with breathing columns either side of the words. Baseline
            lock unchanged. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:[align-items:last_baseline] md:gap-8">
          <div className="reveal md:col-span-5">
            <div className={`frame ${image.square ? "aspect-square" : "aspect-[4/5]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="plate-develop absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <blockquote
              className="statement max-w-[24ch] text-balance reveal"
              style={{ transitionDelay: "80ms" }}
            >
              &ldquo;Placeholder — the client&rsquo;s real words will sit
              here. We don&rsquo;t write these <em>ourselves</em>.&rdquo;
            </blockquote>
            {/* Attribution — items-center, not baseline: the row mixes image
                and type. */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t ${ruleCls} pt-5 reveal`}
              style={{ transitionDelay: "160ms" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/testimonials/client-avatar.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                className="plate-develop h-10 w-10 rounded-full object-cover"
              />
              <p className={`body-sm ${nameColor}`}>Dr Yalda Jamali</p>
              <span aria-hidden className={`hidden h-3 w-px ${middot} sm:block`} />
              <p className={`body-sm ${metaColor}`}>
                Cosmetic doctor — real words to come
              </p>
            </div>
          </div>
        </div>
      </div>
      {exitFade && (
        <div
          aria-hidden
          className="exit-fade exit-fade-long absolute inset-0 z-20 bg-ink"
        />
      )}
    </section>
  );
}
