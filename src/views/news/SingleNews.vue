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

                    <div class="content text" v-html="markedText(getItemValue(item, 'content'))"></div>

                    <EpaButton :to="{ name: 'news', params: { id: item.id } }" class="link return" bicon="return">{{
                        $gettext('Return to overview') }}</EpaButton>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'

const gettext = useGettext();
const props = defineProps(['id'])

const query = computed(
    () => graphql`
  query SingleNewsQuery {
    newsItem(id: "${props.id}") {
      content${gettext.current.capitalize()}
      content
      title${gettext.current.capitalize()}
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
