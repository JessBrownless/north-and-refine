import type Lenis from "lenis";

/**
 * The modal handle on the Lenis instance (2026-08-01) — set by
 * <SmoothScroll />, consumed by full-screen overlays that must stop the
 * page's glide while they're open. See the note in SmoothScroll.tsx.
 */
declare global {
  interface Window {
    __nrLenis?: Lenis;
  }
}

export {};
