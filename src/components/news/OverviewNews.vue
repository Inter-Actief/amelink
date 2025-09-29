<template>
    <h1>{{ $gettext('News page') }}</h1>

    <div class="grid grid-cols-2 gap-12">
        <template v-if="newsItems && processedExcerpts" v-for="item in newsItems" :key="item?.id">
            <TextCard :title="item?.title!" :subtitle="formattedData(item?.publicationDate).toString()"
                :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                <div v-html="processedExcerpts[item!.id]">
                </div>
            </TextCard>
        </template>
    </div>

    <Pagination v-bind="query" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'
import Pagination from '../ui/Pagination.vue'
import TextCard from '../ui/TextCard.vue'

const { $gettext } = useGettext();
const route = useRoute()
const queries = useQueryStore();
const perpage = ref(10)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

const query = queries.getOverviewNewsQuery({ limit: perpage.value, offset: offset.value });
const { result, refetch, loading, selectedPage } = query

const queryResults = computed(() => result.value?.newsItems)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))

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
