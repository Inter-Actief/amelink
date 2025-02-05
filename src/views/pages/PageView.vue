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
import { graphql } from '@/gql'
import { computed, ref, watch } from 'vue'
import { getItemValue, markedText } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'

const props = defineProps(['id', 'slug'])
const appState = inject('appState')
const gettext = useGettext();

const query = computed(
    () => graphql`
  query PageViewQuery {
    page(id: "${props.id}") {
        name
        slug
        content
        name${gettext.current.capitalize()}
        content${gettext.current.capitalize()}
      }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)
const item = computed(() => result.value?.page)
</script>
