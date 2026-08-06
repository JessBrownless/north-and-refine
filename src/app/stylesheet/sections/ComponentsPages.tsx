import { Section, Sub, Code, Stage, Entry } from "../_ui";

import SharedCanvas from "@/components/SharedCanvas";
import ArticleFeaturedFigure from "@/components/ArticleFeaturedFigure";
import ArticleFootBackLink from "@/components/ArticleFootBackLink";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleProseWell from "@/components/ArticleProseWell";
import BalancedProsePair from "@/components/BalancedProsePair";
import BlogEmptyState from "@/components/BlogEmptyState";
import BlogRailBand from "@/components/BlogRailBand";
import BlogTeaserCard from "@/components/BlogTeaserCard";
import CaseStudyDeviceCluster from "@/components/CaseStudyDeviceCluster";
import CaseStudyProseGrid from "@/components/CaseStudyProseGrid";
import CaseStudyQuoteBand from "@/components/CaseStudyQuoteBand";
import CollectionHeader from "@/components/CollectionHeader";
import GlowBand from "@/components/GlowBand";
import HeadlineTitleChip from "@/components/HeadlineTitleChip";
import HoldingFineprint from "@/components/HoldingFineprint";
import HoldingMasthead from "@/components/HoldingMasthead";
import MockupReamBand from "@/components/MockupReamBand";
import NextProjectBand from "@/components/NextProjectBand";
import NextStepsList from "@/components/NextStepsList";
import OfferBand from "@/components/OfferBand";
import PricingPackageGrid, {
  type PricingPackage,
} from "@/components/PricingPackageGrid";
import ResultsBand from "@/components/ResultsBand";
import RuledLinkRows from "@/components/RuledLinkRows";
import SelectedWorkBand from "@/components/SelectedWorkBand";
import ServiceProcessTimeline from "@/components/ServiceProcessTimeline";
import StartProjectCrossLink from "@/components/StartProjectCrossLink";
import StudioBioCard from "@/components/StudioBioCard";
import StudioFactsLedger from "@/components/StudioFactsLedger";
import StudioNarrativeBand from "@/components/StudioNarrativeBand";
import WhatWeDoBand from "@/components/WhatWeDoBand";
import WorkIndexBand from "@/components/WorkIndexBand";
import WorkPlate from "@/components/WorkPlate";

import type { JournalEntry } from "@/lib/journal";
import type { WorkEntry, WorkMetric } from "@/lib/work";

/**
 * TIER 04 — THE PAGE BANDS, THE ROUTE STACKS, AND WHAT IS STILL INLINE.
 *
 * ⚠ THIS WAS A TIER OF ITS OWN (05 · Page templates) FOR ABOUT A DAY, AND IT
 * SHOULD NOT HAVE BEEN. A tier boundary has to be a level of COMPOSITION;
 * this one was "which components were extracted when", and it showed: the
 * file rendered thirty-three components with the same imports, the same
 * specimen props and the same prop tables as the three files beside it. So it
 * was folded into 04 on 2026-08-05, the day it was written, and what survives
 * is what was genuinely different about it: an INDEX BY ROUTE rather than by
 * kind, plus the two written sections that are not component records at all.
 *
 * WHY THE ROUTE INDEX SURVIVES A MERGE THAT DELETED THE TIER. Every band
 * below belongs to one route or one route family, so the route is how a
 * reader actually looks for it; the sections above index the pieces that
 * recur across many routes, which is how a reader looks for THOSE. Two
 * indexes of one tier, and neither is a level of composition.
 *
 * WHAT NOTHING HERE MAY DO. It may not hand-copy markup into a stage. Every
 * specimen imports the real component, so this page is a live consumer of the
 * same copy the routes render and the two cannot say different things. Where
 * a component cannot be rendered honestly — a scroll pin with nothing to
 * hold, an overlay that would cover the page — it gets a written entry
 * instead, never an imitation.
 *
 * THE ONE FINDING THAT SURVIVED THE 2026-08-05 EXTRACTION SWEEP, because it
 * was a comment rather than markup: /services carried a note claiming its
 * belief statement ran on "the same 140vh sticky track" as the homepage
 * manifesto. It never did. That claim is now answered in <BeliefStatement>'s
 * own docstring, where a reader of the component will meet it, and the two
 * shapes are separate components, so the same confusion cannot recur
 * silently. (Since 2026-08-07 NEITHER pins: the homepage manifesto unpinned
 * at the client's call, the same friction verdict that unpinned /services on
 * 2026-07-24. The two shapes now differ in dress, not mechanics: an air band
 * on the glow versus the hanging-kicker indent inside the scroll index.)
 */

/* ── Documentation furniture, local to this file (the same shapes tier 04
      uses; each section file keeps its own copy so no shared helper drifts
      under a file that did not ask for the change). ─────────────────────── */

/** Component heading: the name, then the routes that render it. */
function Comp({ name, where }: { name: string; where: string }) {
  return <Sub title={name} note={where} />;
}

/** The body of a component card. */
function What({ children }: { children: React.ReactNode }) {
  return <p className="body-sm mt-3 max-w-[72ch] text-bone-dim">{children}</p>;
}

/** A prop list. Rows are Entry rows so props and components share one voice. */
function Props({ children }: { children: React.ReactNode }) {
  return <div className="mt-5">{children}</div>;
}

/**
 * A ROUTE GROUP inside the specimen section. It has to outrank <Comp> without
 * outranking the section head above it, and every heading rung between them is
 * already spoken for — so it ranks the way the Tier head does, by an index
 * numeral over a rule with air around it, rather than by size.
 */
function Group({
  num,
  title,
  note,
}: {
  num: string;
  title: string;
  note: string;
}) {
  return (
    <div className="mt-20 border-t rule-dark pt-10">
      <p className="index-num text-clay">{num} /</p>
      <p className="label mt-2 text-bone">{title}</p>
      <p className="body-sm mt-2 max-w-[70ch] text-bone-dim">{note}</p>
    </div>
  );
}

/**
 * The INLINE tag, built on StatusTag's shape rather than its statuses: this
 * is not a lifecycle state like parked, it is a fact about where the markup
 * lives. Neutral rule-dark, never champagne — gold is details and
 * interactions, and this is running meta.
 */
function InlineTag() {
  return (
    <span className="fineprint ml-2 rounded-ui-sm border rule-dark px-1.5 py-0.5 uppercase tracking-[.12em] text-clay">
      inline
    </span>
  );
}

/** One beat in a route's stack: its order, its name, and what it does. */
function Beat({
  n,
  name,
  what,
  kind = "component",
}: {
  n: number;
  name: string;
  what: string;
  /** "component" renders the name in code voice, because you can import it. */
  kind?: "component" | "inline";
}) {
  return (
    <li className="flex gap-4 border-t rule-dark py-3 sm:gap-6">
      <span className="fineprint w-6 shrink-0 pt-1">
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="body-sm text-bone">
          {kind === "component" ? <Code>{name}</Code> : name}
          {kind === "inline" && <InlineTag />}
        </p>
        <p className="fineprint mt-1.5 max-w-[70ch]">{what}</p>
      </div>
    </li>
  );
}

/** One route: its path, its arc in a line, and the stack in order. */
function Route({
  path,
  note,
  children,
}: {
  path: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <p className="label text-bone">{path}</p>
      <p className="fineprint mt-1.5 max-w-[70ch]">{note}</p>
      <ol className="mt-4 border-b rule-dark">{children}</ol>
    </div>
  );
}

/* ── FIXTURES ─────────────────────────────────────────────────────────────
   Specimen copy, and it says so out loud. NOTHING HERE MAY READ AS A CLIENT
   QUOTE, RATING, RESULT, METRIC OR PRICE: see the numbers-and-claims
   principle in tier 01. The specimens exercise STRUCTURE, so the words are
   allowed to be dull, and where a component's whole job is to show a figure
   the fixture says "Figure" rather than inventing one. Every fixture is typed
   against the real collection type, so a change to the content model breaks
   this page at build time rather than quietly making it wrong. */

const SPECIMEN_POINTS = [
  "A specimen point, written as a full sentence so the wide list shows the measure it holds.",
  "A second specimen point, long enough that the row wraps beside its index numeral.",
  "A third specimen point, so the divided stack reads as a stack rather than a pair.",
];

const SPECIMEN_DELIVERABLES = [
  "A specimen deliverable",
  "A second specimen deliverable",
  "A third specimen deliverable",
  "A fourth, slightly longer specimen deliverable",
  "A fifth specimen deliverable",
  "A sixth specimen deliverable",
];

const SPECIMEN_ROWS = [
  {
    href: "/stylesheet",
    title: "A specimen row title",
    lead: "A specimen lead, one line, shaped by the page rather than by the component.",
  },
  {
    href: "/stylesheet#components-page-bands",
    title: "A second specimen row title, long enough to wrap",
    lead: "A second specimen lead, so the stagger between rows is visible on entry.",
  },
];

const SPECIMEN_FACTS = [
  { term: "Client", value: "Practice name" },
  { term: "Sector", value: "Specimen sector" },
  { term: "Services", value: "Web design, search, brand" },
  { term: "Year", value: "2026" },
];

/**
 * A SPECIMEN case study, shaped exactly like a WorkEntry off the collection so
 * every plate and card is exercised through its real type. NO IMAGERY on
 * purpose: with `thumbImage` absent the plates fall through to the typographic
 * placeholder, which is both the honest state of an unillustrated study and
 * the only figure a documentation page has any business showing.
 */
function specimenProject(n: number, client: string): WorkEntry {
  return {
    slug: `specimen-case-study-${n}`,
    content: "",
    readingMinutes: 4,
    frontmatter: {
      title: `Specimen case study ${n}`,
      description: "A specimen entry that exists only on this page.",
      client,
      sector: "medical-aesthetics",
      services: ["Web design", "SEO", "Brand identity"],
      year: "2026",
      publishedAt: "2026-01-01",
      summary:
        "A short specimen outcome line, showing the measure the caption holds under the plate.",
    },
  };
}

const SPECIMEN_PROJECTS: WorkEntry[] = [
  specimenProject(1, "Practice name"),
  specimenProject(2, "Second practice name"),
  specimenProject(3, "Third practice name"),
  specimenProject(4, "Fourth practice name"),
];

/** A specimen journal entry, same discipline: real type, inert copy, no image. */
function specimenPost(n: number, title: string): JournalEntry {
  return {
    slug: `specimen-entry-${n}`,
    content: "",
    readingMinutes: 6,
    frontmatter: {
      title,
      description: "A specimen entry that exists only on this page.",
      publishedAt: `2026-0${n}-01`,
      category: "studio-notes",
    },
  };
}

const SPECIMEN_POSTS: JournalEntry[] = [
  specimenPost(1, "A specimen entry title at the card-caption register"),
  specimenPost(2, "A second specimen entry title, long enough to wrap its measure"),
  specimenPost(3, "A third specimen entry title"),
];

/** ⚠ NOT RESULTS. The word "Figure" is the fixture; the real values are
    frontmatter, and no number appears on this page that we would have to
    defend. */
const SPECIMEN_METRICS: WorkMetric[] = [
  { value: "Figure", label: "A specimen label naming what the figure measures" },
  { value: "Figure", label: "A second specimen label" },
  { value: "Figure", label: "A third specimen label" },
];

/** ⚠ NOT PRICES. Same rule, same reason: the live figures are page data, and
    they are placeholders there too until the pre-launch checklist clears. */
const SPECIMEN_PACKAGES: PricingPackage[] = [
  {
    name: "Specimen package",
    price: "Guide figure",
    summary: "A specimen summary of what the package covers.",
    for: "Who the package is for",
    includes: [
      "A specimen inclusion",
      "A second specimen inclusion",
      "A third specimen inclusion",
    ],
  },
  {
    name: "Second specimen package",
    price: "Guide figure",
    summary:
      "The featured card, which raises to the ink-raised fill and takes the solid primary pill.",
    for: "Who the package is for",
    includes: [
      "A specimen inclusion",
      "A second specimen inclusion",
      "A third specimen inclusion",
      "A fourth specimen inclusion",
      "A fifth specimen inclusion",
    ],
    featured: true,
  },
  {
    name: "Third specimen package",
    price: "Guide figure",
    summary: "A third specimen summary, so the row bottom locks its three pills.",
    for: "Who the package is for",
    includes: ["A specimen inclusion", "A second specimen inclusion"],
  },
];

const SPECIMEN_PROCESS = [
  {
    num: "01",
    title: "Specimen stage",
    body: "A specimen line describing the stage, at the body-sm register the column holds.",
  },
  {
    num: "02",
    title: "Second specimen stage",
    body: "A second specimen line, so the glyph opacity ramp reads across the run.",
  },
  {
    num: "03",
    title: "Third specimen stage",
    body: "A third specimen line, showing the rule breaking behind each mark.",
  },
  {
    num: "04",
    title: "Fourth specimen stage",
    body: "A fourth specimen line, which is the count two of the three disciplines run.",
  },
];

const SPECIMEN_STEPS = [
  "A specimen step, one line, at the rail scale the column beside a form holds.",
  "A second specimen step, long enough to wrap beside its index numeral.",
  "A third specimen step, closing the sequence.",
];

const SPECIMEN_NARRATIVE = [
  "A second specimen paragraph, stepped down to the body register on bone-dim, which is where the narrative gets quieter.",
  "A third specimen paragraph, so the 80ms reveal ladder is visible running down the measure in reading order.",
];

const SPECIMEN_PROSE_PAIR = [
  "A specimen paragraph that flows into the balanced columns, written long enough that the browser has real text to distribute between the two.",
  "A second specimen paragraph, continuing the same stream rather than starting a new one, because at md there is no inter-paragraph margin and the pair reads as one piece of newspaper setting.",
  "A third specimen paragraph, so the balancer has enough copy to bottom the two columns out level at every viewport.",
];

export default function ComponentsPages() {
  return (
    <>
      {/* ═══ ANATOMY ═════════════════════════════════════════════════════ */}
      <Section
        id="components-anatomy"
        title="Page anatomy"
        note="Each live route, top to bottom, in render order. The sections above tell you what exists; these tell you what a page IS, and they are also the index the page bands below are grouped by. Read a stack before building a new route: the arc is the decision the page makes first, and every one of these was argued out with the client at some point. Mockup routes are excluded (noindexed, robots-disallowed, archive only)."
      >
        <p className="fineprint mt-5 max-w-[72ch]">
          Every name in code voice is a real component you can import, and after
          the 2026-08-05 sweep nearly all of them are. A name in plain text
          tagged <InlineTag /> is markup that lives in that page file and
          nowhere else: reachable by one route, invisible to this system, and
          listed again in <Code>Still inline</Code> below with a verdict. Four
          remain.
        </p>

        <Route
          path="/"
          note="The type-led homepage. Three composed sections, then a scroll-pinned statement, then work, offer, proof and the close, with fade-to-ink handovers between the dark bands."
        >
          <Beat n={1} name="SharedCanvas" what="One ground under beats 2 and 3 (2026-08-07, after the hero's one-day seam-contract attempt read as a line): base, the full-dose HeroGlow, grain and the foot fade. Its clip is also what un-crops the hero's devices — sides shear at the viewport edge, bottoms render in full." />
          <Beat n={2} name="HomeHero" what="The bespoke centred masthead over the device row, GROUNDLESS on the canvas: no background, no clip, no glow of its own. The devices trail past its 100vh line into the manifesto's air." />
          <Beat n={3} name="ManifestoTrack" what="The statement in a min-h air band, GROUNDLESS on the same canvas, filling word by word as it scrolls through in NORMAL FLOW — unpinned 2026-08-07, the site's last scroll pin. A secondary Our story link below; takes exitFade." />
          <Beat n={3} name="SelectedWorkBand" what="CollectionHeader over the featured projects: a Carousel rail below md, a staggered pair grid above it, each plate a WorkPlate." />
          <Beat n={4} name="WhatWeDoBand" what="A shell, a kicker and an exit fade around ServicesShowcase. The page's formal stabiliser, between two deliberately asymmetric neighbours." />
          <Beat n={5} name="Testimonial" what="Kind words, dark tone, with the exit fade. The quote is a marked placeholder in the component itself." />
          <Beat n={6} name="LogoStrip" what="The trust bar: words first, then the roster corroborates." />
          <Beat n={7} name="BlogRailBand" what="The second CollectionHeader, then a Carousel of BlogTeaserCards. The band returns null when no posts exist, so the guard is no longer the page's." />
          <Beat n={9} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/about"
          note="One shared dark canvas for the first three beats, then the page's single light act, then the close. The canvas is the sanctioned way to blend dark sections; the seam-matching alternative failed twice here."
        >
          <Beat n={1} name="SharedCanvas" what="The wrapper that owns the ground for beats 2 to 4: warm base, one HeroGlow, grain, and a foot strip fading to ink so the next section joins invisibly." />
          <Beat n={2} name="PageHero" what="The canonical split masthead, rendered groundless (ground={false}) so the canvas shows through. No hero CTA: /about is not a commercial page." />
          <Beat n={3} name="MockupReamBand" what="Two staggered, edge-cropped rows of black glass tiles carrying blank devices. Decorative, aria-hidden, on the load-in entrance." />
          <Beat n={4} name="StudioNarrativeBand" what="Kicker in the left rail, the origin narrative in the right measure, plus one quiet blob of its own since the canvas glow leans left." />
          <Beat n={5} name="MethodSection" what="The three method beats as an indexed ruled list on bone. The page's one light act." />
          <Beat n={6} name="FaqSection" what="Cream tone. The same FAQS array feeds this band and the page's FAQPage schema." />
          <Beat n={7} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/services"
          note="The hub. Hero, then one dark surface carrying belief, elaboration and the scroll index together, then a light testimonial and a dark FAQ so the page finishes on a single light moment."
        >
          <Beat n={1} name="PageHero" what="Split masthead with the graphic media slot (ServicesHeroGraphic) and the glass CTA pill. borderBottom marks the hero's foot." />
          <Beat n={2} name="BeliefCanvas" what="The dark middle: ink, grain and an absolutely-positioned clipping layer for SectionGlow plus two canvas pools. The glow layer is a SIBLING of the sticky content below it, never an ancestor." />
          <Beat n={3} name="BeliefStatement" what="The hanging-kicker indent around ManifestoStatement, in normal flow. No sticky wrapper and no track height: the pin was removed 2026-07-24 on purpose." />
          <Beat n={4} name="BalancedProsePair" what="Two or more paragraphs flowing through balanced CSS columns, seated in exactly the index rows' content columns so the edges line up with the hairlines below." />
          <Beat n={5} kind="inline" name="Scroll-index wrapper" what="A shell div with the page's own foot padding around ServicesScrollIndex. Four utility classes; the odometer inside is the component." />
          <Beat n={6} name="Testimonial" what="Ivory tone, square graphic. The ground step from bone to ivory is the boundary; no hairline." />
          <Beat n={7} name="FaqSection" what="Dark tone, because this page runs dark from hero to index and a cream FAQ would strand a single light band." />
          <Beat n={8} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/services/[slug]"
          note="One page per discipline, data-driven from lib/services.ts. The split exists so each discipline can rank for its own queries and carry its own process."
        >
          <Beat n={1} name="PageHero" what="Split masthead with the hero CTA: these are the most commercial routes on the site." />
          <Beat n={2} name="OfferBand" what="What it is. Passes glow, spacious and list='deliverables'. The glow because this band adjoins the hero and owns the seam blend." />
          <Beat n={3} name="ServiceProcessTimeline" what="The discipline's own process: StageGlyph nodes on one horizontal rule, drawing in on a stagger, stacking below md. Step counts differ by discipline, which is the point of the split." />
          <Beat n={4} name="RuledLinkRows" what="The other disciplines, layout='onward'. Internal linking so any discipline reaches the other two without going back to the hub." />
          <Beat n={5} name="FaqSection" what="Cream tone, page-owned questions feeding this page's FAQPage schema." />
          <Beat n={6} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/work"
          note="Masthead, then the case studies. Two beats and a close: the work is the argument, so nothing sits between the reader and it."
        >
          <Beat n={1} name="PageHero" what="The wide split, with HeadlineTitleChip plates set into the H1 between words. The lede drops to a second row. No borderBottom, so hero and grid read as one surface." />
          <Beat n={2} name="WorkIndexBand" what="A SectionGlow band carrying the WorkCard stack at gap-24, with its own written empty state when nothing is published." />
          <Beat n={3} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/work/[slug]"
          note="An ARTICLE, not a masthead. The detail pages were deliberately kept out of PageHero: a case study opens with a meta rail attached, not with a page title."
        >
          <Beat n={1} kind="inline" name="Article hero scene" what="The flat ink scene with grain that runs unbroken behind both the lockup and the device cluster. One section element with four classes." />
          <Beat n={2} name="ArticleHeader" what="Kicker, title, lede and the four-fact meta rail, with CaseStudyDeviceCluster in the media slot on shell-wide." />
          <Beat n={3} name="ResultsBand" what="The frontmatter metrics as a rule-divided three-up of big bone numerals. Renders nothing when the study carries none." />
          <Beat n={4} name="CaseStudyProseGrid" what="The MDX body on the wide canvas: h2s become kickers in the left rail, copy sits at a reading measure right, figures span the rail or pair 5+5. The h2 map is exported from the same file as the grid." />
          <Beat n={5} name="CaseStudyQuoteBand" what="A centred quote interrupting the left-right rhythm. From frontmatter, so it renders only where a real quote exists, and none currently does." />
          <Beat n={6} name="NextProjectBand" what="One onward link at the article's foot: kicker, then the next study's title dimming on hover." />
          <Beat n={7} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/blog"
          note="Masthead on ink over a bone listing. The hero rejoined the ink family in the cohesion pass; only the listing below stayed light."
        >
          <Beat n={1} name="PageHero" what="Split masthead with borderBottom, which doubles as the filter strip's top rule." />
          <Beat n={2} name="BlogList" what="The category filter plus the cards. Every post renders server-side for SEO; the client only shows and hides." />
          <Beat n={3} name="BlogEmptyState" what="The alternative to beat 2: a bone band saying the first entries are being written. A section rather than a paragraph, so an empty collection does not collapse to a hairline." />
          <Beat n={4} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/blog/[slug]"
          note="The reading route. One shell, one 720px column, and a featured figure allowed to escape it."
        >
          <Beat n={1} kind="inline" name="Article shell" what="An article element and one shell div holding the reading column on the shared left rail. Two elements, no design of their own." />
          <Beat n={2} name="ArticleHeader" what="Kicker, title, lede and byline, with both measures passed as '' because the column already caps at 720px. ArticleFeaturedFigure rides the media slot so it keeps its 880px canvas." />
          <Beat n={3} name="ArticleProseWell" what="The MDX body at 720px, with the block rhythm the well owns and the element styling that mdx-components does." />
          <Beat n={4} name="StudioBioCard" what="The written-by aside: kicker, studio name, one paragraph, ghost link to /about. Its copy is the component's own boilerplate." />
          <Beat n={5} name="ArticleFootBackLink" what="The ruled return to the collection. The only arrow on the site that leads its label." />
          <Beat n={6} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/industries"
          note="An index page and nothing else. The masthead names the field, the rows are the content, the close asks for the work."
        >
          <Beat n={1} name="PageHero" what="Split masthead with the hero CTA: the industries pages are commercial." />
          <Beat n={2} name="RuledLinkRows" what="layout='index'. The lead on each row is the intro's first sentence, split at render by the page, never by the component." />
          <Beat n={3} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/industries/[slug]"
          note="The SEO landing pages, data-driven from lib/industries.ts. The shape is fixed and repeating: add an entry, get a route."
        >
          <Beat n={1} name="PageHero" what="Split masthead with the hero CTA. The lede is the intro's FIRST SENTENCE only, because the split hero's lede column is a 46ch measure." />
          <Beat n={2} name="OfferBand" what="How we help, on the defaults: the points list, no glow, standard padding. Its prose is the rest of the intro, which the hero could not hold." />
          <Beat n={3} name="FaqSection" what="Cream tone, page-owned questions." />
          <Beat n={4} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/pricing"
          note="Masthead, three cards, questions, close. The plainest commercial arc on the site."
        >
          <Beat n={1} name="PageHero" what="Split masthead with the hero CTA." />
          <Beat n={2} name="PricingPackageGrid" what="Three ruled cards on a three-column grid: the featured one takes the raised fill and the primary pill, the others the outline. Guide-pricing fineprint below." />
          <Beat n={3} name="FaqSection" what="Cream tone. The last bespoke details block on the site folded into this component." />
          <Beat n={4} name="ContactCTA" what="The close." />
        </Route>

        <Route
          path="/contact"
          note="A CONVERSION page: masthead over one banded section, and no ContactCTA, because the form is the close. Plain contact since the project questions moved to their own route."
        >
          <Beat n={1} name="PageHero" what="Split masthead, no hero CTA: the form below is the CTA." />
          <Beat n={2} name="GlowBand" what="blob='right' behind the form column, pool on for the quiet canvas wash low-left under the ledger. Beats 3 to 6 sit inside it." />
          <Beat n={3} name="StudioFactsLedger" what="The studio's details as ruled ledger rows, label left, value locked to its baseline. Reads SITE, so it cannot drift from the schema or the footer." />
          <Beat n={4} name="NextStepsList" what="Three numbered steps at rail scale, the process grammar compressed." />
          <Beat n={5} name="StartProjectCrossLink" what="A ruled pointer to /start-a-project, so the two conversion paths cross-link." />
          <Beat n={6} name="ContactForm" what="Right columns. Netlify form project-enquiry." />
        </Route>

        <Route
          path="/start-a-project"
          note="The fallback page behind the form overlay: what no-JS visitors, middle-clicks, crawlers and shared links get. The same form component runs on both paths, so they cannot drift."
        >
          <Beat n={1} name="PageHero" what="Split masthead, no hero CTA. The reply promise lives in the lede here, where it reads as a promise rather than a footnote." />
          <Beat n={2} name="GlowBand" what="blob='left' so the right columns stay quiet behind the fields, tighter top padding, and a one-column grid." />
          <Beat n={3} name="StartProjectForm" what="The stepped form at the dark default tone, capped to a 680px measure so the choice cards do not stretch." />
        </Route>

        <Route
          path="/privacy"
          note="The fine print. The shortest route on the site, and the only masthead still off the canon — though only on ALIGNMENT now: its grammar was inverted until 2026-08-05, carrying flavour in the kicker ('The fine print') and the page name in the H1 ('Privacy policy'), which was the house rule backwards."
        >
          <Beat n={1} name="PageHero" what="Takes the LEGACY left alignment, by passing no align at all. Every other interior page passes align='split'. Its H1 conforms to the masthead grammar: kicker 'Privacy', display line 'What we collect, and what we don't.' — and no accent word, because this is the one masthead at .heading-xl rather than .display, and fine print should not perform." />
          <Beat n={2} kind="inline" name="Policy stack" what="Six ruled sections from a local SECTIONS array at a 3xl measure, each a heading-sm over body-reading, with a last-updated line." />
        </Route>

        <Route
          path="/coming-soon"
          note="The holding page. Served on EVERY route while HOLDING_PAGE is on, which makes it the most-seen page on the site right now."
        >
          <Beat n={1} name="HoldingPageShell" what="The fixed, full-screen layer ABOVE the site chrome, carrying the monogram, the centred 50/50 grid and HoldingFineprint at the foot. The vertical column is one piece on purpose." />
          <Beat n={2} name="HoldingMasthead" what="The left half: kicker, statement with the accent word, and SITE.tagline as the lede." />
          <Beat n={3} name="HoldingEnquiryCard" what="The right half: kicker, ContactForm inside card-glass, and the email escape hatch below." />
        </Route>

        <Sub
          title="What the stacks make visible"
          note="ContactCTA closes eleven of the fifteen routes. The four exceptions are deliberate and worth knowing: /contact and /start-a-project are conversion pages whose form IS the close, /privacy is fine print that should not sell, and /coming-soon replaces the whole site. Two other patterns: every interior masthead is the same PageHero split except /privacy's legacy left, and both detail routes open with ArticleHeader instead, because a case study and a journal entry are articles rather than mastheads. And every masthead H1 now reads the same way — the page's own name, then what the page does for the reader — which is checkable in one line: curl a route, strip the tags inside its h1, and you should get 'Work The work, and the difference it made.' The homepage is the only one that names an offer instead of a page, having no page name to give. And one number: after the sweep, thirteen of the fifteen routes are composed entirely of imported components, with no markup of their own beyond a main element."
        />
      </Section>

      {/* ═══ THE PAGE BANDS, BY ROUTE ═════════════════════════════════════ */}
      <Section
        id="components-page-bands"
        title="Page bands, by route"
        note="Every page-level band the site is built from, with the real component imported and given specimen props. They are grouped by ROUTE rather than by kind because each belongs to one route or one route family, so the route is how a reader looks for one; the sections above index the pieces that recur across many routes instead. Thirty-three are rendered; six are described instead, each for a stated reason."
      >
        <p className="fineprint mt-5 max-w-[72ch]">
          Full-width bands sit in a FLUSH stage, so the ring around them is the
          documentation and everything inside it, vertical air included, is the
          band&rsquo;s own. Pieces that are not bands keep the padded stage:
          their consumers supply the shell.
        </p>
        <p className="fineprint mt-4 max-w-[72ch]">
          WHAT THE FIXTURES MAY SAY. Specimen copy is deliberately inert, and
          where a component exists to show a figure the fixture says
          &ldquo;Figure&rdquo; rather than inventing one. No quote, rating,
          result, metric or price on this page is a claim about anybody: the
          real values are page data, and on{" "}
          <Code>/pricing</Code> they are still placeholders there too.
        </p>

        {/* ── HOMEPAGE ─────────────────────────────────────────────────── */}
        <Group
          num="01"
          title="Homepage"
          note="The bands that compose the type-led homepage. Two of them share one head, which is what made that head a component; two more are described rather than rendered, because a scroll pin and a fade-to-ink overlay both need a page to act on."
        />

        <Comp name="CollectionHeader" where="Inside SelectedWorkBand and BlogRailBand, so twice on the homepage." />
        <What>
          A kicker, a part title and the onward ghost link that opens a
          collection. It shipped twice, verbatim, in one file: two header rows
          on one page is the definition of a repeated composition, and that was
          the argument for lifting it.
        </What>
        <What>
          REGISTER: <Code>.heading-part</Code>, the rung added 2026-07-10. The
          collection heads were promoted off <Code>.heading-lg</Code> because
          they were too small beside their neighbours and TIED the card titles
          below them; a signpost must never tie its own items. The link locks to
          the heading&rsquo;s LAST baseline, with <Code>items-end</Code>{" "}
          declared first as the old-browser fallback. Never box-align this row.
        </What>
        <Props>
          <Entry name="kicker" what="Plain string. The tracked-caps label above the title." />
          <Entry name="title" what="ReactNode, so a head can carry the italic accent-word device." />
          <Entry name="linkHref / linkLabel" what="The ghost onward link. The trailing space rides inside the interpolation, so the extracted markup stays byte-identical to what the page shipped." />
        </Props>
        <Stage>
          <CollectionHeader
            kicker="Specimen kicker"
            title={
              <>
                A specimen collection <em>head</em>
              </>
            }
            linkHref="/stylesheet"
            linkLabel="Specimen link"
          />
        </Stage>

        <Comp name="SelectedWorkBand" where="Homepage." />
        <What>
          The homepage&rsquo;s imagery beat: a CollectionHeader over the
          featured projects, in TWO LAYOUTS ON ONE SET OF PLATES. Below md the
          contact-sheet rail holds all four captures in one beat; at md and
          above the staggered pair rhythm starts the right column a beat lower,
          which is the deliberate jag that What we do&rsquo;s ruled rows
          stabilise. Resize the stage to see both.
        </What>
        <What>
          THE WORK IS THE PROOF. The receipts strip that used to close this band
          was cut 2026-07-10 when the numbers were audited against what we can
          stand behind; real client-approved metrics belong inside their case
          studies. <Code>id=&quot;selected-work&quot;</Code> is a live anchor
          target on the homepage and travels with the section, so this specimen
          carries it too.
        </What>
        <Props>
          <Entry name="projects" what="WorkEntry[]. The only prop a page passes; everything else defaults." />
          <Entry name="kicker / title / linkHref / linkLabel" what="The band's own identity, defaulted here on the ContactCTA precedent. Override for a different collection." />
          <Entry name="railLabel" what="Accessible name for the mobile rail region." />
        </Props>
        <Stage flush>
          <SelectedWorkBand projects={SPECIMEN_PROJECTS} />
        </Stage>

        <Comp name="WorkPlate" where="Inside SelectedWorkBand, in both the rail and the pair grid." />
        <What>
          One plate: a real capture in a plain frame, a ruled caption of client
          name and services meta, and the project&rsquo;s one-line outcome.
          Landscape 16:10, never cropped to fit. THE WHOLE PLATE IS THE LINK and
          the affordance is the caption dim: plates do not swell, so there is no
          hover scale here by design.
        </What>
        <What>
          The specimen carries no <Code>thumbImage</Code>, so it falls through
          to the typographic placeholder. That is the honest state of an
          unillustrated study rather than a documentation trick.
        </What>
        <Props>
          <Entry name="project" what="WorkEntry. Reads client, services, summary and the thumb image." />
          <Entry name="className" what="Where the .reveal class arrives from, because whether a plate reveals depends on where it sits: inside the mobile rail the wrapper already reveals." />
          <Entry name="delay" what="Entrance stagger in ms, applied as an inline transitionDelay by the consumer's beat." />
        </Props>
        <Stage>
          <div className="max-w-[520px]">
            <WorkPlate project={SPECIMEN_PROJECTS[0]} />
          </div>
        </Stage>

        <Comp name="WhatWeDoBand" where="Homepage." />
        <What>
          A kicker and a band, nothing else: the rows themselves are{" "}
          <Code>ServicesShowcase</Code>, which owns the order that is the sell
          (web first, search second, brand third) and the <Code>.display</Code>{" "}
          register they speak in. It sits between the statement and the work
          because both neighbours are asymmetric and the full-width ruled rows
          are the page&rsquo;s most formal element.
        </What>
        <Props>
          <Entry name="kicker" what="Defaults to 'What we do'." />
          <Entry name="exitFade" what="Mounts the fade-to-ink handover. Homepage only, and OFF in this specimen: the driver would ink the stage over as the page scrolls." />
        </Props>
        <Stage flush>
          <WhatWeDoBand />
        </Stage>

        <Comp name="BlogRailBand" where="Homepage." />
        <What>
          Notes from the studio: the second CollectionHeader, then a Carousel of
          BlogTeaserCards. The rail earns its place by holding six posts where
          the grid held three, and the reader turns the pages. Nothing here
          autoplays, and two rails must never stack in one viewport.
        </What>
        <What>
          IT RENDERS NOTHING WHEN THERE ARE NO POSTS. That guard lived at the
          call site until the extraction: a header over an empty track is not a
          state the band has, so the band now owns the check.
        </What>
        <Props>
          <Entry name="posts" what="JournalEntry[]. Empty returns null." />
          <Entry name="kicker / title / linkHref / linkLabel / railLabel" what="The band's identity, defaulted." />
          <Entry name="exitFade" what="The handover. Homepage only; off here." />
        </Props>
        <Stage flush>
          <BlogRailBand posts={SPECIMEN_POSTS} />
        </Stage>

        <Comp name="BlogTeaserCard" where="Inside BlogRailBand." />
        <What>
          The plate, the date, the title. The whole card is the link and the
          affordance is the title&rsquo;s dim. Imagery is 16:10 per the ratio
          canon, because blog imagery is FIGURES and tall belongs to people. The
          title takes <Code>.card-title</Code>: card titles are captions to
          their images rather than headings, so they carry no italic accent.
        </What>
        <Props>
          <Entry name="post" what="JournalEntry. Reads the featured image, the published date and the title; the date is formatted en-AU in UTC." />
        </Props>
        <Stage>
          <div className="max-w-[400px]">
            <BlogTeaserCard post={SPECIMEN_POSTS[0]} />
          </div>
        </Stage>

        <Sub
          title="ManifestoTrack — described, not rendered"
          note="The statement compartment on its ground: a min-h air band (160vh at md — raised from 100vh the same day, client: 'increase the padding on top and bottom a lot, so you feel like you're scrolling quite a bit' — and 90vh on phones; the air rides min-h + centring rather than frozen py-* utilities) with the statement centred, on the canonical adjoining-section glow recipe — SectionGlow blob left, grain, overflow-hidden — and the fill happening in NORMAL FLOW as it scrolls through. UNPINNED 2026-08-07 (client: it 'blocks the screen into place… much bigger padding or something so it feels more fluid'), the same friction verdict that unpinned /services on 2026-07-24; the pin's 140vh/sticky geometry left with the mechanism, and losing the sticky child is precisely what made the clipped glow recipe legal here (overflow-hidden kills sticky — the ground stayed bare all the weeks the pin lived). Still described rather than staged: the fill scrubs against page scroll, so a specimen would sit at whatever opacity the scroll left it. Props: text (a PLAIN STRING, because the compartment splits it per word and the fill is the emphasis, which is why the statement carries no italic accent), cta ({ href, label }, the secondary link under it) and exitFade. ⚠ data-manifesto-track rides the INNER shell block, not the section: the scrub's completion tuning assumes track ≈ statement block, and measuring the tall air band instead would complete the fill while the words are still at the fold."
        />
        <Sub
          title="ExitFadeOverlay — described, not rendered"
          note="The fade-to-ink overlay a section wears as it exits the top of the viewport, handing the stage to the section arriving beneath. It was the most-repeated unit on the homepage, three verbatim copies of one div. Rendering it here would be self-defeating in the most literal way: the driver would ink this specimen over as the page scrolls, which is why every band above passes exitFade off. ⚠ THE PARENT IS THE MEASURED SCOPE: <ExitFades /> in the root layout measures el.parentElement, so the overlay must be a DIRECT child of the section it fades and that section must be relative. Props: timing, 'long' (the early window, bottom 78vh to 14vh, for dark content sections whose ink-on-ink ground cannot show a late fade) or 'late' (45vh to 8vh, no live consumer since the close stopped being the cream back cover)."
        />

        {/* ── WORK AND CASE STUDIES ────────────────────────────────────── */}
        <Group
          num="02"
          title="Work and case studies"
          note="The portfolio index and the case-study article. The detail route is the one place the site sets type against a wide image canvas, so several of these exist only to hold that split."
        />

        <Comp name="HeadlineTitleChip" where="/work, set into the PageHero H1 between words." />
        <What>
          A small 16:10 plate set INTO a display headline. Sized in{" "}
          <Code>em</Code>, so it rides the display clamp and grows with the H1
          rather than against it. BLANK for now, matching the blanked mock-ups
          sitewide; when imagery is rechosen these should be REAL case-study
          captures, because the work woven into the sentence is that
          page&rsquo;s own argument.
        </What>
        <What>
          ⚠ Its raw <Code>rounded-[0.12em]</Code> is the one sanctioned radius
          freelance in the type: the plate tokens are fixed px or viewport
          clamps, and this corner has to scale with the letterform it sits
          inside. ⚠ Wrap the chip and its neighbouring words in{" "}
          <Code>whitespace-nowrap</Code> at the call site: a chip orphaned onto
          its own line reads as a broken image.
        </What>
        <Props>
          <Entry name="(none)" what="Decorative, so it is a plain aria-hidden span with no image and nothing for screen readers. The sentence must read cleanly without it." />
        </Props>
        <Stage>
          <p className="display text-bone">
            <span className="whitespace-nowrap">
              A specimen headline <HeadlineTitleChip /> with
            </span>{" "}
            a chip set into it.
          </p>
        </Stage>

        <Comp name="WorkIndexBand" where="/work." />
        <What>
          The portfolio itself: every case study as a full-width{" "}
          <Code>WorkCard</Code> row, stacked on a 24/32 gutter so each piece
          gets a whole screen&rsquo;s attention. THE GLOW IS PART OF THE SEAM,
          not decoration: it carries the hero&rsquo;s warm ground past the
          hairline, which is why the hero above runs with{" "}
          <Code>borderBottom</Code> off. Hero and grid must read as one surface.
        </What>
        <What>
          THE EMPTY STATE BELONGS TO THE COMPONENT, not the page: a portfolio
          with nothing in it still has to say something, and this band is the
          only thing that knows the list came back empty.
        </What>
        <Props>
          <Entry name="projects" what="readonly WorkEntry[]. Empty renders the written holding line instead of the stack." />
        </Props>
        <Stage flush>
          <WorkIndexBand projects={SPECIMEN_PROJECTS.slice(0, 2)} />
        </Stage>

        <Comp name="ArticleHeader" where="/work/[slug], /blog/[slug]." />
        <What>
          The opener for DETAIL pages. It exists because a detail page is not a
          masthead: <Code>PageHero</Code> owns the canonical split every
          top-level interior page uses, and the hero-cohesion pass kept the
          detail pages out of it on purpose. Folding them in would collapse the
          distinction between a page title and an article header.
        </What>
        <What>
          That distinction is now IN THE MARKUP, not just in this note. A
          masthead&rsquo;s kicker is the page&rsquo;s own name and lives
          INSIDE its <Code>&lt;h1&gt;</Code> (2026-08-05). An article
          header&rsquo;s kicker is metadata ABOUT the piece — a sector and a
          year, a category — so it stays a sibling on{" "}
          <Code>.from-overline</Code>: &ldquo;Aesthetics · 2026&rdquo; welded
          into an H1 would be a nonsense heading, not a stronger one. If you
          are unsure which form a new opener wants, the test is whether the
          kicker would still make sense read aloud as the first words of the
          heading.
        </What>
        <What>
          THE ENTRANCE IS THE SITEWIDE LOAD-IN, never <Code>.reveal</Code>: a
          header is first-paint content, and an IntersectionObserver at the top
          of the document is the bug that pass fixed. Kicker at 0s, title at
          0.1s, lede at 0.25s, rail or byline at 0.35s. On extraction /blog
          gained that stagger, having faded its header as one block.
        </What>
        <What>
          The measures are props for a load-bearing reason, not a cosmetic one.{" "}
          <Code>.lede</Code> caps itself at 46ch in the components layer, so any{" "}
          <Code>max-w-*</Code> utility overrides it. /blog passes{" "}
          <Code>&quot;&quot;</Code> for both because its column already caps at
          720px; passing the default would have widened its lede from 46ch to
          672px.
        </What>
        <Props>
          <Entry name="kicker" what="ReactNode, composed by the consumer: /work pairs sector and year on a middot, /blog names the category." />
          <Entry name="title" what="The H1, at .heading-xl: the MOMENT register, one rung below a masthead." />
          <Entry name="lede" what="Optional. /work's summary, /blog's description." />
          <Entry name="byline" what="Optional line under the lede, taking the meta rail's 0.35s slot." />
          <Entry name="facts" what="{ term, value }[]. THE META RAIL. Its presence is what puts the header on the 12-col grid, because the rail is the only thing that needs columns." />
          <Entry name="media" what="Rendered as a SIBLING of the header, so it escapes the header's measure: /work's device cluster on shell-wide, /blog's 880px figure." />
          <Entry name="className" what="The consumer's own shell, padding and z-index." />
          <Entry name="titleMeasure / ledeMeasure" what="Measure caps, defaulting to /work's max-w-4xl and max-w-2xl. Pass '' where an ancestor already sets the measure." />
        </Props>
        <Sub
          title="With the meta rail (the /work/[slug] shape)"
          note="facts present, so the header grids: stack on columns 1 to 8, rail on 10 to 12, locked on first baseline."
        />
        <Stage>
          <ArticleHeader
            className="relative z-10"
            kicker={<>Specimen sector · 2026</>}
            title="A specimen case-study title, long enough to hold two lines"
            lede="A specimen summary in the lede register, showing the measure the title column keeps beside the meta rail."
            facts={SPECIMEN_FACTS}
          />
        </Stage>
        <Sub
          title="With a byline (the /blog/[slug] shape)"
          note="No facts, so no grid: the stack runs flat, and the byline takes the rail's slot in the stagger."
        />
        <Stage>
          <ArticleHeader
            className="relative z-10 max-w-[720px]"
            kicker="Specimen category"
            title="A specimen entry title at the moment register"
            lede="A specimen description, standing in for the frontmatter line that opens a journal entry."
            byline="North &amp; Refine · 6 min read · 12 March 2026"
            titleMeasure=""
            ledeMeasure=""
          />
        </Stage>

        <Comp name="CaseStudyDeviceCluster" where="/work/[slug], in ArticleHeader's media slot." />
        <What>
          THE CANONICAL RESPONSIVE SHOWCASE: a <Code>BrowserMockup</Code>{" "}
          anchored right with a <Code>PhoneMockup</Code> overlapping its
          lower-left corner, each given half a degree of counter-rotation so the
          pair reads as two objects set down together. It proves a
          practice&rsquo;s site is a SITE and not a picture, because the same
          work is shown resolving at two widths. Reuse it; never re-compose the
          overlap by hand.
        </What>
        <What>
          It is a HERO CANVAS, not a <Code>.frame</Code>: no ratio box, no plate
          radius, and the devices carry their own hardware radii. It lives
          inside the hero section so the flat ink scene runs unbroken behind
          both the lockup and the mockups. THE PHONE IS sm+ ONLY: below that the
          overlap has nowhere to go and would cover the capture it accompanies,
          so it is dropped rather than stacked. The entrance is the load-in, and
          the browser leads the phone by 0.15s so the cluster assembles in depth
          order.
        </What>
        <Props>
          <Entry name="desktopImage / desktopAlt" what="The capture filling the browser window: shot at 1440×900, the real 16:10 viewport, so the plate fits uncropped." />
          <Entry name="domain" what="Address-bar label. The consumer resolves it (explicit frontmatter domain, else the live URL's host, else the client name), because only the consumer knows which sources exist." />
          <Entry name="mobileImage / mobileAlt" what="The tall mobile capture. Optional: a study may ship desktop-only, and then the cluster is simply the one window. Alt defaults to '' because the phone repeats the desktop capture's subject." />
          <Entry name="className" what="The canvas the cluster is set on. The default is the hero's wide shell, with the phone's overhang paid for in bottom padding." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          This specimen passes real captures rather than the placeholder
          mockups the media section uses, for one reason: the phone half only
          mounts when{" "}
          <Code>mobileImage</Code> is truthy, so the overlap that IS the pattern
          cannot be shown in placeholder mode. The address pill carries a
          specimen domain.
        </p>
        <Stage flush>
          <CaseStudyDeviceCluster
            desktopImage="/assets/desktops/dr-elizabeth-hawkes.jpg"
            desktopAlt="Desktop capture of a client practice website."
            domain="specimen.example"
            mobileImage="/assets/phones/dr-elizabeth-hawkes.jpg"
            className="relative px-6 pb-24 pt-8 sm:px-8"
          />
        </Stage>

        <Comp name="ResultsBand" where="/work/[slug]." />
        <What>
          The outcomes of a case study as up to three big bone numerals, ruled
          apart, on the raised ink wash between the hero and the write-up. The
          one place on a case study where the argument is a number rather than a
          sentence.
        </What>
        <What>
          ⚠ IT NEVER HOLDS A FIGURE OF ITS OWN. Every value and label arrives as
          DATA from frontmatter, because the standing rule is no numbers we
          cannot defend. A metric baked into the file would be a claim about a
          real practice with nothing behind it, and the specimen below says
          &ldquo;Figure&rdquo; for exactly that reason. It renders nothing at
          all when the list is empty, which is the correct state for a study
          whose results are not measured or not approved.
        </What>
        <What>
          THREE IS THE CAP, not a coincidence: the row is{" "}
          <Code>sm:grid-cols-3</Code>, so a fourth metric would wrap into a
          lonely second row. Extra metrics are dropped rather than re-flowed.
        </What>
        <Props>
          <Entry name="metrics" what="readonly WorkMetric[] from frontmatter. Only the first three render; an empty array renders nothing." />
          <Entry name="kicker" what="Defaults to 'The results'." />
        </Props>
        <Stage flush>
          <ResultsBand metrics={SPECIMEN_METRICS} />
        </Stage>

        <Comp name="CaseStudyProseGrid" where="/work/[slug]." />
        <What>
          The editorial two-column canvas the write-up flows through, on{" "}
          <Code>shell-wide</Code>, which is the one sanctioned exception to the
          everything-else-uses-<Code>.shell</Code> rule. THE PLACEMENT
          CONTRACT: anything that is not an h2 or a figure goes to columns 7 to
          11, the reading column; a lone figure spans 2 to 11; two ADJACENT
          figures split 5 and 5; an h2 becomes a kicker in columns 2 to 4. The
          MDX body is authored as plain prose and the grid decides where each
          element lands by WHAT IT IS.
        </What>
        <What>
          ⚠ THE h2 RULE TRAVELS WITH THIS FILE, and that is the point of the
          extraction. The kicker&rsquo;s columns and the grid&rsquo;s columns
          are ONE contract, and they were living in two files where an edit to
          either silently broke the other.{" "}
          <Code>caseStudyProseComponents</Code> is exported from the same module
          so the page can hand it to <Code>compileMDX</Code> without owning the
          geometry.
        </What>
        <Props>
          <Entry name="children" what="The compiled MDX body." />
          <Entry name="caseStudyProseComponents" what="A named export rather than a prop: the shared prose map with h2 demoted from a heading to a tracked-caps kicker in the left rail." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          The specimen passes plain children rather than compiled MDX, so the
          columns and the figure breakout are live but the h2 kicker is not: that
          rule is applied by the exported map at compile time, and writing the
          kicker markup by hand here would be the second copy these specimens
          exist to stop.
        </p>
        <Stage flush>
          <CaseStudyProseGrid>
            <p>
              A specimen paragraph in the reading column, columns 7 to 11 on
              large screens, at the measure the eye can hold beside a wide
              image canvas.
            </p>
            <figure>
              <div className="frame aspect-[16/10]" />
              <figcaption className="label mt-3 text-clay">
                A lone specimen figure, spanning columns 2 to 11.
              </figcaption>
            </figure>
            <p>
              A second specimen paragraph, back in the reading column, so the
              alternation between wide plates and indented copy is visible.
            </p>
            <figure>
              <div className="frame aspect-[16/10]" />
              <figcaption className="label mt-3 text-clay">
                A specimen pair, first half.
              </figcaption>
            </figure>
            <figure>
              <div className="frame aspect-[16/10]" />
              <figcaption className="label mt-3 text-clay">
                A specimen pair, second half.
              </figcaption>
            </figure>
          </CaseStudyProseGrid>
        </Stage>

        <Comp name="CaseStudyQuoteBand" where="/work/[slug], when frontmatter carries a testimonial." />
        <What>
          The client&rsquo;s own words, centred, as a deliberate INTERRUPTION to
          the write-up&rsquo;s left-right rhythm. Everything above and below it
          is a rail and a column; this one band is neither, which is what makes
          the reader stop. The quote takes <Code>.statement</Code>, the QUOTE
          register, capped at 28ch and balanced.
        </What>
        <What>
          ⚠ NO CASE STUDY CURRENTLY SHIPS ONE. Every testimonial block in
          content/work is commented out, waiting on real words and real
          permission, because we never draft a quote on a client&rsquo;s behalf.
          The band is live and correct; it is the data that is honestly missing.
          ITS SIBLING is <Code>Testimonial</Code>, deliberately separate: that
          one is a marketing band with a portrait plate and an avatar, placed by
          the studio to sell, while this is a study quoting its own client
          mid-article, where the study around it is already the evidence.
        </What>
        <Props>
          <Entry name="quote" what="The client's words, unquoted: the band supplies the quotation marks." />
          <Entry name="author" what="Who said it." />
          <Entry name="role" what="Optional, joined to the author on a middot." />
          <Entry name="kicker" what="Defaults to 'In the client's words'." />
        </Props>
        <Stage flush>
          <CaseStudyQuoteBand
            quote="A specimen sentence standing in the quote register, so the band's measure and balance can be read without anybody's words being invented."
            author="Specimen attribution"
            role="Specimen role"
          />
        </Stage>

        <Comp name="NextProjectBand" where="/work/[slug]." />
        <What>
          The onward step at the foot of a case study: a clay kicker and the next
          study&rsquo;s title, the whole thing one link. IT SITS BETWEEN THE
          STUDY AND THE CLOSE, and that order is the argument: a reader who has
          finished one case study is offered another piece of work BEFORE being
          asked to start a project. The title takes <Code>.heading-lg</Code>, the
          signpost register, so it can never outrank the article H1 above or
          shout over the flagship below.
        </What>
        <What>
          IT CARRIES NO <Code>.reveal</Code>. It is a small, low band the reader
          usually passes at speed, and a fade at that point reads as a stutter
          rather than an entrance. No arrow and no pill either: this is
          navigation between two pieces of the same thing.
        </What>
        <Props>
          <Entry name="href / title" what="The next study." />
          <Entry name="kicker" what="Defaults to 'Next project'." />
        </Props>
        <Stage flush>
          <NextProjectBand href="/stylesheet" title="A specimen next-project title" />
        </Stage>

        {/* ── EDITORIAL ────────────────────────────────────────────────── */}
        <Group
          num="03"
          title="Editorial"
          note="The journal index and the reading route. One shell, one 720px column, and a featured figure allowed to escape it. Each of these is small, and that is why they had to be lifted: a page made of four unnamed fragments is a page nobody can rebuild."
        />

        <Comp name="ArticleFeaturedFigure" where="/blog/[slug], in ArticleHeader's media slot." />
        <What>
          The lead image under an entry&rsquo;s header, with its optional
          caption. 16:10, ALWAYS: landscape is the ratio for screens and
          editorial figures, and blog imagery is FIGURES rather than fashion
          plates. It is not a prop for that reason. If a capture does not fit,
          fix the capture; never crop the plate to suit it.
        </What>
        <What>
          It rides the media slot rather than sitting inside the header because
          its 880px canvas is WIDER than the 720px reading column beside it.{" "}
          <Code>.frame</Code> carries the plate radius, the ink-raised backing
          and the clip, so the image is absolutely positioned inside rather than
          sized itself.
        </What>
        <Props>
          <Entry name="src" what="The image path." />
          <Entry name="alt" what="Empty string where the image is decorative; the consumer decides, since only frontmatter knows whether the caption already says it." />
          <Entry name="caption" what="Optional. The on-ink meta voice: .label in clay." />
          <Entry name="className" what="The consumer's canvas and the gap above it. Defaults to max-w-[880px] with the article's top margin." />
        </Props>
        <Stage>
          <ArticleFeaturedFigure
            src="/assets/blog/plate-rowen-laptop-1.jpg"
            alt=""
            caption="A specimen caption in the on-ink meta voice."
            className="max-w-[560px]"
          />
        </Stage>

        <Comp name="ArticleProseWell" where="/blog/[slug]." />
        <What>
          The measure and vertical rhythm the compiled MDX body renders into.
          The ELEMENT styling of the prose is NOT here: it lives in{" "}
          <Code>proseMdxComponents</Code> at the repo root. This component owns
          only what the container decides, which is how wide the reading column
          runs and how the blocks space against each other.
        </What>
        <What>
          The rhythm has to live on the WELL rather than in the MDX map because
          these are relationships between SIBLINGS: a heading&rsquo;s air above
          it, the tight join to the paragraph that answers it. An element cannot
          style its own neighbours. <Code>[&amp;&gt;*:first-child]:mt-0</Code>{" "}
          hands the gap above the body back to the well&rsquo;s own margin, so
          the consumer controls it in one place.
        </What>
        <Props>
          <Entry name="children" what="The compiled MDX body." />
          <Entry name="className" what="Measure and the gap above. Defaults to the 720px reading column: journal entries read straight down one column, unlike /work/[slug], whose prose is indented into a 12-col grid and keeps its own well." />
        </Props>
        <Stage>
          <ArticleProseWell className="max-w-[640px]">
            <p className="body-reading text-bone-dim">
              A specimen paragraph in the reading column, so the well&rsquo;s
              measure can be read against the heading rhythm below it.
            </p>
            <h2 className="heading-sm text-bone">A specimen heading</h2>
            <p className="body-reading text-bone-dim">
              The paragraph that answers it, joined tightly on purpose: the air
              belongs above the heading, not between the heading and its answer.
            </p>
          </ArticleProseWell>
        </Stage>

        <Comp name="StudioBioCard" where="/blog/[slug]." />
        <What>
          The written-by aside that closes an entry&rsquo;s body, above the back
          link. An <Code>&lt;aside&gt;</Code> rather than a section: it is
          related to the article rather than part of it, which is also why it
          sits on the article&rsquo;s own measure and carries only a hairline.
          The entry ends; this is the byline the reader turns to afterwards.
        </What>
        <What>
          Its copy DEFAULTS to the studio&rsquo;s own because it is boilerplate
          identical on every entry and belongs to the brand, not to the post. It
          takes the ghost tier, never a pill: a bio card is not a call to
          action, and a second pill on an article page would compete with the
          close&rsquo;s flagship below.
        </What>
        <Props>
          <Entry name="kicker / name / blurb" what="All defaulted. name defaults to the studio, because the studio speaks as 'we' and every entry publishes under its name; an entry with a named guest author passes one instead." />
          <Entry name="link" what="{ href, label }. Defaults to /about." />
          <Entry name="className" what="Measure and the ruled gap above. Defaults to the 720px column so the rule lines up with the prose it closes." />
        </Props>
        <Stage>
          <StudioBioCard className="max-w-[640px] border-t rule-dark pt-10" />
        </Stage>

        <Comp name="ArticleFootBackLink" where="/blog/[slug]." />
        <What>
          The ruled return to the collection, under the studio bio and above the
          close. THE ARROW LEADS, pointing back: it is the only arrow on the
          site that sits before its label, because the direction of travel is
          the message. Ghost tier, so the hover opens the gap and turns the
          arrow champagne, and the link is never dimmed as a whole, since fading
          reads as disabled.
        </What>
        <What>
          /work/[slug] closes differently on purpose, with a Next-project row
          carrying the reader onward to another study rather than back to the
          index, so the two are deliberately not folded together.
        </What>
        <Props>
          <Entry name="href" what="The collection index." />
          <Entry name="label" what="The label after the arrow. Names the collection being returned to, so it stays with the consumer." />
          <Entry name="className" what="Measure and the ruled gap above. Defaults to the 720px reading column." />
        </Props>
        <Stage>
          <ArticleFootBackLink
            href="/stylesheet"
            label="A specimen collection"
            className="max-w-[640px] border-t rule-dark pt-8"
          />
        </Stage>

        <Comp name="BlogEmptyState" where="/blog, in place of BlogList." />
        <What>
          The band the index renders when the collection has no published
          entries at all. It is a SECTION rather than a paragraph because it
          stands in for <Code>BlogList</Code>: the page needs the bone ground
          and the band to survive between the hero&rsquo;s borderBottom and the
          close, or an empty blog collapses into a hairline and the close sits
          straight under the masthead.
        </What>
        <What>
          <Code>BlogList</Code> keeps its own, different empty state, because
          that one is a FILTER result inside an existing band and so is bare
          copy with no ground of its own. Two states, two shapes, on purpose.
          The copy defaults rather than being passed: a zero state is a state of
          the system, not editorial page content.
        </What>
        <Props>
          <Entry name="message" what="The holding line. Defaults to the live copy, so a specimen shows the sentence a reader would actually meet." />
        </Props>
        <Stage flush>
          <BlogEmptyState />
        </Stage>

        {/* ── SERVICES, PRICING AND ABOUT ──────────────────────────────── */}
        <Group
          num="04"
          title="Services, pricing and about"
          note="The commercial middle of the site, plus the studio page. Two of these are grounds rather than content, one is a scroll-scrubbed statement, and the two that carry the offer are the most reused bands on the site after the close."
        />

        <Comp name="OfferBand" where="/services/[slug] (deliverables), /industries/[slug] (points)." />
        <What>
          Kicker and heading in the left rail, the offer ruled alongside: the one
          band that answers &ldquo;what do we actually do here&rdquo;. It shipped
          twice, identically, as /services/[slug]&rsquo;s What it is and
          /industries/[slug]&rsquo;s How we help, sharing a wrapper, a shell, an
          80/160ms reveal ladder and a 60ms list stagger.
        </What>
        <What>
          THE READING ORDER IS THE ENTRANCE: kicker, heading at 80ms, prose at
          160ms, then the list opening on its own ladder from zero. The list
          restarts the count on purpose, because it is a second block the eye
          arrives at rather than the tail of the first.
        </What>
        <Props>
          <Entry name="kicker / heading" what="The heading group. The heading sits at .heading-lg, the signpost register." />
          <Entry name="prose" what="Optional paragraph, placed by `list`. Falsy renders nothing, which is how /industries/[slug] handles an intro whose first sentence was spent on the hero lede." />
          <Entry name="items" what="readonly string[]. The rows." />
          <Entry name="list" what="'points' (default) | 'deliverables'. THE RIGHT COLUMN'S REGISTER, and with it the split, the prose placement and the item rendering. One prop rather than a fork, per the FaqSection tone precedent." />
          <Entry name="glow" what="Paints the SectionGlow. TRUE only where the band adjoins the hero and owns the seam blend." />
          <Entry name="spacious" what="py-20/28 rather than py-16/24, with the grid gap opening to match." />
        </Props>
        <Sub
          title="list='points' (default)"
          note="Full-sentence claims: a 4-col rail carrying the heading group and the prose at .lede, the list running 8 columns as a divided stack with index numerals at body-lg."
        />
        <Stage flush>
          <OfferBand
            kicker="Specimen kicker"
            heading="A specimen band heading"
            prose="A specimen paragraph in the rail, at the lede measure, standing in for the intro copy a live route passes here."
            items={SPECIMEN_POINTS}
          />
        </Stage>
        <Sub
          title="list='deliverables', with glow and spacious"
          note="Short phrases: the rail widens to 5 columns and carries only the heading group, the prose moves across to lead the list column at body-lg, and the items sit two-up under a single rule with dash marks. Ten short phrases stacked one per line would run the band twice as long as it needs to be."
        />
        <Stage flush>
          <OfferBand
            glow
            spacious
            list="deliverables"
            kicker="Specimen kicker"
            heading="A specimen band heading"
            prose="A specimen paragraph leading the list column, at body-lg, where the deliverables register puts it."
            items={SPECIMEN_DELIVERABLES}
          />
        </Stage>

        <Comp name="RuledLinkRows" where="/industries (index), /services/[slug] (onward)." />
        <What>
          A hairline-ruled stack of whole-row links, each a title, a one-line
          lead and a ghost arrow, baseline-locked. THE ROW IS THE LINK and the
          ghost arrow is the affordance rather than the target: one link, not
          two, so the champagne arrow and the title&rsquo;s dim both read
          through a single group hover and the row responds as one object.
        </What>
        <What>
          THE DISPLAY-TIER SIBLING is <Code>ServicesShowcase</Code>: the same
          grammar at <Code>.display</Code> with no lead line, because there the
          titles are statement typography. Deliberately NOT folded in. It is one
          register up and one element short, and collapsing them would put a
          homepage statement row and an interior navigation row on the same
          switch.
        </What>
        <Props>
          <Entry name="rows" what="{ href, title, lead }[]. Pages shape the lead themselves; the component never truncates or re-punctuates copy." />
          <Entry name="linkLabel" what="The ghost link's label. Every row shares it: the rows are one index, so one verb." />
          <Entry name="kicker" what="Optional. Present when the index sits INSIDE a page and must name itself; absent when the rows ARE the page's content. Its presence also carries the mt-10 above the rules." />
          <Entry name="layout" what="'index' | 'onward'. Required, no default: pick by what the rows ARE to the page. A list item must never outrank its section's head." />
          <Entry name="stagger" what="Per-row entrance step in ms. 60 is the index tempo; the sibling rows run 80 because there are only ever two of them." />
          <Entry name="spacious" what="py-20 rather than py-16, both md:py-24." />
        </Props>
        <Sub
          title="layout='index'"
          note="The rows are the page's own content: title at .heading-lg, lead stacked under it inside a 2xl measure, ghost link opposite on a flex row, the stack divided and closed with border-y."
        />
        <Stage flush>
          <RuledLinkRows layout="index" linkLabel="Explore" rows={SPECIMEN_ROWS} />
        </Stage>
        <Sub
          title="layout='onward', with a kicker"
          note="A ruled index of somewhere else, dropped into a page with its own subject: the title steps down to .heading-md so it cannot outrank the page's signposts, and title, lead and link split a 12-col grid at 5 / 5 / 2."
        />
        <Stage flush>
          <RuledLinkRows
            layout="onward"
            spacious
            stagger={80}
            kicker="Specimen kicker"
            linkLabel="Read more"
            rows={SPECIMEN_ROWS}
          />
        </Stage>

        <Comp name="ServiceProcessTimeline" where="/services/web-design, /services/seo, /services/brand-identity." />
        <What>
          The horizontal run of stages: steps left to right as nodes on one rule,
          each <Code>StageGlyph</Code> sitting ON the line with an ink mask
          breaking the rule so it reads as connecting the nodes, drawing itself
          in on a stagger as the row enters. It stacks to a vertical list below
          md, and the glyph opacity ramps to full across however many steps the
          discipline has, so the run reads as building.
        </What>
        <What>
          WHY THE STEP COUNT VARIES. This lived on the combined /services page,
          where it ran a WEBSITE process under a heading claiming five stages ran
          &ldquo;every time&rdquo;, and a brand-only engagement never reaches
          those steps. The 2026-07-24 split moved it to the pages that actually
          run each process, and the counts differ by design: web 5, SEO 4, brand
          4. ⚠ The stage marks are a working set of FIVE, and the column lookup
          covers 3 to 5; a discipline with more steps needs new marks before it
          needs new markup.
        </What>
        <Props>
          <Entry name="kicker" what="Defaults to 'How we work', the value every consumer passes." />
          <Entry name="heading / lede" what="The heading group above the run." />
          <Entry name="steps" what="{ num, title, body }[], shape-compatible with ServiceStep in lib/services.ts. The component takes whatever count it is given." />
        </Props>
        <Stage flush>
          <ServiceProcessTimeline
            heading="A specimen process heading."
            lede="A specimen lede at the measure the heading group holds above the run."
            steps={SPECIMEN_PROCESS}
          />
        </Stage>

        <Comp name="BalancedProsePair" where="/services, inside BeliefCanvas." />
        <What>
          The elaboration that answers a display-scale statement: the statement
          speaks flush left at display scale, this answers at body scale seated
          in the right columns. THE SPAN is exact rather than approximate. The
          pair occupies the /services index rows&rsquo; content column, 6 to 12,
          so its left and right edges align with the row hairline&rsquo;s ends
          below, and the outer grid runs <Code>gap-10</Code> to MATCH the index
          grid rather than the usual gap.
        </What>
        <What>
          CSS MULTI-COLUMNS, NOT A GRID: every paragraph FLOWS through{" "}
          <Code>columns-2</Code> and the browser balances them, so the two
          columns bottom out even at every viewport regardless of copy length.
          The trade is that a paragraph may break across the gutter
          mid-sentence, which is how editorial columns behave.{" "}
          <Code>[orphans:1]</Code> and <Code>[widows:1]</Code> are not
          decoration: browsers default both to 2 in column fragmentation, so the
          balancer could only move lines in PAIRS, and that quantisation was the
          stubborn two-line offset.
        </What>
        <What>
          ⚠ A SIBLING OF THE STATEMENT&rsquo;S TRACK, NEVER A CHILD OF IT.
          Inside the <Code>data-manifesto-track</Code> div the extra height
          could tip the word-fill scrub into its sticky-dwell branch and stall
          the fill. The reveal rides the WRAPPER for a related reason:
          per-paragraph reveals would fade a column-split paragraph in two
          stages.
        </What>
        <Props>
          <Entry name="paragraphs" what="ReactNode[]. Two or more, which FLOW through the balanced columns rather than sitting one per column, so copy lengths need not match." />
        </Props>
        <Stage flush>
          <BalancedProsePair paragraphs={SPECIMEN_PROSE_PAIR} />
        </Stage>

        <Comp name="PricingPackageGrid" where="/pricing." />
        <What>
          Three ruled cards on ink, each a name, a figure, who it is for and what
          it includes, closing on a per-card CTA. The cards are hairline-ruled
          surfaces on the flat ground with hierarchy carried by FILL: the
          featured card raises to <Code>bg-ink-raised</Code> and takes the solid
          primary pill, the other two stay unfilled with the secondary outline,
          which must never fill solid on hover or it impersonates the primary.
          They round on the surface scale, <Code>rounded-ui</Code>.
        </What>
        <What>
          ⚠ THE FIGURES ARE DATA, AND ON THE LIVE PAGE THEY ARE PLACEHOLDERS.
          The component never carries a number of its own, so a specimen shows
          whatever it is handed, and this one is handed the word
          &ldquo;Guide figure&rdquo;. Replacing the real page&rsquo;s invented
          guide numbers is an open pre-launch item; quote none of it to a client
          until it is signed off.
        </What>
        <What>
          <Code>flex-1</Code> on the list is what bottom-locks the pills: the
          cards are flex columns, so the list absorbs the height difference
          between a six-item and a four-item package and the three CTAs still
          land on one line. The dash before each item is champagne, the
          sanctioned ornament use; the item TEXT stays bone-dim, because gold
          never carries label type.
        </What>
        <Props>
          <Entry name="packages" what="readonly PricingPackage[]: name, price (a STRING, because the qualifier is part of the claim and the component must never format or round), summary, for, includes, featured." />
          <Entry name="fineprint" what="The caveat under the grid. Defaults to the wording that makes the figures legally a guide rather than a quote: if the figures change, read that line again." />
          <Entry name="ctaLabel / ctaHref" what="The per-card CTA. ⚠ The href stays /start-a-project so StartProjectOverlay intercepts the click; pointing it anywhere else silently demotes three CTAs to a page load." />
          <Entry name="featuredLabel" what="The mark on the featured card. Defaults to 'Most chosen'." />
        </Props>
        <Stage flush>
          <PricingPackageGrid packages={SPECIMEN_PACKAGES} />
        </Stage>

        <Comp name="SharedCanvas" where="/about, holding the hero, the ream and the narrative." />
        <What>
          THE ONE SANCTIONED WAY TO BLEND DARK SECTIONS. When the client asks for
          the hero gradient to fade through into what follows, ONE wrapper owns
          the whole ground: warm base, one <Code>HeroGlow</Code> spanning every
          band, grain, and a foot strip fading to page ink before the next normal
          section. Children render GROUNDLESS on it, so{" "}
          <Code>PageHero</Code> takes <Code>ground=&#123;false&#125;</Code>.
        </What>
        <What>
          ⚠ DO NOT TRY TO BLEND TWO SEPARATELY-GROUNDED SECTIONS BY
          COLOUR-MATCHING THEIR BOUNDARY. The seam contract shipped and FAILED
          TWICE on this page: any residual mismatch does it, whether a glow still
          lit at the foot, the grain lift on one side only, or a clipped blur
          restarting warmth below the line. There is no seam to hide here because
          no seam exists. THE FOOT FADE is part of the recipe, not decoration:
          the canvas resolves to canonical ink over its last stretch so whatever
          follows joins invisibly and the designed ink to bone cut happens where
          it was drawn.
        </What>
        <What>
          ⚠ <Code>overflow-hidden</Code> is required here, because the glow blobs
          must be clipped, so NOTHING INSIDE THIS CANVAS MAY USE{" "}
          <Code>position: sticky</Code>. A canvas that needs to hold sticky
          content wants the sibling-clipping-layer arrangement instead, which is{" "}
          <Code>BeliefCanvas</Code>.
        </What>
        <Props>
          <Entry name="children" what="The bands the canvas grounds. They must carry no ground of their own." />
          <Entry name="intensity" what="Glow dose. Defaults to 0.7, a touch more than the interior heroes because the canvas feeds the glass tiles of the ream too." />
        </Props>
        <Stage flush>
          <SharedCanvas>
            <div className="shell relative z-10 py-24">
              <p className="overline text-clay">Specimen child</p>
              <p className="body-sm mt-3 max-w-[52ch] text-bone-dim">
                A groundless block on the canvas. Scroll the stage and the foot
                strip resolves to page ink, which is what lets the next section
                join without a line.
              </p>
            </div>
          </SharedCanvas>
        </Stage>

        <Comp name="MockupReamBand" where="/about, inside SharedCanvas." />
        <What>
          Two staggered, edge-cropped rows of rounded tiles serving as a
          hero&rsquo;s visual half. Each tile is a pane with a blank device
          rising from its foot and cropping there: the tile is the frame, the
          screen stays blank while imagery is being rechosen. Six larger tiles
          per row overflow and crop at the screen edges, and the second row
          shifts the device pattern AND slides the opposite way, so the two reams
          read as a staggered contact sheet rather than a grid.
        </What>
        <What>
          ⚠ IT CARRIES NO GROUND OF ITS OWN, ON PURPOSE, which is why the
          specimen below is wrapped in the canvas. Per-tile gradients were cut at
          the client&rsquo;s call: the SECTION ground carries the gradient and
          the tiles let it read through. On a flat ground the panes read as holes
          rather than windows cut into a warm canvas. Tile colour went dark glass,
          then lighter, then pure black, and pure black won: the devices contrast
          via their own white bezel border rather than by the card behind them.
        </What>
        <Props>
          <Entry name="animationDelay" what="Where this lands in the host page's load-in stagger. Composition, not decoration: the /about value continues the hero's sequence." />
        </Props>
        <Stage flush>
          <SharedCanvas>
            <MockupReamBand />
          </SharedCanvas>
        </Stage>

        <Comp name="StudioNarrativeBand" where="/about, inside SharedCanvas." />
        <What>
          The who-we-are section: the kicker alone in the left rail, the
          narrative alone in the right measure, and NO H2. The comp carries the
          section on PROSE, so the lede paragraph opens at{" "}
          <Code>.body-lg</Code> on full bone and the rest steps down to{" "}
          <Code>.body</Code> on bone-dim; the band reads as one voice getting
          quieter rather than as a headed section. The paragraphs reveal 80ms
          apart, so the narrative arrives in reading order.
        </What>
        <What>
          ⚠ IT CARRIES NO GROUND OF ITS OWN either. It adds only its own quiet
          blob, placed RIGHT because the canvas glow leans left. Giving it a
          ground is exactly what failed here twice. WHAT LEFT: the ruled stats
          row that used to close the band was cut at the client&rsquo;s call,
          which also took a flagged placeholder off the pre-launch list.
        </What>
        <Props>
          <Entry name="kicker" what="The left rail's label, bone per canon." />
          <Entry name="lede" what="The opening paragraph, which carries the band at .body-lg on bone." />
          <Entry name="paragraphs" what="ReactNode[]. The rest of the narrative, stepped down to .body on bone-dim." />
        </Props>
        <Stage flush>
          <SharedCanvas>
            <StudioNarrativeBand
              kicker="Specimen kicker"
              lede="A specimen opening paragraph, carrying the band at the larger body register on full bone."
              paragraphs={SPECIMEN_NARRATIVE}
            />
          </SharedCanvas>
        </Stage>

        <Sub
          title="BeliefCanvas — described, not rendered"
          note="The /services dark middle: one surface carrying the belief statement, the prose pair and the scroll index, so the statement reads as the index's opening line rather than its own island. The ground is ink plus grain plus one clipped glow layer, at the standard dose since the hero gained a foot hairline, with two canvas pools placed past the seam glow's reach. ⚠ THE CLIPPING LAYER IS LOAD-BEARING, AND SO IS ITS POSITION IN THE TREE: a sticky device lives in this canvas (the scroll index's odometer numeral), and an overflow-hidden ANCESTOR becomes a sticky element's scroll container, so the glow's blobs get their own absolutely-positioned overflow-hidden layer that is a SIBLING of the children, never their parent, and the section itself is never clipped. Grain alone is safe, because its ::before is inset-0 and cannot overflow. This regressed twice on 2026-07-24 before the client caught it: do not tidy the clip upward. It is not rendered here for that same reason. The whole design of this component is an arrangement around scroll-pinned content, and a specimen with nothing pinned inside it would show an ink rectangle and quietly teach the reader that the arrangement is decorative."
        />
        <Sub
          title="BeliefStatement — described, not rendered"
          note="The studio's conviction in the homepage manifesto's compartment, so the shared statement fills its words in as you scroll: display register, statement alone, and NO italic accent, because the fill IS the emphasis. THE HANGING-KICKER INDENT puts the kicker inside the first line's indent with the statement running flush left underneath; the wrapper carries .belief-statement so the kicker's em-offsets track the statement's own clamp, and the indent is md+ only because 22% of a phone is narrower than the label. The kicker holds the belief-verb so the big words can start at the substance. It scrubs against page scroll, so it is described rather than staged: in a documentation column the words would sit at whatever opacity the scroll happened to leave them, which misrepresents both the fill and the statement. ⚠ THE data-manifesto-track WRAPPER IS LOAD-BEARING: the statement scrubs against the nearest track element, falling back to the nearest section, and here it SHARES its section with the prose pair and the whole scroll index, so without the attribute the fill would complete deep inside the index rows. ⚠ AND THE COMMENT THAT USED TO SIT ON THIS BLOCK WAS WRONG: it claimed a 140vh sticky track shared with the homepage. The pin was removed on purpose on 2026-07-24 (the client felt friction here) and what ships is a plain padded div in normal flow. The homepage manifesto held its pin another fortnight on centrepiece grounds, then got the same verdict from the same reader on 2026-08-07 — no pin anywhere now; the compartment fills in normal flow on both pages."
        />

        {/* ── CONTACT AND HOLDING ──────────────────────────────────────── */}
        <Group
          num="05"
          title="Contact and holding"
          note="The two conversion routes and the page that currently replaces the entire site. Three of these are rail furniture inside one band; two of the holding page's four pieces cannot be shown here, and the reasons are worth reading before assuming a specimen was forgotten."
        />

        <Comp name="GlowBand" where="/contact, /start-a-project." />
        <What>
          The section that carries a dark hero&rsquo;s warmth PAST the seam:
          relative, grain, overflow-hidden, a <Code>SectionGlow</Code>, and the
          shell&rsquo;s 12-col content grid lifted onto z-10. Both conversion
          pages are built this way, which is what made it a component: masthead,
          then one banded section holding the page&rsquo;s real content.
        </What>
        <What>
          ⚠ <Code>overflow-hidden</Code> KILLS <Code>position: sticky</Code>. An
          overflow-hidden ancestor becomes the sticky element&rsquo;s scroll
          container, so the pin silently stops working and the element scrolls
          away; that regressed the /services odometer twice in one day before
          the client caught it. This band clips, so it must never wrap sticky
          content. A page needing both puts the glow in an absolutely-positioned
          clipping layer that is a SIBLING of the sticky content and leaves the
          section unclipped. Neither live consumer has sticky content, so both
          keep the band&rsquo;s own clip.
        </What>
        <Props>
          <Entry name="blob" what="'left' | 'right' (default). Which side SectionGlow's individual blob sits. VARY IT PER PAGE so neighbours do not repeat." />
          <Entry name="padding" what="The shell's vertical rhythm. Default is /contact's; /start-a-project opens tighter under its masthead." />
          <Entry name="grid" what="The content grid. Default is /contact's gapped ledger-and-form pair; /start-a-project carries one column and drops the gap." />
          <Entry name="pool" what="Adds one quiet canvas pool low-left under the content, so a long facts rail does not sit on flat ink. /contact only." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          The specimen children are deliberately thin. The band owns the ground,
          the glow and the grid; what sits in the columns belongs to the route,
          and the three pieces /contact actually puts in the left column each
          have their own specimen below.
        </p>
        <Stage flush>
          <GlowBand pool>
            <div className="md:col-span-5">
              <p className="overline text-clay">Specimen column</p>
              <p className="body-sm mt-3 text-bone-dim">
                Columns 1 to 5. On /contact this is the facts rail, the steps
                and the cross-link.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="overline text-clay">Specimen column</p>
              <p className="body-sm mt-3 text-bone-dim">
                Columns 7 to 12. On /contact this is the form.
              </p>
            </div>
          </GlowBand>
        </Stage>

        <Comp name="StudioFactsLedger" where="/contact, in GlowBand's left column." />
        <What>
          The studio&rsquo;s details as RULED LEDGER ROWS: hairline, label left,
          value locked to its baseline. THIS IS THE DESIGN SYSTEM&rsquo;S
          LedgerRow MOLECULE MADE REAL. The Molecules tier documented that
          pattern by HAND-COPYING this markup into a stage, which is the drift
          the component tier exists to end; the specimen can now import the rail
          itself, so the canon and the live page cannot say different things.
        </What>
        <What>
          The row&rsquo;s two sides lock on a FIRST baseline: the label leads its
          block, so the value sits on the label&rsquo;s own line, never on a box
          edge and never nudged with <Code>pt-*</Code>. The rule IS the row, so
          it carries no background, no radius and no padding beyond its vertical
          rhythm. Tone follows from what a row IS rather than from a prop: a row
          WITH an href is a target, so it sits at full bone and turns champagne
          on hover, and a row without one is meta, so it dims to bone-dim.
        </What>
        <Props>
          <Entry name="facts" what="readonly StudioFact[]: label, value, optional href. DEFAULTS to the studio's own details, read from SITE so the ledger can never drift from the schema, the footer and the metadata." />
          <Entry name="stagger" what="Per-row entrance step in ms. The first row carries no delay at all, so the rail starts the moment it enters." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          The specimen renders the DEFAULTS, which is deliberate: these are the
          studio&rsquo;s own contact details rather than a claim about anybody
          else, and showing them means this stage and /contact are literally the
          same rows.
        </p>
        <Stage>
          <div className="max-w-[520px]">
            <StudioFactsLedger />
          </div>
        </Stage>

        <Comp name="NextStepsList" where="/contact, under the facts ledger." />
        <What>
          A kicker over numbered steps at RAIL scale: index numeral beside a line
          of body, the process grammar the site uses wherever it explains a
          sequence. The steps are DATA rather than copy the component owns, since
          /contact&rsquo;s three are the promise its own FAQ makes and any other
          page&rsquo;s sequence is its own.
        </What>
        <What>
          The heavier sibling is <Code>MethodSection</Code>&rsquo;s band, where
          the numeral, a title and a body split a full-rail grid over rule-light.
          This is the rail version: no rules, no titles, one line per step,
          because it sits in a 5-column column beside a form rather than across
          the page.
        </What>
        <Props>
          <Entry name="steps" what="readonly string[]. One line per step; the numbering is the component's." />
          <Entry name="kicker" what="Names the sequence. Defaults to 'What happens next'." />
          <Entry name="className" what="Outer spacing is the RAIL's business, not the list's: the block sits in a stack the page paces." />
          <Entry name="delay" what="Entrance step in ms. The rail's stagger continues through this block, so the page owns the number." />
        </Props>
        <Stage>
          <div className="max-w-[520px]">
            <NextStepsList steps={SPECIMEN_STEPS} kicker="Specimen kicker" />
          </div>
        </Stage>

        <Comp name="StartProjectCrossLink" where="/contact, at the foot of the rail." />
        <What>
          THE SHORTER ROUTE: the block that points project enquiries at the
          full-page form, so the site&rsquo;s two conversion paths cross-link. It
          exists because the client separated them, which left the two paths
          needing a door between them. THE COPY IS THE COMPONENT: it names the
          other path and says what that path asks for, so a consumer passing its
          own words would be writing a different block.
        </What>
        <What>
          ⚠ THE HREF IS LOAD-BEARING. <Code>StartProjectOverlay</Code>{" "}
          intercepts every click on <Code>a[href=&quot;/start-a-project&quot;]</Code>{" "}
          in the capture phase and opens the form overlay in place, so the ghost
          link is a trigger by virtue of its href alone while the route stays the
          real no-JS, crawler and deep-link fallback. Change the href and this
          block silently becomes an ordinary navigation. That also means the link
          below is LIVE: clicking it opens the overlay over this page.
        </What>
        <Props>
          <Entry name="className" what="Outer spacing is the RAIL's business; the hairline and the air under it belong to the block." />
          <Entry name="delay" what="Entrance step in ms, continuing the rail's stagger." />
        </Props>
        <Stage>
          <div className="max-w-[520px]">
            <StartProjectCrossLink />
          </div>
        </Stage>

        <Comp name="HoldingMasthead" where="/coming-soon, the left half of the split." />
        <What>
          The holding page&rsquo;s pitch: kicker, statement, and the studio line.
          It is written for ONE reader, the visitor arriving from a client
          site&rsquo;s footer credit, which is the whole reason /coming-soon
          exists before the site does. THE COPY IS THE COMPONENT: this is the
          studio&rsquo;s one pre-launch statement, carrying the accent-word
          device the homepage masthead also lands on, and the lede is{" "}
          <Code>SITE.tagline</Code>, so the holding page and the metadata can
          never say different things.
        </What>
        <What>
          ⚠ THE LOAD-IN IS THE PAGE&rsquo;S IDEA, NOT THE COMPONENT&rsquo;S: the
          kicker tracks in, the statement follows at 0.5s, the lede at 0.7s and
          the enquiry card at 1.1s, one sequence spanning BOTH columns, so the
          delays here and in the enquiry card are read together.{" "}
          <Code>animate-track-in</Code> survives here alone; it retired from the
          brand with the old homepage top.
        </What>
        <Props>
          <Entry name="(none)" what="The copy, the measures and the delays are all the component's. The shell owns the column it sits in." />
        </Props>
        <Stage>
          <HoldingMasthead />
        </Stage>

        <Comp name="HoldingFineprint" where="/coming-soon, rendered by HoldingPageShell." />
        <What>
          The holding page&rsquo;s foot: copyright, the studio line, and the one
          link the page is willing to offer. Privacy is here because it must be
          reachable wherever a form collects an address, and the holding
          page&rsquo;s form does; it is deliberately the ONLY exit, since
          /coming-soon replaces the site chrome.
        </What>
        <What>
          It is the third child of the shell&rsquo;s vertical column and the
          shell renders it there, because the middle band&rsquo;s centring
          depends on this sitting at the bottom of the flex column. The two are
          kept together on purpose.
        </What>
        <Props>
          <Entry name="(none)" what="Reads SITE for the legal name and the tagline." />
        </Props>
        <Stage>
          <HoldingFineprint />
        </Stage>

        <Sub
          title="HoldingPageShell — described, not rendered"
          note="The full-screen frame /coming-soon is built on, and it cannot be staged for the most literal reason available: it renders as main fixed inset-0 z-50 with its own scroller, so a specimen would cover this entire page and every tier on it. It is fixed on purpose, ABOVE the site chrome, because the root layout's nav and footer would otherwise put a full navigation on a page whose whole point is that the site is not ready. ⚠ THE VERTICAL COLUMN IS LOAD-BEARING, so it lives in one file: a min-h-screen flex column with the monogram at the top, the composed unit in a flex-1 items-center band, and HoldingFineprint at the foot. The middle band is centred BETWEEN the other two; break the trio apart across files and the centring silently becomes top alignment. The 50/50 grid is part of the same recipe, with columns TOP-ALIGNED so the kicker and the card start on the same line. The ground is scene-ink plus grain, flat ink and the one material. ⚠ MOST-SEEN PAGE ON THE SITE while HOLDING_PAGE is true, since the middleware serves it on every route. Props: children, the two columns of the composed unit."
        />
        <Sub
          title="HoldingEnquiryCard — described, not rendered"
          note="The right half of the holding split: the kicker ABOVE the glass, ContactForm inside it, and the email escape hatch BELOW, close in, so the panel wraps exactly what the reader acts on. That is the same rule the Start-a-project overlay's panel follows. .card-glass is right here rather than .glass-float because the ground is FLAT ink: that is the pick-by-ground rule in tier 01, not a preference. This is the most-seen glass on the site while the holding page is on. Its 1.1s entrance is the last beat of the shell's cross-column sequence. WHY THERE IS NO SPECIMEN: it renders ContactForm, whose field ids are the fixed strings name, email and message, and tier 04 already renders one live ContactForm above. A second copy on this page would duplicate all three ids, and every label in BOTH forms would resolve to whichever input the browser met first, so the specimen would document a broken version of a component that is not broken. The form itself is staged, correctly and once, under Components → Forms."
        />
      </Section>

      {/* ═══ STILL INLINE ════════════════════════════════════════════════ */}
      <Section
        id="components-inline"
        title="Still inline"
        note="Everything left in a page file after the 2026-08-05 sweep: what it does, the route that owns it, and whether it is a one-off or a candidate for extraction. Four remain, down from twenty-nine, and none of them carries a design decision that another route could want."
      >
        <p className="fineprint mt-5 max-w-[72ch]">
          NOTHING HERE IS RENDERED, and that is the rule rather than an
          omission. A hand-copied specimen is a second copy of markup that
          nobody updates, so it drifts from the page it claims to document the
          first time either one is edited: the reader then trusts a picture of
          something that has not existed for weeks. A band earns a specimen on
          this page when it becomes a component and there is only one copy to
          show.
        </p>

        <Sub
          title="What the sweep settled"
          note="The finding this section used to lead with is closed. The Molecules tier documented the LedgerRow by hand-copying /contact's facts rail into a stage, and the same section listed two pages as hand-rolling the ruled-row shape after both had started calling the component. Extraction fixed the underlying problem rather than the wording: StudioFactsLedger and RuledLinkRows are both staged above from the real component, so the rail a reader sees here is the rail /contact ships. The lesson stands and is now the tier's standing rule: the fix for a drifting copy is never a better copy, it is fewer copies."
        />

        <Sub
          title="The verdicts"
          note="ONE-OFF means the fragment belongs to its page and extracting it would buy nothing: it is tuned to one composition, or it is two elements with no design of their own. CANDIDATE means a second consumer exists, is coming, or the shape is already documented as a molecule that components keep hand-rolling. A verdict is an argument, not a schedule."
        />

        <div className="mt-8">
          <Entry
            name="Article hero scene"
            what="One section element carrying relative, grain, scene-ink and overflow-hidden, so the flat ink scene runs unbroken behind both the lockup and the device cluster. ONE-OFF: it is a ground, four utility classes wide, and everything inside it is already a component."
            where="/work/[slug]"
          />
          <Entry
            name="Article shell"
            what="An article element and one shell div, holding the reading column on the shared left rail rather than centring it. ONE-OFF: two elements with no design of their own, and the note that matters (only /work/[slug] holds the shell-wide licence) is a comment on the route, not a component."
            where="/blog/[slug]"
          />
          <Entry
            name="Scroll-index wrapper"
            what="A shell div with the page's foot padding and z-10, around ServicesScrollIndex. ONE-OFF: the odometer inside is the component, and the wrapper is the page paying for its own bottom air. ⚠ Nothing in this tree may be overflow-hidden, because the odometer numeral is position:sticky."
            where="/services"
          />
          <Entry
            name="Policy stack"
            what="Six ruled sections from a local array at a 3xl measure, each a heading-sm over body-reading, plus a last-updated line. ONE-OFF: legal prose with one consumer, and it should stay easy to edit in place, because the page has to be kept in step with what the site actually collects."
            where="/privacy"
          />
        </div>
      </Section>
    </>
  );
}
