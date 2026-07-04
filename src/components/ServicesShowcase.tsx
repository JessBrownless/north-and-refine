"use client";

import { useState } from "react";

/**
 * What-we-do as BIG interactive typography: the three services stacked at
 * display scale on the left; a tall image panel on the right that crossfades
 * when a service is selected. Click (or focus + enter) a title to switch.
 * Images are placeholder captures/gradients until dedicated art lands —
 * swap the `image` paths freely.
 */

const SERVICES = [
  {
    num: "01",
    title: "Brand identity",
    body: "A considered visual language — name, mark, type, palette and tone — that signals the standard of your care before a word is read.",
    image: "/assets/desktops/dr-elizabeth-hawkes.jpg",
    alt: "Brand identity work — Dr Elizabeth Hawkes site, desktop view",
  },
  {
    num: "02",
    title: "Web design & build",
    body: "Fast, accessible, beautifully made websites that hold attention and turn a nervous first visit into a booked consultation.",
    image: "/assets/desktops/dr-yalda-jamali.png",
    alt: "Web design work — Dr Yalda Jamali site, desktop view",
  },
  {
    num: "03",
    title: "SEO & content",
    body: "Technical SEO, schema and an editorial content engine that compounds — so the right patients find you, on your own terms.",
    image: null, // gradient + stat placeholder until dedicated art lands
    alt: "",
  },
] as const;

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
      {/* The list — one big typographic column; the active service carries
          the light, the rest recede */}
      <div className="md:col-span-7">
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`group block w-full border-b rule-dark py-7 text-left transition-colors md:py-9 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <span
                className={`heading-xl block transition-colors duration-500 ${
                  isActive ? "text-bone" : "text-bone/25 group-hover:text-bone/60"
                }`}
              >
                {s.title}
              </span>
              {/* Active service reveals its line */}
              <span
                className={`block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "mt-4 max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <span className="body-lg block max-w-xl text-bone-dim">{s.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* The image panel — all slides stacked, crossfading to the active one */}
      <div className="relative md:col-span-5">
        <div className="frame aspect-[4/5] rounded-xl">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.image}
                  alt={s.alt}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="portrait-fill flex h-full w-full items-center justify-center">
                  <span className="stat text-ink/40">#1–3</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
