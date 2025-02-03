/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_AMELIE_GRAPHQL_API: string
    readonly VITE_SENTRY_DSN: string
    readonly VITE_SENTRY_ENVIRONMENT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
