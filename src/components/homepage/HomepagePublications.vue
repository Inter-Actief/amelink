<template>
    <SectionCard :name="$gettext('Recent publications')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'publications' }" class="link">
                {{ $gettext('View all') }}
            </RouterLink>
        </template>
        <template #content>
            <div v-if="loading" class="flex flex-col gap-2">
                <div v-for="_ in 3" :key="_" class="flex flex-row gap-4 items-center py-2">
                    <Skeleton width="5rem" height="7rem" />
                    <div class="flex-1">
                        <PlaceholderText :lines="1" />
                    </div>
                </div>
            </div>
            <div v-else-if="publications.length" class="flex flex-col gap-1">
                <a
                    v-for="item in publications"
                    :key="item.id"
                    :href="publicationUrl(item.file)"
                    class="group flex flex-row gap-2 items-center py-1"
                >
                    <img
                        v-image-error="'/images/placeholder/book.svg'"
                        :src="item.thumbnail ?? ''"
                        :alt="item.name"
                        class="w-9 shrink-0 aspect-a4 object-cover object-top rounded shadow-sm"
                    />
                    <span class="flex flex-col min-w-0">
                        <span class="text-card-title font-semibold leading-snug line-clamp-2">{{
                            item.name
                        }}</span>
                        <span class="text-meta text-slate-500">{{
                            formattedData(item.datePublished)
                        }}</span>
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
import PlaceholderText from '../placeholder/PlaceholderText.vue'
import { formattedData, publicationUrl } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

const { $gettext } = useGettext()

const { result, loading } = useHomepageContent()
const publications = computed(() =>
    (result.value?.publications?.results ?? []).filter(
        (item): item is NonNullable<typeof item> => !!item,
    ),
)
</script>

<style scoped></style>
