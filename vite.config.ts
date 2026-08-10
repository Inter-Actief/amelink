import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import graphqlLoader from 'vite-plugin-graphql-loader'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import EnvRuntime from 'vite-plugin-env-runtime'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        EnvRuntime({
            filename: 'config.js',
            include: 'VITE_*',
            name: 'AMELINK',
        }),
        vue(),
        vueDevTools(),
        graphqlLoader(),
        tailwindcss(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
        //visualizer(), // Uncomment to view information about build bundle
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {},
    build: {
        // Target should be es2020 or above (if want to use import.meta)
        // https://esbuild.github.io/content-types/#javascript
        target: 'esnext', // Newest JS
        minify: process.env.BUILD_OBFUSCATE?.toLocaleLowerCase() != 'false',
        sourcemap: process.env.BUILD_OBFUSCATE?.toLocaleLowerCase() == 'false',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return

                    // ── CKEditor ────────────────────────────────────────────
                    // 30+ packages; isolate completely so the rest of the app
                    // is not penalised by its size on first load.
                    if (id.includes('@ckeditor') || id.includes('/ckeditor5/')) return 'ckeditor'

                    // ── Sentry error monitoring ─────────────────────────────
                    // @sentry/vue, @sentry/browser, @sentry/core,
                    // @sentry-internal/replay, feedback, browser-utils, …
                    if (id.includes('@sentry') || id.includes('sentry-internal')) return 'sentry'

                    // ── PrimeVue UI library (split into 3 layers) ──────────
                    // 1. Theme/design-token engine — loaded once, cached long
                    //    @primeuix/styled, @primeuix/themes, @primeuix/styles
                    if (
                        id.includes('@primeuix/styled') ||
                        id.includes('@primeuix/themes') ||
                        id.includes('@primeuix/styles')
                    )
                        return 'primevue-theme'

                    // 2. Runtime core — @primevue/core, @primevue/icons,
                    //    @primevue/metadata, @primeuix/utils, @primeuix/forms
                    if (
                        id.includes('@primevue/core') ||
                        id.includes('@primevue/icons') ||
                        id.includes('@primevue/metadata') ||
                        id.includes('@primevue/forms') ||
                        id.includes('@primeuix/utils') ||
                        id.includes('@primeuix/forms')
                    )
                        return 'primevue-core'

                    // 3. Component implementations — the bulk of primevue
                    if (id.includes('/primevue/') || id.includes('@primevue/'))
                        return 'primevue-components'

                    // ── Apollo + GraphQL runtime ────────────────────────────
                    // @apollo/client, @vue/apollo-composable,
                    // zen-observable-ts, zen-observable, optimism,
                    // @wry/equality|context|caches|trie, rehackt,
                    // ts-invariant, symbol-observable
                    if (
                        id.includes('@apollo/') ||
                        id.includes('@vue/apollo') ||
                        id.includes('zen-observable') ||
                        id.includes('/optimism/') ||
                        id.includes('@wry/') ||
                        id.includes('rehackt') ||
                        id.includes('ts-invariant') ||
                        id.includes('symbol-observable')
                    )
                        return 'apollo'

                    // GraphQL language runtime (separate; shared by Apollo
                    // and any codegen artifacts loaded at runtime)
                    if (
                        id.includes('/graphql/') ||
                        id.includes('graphql-tag') ||
                        id.includes('graphql-ws')
                    )
                        return 'graphql'

                    // ── Swiper carousel ─────────────────────────────────────
                    if (id.includes('/swiper/')) return 'swiper'

                    // ── OIDC / authentication ───────────────────────────────
                    if (id.includes('oidc-client-ts') || id.includes('jwt-decode')) return 'oidc'

                    // ── Lucide icons ────────────────────────────────────────
                    if (id.includes('@lucide/')) return 'icons'

                    // ── Date utilities ──────────────────────────────────────
                    if (id.includes('date-fns')) return 'date-fns'

                    // ── i18n ────────────────────────────────────────────────
                    if (id.includes('vue3-gettext') || id.includes('/pofile/')) return 'i18n'

                    // ── Misc UI extras ──────────────────────────────────────
                    // vue-easy-lightbox, @vuepic/vue-datepicker, vanilla-colorful
                    if (
                        id.includes('vue-easy-lightbox') ||
                        id.includes('@vuepic/') ||
                        id.includes('vanilla-colorful')
                    )
                        return 'ui-extras'

                    // ── Vue core ecosystem ──────────────────────────────────
                    // vue, vue-router, pinia, vue-demi, @vue/* (compiler, etc.)
                    if (
                        id.includes('/vue/') ||
                        id.includes('/vue-router/') ||
                        id.includes('/pinia/') ||
                        id.includes('vue-demi') ||
                        id.includes('@vue/')
                    )
                        return 'vue-core'
                },
            },
        },
    },
})
