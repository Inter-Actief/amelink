<template>
    <SectionCard :name="$gettext('Latest video')" pageBg>
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
                class="group gap-3 text-inherit no-underline"
                :class="props.variant === 'cover' ? 'flex flex-col' : 'flex flex-row items-center'"
            >
                <span
                    v-if="props.variant === 'cover'"
                    class="relative block overflow-hidden rounded"
                >
                    <img
                        v-if="video.thumbnailUrl"
                        :src="video.thumbnailUrl"
                        :alt="video.title"
                        class="aspect-video w-full object-cover"
                    />
                    <span
                        class="absolute inset-0 grid place-items-center bg-slate-900/25 transition-colors group-hover:bg-slate-900/10"
                    >
                        <span
                            class="grid size-[4.2rem] place-items-center rounded-full bg-white/90 text-primary shadow-lg"
                        >
                            <Play class="ml-[0.2rem] size-[2rem] fill-current" />
                        </span>
                    </span>
                </span>
                <img
                    v-else-if="video.thumbnailUrl"
                    :src="video.thumbnailUrl"
                    :alt="video.title"
                    class="aspect-video w-40 shrink-0 rounded object-cover"
                />
                <span class="flex min-w-0 flex-col">
                    <span
                        class="line-clamp-2 text-[1.5rem] font-semibold leading-tight group-hover:underline group-hover:underline-offset-2"
                        >{{ video.title }}</span
                    >
                    <span class="text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]">{{
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
import { Play } from '@lucide/vue'
import PlaceholderText from '../placeholder/PlaceholderText.vue'
import { formattedData } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { $gettext } = useGettext()

interface Props {
    /** A row with a small thumbnail, or a full-width cover with a play button. */
    variant?: 'row' | 'cover'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'row',
})

const { result, loading } = useHomepageContent()
const video = computed(() => result.value?.videos?.results?.[0] ?? undefined)
</script>
