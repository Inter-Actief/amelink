import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.VITE_AMELIE_GRAPHQL_API,
    //TODO: Migrate queries such that documents can be used
    // Column names must be static, and not defined at runtime
    // e.g. name${gettext.current.capitalize()} becomes nameEn or nameNl
    // By solving this, we can import the types of the queries and have
    // everything typed! Yay!
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
