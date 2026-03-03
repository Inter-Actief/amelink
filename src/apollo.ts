import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useOidcStore } from '@/stores/oidcStore'

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
        }
    }
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({ 
    link: authLink.concat(httpLink), 
    cache 
})
