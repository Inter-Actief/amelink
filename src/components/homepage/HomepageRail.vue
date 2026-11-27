<template>
    <!-- Two named items, not a section: one latest publication and the latest
         video, each with a small preview and its age instead of a date. The age
         is what stops a months-old item from passing as news. -->
    <div v-if="loading" class="flex flex-col gap-3">
        <div v-for="n in 2" :key="n" class="flex items-center gap-2">
            <Skeleton width="5.2rem" height="7.4rem" class="shrink-0" />
            <div class="min-w-0 flex-1"><PlaceholderText :lines="2" /></div>
        </div>
    </div>

    <div v-else-if="publication || video" class="flex flex-col gap-3 text-[1.5rem]">
        <a
            v-if="publication"
            :href="publicationUrl(publication.file)"
            class="group flex items-center gap-2 text-inherit no-underline"
        >
            <img
                v-image-error="'/images/placeholder/book.svg'"
                :src="publication.thumbnail ?? ''"
                :alt="publication.name"
                class="aspect-a4 w-[3.4rem] shrink-0 rounded border border-slate-300 object-cover object-top shadow-sm dark:border-[var(--p-content-border-color)]"
            />
            <span class="flex min-w-0 flex-1 flex-col">
                <span
                    class="line-clamp-2 font-semibold leading-tight group-hover:underline group-hover:underline-offset-2"
                    >{{ publication.name }}</span
                >
                <span class="text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]">{{
                    relativeAge(publication.datePublished)
                }}</span>
            </span>
        </a>

        <RouterLink
            v-if="video"
            :to="{
                name: 'singlevideo',
                params: { id: video.videoId, type: video.videoType },
            }"
            class="group flex items-center gap-2 text-inherit no-underline"
        >
            <img
                v-if="video.thumbnailUrl"
                :src="video.thumbnailUrl"
                :alt="video.title"
                class="aspect-video w-[6.4rem] shrink-0 rounded object-cover"
            />
            <span class="flex min-w-0 flex-1 flex-col">
                <span
                    class="line-clamp-2 font-semibold leading-tight group-hover:underline group-hover:underline-offset-2"
                    >{{ video.title }}</span
                >
                <span class="text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]">{{
                    relativeAge(video.datePublished)
                }}</span>
            </span>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import PlaceholderText from '../placeholder/PlaceholderText.vue'
import { publicationUrl, relativeAge } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { result, loading } = useHomepageContent()

const publication = computed(
    () =>
        (result.value?.publications?.results ?? []).filter(
            (item): item is NonNullable<typeof item> => !!item,
        )[0] ?? undefined,
)
const video = computed(() => result.value?.videos?.results?.[0] ?? undefined)
</script>
