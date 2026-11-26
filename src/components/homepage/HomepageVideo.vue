<template>
    <SectionCard :name="$gettext('Latest video')" index="04" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'videos' }" class="link">
                {{ $gettext('View all') }}
            </RouterLink>
        </template>
        <template #content>
            <div v-if="loading" class="flex flex-row gap-4 items-center">
                <Skeleton width="9.6rem" height="5.4rem" />
                <div class="flex-1"><PlaceholderText :lines="2" /></div>
            </div>
            <RouterLink
                v-else-if="video"
                :to="{
                    name: 'singlevideo',
                    params: { id: video.videoId, type: video.videoType },
                }"
                class="side-row flex flex-row gap-4 items-center no-underline text-inherit"
            >
                <img
                    v-if="video.thumbnailUrl"
                    :src="video.thumbnailUrl"
                    :alt="video.title"
                    class="w-40 shrink-0 aspect-video object-cover"
                />
                <span class="flex flex-col min-w-0">
                    <span class="side-row-title line-clamp-2">{{
                        video.title
                    }}</span>
                    <span class="side-row-meta">{{
                        formattedData(video.datePublished)
                    }}</span>
                </span>
            </RouterLink>
            <p v-else class="m-0">{{ $gettext('There are no videos yet.') }}</p>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue'
import Skeleton from 'primevue/skeleton'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { computed } from 'vue'
import PlaceholderText from '../placeholder/PlaceholderText.vue'
import { formattedData } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { $gettext } = useGettext()

const { result, loading } = useHomepageContent()
const video = computed(() => result.value?.videos?.results?.[0] ?? undefined)
</script>

<style scoped></style>
