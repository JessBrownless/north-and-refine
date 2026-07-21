# Brief: build the /about page

**For:** Claude Code, working in this repo
**Date:** 2026-07-11
**Status:** Copy is FINAL (drafted with Jess, four flagged placeholders aside). Layout is yours to compose within the rules below.

---

## The task

Rebuild `src/app/about/page.tsx` around the copy in this brief. The page argues the homepage's claim — *"A studio that treats the clinic's digital presence with the same care as the practice itself"* — with story, method and proof.

**Read `CLAUDE.md` in full before touching anything.** Everything there applies: the type LADDER (registers, not taste), the BASELINES LOCK, the imagery ratio canon (landscape 16:10, portrait 4:5, nothing else), flat ground (no gradients/glows), straight corners, kickers bone by default, champagne for details and interactions only, `.btn` tiers, `.reveal` fades in place, `.shell` for all body sections, heading-group spacing via `.from-overline`. If you think you need a new token or utility, ask first.

## The rhythm rule (this brief's one layout mandate)

The page must alternate down its length: **image-led section → text-led section → image-led section → text-led section, repeat.** No two texty sections back to back. The current build is a wall of type after the hero — that's what this rebuild fixes. A suggested mapping (yours to refine, not to flatten back into text-text-text):

1. **Hero** — `PageHero`, type (the masthead).
2. **IMAGE — the studio plate.** A full-width or generously sized plate straight after the hero to set tone before any body copy. See imagery constraints below.
3. **TEXT — Origin + stats.** The three-paragraph narrative, with the rethought stats row closing the section.
4. **IMAGE — the method plates.** The three method beats carried as visual plates — `StageGlyph` marks (draw-on via `.sg-stroke` on `.reveal`, per `docs/briefs/stage-glyphs.md`) with short supporting copy. Image-led, not a text list with icons.
5. **TEXT — Beliefs.** The four convictions on bone (kept from the current build).
6. **IMAGE — a second plate moment.** e.g. a 5+5 pair of 16:10 figures or a single wide plate, caption only.
7. **TEXT — How we work + FAQ.** Practicalities, then the FAQ (see schema note).
8. **Close** — `ContactCTA` unchanged (it carries its own close plate, so the page ends image+text as designed).

## Imagery constraints (hard rules)

- **No client faces on this page.** The current Dr Yalda portrait comes OUT — client imagery belongs to the work and testimonials, never the studio's self-portrait. This is a settled decision, not a suggestion.
- Plates for this page are **studio artefacts**: the NR dot-compass mark, Saol type specimens, details of the design system itself, process/plate artefacts. The Rowen suite may be used where a plate shows the studio's *craft* rather than a person.
- Ratios per canon: landscape plates 16:10, any portrait-format artefact 4:5. `.frame` wrapper, straight corners, no hover motion on imagery.
- If a slot has no honest artefact yet, a `.portrait-fill` placeholder beats a wrong image — flag it in a code comment as the existing build does.

## SEO / schema (this site is schema-led)

- Keep the existing `metadata` export; update `description` if the page's argument shifts it. Canonical stays `/about`.
- Keep the breadcrumb `JsonLd`.
- The FAQ section must emit **`faqSchema` from `@/lib/schema` via `<JsonLd>`** — never inline structured data. Use the exact Q&A text below.

---

# THE COPY (final — use verbatim, placeholders flagged)

## 1 · Hero

`PageHero`, unchanged from the current build: overline **"The studio"**, title:

> A studio that treats the clinic's digital presence with the same care as the practice *itself*.

(No lede.)

## 2 · Origin — "Who we are"

Kicker: **Who we are**

**Para 1 (lead, body-lg):**

> North & Refine exists because of a simple conviction: everyone is a patient sooner or later, and patients deserve the best information. The practitioners doing the most careful work, the ones who explain, reassure and take their time, are too often represented online by websites that do none of those things.

**Para 2:**

> The studio was founded after ten years in design, the later of them spent in digital health: close enough to medicine to understand how practitioners think, and how much of a patient's trust is decided before they ever walk in. That experience became a specialism. Design for people whose work is looking after people.

**Para 3:**

> So we work in one field, on purpose, and we enjoy it. Helping a good practice communicate as well as it treats is not a niche we settled for; it is the work we would choose again tomorrow. Everything is designed and built in-house, with search, accessibility and regulation treated as part of the craft.

## 3 · Stats row

| Value | Label |
| --- | --- |
| 10 | Years in the craft |
| 1 | Field, known deeply |
| 3 | Projects at a time ⚠ PLACEHOLDER — confirm with Jess before launch |

## 4 · Beliefs

Keep the existing four convictions verbatim (`BELIEFS` array in the current page): *Restraint is the point. / Specialism beats breadth. / SEO is craft, not a plugin. / We measure what we make.*

## 5 · Method — three beats

Kicker: **How we think** · Heading (signpost register): **The method, in brief.**
Close with ghost link: **The full process →** → `/services`

> **Understand the practice.**
> Every engagement starts in the consulting room, not the moodboard: who the practice serves, what patients ask, what the practitioner wants to be known for. The brand and the website are answers; the practice is the question.

> **Design with restraint.**
> In this field, taste signals competence. We make fewer, better decisions: considered type, honest photography, copy that reassures rather than sells. That is what a discerning patient responds to.

> **Measure and refine.**
> Launch is the midpoint, not the finish. We watch how patients actually find and use the work, from search to enquiries to the pages that earn attention, and keep refining until the site serves the practice as well as the practice serves its patients.

## 6 · How we work

Kicker: **Working together** · Heading: **Small by intention.**

> North & Refine is a studio, not a production line. We take on three projects at a time, so every engagement gets senior attention from first conversation to launch. The person who designs the work is the person you speak to.
>
> Small is deliberate, and it works in your favour. There is no red tape and no chain of account managers, so decisions happen in days rather than weeks and the work moves quickly. And because we take on few clients, we build proper relationships: we get to know the practice, not just the project.
>
> We champion one practice per field, per area. Taking on competitors would set our own clients against each other, so we simply don't. When we work with you, we are working *for* you.
>
> A typical project runs six to ten weeks from kickoff to launch, depending on scope. We work remotely with practices across Australia, the United Kingdom and the United States, and everything is designed and built in-house on a modern stack.

(⚠ "three projects" mirrors the stats placeholder; keep the two in sync.)

## 7 · FAQ (emit via `faqSchema`)

Kicker: **Common questions** · Heading: **Asked, answered.**

**Can you build our website without rebranding us?**
> Yes. If the identity underneath is sound, we will happily build on it. But a website can only be as considered as the brand it expresses, which is why we usually recommend brand first: every decision downstream, from photography to copy to the site itself, spends the decisions the brand makes. If your identity needs work, we will say so honestly before any website begins.

**What should a practice invest in first?**
> Brand, then photography, then the website. The brand decides how you speak. Photography decides how you are seen, and nothing undoes clinical credibility faster than stock imagery. The website is where both go to work. Done in that order, each investment makes the next one worth more.

**Do you write the copy?**
> Yes. Copy is part of the design, not something poured in afterwards. In this field the words carry the regulation as well as the reassurance, so we write them the way we design everything else: patient-first, claim-careful, and in your practice's voice. You review everything; nothing publishes without you.

**Do you do SEO?**
> Yes, as part of the craft rather than a plugin. Structured data, performance and content strategy are designed into every site from the first wireframe. We are also selective about it: we champion one practice per field in any given area, because ranking two competitors against each other would be pointless for both.

**Why are you a small studio?**
> By intention. A small studio has no red tape: decisions happen quickly, the work is never handed down a chain, and the thinking, design and build stay with the same hands. It also means we build real relationships with the practices we serve. We would rather do a limited number of projects properly than run a production line.

**Will a new website hurt our existing Google rankings?**
> Done properly, no. Protecting what you have already earned is part of the build, not an afterthought. We map every existing page before anything changes, carry your addresses across with redirects, and keep your domain. Practices usually come out of a rebuild more visible than they went in, because the structured data, performance and content work compound from launch.

**Can you log into our current website and update it from there?**
> No. We rebuild from scratch, because we can't hold someone else's build to the standard we hold our own: the performance, accessibility and structured data our work is known for are decided in the foundations, not the surface. Your existing domain comes with you, though, so nothing you've established there is lost.

**Can you design the website and hand it to our developer to build?**
> No. Here, the design and the build are one craft. Much of what makes our work perform, from speed and accessibility to structured data and the way type behaves, is decided in the build; a design handed over is a design finished by someone else. We would rather do fewer projects whole than more projects halfway, and we only put our name to work we have seen through.

**Do you understand the regulation around cosmetic medicine?**
> Yes. We write and design to the standards this field is held to: no naming of prescription treatments, no claims a practice couldn't stand behind, patient-first information throughout. Work that has to be corrected by a compliance review isn't finished work.

**How long does a project take?**
> Six to ten weeks is typical for a brand and website together, depending on scope. We will give you an honest timeline before we start, and because we only run a few projects at once, the timeline we give is one we keep.

**Who owns the website when it's done?**
> You do. The design, the build and the domain are yours: no proprietary platform holding your site hostage, no licence fee for your own brand. If we ever part ways, everything we made for you goes with you.

**What happens after launch?**
> We stay close. Launch is the midpoint of the method, not the end of it. We watch how patients find and use the site, and keep refining what the numbers ask us to. ⚠ PLACEHOLDER SHAPE — confirm with Jess how ongoing support is actually offered (retainer, ad-hoc, included period) before this answer ships.

### FAQ SEO notes (for the build)

- Emit ALL questions through one `faqSchema` call — the Q&A text verbatim, answers as plain text (no markup) in the schema.
- Questions are deliberately phrased as real search queries ("Will a new website hurt our existing Google rankings?") — keep that phrasing; don't editorialise them into cleverness.
- Don't add cost/pricing questions here — they belong on `/pricing` with its own `faqSchema` once real figures exist. Treatment-vertical questions belong on the industry pages. One page, one FAQ scope.
- Twelve questions is the ceiling for this page; render so the list stays scannable (the site's existing FAQ summary pattern — note the BASELINES LOCK rule on FAQ summaries in CLAUDE.md).

## 8 · Close

`ContactCTA` — drop in unchanged.

---

## Guardrails (do not cross)

- **Never name the founder's former employer.** "Digital health" is the only public description. No exceptions.
- Nothing that states or implies headcount — the studio voice doesn't discuss size beyond "small by intention".
- No team grid, no awards, no press, no client logos on this page.
- Voice: Australian English, no exclamation marks, no superlatives, the studio speaks as "we".
- **Dash restraint:** the copy above has been deliberately swept of em/en dashes. Do not reintroduce them when adapting copy for the page; prefer colons, semicolons and full stops. (This applies to visible copy, alt text and metadata, not code comments.)
- Watch the drift list in CLAUDE.md — especially: ladder registers (a FAQ summary must not outrank the section head), baseline locks on any title-left/link-right rows, `grid-cols-1 md:grid-cols-12`, no new HeroX.

## Placeholders to resolve with Jess before launch

1. Projects-at-a-time number ("3" is provisional, in stats + How-we-work).
2. Confirm 6–10 week typical timeline.
3. Exclusivity policy exact shape — per specialty, per city, or both ("per field, per area" is the current wording).
4. The origin-section artefact choice (mark vs type specimen vs type-led no-image).
5. The after-launch answer's shape — how ongoing support is actually offered (retainer / ad-hoc / included period).
