<template>
    <div class="ia_section gray">
        <div class="ia_row">
            <div class="ia_column">
                <div class="text" v-html="markedText(getItemValue(item, 'content'))"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref, watch } from 'vue'
import { getItemValue, markedText } from '@/functions/functions'

const props = defineProps(['id', 'slug'])
const appState = inject('appState')

const query = computed(
    () => gql`
  query MyQuery {
    page(id: "${props.id}") {
        name
        slug
        content
        name${appState.language}
        content${appState.language}
      }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)
const item = computed(() => result.value?.page)
</script>
