<template>
    <div class="flex pb-4 justify-between items-end">
        <h2>{{ $gettext('Past activities') }}</h2>
        <InputText v-model="filters['global'].value" :placeholder="$gettext('Zoek activiteiten')" />
        <!-- TODO: InputText implementation -->
    </div>
    <ProgressSpinner v-if="loading && loadCounter == 0" />
    <DataTable v-model:filters="filters" filterDisplay="menu" :loading="loading" size="large" stripedRows
        v-if="queryItems" :value="queryItems" paginator :rows="limit" :totalRecords="count!" lazy @page="onPage"
        :rowsPerPageOptions="[10, 20, 30, 50, 100]">
        <Column field="startDate" :header="$gettext('Date')" style="width: 15%;" class="font-mono font-bold">
        </Column>
        <Column field="summary" :header="$gettext('Activity')">
            <template #body="props">
                <RouterLink :to="{ name: 'singleactivities', params: { id: props.data.id } }">
                    <span class="link">{{ props.data.summary }}</span>
                </RouterLink>
            </template>
        </Column>
        <Column field="hasPhotos" style="width: 10%;">
            <template #header>
                <Camera />
            </template>
            <template #body="props">
                <div v-if="props.data.hasPhotos">
                    <RouterLink :to="{ name: 'singleactivitiesphotos', params: { id: props.data.id } }">
                        <span class="link">{{ $gettext("Photos") }}</span>
                    </RouterLink>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import { computed, ref } from 'vue'
import { formattedDataShort, getItemValue } from '@/functions/functions.ts'
import { useGettext } from 'vue3-gettext'
import { Camera } from 'lucide-vue-next';
import { useQuery } from '@/composables/queries';

const { $gettext } = useGettext();
const limit = ref(20);
const query = useQuery('pastActivities', { limit: limit.value, endDate: new Date() })
const { result, refetch, loading } = query;
const count = computed(() => {
    return result.value?.activities?.totalCount;
})

const first = ref(0) // first record index
const loadCounter = ref(0);

query.onResult(() => {
    loadCounter.value += 1;
})

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

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
</script>

<style scoped></style>
