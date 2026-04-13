import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import graphqlLoader from 'vite-plugin-graphql-loader'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        graphqlLoader(),
        tailwindcss(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        })
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
        rollupOptions: {
            output: {
                // Setup manual chunks such that the content is not server in one
                manualChunks(id) {
                    if (id.includes('@vue')) return 'vue';
                    if (id.includes('@apollo/client')) return 'apollo';
                    if (id.includes('@primeuix')) return 'primeui';
                    if (id.includes('@primevue')) return 'primevue';
                    if (id.includes('@graphql')) return 'graphql';
                    if (id.includes('@pinia')) return 'pinia';
                    if (id.includes('@lucide')) return 'lucide';
                }
            }
        }
    }
})
