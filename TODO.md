# TODO

Working notes for the current UI pass. Nothing gets pushed without asking.

## Where we are

Branch `128-make-mobile-padding-smaller`, three new local commits on top of
`960ea08`:

- `59354ff` one sticky header deck instead of three rows
- `9b5f0ff` dev-only `/design` sketch pad
- `7ba0488` square cards with the date on the image, and one section bar

## Decisions (locked)

- **Navbar**: single 64px sticky deck. Full menu >= 1280px, drawer below,
  two-row phone layout, settings popover for language + theme.
- **Section header**: dark square with an ordinal, then the title, then the
  info link. Numbers are opt-in (`SectionCard::index`) and only the homepage
  uses them (01-04), because only it is a sequence.
- **Card**: `TileCard`, the overlay-date tile. Square corners, no shadows, no
  animation, hover is a border colour change plus a title underline.
- Square corners are enforced once in `main.css` (`.p-card { border-radius: 0 }`).

## Approach rules that came out of this

- The bar lives in exactly one component (`SectionCard`). A page that "still
  has the old header" is a page that never used it - move the page onto the
  component, do not add a second header component and do not restyle `h1` in
  CSS.
- Only extract `SectionBar.vue` out of `SectionCard` if a page needs the bar
  *without* a card body (article / detail pages). Those currently keep their
  plain `h1`, which is correct: a headline is not a section.
- Cards are components too. `TileCard` is the tiled overview card;
  `TextCard` / `HorizontalCard` stay for text-led lists.

## Next

1. Remaining bare `h1` collection headings: `CommitteesView` (page title over
   the category bars - decide whether it stays a page title or becomes a bar),
   `PhotosActivities`, `SearchView`.
2. Decide whether homepage activity rows become tiles (they are
   `HorizontalCard` rows today; the activity *overview* is text cards).
3. Companies overview still shows logos in a padded box - either give
   `TileCard` a logo mode or leave it as the odd one out on purpose.
4. Sweep 1920 / 1280 / 1024 / 390 in en + nl with a hover pass, then
   type-check + build + screenshots, and commit in stages.
5. Delete `/design` and its route (and this file) when the card work is done.

## Backlog

- PR #139 body still the empty template, and the first batch of seven review
  replies went out without the `[!NOTE]` attribution block.
- Homepage + mobile menu rework (`960ea08`) still needs its own PR.
- Perf branch `perf-measurement-and-footer-shift`: six commits off `origin/main`
  (harness, footer shift fix, lazy images + skeletons, bundle split + paint
  shell). Not pushed.
- `nl` translations missing for a few menu labels ("Association", "For members").
- `yarn lint` is broken by a stale `eslint.config.js` shadowing the `.ts` one.
- Images: the media host has no resize route, so 5-10MB cover uploads are
  shipped as-is. Needs backend / CDN work, not more frontend.

## Gotchas / commands

- `yarn type-check` cannot see CSS. `yarn build-only` succeeds even when types
  break.
- After switching branches: `yarn codegen` (src/gql is gitignored).
- Kill servers by explicit PID, never `pkill` (it matches your own command).
- Scoped SFC CSS is unlayered and beats Tailwind utilities, including `hidden`.
- At the 9.6px root, `text-*` and `h-*` utilities are far smaller than they
  look: `h-16` is 38px, `text-4xl` is 21.6px.
- Screenshots: `agent-browser set viewport 1920 1080`, open, then
  `screenshot --full`. The 64px sticky header hides a section top, so scroll
  to `top - 74` and crop from y=74.
