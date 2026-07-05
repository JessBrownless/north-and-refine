/**
 * ProofExhibits — the "receipts stack" for the homepage proof bento.
 *
 * A tall composition of artefact fragments layered like evidence in a case
 * file: a redacted search result, a JSON-LD sliver, a performance readout and
 * an enquiry notification — the things every build actually ships, rendered
 * as glass cards in Geist Mono. No client is shown; the redaction bars turn
 * confidentiality into the aesthetic.
 *
 * Purely illustrative chrome — but keep any NUMBERS defensible: the "#1"
 * belongs to the Hawkes study (same source as the stat card beside it), and
 * the LCP figure should track what the production build really measures.
 */

/** Redaction bar — a censored span of text. Width in ch via the w-* class. */
function Redacted({ className = "w-24" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-[0.85em] translate-y-[0.1em] rounded-[3px] bg-bone/25 ${className}`}
    />
  );
}

/** Exhibit tag — "EXHIBIT A · SEARCH" */
function ExhibitTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
      {children}
    </p>
  );
}

export default function ProofExhibits() {
  return (
    <div
      role="img"
      aria-label="A stack of evidence fragments: a search result ranked first with the practice name redacted, a sliver of structured-data code, a sub-second load-time readout, and a new-enquiry notification."
      className="relative flex h-full min-h-[520px] flex-col justify-center gap-0 overflow-hidden p-6 md:p-8"
    >
      {/* Ambient champagne blob — same recipe as the stat cards beside it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 20% -10%, color-mix(in srgb, var(--champagne) 14%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* ── Exhibit A — the redacted search result ── */}
      <div className="card-glass relative w-[88%] max-w-[24rem] self-start rounded-xl p-5 [transform:rotate(-1.5deg)]">
        <ExhibitTag>Exhibit A · Search</ExhibitTag>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-2xl leading-none text-champagne">1.</span>
          <div className="min-w-0">
            <p className="label text-bone">
              <Redacted className="w-28" /> — Cosmetic Surgeon
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-clay">
              https://<Redacted className="w-16 bg-bone/15" />.com
            </p>
          </div>
        </div>
        {/* snippet skeleton */}
        <div className="mt-3 space-y-1.5" aria-hidden>
          <div className="h-1.5 w-full rounded-full bg-bone/10" />
          <div className="h-1.5 w-3/4 rounded-full bg-bone/10" />
        </div>
      </div>

      {/* ── Exhibit B — the JSON-LD sliver ── */}
      <div className="card-glass relative z-10 -mt-3 w-[88%] max-w-[24rem] self-end rounded-xl p-5 [transform:rotate(1.25deg)]">
        <ExhibitTag>Exhibit B · Structured data</ExhibitTag>
        <pre className="mt-4 overflow-hidden font-mono text-[11px] leading-relaxed text-bone-dim">
          <code>
            {'"@type": '}
            <span className="text-champagne">{'"Physician"'}</span>
            {',\n"medicalSpecialty": '}
            <span className="text-champagne">{'"PlasticSurgery"'}</span>
            {',\n"address": { '}
            <span className="text-clay">{"…"}</span>
            {" }"}
          </code>
        </pre>
      </div>

      {/* ── Exhibit C — the load-time readout ── */}
      <div className="card-glass relative z-20 -mt-3 w-[80%] max-w-[22rem] self-start rounded-xl p-5 [transform:rotate(-1deg)]">
        <ExhibitTag>Exhibit C · Performance</ExhibitTag>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-light leading-none tracking-tight text-champagne">
            0.9s
          </span>
          <span className="label text-bone-dim">largest contentful paint</span>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bone/10" aria-hidden>
          <div className="h-full w-[22%] rounded-full bg-champagne/70" />
        </div>
      </div>

      {/* ── Exhibit D — the enquiry notification ── */}
      <div className="card-glass relative z-30 -mt-3 w-[84%] max-w-[23rem] self-end rounded-xl p-5 [transform:rotate(0.75deg)]">
        <ExhibitTag>Exhibit D · Outcome</ExhibitTag>
        <div className="mt-4 flex items-start gap-3">
          <span
            aria-hidden
            className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-champagne"
          />
          <div className="min-w-0">
            <p className="label text-bone">New enquiry — consultation request</p>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-clay">
              from <Redacted className="w-20 bg-bone/15" /> · 2m ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
