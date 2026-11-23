<template>
    <SectionCard :name="$gettext('Upcoming Activities')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'activities', params: {} }" class="link">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </template>
        <template #content>
            <Transition name="fade" mode="out-in">
                <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-3 pb-5">
                    <HorizontalCard v-for="n in perpage" :key="n" :loading="true" :loadingOpts="{
                        image: true,
                        title: true,
                        readmore: true,
                        contentLines: 1
                    }" />
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3 pb-5">
                    <HorizontalCard v-for="item in activityItems" :key="item!.id"
                        :image="imageSrc(item?.imageIcon, false)" :title="item!.summary ?? ''"
                        :body="formattedData(item!.begin)"
                        :to="{ name: 'singleactivities', params: { id: item!.id } }" />
                </div>
            </Transition>
            <Pagination v-if="totalCount" v-bind="query" :totalCount="totalCount!" :limit="perpage"
                :rowsPerPage="[perpage, 10]" />
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGettext } from 'vue3-gettext'
import SectionCard from '../ui/SectionCard.vue'
import Pagination from '../ui/Pagination.vue'
import HorizontalCard from '../ui/HorizontalCard.vue'
import { formattedData } from '@/functions/functions.ts'
import { useQuery, useQueryAsync } from '@/composables/queries'
import { imageSrc } from '@/composables/util'
const { $gettext } = useGettext();
const perpage = ref(6)

const query = useQuery("upcomingActivities", { limit: perpage.value, beginDate: new Date() })
const { result, loading } = query;
const queryResults = computed(() => result.value?.activities)
const activityItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => queryResults.value?.totalCount)
</script>

<style></style>
