/**
 * The Stage's ground classes, in their own module so BOTH the server-side
 * `Stage` (in _ui.tsx) and the client-side `StageFlip` can read one copy.
 * Duplicating the map into the client component would be the same drift the
 * primitives module exists to prevent — a stage ground could then be changed
 * in one place and not the other.
 *
 * ⚠ /stylesheet ONLY, like every primitive in this folder.
 */
export const STAGE_GROUNDS: Record<string, string> = {
  ink: "bg-ink border rule-dark",
  raised: "bg-ink-raised border rule-dark",
  bone: "bg-bone border rule-light",
  ivory: "bg-ivory border rule-light",
  image: "border rule-dark",
};
