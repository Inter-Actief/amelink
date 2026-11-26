<template>
    <SectionCard :name="$gettext('News')">
        <template #content>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch pb-2">
                <template v-if="loading">
                    <TileCard v-for="_ in 10" :key="`skeleton-${_}`" loading />
                </template>
                <template v-else>
                    <TileCard
                        v-for="item in newsItems"
                        :key="item?.id"
                        :title="item?.title ?? ''"
                        :date="item?.publicationDate"
                        :to="{ name: 'singlenews', params: { id: item?.id } }"
                    >
                        <div class="line-clamp-3" v-html="processedExcerpts[item!.id]"></div>
                    </TileCard>
                </template>
            </div>

            <Pagination v-bind="query" :totalCount="totalCount!" :limit="10" />
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, markedText } from '@/functions/functions.ts'
import { useGettext } from 'vue3-gettext'
import Pagination from '../ui/Pagination.vue'
import TileCard from '../ui/TileCard.vue'
import { useQuery } from '@/composables/queries'

const { $gettext } = useGettext()

const query = useQuery('overviewNews', { limit: 10, offset: 0 })
const { result, loading } = query

const queryResults = computed(() => result.value?.newsItems)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : 0))

const processedExcerpts = ref<Record<string, string>>({})

watch(
    newsItems,
    async (newItems: any) => {
        if (newItems) {
            const excerpts: Record<string, string> = {}
            for (const item of newItems) {
                if (item?.introduction) {
                    excerpts[item.id] = await markedText(item.introduction)
                }
            }
            processedExcerpts.value = excerpts
        }
    },
    { immediate: true },
)
</script>
