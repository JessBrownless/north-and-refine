# The Start-a-project overlay (design record + gotchas)

**Built 2026-07-31, rebuilt twice on 2026-08-01.** The client's brief, across
the session: "Start a project" is a **button**, not a page — "when you click it
anywhere on the site, it does a form overlay"; `/contact` stays plain contact.

## The parts

| File | Role |
| --- | --- |
| `src/components/StartProjectOverlay.tsx` | The overlay + the **sitewide click interceptor** |
| `src/components/StartProjectForm.tsx` | The form itself (used by the overlay AND the fallback page) |
| `src/app/start-a-project/page.tsx` | The real page: no-JS, middle-click, crawlers, shared links |
| `src/lib/forms.ts` | Shared field classes + validation helpers (also used by ContactForm) |
| `public/__forms.html` | Netlify static definition — field names must stay in sync |

**How any CTA becomes a trigger:** link to `/start-a-project`. The host mounts
once inside `Navbar` and intercepts clicks on `a[href="/start-a-project"]` in
the **capture phase** (before Next's Link). New CTAs need no wiring. On the
route itself the interceptor stands down.

## THREE FATAL BUGS THE FIRST BUILD SHIPPED — don't reintroduce

Measured, not guessed, at 1440×900:

1. **Height.** The form was set as full-width ruled ledger rows (the /services
   row grammar) and ran **1217px inside a 900px viewport** — the submit button
   sat at y≈1587. The ledger is right for a browsable index and wrong for a
   form the reader must see whole: each row spent 96px of padding plus an 82px
   label stack to introduce a 56px input, and the LABEL column drove the height
   of every row.
2. **Unreachable — worse than tall.** **Lenis intercepts wheel/touch globally**,
   so the nested `overflow-y-auto` never received the events: the 867px below
   the fold could not be scrolled to *at all*. Nothing on screen moved, which is
   exactly what "isn't working" meant. Fixed three ways — the content now fits,
   the scroller carries **`data-lenis-prevent`**, and the overlay calls
   **`lenis.stop()`** via the modal handle on `window.__nrLenis`.
3. **A no-op scroll lock.** `document.body.style.overflow = "hidden"` **does
   nothing on this document** — overflow only propagates to the viewport from
   the ROOT element, and body is as tall as its content, so there was nothing to
   clip (verified: `window.scrollTo(0, 600)` still moved the page with the
   overlay open). It also makes body a scroll container, which silently breaks
   `position: sticky` on the page behind. **Lock `documentElement`**, with
   `padding-right` compensation for classic scrollbars. The mobile nav drawer
   had the identical bug and was fixed in the same pass.

**Plus a fragile entrance:** the shell was `opacity-0 animate-fade-in`. A
keyframe with `fill-mode: forwards` holds its START value if its timeline never
runs, leaving a full-screen invisible layer that still swallows clicks. The
entrance is now a **mounted-state opacity TRANSITION** — the resting value is a
static `opacity-100` class, so it cannot strand — kicked by `requestAnimationFrame`
**with a `setTimeout(120)` fallback** because rAF is parked in background tabs.

## The composition — THE HALF-AND-HALF (settled 2026-08-01, fifth pass)

The client, with a Relume split-screen wireframe: *"I think we need to go for
this kind of layout. It doesn't feel immersive at all — maybe a light background
too on the form bit."*

```
┌─────────────────────────┬─────────────────────────┐
│ NR mark                 │                      ✕  │
│                         │                         │
│ START A PROJECT         │     the portrait,       │
│ Tell us about YOUR      │     FULL BLEED,         │
│ practice.               │     ember grade         │
│ short lede              │                         │
│ ╭─────────────────────╮ │  ╭─────────────────╮    │
│ │ ✓──●──③  step title │ │  │ 2  working days │    │
│ │ the step's fields   │ │  ╰─────────────────╯    │
│ │ ← Back        Next  │ │  ╭──────╮ ╭──────╮      │
│ ╰─────────────────────╯ │  │ 3    │ │ 0    │      │
│ Prefer email? …         │  ╰──────╯ ╰──────╯      │
└─────────────────────────┴─────────────────────────┘
   bone + grain-light; the       the PROMISE bento
   panel wraps marks+fields
```

**WHY LIGHT WON, and it is worth keeping this history.** Three grounds were
tried in one day. The warm hero base read as one more page. Dropping to ink with
a deepened vignette made it *darker* but not more immersive, because the form
was still a small object floating in a large empty room. Immersion here turned
out not to be a ground treatment at all: it is **the image holding half the
screen** and the reader's own column being a **lit, close, finite surface**. The
site's own grammar already said so, since a light act inside a dark site is the
strongest change of register it has.

- **The bar:** the **NR mark** alone. The mark is a **STAMP, not a link**
  (client: "the logo actually should be on it") — the overlay covers the nav, so
  without it the studio's name leaves the screen at the exact moment a visitor
  decides to hand over their details; and a form is the one place the brand must
  not offer an exit. `NRMonogram` carries its own `role="img"` + label, so the
  name is still announced.
- **Close is the overlay's TRUE top-right corner** (2026-08-01, client: it
  "should be top right" — in the bar it sat at the form column's inner edge, the
  visual MIDDLE of a split screen). A round glass chip over the image (ink wash +
  blur under a bone ✕) so it owns its contrast on any crop; champagne on hover.
  Its opacity entrance rides a wrapper span — `LAYER`'s `transition-opacity` and
  the chip's `transition-colors` would fight over `transition-property` on one
  element.
- **The masthead:** the `.overline` kicker ("Start a project", moved off the bar:
  *"Start a project could be an overline text over the H1"*), the H2 at
  `.heading-xl` on `.from-overline` — **the accent word is `your`** (2026-08-01:
  the possessive is the point of the sentence), matched on the fallback page's
  PageHero — then the lede, the client's line both halves: *"Ready to be the
  next top-rated clinic? Give us a few details to get started."* On light the
  kicker takes `text-clay` (the sanctioned tracked-caps exception) and the lede
  `text-ink-dim`.
- **The form:** `tone="light"`, in a **max-w-[560px]** measure. A 700px-wide
  input is a hard field to find the start of.
- **The foot:** the wireframe's © slot, earning its keep as the escape hatch for
  anyone who would rather just email.
- **The image:** **architecture, not a plate** — full bleed, no ratio box, no
  corner radius on the image itself (the same reason a full-bleed band doesn't
  round). The source is 1500×2000, so `object-cover` always has portrait to work
  with. Below md it becomes a **12rem banner** above the form column.

**THE PROMISE BENTO (2026-08-01 — the client's bento shape, and then her own
veto of the figures: "the stats look great, but can we just say that randomly
with nothing to tie it to? I don't think we can.").** She is right, and the
receipts audit already said so. The illustrative results set (+212% · 3.4× ·
2.1) lasted ONE round; there are no real client results in the repo (the case
studies are seed data), so the tiles now carry **the numbers that are true
today** — the studio's own promises about what pressing send starts:

| Tile | Numeral | Label |
| --- | --- | --- |
| wide | **2** | Working days to a personal reply — fineprint: "We read every enquiry ourselves." |
| square | **3** | Steps to send; about two minutes |
| square | **0** | Obligation — fineprint: "The first conversation commits you to nothing." |

- **The grade** stays: `ember-burnt/25` multiply wash + a slight settle on the
  img pull the stock shot onto the warm axis; ink scrim from the foot; `grain`.
- **The tiles** (md+ only; the mobile banner has no room): glass over the
  shared image — `rounded-ui border-bone/25 bg-ink/35 backdrop-blur`, one wide
  + two square. The bento replaced the single inset hairline frame: the tiles
  ARE the structure. **No asterisks** — nothing needs disclaiming — and **the
  trend chart went with the figures** (it drew a shape no dataset backs).
- **The reply promise's third home and its last** (foot → subtitle → here): it
  is the one real number this surface owns, so it takes the numeral treatment;
  the overlay's subtitle went back to the short invite. (The FALLBACK page
  keeps the promise in its PageHero lede — it has no bento.)
- **THE SWAP PATH:** when real, client-approved, ANONYMISED results exist ("a
  London skin clinic", never named), each tile takes figure + label + one
  attribution line — the structure is already right for it. Never draft that
  data; "average project time" style facts equally need a real average from
  the client first.

**THE PANEL RETURNED — as the wireframe's card, not the box we stripped**
(2026-08-01 evening, client: *"it feels a little unstructured — do you think a
rounded border around the title and form fields is a good idea?"*). The morning
panel had failed for a reason worth keeping precise: it was a DARK box around
bare underline fields on a DARK ground — a container defending itself, boxing a
box. **RE-SCOPED the same evening** (client: *"the border should just be around
the stepper and the form fields, not the whole thing"*): the masthead — kicker,
H2, lede — sits FREE on the bone, and the panel wraps exactly what the reader
ACTS on: marks, step title, fields, foot. The title speaks; the panel is the
instrument. Hairline **`ink/25`** (stepped up from ink/15 the same evening:
*"needs to be darker to help balance"* — still under the fields' ink/35, so
furniture stays under affordance), `rounded-ui-lg`, **no fill** (the bone and
its grain run through), max-w-[640px], p-6 sm:p-7. The mark and the mailto foot
stay OUTSIDE.

**Everything must be visible on load** — the client's hard requirement, and the
reason for the steps. Measured at 1440×900 after the panel landed: panel
**76→830 on every step**, no overflow anywhere (step 3 required the textarea at
rows 3 — rows 4 ran 925px). Re-measure after any content change; the scroller
handles short screens and mobile (verified: the mobile scroller reaches the
submit button).

### THE NO-JUMP CONTRACT (2026-08-01, client: "there's a jump up when you move
to step two. Make sure it never jumps")

The column is vertically centred, so ANY height difference between steps
re-centres the whole panel — the masthead lurches. Getting the panel to render
as the SAME BOX on every step took four pins, each one measured:

1. **THE STEP WELL** — the three panels sit in a `min-h-[204px] flow-root` div,
   sized to clear the tallest step (step 2's card grid). 204, not 200: step 2
   renders a sub-pixel over 200.
2. **`flow-root` is load-bearing** — without it the active panel's `mt-7`
   MARGIN-COLLAPSES THROUGH the well's top edge on hint-less steps while step
   3's hint collapses its smaller `mt-2` through instead: a 20px height
   difference from margins the min-h never saw.
3. **The hint renders INSIDE the well** — outside it, step 3 grew the panel by
   its own height (+29px measured).
4. **The foot row is pinned** (`min-h-[54px]`) — the arrow-chip send pill
   measures 1px shorter than the Next pill, and in a centred column even 1px
   re-centres.

Verified: panel rect identical (76/830) across 1→2→3→back, at 1440×900.
⚠ Any new field, hint or button size change must re-verify this — walk the
steps and watch the panel's top.

## The dark room (SUPERSEDED the same day — kept as the record)

Between the panel era and the half-and-half the overlay ran DARK, and both
attempts are worth remembering so nobody re-runs them:

1. **The warm hero ground** (`#16110C` + `HeroGlow` at 0.4) — read as one more
   page, because it *was* the page's own ground.
2. **Ink + a deepened vignette** (client: *"it needs to feel immersive and
   different — maybe darker? So less BG gradient glow opacity"*): base to
   `--ink`, glow to `intensity 0.2` / `topLeft 0.3`, and a new **`vignette`
   multiplier on `HeroGlow` at 1.5**. That prop earns its keep in the system
   even though nothing uses it now: `intensity` scales the BLOBS only, so
   turning a glow down on its own makes a ground *flatter*, not *darker* — the
   edges stay as lit as the middle. Deepening the falloff is what darkens a
   ground.

Darker, but not immersive: the form was still a small object in a large empty
room. **`HeroGlow`'s `vignette` prop is now PARKED at its default of 1, with no
live consumers** — every hero is byte-identical to before it existed. If the
overlay is ever taken dark again, `bg-ink` + `intensity 0.2` + `topLeft 0.3` +
`vignette 1.5` is the recipe that was on screen.

## The form — THREE STEPS

Stepped 2026-08-01, at the client's call, from the reference's 1-2-3-4. The
form column is now HALF the viewport, and six fields plus a masthead do not fit
a 720px column at 900px tall; the reference solves that with steps, and steps
suit the ask anyway, since one question at a time reads as a conversation.
**Three, not four:** we have six fields, and a fourth step would be a screen
carrying one optional question.

| # | Step | Holds | Gate |
| --- | --- | --- | --- |
| 1 | About you | name, email, the practice (optional) | name + email |
| 2 | Your requirements | the multi-select choice cards | at least one |
| 3 | The project | the note, consent, send | the note |

**EVERY STEP STAYS MOUNTED**, inactive ones behind the `hidden` attribute. The
form posts via FormData on the real `<form>`, so unmounting a step would drop
its values; `hidden` keeps them in the DOM, out of the tab order and out of the
a11y tree, and lets the submit handler validate ALL fields at the end rather
than just the last screen's. **A failed submit jumps back to the step that owns
the offending field** (`FIELD_STEP`), because a field can only be corrected on
its own screen.

**ENTER SAFETY:** a return key in a text field submits the form, so `handleSubmit`
routes to Next whenever the step isn't the last one. Without that, Enter on step
1 posts a half-empty enquiry.

**The progress marks** are the reference's device in the house's materials: sans
numerals (all meta type is sans) in circles on a 1px track. Three calls from the
same day shaped them, in order:

- **COMPACT** (*"the 1-2-3 progress bar feels weirdly stretched out"*) — the
  track was flex-1 across the measure, spacing three marks like fence posts.
  The connectors are a **fixed w-12** now.
- **PROGRESS STAYS FILLED** (*"the step numbers don't stay filled in once
  you've filled them in — we need to signify progress"*) — done marks hold a
  solid fill and swap the numeral for a **tick** (the boxes' own 12-viewBox
  check).
- **OFF THE TEMPLATE** (*"feels a bit not on brand… maybe it's too dark or
  something, just looks templately"*) — the templately thing was TWO IDENTICAL
  INK CHIPS: current and done in the same solid read as generic wizard chrome.
  Now each state borrows its voice from elsewhere in the DS: **DONE is the
  CHECKBOX language** (champagne fill + ink tick — the exact banked-answer
  treatment of the choice cards, the same sanctioned champagne-at-rest: form
  feedback), **CURRENT is the one solid ink/bone chip** (the single anchor),
  **UPCOMING is a hairline ring**. One dark chip per row, and the trail behind
  the reader is literally the colour of its ticked boxes. Done marks are
  buttons (go back, change an answer); hover steps champagne → champagne-soft,
  the house hover-fill move.

Step titles take **`.form-title`** — 15px at weight 600, sentence case, **no rule
under them**. **Hints are OPTIONAL and nearly extinct** (2026-08-01, two culls:
"So we know who we're speaking with" — *"feels unnecessary"* — then "Choose any
that apply. Not sure yet is a real answer" went too). Only step 3's survives
("A sentence or two is plenty"), because it changes behaviour: it sets the
effort bar for the one free-text question. The multi-select affordance lives in
the sr-only legend and the checkbox shape itself. Three passes to get there, and the history is the argument for the
register:

1. `.overline` kickers — rejected: *"they look like eyebrow text. I want actual
   titles that are from this website's design system."*
2. `.heading-sm` + a section rule — an editorial heading dropped inside a form,
   announcing "About you" at 28px. And between that rule and every field's own
   underline, the column drew four horizontal lines before asking one question.
3. `.form-title` — *"titles on the form smaller and bolder… excessive borders
   under the titles should be removed."* A UI register that leads by **weight**
   rather than size, so the form's furniture never outranks the page's headings.
   Legal because the house face is Instrument Sans with real weights (the
   size-only rule belongs to the display family, which ships one upright
   weight). Logged in globals.css and on /stylesheet.

**The choice cards are MULTI-SELECT** (checkboxes — a round dot would promise
one-of). Padding **p-4 / sm:p-5** with a 16px gap, and the indicator is **20px on
a 6px radius** with a 1.75 stroke (client: *"checkboxes should be a bit more
padded, they seem a bit techy"*) — a 12px box around an 18px control and two
lines of small type is a settings row; the air is what makes it a choice worth
making. **The consent box matches it exactly** — two checkbox sizes in one form
is precisely the detail that reads as "engineered". They post as one comma-joined
`needs` string, so the Netlify field is unchanged. **"Not sure yet" is mutually
exclusive** with the three disciplines. Order is web → search → brand, per the
sitewide rule. An **sr-only legend** keeps the multi-select affordance for screen
readers.

**THE FOOT IS SPLIT-ALIGNED** (2026-08-01, client: *"Next button should be
right aligned"*): Back on the left rail, the forward action on the right —
back is a retreat along the reading direction, forward sits where the eye is
going. **The reply promise lives in the PROMISE BENTO's wide tile** (its third home:
foot → subtitle → tile — see the bento section); the overlay's lede went back
to the short invite, and the fallback page's PageHero lede still carries the
promise, since that page has no bento. **The consent line is GONE** (*"kinda looks awful too -
remove it"*): removed from the UI, from the POST and from `public/__forms.html`
together, so no consent is recorded and NO MARKETING may be sent to these
addresses (Spam Act/PECR). If marketing ever returns to this form, the checkbox
and the consent record come back as one change.

### TONE — one component, two grounds

`tone="light"` for the overlay's bone column; the default dark for the
`/start-a-project` fallback page on ink. Per the `FaqSection` precedent: a prop,
never a fork. Every colour resolves through one table (`T`) at the top of the
component.

⚠ **The light tone is NOT a straight swap. CHAMPAGNE CANNOT CARRY STATE ON
BONE** — it measures **1.8:1** there against ~4.3:1 on ink, so a gold focus rule
is a rule you cannot see and a gold error message is unreadable. On light, **ink
carries focus, errors and selection**; champagne keeps hover and ornament, which
is exactly what the colour rule intends (details and interactions, never
load-bearing type). Measurements and the field classes live in `lib/forms.ts`
(`FIELD_BASE_LIGHT`, `fieldBase`, `fieldBorder`, `errorTone`).

One deliberate exception to "ink carries selection": **the champagne tick-box
is the house checkbox on BOTH grounds** (2026-08-01, client: *"filled states on
checkboxes — are they styled in our style? Anything we can take from DS?"*).
A champagne FILL under an ink tick survives anywhere (the glyph measures ~7:1
on champagne) — it is champagne *lines and text* that die on bone. So: selected
box = champagne fill + ink tick on both tones; the selected card on light =
**ink rim** (the state that must read) + a **champagne/10 wash** — the cream
family, champagne mixed into bone, the same move as `.scene-cream`.

**AUTOFILL** (2026-08-01, client: *"filled state on fields looks super ugly and
grey"*): that grey is Chrome's own `-webkit-autofill` paint (#E8F0FE), which
ignores `background-color`; the only override is an opaque inset box-shadow.
`field-on-light` / `field-on-dark` in globals.css repaint it in each ground's
own colour — the classes ride the FIELD_BASE strings in `lib/forms.ts`.

**The field underline on light is `ink/35` at rest** (2026-08-01, client:
*"form fields feel weird and not clear — think they need a darker outline"*) —
`rule-light` is the SECTION hairline tint, tuned to whisper; an affordance has
to read as one. Focus stays full ink.

Validation is otherwise the house pattern: `noValidate` + designed inline errors,
validate on blur once touched, clear as corrected, a failed Next or submit
focuses the first invalid field. **Nothing in the form starts at opacity 0** —
it's conversion-critical.

## Accessibility decisions

- **One `<h2>` at every breakpoint**, and the dialog's `aria-labelledby` points
  at it. A `md:hidden` duplicate left the dialog labelled by a `display:none`
  node at one breakpoint.
- **Focus lands on the dialog container** (`tabIndex={-1}`), not the Close
  button — opening with a focus ring around the exit reads as "leave".
- **Step changes move focus** to the new panel's first control and announce
  "Step 2 of 3" through an `aria-live` region. Focus only moves when the reader
  changed step (a `movedRef` guard), never on first paint, where it would yank
  them past the heading they're reading. The query is scoped to the ACTIVE panel:
  `hidden` panels are `display:none`, and `focus()` on those is a silent no-op.
- Escape, ✕ and browser/gesture back all close; opening pushes a history entry
  so a phone's back gesture closes the overlay rather than leaving the page.
- `h-[100dvh]`, not `100vh`, so an iOS keyboard doesn't push the layout out.

## Open items

- **The portrait is stock** (`public/assets/graphics/start-project-portrait.avif`,
  from an AdobeStock file in the client's Downloads). Confirm the licence covers
  studio-site use, or swap for client-shoot imagery.
- **"Ready to be the next top-rated clinic?"** is the client's own line. It's
  aspirational about the READER, so it doesn't assert a rating of ours or a
  client's — keep it that way if it's reworded.
- The Netlify `start-project` form **needs a deploy before Netlify registers it**.
- Section titles currently render in Instrument Sans, not Saol, because
  `--font-display` is mapped to the committed Instrument Sans build while Dia is
  on trial. They'll pick up Saol whenever that font block ships.
