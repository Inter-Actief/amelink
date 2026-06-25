<template>
    <template v-if="loading">
        <div v-for="_ in 20">
            <div class="pb-12">
                <TextCard loading :loadingOpts="{
                    title: true,
                    label: true,
                    subtitle: true,
                    readmore: true
                }" />
            </div>
        </div>
    </template>

    <div v-if="!loading && newsItems" v-for="item in newsItems" :key="item?.id">
        <template v-if="item">
            <div class="pb-12">
                <TextCard :title="item!.summary!" :subtitle="formattedData(item.begin)"
                    :routerLink="{ to: { name: 'singleactivities', params: { id: item.id } } }"
                    :label="{ color: item!.activityLabel.color, text: item!.activityLabel!.name! }">
                    {{ excerptText(item.description!) }}
                </TextCard>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formattedData, excerptText } from '@/functions/functions.ts'
import ProgressSpinner from 'primevue/progressspinner';
import TextCard from '../ui/TextCard.vue';
import { useQuery } from '@/composables/queries';
import type Skeleton from 'primevue/skeleton';

const perpage = ref(10)

const { result, loading } = useQuery("overviewActivities", { limit: perpage.value, startDate: new Date() });

const queryResults = computed(() => result.value?.activities)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped></style>
