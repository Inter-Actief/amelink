<template>
    <SectionCard :name="$gettext('Upcoming Activities')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'activities', params: {} }" class="link">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </template>
        <template #content>
            <Transition
                enter-active-class="transition-opacity duration-75 ease"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity duration-75 ease"
                leave-to-class="opacity-0"
                mode="out-in"
            >
                <div
                    v-if="loading"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4"
                >
                    <TileCard
                        v-for="n in perpage"
                        :key="n"
                        loading
                        aspect="video"
                        show-media
                        hide-action
                        :skeleton-lines="2"
                    />
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
                    <TileCard
                        v-for="item in activityItems"
                        :key="item!.id"
                        :title="item!.summary ?? ''"
                        :date="item!.begin"
                        aspect="video"
                        hide-action
                        show-media
                        :image="imageSrc(item?.imageIcon, false)"
                        placeholder="/images/placeholder/shape.svg"
                        fit="contain"
                        :label="{
                            color: item!.activityLabel?.color ?? '1d428a',
                            text: item!.activityLabel?.name ?? '',
                        }"
                        :to="{ name: 'singleactivities', params: { id: item!.id } }"
                    >
                        <div
                            class="line-clamp-2"
                            v-html="excerpts[item!.id]"
                            v-if="excerpts[item!.id]"
                        ></div>
                    </TileCard>
                </div>
            </Transition>
            <Pagination
                v-if="totalCount || loading"
                v-bind="query"
                :loading="loading"
                :totalCount="totalCount!"
                :limit="perpage"
                :rowsPerPage="[perpage, 10]"
            />
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGettext } from 'vue3-gettext'
import SectionCard from '../ui/SectionCard.vue'
import Pagination from '../ui/Pagination.vue'
import TileCard from '../ui/TileCard.vue'
import { useQuery } from '@/composables/queries'
import { markedText } from '@/functions/functions.ts'
import { imageSrc } from '@/composables/util'
const { $gettext } = useGettext()
const perpage = ref(6)

const query = useQuery('upcomingActivities', { limit: perpage.value, beginDate: new Date() })
const { result, loading } = query
const queryResults = computed(() => result.value?.activities)
const activityItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => queryResults.value?.totalCount)

/** Short description per activity, rendered once so the tiles have a body. */
const excerpts = ref<Record<string, string>>({})

watch(
    activityItems,
    async (items) => {
        if (!items) {
            return
        }

        const rendered: Record<string, string> = {}

        for (const item of items) {
            if (item?.id && item.description) {
                rendered[item.id] = await markedText(item.description)
            }
        }

        excerpts.value = rendered
    },
    { immediate: true },
)
</script>
