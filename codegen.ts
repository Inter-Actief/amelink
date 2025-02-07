import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.VITE_AMELIE_GRAPHQL_API,

    documents: ['src/**/*.vue', 'src/**/*.ts'],

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
