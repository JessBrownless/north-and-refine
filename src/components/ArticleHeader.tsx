import type { ReactNode } from "react";

/**
 * ARTICLE HEADER — the opener for DETAIL pages: /work/[slug] and
 * /blog/[slug].
 *
 * It exists because a detail page is NOT a masthead. `PageHero` owns the
 * canonical split masthead every top-level interior page opens with, and the
 * 2026-07-16 hero-cohesion pass deliberately kept the detail pages out of it:
 * a case study and a journal entry open as ARTICLES, with a byline or a meta
 * rail attached, not with a page title. Folding them into PageHero would
 * collapse that distinction; this component is where it lives instead.
 *
 * THE ENTRANCE IS THE SITEWIDE LOAD-IN, never `.reveal` — headers are
 * first-paint content, and an IntersectionObserver section at the top of the
 * document was the bug that pass fixed. Kicker at 0s, title 0.1s, lede 0.25s,
 * rail/byline 0.35s.
 *
 * ⚠ ONE ROUTE CHANGED ON EXTRACTION (2026-08-05). /work/[slug] staged its
 * header element by element; /blog/[slug] faded the whole block at once. The
 * canon is the staged version ("load-ins use `opacity-0 animate-fade-in` +
 * delays") and both headers were written in the same 2026-07-16 pass, so the
 * single-block fade read as drift rather than intent. The blog header now
 * stages with the rest of the site, and its byline takes the meta rail's
 * 0.35s slot. Nothing else on either route moved: the measures, the grid and
 * the media canvases are all props, defaulted to what each route already had.
 */

/** One row of the meta rail: a tracked-caps term over its value. */
export type ArticleFact = {
  term: string;
  value: ReactNode;
};

export default function ArticleHeader({
  kicker,
  title,
  lede,
  byline,
  facts,
  media,
  className = "",
  titleMeasure = "max-w-4xl",
  ledeMeasure = "max-w-2xl",
}: {
  /** The tracked-caps kicker, composed by the consumer: /work pairs sector
      and year on a middot, /blog names the category. */
  kicker: ReactNode;
  title: ReactNode;
  /** /work's summary, /blog's description. Optional — a case study may ship
      without one. */
  lede?: ReactNode;
  /** The line under the lede: /blog's author · reading time · date. */
  byline?: ReactNode;
  /** THE META RAIL (/work/[slug]): client, sector, services, live link. Its
      presence is what puts the header on the 12-col grid, because the rail is
      the only thing that needs the columns. */
  facts?: ArticleFact[];
  /** The opener's imagery, rendered as a SIBLING of the header so it escapes
      the header's measure: /work's device cluster on shell-wide, /blog's
      880px featured figure. The two canvases share nothing but position, so
      each consumer keeps its own wrapper. */
  media?: ReactNode;
  /** The consumer's own shell, padding and z-index. */
  className?: string;
  /** Measure caps; the defaults are /work/[slug]'s. Pass "" where an
      ancestor already sets the measure (/blog/[slug]'s 720px column): both
      matter, because `.lede`'s own 46ch is a components-layer rule and any
      `max-w-*` utility overrides it. */
  titleMeasure?: string;
  ledeMeasure?: string;
}) {
  const hasFacts = Boolean(facts?.length);

  const stack = (
    <>
      <p className="overline opacity-0 animate-fade-in">{kicker}</p>
      <h1
        className={`heading-xl text-bone from-overline${
          titleMeasure ? ` ${titleMeasure}` : ""
        } opacity-0 animate-fade-in`}
        style={{ animationDelay: "0.1s" }}
      >
        {title}
      </h1>
      {lede && (
        <p
          className={`lede body-lg text-bone-dim${
            ledeMeasure ? ` ${ledeMeasure}` : ""
          } opacity-0 animate-fade-in`}
          style={{ animationDelay: "0.25s" }}
        >
          {lede}
        </p>
      )}
      {byline && (
        <p
          className="overline text-clay mt-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.35s" }}
        >
          {byline}
        </p>
      )}
    </>
  );

  return (
    <>
      <header
        className={`${className}${
          hasFacts ? " lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-baseline" : ""
        }`}
      >
        {hasFacts ? <div className="lg:col-span-8">{stack}</div> : stack}

        {/* The meta rail — stacked project facts to the right of the title
            (the editorial pattern), two columns on mobile. */}
        {facts && facts.length > 0 && (
          <dl
            className="mt-12 grid grid-cols-2 gap-8 lg:mt-0 lg:block lg:space-y-7 lg:col-span-3 lg:col-start-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.35s" }}
          >
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt className="overline text-clay">{fact.term}</dt>
                <dd className="body text-bone mt-1.5">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {media}
    </>
  );
}
