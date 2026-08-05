/**
 * THE CASE-STUDY QUOTE BAND — the client's own words, centred, as a deliberate
 * INTERRUPTION to the write-up's left-right editorial rhythm. Everything above
 * and below it is a rail and a column; this one band is neither, which is what
 * makes the reader stop.
 *
 * The quote takes `.statement`, the QUOTE register of the ladder, capped at
 * 28ch and balanced. It is not `.blockquote`, which is a deprecated sans-era
 * relic kept alive only for the /mockups archive.
 *
 * ⚠ NO CASE STUDY CURRENTLY SHIPS ONE. Every `testimonial` block in
 * content/work is commented out, waiting on real words and real permission,
 * because we never draft a quote on a client's behalf. The band is live and
 * correct; it is the data that is honestly missing. Uncomment a study's
 * frontmatter and it appears.
 *
 * ITS SIBLING is `Testimonial` ("Kind words"), and the two are deliberately
 * separate: that one is a MARKETING band — image left, words right, a portrait
 * plate and an avatar — placed by the studio to sell. This is a case study
 * quoting its own client mid-article, with no portrait and no plate, because
 * the study around it is already the evidence.
 */
export default function CaseStudyQuoteBand({
  quote,
  author,
  role,
  kicker = "In the client’s words",
}: {
  /** The client's words, unquoted: the band supplies the quotation marks. */
  quote: string;
  author: string;
  /** e.g. "Cosmetic doctor, Sydney". Joined to the author on a middot. */
  role?: string;
  kicker?: string;
}) {
  return (
    <section className="relative border-t rule-dark scene-ink grain overflow-hidden">
      <div className="shell py-20 md:py-28 text-center relative z-10">
        <p className="overline reveal">{kicker}</p>
        <blockquote
          className="statement text-bone max-w-[28ch] text-balance mx-auto mt-8 reveal"
          style={{ transitionDelay: "80ms" }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p
          className="label text-bone-dim mt-8 reveal"
          style={{ transitionDelay: "160ms" }}
        >
          {author}
          {role ? ` · ${role}` : ""}
        </p>
      </div>
    </section>
  );
}
