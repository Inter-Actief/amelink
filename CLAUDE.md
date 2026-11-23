# Amelink — Agent Context

## What is this?

Amelink is the modern Vue 3 frontend for **Inter-Actief**, a study association at the University of Twente. It is a single-page application that consumes a GraphQL backend called **Amelie** to display activities, news, committees, company partnerships, publications, education pages, videos, and user authentication.

## Tech Stack

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript 5.7** — strict, uses `vue-tsc` for type-checking
- **Vite 6** for building and dev server
- **Tailwind CSS v4** + **PrimeVue 4** with a custom Lara-based preset (`iaPreset`)
- **Apollo Client 3** for GraphQL, fully typed via GraphQL Codegen
- **Pinia** for state management
- **oidc-client-ts** for OpenID Connect (PKCE) authentication
- **vue3-gettext** for internationalization (English + Dutch)
- **Sentry** for error monitoring
- **Vitest + jsdom** for unit tests (currently no tests written)

## Key Architectural Decisions

### GraphQL is typed end-to-end

All GraphQL operations live in `src/queries/queries.gql`. Running `yarn codegen` generates `TypedDocumentNode`s into `src/gql/`. The composable `src/composables/queries.ts` maps string names to these documents.

**Always use the registry composable** — do not import `useQuery` directly from `@vue/apollo-composable`:

```ts
// Correct
import { useQuery } from '@/composables/queries'
const { result, loading, refetch } = useQuery('latestNews', { limit: 3 })
```

### Apollo Link Chain

`src/apollo.ts` configures the client with a chain of links:

```
loadingLink → authLink → errorLink → httpLink
```

- `loadingLink` drives a global progress bar via `loadingStore`.
- `authLink` injects the user's OIDC `id_token` as `authorization: JWT <token>`.
- `errorLink` shows toast messages and guards against loading-state leaks.

### App Mounting is Gated on Auth

In `src/main.ts`, the app **does not mount** until `oidcStore.initializeAuth()` resolves. This ensures the router and Apollo auth link have a valid (or null) user before any UI renders.

### Markdown from the API is Sanitized

Rich text fields returned by the API are Markdown. The helper `markedText()` in `src/functions/functions.ts` runs them through `marked` (v15, async) and `sanitize-html`. Processed HTML is typically bound with `v-html`.

### CSS Layers

PrimeVue is loaded in its own CSS layer (`primevue`) with this order:
```
theme, base, primevue, components, utilities
```
This allows Tailwind utilities to override PrimeVue component styles cleanly.

### Shared Style Primitives Have One Implementation

The animated link underline exists once, as `.link` in `src/styles/main.css`
(an `::after` bar sliding in from the left); Markdown links use `.text a` in
`fonts.css`. Never redeclare `background`, `background-size` or
`text-decoration` for either in a `<style scoped>` block — scoped selectors
outrank the global class and silently reset the effect.

Text sizes come from the semantic tokens in the `@theme` block of
`src/styles/style.css` (`text-page-title` 25px, `text-section` 21.6px,
`text-card-title` 18.2px, `text-body` 15.4px, `text-meta` 13.4px). `html` is at
`60%`, so Tailwind's own `text-*` scale lands below the body size and inverts
the hierarchy.

## Verifying UI Changes

`yarn type-check` cannot see CSS or the rendered result, so it is not evidence
that a UI change works. Reproduce on the reported revision, check one element
of every distinct call site of a shared class, assert the property you care
about (e.g. `::after` transform reaching `scaleX(1)`, not "something changed"),
and say what you covered. Probe recipes are in the amelink skill.

## Directory Guide

| Path | Purpose |
|------|---------|
| `src/apollo.ts` | Apollo client configuration, link chain |
| `src/main.ts` | App creation, plugins, Sentry, global error handler |
| `src/App.vue` | Root layout: progress bar, `<Suspense>`, `<Header>`, `<Footer>` |
| `src/router/index.ts` | All routes; lazy-loaded where appropriate |
| `src/composables/queries.ts` | **The only entrypoint** for GraphQL queries/mutations |
| `src/composables/util.ts` | `imageSrc()` helper for media URLs |
| `src/stores/oidcStore.ts` | OIDC auth with `oidc-client-ts` |
| `src/stores/languageStore.ts` | Language switching + GraphQL `setLanguage` mutation |
| `src/stores/themeStore.ts` | `light`/`dark`/`system` theme toggle |
| `src/stores/loadingStore.ts` | Global request-loading counter |
| `src/functions/functions.ts` | Date formatting, Markdown rendering, device detection |
| `src/constants/pageCategories.ts` | `mainMenu` array — drives the header nav and breadcrumbs |
| `src/components/ui/` | Reusable primitives: `Content`, `SectionCard`, `TextCard`, `Pagination`, `EpaButton`, `Logo`, `ImageFade`, `LanguageSwitcher`, `ThemeSwitcher` |
| `src/components/placeholder/` | Skeleton loaders matching real layouts |
| `src/views/` | Route-level pages |
| `src/queries/queries.gql` | Source GraphQL operations |
| `src/gql/` | **Generated** types and TypedDocumentNodes — do not edit |
| `src/styles/themePreset.ts` | Custom PrimeVue preset (`iaPreset`) |
| `src/styles/style.css` | Tailwind v4 imports, custom utilities, layers |

## i18n Conventions

- Translation keys are **English sentences**, not identifiers:
  ```vue
  {{ $gettext('View all activities') }}
  ```
- Available: `en`, `nl`.
- Pipeline: `yarn gettext:extract` → edit `.po` files → `yarn gettext:compile` → `src/language/translations.json`.
- Switching language calls a GraphQL mutation, then refetches all active queries.

## Environment Variables

All public env vars must be prefixed with `VITE_`.

| Variable | Purpose |
|----------|---------|
| `VITE_AMELIE_GRAPHQL_API` | GraphQL endpoint URL |
| `VITE_AMELIE_MEDIA_URL` | Media/image CDN prefix |
| `VITE_BASE_URL` | Application base URL (no trailing slash) |
| `VITE_OIDC_CLIENT` / `VITE_OIDC_URL` / `VITE_OIDC_SCOPE` | OIDC configuration |
| `VITE_OLD_FRONTEND_URL` | Legacy frontend URL (linked as "Old website") |
| `VITE_REDIRECT_LOGGEDIN` | If set, authenticated users are redirected here |
| `VITE_DEFAULT_LANGUAGE` | Default locale (`en` or `nl`) |
| `VITE_SENTRY_DSN` / `VITE_SENTRY_ENVIRONMENT` | Error monitoring |

## Build & Deploy

- Docker multi-stage build: Node Alpine → Nginx unprivileged.
- Build-time: `yarn codegen` → `yarn gettext:compile` → `yarn build`.
- CI publishes to GitHub Container Registry (`ghcr.io/inter-actief/amelink`).
- `BUILD_OBFUSCATE` controls minification on the `production` branch.

## Gotchas for Agents

1. **Never edit `src/gql/` by hand.** Always modify `src/queries/queries.gql` and run `yarn codegen`.
2. **`markedText()` is async.** In components, you usually need `watch(..., async ...) + ref()` to bind the result.
3. **No existing test files.** If asked to write tests, scaffold them in `src/__tests__/` or alongside components.
4. **The `activeRequests` counter in `apollo.ts` is module-level state.** It can drift if requests are cancelled. There is a `router.afterEach` safety reset after 3 seconds.
5. **Sentry release is hardcoded** to `'0.0.1'` in `main.ts`. Update it if you introduce versioning.
6. **Image paths** should always go through `imageSrc()` to get the CDN prefix and fallback placeholder.
7. **Use `v-image-error`** directive on `<img>` tags for automatic placeholder fallback on broken images.
8. **The legacy SCSS file** `src/styles/style_old.scss` exists but is not actively used for new work.
9. **If adding a large npm dependency**, check `vite.config.ts` manual chunks. Adding it to an existing chunk (or creating a new one) keeps the bundle strategy healthy.
10. **Auth callback route (`/auth/callback`) must stay lightweight.** Do not add route guards or loading states that could interfere with OIDC state parsing.
11. **`yarn lint` is currently broken.** A stale `eslint.config.js` shadows `eslint.config.ts` and crashes on load (`Named export 'rules' not found` from the CJS `eslint-plugin-vue`). Deleting the `.js` lets ESLint load the TS config but surfaces ~108 pre-existing errors. Also note it runs with `--fix`: it rewrites files *before* failing.
12. **Heading sizes are set by unlayered `fonts.css`.** Its `h1`–`h4` rules beat any Tailwind utility, so overriding a heading's size with a token utility needs the important modifier (`text-card-title!`).
