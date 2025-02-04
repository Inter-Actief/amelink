<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column">
                <template v-if="item">
                    <h1>{{ getItemValue(item, 'title') }}</h1>

                    <div class="details">
                        <div class="author">
                            {{ item.author }}
                        </div>
                        <div class="date">
                            {{ formattedData(item.publicationDate) }}
                        </div>
                    </div>

                    <div
                        class="content text"
                        v-html="markedText(getItemValue(item, 'content'))"
                    ></div>

                    <EpaButton
                        :to="{ name: 'news', params: { id: item.id } }"
                        class="link return"
                        bicon="return"
                        >{{ $t('Return to overview') }}</EpaButton
                    >
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'

const appState = inject('appState')
const props = defineProps(['id'])

const query = computed(
    () => gql`
  query MyQuery {
    newsItem(id: "${props.id}") {
      content${appState.language}
      content
      title${appState.language}
      title
      publicationDate
      author
      id
    }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)
const queryResults = computed(() => result.value?.newsItem)
const item = computed(() => (queryResults.value ? queryResults.value : null))
</script>
