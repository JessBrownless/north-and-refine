import { Section, Sub, Code, Stage, Entry } from "../_ui";
import Footer from "@/components/Footer";
import Deck, { type DeckSlide } from "@/components/Deck";
import CreditStrip from "@/components/CreditStrip";
import NewsletterSignup from "@/components/NewsletterSignup";
import TypewriterWord from "@/components/TypewriterWord";
import ServicesHeroGraphic from "@/components/graphics/ServicesHeroGraphic";
import {
  ServicesTileBrand,
  ServicesTileSeo,
  ServicesTileWeb,
} from "@/components/graphics/ServicesTiles";
import {
  FeatureShowcaseDesktop,
  FeatureShowcaseMobile,
} from "@/components/graphics/showcases";

/**
 * TIER 04, PART THREE — BRAND GRAPHICS, CHROME, PARKED.
 *
 * THE BRIEF THIS FILE ANSWERS (2026-08-05, the client: "we don't seem to have
 * the components across the site"). A design system that DESCRIBES its
 * components is a memo. This page has to RENDER them, the way Storybook does,
 * because the only description nobody can argue with is the thing itself
 * running in the browser. So the default here is the specimen, and prose is
 * the fallback: every component that is safe and honest at document-column
 * width is imported from @/components and rendered with real props.
 *
 * WHAT IS DESCRIBED INSTEAD, and the reason is the same in every case: the
 * component mounts GLOBAL behaviour, and this page sits inside the root layout
 * that already mounts it once. A second Reveal installs a rival
 * IntersectionObserver over the same nodes; a second SmoothScroll runs a second
 * Lenis loop against one scroll position and overwrites the modal handle; a
 * second Navbar installs a second capture-phase click interceptor, so one click
 * on a "Start a project" pill opens two overlays. Those are described, not
 * demoed, and each card says exactly what it would fight.
 *
 * FIXTURE COPY IS OBVIOUSLY SPECIMEN COPY. The house rule stands on a
 * documentation page as hard as it does on a live one: no drafted client quote,
 * no invented review count, no percentage. Where a specimen needs a name it
 * says "Specimen practice". The one place invented copy appears is INSIDE the
 * brand graphics, where it is the artwork's own depiction of a mock practice,
 * and each of those carries its pre-launch confirmation note.
 */

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

/** A caption under a specimen. */
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="fineprint mt-5 max-w-[72ch]">{children}</p>;
}

/* Deck's own DEFAULT_SLIDES name a real client. A documentation specimen must
   not, so the demo gets its own set: placeholder faces, example domains, and
   no href, so no card offers a case study that does not exist. */
const DECK_SPECIMEN: DeckSlide[] = [
  { title: "Specimen practice 01", tag: "practice.example" },
  { title: "Specimen practice 02", tag: "practice.example" },
  { title: "Specimen practice 03", tag: "practice.example" },
  { title: "Specimen practice 04", tag: "practice.example" },
  { title: "Specimen practice 05", tag: "practice.example" },
];

export default function ComponentsGraphics() {
  return (
    <>
      {/* ── BRAND GRAPHICS ───────────────────────────────────────────────── */}
      <Section
        id="components-graphics"
        title="Brand graphics"
        note="Compositions ported from the client's design docs. Each is ARTWORK: a fixed-pixel layout, like a plate or an exported image, rendered as DOM so it ships crisp at any density with live type. Brand graphics run at their NATIVE ratio; the 16:10 and 4:5 imagery canon does not govern them. Everything in this section is rendered, because a graphic described in words is just a paragraph."
      >
        <Comp
          name="GraphicScaler"
          where="Every graphic in src/components/graphics. Exported from graphics/shared.tsx, alongside SANS, MONO and PLATE."
        />
        <What>
          The one piece of plumbing under the whole set: it lays a composition
          out at its NATIVE pixel size and transform-scales it to the container
          width from a ResizeObserver, so a fixed 900×600 artwork drops into any
          column the way an image would. The wrapper holds the aspect box, so
          nothing reflows while the first measurement lands.
        </What>
        <What>
          With a <Code>label</Code> it becomes{" "}
          <Code>role=&quot;img&quot;</Code> carrying that one accessible name,
          and its children go <Code>aria-hidden</Code>. That is deliberate: a
          screen reader gets a single written description of the picture rather
          than a scatter of orphaned fragments reading &quot;100&quot;,
          &quot;Layers&quot;, &quot;Aa&quot;. Mono inside a graphic is the
          sanctioned device-chrome use.
        </What>
        <Props>
          <Entry
            name="width / height"
            what="The native composition size from the design doc. Sets the aspect box and the scale divisor."
          />
          <Entry
            name="label"
            what="Accessible name. Omit only for a composition that is purely decorative."
          />
          <Entry name="className" what="Sizing in the consumer's grid. Nothing else." />
        </Props>
        <Stage component>
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-start">
            <div className="w-[240px] shrink-0">
              <ServicesTileWeb />
              <p className="fineprint mt-3">240px.</p>
            </div>
            <div className="min-w-0 flex-1">
              <ServicesTileWeb />
              <p className="fineprint mt-3">Full column.</p>
            </div>
          </div>
          <Caption>
            One component, one 900×600 canvas, two column widths. The panels
            stay registered at both because they are positioned in the
            source&rsquo;s own coordinates and the whole plate scales as a unit.
            It also shows the limit: at 240px the panel type falls under
            legibility, which is why ServicesHeroGraphic was re-seated onto a
            compact 760×800 canvas rather than shrunk.
          </Caption>
        </Stage>

        <Comp name="ServicesHeroGraphic" where="The /services hero media slot." />
        <What>
          Graphic 09, native 760×800. The square ember crop, which is the ONE
          ember-ramp image on that page per the ramp contract, carrying a
          depicted phone, with THREE frosted panels floating over its edges: the
          page markup, the search-result preview, the clinic schema. Web, then
          search, then schema: the studio&rsquo;s disciplines signed in
          artefacts, in the sanctioned order.
        </What>
        <What>
          The panels are <Code>.glass-float</Code>, the dark-polarity house
          glass; the handoff spec that produced that token came from this family
          of graphics. Each carries <Code>.reveal</Code> staggered at 140, 300
          and 460ms, so the crop lands first and the glass arrives over it in
          reading order. It is <Code>.reveal</Code> and not a keyframe for three
          reasons: it is the house entrance, it transitions to a static end state
          so it cannot strand invisible, and it touches opacity only, which is
          what lets it coexist with the float animation two of the panels also
          carry.
        </What>
        <What>
          The depicted schema is UK-first: <Code>MedicalClinic</Code> and{" "}
          <Code>PlasticSurgery</Code>, both real schema.org vocabulary, in place
          of the design doc&rsquo;s Physician and FacialSurgery. ⚠ The depicted
          practice is the standing &quot;Lumen&quot; mock, which is on the
          pre-launch confirmation list.
        </What>
        <Props>
          <Entry name="className" what="Sizing. The composition is otherwise fixed." />
        </Props>
        <Stage component>
          <div className="mx-auto max-w-[420px]">
            <ServicesHeroGraphic />
          </div>
          <Caption>
            Shown at 420px. Native canvas 760×800; the live hero column runs
            about 620px. Scroll it into view to watch the three panels frost in.
          </Caption>
        </Stage>

        <Comp
          name="ServicesTiles"
          where="The three /services scroll-index rows. Exports ServicesTileWeb, ServicesTileSeo and ServicesTileBrand."
        />
        <What>
          THE PLATE PLUS LIVE PANEL SPLIT IS THE WHOLE DESIGN OF THIS FILE, and
          the reason is one sentence: the panels ANIMATE, and a raster can only
          ever be an animation&rsquo;s last frame. These shipped as flat AVIF
          captures for a day, which was right while they were still pictures.
          Then the design gained motion, a staggered frost-in plus a sweeping
          ring gauge and a drawn enquiries curve, and a picture stopped being
          able to tell the truth about them.
        </What>
        <What>
          So the tile is cut along the line the motion already drew. EVERY
          animated element in the source sits inside a frosted panel, and the
          devices, the photography and the ember ground never move. The ground,
          the device, the mock website and the photography stay a PLATE, one
          raster; only the glass is live DOM.
        </What>
        <What>
          That split buys three things a full live port would not. The
          photography stays a photograph rather than ninety absolutely
          positioned divs. The panels get a REAL backdrop-filter, computed
          against the plate underneath instead of baked into it, which is the
          only way the blur survives a re-cut of the picture. And the mock
          practices&rsquo; invented marketing copy, the clinic names, a review
          count, a competitor-vertical H1, stays inside the picture instead of
          becoming roughly 150 words of crawlable text on the studio&rsquo;s most
          commercially important page. Only the panel copy is live, and the whole
          tile is <Code>role=&quot;img&quot;</Code> with one written label.
        </What>
        <What>
          Panel material is the frosted-panel molecule,{" "}
          <Code>.glass-float .glass-frost .reveal</Code>, with the stagger taken
          straight from the source&rsquo;s own animation delays. Ring gauges and
          the enquiries
          curve use <Code>.tile-draw</Code> with a <Code>--draw-len</Code> path
          length. RE-CAPTURING A PLATE needs no code change: hide the panels with{" "}
          <Code>[style*=&quot;glassIn&quot;]&#123;display:none&#125;</Code>,
          shoot the tile at 900×600 in a real browser at 2×, and convert.
        </What>
        <What>
          ⚠ THE ALT TEXT IS THE ONE THING THAT DRIFTS SILENTLY. The tiles depict
          three mock practices and the names change with every design drop, so
          the label has to be re-read against the capture each time. Two known
          items stand: the SEO tile&rsquo;s photograph is still the therapy shot
          from a retired version of that practice, and the in-tile figures are
          depictions of fictional practices awaiting confirmation against the
          real-client-work-only rule.
        </What>
        <Props>
          <Entry name="className" what="Sizing. Each tile is a 900×600 GraphicScaler." />
        </Props>
        <Stage component>
          <ServicesTileWeb />
          <Caption>
            <Code>ServicesTileWeb</Code>. The plate is one AVIF; the markup panel
            and the booking panel are live DOM frosting in over it.
          </Caption>
        </Stage>
        <Stage component>
          <ServicesTileSeo />
          <Caption>
            <Code>ServicesTileSeo</Code>, the busiest of the three: four panels,
            and both of the drawn things. The ring gauge and the enquiries curve
            are <Code>.tile-draw</Code> strokes gated on the reveal, so they
            sweep once on entry and then hold. Note there are no axis labels on
            the curve: an illustration must not fake a dataset.
          </Caption>
        </Stage>
        <Stage component>
          <ServicesTileBrand />
          <Caption>
            <Code>ServicesTileBrand</Code>. The typeface panel rides{" "}
            <Code>zIndex 4</Code> so it crosses the device edge; the layer list
            below it is mono at panel scale.
          </Caption>
        </Stage>

        <Comp
          name="graphics/showcases.tsx"
          where="No live consumers. Exports FeatureShowcaseDesktop and FeatureShowcaseMobile."
        />
        <What>
          Graphics 01 and 02 from the same design doc: bone plates carrying a
          depicted clinic site, an in-graphic browser and an in-graphic phone,
          native 1180×600 and 400×780. All type inside is depiction, not page
          copy, and the practice is the standing Lumen mock. Nothing imports them
          today, and they carry no written park record, so treat them as
          available stock rather than a parked decision. They are rendered here
          because stock nobody can see is stock nobody will use.
        </What>
        <Stage component>
          <FeatureShowcaseDesktop />
          <div className="mt-8 max-w-[320px]">
            <FeatureShowcaseMobile />
          </div>
          <Caption>
            Both on the bone plate frame exported as <Code>PLATE</Code> from
            graphics/shared.tsx. The mobile one is shown at 320px against its
            400px native width.
          </Caption>
        </Stage>
      </Section>

      {/* ── CHROME ───────────────────────────────────────────────────────── */}
      <Section
        id="components-chrome"
        title="Chrome and global behaviour"
        note="The components mounted once in the root layout, plus the schema emitter. Footer is rendered below, because it mounts nothing: it is markup and links. The rest are DESCRIBED, and the reason is always the same one: this page sits inside the layout that already runs them, so a second instance would not be a specimen, it would be a rival."
      >
        <Comp name="Footer" where="Root layout, so every page." />
        <What>
          Opens with the full-bleed Instagram strip: a strict seven-column band,
          three 4:5 tiles each side of the centred monogram, currently all quiet
          placeholders until a real feed exists. Then the monogram, the tagline
          and the email as a ghost link; then the Explore and Elsewhere columns;
          then the fineprint row, which carries the quiet link to this page. A
          floating back-to-top anchor rides the lower right as a plain{" "}
          <Code>#top</Code> link, so Lenis carries the glide rather than a
          scroll handler. It closes on the signature: a giant NORTH at{" "}
          <Code>.wordmark-giant</Code> in <Code>text-bone/[0.13]</Code>, cropped
          by a translate rather than a margin, so the footer&rsquo;s height ends
          exactly at the visible glyph line. Single footer for the whole site; do
          not fork a second. No props.
        </What>
        <Stage component>
          <Footer />
        </Stage>
        <Caption>
          ⚠ READ THIS SPECIMEN WITH TWO ALLOWANCES. It is the real component, so
          this document now carries a SECOND <Code>footer</Code> landmark and a
          second back-to-top anchor; the anchor is harmless, since it targets{" "}
          <Code>#top</Code> like the first, and the duplicate landmark is the
          price of showing the thing rather than describing it. And the
          proportions are the stage&rsquo;s, not the page&rsquo;s: the
          footer&rsquo;s own <Code>.shell</Code> sits inside the stage padding,
          so it is inset further than it is live, and the wordmark clamp tracks
          the VIEWPORT rather than this column, so NORTH is cropped at the sides
          here as well as along its foot.
        </Caption>

        <Sub
          title="Described, not rendered"
          note="Six components, one reason. Each mounts behaviour on the document rather than markup in a box, and this page already runs inside the layout that mounts them. Every row says what it installs and what a second copy would fight."
        />
        <What>
          The clearest case is the nav, which would not even stay in its stage:
          it is <Code>absolute inset-x-0 top-0 z-50</Code>, so a specimen would
          leave the box and hang over this page&rsquo;s own masthead. The rest
          fail more quietly, which is worse.
        </What>
        <div className="mt-6">
          <Entry
            name="Navbar"
            what="One nav sitewide. ABSOLUTE and TRANSPARENT at the page top, so each page's hero ground runs up behind it and it scrolls away rather than sticking. The consequence is load-bearing: every hero's top padding must include nav clearance, 96px, or 128px at md. Content sits on .shell, so the logo and links share one rail with the page below. The CTA is a .btn-sm PRIMARY pill with no arrow chip, so it is never a second flagship in the first viewport; on mobile that same pill rides the bar beside the burger."
            where="Global behaviour it mounts: a route-change effect that closes the drawer, a documentElement scroll lock plus lenis.stop() while the drawer is open, and StartProjectOverlayHost. LIGHT_TOP_ROUTES is currently empty; a future light-topped page must list its exact route or the nav renders bone on bone."
          />
          <Entry
            name="StartProjectOverlay"
            what="The enquiry path. The host intercepts every click on a[href='/start-a-project'] at the CAPTURE phase, before Next's Link, and opens the split-screen form overlay in place, so any new CTA becomes a trigger just by linking to that route. The route itself stays the real page for no-JS, middle-click, crawlers and shared links, and on that route the interceptor stands down."
            where="Mounted inside Navbar, so it rides every page. A second instance would attach a second document-level capture listener: one click would open two overlays, push two history entries, and hand two competing scroll locks to one documentElement. The form inside also posts to the live Netlify 'start-project' form, so a specimen would be a real submission path."
          />
          <Entry
            name="Reveal"
            what="One IntersectionObserver for the whole page. It watches every .reveal:not(.is-in), adds .is-in on entry and then unobserves, and re-runs on pathname change; reduced motion marks everything in immediately. Usage is the class plus an inline transitionDelay for the stagger."
            where="Root layout. A second instance would install a rival observer over the same nodes, each racing to claim and unobserve them. The specimens on this page depend on the real one: the graphics above frost in because that observer, not a local copy, reaches them."
          />
          <Entry
            name="SmoothScroll"
            what="Lenis inertial scrolling at lerp 0.08 with anchors: true, so same-page anchor links ride the same easing. Native scroll stays authoritative: sticky, the Reveal observer and every scroll listener keep working, because Lenis only interpolates wheel and touch input. It skips entirely under reduced motion."
            where="Root layout. It publishes THE MODAL HANDLE, window.__nrLenis, which every overlay calls stop() and start() on. A second instance would run a second rAF loop interpolating one scroll position against itself, and would overwrite that handle, so the overlay's stop() would address the wrong instance and the first unmount would delete a handle it does not own."
          />
          <Entry
            name="ExitFades"
            what="As a section exits the top of the viewport its overlay fades it to ink, handing the stage to the section arriving beneath. One rAF-throttled scroll listener, JS rather than CSS scroll-timeline, so Safari behaves identically and the fade stays frame-synced with Lenis. The overlay's PARENT is the measured scope. Two windows: .exit-fade runs late, 45vh to 8vh, and .exit-fade-long runs early, 78vh to 14vh, for dark content sections where a late fade would dim only padding. Skips under reduced motion."
            where="Root layout. It writes inline opacity onto every .exit-fade each frame, so a second instance would have two listeners writing the same property on the same nodes: the values would agree, which is worse than a visible clash, because nothing would look wrong while the work quietly doubled."
          />
          <Entry
            name="JsonLd"
            what="Renders one schema object or an array of them into script tags of type application/ld+json. A server component, so it can be emitted anywhere in a page's tree. Builders live in @/lib/schema: organizationSchema, websiteSchema, breadcrumbSchema, articleSchema, caseStudySchema, serviceSchema and faqSchema. Never hand-write structured data inline; that is drift pattern 7."
            where="Organisation and WebSite once in the root layout; a breadcrumb on every page; Article or CreativeWork on the detail pages; Service and FAQ on services, pricing and industries. NOT rendered here, and the reason is editorial rather than technical: a specimen would publish invented structured data describing a practice that does not exist. The output is also invisible, so a rendered demo would show an empty stage."
          />
        </div>
      </Section>

      {/* ── PARKED ───────────────────────────────────────────────────────── */}
      <Section
        id="components-parked"
        title="Parked"
        note="Built, working, and deliberately out of service. Parked is not dead: each of these has a written record and, in most cases, a client who asked to keep the option open. Marking them stops the next audit deleting them and stops a reader assuming they are in play. They are rendered anyway, because a drawer you cannot see into is a drawer nobody opens."
      >
        <div className="mt-8">
          <Entry
            name="Deck"
            status="parked"
            what="The showreel: a fanned stack of desktop-screen cards, each a slot for a real capture, with a mask fading the fan's outer edges. Props: slides (DeckSlide[]: title, tag, optional href, screenshot, screenshotAlt)."
            where="Parked 2026-07-09 when the homepage hero changed. Surviving consumers are explorations only: /mockups/showreel and /mockups/old-hero."
          />
        </div>
        <What>
          ⚠ THIS SPECIMEN MOVES. Deck AUTO-CYCLES, one card every 11 seconds; it
          and the CreditStrip marquee below are the only two things on this page
          that move by themselves. It pauses while the pointer is over it, and
          under reduced motion it does not cycle at all. It is shown because the
          fan, the falloff and the depth scrim are the
          component, and a still frame of a stack is just a card. Clicking a back
          card brings it forward; with an <Code>href</Code> the FRONT card links
          through instead, which the specimen does not set, so no card offers a
          case study that does not exist.
        </What>
        <Stage component>
          <Deck slides={DECK_SPECIMEN} />
          <Caption>
            Five placeholder slots, so the fan reads. With no{" "}
            <Code>screenshot</Code> each card falls back to the parchment face
            with its index numeral and title, which is the state the component
            ships in until real captures are dropped in. The stage clips the
            fan&rsquo;s bleed the way the viewport does live.
          </Caption>
        </Stage>

        <div className="mt-12">
          <Entry
            name="CreditStrip"
            status="parked"
            what="The who-we-work-with fields as a one-row credit line: a kicker, then the fields on a 64s marquee with champagne separators and a 7% fade mask at each end. It carries its own hairlines and padding, so it drops into any dark section at gutter width. Fields are the three landing-page industries plus the wider fields served; names only, no links. No props."
            where="Parked 2026-07-24, the same day it was built: 'I think we can drop the industries strip now, we might bring it back'. It lived under the /services hero for one afternoon. No consumers."
          />
        </div>
        <What>
          It is one of the site&rsquo;s TWO sanctioned auto-motions (the other
          is the ContactCTA typewriter, 2026-08-08), which is the other reason
          to keep it visible here: <Code>.animate-marquee</Code> exists for
          this component and nothing else. It pauses on hover and the global
          reduced-motion guard freezes it outright.
        </What>
        <Stage component>
          <CreditStrip />
          <Caption>
            The strip includes its own <Code>.shell</Code>, so inside this stage
            it sits one padding step further in than it would live.
          </Caption>
        </Stage>

        <div className="mt-12">
          <Entry
            name="NewsletterSignup"
            status="parked"
            what="Mailing-list capture: an email field on the dark underline treatment, the submit pill, and a SEPARATE unticked marketing-opt-in checkbox, because ongoing marketing consent is never bundled with delivering the freebie. The checkbox is the house champagne fill. On success the whole form is replaced by a kicker and a line of confirmation. No props."
            where="Parked when the freebie band left the homepage 2026-07-04; destined for its own landing page. Only /mockups/freebie renders it."
          />
        </div>
        <What>
          ⚠ LIVE WIRING. This is the real component, not a copy of its markup, so
          the specimen below POSTS to the Netlify form{" "}
          <Code>newsletter</Code> if it is submitted, and the opt-in value posts
          with it as a consent record. Read it; do not send it. It is rendered
          rather than described because the field underline, the pill, the
          champagne tick-box on ink and the consent fineprint are the whole
          component, and field names must stay in sync with{" "}
          <Code>public/__forms.html</Code>.
        </What>
        <Stage component>
          <NewsletterSignup />
        </Stage>

        <div className="mt-12">
          <Entry
            name="TypewriterWord"
            status="parked"
            what="A word that types, holds for 2.6s, deletes and retypes the next, with a thin champagne caret blinking at the insertion point. Under reduced motion the first word renders statically with no cycling. Props: words (string[])."
            where="⚠ NO CONSUMERS AND NO WRITTEN PARK RECORD. Its own comment describes it as a CTA rotator, but no CTA renders it today. It is tagged parked here because it is intact and working, not because a decision to park it was ever recorded. Either give it a record or retire it."
          />
        </div>
        <Stage component>
          <p className="heading-md text-bone">
            Specimen word: <TypewriterWord words={["one", "another", "a third"]} />
          </p>
          <Caption>
            Specimen words, deliberately meaningless: the component&rsquo;s live
            copy would be a claim, and a claim is not ours to draft. The caret is
            the one champagne detail, which is legal because it is an ornament
            and not label type.
          </Caption>
        </Stage>
      </Section>
    </>
  );
}
