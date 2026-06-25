<template>
    <SectionCard :name="$gettext('Upcoming Activities')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'activities', params: {} }" class="link">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </template>
        <template #content>
            <Transition name="fade" mode="out-in">
                <div v-if="loading" class="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pb-10">
                    <template v-for="_ in 4">
                        <TextCard :loading="true" :loadingOpts="{
                            image: true,
                            title: true,
                            readmore: true,
                            subtitle: true,
                            contentLines: 0,
                            label: true
                        }" />
                    </template>
                </div>

                <div v-else class="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pb-10">
                    <template v-for="item in activityItems" :key="item!.id">
                        <TextCard :image="imageSrc(item?.imageIcon!)" :title="item!.summary ?? ''"
                            :routerLink="{ to: { name: 'singleactivities', params: { id: item!.id } } }"
                            :subtitle="formattedData(item!.begin)"
                            :label="{ color: item!.activityLabel.color, text: item!.activityLabel!.name! }">
                            <!-- {{ excerptText(getItemValue(item, 'description')) }} -->
                        </TextCard>
                    </template>
                </div>
            </Transition>
            <Pagination v-if="totalCount" v-bind="query" :totalCount="totalCount!" :limit="perpage"
                :rowsPerPage="[4]" />
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGettext } from 'vue3-gettext'
import SectionCard from '../ui/SectionCard.vue'
import Pagination from '../ui/Pagination.vue'
import TextCard from '../ui/TextCard.vue'
import { formattedData, getItemValue } from '@/functions/functions.ts'
import { useQuery, useQueryAsync } from '@/composables/queries'
import { imageSrc } from '@/composables/util'
const { $gettext } = useGettext();
const perpage = ref(4)

const query = useQuery("upcomingActivities", { limit: perpage.value, beginDate: new Date() })
const { result, loading } = query;
const queryResults = computed(() => result.value?.activities)
const activityItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => queryResults.value?.totalCount)
</script>

<style></style>
