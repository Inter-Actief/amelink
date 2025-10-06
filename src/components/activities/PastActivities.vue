<template>
    <ProgressSpinner v-if="loading" />
    <DataTable size="large" stripedRows v-if="queryItems" :value="queryItems" paginator :rows="20"
        :totalRecords="count!" lazy @page="onPage">
        <Column field="startDate" :header="$gettext('Date')" style="width: 15%;" class="font-mono font-bold"></Column>
        <Column field="summary" :header="$gettext('Activity')">
            <template #body="props">
                <EpaButton class="link" :to="{ name: 'singleactivities', params: { id: props.data.id } }">
                    {{ props.data.summary }}
                </EpaButton>
            </template>
        </Column>
        <Column field="hasPhotos" style="width: 10%;">
            <template #header>
                <Camera />
            </template>
            <template #body="props">
                <div v-if="props.data.hasPhotos">
                    <EpaButton :to="{ name: 'singleactivitiesphotos', params: { id: props.data.id } }"
                        class="link readmore">
                        {{ $gettext("Photos") }}
                    </EpaButton>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import { computed, ref, watch } from 'vue'
import { formattedDataShort, getItemValue } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'
import { Camera } from 'lucide-vue-next';

const { $gettext } = useGettext();
const queries = useQueryStore();
const query = queries.getPastActivitiesQuery({ limit: 20, endDate: new Date() })
const { result, refetch, loading } = query;
const count = computed(() => {
    return result.value?.activities?.totalCount;
})

const first = ref(0) // first record index

const queryItems = computed(() => {
    return result.value?.activities?.results.map(r => {
        return {
            id: r?.id,
            description: r?.description,
            startDate: formattedDataShort(r?.begin),
            summary: getItemValue(r, 'summary'),
            hasPhotos: (r?.photos == undefined) ? false : (r?.photos.length > 0),
        }
    })
})

// Custom page event handler
const onPage = async (event: DataTablePageEvent) => {
    first.value = event.first
    // rows.value = event.rows
    await refetch({
        limit: event.rows,
        offset: event.first,
        endDate: new Date(),
    })
}
</script>

<style lang="scss" scoped></style>
