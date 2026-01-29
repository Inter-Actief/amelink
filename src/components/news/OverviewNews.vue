<template>
    <h1 class="pb-4">{{ $gettext('News page') }}</h1>

    <div class="grid grid-cols-2 gap-12 items-stretch pb-4">
        <template v-if="newsItems && processedExcerpts" v-for="item in newsItems" :key="item?.id">
            <TextCard :title="item?.title!" :subtitle="formattedData(item?.publicationDate).toString()"
                :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                <div v-html="processedExcerpts[item!.id]">
                </div>
            </TextCard>
        </template>
    </div>

    <Pagination v-bind="query" :totalCount="totalCount!" :limit="10" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import { useGettext } from 'vue3-gettext'
import Pagination from '../ui/Pagination.vue'
import TextCard from '../ui/TextCard.vue'
import { useQuery } from '@/composables/queries'

const { $gettext } = useGettext();

const query = useQuery('overviewNews', { limit: 10, offset: 0 })
const { result } = query

const queryResults = computed(() => result.value?.newsItems)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : 0))

const processedExcerpts = ref<Record<string, string>>({})

watch(newsItems, async (newItems: any) => {
    if (newItems) {
        const excerpts: Record<string, string> = {}
        for (const item of newItems) {
            if (item?.introduction) {
                excerpts[item.id] = await markedText(item.introduction)
            }
        }
        processedExcerpts.value = excerpts
    }
}, { immediate: true })
</script>

<style scoped lang="scss"></style>
