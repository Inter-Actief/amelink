<template>
    <SectionCard :name="$gettext('Upcoming Activities')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'activities', params: {} }" class="link">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </template>
        <template #content>
            <!-- <ProgressSpinner v-if="loading" /> -->
            <div class="grid gap-10 grid-cols-4 pb-10">
                <template v-for="item in activityItems" :key="item.id">
                    <TextCard :image="imageSrc(item?.imageIcon!)" :title="item!.summary ?? ''"
                        :routerLink="{ to: { name: 'singleactivities', params: { id: item!.id } } }"
                        :subtitle="formattedData(item!.begin)"
                        :label="{ color: item!.activityLabel.color, text: getItemValue(item!.activityLabel, 'name') as string }">
                        <!-- {{ excerptText(getItemValue(item, 'description')) }} -->
                    </TextCard>
                </template>
            </div>
            <Pagination v-if="totalCount" v-bind="query" :totalCount="totalCount!" :limit="perpage"
                :rowsPerPage="[4]" />
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore.ts'
import SectionCard from '../ui/SectionCard.vue'
import Pagination from '../ui/Pagination.vue'
import TextCard from '../ui/TextCard.vue'
import { formattedData, excerptText, getItemValue } from '@/functions/functions.ts'
import type { LatestActivitiesQueryQuery } from '@/gql/graphql'
const { $gettext } = useGettext();
const queries = useQueryStore();
const perpage = ref(4)

const query = queries.getUpcomingActivitiesQuery({ limit: perpage.value, beginDate: new Date() });
const { result, refetch, loading } = query;
const queryResults = computed(() => result.value?.activities)
const activityItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => queryResults.value?.totalCount)

type ActivityItemType = NonNullable<
    NonNullable<LatestActivitiesQueryQuery["activities"]>["results"][number]
>;

const imageSrc = (src: string | null | undefined) => {
    if (!src) {
        return '/src/assets/images/placeholder.jpg'
    }

    return `${import.meta.env.VITE_AMELIE_MEDIA_URL}${src}`
}
</script>

<style scoped lang="scss"></style>
