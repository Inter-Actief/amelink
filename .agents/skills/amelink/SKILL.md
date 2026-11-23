---
name: amelink
description: >-
  Work on the Amelink Vue 3 frontend for the Inter-Actief student association.
  Use this skill when modifying UI components, adding GraphQL queries, changing
  routing, styling with Tailwind/PrimeVue, or adjusting i18n/auth. It provides
  the conventions, file patterns, and gotchas specific to this codebase.
license: MIT
metadata:
  author: Pi agent
  primary-interface: edit, write, read, bash tools
---

# Amelink Codebase Guide

Amelink is a Vue 3 + TypeScript SPA that renders content from a GraphQL API
(Amelie) for Inter-Actief, a study association at the University of Twente.

## Quick Orientation

| Layer | Tech | Key Files |
|-------|------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) | `src/main.ts`, `src/App.vue` |
| Build | Vite 6 | `vite.config.ts` |
| Styles | Tailwind CSS v4 + PrimeVue 4 (`iaPreset`) | `src/styles/themePreset.ts`, `src/styles/style.css` |
| Data | Apollo Client 3 + GraphQL Codegen | `src/apollo.ts`, `src/queries/queries.gql`, `src/gql/` |
| State | Pinia (4 stores) | `src/stores/` |
| Auth | OpenID Connect (`oidc-client-ts`, PKCE) | `src/stores/oidcStore.ts` |
| i18n | Gettext (`vue3-gettext`) | `src/language/*.po`, `src/gettext.ts` |
| Icons | Lucide Vue | `@lucide/vue` |

## First-Time Setup

1. Make sure Yarn and Node.js are installed.
2. Clone the repository and `cd` into it.
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Generate GraphQL types:
   ```bash
   yarn codegen
   ```
5. Start the dev server:
   ```bash
   yarn dev
   ```
6. Optionally create a `.env.local` file to override variables in `.env` /
   `.env.development`.

## Before You Edit

1. **Generate types**: If you add or change GraphQL operations, run:
   ```bash
   yarn codegen
   ```
   This updates `src/gql/` from `src/queries/queries.gql`.
   > If you get TLS/certificate errors against a self-signed GraphQL server,
   > run: `NODE_TLS_REJECT_UNAUTHORIZED=0 yarn codegen` as a one-off workaround.

2. **Regenerate translations** (if adding new `$gettext(...)` strings):
   ```bash
   yarn gettext:extract && yarn gettext:compile
   ```
   > **Important**: Before pushing a PR that introduces new `$gettext(...)`
   > strings, always run `yarn gettext:extract`. Otherwise those strings won't
   > be picked up for translation (via Weblate). Missing extraction is a
   > common cause of untranslatable UI text.

3. **Type-check**: The project uses `vue-tsc` strictly.
   ```bash
   yarn type-check
   ```

## GraphQL Patterns

**Never** write raw `useQuery` from `@vue/apollo-composable`. Always use the
registry composables in `src/composables/queries.ts`:

```ts
// ✅ Correct
import { useQuery, useQueryAsync, useMutation } from '@/composables/queries'
const { result, loading, refetch } = useQuery('latestNews', { limit: 3 })

// ❌ Wrong
import { useQuery } from '@vue/apollo-composable'
```

Steps for adding a new query:
1. Add the operation to `src/queries/queries.gql`.
2. Run `yarn codegen`.
3. Import the generated document in `src/composables/queries.ts` and register
   it in the `queries` constant.
4. Use via `useQuery('yourKey', { ... })`.

The `queries.ts` file also exports `useQueryAsync` for imperative fetching
(outside `<script setup>` lifecycle) and `useMutation`.

### Pagination

Queries that paginate should expose `limit` and `offset` variables and match
the GraphQL field names in the schema:

```graphql
query PastActivities($limit: Int, $offset: Int) {
  activities(limit: $limit, offset: $offset) {
    ...
```

In the component, keep the `perpage` count in a ref and pass the `query`
object straight into the `<Pagination>` component via `v-bind`:

```ts
const perpage = ref(10)
const query = useQuery('pastActivities', { limit: perpage.value })
const queryResults = computed(() => result.value?.activities)
```

```vue
<Pagination v-if="totalCount" v-bind="query" :totalCount="totalCount!"
  :limit="perpage" />
```

### Async Queries

`useQueryAsync` is useful when you want data **before** rendering the page
instead of showing a loading skeleton. It wraps Apollo in a `Promise` and
must be awaited:

```ts
import { useQueryAsync } from '@/composables/queries'

const query = await useQueryAsync('overviewNews', { limit: 25 })
const queryResults = query.result
```

Unlike the reactive `useQuery`, which returns `{ result, loading, refetch }`,
`queryAsync` resolves once the first network response arrives. Use it when the
component should not mount without data, or when you want to skip skeleton UI.
Wrap the whole `<script setup>` in a parent `<Suspense>` boundary when using
`await` at the top level.

## Apollo Client Architecture (`src/apollo.ts`)

Link chain (order matters):
```
loadingLink → authLink → errorLink → httpLink
```
- `loadingLink`: increments a counter in `loadingStore` for the global progress bar.
- `authLink`: injects `authorization: JWT <id_token>` from the OIDC store.
- `errorLink`: shows toast errors via `showError()` and decrements loading state.

**Warning**: `activeRequests` is a module-level variable, not a store ref. If a
request is dropped without reaching the `map()` callback, the loading counter
can drift. `router.afterEach()` has a 3-second safety reset.

## Component Conventions

- **Views** (`src/views/...`) are route-level pages. Some are lazy-loaded in
  `src/router/index.ts`.
- **Components** (`src/components/...`) are grouped by domain
  (`activities/`, `news/`, `ui/`, `placeholder/`).
- **UI primitives**: `Content.vue` (section wrapper), `SectionCard.vue` (named
  PrimeVue card with header), `TextCard.vue` (image + title + subtitle card),
  `EpaButton.vue` (legacy button — prefer PrimeVue `Button` for new work).
- **Loading states**: Each view/component that fetches data has a skeleton
  placeholder matching its layout (e.g., `PlaceholderText`, `CompanyPlaceholder`).
- **Images**: Always use `imageSrc()` from `src/composables/util.ts`. It
  prefixes media paths with `VITE_AMELIE_MEDIA_URL` and falls back to a local
  placeholder.
- **Image error handling**: Use the `v-image-error` directive on `<img>` tags.
  It swaps broken images to the placeholder automatically.

## Styling Rules

- **Tailwind CSS v4** is primary. Global utilities and custom variants are in
  `src/styles/style.css`.
- **PrimeVue** components are themed via the custom preset `iaPreset` in
  `src/styles/themePreset.ts`. It extends the Lara preset with Inter-Actief
  colors (primary `#1d428a`, emphasize `#43c7ff`).
- PrimeVue uses CSS layer ordering so Tailwind can override it:
  `theme, base, primevue, components, utilities`.
- Dark mode toggles the `.dark` class on `<html>`. Use `@custom-variant dark`
  in Tailwind.
- **Avoid** adding styles to `src/styles/style_old.scss` — it is legacy.

### Type Scale: use the tokens, not Tailwind's `text-*`

`html` is set to `60%`, so `1rem = 9.6px` and Tailwind's default scale is
*smaller than the body text*: `text-sm` 8.4px, `text-lg` 10.8px, `text-xl`
12px, `text-2xl` 14.4px, `text-4xl` 21.6px. So `text-2xl` for a section header
ends up *smaller* than body copy, and `text-4xl` only reaches 21.6px. Use the
semantic tokens instead (defined in the `@theme` block of
`src/styles/style.css`):

| Utility | Token | Size | Use for |
|---------|-------|------|---------|
| `text-page-title` | `--text-page-title` | 25px | page `h1` |
| `text-section` | `--text-section` | 21.6px | `SectionCard` headers, education headings |
| `text-card-title` | `--text-card-title` | 18.2px | card / video / publication / activity titles |
| `text-body` | `--text-body` | 15.4px | running text |
| `text-meta` | `--text-meta` | 13.4px | dates, subtitles, captions, footer |

`src/styles/fonts.css` maps `h1`–`h4` onto the same tokens. That file is
**unlayered**, so its heading rules beat every Tailwind utility (layered) — to
override a heading's size with a utility you need the important modifier
(`text-card-title!`), which is why card titles in views carry the `!`.

### Link underline: one implementation, opt in with `.link`

| Selector | Where | Mechanism |
|----------|-------|-----------|
| `.link` | `src/styles/main.css` (`@layer components`) | `::after` bar, `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, 300ms |
| `.link:hover::after` | same | `transform: scaleX(1)` — slides in from the left |
| `.text a` | `src/styles/fonts.css` | `background-size: 0% → 100%` gradient; inline links must wrap per line |
| `.text-card:hover .readmore::after`, `.horizontal-card:hover .readmore::after`, `.expand-link::after` | component `<style scoped>` | drive the same `scaleX(1)` when the *card* is hovered |

Every clickable text row opts in with `class="link"` (33 call sites: plain
`RouterLink`s, `link flex flex-row` rows, `EpaButton` with `class="link"`,
card title rows, bare `span`s).

**Never redeclare `background`, `background-size`, or `text-decoration` on a
`.link` element inside a component's `<style scoped>`.** Scoped selectors
outrank the global class and a `background` shorthand resets the whole effect.

- `.link` must **not** be implemented as a `background` gradient — that is how
  it originally worked and it silently died under `EpaButton`'s scoped
  `background: linear-gradient(...)`. `Read more` stopped animating while
  plain `RouterLink`s kept working, which looked like "the hover is broken in
  some places".
- `.link` must **not** be a `text-decoration` colour transition either — that
  fades, it does not slide, and it is a different effect from the one designed.

## Verifying UI Changes

`yarn type-check` passes while the UI is visibly broken — it cannot see CSS,
class strings, or the rendered result. A UI change is unverified until it has
been inspected in a real browser.

This checklist exists because a link-hover fix was reported as verified (with
`type-check` passing) and was wrong in two different ways before it was right.

### Checklist

1. **Reproduce on the revision the report is about.** Check out the branch or
   commit the reviewer/user is looking at. "Works on my HEAD" is not a
   reproduction — that mistake made a real bug look unreproducible.
2. **Recover the intended behaviour before changing the mechanism.**
   `git show <rev>:src/styles/main.css` shows what the effect actually was. If
   the mechanism changes the visual behaviour (slide → fade), say so
   explicitly; never substitute an effect silently.
3. **Enumerate call sites, test each distinct signature.** `grep -rn 'link'`
   finds them; group by element type and hover one of *each*, not one total.
   Test the ones built on `EpaButton` separately from plain `RouterLink`s —
   that split is what hid the bug.
4. **Assert the design property, not a style delta.** "Something changed on
   hover" is satisfied by the wrong animation. Assert the end state:
   `getComputedStyle(el, '::after').transform === 'matrix(1, 0, 0, 1, 0, 0)'`,
   or `background-size: 100% 1.92px` for prose links. Mid-transition samples
   (0.04 → 0.47 → 0.80 → 1.0) prove it slides rather than fades.
5. **Check the states around the happy path** — mobile viewport, loading
   skeleton, empty result, dark theme.
6. **Report coverage, not vibes.** "Verified 3 of 5 link types at 1920 and 390"
   invites the right kind of doubt; "verified in the browser" does not.

### Browser recipe (agent-browser)

```bash
agent-browser open http://localhost:5174/committees
agent-browser tab new http://localhost:5174/committees   # eval only works on a real tab
agent-browser set viewport 1920 1080                     # per tab; a new tab resets it
agent-browser mouse move 332 248                         # real hover, bare numbers only
agent-browser eval --stdin < probe.js
agent-browser screenshot --full /tmp/after.png            # `--full`, not `--full-page`
```

```js
// probe.js — node identity is stable within one eval batch only
(() => {
    const el = [...document.querySelectorAll('.link')][0]
    el.scrollIntoView({ block: 'center' })
    const after = getComputedStyle(el, '::after')
    return {
        hovered: el.matches(':hover'),
        after: after.content === 'none' ? 'none' : after.transform,
        bg: getComputedStyle(el).backgroundSize,
    }
})()
```

Gotchas that cost time:

- `eval` / `get` execute in a detached `about:blank` context until a real tab
  exists (`tab new <url>`); otherwise DOM queries return 16px-root `about:blank`.
- `hover "text=..."` frequently misses elements; `mouse move <x> <y>` with
  coordinates from `getBoundingClientRect()` works.
- Feeding `x: 332` instead of `332` makes the CLI reject the command.
- Full-page screenshots above ~5 MiB are not attached for inspection; use a
  viewport screenshot or crop with PIL (`Image.crop(...).resize(..., LANCZOS)`)
  before reading the image.
- Screenshot latency usually exceeds a 300ms transition, so read computed style
  to prove animation, and `requestAnimationFrame` sampling to prove it slides.

### What tooling can and cannot catch (as of this branch)

| Command | Status | Covers |
|---------|--------|--------|
| `yarn type-check` | works (~4s) | TypeScript only — **no CSS, no class names, no rendering** |
| `yarn lint` | **broken** | a stale `eslint.config.js` shadows `eslint.config.ts` and crashes on load (`Named export 'rules' not found` from CJS `eslint-plugin-vue`); deleting the `.js` makes ESLint load the TS config but surfaces ~108 pre-existing errors. It also runs with `--fix` and rewrites files *before* failing |
| `yarn test:unit` | configured, no tests | Vitest + jsdom: no layout, no hover, cannot cover this class of bug |

Until a browser test exists (Playwright is not installed), manual verification is
the only gate for interactive styling. Do not describe a UI change as verified
on the strength of `type-check`.

## Routing

- History mode router (`createWebHistory`).
- Dynamic routes use `props: true` to pass URL params as component props.
- Auth routes (`/auth/callback`, `/auth/state`) are special — do not add guards
  or loading logic to `/auth/callback` or OIDC state will break.
- Optional environment variable `VITE_REDIRECT_LOGGEDIN` causes authenticated
  users to be redirected to the legacy frontend.

## Auth (OIDC)

- Store: `src/stores/oidcStore.ts` using `oidc-client-ts` with PKCE.
- The app waits for `oidcStore.initializeAuth()` before mounting (`main.ts`).
- `UserManager` events (`userLoaded`, `userUnloaded`, `accessTokenExpired`)
  keep the reactive `user` ref in sync.
- Log in/out: `oidcStore.login()` / `oidcStore.logout()`.

## i18n (Translations)

- Keys are **English source strings**, not IDs:
  ```vue
  <script setup lang="ts">
  import { useGettext } from 'vue3-gettext'
  const { $gettext } = useGettext();
  </script>
  <template>
    <h2>{{ $gettext('Past activities') }}</h2>
  </template>
  ```
- The language switcher (`src/components/ui/LanguageSwitcher.vue`) calls a
  GraphQL mutation (`setLanguage`) and then refetches all active Apollo queries.
- Available languages: `en`, `nl`.
- Translation pipeline: `.vue`/`.ts` → `yarn gettext:extract` → `.po` files
  (translated by humans) → `yarn gettext:compile` → `src/language/translations.json`.

## Environment Variables

All runtime env vars **must** be prefixed with `VITE_` to be visible in the
browser. The build uses `vite-plugin-env-runtime` to emit `config.js` for
runtime access without rebuild.

Key variables:
- `VITE_AMELIE_GRAPHQL_API` — GraphQL endpoint
- `VITE_AMELIE_MEDIA_URL` — CDN/media prefix for images
- `VITE_OIDC_CLIENT`, `VITE_OIDC_URL`, `VITE_OIDC_SCOPE` — OIDC config
- `VITE_OLD_FRONTEND_URL` — Link to legacy site
- `VITE_REDIRECT_LOGGEDIN` — Optional: redirect authed users to legacy site
- `VITE_DEFAULT_LANGUAGE` — Default i18n locale
- `VITE_SENTRY_DSN` / `VITE_SENTRY_ENVIRONMENT` — Error monitoring

## Branches & CI

- **Default branch**: `main` (development).
- **Production branch**: `production` — **protected**. Do not push directly to
  it. The Docker image is built on every push and PR. The build argument
  `BUILD_OBFUSCATE=true` is set **only** when `github.ref_name == 'production'`.
- **Container registry**: `ghcr.io/inter-actief/amelink`.
- The `build-docker.yml` workflow also runs `yarn` build steps inside the
  Dockerfile, so a failing build on PR will block merge.

## Common Gotchas

1. **GraphQL types and codegen**: `src/gql/` is fully generated. Never hand-edit
   files in that directory.
2. **Date formatting**: Use `formattedData()` or `formattedTime()` from
   `src/functions/functions.ts`. They handle the `nl`/`en` locale switch
   manually (not via `Intl.DateTimeFormat`).
3. **Markdown rendering**: Rich text fields from the API are Markdown. Use
   `markedText()` from `src/functions/functions.ts`; it runs `marked()` +
   `sanitize-html`. It is **async** because `marked` v15 returns a Promise.
4. **Sentry release**: Hardcoded to `'0.0.1'` in `src/main.ts`. Update if you
   change versioning.
5. **No unit tests exist yet** (`find src -name "*.spec.ts"` returns nothing).
   The test runner is Vitest + jsdom.
6. **Build splits**: `vite.config.ts` has extensive `manualChunks` config. If
   you add a large new dependency, consider adding it to the chunking strategy.
7. **CKEditor**: Bundled as a single chunk (`ckeditor`). If you touch editor
   config, verify the build chunk does not bloat.

## File Map for Quick Reference

```
src/
├── apollo.ts              # Apollo client, links, auth
├── main.ts                # App bootstrap, Sentry, error handler
├── App.vue                # Root layout, progress bar, Suspense
├── router/index.ts        # All routes
├── composables/
│   ├── queries.ts         # Typed query/mutation registry (USE THIS)
│   └── util.ts            # imageSrc(), etc.
├── stores/
│   ├── oidcStore.ts       # OIDC auth
│   ├── languageStore.ts   # i18n + GraphQL language mutation
│   ├── themeStore.ts      # light/dark/system toggle
│   └── loadingStore.ts    # Global loading counter
├── functions/functions.ts # Date format, markdown render, helpers
├── constants/
│   └── pageCategories.ts  # mainMenu (Header + breadcrumb logic)
├── components/ui/         # Reusable primitives (Content, SectionCard, ...)
├── components/placeholder/# Skeleton loaders
├── views/                 # Route pages
└── queries/queries.gql    # Source GraphQL operations
```

---

## Code Style

The repo uses **Prettier** + **ESLint** with the following conventions:

| Tool | Config | Notes |
|------|--------|-------|
| Prettier | `.prettierrc.json` | `semi: false`, `singleQuote: true`, `printWidth: 100` |
| ESLint | `eslint.config.ts` | Vue flat/essential, vue-ts recommended, vitest for `__tests__` |

Run before committing:
```bash
yarn format
# yarn lint is currently broken, see below
```

> **`yarn lint` crashes on config load.** `eslint.config.js` (a stale scaffold
> leftover) shadows `eslint.config.ts` and imports a named export from the CJS
> `eslint-plugin-vue` (`Named export 'rules' not found`). Deleting the `.js`
> makes ESLint load the TS config, but that surfaces ~108 pre-existing errors,
> so restoring lint is a separate cleanup. Note it runs with `--fix`: it
> rewrites files *before* it fails.

ESLint intentionally disables these rules:
- `no-unused-vars` / `@typescript-eslint/no-unused-vars` — off
- `@typescript-eslint/no-explicit-any` — off

## Filing Pull Requests

The repository has a **PR template** at `.github/PULL_REQUEST_TEMPLATE.md`.
Every PR description must answer the following checklist:

- **What the PR fixes** — short description of the bug or feature.
- **Issue references** — `Fixes/References Inter-Actief/amelink#<id>`.
- **Privacy / data exports impact** — yes/no.
- **Package updates** — yes/no.
- **Translation support** — "yes, I wrapped new strings in `$gettext`" / no.
- **Routing changes** — yes/no.
- **Environment variable changes** — yes/no (and update `.env.d.ts` types if yes).
- **Testing** — yes/no.

### PR Titles

Titles become commit messages. The repo does **not** use strict conventional
commits. Prefer descriptive sentence-case titles that state what changed:

- **Bad**: `fix: adjust padding in Header.vue`
- **Good**: `Fix mobile header padding and route guards`

### Descriptions

Open with the **problem**, not an implementation inventory. End the
description with attribution, for example `Created with <model> in pi.`
Include subagent models if they wrote part of the change.

### Opening the PR

Create a branch, push it, and open a pull request against `main`:

```bash
git checkout -b <topic-branch>
git add ...
git commit

git push -u origin <topic-branch>
```

Before submission:
- Check the title and description against the checklist above.
- Inspect the diff for secrets, `.env.local` files, or private details.
- Verify `yarn type-check` and `yarn lint` pass.
- Rebase onto latest `main` if the branch is stale.

### Attribution

If you leave comments on PRs on behalf of the user, prefix them with:

```md
> [!NOTE]
> 🤖 **<model> responding on behalf of <user>**

Actual comment starts here.
```

Use the verified public model name and the user's name or GitHub login. Do
not add horizontal rules, Setext underlines, headings, or signatures. Lead
with the conclusion, cite relevant code or checks, and keep it concise.

---

## Updating Stale Branches

When asked to rebase or update an old branch, do not rebase blindly. Decide
whether the PR still belongs in the product.

### Disposition

| Verdict | When to use |
|---------|-------------|
| **MODERNIZE** | The goal is still useful and the implementation shape is still right. Rebase, resolve conflicts, test, update. |
| **REWORK** | The goal is still useful, but a mechanical rebase would preserve the wrong implementation. Explain the smallest credible rewrite. Stop before pushing unless the user also asked for rework. |
| **CLOSE** | The PR is superseded, obsolete, directionally wrong, or no longer worth its cost. Cite concrete evidence. Do not rebase an obsolete branch. |

### Steps for MODERNIZE

1. `git fetch origin` (base branch and PR branch).
2. Record the PR head SHA.
3. Rebase the PR's commits onto the freshly fetched base branch.
4. Resolve each conflict according to the PR's **current intent** and the base
   branch's newer invariants. If a conflict reveals an architecture
   disagreement, stop and reconsider the disposition.
5. Compare pre/post rebase with `git range-diff` and inspect the final diff.
   Confirm no intentional behavior disappeared and no already-landed behavior
   was reintroduced.
6. Run focused checks for the touched area (`yarn type-check`, build, etc.).
7. Push with `--force-with-lease` tied to the previously observed remote head.
   If the lease fails, fetch and reassess rather than overwriting new work.

### What changed around it?

Before deciding, inspect commits added to the base branch since the PR
 diverged. Ask:
- Has the same problem already been solved?
- Did APIs, types, schemas, or architectural boundaries change?
- Would landing this restore old behavior or create two ways to do the same thing?
- Is the original benefit still large enough to justify the maintenance cost?

Age alone is not a reason to keep a PR alive. Sunk effort is not a reason to
keep a PR alive.
