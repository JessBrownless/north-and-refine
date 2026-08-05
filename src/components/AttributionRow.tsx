/**
 * THE ATTRIBUTION ROW: who said it. A circular avatar, a name, a hairline
 * divider and a role, sitting under a quote and over a top rule. Named at
 * /stylesheet under Molecules since the rebuild, hand-rolled in Testimonial
 * until it was extracted 2026-08-05.
 *
 * THE RULE, three parts, each of which the row would get wrong on its own:
 *
 *   ITEMS-CENTER, NOT A BASELINE LOCK. Everywhere else on this site type
 *   beside type locks on baselines (BASELINES LOCK, 2026-07-10). This row is
 *   the exception because it mixes an IMAGE with type, and an avatar has no
 *   baseline to lock to. Do not "fix" it to items-baseline.
 *
 *   THE AVATAR IS A CIRCLE, the third standing exception to the rounded-brand
 *   corners rule, because faces in circles read as people. It is `aria-hidden`
 *   with an empty alt, which is why this component takes a src and not an alt:
 *   the name sitting beside it is already the accessible text, and describing
 *   the face again would have a screen reader say the person twice.
 *
 *   THE DIVIDER IS A DRAWN HAIRLINE, a 1px h-3 span, not a middot glyph and
 *   not a border. It hides below sm, where the row wraps and a divider left
 *   mid-air would read as a stray mark.
 *
 * TONE IS A PROP, NEVER A FORK (the FaqSection precedent). Every tint in the
 * row swaps with the ground: the top rule, the name, the role and the
 * divider. The role stays on the ground's SECONDARY rung (`bone-dim` on ink,
 * `ink-dim` on bone) rather than the third: on bone the third rung is clay,
 * which is sub-AA there, and a person's role is text to be read.
 *
 * REPLACED: Testimonial.tsx, whose own tone prop feeds this one. Testimonial's
 * "ivory" is a ground step, not a polarity, so it maps to "light" here.
 *
 * `reveal` and `delay` are the consumer's entrance choreography rather than
 * anything intrinsic to an attribution, and follow WorkPlate's precedent: the
 * class is offered as a prop so the row can also sit somewhere that reveals
 * for it.
 */
export default function AttributionRow({
  name,
  role,
  avatarSrc,
  tone = "dark",
  className = "",
  reveal = false,
  delay = 0,
}: {
  name: string;
  role: string;
  /** The face. No alt: the img is aria-hidden by rule, see above. */
  avatarSrc: string;
  tone?: "dark" | "light";
  /** Consumer positioning only, e.g. the margin off the quote above. It leads
      the class list so the shipped string is unchanged. */
  className?: string;
  reveal?: boolean;
  delay?: number;
}) {
  const dark = tone === "dark";
  const cls = [
    className,
    "flex flex-wrap items-center gap-x-5 gap-y-2 border-t",
    dark ? "rule-dark" : "rule-light",
    "pt-5",
    reveal && "reveal",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarSrc}
        alt=""
        aria-hidden
        loading="lazy"
        className="plate-develop h-10 w-10 rounded-full object-cover"
      />
      <p className={`body-sm ${dark ? "text-bone" : "text-ink"}`}>{name}</p>
      <span aria-hidden className={`hidden h-3 w-px ${dark ? "bg-bone/15" : "bg-ink/15"} sm:block`} />
      <p className={`body-sm ${dark ? "text-bone-dim" : "text-ink-dim"}`}>{role}</p>
    </div>
  );
}
