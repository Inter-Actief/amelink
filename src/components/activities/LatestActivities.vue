<template>
    <!-- Latest activities are the most recent activities with pictures -->
    <!-- Component can be borrowed / modified to do upcoming activities as well (with a different query) -->
    <SectionCard :name="$gettext('Latest activities')" pageBg>
        <template #info>
            <RouterLink :to="{ name: 'activities', params: {} }" class="link">
                {{ $gettext('View all activities') }}
            </RouterLink>
        </template>
        <template #content>
            <ProgressSpinner v-if="loading" />
            <div class="grid gap-10 grid-cols-3 pb-10">
                <template v-for="item in activityItems" :key="item.id">
                    <TextCard :image="getItemRandomPhoto(item!)" :title="item!.summary ?? ''"
                        :routerLink="getRouterLinkTo(item!)" :subtitle="formattedData(item!.begin)"
                        :label="{ color: item!.activityLabel.color, text: getItemValue(item!.activityLabel, 'name') as string }">
                        {{ excerptText(getItemValue(item, 'description')) }}
                    </TextCard>
                </template>
            </div>
            <Pagination v-if="totalCount" v-bind="query" :totalCount="totalCount!" :limit="perpage"
                :rowsPerPage="[3, 6, 9, 12, 15]" />
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
const perpage = ref(6)

const query = queries.getLatestActivities({ limit: perpage.value, startDate: new Date() });
const { result, refetch, loading } = query;
const queryResults = computed(() => result.value?.activities)
const activityItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => queryResults.value?.totalCount)

type ActivityItemType = NonNullable<
    NonNullable<LatestActivitiesQueryQuery["activities"]>["results"][number]
>;

const getRouterLinkTo = (item: ActivityItemType) => {
    if (item.photos.length == 0) {
        return { to: { name: 'singleactivities', params: { id: item!.id } } }
    }

    return { to: { name: 'singleactivitiesphotos', params: { id: item!.id } } }
}

const getItemRandomPhoto = (item: ActivityItemType) => {
    if (item.photos.length == 0) {
        return '/src/assets/images/placeholder.jpg'
    }

    const photoSrc = item.photos[Math.floor(Math.random() * item.photos.length)].thumbMedium!
    return imageSrc(photoSrc);
}

const imageSrc = (src: string | null | undefined) => {
    if (!src) {
        return '/src/assets/images/placeholder.jpg'
    }

    return `${import.meta.env.VITE_AMELIE_MEDIA_URL}${src}`
}
</script>

<style scoped lang="scss"></style>
