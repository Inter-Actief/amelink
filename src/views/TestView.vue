<template>
    <div>
        {{ result?.activities }}
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'

const query = graphql(/* GraphQL */`
    query MyQuery {
      activities {
        totalCount
        results {
          description
          descriptionEn
          descriptionNl
        }
      }
    }
`)

const { result } = useQuery(query)
</script>

<style scoped></style>
