<template>
    <SectionCard :name="$gettext('Recent publications')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'publications' }" class="link">
                {{ $gettext('View all') }}
            </RouterLink>
        </template>
        <template #content>
            <!-- The placeholder takes the same shape as the list: four rows (the
                 query asks for four) laid out the same way, with a cover box and
                 two 1.9rem lines, which is what a one-line title plus a date
                 actually occupy. -->
            <div
                v-if="loading"
                class="gap-2"
                :class="
                    props.layout === 'columns' ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'
                "
            >
                <div
                    v-for="_ in 4"
                    :key="_"
                    class="flex flex-row items-center gap-2 rounded-[var(--border-radius)] border border-slate-300 p-2"
                >
                    <div class="aspect-a4 w-9 shrink-0">
                        <Skeleton height="100%" />
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col">
                        <Skeleton height="1.9rem" width="90%" />
                        <Skeleton height="1.9rem" width="50%" />
                    </div>
                </div>
            </div>
            <!-- Every publication is its own little card: same surface, outline and
                 hover as the news tiles, so the list reads as separate items. -->
            <div
                v-else-if="publications.length"
                class="gap-2"
                :class="
                    props.layout === 'columns' ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'
                "
            >
                <a
                    v-for="item in publications"
                    :key="item.id"
                    :href="publicationUrl(item.file)"
                    class="group flex flex-row items-center gap-2 rounded-[var(--border-radius)] border border-slate-300 bg-[var(--p-page-tile)] p-2 transition-colors hover:border-primary dark:border-[var(--p-content-border-color)] dark:[--p-text-muted-color:var(--p-surface-200)]"
                >
                    <img
                        v-image-error="'/images/placeholder/book.svg'"
                        :src="item.thumbnail ?? ''"
                        :alt="item.name"
                        class="w-9 shrink-0 aspect-a4 object-cover object-top rounded shadow-sm"
                    />
                    <span class="flex flex-col min-w-0">
                        <span class="line-clamp-2 text-[1.5rem] font-semibold leading-tight">{{
                            item.name
                        }}</span>
                        <span
                            class="text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]"
                            >{{ formattedData(item.datePublished) }}</span
                        >
                    </span>
                </a>
            </div>
            <p v-else class="m-0">{{ $gettext('There are no publications yet.') }}</p>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue'
import Skeleton from 'primevue/skeleton'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { computed } from 'vue'
import { formattedData, publicationUrl } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { $gettext } = useGettext()

interface Props {
    /** One column of rows, or two columns next to each other. */
    layout?: 'stack' | 'columns'
}

const props = withDefaults(defineProps<Props>(), {
    layout: 'stack',
})

const { result, loading } = useHomepageContent()
const publications = computed(() =>
    (result.value?.publications?.results ?? []).filter(
        (item): item is NonNullable<typeof item> => !!item,
    ),
)
</script>
