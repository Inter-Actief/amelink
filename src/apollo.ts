import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useOidcStore } from '@/stores/oidcStore'
import { useLoadingStore } from './stores/loadingStore'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_AMELIE_GRAPHQL_API,
    credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
    const oidcStore = useOidcStore()
    const token = oidcStore.user?.id_token

    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `JWT ${token}` } : {}),
        },
    }
})

let activeRequests = 0

export const loadingLink = new ApolloLink((operation, forward) => {
    const loading = useLoadingStore()
    activeRequests++
    loading.start()

    return forward(operation).map((result) => {
        activeRequests--
        loading.stop()
        return result
    })
})

export const errorLink = onError(({ networkError, graphQLErrors }) => {
    const loading = useLoadingStore()
    if (activeRequests > 0) {
        activeRequests = Math.max(0, activeRequests - 1)
    }
    loading.stop()

    if (graphQLErrors) graphQLErrors.forEach((err) => console.error('GraphQL error:', err))
    if (networkError) console.error('Network error:', networkError)
})

const cache = new InMemoryCache()

const link = ApolloLink.from([loadingLink, authLink, errorLink, httpLink])

export const apolloClient = new ApolloClient({
    link,
    cache,
})
