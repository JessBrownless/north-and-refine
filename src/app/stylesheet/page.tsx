import type { Metadata } from "next";
import StylesheetNav, { type NavTier } from "./StylesheetNav";
import PrinciplesTier from "./sections/Principles";
import AtomsTier from "./sections/Atoms";
import MoleculesTier from "./sections/Molecules";
import ComponentsTier from "./sections/Components";

/**
 * /stylesheet — THE DESIGN SYSTEM. Internal, noindexed, and disallowed in
 * robots.ts.
 *
 * RESTRUCTURED 2026-08-02 (client: "the design system on the stylesheet page
 * doesn't tell the truth anymore. What we have on the site now IS the design
 * system"). Two things were wrong with the old page and only one of them was
 * structural:
 *
 *  1. IT LIED. An audit found 32 statements contradicted by the code, seven
 *     of them serious — most memorably a whole Fonts section describing a
 *     two-font Saol + Dia house that layout.tsx stopped loading on
 *     2026-07-14. A design system nobody can trust is worse than none: it
 *     sends you to build against a brand that no longer exists.
 *  2. IT WAS INCOMPLETE. It documented tokens well and COMPONENTS barely at
 *     all, so the most-reused things on the site — the heroes, the bands, the
 *     form path — had no entry anywhere.
 *
 * THE SHAPE IS NOW FOUR TIERS, coarse to fine in what they govern:
 *   01 Principles  the canon that decides things before anything is drawn
 *   02 Atoms       indivisible tokens: colour, type, space, radius, material
 *   03 Molecules   the compositions that repeat, several named here for the
 *                  first time because components were hand-rolling them
 *   04 Components  every real component, Storybook-style
 *
 * Each tier is its own file under ./sections. That is not tidiness: the page
 * is long enough that authoring it as one file is how the last one drifted,
 * and separate files let it be revised a tier at a time.
 *
 * THE STANDING RULE, unchanged and now the first thing the page says: if you
 * add a token to globals.css, you add it here in the same change. Nothing on
 * this page is aspirational — everything documented ships.
 */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

/* The rail's tree. Ids must match the anchors the section files render —
   they are the contract between this file and ./sections. */
const TIERS: NavTier[] = [
  {
    id: "principles",
    title: "01 · Principles",
    sections: [
      { id: "principles-truth-contract", title: "How to read this page" },
      { id: "principles-flat-ground", title: "The ground is flat" },
      { id: "principles-pick-by-ground", title: "Pick by ground" },
      { id: "principles-entrances", title: "Entrances fade in place" },
      { id: "principles-rounded-brand", title: "We are a rounded brand" },
      { id: "principles-imagery", title: "Imagery" },
      { id: "principles-numbers-and-claims", title: "Numbers and claims" },
      { id: "principles-voice", title: "Voice" },
      { id: "principles-accessibility", title: "Accessibility" },
    ],
  },
  {
    id: "atoms",
    title: "02 · Atoms",
    sections: [
      { id: "atoms-foundations", title: "Fonts and defaults" },
      { id: "atoms-colour", title: "Colour" },
      { id: "atoms-type-scale", title: "The display ladder" },
      { id: "atoms-type-meta", title: "Body and meta voice" },
      { id: "atoms-space-grid", title: "Space and grid" },
      { id: "atoms-radius", title: "The radius scales" },
      { id: "atoms-material", title: "Material and hairlines" },
      { id: "atoms-scenes", title: "Scenes and stocks" },
      { id: "atoms-glass", title: "Glass" },
      { id: "atoms-motion", title: "Motion" },
    ],
  },
  {
    id: "molecules",
    title: "03 · Molecules",
    sections: [
      { id: "molecules-heading-group", title: "The heading group" },
      { id: "molecules-buttons", title: "Buttons" },
      { id: "molecules-links", title: "Links and ornaments" },
      { id: "molecules-baseline-locks", title: "Baseline locks" },
      { id: "molecules-rows", title: "Ruled rows" },
      { id: "molecules-meta", title: "Meta rows" },
      { id: "molecules-forms", title: "The form system" },
      { id: "molecules-prose", title: "Prose furniture" },
      { id: "molecules-placeholders", title: "Placeholders" },
    ],
  },
  {
    id: "components",
    title: "04 · Components",
    sections: [
      { id: "components-primitives", title: "Marks and primitives" },
      { id: "components-media", title: "Mockups and media" },
      { id: "components-heroes", title: "Heroes" },
      { id: "components-bands", title: "Section bands" },
      { id: "components-indexes", title: "Indexes and rails" },
      { id: "components-forms", title: "Forms" },
      { id: "components-graphics", title: "Brand graphics" },
      { id: "components-chrome", title: "Chrome" },
      { id: "components-parked", title: "Parked" },
    ],
  },
];

export default function StylesheetPage() {
  return (
    <main className="min-h-screen bg-ink text-bone">
      <div className="shell pb-32 pt-16 md:pt-24">
        <header className="max-w-[62ch]">
          <p className="overline">Internal reference</p>
          <h1 className="heading-xl from-overline">Design system</h1>
          <p className="lede body-lg text-bone-dim">
            The visual source of truth, in four tiers: the principles that
            decide things before anything is drawn, the atoms they resolve
            into, the molecules that repeat, and every component the site
            actually ships. If you add a token to globals.css, add it here in
            the same change.
          </p>
        </header>

        {/* The rail sits in its own column so the specimens keep a full
            measure beside it. Below xl it is dropped rather than stacked:
            an anchor index above a document you then scroll past is furniture
            that costs a screen and earns nothing. */}
        <div className="mt-20 flex gap-14">
          <aside className="hidden w-52 shrink-0 xl:block">
            <StylesheetNav tiers={TIERS} />
          </aside>
          <div className="min-w-0 flex-1">
            <PrinciplesTier />
            <AtomsTier />
            <MoleculesTier />
            <ComponentsTier />
          </div>
        </div>
      </div>
    </main>
  );
}
