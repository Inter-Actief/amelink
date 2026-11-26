<template>
    <SectionCard :name="$gettext('News')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'news' }" class="link">
                {{ $gettext('View all news') }}
            </RouterLink>
        </template>
        <template #content>
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TileCard
                    v-for="_ in 4"
                    :key="`skeleton-${_}`"
                    loading
                    hide-action
                    :skeleton-lines="2"
                />
            </div>
            <div v-else-if="newsItems.length" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TileCard
                    v-for="item in newsItems"
                    :key="item.id"
                    :title="item.title ?? ''"
                    :date="item.publicationDate"
                    :pinned="item.pinned"
                    hide-action
                    :to="{ name: 'singlenews', params: { id: item.id } }"
                >
                    <div
                        v-if="excerpts[item.id]"
                        class="line-clamp-2"
                        v-html="excerpts[item.id]"
                    ></div>
                </TileCard>
            </div>
            <p v-else class="m-0">{{ $gettext('There is no news yet.') }}</p>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue'
import TileCard from '../ui/TileCard.vue'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
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
