import { Tier } from "../_ui";
import ComponentsMedia from "./ComponentsMedia";
import ComponentsBands from "./ComponentsBands";
import ComponentsGraphics from "./ComponentsGraphics";

/**
 * TIER 04 — COMPONENTS.
 *
 * A COMPOSER, not a document. The first version of this tier described the
 * library in prose with props tables and rendered only seven of forty
 * components; the client's verdict was exact — "we don't seem to have the
 * components across the site." A design system that only *talks* about a
 * component is a spec sheet, and a spec sheet drifts silently, because
 * nothing on the page fails when the component changes underneath it.
 *
 * So the tier now RENDERS the real imports with real props, and that has a
 * property worth stating: this page is a live CONSUMER of the library, so a
 * breaking change to a component breaks /stylesheet too. That is the point.
 * The page is a test as much as a document.
 *
 * Split across three files purely for size — each group runs to 400+ lines
 * of specimens and one file made review impossible. Each file owns its
 * anchor ids outright:
 *
 *   ComponentsMedia     primitives · media · heroes
 *   ComponentsBands     bands · indexes · forms
 *   ComponentsGraphics  graphics · chrome · parked
 *
 * ⚠ The ids must stay unique across the three. The left rail links to them,
 * and a duplicate id silently sends every link to whichever renders first.
 */
export default function ComponentsTier() {
  return (
    <>
      <Tier
        id="components"
        num="04"
        title="Components"
        note="The library as it actually ships, rendered rather than described: real imports, real props, and the routes that render each one. Specimen copy is deliberately inert, because this studio never drafts a client quote, rating or result and a design system is the last place to start. Where a component is described instead of shown, the card says why, and the reason is always that a second live instance would fight the real one."
      />
      <ComponentsMedia />
      <ComponentsBands />
      <ComponentsGraphics />
    </>
  );
}
