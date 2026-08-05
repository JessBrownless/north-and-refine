import { Tier, Section, Sub, Code, Stage, Entry } from "../_ui";

/**
 * TIER 03 — MOLECULES: the compositions that repeat.
 *
 * Atoms are tokens; components are shipped files. Between them sit the shapes
 * the site builds over and over without ever naming: a title with a link on
 * its baseline, a numeral with a caption under it, a label above an underlined
 * field. Because they had no names, every consumer spelled them out by hand,
 * and hand-spelling is how two rows that should be identical drift apart.
 *
 * Several molecules here are NAMED FOR THE FIRST TIME (2026-08-02, client's
 * call in the rebuild brief). A name is not an extraction: nothing on this
 * page adds a class to globals.css. Each entry lists the files that currently
 * hand-roll the shape, and that list IS the argument for extracting it later —
 * when a shape has three consumers and a rule, it has earned a component.
 *
 * TWO MOLECULES ARRIVED FROM ATOMS on 2026-08-05, in the pass that gave every
 * concept one home: the ACCENT WORD (now a Sub inside the heading group, where
 * the specimen was already rendering an unexplained em) and the FROSTED PANEL.
 * Both were filed as tokens because each is spelled with one class, which is
 * the trap this tier exists to name: .glass-frost is an atom, but a panel that
 * frosts into being is .reveal AND .glass-frost AND a glass surface picked by
 * ground AND a stagger, and no one of those is the thing.
 *
 * ⚠ Specimens on this page are INERT. Buttons render as spans and links have
 * no href: hover states are CSS and work on any element, and a documentation
 * page should not be full of dead navigation.
 */
export default function MoleculesTier() {
  return (
    <>
      <Tier
        id="molecules"
        num="03"
        title="Molecules"
        note="The compositions that repeat. Each one composes atoms into a shape with a rule attached; several are named here for the first time, because the site was building them by hand in three or four places and nothing held them to the same measure."
      />

      {/* ═══ THE HEADING GROUP ═══════════════════════════════════════════ */}
      <Section
        id="molecules-heading-group"
        title="The heading group"
        note="COMPOSES: an .overline kicker · a heading off the display ladder, optionally carrying the accent word · a .lede subtitle, with .from-overline holding the two gaps. The most-repeated molecule on the site, and the one with the strictest rule: the gaps are never set by hand. The kicker and the ladder rungs are atoms and are described in Atoms; what belongs here is the arrangement and the spacing that only exists to serve it."
      >
        <Stage ground="ink">
          <p className="overline">Selected work</p>
          <h4 className="heading-part from-overline">
            Practices we&rsquo;ve <em>refined</em>
          </h4>
          <p className="lede body text-bone-dim">
            A look at the brands and websites we&rsquo;ve built, and what
            changed for the practices behind them.
          </p>
        </Stage>

        <Sub
          title="The rule"
          note="Overline and heading are DIRECT SIBLINGS, and the heading carries .from-overline. The gap is 0.7em of the heading's own font-size, so it scales with the heading rather than being re-guessed at every tier. Display-tier headings get 0.35em instead: 0.7em of a 100px masthead is a chasm. The subtitle takes .lede, which sets its top margin on a clamp and caps the measure at 46ch."
        />
        <Sub
          title="Never set these gaps ad-hoc"
          note="An mt-* or mb-* between a kicker and its heading is drift pattern 3 in slow motion: it looks right at one viewport and wrong at every other, and the next author copies the wrong number. If a group needs a different gap, the fix is a rung on .from-overline, not a utility on the instance."
        />

        <div className="mt-8">
          <Entry
            name=".from-overline"
            what="The kicker-to-heading gap, as a proportion of the heading. 0.7em by default; 0.35em on .display and .display-mega."
            where="Homepage collection heads, blog/[slug] and work/[slug] article headers, industries/[slug] section heads, the /coming-soon masthead, this page's own header."
          />
          <Entry
            name=".lede"
            what="The subtitle beneath a heading: a fluid top margin, clamp(1.5rem, 1rem + 1.5vw, 2.25rem), and a 46ch measure, so a subtitle never has to be told twice how wide it is. Pair with a body-tier size class; it sets spacing and measure only, never type."
            where="PageHero's lede column, the /stylesheet header, interior page intros."
          />
        </div>

        <Sub
          title="The accent word"
          note="COMPOSES: one em inside any display-tier utility, which renders Saol Display Light Italic 300, the studio's social voice made typographic. THE RULE: one word or short phrase per statement, sparingly, and never where the emphasis is already doing something else, which is why the scroll-filled manifesto statement carries none. It is declared at weight 300 with font-synthesis: none, so no engine can faux-bold the italic up to the surrounding 400. The rule covers .display-mega, .display, .heading-xl, .heading-part, .statement, .heading-lg, .heading-md, .heading-sm and the deprecated .blockquote; it deliberately does not cover .card-title, because card captions left the display ladder for the sans."
        />
        <Stage>
          <p className="heading-part text-bone">
            The studio is <em>open</em>.
          </p>
        </Stage>

        <Sub
          title="When it is NOT a heading group"
          note="FaqSection and Testimonial put the kicker in the section's own top-left and the heading in a column below or beside it. Those are two blocks with a section margin between them, not a group, so they use a plain mb-8 on the kicker and no .from-overline. The test is adjacency: siblings in the same block are a group."
        />
      </Section>

      {/* ═══ BUTTONS ═════════════════════════════════════════════════════ */}
      <Section
        id="molecules-buttons"
        title="Buttons"
        note="Four tiers, composed as .btn plus one variant. light and dark name the GROUND the button sits on, never the button's own colour."
      >
        <Sub
          title="Gold is the hover"
          note="Every tier's champagne moment is its hover state; no tier rests gold. That is the colour rule made mechanical: champagne is for details and interactions. The secondary outline in particular must NEVER fill solid on hover, which made it impersonate the primary and flattened the hierarchy until it was fixed."
        />

        <Stage ground="ink" className="flex flex-wrap items-center gap-4">
          <span className="btn btn-primary-dark btn-arrow">
            Start a project
            <span className="btn-arrow-chip" aria-hidden>
              ↗
            </span>
          </span>
          <span className="btn btn-primary-dark">Primary</span>
          <span className="btn btn-secondary-dark">Secondary</span>
          <span className="btn-ghost text-bone">
            Ghost <span aria-hidden>→</span>
          </span>
        </Stage>
        <p className="fineprint mt-2">
          On ink. The flagship is one per view; here it sits beside the tiers it
          outranks only so the four can be read against each other.
        </p>

        <Stage ground="bone" className="flex flex-wrap items-center gap-4">
          <span className="btn btn-primary-light btn-arrow">
            Start a project
            <span className="btn-arrow-chip" aria-hidden>
              ↗
            </span>
          </span>
          <span className="btn btn-primary-light">Primary</span>
          <span className="btn btn-secondary-light">Secondary</span>
          <span className="btn-ghost text-ink">
            Ghost <span aria-hidden>→</span>
          </span>
        </Stage>
        <p className="fineprint mt-2">On bone. Same four tiers, inverted.</p>

        <Stage ground="image" className="flex flex-wrap items-center gap-4">
          <span className="btn btn-glass">The glass pill</span>
          <span className="btn btn-sm btn-primary-dark">Small primary</span>
          <span className="btn btn-sm btn-secondary-dark">Small secondary</span>
        </Stage>
        <p className="fineprint mt-2">
          <Code>.btn-glass</Code> is shown over imagery because that is the only
          ground on which it can be judged: it is a 9% bone fill behind a 10px
          backdrop blur, so it needs something behind it to blur. Dark grounds
          only.
        </p>

        <div className="mt-8">
          <Entry
            name=".btn"
            what="The pill itself: 20/40 padding, 11px tracked caps at weight 500, a full pill radius, and white-space: nowrap, because a pill label that folds to two lines reads broken at any width."
            where="Every CTA sitewide. .btn-sm keeps 16/24 and a smaller label; the nav pill and tight rows use it."
          />
          <Entry
            name=".btn-arrow + .btn-arrow-chip"
            what="Tier 1, the flagship: label left, circular arrow chip right, as child markup. The chip inverts its button's colours at rest, then goes champagne and leans north-east on hover."
            where="The homepage hero and the ContactCTA close. One per view."
          />
          <Entry
            name=".btn-primary-dark / .btn-primary-light"
            what="Tier 2, the solid pill. On dark it is bone at 90%, so the ground breathes through it; on light it is solid ink. Both fill champagne-soft on hover."
            where="ContactCTA, FaqSection's ask-us CTA, the Start-a-project form's send button."
          />
          <Entry
            name=".btn-secondary-dark / .btn-secondary-light"
            what="Tier 3, the outline. Hover is a champagne RIM plus an 8–10% champagne wash, never a fill."
            where="The homepage hero's See-the-work pair, ContactCTA's second action."
          />
          <Entry
            name=".btn-ghost"
            what="Tier 4, the tertiary workhorse: tracked caps with an arrow span. On hover the gap opens and the arrow alone turns champagne. Never dim the whole link, because a fading hover reads as disabled."
            where="Every section's onward link: All work, All entries, Read more, Explore, More on web design."
          />
          <Entry
            name=".btn-glass"
            what="The card-glass surface in pill form: a 9% bone fill behind a 10px backdrop blur with a 25% bone rim, over dark imagery or a gradient. DARK grounds only, since a blur needs something behind it. Hover follows the gold rule like every tier, a champagne rim plus an 8% wash, never a solid fill."
            where="The /services hero, via PageHero's ctaVariant=“glass”."
          />
        </div>
      </Section>

      {/* ═══ LINKS, ORNAMENTS AND CONTROLS ═══════════════════════════════ */}
      <Section
        id="molecules-links"
        title="Links, ornaments and controls"
        note="Everything champagne touches that is not a button. The accent lives in details and interactions; the rule holds by keeping gold off the type and on the line."
      >
        <Sub title="Four link treatments, and they are not interchangeable" />

        <Stage ground="ink">
          <p className="body-reading text-bone/90">
            An in-prose link is{" "}
            <span className="text-champagne underline underline-offset-4 decoration-from-font">
              champagne with an underline
            </span>
            , and it is the one place gold carries the text itself. It survives
            there because prose on ink gives it a ~4.3:1 ground and the
            underline does the affordance work.
          </p>
          <p className="body mt-8 text-bone-dim">
            Utility links in the footer and the fine print take a plain{" "}
            <span className="underline underline-offset-2">
              underline with no gold
            </span>
            : they are legal and secondary, and gold would promote them.
          </p>
        </Stage>

        <Stage ground="bone">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
            <span className="overline relative text-ink">
              Active filter
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-px w-full bg-champagne"
              />
            </span>
            <span className="overline text-ink-mute">Inactive</span>
          </div>
          <p className="body mt-10 text-ink-dim">
            On bone the accent moves off the text entirely:{" "}
            <span className="text-ink underline decoration-champagne underline-offset-4">
              ink text, champagne decoration
            </span>
            . Champagne type on bone measures 1.8:1, so gold letters there are
            not a style choice, they are unreadable.
          </p>
        </Stage>
        <p className="fineprint mt-2">
          The filter strip&rsquo;s drawn rule: the label stays ink and only a
          1px champagne span animates its width from 0 to full.
        </p>

        <Sub
          title="Ornaments"
          note="Small marks in champagne, always aria-hidden, always decorative. They are the accent's largest surface area on the site and none of them carries meaning a screen reader needs."
        />

        <Stage ground="ink">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <span className="btn btn-primary-dark btn-arrow">
              Hover the chip
              <span className="btn-arrow-chip" aria-hidden>
                ↗
              </span>
            </span>
            <span className="body flex items-center gap-3 text-bone-dim">
              <span className="text-champagne" aria-hidden>
                —
              </span>
              A pricing list dash
            </span>
            <span className="body flex items-center gap-3 text-bone-dim">
              <span className="text-champagne text-[10px] leading-none" aria-hidden>
                ✦
              </span>
              The hung prose bullet
            </span>
            <span className="text-champagne text-2xl leading-none" aria-hidden>
              +
            </span>
          </div>
        </Stage>

        <div className="mt-8">
          <Entry
            name=".btn-arrow-chip"
            what="The flagship's circular chip, written as child markup so its colours can invert per variant. Hover moves it 2px north-east and fills it champagne."
            where="globals.css defines the chip for .btn-primary-dark and .btn-primary-light only; a chip on any other variant has no rest colours."
          />
          <Entry
            name="The champagne underline"
            what="Not a utility: a composition. In prose it is text-champagne with underline-offset-4; on bone it inverts to text-ink with decoration-champagne; as an affordance it becomes a 1px champagne span that animates its width."
            where="mdx-components.tsx (the a override), work/[slug], ContactForm's success message, /coming-soon, StartProjectOverlay's mailto line, BlogList's category filter."
          />
          <Entry
            name="The ✦ mark"
            what="The studio's asterism: a hung bullet in prose lists, the glyph inside an empty image plate, and the separator in the parked CreditStrip marquee."
            where="mdx-components.tsx, BlogList and the homepage work cards' empty state, CreditStrip."
          />
          <Entry
            name="The FAQ +"
            what="A champagne plus that rotates 45 degrees on group-open. The disclosure is a native <details>, so the mark is pure ornament over real semantics."
            where="FaqSection, on both tones."
          />
        </div>
      </Section>

      {/* ═══ BASELINE LOCKS ══════════════════════════════════════════════ */}
      <Section
        id="molecules-baseline-locks"
        title="Baseline locks"
        note="Side-by-side type aligns on baselines, never on box edges, and never with an eyeballed pt-* nudge. Print rules the page; boxes are invisible."
      >
        <Sub
          title="First baseline — the heading LEADS its block"
          note="items-baseline. Use it where the heading is the first thing in its column and the link should sit on the heading's top line: index rows, FAQ summaries, prose-beside-statement pairs."
        />
        <Stage ground="ink">
          <div className="flex flex-col items-baseline justify-between gap-4 border-b rule-dark pb-6 sm:flex-row sm:gap-8">
            <div className="max-w-xl">
              <h4 className="heading-md text-bone">Cosmetic surgery</h4>
              <p className="body mt-2 text-bone-dim">
                Websites and search for surgical practices, built for the
                consultation enquiry.
              </p>
            </div>
            <span className="btn-ghost shrink-0 text-bone">
              Explore <span aria-hidden>→</span>
            </span>
          </div>
        </Stage>

        <Sub
          title="Last baseline — the heading CLOSES its block, or wraps"
          note="items-end as the old-browser fallback, then [align-items:last_baseline] declared after it. Use it where the link belongs on the heading's bottom line: section header rows with a kicker above the H2, the service rows, the Kind-words image-to-attribution lock."
        />
        <Stage ground="ink">
          <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
            <div>
              <p className="overline">Blog</p>
              <h4 className="heading-part from-overline">
                Notes from the <em>studio</em>
              </h4>
            </div>
            <span className="btn-ghost text-bone">
              All entries <span aria-hidden>→</span>
            </span>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          The kicker sits above the heading, so a first-baseline lock would
          throw the link up onto the kicker&rsquo;s line. Last baseline puts it
          where a reader expects it: on the last line of the words it belongs
          to.
        </p>

        <Sub
          title="The failure it replaces"
          note="Box alignment. items-center or items-end alone lines up the boxes, which are invisible, and leaves the type floating at whatever offset the line-heights happen to produce."
        />
        <Stage ground="raised">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-60">
            <h4 className="heading-part text-bone">Box-aligned</h4>
            <span className="btn-ghost text-bone">
              Wrong <span aria-hidden>→</span>
            </span>
          </div>
          <p className="fineprint mt-4">
            Shown dimmed, and only as the counter-example. This is drift pattern
            13.
          </p>
        </Stage>

        <Sub
          title="The one sanctioned exception"
          note="A row that mixes an IMAGE with type uses items-center, because an avatar has no baseline to lock to. Testimonial's attribution row says so in its own comment. Every other mixed row is type against type, and locks."
        />

        <div className="mt-8">
          <Entry
            name="items-baseline"
            what="First-baseline lock."
            where="industries/page.tsx rows, services/[slug] other-disciplines rows, FaqSection's header pair and every summary, contact/page.tsx's facts rail, BlogList's meta cluster, PageHero's CTA row, work/[slug]'s article header grid, Carousel's folio line."
          />
          <Entry
            name="items-end [align-items:last_baseline]"
            what="Last-baseline lock, with the items-end fallback declared first for engines that do not know last baseline."
            where="The homepage's Selected work and Blog header rows, ServicesShowcase's rows, Testimonial's image-to-words lock, PageHero's split hero (heading left, lede right)."
          />
        </div>
      </Section>

      {/* ═══ RULED ROWS ══════════════════════════════════════════════════ */}
      <Section
        id="molecules-rows"
        title="Ruled rows"
        note="The site's most formal element and its most-copied shape: a hairline, a title left, something right, locked on a baseline. Two molecules, named here for the first time. Neither exists as a component yet; the consumer lists are the case for making them."
      >
        <Sub
          title="LedgerRow"
          note="COMPOSES: a hairline (border-t or border-b, rule-dark on ink, rule-light on bone) · a title left at a ladder register · a value or meta right · a baseline lock. THE RULE: the rule is the row, so the row carries no background, no radius and no padding beyond its vertical rhythm; the two sides lock on a baseline, and the register of the left side decides which lock. BUILT AS: LedgerRow.tsx (2026-08-05). Was hand-rolled in contact/page.tsx (the facts rail, first baseline, .overline label against a .body value), MethodSection.tsx (index numeral, title and body on a three-column grid over rule-light), work/[slug]'s deliverables and the ServicesScrollIndex dash-ruled lists."
        />
        <Stage ground="ink">
          <div className="border-t rule-dark">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5">
              <p className="overline text-clay">Email</p>
              <p className="body text-bone">studio@example.com</p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5">
              <p className="overline text-clay">Instagram</p>
              <p className="body text-bone">@northandrefine</p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b rule-dark py-5">
              <p className="overline text-clay">Where we work</p>
              <p className="body text-bone-dim">London · Sydney · Dubai</p>
            </div>
          </div>
        </Stage>

        <Sub
          title="RuledLinkRow"
          note="COMPOSES: a LedgerRow whose WHOLE ROW is the link · group on the row · a title that dims to opacity-70 on group-hover · a .btn-ghost on the right whose arrow turns champagne through the same group. THE RULE: one link, not two. The ghost on the right is an AFFORDANCE, not a second target, so it is a span inside the row's own anchor; and because the row is navigation rather than a call to action, the right-hand mark is always the tertiary ghost, never a pill. Stack to a column below sm, with the ghost falling under the title. BUILT AS: RuledLinkRows.tsx. Was hand-rolled in ServicesShowcase.tsx (.display titles, last baseline), industries/page.tsx (.heading-lg plus a one-line lead, first baseline), services/[slug]/page.tsx (.heading-md on a 5/5/2 grid, first baseline)."
        />
        <Stage ground="ink">
          <div className="border-t rule-dark">
            {["Web design & build", "SEO & content", "Brand identity"].map(
              (title) => (
                <span
                  key={title}
                  className="group flex flex-col items-start gap-5 border-b rule-dark py-7 sm:flex-row sm:items-end sm:[align-items:last_baseline] sm:justify-between sm:gap-8"
                >
                  <span className="heading-part block text-bone transition-opacity duration-500 group-hover:opacity-70">
                    {title}
                  </span>
                  <span className="btn-ghost shrink-0 text-bone">
                    Read more
                    <span
                      aria-hidden
                      className="transition-colors group-hover:text-champagne"
                    >
                      →
                    </span>
                  </span>
                </span>
              ),
            )}
          </div>
        </Stage>
        <p className="fineprint mt-2">
          Shown at <Code>.heading-part</Code> so three rows fit this column. The
          live homepage rows run at <Code>.display</Code>: they are the page&rsquo;s
          formal stabiliser between two deliberately asymmetric sections, and
          the size is the point.
        </p>

        <Sub
          title="What is NOT a ruled row"
          note="The /work index. It stacks WorkCards, each a 7/5 image-and-caption pair that alternates sides, with no dividing rule between them. Rows suit a list of destinations that share a shape; the case studies each carry a plate, so they get cards. Order matters more than uniformity there."
        />
      </Section>

      {/* ═══ META ROWS ═══════════════════════════════════════════════════ */}
      <Section
        id="molecules-meta"
        title="Meta rows"
        note="The small type that sits under, over and beside content: categories, dates, figures, attributions. Three molecules, named here for the first time."
      >
        <Sub
          title="MetaRow"
          note="COMPOSES: two or three meta items on one baseline, separated by a decorative middot. THE RULE: items-baseline plus gap-x, never a bullet character typed into the string; the separator is its own aria-hidden span so a screen reader reads Category, Date and not Category dot Date. Tints come from the ground's own ladder: text-clay or text-bone-dim on ink, text-ink-mute on bone, with the middot at text-ink-faint, the decorative-only tint. BUILT AS: MetaRow.tsx (2026-08-05). Was hand-rolled in BlogList.tsx (twice per card: category and date above the title, reading time and the Read arrow below it), WorkCard.tsx and the homepage work cards (card-title left, services overline right, over a hairline)."
        />
        <Stage ground="bone">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="overline text-ink-mute">Search</p>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <p className="label text-ink-mute">12 July 2026</p>
          </div>
          <h4 className="card-title mt-4 text-ink">
            What patients actually check before they book
          </h4>
          <div className="mt-6 flex items-center gap-4">
            <span className="label text-ink-mute">6 min read</span>
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span className="cta-label inline-flex items-center gap-1.5 text-ink">
              Read <span aria-hidden>→</span>
            </span>
          </div>
        </Stage>

        <Sub
          title="StatPair"
          note="COMPOSES: a .stat numeral with a .label or .body-sm caption beneath it, optionally a .fineprint qualifier under that. THE RULE: the numeral is the whole register and the caption never competes with it; three per band at most, divided by a left hairline from the second onward rather than by boxes; and every figure must be one the studio could defend in front of the client it came from. BUILT AS: StatPair.tsx (2026-08-05). Was hand-rolled in work/[slug]'s results band (three metrics, sm:border-l dividers, staggered reveals), pricing/page.tsx (the package price inside a card), StartProjectOverlay.tsx (the promise bento's 2 / 3 / 0)."
        />
        <Stage ground="ink">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <p className="stat text-bone">2</p>
              <p className="body-sm mt-3 text-bone-dim">
                Working days to a personal reply
              </p>
              <p className="fineprint mt-1">We read every enquiry ourselves.</p>
            </div>
            <div className="sm:border-l sm:border-ink-line sm:pl-8">
              <p className="stat text-bone">3</p>
              <p className="body-sm mt-3 text-bone-dim">Steps to send</p>
            </div>
            <div className="sm:border-l sm:border-ink-line sm:pl-8">
              <p className="stat text-bone">0</p>
              <p className="body-sm mt-3 text-bone-dim">Obligation</p>
            </div>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          These three are the live overlay&rsquo;s own numbers, and they are here
          rather than an invented percentage on purpose: they are promises the
          studio controls, so they are true today and stay true. Note the
          divider: <Code>rule-dark</Code> lives in the components layer, so a
          responsive prefix never generates it. A breakpoint-scoped hairline
          takes <Code>sm:border-ink-line</Code>, as the results band does.
        </p>

        <Sub
          title="AttributionRow"
          note="COMPOSES: a circular avatar, a name, a hairline divider and a role, under a quote and over a top rule. THE RULE: items-center, NOT a baseline lock, because the row mixes an image with type and an avatar has no baseline; the avatar is a circle, the third standing exception to the corners rule, since faces in circles read as people; the divider is a 1px h-3 span that disappears below sm, where the row wraps. The avatar is aria-hidden with an empty alt, because the name beside it is already the accessible text. BUILT AS: AttributionRow.tsx (2026-08-05). Was hand-rolled in Testimonial.tsx, whose tone prop already swaps every tint in the row."
        />
        <Stage ground="ink">
          <blockquote className="statement max-w-[24ch] text-balance text-bone">
            &ldquo;Placeholder, exactly as the live band carries it. We
            don&rsquo;t write these <em>ourselves</em>.&rdquo;
          </blockquote>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t rule-dark pt-5">
            <span
              aria-hidden
              className="portrait-fill h-10 w-10 shrink-0 rounded-full"
            />
            <p className="body-sm text-bone">Dr Yalda Jamali</p>
            <span aria-hidden className="hidden h-3 w-px bg-bone/15 sm:block" />
            <p className="body-sm text-bone-dim">
              Cosmetic doctor — real words to come
            </p>
          </div>
        </Stage>
      </Section>

      {/* ═══ THE FROSTED PANEL ═══════════════════════════════════════════ */}
      <Section
        id="molecules-frosted-panel"
        title="The frosted panel"
        note="The glass surfaces are atoms; arriving is a composition, and this is it. One molecule, and the panel a brand graphic is mostly made of."
      >
        <Sub
          title="FrostedPanel"
          note="COMPOSES: a glass surface picked by ground (.glass-float over imagery, .card-glass over flat ink) · .reveal for the opacity · .glass-frost for a 6px blur burning off over 0.85s · an inline transitionDelay for the stagger. THE RULE: .reveal and .glass-frost go on the SAME element and neither is optional. .reveal owns the fade, so a panel can never strand invisible if the observer does not fire; .glass-frost owns only the blur, and outside a .reveal that blur never burns off. Adapted from the design source on purpose: its version also rides a translate and a scale, and the 16px rise is retired from this brand, so the blur burn-off IS the develop. BUILT AS: graphics/GraphicPanelLabel.tsx (2026-08-05) — it lives in graphics/ because every consumer does, and a root-level file would read as sitewide furniture. Was hand-rolled in ServicesTiles.tsx and ServicesHeroGraphic.tsx, both of which stagger their panels by inline delay."
        />
        <Stage ground="image">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="reveal glass-frost glass-float p-5">
              <p className="label text-bone">.reveal .glass-frost</p>
              <p className="fineprint mt-2 text-bone-dim">
                This panel frosted in when it entered the viewport. Outside a
                .reveal the blur never burns off, so the pairing is not
                optional.
              </p>
            </div>
            <div
              className="reveal glass-float flex items-center gap-5 p-5"
              style={{ transitionDelay: "160ms" }}
            >
              <svg viewBox="0 0 120 120" className="h-20 w-20 shrink-0" fill="none" aria-hidden>
                <circle cx="60" cy="60" r="46" stroke="var(--ink-line)" strokeWidth="6" />
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  className="tile-draw"
                  stroke="var(--champagne)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ "--draw-len": "289" } as React.CSSProperties}
                />
              </svg>
              <div>
                <p className="label text-bone">.tile-draw</p>
                <p className="fineprint mt-2 text-bone-dim">
                  The stroke draw-on a panel may carry: a gauge ring or a trend
                  curve. The consumer sets --draw-len to the path length; the
                  transition is gated on .reveal.is-in, so it cannot start
                  before the panel it lives in has arrived. Live in
                  ServicesTiles.
                </p>
              </div>
            </div>
          </div>
        </Stage>
      </Section>

      {/* ═══ THE FORM SYSTEM ═════════════════════════════════════════════ */}
      <Section
        id="molecules-forms"
        title="The form system"
        note="Two forms, one set of parts. The class strings live in src/lib/forms.ts, not in the components: FIELD_BASE, FIELD_BASE_LIGHT, fieldBase(tone), fieldBorder(error, tone) and errorTone(tone). Keeping them there is what stops the two forms drifting apart. Section titles inside a form take .form-title, the UI register in Atoms; the labels take .overline."
      >
        <Sub
          title="Champagne cannot carry state on bone"
          note="The rule that shapes everything below. Champagne on bone measures 1.8:1, against ~4.3:1 on ink, so a gold focus rule is a rule nobody can see and a gold error message is unreadable. On light, INK carries focus, errors and the selected card's rim. But a champagne FILL under an ink glyph measures about 7:1 on any ground, so the champagne tick-box is the house checkbox on BOTH tones. Tone is a prop resolved through one table; it is never a fork."
        />

        <Sub
          title="FieldGroup"
          note="COMPOSES: an .overline label · an underline-only input (fieldBase) · a resting border from fieldBorder · an inline .fineprint error from errorTone. THE RULE: no boxes, only the rule beneath, which is why inputs are one of the few things left that do not round. Validation is DESIGNED, never native: both forms set noValidate, fields validate on blur once touched, clear as they are corrected, and a failed submit focuses the first invalid field. The resting rule on light is ink/35, not rule-light, because a section hairline is tuned to whisper and an affordance has to read. BUILT AS: FieldGroup.tsx (2026-08-05). Was hand-rolled in ContactForm.tsx, which spelled the label, input and error out per field; StartProjectForm.tsx hoists FieldLabel and FieldError as local components, out of the render, so React does not rebuild them on every keystroke."
        />

        <Stage ground="ink">
          <div className="max-w-md">
            <label htmlFor="ds-field-dark" className="overline block text-clay">
              Your email
            </label>
            <input
              id="ds-field-dark"
              readOnly
              className="field-on-dark w-full border-0 border-b rule-dark bg-transparent py-3 text-bone placeholder:text-champagne/35 transition-colors focus:border-champagne focus:outline-none"
              placeholder="name@practice.com"
            />
            <div className="mt-8">
              <label
                htmlFor="ds-field-dark-error"
                className="overline block text-clay"
              >
                Your name
              </label>
              <input
                id="ds-field-dark-error"
                readOnly
                defaultValue="A field in error"
                aria-describedby="ds-field-dark-error-msg"
                className="field-on-dark w-full border-0 border-b border-champagne bg-transparent py-3 text-bone transition-colors focus:outline-none"
              />
              <p
                id="ds-field-dark-error-msg"
                className="fineprint mt-1.5 text-champagne"
              >
                Please tell us your name.
              </p>
            </div>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          On ink: champagne carries focus, the resting rule and the error, and
          the placeholder is champagne at 35%, the only tone warm enough to
          survive being dimmed against this ground.
        </p>

        <Stage ground="bone">
          <div className="max-w-md">
            <label htmlFor="ds-field-light" className="overline block text-ink-mute">
              Your email
            </label>
            <input
              id="ds-field-light"
              readOnly
              className="field-on-light w-full border-0 border-b border-ink/35 bg-transparent py-3 text-ink placeholder:text-ink-faint transition-colors focus:border-ink focus:outline-none"
              placeholder="name@practice.com"
            />
            <div className="mt-8">
              <label
                htmlFor="ds-field-light-error"
                className="overline block text-ink-mute"
              >
                Your name
              </label>
              <input
                id="ds-field-light-error"
                readOnly
                defaultValue="A field in error"
                aria-describedby="ds-field-light-error-msg"
                className="field-on-light w-full border-0 border-b border-ink bg-transparent py-3 text-ink transition-colors focus:outline-none"
              />
              <p
                id="ds-field-light-error-msg"
                className="fineprint mt-1.5 text-ink"
              >
                Please tell us your name.
              </p>
            </div>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          On bone: ink carries every state, the placeholder takes ink-faint, and
          the label drops from clay to ink-mute, which is the AA meta tint on
          this ground.
        </p>

        <Sub
          title="TickBox"
          note="COMPOSES: an sr-only peer checkbox · a 20px square with a 1.75-weight tick · a rounded-ui-sm choice card carrying the label and a fineprint hint · a focus ring drawn on the CARD from the input's focus-visible. THE RULE: the box is champagne-filled with an ink tick on both grounds, and the card's selected rim follows the ground instead: champagne on ink, ink with a champagne/10 wash on bone, which is the cream family. Cards are multi-select, and a 'Not sure yet' option is mutually exclusive with the rest. BUILT AS: TickBox.tsx (2026-08-05), which exports TickPath — so the claim that done marks speak the checkbox language is now literal shared geometry rather than a resemblance. ContactForm's consent box stays hand-rolled on purpose: the input IS the square there (appearance-none, uncontrolled, 16px, no card), so one component for both would be a fork wearing a component's name. It shares TickPath, which was the real duplication."
        />
        <Stage ground="bone">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <span className="relative flex items-start gap-4 rounded-ui-sm border border-ink bg-champagne/10 p-4 sm:p-5">
              <span
                aria-hidden
                className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-ui-sm border border-champagne bg-champagne"
              >
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-ink">
                  <path
                    d="M2 6.5 L5 9 L10 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="label block text-ink">A website</span>
                <span className="fineprint mt-0.5 block text-ink-mute">
                  New build or a rebuild
                </span>
              </span>
            </span>
            <span className="relative flex items-start gap-4 rounded-ui-sm border border-ink/25 p-4 sm:p-5">
              <span
                aria-hidden
                className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-ui-sm border border-ink/35"
              />
              <span className="min-w-0">
                <span className="label block text-ink">Search</span>
                <span className="fineprint mt-0.5 block text-ink-mute">
                  Rankings, content, technical
                </span>
              </span>
            </span>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          The live 20px box takes a 6px radius written inline in
          StartProjectForm, sized to the control rather than to the surface
          scale. It is the only raw radius left on a CONTROL, and a candidate
          for a token; the other three in the codebase are sanctioned
          exceptions, being PhoneMockup&rsquo;s hardware radii and the /work
          title chip&rsquo;s em-sized corner, which has to ride the heading
          clamp. The specimen above uses <Code>rounded-ui-sm</Code> so this
          page stays clean.
        </p>

        <Sub
          title="ProgressMarks"
          note="COMPOSES: an ol labelled Progress · h-8 w-8 circular .label chips · fixed w-12 hairline connectors · three states. THE RULE: each state has its own voice, all three borrowed from elsewhere in the system. DONE is the checkbox language, a champagne fill with an ink tick, which is the same banked-answer treatment the cards use; CURRENT is the single solid ink-or-bone chip, the row's one anchor; UPCOMING is a hairline ring. Two identical solid chips is what made an earlier version read as generic wizard chrome. Connectors are a fixed width, never flex-1, or the row stretches across the measure. Done marks are BUTTONS that jump back to that step; upcoming marks are spans. BUILT AS: ProgressMarks.tsx (2026-08-05). StartProjectForm remains the only consumer."
        />
        <Stage ground="ink">
          <ol aria-label="Progress specimen" className="flex items-center">
            <li className="flex items-center">
              <span className="label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne bg-champagne text-ink">
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                  <path
                    d="M2 6.5 L5 9 L10 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span aria-hidden className="mx-2.5 h-px w-12 bg-bone" />
            </li>
            <li className="flex items-center">
              <span className="label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bone bg-bone text-ink">
                2
              </span>
              <span aria-hidden className="mx-2.5 h-px w-12 bg-bone/15" />
            </li>
            <li className="flex items-center">
              <span className="label flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bone/25 text-clay">
                3
              </span>
            </li>
          </ol>
        </Stage>

        <Sub
          title="Two rules that govern the whole stepped form"
          note="THE NO-JUMP CONTRACT: the overlay's column is vertically centred, so any change in a step's height re-centres the whole panel. Every step therefore renders into one fixed well, min-h-[204px] with flow-root, and the foot row carries its own min-h. flow-root is load-bearing: without it each step's first-child margin collapses through the well's top edge and the height moves by about 20px anyway. Re-measure after any field, hint or button change. EVERYTHING VISIBLE ON LOAD: all three steps must fit 1440×900 with no overflow, which is why the last step's textarea is three rows and not four."
        />

        <div className="mt-8">
          <Entry
            name="FIELD_BASE / FIELD_BASE_LIGHT"
            what="The two field treatments as strings. Both carry an autofill class, field-on-dark or field-on-light, because Chrome paints its own pale blue over a filled field and only an opaque inset box-shadow can override it."
            where="src/lib/forms.ts; the autofill rules sit unlayered at the end of globals.css."
          />
          <Entry
            name="fieldBase(tone) / fieldBorder(error, tone) / errorTone(tone)"
            what="The tone resolvers. fieldBorder returns the resting or error rule for the ground; errorTone returns champagne on ink and ink on bone."
            where="ContactForm.tsx uses the dark defaults; StartProjectForm.tsx passes its tone prop through all three."
          />
          <Entry
            name="EMAIL_RE"
            what="Stricter than type=email alone, which accepts an address with no TLD: it requires a dot-separated domain."
            where="Both forms, via validate/validateText."
          />
          <Entry
            name="postNetlifyForm"
            what="POSTs url-encoded fields to /__forms.html, the static definition Netlify reads at build. Resolves false on any failure so the caller can show a retry message. Field names must stay in sync with that file."
            where="ContactForm (project-enquiry), StartProjectForm (start-project)."
          />
        </div>
      </Section>

      {/* ═══ EDITORIAL PROSE FURNITURE ═══════════════════════════════════ */}
      <Section
        id="molecules-prose"
        title="Editorial prose furniture"
        note="Long-form bodies render through proseMdxComponents in mdx-components.tsx, passed to compileMDX in the two [slug] routes. Every element maps to an existing utility; nothing in MDX invents type, so what this section documents is the MAP, never the rungs it maps onto. Those are in Atoms."
      >
        <Stage ground="ink">
          <h4 className="heading-lg text-bone">A heading, from an h2</h4>
          <p className="body-reading mt-6 text-bone/90">
            Body copy renders at <Code>.body-reading</Code>, at bone/90 rather
            than full bone: a long column at full contrast is tiring, and{" "}
            <span className="text-champagne underline underline-offset-4 decoration-from-font">
              links stay champagne
            </span>{" "}
            against it.
          </p>
          <ul className="body-reading mt-6 list-none space-y-3 text-bone/90 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.5em] [&>li]:before:text-[10px] [&>li]:before:leading-none [&>li]:before:text-champagne [&>li]:before:content-['✦']">
            <li className="pl-1.5 leading-relaxed">
              Unordered lists hang the champagne ✦ where the browser disc would
              sit.
            </li>
            <li className="pl-1.5 leading-relaxed">
              Ordered lists keep real numerals, with the marker at clay.
            </li>
          </ul>
          <blockquote className="statement my-10 text-bone">
            A pull quote takes <em>.statement</em>, the house quote register.
          </blockquote>
          <hr className="my-12 border-0 border-t rule-dark" />
          <p className="label text-clay">
            A figure caption, from an image title.
          </p>
        </Stage>

        <div className="mt-8">
          <Entry
            name="h2 → .heading-lg, h3 → .heading-md"
            what="Prose headings map onto the signpost and item rungs, one register below the article's own H1 at .heading-xl, so a head inside a body can never outrank the title above it. The top-margin rhythm is set on the prose wrapper with child selectors in the [slug] pages, because the base h1–h6 rule zeroes heading margins and an mt-* inside the override could not win."
            where="mdx-components.tsx; the wrappers in blog/[slug] and work/[slug]."
          />
          <Entry
            name="p → .body-reading"
            what="The reading register, tinted text-bone/90 by the map. A paragraph whose only child is an image is UNWRAPPED instead, because the img override renders a <figure> and a figure inside a <p> is a hydration error."
            where="mdx-components.tsx, via isImageOnlyParagraph."
          />
          <Entry
            name="img → figure + optional figcaption"
            what="Lazy-loaded, full width, rounded-plate, the standard stop on the imagery radius scale. alt is accessibility only; the visible caption is opt-in through the markdown image TITLE, so no title means no caption."
            where="mdx-components.tsx."
          />
          <Entry
            name=".prose-work > h2 + p"
            what="The case-study opening statement: in a work/[slug] body, each h2 renders as a kicker in the left rail and the paragraph straight after it becomes the section's statement. Sans, weight 500, one notch under .heading-lg because it sits in a narrow right-anchored measure and the full scale would wrap to shreds. Its lg margin mirrors the h2's own so the pair's tops align."
            where="Unlayered at the end of globals.css, consumed by work/[slug]'s prose-work wrapper. Keep the two margins in sync."
          />
          <Entry
            name="blockquote → .statement"
            what="A pull quote in a body takes the house quote register, the same one the Testimonial band uses. It does NOT take the deprecated .blockquote, which is the relic this map replaced; that entry is in Atoms."
            where="mdx-components.tsx."
          />
        </div>
      </Section>

      {/* ═══ PLACEHOLDERS AND EMPTY STATES ═══════════════════════════════ */}
      <Section
        id="molecules-placeholders"
        title="Placeholders and empty states"
        note="A studio site fills up slowly. The rule is that nothing unfinished can ship silently: a placeholder either looks like paper waiting for content, or it says in the copy that it is a placeholder."
      >
        <Sub
          title="The empty plate"
          note="COMPOSES: a .frame at the ratio the real image will take · the .portrait-fill stock inside it · one aria-hidden glyph, the ✦ or the row's own index numeral, at a decorative tint. THE RULE: a placeholder reads as quiet paper, never as content, which is also why the stock itself is flat. The ratio is the real ratio, so nothing reflows when the image lands."
        />
        <Stage ground="ink">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="frame aspect-[16/10]">
              <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                <span className="index-num text-ink-faint" aria-hidden>
                  ✦
                </span>
              </span>
            </div>
            <div className="frame aspect-[4/5]">
              <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                <span className="index-num text-ink-faint" aria-hidden>
                  02
                </span>
              </span>
            </div>
          </div>
        </Stage>
        <p className="fineprint mt-2">
          Landscape 16:10 for work and blog plates, portrait 4:5 for people.
          Live consumers tint the glyph <Code>text-ink/25</Code> or{" "}
          <Code>text-ink-faint</Code>; both sit in the decorative band, which is
          the only band a sub-AA tint may occupy.
        </p>

        <Sub
          title="Placeholder copy says so, in the copy"
          note="A comment in the source is not a label: it is invisible to the client reviewing the page and to whoever deploys next. Testimonial's quote is the model, and it is deliberately awkward to read: the placeholder text states that the words are a placeholder and that the studio does not draft quotes on a client's behalf. That is the register for anything a client must supply, and it is enforced by the pre-launch checklist in CLAUDE.md rather than by CSS."
        />

        <Sub
          title="Empty states are one calm sentence"
          note="No illustration, no card, no arrow. A collection with nothing in it says so at the dim tier of its ground and stops: 'Case studies are being written up. Check back shortly.' on /work, 'No entries in this category yet.' on a filtered blog index."
        />
        <Stage ground="bone">
          <p className="body text-ink-dim">No entries in this category yet.</p>
        </Stage>

        <div className="mt-8">
          <Entry
            name="The blanked title chip"
            what="On the /work hero, small plates set INTO the H1 between words are currently blank ink-raised spans rather than captures, matching the sitewide blanked-mockup call. Decorative, so a plain span with aria-hidden and nothing for a screen reader beyond the clean sentence."
            where="work/page.tsx, the local TitleChip. When imagery is rechosen these become real case-study captures."
          />
        </div>
      </Section>
    </>
  );
}
