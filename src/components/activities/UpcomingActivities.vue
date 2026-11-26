<template>
    <div
        class="grid w-full overflow-hidden rounded-t-[var(--border-radius)] bg-white text-slate-900"
    >
        <div class="flex justify-between bg-primary px-6 py-6 text-white">
            <span>{{ $gettext('Upcoming Activities') }}</span>
            <RouterLink :to="{ name: 'activities' }" class="link text-meta">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </div>

        <div class="grid">
            <div class="grid grid-cols-[6rem_10rem_auto] gap-4 p-6 font-bold">
                <div>{{ $gettext('Date') }}</div>
                <div>{{ $gettext('Type') }}</div>
                <div>{{ $gettext('Activity') }}</div>
            </div>

            <template v-for="item in items" :key="item?.id">
                <div
                    v-if="item"
                    class="group grid grid-cols-[6rem_10rem_auto] gap-4 p-6 even:bg-slate-100"
                >
                    <div>{{ formattedDataShort(item.begin) }}</div>
                    <div>
                        <div
                            class="rounded-[var(--border-radius)] px-4 py-1 text-center text-meta text-white"
                            :style="[`background-color: #${item.activityLabel.color}`]"
                        >
                            {{ item.activityLabel.name }}
                        </div>
                    </div>

                    <div class="grid gap-4">
                        <div class="grid gap-4">
                            <div>{{ item.summary }}</div>
                            <div class="text-meta text-slate-600">
                                {{ excerptText(item?.description ? item.description : '') }}
                            </div>
                        </div>

                        <RouterLink
                            :to="{ name: 'singleactivities', params: { id: item.id } }"
                            class="link group-hover:after:scale-x-100"
                        >
                            {{ $gettext('Enroll now!') }}
                        </RouterLink>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { excerptText, formattedDataShort } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries'

const { $gettext } = useGettext()
const perpage = ref(5)

const { result } = useQuery('upcomingActivities', { limit: perpage.value })
const queryResults = computed(() => result.value?.activities)
const items = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>
