# Activity card — date/label typography pad (handoff)

Throwaway design work, not shipped UI. Delete this file with the pad once a
direction is picked.

## The question

The activity card (`src/components/ui/TileCard.vue`, used by
`UpcomingActivitiesCards.vue`) reads like a template. The user asked, in order:
make the card less AI-like → it concerns each card on its own → **keep the card
structure about the same, reconsider the fonts of the date and of the activity
label**. So only the two small strings at the top of a card are in scope:

- date: `text-[1.2rem] font-medium uppercase tracking-[0.1em] tabular-nums` → "29 NOV 2026"
- label: `text-[0.95rem] font-bold uppercase tracking-[0.12em]`, coloured → "SOCIAL"

Two wide-tracked cap strings in a row is the loudest template tell in the card.

## What exists now

- `src/views/DesignView.vue` — the pad. Dev-only route `/design` registered in
  `src/router/index.ts` behind `import.meta.env.DEV`.
- Pad layout: option 0 = the real `<TileCard>`; options A–D = the **shipping card
  geometry** (photo plate right at 1/3, date row, title, 2-line teaser) with only
  the date/label typography swapped; then a detail pass with two large cards per
  option. Real content from staging (6 upcoming activities, real type colours,
  one activity with a real icon, five placeholders).
- Screenshots (temp, not in the repo): `/tmp/pad/dark-0*.png`,
  `/tmp/pad/light-0*.png`, `/tmp/pad/compare.png` (A–D stacked, dark),
  `/tmp/pad/type-sheet-4x.png` (the date/label rows at 4×).

## Options on the pad

| | name | delta |
|---|---|---|
| A | Plain sentence case | caps + tracking gone; label grey with a 6px type-coloured dot |
| B | Day weighted | day `1.7rem/700`, "Dec 2026" grey, label plain grey |
| C | Colour kept | label keeps its colour, `600` at 13.4px, sentence case; date grey |
| D | Real small caps | `font-variant-caps: all-small-caps` + `text-transform: lowercase`, no tracking, label in the colour |

All four also raise both strings to ~13.4px (from 11.5px / 9.5px) and show the
start time (`29 Nov 2026 13:00`) — the time is in the API and the card never
shows it. Ask before keeping that; it is a content change, not typography.

## Findings that matter for the real component

1. **` :global(.dark)` rules in a scoped `<style>` block are silently dropped by
   this build.** Verified in the running app: `TileCard.vue`'s
   `:global(.dark) .type-label` never reaches the stylesheet, so the label keeps
   its raw colour on dark cards and the dark `--type` values (e.g. General
   `#372652`) are almost invisible. Fix by mixing towards the theme instead of a
   `.dark` selector:
   `color: color-mix(in srgb, var(--type) 62%, var(--p-text-color));`
2. **`all-small-caps` alone is wrong for a title-case string**: it sets a
   full-height `D` next to small `e c`. Lower-case the text first.
3. The pad's dev server ran on **port 5174** (5173 was taken). Screenshots were
   taken from a throwaway Chromium with `--remote-debugging-port=9222` and a
   temp profile (`/tmp/pad-chrome`), not from the user's Chrome.

## Next step

Wait for the user's letter (A–D). Then re-set the date/label in `TileCard.vue`
(the `kicker`/`label`/`date` block in `#content`), verify in the real home page
at desktop and mobile widths in both themes and both locales, delete
`src/views/DesignView.vue`, its route, and this file.
