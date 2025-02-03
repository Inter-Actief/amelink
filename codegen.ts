import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.VITE_AMELIE_GRAPHQL_API,
    generates: {
        'src/gql/': {
            preset: 'client',
            plugins: [],
        },
    },
}

export default config
