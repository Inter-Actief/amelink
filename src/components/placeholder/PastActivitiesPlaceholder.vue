<template>
    <DataTable filterDisplay="menu" size="large" stripedRows :value="skeletonItems" paginator :rows="20"
        :totalRecords="20" lazy :rowsPerPageOptions="[10, 20, 30, 50, 100]">

        <Column field="startDate" :header="$gettext('Date')" style="width: 15%;" class="font-mono font-bold">
            <template #body>
                <Skeleton height="3rem" />
            </template>
        </Column>

        <Column field="summary" :header="$gettext('Activity')">
            <template #body>
                <Skeleton height="3rem" />
            </template>
        </Column>

        <Column field="hasPhotos" style="width: 10%;">
            <template #header>
                <Camera />
            </template>

            <template #body>
                <Skeleton height="3rem" width="4rem" />
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import { Camera } from '@lucide/vue';
import { useGettext } from 'vue3-gettext';

const { $gettext } = useGettext();

const skeletonItems = ref(Array.from({ length: 20 }, () => ({})));
</script>

<style></style>
