import type { Metadata } from "next";

// Internal design canon — noindex (also disallowed in robots.ts).
export const metadata: Metadata = {
  title: "Stylesheet",
  robots: { index: false, follow: false },
};

const typeStyles: { cls: string; label: string; note: string; sample: string }[] = [
  { cls: "display-mega", label: ".display-mega", note: "52→152px · hero name lockup", sample: "North & Refine" },
  { cls: "display", label: ".display", note: "44→112px · billboard display", sample: "Considered by design" },
  { cls: "heading-xl", label: ".heading-xl", note: "36→79px · page H1", sample: "Brand & web design" },
  { cls: "statement", label: ".statement", note: "28→56px · centred editorial statement", sample: "A calmer first impression" },
  { cls: "heading-lg", label: ".heading-lg", note: "24→40px · section H2", sample: "What we do" },
  { cls: "heading-md", label: ".heading-md", note: "20→28px · card / sub-heading H3", sample: "Brand identity" },
  { cls: "heading-sm", label: ".heading-sm", note: "17→20px · smallest heading H4", sample: "The approach" },
  { cls: "body-lg", label: ".body-lg", note: "17→19px · lede / intro copy", sample: "We build considered brands and high-performing websites for practices." },
  { cls: "body", label: ".body", note: "16px · default UI/body copy", sample: "The studio takes on a limited number of projects at a time." },
  { cls: "body-reading", label: ".body-reading", note: "17px · long-form reading column", sample: "A cosmetic surgery website carries unusual weight." },
  { cls: "blockquote", label: ".blockquote", note: "pull-quote", sample: "Design is the silent ambassador of the practice." },
  { cls: "overline text-champagne", label: ".overline", note: "11px · uppercase MONO kicker", sample: "Selected work" },
  { cls: "index-num text-champagne", label: ".index-num", note: "18→24px · MONO list numbering", sample: "01 /" },
  { cls: "stat text-champagne", label: ".stat", note: "40→72px · MONO stat numbers", sample: "156%" },
  { cls: "label text-clay", label: ".label", note: "13px · captions & meta", sample: "Brand · Web · SEO" },
  { cls: "fineprint", label: ".fineprint", note: "12px · fine print", sample: "© 2026 North & Refine Studio." },
];

function Swatch({ name, varName, ink }: { name: string; varName: string; ink?: boolean }) {
  return (
    <div>
      <div
        className="h-20 rounded-sm border rule-dark"
        style={{ background: `var(${varName})` }}
      />
      <p className={`label mt-2 ${ink ? "text-bone" : "text-bone"}`}>{name}</p>
      <p className="fineprint">{varName}</p>
    </div>
  );
}

export default function StylesheetPage() {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <div className="shell pt-36 pb-24 md:pt-44">
        <p className="overline text-champagne">Internal reference</p>
        <h1 className="heading-xl from-overline">Stylesheet</h1>
        <p className="lede body-lg text-bone-dim">
          The visual source of truth. Every typography utility, colour token, and button variant.
          If you add a utility to globals.css, add it here in the same change.
        </p>

        {/* Colours */}
        <section className="mt-20">
          <h2 className="heading-lg">Colour</h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            <Swatch name="Ink" varName="--ink" />
            <Swatch name="Ink raised" varName="--ink-raised" />
            <Swatch name="Ink line" varName="--ink-line" />
            <Swatch name="Bone" varName="--bone" ink />
            <Swatch name="Bone dim" varName="--bone-dim" />
            <Swatch name="Clay" varName="--clay" />
            <Swatch name="Champagne" varName="--champagne" />
            <Swatch name="Champagne soft" varName="--champagne-soft" />
          </div>
        </section>

        {/* Type */}
        <section className="mt-20">
          <h2 className="heading-lg">Typography</h2>
          <div className="mt-8 divide-y rule-dark">
            {typeStyles.map((t) => (
              <div key={t.label} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 items-baseline">
                <div className="md:col-span-3">
                  <p className="label text-bone">{t.label}</p>
                  <p className="fineprint">{t.note}</p>
                </div>
                <div className="md:col-span-9">
                  <span className={t.cls}>{t.sample}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Surfaces & frames */}
        <section className="mt-20">
          <h2 className="heading-lg">Surfaces &amp; frames</h2>
          <p className="label text-clay mt-3">
            Tech-luxury surfaces: studio-light scenes, elevated/glass cards, ghost display text.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="scene-warm rounded-2xl p-8 text-ink">
              <p className="label">.scene-warm</p>
              <p className="fineprint">Champagne-lit light scene — device backdrops</p>
            </div>
            <div className="scene-ink rounded-2xl p-8 border rule-dark">
              <p className="label text-bone">.scene-ink</p>
              <p className="fineprint">Champagne glow on ink — dark hero backdrop</p>
            </div>
            <div className="card-soft bg-bone p-8 text-ink">
              <p className="label">.card-soft</p>
              <p className="fineprint">Elevated card on light surfaces</p>
            </div>
            <div className="scene-ink rounded-2xl p-4">
              <div className="card-glass p-8">
                <p className="label text-bone">.card-glass</p>
                <p className="fineprint">Glassy card on dark surfaces</p>
              </div>
            </div>
          </div>
          <div className="mt-8 overflow-hidden">
            <p className="display text-ghost-on-dark whitespace-nowrap">.text-ghost-on-dark</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="mt-20">
          <h2 className="heading-lg">Buttons</h2>
          <p className="label text-clay mt-3">
            Compose .btn + one variant. light/dark refers to the background the button sits on.
          </p>
          <div className="mt-8 space-y-8">
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary-dark">Primary dark</button>
              <button className="btn btn-secondary-dark">Secondary dark</button>
              <button className="btn btn-secondary-dark btn-sm">Secondary sm</button>
              <span className="btn-ghost text-bone">
                Ghost link <span aria-hidden>→</span>
              </span>
            </div>
            <div className="bg-bone rounded-sm p-8 flex flex-wrap gap-4">
              <button className="btn btn-primary-light">Primary light</button>
              <button className="btn btn-secondary-light">Secondary light</button>
              <span className="btn-ghost text-ink">
                Ghost link <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
