<template>
    <ProgressSpinner v-if="loading" />
    <div v-if="!loading && newsItems" v-for="item in newsItems" :key="item?.id">
        <template v-if="item">
            <div class="pb-12">
                <TextCard :title="getItemValue(item, 'summary')" :subtitle="formattedData(item.begin)"
                    :routerLink="{ to: { name: 'singleactivities', params: { id: item.id } } }"
                    :label="{ color: item.activityLabel.color, text: getItemValue(item.activityLabel, 'name') as string }">
                    {{ excerptText(getItemValue(item, 'description')) }}
                </TextCard>
            </div>
        </template>
    </div>

    <!-- <Pagination :totalItems="totalCount" :itemsPerPage="perpage" :page="page" @next="handleNextPage"
        @prev="handlePrevPage" @select="handleSelectPage" /> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formattedData, excerptText, getItemValue } from '@/functions/functions.ts'
import ProgressSpinner from 'primevue/progressspinner';
import TextCard from '../ui/TextCard.vue';
import { useQuery } from '@/composables/queries';

const perpage = ref(10)

const { result, loading } = useQuery("overviewActivities", { limit: perpage.value, startDate: new Date() });

const queryResults = computed(() => result.value?.activities)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped></style>
