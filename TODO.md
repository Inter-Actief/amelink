# TODO

Working notes for the UI/design branch. Keep this current; it is the hand-over.

## Where we are

- Branch `128-make-mobile-padding-smaller`, tip `960ea08` (pushed). PR **#139** is open on it.
- Uncommitted right now:
  - `src/components/header/Header.vue` — rewritten to a single 64 px sticky deck (**NAV A**)
  - `src/components/header/HeaderSettings.vue` — new, language + theme behind one button
  - `src/views/DesignPreviewView.vue` + one router line — dev-only `/design` page with all variants
  - `components.d.ts` — generated churn, commit it
- Nothing may be pushed without asking.

## Decisions (locked)

- **NAV A** — one compact sticky deck, 64 px instead of 129 px. Full menu at ≥1280 px,
  drawer (hamburger in the bar) between 768–1280, existing two-row layout on phones.
  Language + theme moved behind a single settings button so the ten labels fit.
- **HEAD B** — square numbered blue bar (`01 | Title ............ View all`).
  Section headers become this everywhere `SectionCard` is used.
- **Cards** — open. Direction: square corners, no shadows, no animation, more "old"
  (hairlines, small caps, ruled lines), not fussy.

## Next steps

1. Pick the card direction (see "Card candidates"), then apply it to:
   `TextCard`, `HorizontalCard`, the flat card markup in `PublicationView` / `VideosView` /
   `CompaniesView`, the homepage news/publications/video blocks, `OverviewNews`,
   `OverviewActivities`, `UpcomingActivitiesCards`, `LatestNews`, `LatestActivities`.
2. Convert `SectionCard` to HEAD B (numbered bar). Numbering source TBD per page.
3. Sweep every route at 1920 / 1280 / 1024 / 390, in **en and nl**
   (`localStorage.setItem('locale','nl')`), plus one hover pass over each `link` caller kind.
4. `yarn type-check`, `yarn build-only`, screenshots, then commit in stages
   (header / section card / cards per surface).
5. Delete `/design` when the rollout lands, or keep it behind `import.meta.env.DEV`.

## Card candidates (`/design`, sections D–G)

| | Direction | Notes |
|---|---|---|
| A | Editorial / print | no boxes, letterspaced kicker. Good but the least "old". |
| B | Sharp industrial | hairline box, blue edge slides in on hover → motion, user rejected that part. |
| C | Soft tiles | radius + shadow. Rejected as too modern. |
| **D** | **Broadsheet** | photo, 2 px rule, small-caps section + date row, underlined title on hover. No box at all. |
| **E** | **Bulletin** | 1 px square border, rule under photo, ruled footer with date + "read more". |
| **F** | **Register** | ruled list rows, thumb left, right-aligned date column. Densest; best for news/publications/videos. |
| **G** | **Ledger** | date in its own square outline (day/month), heavy top rule, hairline bottom. Most distinctive. |

Mixing is allowed and probably right: e.g. **F** for overview pages, **D** or **G** for the
homepage blocks that need presence.

## Open questions

- Card direction per surface (see above).
- Nav labels cap at 13 px so ten labels + actions fit 1344 px. Accept, widen the header
  column, or shorten labels?
- HEAD B numbering: continuous per page (01, 02, 03) or only where a page has several sections?

## Backlog (not started)

- PR #139: body is still the empty template; eight review replies exist but lack the
  attribution blockquote, and `reviewDecision` is still REVIEW_REQUIRED.
- Homepage/mobile-menu rework (`960ea08`) is **not** in `main` and needs its own PR.
- Perf work: 6 commits on `perf-measurement-and-footer-shift` (harness + baseline, footer CLS
  fix, lazy images + skeleton geometry, entry-bundle/critical-path work), local only, needs a PR
  once this UI branch settles.
- `nl.po` is missing translations for `Association` and `For members` (they render in English).
- The media host has no resize route, so multi-MB publication covers stay multi-MB until the
  backend grows image variants.
- `yarn lint` is dead: a stale `eslint.config.js` shadows `eslint.config.ts`; ~108 pre-existing
  errors behind it.

## Gotchas worth remembering

- Root font-size is 60 %, so `1rem = 9.6 px`. Use the semantic tokens
  (`text-page-title`, `text-section`, `text-card-title`, `text-body`, `text-meta`).
- Tailwind breakpoints still resolve against **16 px**, so `md` is 768 px, not 460 px.
- `fonts.css` is unlayered and beats Tailwind; headings need the `!` modifier.
- Scoped component CSS is unlayered too: never let it set `display` on an element that
  Tailwind shows/hides, or `hidden` silently stops working.
- One link implementation: `.link` (sliding `::after`) and `.text a` (background-size) in
  `main.css` / `fonts.css`. Do not redeclare either in a component.
- `src/gql` is gitignored — run `yarn codegen` after switching branches that change queries.

## Commands

```bash
yarn type-check          # TS only, cannot see CSS
yarn build-only          # also regenerates components.d.ts
yarn dev                 # :5173, must stay on 5173/5174 (staging CORS allowlist)
agent-browser open http://localhost:5173/design
```
