import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

// Can be overwritten in a .env.local file!
console.log(`Fetching graphQL schema from ${process.env.VITE_AMELIE_GRAPHQL_API}`)

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.VITE_AMELIE_GRAPHQL_API,

    documents: ['src/**/*.ts', 'src/**/*.gql'],

    generates: {
        'src/gql/': {
            preset: 'client',
            plugins: [],
            config: {
                useTypeImports: true,
            },
        },
    },
}

export default config
