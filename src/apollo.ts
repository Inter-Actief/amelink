import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const link = createHttpLink({
    uri: import.meta.env.VITE_AMELIE_GRAPHQL_API,
    credentials: 'include',
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({ link, cache })
