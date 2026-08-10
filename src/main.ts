import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { iaPreset } from '@/styles/themePreset'
import '@/styles/style.css'
import gettext from './gettext'
import { useOidcStore } from '@/stores/oidcStore'
import App from '@/App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'
import { apolloClient } from '@/apollo'
import { vImageError } from '@/directives/vImageError'
import { showError } from './services/toast'

export { apolloClient }

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render() {
        return h(App)
    },
})

app.use(createPinia())
app.use(router)
app.use(gettext)
app.use(ToastService)

// Register global directives
app.directive('image-error', vImageError)
app.use(PrimeVue, {
    theme: {
        preset: iaPreset,
        options: {
            darkModeSelector: '.dark',

            // Custom CSS layer.
            // Allowing one to overwrite the styling of PrimeVue components using Tailwind CSS.
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue, components, utilities',
            },
        },
    },
})

// Initialize OIDC
const oidcStore = useOidcStore()

let sentryErrorHandler = null
// Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        app,
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
        tracesSampleRate: 0.0,
        sendDefaultPii: true,
        environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
        release: '0.0.1',  // placeholder
    })

    // Set error handler (updated by sentry)
    sentryErrorHandler = app.config.errorHandler
}


// Global error handling toast
app.config.errorHandler = (err, instance, info) => {
    showError(
        err instanceof Error
            ? err.message
            : 'An unexpected error occurred.'
    )

    // Call sentry's error handler
    sentryErrorHandler?.(err, instance, info)
}

// Wait for auth to initialize before mounting
oidcStore.initializeAuth().then(() => {
    app.mount('#app')
})
