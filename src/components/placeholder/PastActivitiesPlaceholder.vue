<template>
    <DataTable
        filterDisplay="menu"
        size="large"
        stripedRows
        :value="skeletonItems"
        paginator
        :rows="20"
        :totalRecords="20"
        lazy
        :rowsPerPageOptions="[10, 20, 30, 50, 100]"
    >
        <!-- A real row is one line box plus cell padding (~48px) on a wide
             screen and two on a phone (~65px); the wrapper reserves that, the
             bar only stands in for the text. -->
        <Column field="startDate" :header="$gettext('Date')" style="width: 15%" class="font-mono">
            <template #body>
                <div class="flex h-[4.8rem] md:h-[3rem] items-center">
                    <Skeleton height="2.3rem" />
                </div>
            </template>
        </Column>

        <Column field="summary" :header="$gettext('Activity')">
            <template #body>
                <div class="flex h-[4.8rem] md:h-[3rem] items-center">
                    <Skeleton height="2.3rem" />
                </div>
            </template>
        </Column>

        <Column field="hasPhotos" style="width: 10%">
            <template #header>
                <Camera />
            </template>

            <template #body>
                <div class="flex h-[4.8rem] md:h-[3rem] items-center">
                    <Skeleton height="2.3rem" width="4rem" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import { Camera } from '@lucide/vue'
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()

const skeletonItems = ref(Array.from({ length: 20 }, () => ({})))
</script>
