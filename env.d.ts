/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_AMELIE_GRAPHQL_API: string
    readonly VITE_SENTRY_DSN: string
    readonly VITE_SENTRY_ENVIRONMENT: string
    readonly VITE_DEFAULT_LANGUAGE: string
    readonly VITE_AMELIE_MEDIA_URL: string
    readonly VITE_AMELIE_BASE_URL: string
    readonly VITE_WO4YOU_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
