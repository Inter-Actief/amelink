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
            }
        },
    },
})

// Initialize OIDC
const oidcStore = useOidcStore()
oidcStore.initializeAuth()

// Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        app,
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
        tracesSampleRate: 0.0,
        sendDefaultPii: true,
        environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
    })
}

app.mount('#app')
