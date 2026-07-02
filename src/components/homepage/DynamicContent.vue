<template>
    <div v-if="loading" class="grid grid-cols-1 gap-12 mx-12 my-4">
        <TextCard loading v-for="_ in 3" />
    </div>
    <Carousel v-if="!loading && result" :value="carouselItems" :num-visible="1" :num-scroll="1">
        <template #item="slotProps">
            <template v-if="slotProps.data.typeName == 'pinnedNews'">
                <h2 class="pb-4 flex gap-4 items-center">
                    <Pin :size="30" />
                    {{ $gettext('Pinned news') }}
                </h2>
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
                <h2 class="pb-4 flex gap-4 items-center">
                    <Mailbox :size="30" />
                    {{ $gettext('Recent news') }}
                </h2>
                <div class="grid grid-cols-1 gap-12 items-stretch">
                    <template v-if="slotProps.data.results" v-for="item in slotProps.data.results" :key="item?.id">
                        <TextCard :title="item?.title!" :subtitle="item?.author || ''"
                            :routerLink="{ to: { name: 'singlenews', params: { id: item?.id } } }">
                            <div v-html="processedExcerpts['recentNews_' + item!.id]"></div>
                        </TextCard>
                    </template>
                </div>
            </template>
            <template v-else-if="slotProps.data.typeName == 'publications'">
                <h2 class="pb-4 flex gap-4 items-center">
                    <BookOpenText :size="30" />
                    {{ $gettext('Recent publication') }}
                </h2>
                <a :href="publicationUrl(slotProps.data.results[0].file!)">
                    <TextCard :title="slotProps.data.results[0].name">
                        <template #default>
                            <img v-image-error="'/images/placeholder/book.svg'"
                                class="max-h-240 aspect-a4 object-cover rounded-t-lg w-full"
                                :src="slotProps.data.results[0].thumbnail" />
                        </template>
                    </TextCard>
                </a>
            </template>
            <template v-else-if="slotProps.data.typeName == 'newsItems'">
                <h2 class="pb-4 flex gap-4 items-center">
                    <Newspaper :size="30" />
                    {{ $gettext('All news') }}
                </h2>
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
import { markedText, publicationUrl } from '@/functions/functions';
import { useGettext } from 'vue3-gettext';
import Carousel from 'primevue/carousel';
import TextCard from '../ui/TextCard.vue';
import { computed, ref, watch } from 'vue';
import PicturesBy from '../photos/PicturesBy.vue';
import { BookOpenText, Camera, Mailbox, Newspaper, Pin } from '@lucide/vue';

const { $gettext } = useGettext();

const today = new Date()
const weekAgo = new Date(today)
weekAgo.setDate(today.getDate() - 300)

const { result, loading } = useQuery('dynamicContent', {
    today: today.toISOString(),
    recency: weekAgo.toISOString()
})

const processedExcerpts = ref<Record<string, string>>({})
const newActivityPictures = ref<Record<string, string>>({})
const pictureTakers = ref<Record<string, Array<string>>>({})

watch(() => result.value, async (newResult) => {
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

        processedExcerpts.value = excerpts
    }
}, { immediate: true })

const carouselItems = computed(() => {
    return [
        {
            ...result.value?.publications,
            typeName: "publications"
        },
        {
            ...result.value?.pinnedNews,
            typeName: "pinnedNews"
        },
        {
            ...result.value?.recentNews,
            typeName: "recentNews"
        },
    ].filter(x => (x.totalCount ?? 0) > 0) // Only show full items
})


</script>

<style scoped>
.gotopic:hover .readmore {
    background-size: 100% 0.2rem;
}
</style>
