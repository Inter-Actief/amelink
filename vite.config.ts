import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import graphqlLoader from 'vite-plugin-graphql-loader'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        graphqlLoader(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {},
})
