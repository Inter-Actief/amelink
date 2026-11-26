# TODO

Working notes for the UI pass. Written to be picked up cold — read this first.

## Where we are

Branch `128-make-mobile-padding-smaller`, ~16 commits ahead of `origin/main`.

**PR #139 on this branch is already MERGED.** Everything below the merge point
(homepage rework, the new header, the card redesign) is *not* on `main` and
needs a **new PR against `main`**. Do not just keep pushing to this branch and
expect the old PR to pick it up.

The commits since `960ea08` (already on this branch, in order):

| commit | what |
| --- | --- |
| `960ea08` | rework the homepage and the mobile menu around the sections |
| `59354ff` | one sticky header deck instead of three rows |
| `9b5f0ff` | dev-only `/design` sketch pad (deleted again, see below) |
| `7ba0488` | square cards, one section bar |
| `3810a1b` | docs refresh |
| `081a4bb` | one card for every overview, framed detail pages |
| `f6f616b` | drop section ordinals + the dead card components |
| `3d2311b` | activity cards show the activity icon or the shared placeholder |
| `8fbc6ca` | rounded tiles, type pill, compact on phones |
| `dcbbd10` | compact rows with the date above the title |
| `c6a1912` | type pill on the date line, smaller and right aligned |
| `040f46b` / `020bd23` | picture box: square, then full card height at max 1/3 |

## Decisions (locked — do not re-litigate without asking)

**Header** — one 64px sticky deck (`h-[64px]`, not `h-16`: at the 9.6px root
`h-16` is 38px). Full inline nav >= 1280px, hamburger + drawer below, two-row
phone layout, `HeaderSettings` popover for language + theme.

**Section bar** — `SectionCard` is the only implementation: blue bar, title
from the `name` prop, `#info` slot for a link/filter, `#content` for the body.
No ordinals anywhere. A page with an "old header" is a page that never used
`SectionCard`; move it onto the component rather than restyling `h1`.

**Card** — `TileCard` is the only card. Nothing should hand-build card markup.
Its final shape:

- 4px radius, no shadows, no motion; hover = border colour + title underline
- layout follows the width the card is *given*, not the viewport (container
  query at 320px): stacked photo on top in a five-across grid, compact row
  (photo right) in two/three-across grids and on phones
- date is a quiet uppercase line above the title, not a block on the photo
- activity type is a small hairline pill, right-aligned on the date line,
  coloured and labelled from the backend; no label from the backend = no pill
- the picture runs the full height of the card with the width capped at 1/3
- "Read more" is a plain `class="link"` (site-wide sliding underline), inside
  the text column, never a nested anchor/button — the whole card is the link

**Corners** — square for cards is *not* the rule any more: cards are 4px, the
section bars and page chrome stay square. `main.css` still has
`.p-card { border-radius: 0 }`; `TileCard` overrides it locally.

## Next

1. **Open the new PR** against `main` for the 16 commits (homepage rework +
   header + cards + docs). Fill in the body properly this time.
2. Answer the remaining review threads in #139 if any are still open (the
   first batch of seven replies went out without the `[!NOTE]` attribution
   block — see the attribution convention in `.agents/skills/amelink/SKILL.md`).
3. Homepage still mixes three card idioms: `UpcomingActivitiesCards` and
   `HomepageNews` use `TileCard`, while the `HomepagePublications` /
   `HomepageVideo` sidebar uses `.side-row` hairlines. That is deliberate
   (the sidebar is a list, not cards) — either keep it and say so, or unify.
4. `CompaniesView` uses `TileCard` with `aspect="logo"` (contained logo in a
   padded well). Logos are much smaller than the old design; decide whether
   that is acceptable or the well needs to grow.
5. Remaining bare `h1` pages: `CommitteesView` (page title above seven
   category bars — decide if it becomes a bar), `SearchView`,
   `PhotosActivities`, `404`.
6. `EducationView` is on the section bars but its body is server-side markdown;
   check it still reads well at 390px.
7. Missing `nl` translations for a few menu labels ("Association",
   "For members"). Note `.po` files are gitignored — only the compiled
   `src/language/translations.json` is committed, and `gettext:compile` skips
   fuzzy entries.
8. Sweep 1920 / 1280 / 1024 / 390 in en + nl with a hover pass before the PR.

## Backlog / needs someone else

- **Image sizes**: the media host has no resize route, so 5-10MB cover uploads
  are shipped as-is (`/publications` first view was ~51MB). Needs backend or
  CDN work. Frontend lazy-loading is already done on the perf branch.
- **Perf branch** `perf-measurement-and-footer-shift`, 6 commits off
  `origin/main`, unpushed: verified load-perf harness (`tools/perf`), footer
  shift/CLS fix, lazy images + skeletons, bundle split + paint shell. Merge
  order matters — it touches `App.vue`, the router and every overview view, so
  land this branch first or expect conflicts.
- `yarn lint` is broken: a stale `eslint.config.js` shadows `eslint.config.ts`
  and ESLint 9 loads the `.js` first. Moving it aside surfaces ~108
  pre-existing errors, and `yarn lint` runs with `--fix`.
- `ImageFade.vue` and `ActivitiesSliderCard.vue` are dead (only referenced by
  generated gql / the queries registry).

## Gotchas

- Scoped SFC CSS is **unlayered**, so it beats Tailwind utilities including
  `hidden`. Never let scoped CSS own `display` on an element Tailwind toggles.
- `fonts.css` is unlayered too: overriding a heading needs the `!` modifier
  (`text-card-title!`).
- At the 9.6px root, `text-*` and `h-*` utilities are much smaller than they
  look (`h-16` = 38px, `text-4xl` = 21.6px). Breakpoints are normal (16px rem),
  so `md` = 768px. Sizes: `--text-page-title` 2.6rem, `--text-section` 2.25rem,
  `--text-card-title` 1.9rem, `--text-body` 1.6rem, `--text-meta` 1.4rem.
- Never compose Tailwind class names from props (`aspect-[${x}]` is never
  emitted); use a literal map.
- `v-if` on a `<template #footer>` is fine; the earlier "slot bug" was Vue
  Boolean casting — a prop typed `string | false` resolves an absent value to
  `false`. Use a separate boolean.
- Components are auto-imported (`components.d.ts`), so a stale import never
  fails `type-check`. Grep by hand after swapping components in markup.
- `yarn type-check` cannot see CSS; `yarn build-only` passes even with type
  errors. Verify UI in a browser, not with the compiler.
- After switching branches: `yarn codegen` (`src/gql` is gitignored). Codegen
  needs network to the staging GraphQL endpoint.
- Dev server must bind 5173/5174 — the staging backend has an origin allowlist.
- Kill servers by explicit PID, never `pkill` (it matches your own command).

## Commands

```bash
yarn dev                  # must live on 5173/5174
yarn codegen              # after any queries.gql change
yarn type-check && yarn build-only
yarn gettext:extract && yarn gettext:compile   # then check translations.json
```

Screenshots: `agent-browser set viewport 1920 1080`, open the page, then
`screenshot --full`. The 64px sticky header hides the top of a section, so
scroll to `top - 74` and crop from y=74. Full-page shots above ~5MB are too
big to read — use viewport shots or crop.

Design exploration: use the `design-variants` skill rather than a new
composable/theme switcher. The `/design` pad this branch used was deleted
(design is settled); recreate it from the skill's template if more variants
are needed.
