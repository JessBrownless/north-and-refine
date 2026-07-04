"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A word that types, holds, deletes and retypes the next — the CTA's
 * "…your patients trust / book through / remember…" rotator. A thin
 * champagne caret blinks at the insertion point. Under
 * prefers-reduced-motion the first word renders statically, no cycling.
 */
export default function TypewriterWord({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [len, setLen] = useState(words[0]?.length ?? 0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current || words.length < 2) return;

    let phase: "holding" | "deleting" | "typing" = "holding";
    let index = wordIndex;
    let count = words[index].length;
    let timer: number;

    const step = () => {
      if (phase === "holding") {
        phase = "deleting";
        timer = window.setTimeout(step, 60);
        return;
      }
      if (phase === "deleting") {
        count -= 1;
        setLen(count);
        if (count === 0) {
          index = (index + 1) % words.length;
          setWordIndex(index);
          phase = "typing";
          timer = window.setTimeout(step, 350);
        } else {
          timer = window.setTimeout(step, 55);
        }
        return;
      }
      // typing
      count += 1;
      setLen(count);
      if (count === words[index].length) {
        phase = "holding";
        timer = window.setTimeout(step, 2600); // dwell on the full word
      } else {
        timer = window.setTimeout(step, 90);
      }
    };

    timer = window.setTimeout(step, 2600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="whitespace-nowrap">
      {words[wordIndex]?.slice(0, len)}
      {/* Caret — a thin champagne bar at the insertion point */}
      <span
        aria-hidden
        className="ml-[0.06em] inline-block h-[0.82em] w-[3px] translate-y-[0.08em] animate-pulse bg-champagne motion-reduce:hidden"
      />
    </span>
  );
}
