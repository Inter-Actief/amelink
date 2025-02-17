import { createApp, h, provide } from 'vue'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { iaPreset } from './assets/styles/themePreset'
import gettext from './gettext'
import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'

const link = createHttpLink({
    uri: import.meta.env.VITE_AMELIE_GRAPHQL_API,
    credentials: 'include',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({ link, cache })

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
    },
})

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
