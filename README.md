# amelink

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

Firstly, it's important to generate the correct TypeScript types from our GraphQL API. For that, run

```sh
yarn codegen
```

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

### Do translations (on MacOS or Ubuntu) with [vue3-gettext](https://jshmrtn.github.io/vue3-gettext/setup.html)

This is probably handled by the pipeline, but to do it manually also! You do need a gettext binary which can be found [here](https://jshmrtn.github.io/vue3-gettext/setup.html)

- Extract translation keys from your code and creates .po files to translate

```sh
yarn gettext:extract
```

- Compile the translated messages from the .po files to a .json to be used in your application

```sh
yarn gettext:compile
```
