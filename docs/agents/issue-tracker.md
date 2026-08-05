# Issue tracker

**Local markdown, under `.scratch/wayfinder/`.** Chosen 2026-08-05 over GitHub
Issues: `north-and-refine` is a public repo, and planning should not be.

⚠ `/.scratch` is gitignored. That is not tidiness, it is the whole point — if
the ignore rule is removed, every map and ticket becomes public on the next
push. Never commit this directory.

## Layout

```
.scratch/wayfinder/
  map-<slug>.md            a map (label: wayfinder:map)
  tickets/<id>-<slug>.md   its child tickets
```

## Wayfinding operations

Every ticket carries YAML frontmatter. The tracker is the filesystem; these
are the queries the wayfinder skill needs.

| Operation | How it is expressed here |
| --- | --- |
| Map | `map-<slug>.md` with `labels: [wayfinder:map]` |
| Child ticket | a file in `tickets/`, `map:` pointing at the map's slug |
| Ticket type | `labels: [wayfinder:research \| prototype \| grilling \| task]` |
| Claim | `assignee:` set to the dev driving it; empty means unclaimed |
| Blocking | `blockedBy: [<id>, …]` — no native relation, so this is the fallback the skill allows |
| Closed | `status: closed` plus a `## Resolution` section in the body |
| Frontier | `status: open`, `assignee:` empty, and every id in `blockedBy` closed |

Refer to a map or ticket by its **title**, never its id.

## Frontier query

```bash
.scratch/wayfinder/frontier.sh
```
