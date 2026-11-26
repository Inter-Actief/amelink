<template>
    <SectionCard :name="$gettext('News')" index="02" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'news' }" class="link">
                {{ $gettext('View all news') }}
            </RouterLink>
        </template>
        <template #content>
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <HorizontalCard
                    loading
                    v-for="_ in 4"
                    :loadingOpts="{ title: true, readmore: true, contentLines: 2 }"
                />
            </div>
            <div v-else-if="newsItems.length" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <RouterLink
                    v-for="item in newsItems"
                    :key="item.id"
                    :to="{ name: 'singlenews', params: { id: item.id } }"
                    class="block no-underline text-inherit"
                >
                    <Card class="news-row h-full overflow-hidden">
                        <template #content>
                            <div class="flex flex-col gap-1 px-3 py-2 h-full">
                                <div class="flex flex-row items-start justify-between gap-2">
                                    <span class="text-card-title font-bold leading-snug">{{
                                        item.title
                                    }}</span>
                                    <span
                                        v-if="item.pinned"
                                        class="flex flex-row items-center gap-1 shrink-0 text-meta text-primary font-semibold"
                                    >
                                        <Pin :size="12" />
                                        {{ $gettext('Pinned') }}
                                    </span>
                                </div>
                                <span class="text-meta text-slate-500">{{
                                    formattedData(item.publicationDate)
                                }}</span>
                                <div
                                    v-if="excerpts[item.id]"
                                    class="text-meta leading-snug line-clamp-2"
                                    v-html="excerpts[item.id]"
                                ></div>
                                <div class="mt-auto pt-1">
                                    <EpaButton class="link readmore" icon="readmore">
                                        {{ $gettext('Read more') }}
                                    </EpaButton>
                                </div>
                            </div>
                        </template>
                    </Card>
                </RouterLink>
            </div>
            <p v-else class="m-0">{{ $gettext('There is no news yet.') }}</p>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue'
import HorizontalCard from '../ui/HorizontalCard.vue'
import EpaButton from '../ui/EpaButton.vue'
import Card from 'primevue/card'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { computed, ref, watch } from 'vue'
import { Pin } from '@lucide/vue'
import { formattedData, markedText } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { $gettext } = useGettext()

const { result, loading } = useHomepageContent()

const excerpts = ref<Record<string, string>>({})

/** Pinned news first, then the regular ones, without duplicates. */
const newsItems = computed(() => {
    const pinned = result.value?.pinnedNews?.results ?? []
    const recent = result.value?.recentNews?.results ?? []
    const seen = new Set<string>()

    return [...pinned, ...recent].filter((item): item is NonNullable<typeof item> => {
        if (!item || seen.has(item.id)) {
            return false
        }
        seen.add(item.id)
        return true
    })
})

watch(
    () => result.value,
    async (value) => {
        if (!value) {
            return
        }

        const processed: Record<string, string> = {}

        for (const item of [
            ...(value.pinnedNews?.results ?? []),
            ...(value.recentNews?.results ?? []),
        ]) {
            if (item?.introduction) {
                processed[item.id] = await markedText(item.introduction)
            }
        }

        excerpts.value = processed
    },
    { immediate: true },
)
</script>

<style scoped>
.news-row :deep(.p-card-body),
.news-row :deep(.p-card-content) {
    padding: 0;
    height: 100%;
}

.news-row:hover .readmore::after {
    transform: scaleX(1);
}
</style>
