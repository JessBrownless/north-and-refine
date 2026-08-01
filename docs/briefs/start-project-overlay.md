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

## The composition (settled after three passes)

Two columns, no full-width masthead row:

- **Left (cols 1–5):** the H2 at `.heading-xl`, then one line of copy, then a
  **small 16:10 plate** (max 420px). The heading lived on the plate first (too
  small), then in a full-rail masthead row (which sat between the bar and the
  form, so *any* air above the title pushed the form down and had to be clawed
  back — the client's "there is NO breathing room" was structural). Putting it
  in the column decoupled the two: the title now sits ~221px from the top.
- **Right (cols 7–12):** the form in a **rounded, bordered panel**
  (`rounded-ui`, `rule-dark`, `bg-ink-raised/40`, p-6 sm:p-8).

**Everything must be visible on load** — the client's hard requirement. Current
measurement at 1440×900: panel top 80, **bottom 883**, consent visible, no
scrolling. Re-measure after any content change; the scroller handles short
screens and mobile.

## The form

Two sections with **real titles** (`.heading-sm` + a section rule).
The client rejected `.overline` kickers here: *"they look like eyebrow text. I
want actual titles that are from this website's design system."*

- **About you** — name + email share a row; the practice takes a row (optional).
- **Your requirements** — the **choice cards** + the project textarea.

**The choice cards are MULTI-SELECT** (checkboxes, square champagne ticks — a
round dot would promise one-of). They post as one comma-joined `needs` string,
so the Netlify field is unchanged. **"Not sure yet" is mutually exclusive** with
the three disciplines. Order is web → search → brand, per the sitewide rule.
The visible "What do you need? (choose any)" legend was **deleted** once the
section title existed; the group is labelled by that title via `aria-labelledby`,
and an **sr-only legend** keeps the multi-select affordance for screen readers.

**Consent sits BELOW the CTA** and carries a `bone/45` rim — at the ink hairline
it was invisible on the panel. Unticked by default (UK GDPR/PECR).

Validation is the house pattern in `lib/forms.ts`: `noValidate` + designed
inline champagne errors, validate on blur once touched, clear as corrected,
failed submit focuses the first invalid field. **Nothing in the form starts at
opacity 0** — it's conversion-critical.

## Accessibility decisions

- **One `<h2>` at every breakpoint**, and the dialog's `aria-labelledby` points
  at it. A `md:hidden` duplicate left the dialog labelled by a `display:none`
  node at one breakpoint.
- **Focus lands on the dialog container** (`tabIndex={-1}`), not the Close
  button — opening with a focus ring around the exit reads as "leave".
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
