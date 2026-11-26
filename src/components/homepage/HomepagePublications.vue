<template>
    <SectionCard :name="$gettext('Recent publications')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'publications' }" class="link">
                {{ $gettext('View all') }}
            </RouterLink>
        </template>
        <template #content>
            <div v-if="loading" class="flex flex-col gap-2">
                <div
                    v-for="_ in 3"
                    :key="_"
                    class="flex flex-row items-center gap-2 rounded-[var(--border-radius)] border border-slate-300 p-2"
                >
                    <!-- Same box as the real cover: w-9 with the A4 ratio. -->
                    <div class="aspect-a4 w-9 shrink-0">
                        <Skeleton height="100%" />
                    </div>
                    <div class="flex min-w-0 flex-1 flex-col gap-[0.2rem]">
                        <Skeleton height="1.6rem" width="90%" />
                        <Skeleton height="1.6rem" width="55%" />
                        <Skeleton height="1.6rem" width="45%" />
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
                    class="group flex flex-row items-center gap-2 rounded-[var(--border-radius)] border border-slate-300 bg-white p-2 transition-colors hover:border-primary dark:border-[var(--p-content-border-color)] dark:bg-[var(--p-content-hover-background)]"
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
