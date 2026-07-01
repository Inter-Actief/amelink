<template>
    <Carousel v-if="!loading && result" :value="carouselItems" :num-visible="1" :num-scroll="1">
        <template #item="slotProps">
            <template v-if="slotProps.data.typeName == 'pinnedNews'">
                <h2 class="pb-4">{{ $gettext('Pinned news') }}</h2>
                <div class="grid grid-cols-1 gap-12 items-stretch">
                    <template v-if="slotProps.data.results" v-for="item in slotProps.data.results" :key="item?.id">
                        <TextCard :title="item?.title!" :subtitle="item?.author || ''"
                            :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                            <div v-html="processedExcerpts['pinnedNews_' + item!.id]"></div>
                        </TextCard>
                    </template>
                </div>
            </template>
            <template v-else-if="slotProps.data.typeName == 'recentNews'">
                <h2 class="pb-4">{{ $gettext('Recent news') }}</h2>
                <div class="grid grid-cols-1 gap-12 items-stretch">
                    <template v-if="slotProps.data.results" v-for="item in slotProps.data.results" :key="item?.id">
                        <TextCard :title="item?.title!" :subtitle="item?.author || ''"
                            :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                            <div v-html="processedExcerpts['recentNews_' + item!.id]"></div>
                        </TextCard>
                    </template>
                </div>
            </template>
            <template v-else-if="slotProps.data.typeName == 'activities'">
                <h2 class="pb-4">{{ $gettext('Recent Activity Pictures') }}</h2>
                <div class="grid grid-cols-1 gap-12">
                    <div class="flex flex-row" v-for="act in slotProps.data.results" :key="act.id">
                        <div class="basis-2/3 flex-1">
                            <Card :pt="{
                                body: {
                                    class: 'mb-auto'
                                }
                            }">
                                <template #content>
                                    {{ act.summary }}
                                </template>
                            </Card>
                        </div>
                        <div class="basis-1/3">
                            <img :src="newActivityPictures[act.id]" class="format aspect-[4/3] object-cover" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="slotProps.data.typeName == 'publications'">
                Publications
            </template>
            <template v-else-if="slotProps.data.typeName == 'newsItems'">
                <h2 class="pb-4">{{ $gettext('All news') }}</h2>
                <div class="grid grid-cols-1 gap-12 items-stretch">
                    <template v-if="slotProps.data.results" v-for="item in slotProps.data.results" :key="item?.id">
                        <TextCard :title="item?.title!" :subtitle="item?.author || ''"
                            :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                            <div v-html="processedExcerpts['newsItems_' + item!.id]"></div>
                        </TextCard>
                    </template>
                </div>
            </template>
        </template>
    </Carousel>
</template>

<script lang="ts" setup>
import { useQuery } from '@/composables/queries';
import { markedText } from '@/functions/functions';
import { useGettext } from 'vue3-gettext';
import Carousel from 'primevue/carousel';
import TextCard from '../ui/TextCard.vue';
import { computed, ref, watch } from 'vue';

const { $gettext } = useGettext();

const today = new Date()
const weekAgo = new Date(today)
weekAgo.setDate(today.getDate() - 100)

const { result, loading } = useQuery('dynamicContent', {
    today: today.toISOString(),
    recency: weekAgo.toISOString()
})

const processedExcerpts = ref<Record<string, string>>({})
const newActivityPictures = ref<Record<string, string>>({})

watch(() => result.value, async (newResult: any) => {
    if (newResult) {
        const excerpts: Record<string, string> = {}

        // Process pinned news excerpts
        if (newResult.pinnedNews?.results) {
            for (const item of newResult.pinnedNews.results) {
                if (item?.introduction) {
                    excerpts['pinnedNews_' + item.id] = await markedText(item.introduction)
                }
            }
        }

        // Process recent news excerpts
        if (newResult.recentNews?.results) {
            for (const item of newResult.recentNews.results) {
                if (item?.introduction) {
                    excerpts['recentNews_' + item.id] = await markedText(item.introduction)
                }
            }
        }

        // Process news items excerpts
        if (newResult.newsItems?.results) {
            for (const item of newResult.newsItems.results) {
                if (item?.introduction) {
                    excerpts['newsItems_' + item.id] = await markedText(item.introduction)
                }
            }
        }

        processedExcerpts.value = excerpts

        // Process activities
        if (newResult.activities?.results) {
            for (const item of newResult.activities?.results) {
                // Fetch activity photo randomPhotoUrl
                const randomPhotoEndpointUrl = `${import.meta.env.VITE_AMELIE_BASE_URL.replace(/\/$/, '')}${item.randomPhotoUrl}`
                console.log(randomPhotoEndpointUrl)

                fetch(randomPhotoEndpointUrl)
                    .then(response => {
                        if (!response.ok) {
                            console.error(`Failed to fetch photo: ${response.status}`)
                            return Promise.reject(new Error(`HTTP ${response.status}`))
                        }
                        return response.json()
                    })
                    .then(obj => {
                        newActivityPictures.value[item.id!] = obj.url ?? '/images/placeholder/photo.jpg'
                    })
                    .catch(error => {
                        console.error('Error fetching activity photo:', error)
                        newActivityPictures.value[item.id!] = '/images/placeholder/photo.jpg'
                    })
            }
        }
    }
}, { immediate: true })

const carouselItems = computed(() => {
    return [
        // Control order of importance
        // Most interesting when new activites are launched
        {
            ...result.value?.activities,
            typeName: "activities"
        },
        {
            ...result.value?.pinnedNews,
            typeName: "pinnedNews"
        },
        {
            ...result.value?.publications,
            typeName: "publications"
        },
        {
            ...result.value?.recentNews,
            typeName: "recentNews"
        },
        {
            ...result.value?.newsItems,
            typeName: "newsItems"
        }
    ].filter(x => (x.totalCount ?? 0) > 0) // Only show full items
})


</script>

<style></style>