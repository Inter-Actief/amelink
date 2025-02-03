import './assets/main.css'

import { createApp } from 'vue'

// Apollo
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import VueApolloComponents from '@vue/apollo-components'

// Other plugins/frameworks
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' // For now a preset theme
import gettext from './gettext'
import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'

const apolloProvider = createApolloProvider({
    defaultClient: new ApolloClient({
        uri: import.meta.env.VITE_AMELIE_GRAPHQL_API,
        cache: new InMemoryCache(),
    }),
})

const app = createApp(App)

app.use(createPinia())
app.use(apolloProvider)
app.use(VueApolloComponents)
app.use(router)
app.use(gettext)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})

// Sentry
//TODO: Test if works
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
