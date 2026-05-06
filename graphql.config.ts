import type { IGraphQLConfig } from 'graphql-config'
require('dotenv-flow').config()

const config: IGraphQLConfig = {
    schema: process.env.VITE_AMELIE_GRAPHQL_API!,
    documents: 'src/queries/**/*.gql',
}

export default config
