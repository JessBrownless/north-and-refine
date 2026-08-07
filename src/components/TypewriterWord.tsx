"use client";

import { useEffect, useRef, useState } from "react";

/**
 * THE TYPEWRITER WORD — a word that holds, rubs itself out and retypes as the
 * next one (2026-08-08, client on the ContactCTA close: "let's do the
 * typewriter thing where it rubs out the last word and rewrites it — trust,
 * book from…"). Born for, and currently scoped to, the close's heading.
 *
 * THE SECOND SANCTIONED AUTO-MOTION. The house rule is "nothing auto-moves,
 * ever" (drift pattern 14); the marquee was the one exception and this is now
 * the other, both minted at the client's explicit call. Keep it rare: a
 * device like this earns its place at ONE moment on a page, and the close —
 * the last thing read — is that moment. Do not spread it into heroes or
 * section heads without her asking.
 *
 * THE CONTRACTS THAT MAKE IT SHIPPABLE:
 * - SSR/no-JS renders `words[0]` COMPLETE — crawlers and JS-off readers get a
 *   finished sentence, never a stub.
 * - REDUCED MOTION: the effect never starts (matchMedia checked before the
 *   first mutation) and the caret never mounts; the word stays words[0].
 * - SCREEN READERS hear ONE stable heading: the animated text is aria-hidden
 *   and a sr-only copy of words[0] carries the accessible name, so the h2
 *   doesn't re-announce itself every few seconds.
 * - The visible span is whitespace-nowrap so a multi-word entry ("book
 *   from") types on one line.
 *
 * The caret is `.type-caret` in globals.css — champagne, the ornament tint
 * on ink (the StageGlyph precedent), hidden under reduced motion there too.
 */
export default function TypewriterWord({
  words,
  className = "",
}: {
  /** words[0] is the resting word: SSR, no-JS, reduced-motion and screen
      readers all get it. The cycle runs words[0] → 1 → … → back to 0. */
  words: string[];
  className?: string;
}) {
  const [text, setText] = useState(words[0]);
  const [live, setLive] = useState(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    // Reading pace: long hold, quick rub-out, measured retype — the delete
    // faster than the type (a typewriter erases with less ceremony than it
    // writes), a beat of empty line before the next word begins.
    const HOLD = 2600;
    const GAP = 420;
    const TYPE = 75;
    const DELETE = 45;
    let word = 0;
    let len = wordsRef.current[0].length;
    let dir: "del" | "type" = "del";
    setLive(true);
    const tick = (delay: number) => {
      timer = setTimeout(() => {
        if (cancelled) return;
        const list = wordsRef.current;
        if (dir === "del") {
          if (len > 0) {
            len -= 1;
            setText(list[word].slice(0, len));
            tick(DELETE);
          } else {
            word = (word + 1) % list.length;
            dir = "type";
            tick(GAP);
          }
        } else {
          if (len < list[word].length) {
            len += 1;
            setText(list[word].slice(0, len));
            tick(TYPE);
          } else {
            dir = "del";
            tick(HOLD);
          }
        }
      }, delay);
    };
    tick(HOLD);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className={`whitespace-nowrap ${className}`}>
      <span aria-hidden>{text}</span>
      {live && <span aria-hidden className="type-caret" />}
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
