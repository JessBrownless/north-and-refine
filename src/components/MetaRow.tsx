import { Fragment, type ReactNode } from "react";

/**
 * THE META ROW: the small type that sits over and under a card. Categories,
 * dates, reading times, sector and year, the services a project took.
 * Named at /stylesheet under Molecules since the rebuild, hand-rolled in three
 * files until it was extracted 2026-08-05.
 *
 * COMPOSES two or three meta items on one baseline, joined by a decorative
 * separator that the row owns.
 *
 * THE RULE, and the reason this is a component rather than a div: the
 * separator is never a bullet character typed into the string. It is its own
 * `aria-hidden` span, so a screen reader reads "Search, 12 July 2026" and not
 * "Search dot 12 July 2026". Typing it into the copy is the drift this
 * molecule exists to stop, and the row can only enforce it by owning the
 * gap BETWEEN items. It does not reach inside one: an item arrives as a node
 * the consumer already styled from the ground's own ladder.
 *
 * TINTS COME FROM THE GROUND, which is what `tone` carries. The separator is
 * decorative, so on bone it takes `text-ink-faint`, the decorative-only tint,
 * never a meta tint that would make it read as content; on ink it takes
 * `text-clay`, the dimmest rung of the on-ink ladder, for the same reason.
 * `tone` also picks the hairline when `rule` is set, which is the live dark
 * use: the work plate's ruled caption.
 *
 * TWO SHAPES, both live:
 *   JOINED (the default) is the blog card's cluster: wrapped, baseline, tight
 *     gap, a middot between each pair.
 *   SPREAD + RULE is the work plate's caption: the title pushed left and the
 *     services pushed right over a top hairline, so the gap itself separates
 *     them and `separator={null}` turns the glyph off.
 *
 * REPLACED: BlogList.tsx (both rows on every card) and WorkPlate.tsx.
 *
 * ⚠ THREE THINGS DELIBERATELY NOT NORMALISED, because this was an extraction
 * and an extraction may not move the page:
 *
 *   1. WorkCard.tsx IS NOT A CONSUMER, though /stylesheet names it as one.
 *      Both of its meta lines type the middot into the string
 *      (`services.join(" · ")` and `${sector} · ${year}`), which is the single
 *      thing THE RULE forbids and the reason the molecule exists. Folding
 *      them in means splitting one string into two nodes, which changes what
 *      renders and what a screen reader says. It is a correction, not an
 *      extraction, so it is left standing and flagged here. WorkPlate's
 *      services item has the same fault inside it, for the same reason.
 *   2. BlogList's lower row runs `items-center`, not the baseline THE RULE
 *      asks for. It is preserved through `align`, not silently corrected.
 *   3. Every `gap` in use is passed explicitly by its consumer at the value
 *      that consumer already shipped. The default is the tight cluster only
 *      because that is the shape /stylesheet stages as canonical.
 */
export default function MetaRow({
  items,
  separator = "·",
  tone = "light",
  align = "baseline",
  wrap = true,
  gap = "gap-x-3 gap-y-1",
  spread = false,
  rule = false,
  className = "",
}: {
  /** The meta items, already carrying their own type utility and tint. The
      row writes a separator between each pair and nothing else. */
  items: readonly ReactNode[];
  /** The glyph between items. `null` for a row whose items are spread apart,
      where the space is the separator and a middot would be noise. */
  separator?: ReactNode;
  /** The ground the row sits on. Picks the separator tint and the hairline. */
  tone?: "light" | "dark";
  /** THE RULE is baseline. `center` exists for the one live row that shipped
      that way; see the note above. */
  align?: "baseline" | "center";
  wrap?: boolean;
  /** Spacing, always the consumer's own current value. Never normalised. */
  gap?: string;
  /** Push the first item left and the last right, for a caption row. */
  spread?: boolean;
  /** The caption hairline above the row, at the tone's rule tint. */
  rule?: boolean;
  /** Consumer positioning only, e.g. the margin that sets the row under its
      plate. It leads the class list so the shipped string is unchanged. */
  className?: string;
}) {
  const cls = [
    className,
    "flex",
    wrap && "flex-wrap",
    align === "center" ? "items-center" : "items-baseline",
    spread && "justify-between",
    gap,
    rule && `border-t ${tone === "dark" ? "rule-dark" : "rule-light"} pt-4`,
  ]
    .filter(Boolean)
    .join(" ");

  const separatorTint = tone === "dark" ? "text-clay" : "text-ink-faint";

  return (
    <div className={cls}>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && separator !== null && (
            <span aria-hidden className={separatorTint}>
              {separator}
            </span>
          )}
          {item}
        </Fragment>
      ))}
    </div>
  );
}
