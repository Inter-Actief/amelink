<template>
    <Paginator :rows="limit" :totalRecords="totalCount" :rowsPerPageOptions="rowsPerpageOptions" @page="handlePage" />
</template>

<script lang="ts" setup>
import type { UseQueryReturn } from '@vue/apollo-composable';
import Paginator, { type PageState } from 'primevue/paginator';
import { computed, ref } from 'vue';
// Accept necessary props
//TODO: Type according to query definition
const props = defineProps<UseQueryReturn<any, any> & {
    totalCount: number,
    limit: number,
    rowsPerPage?: Array<number>
}>()

const limit = ref(props.limit)
const page = ref(0);

let rowsPerpageOptions = props.rowsPerPage ?? [10, 20, 30, 50]
rowsPerpageOptions.push(limit.value);
rowsPerpageOptions = rowsPerpageOptions.sort((a, b) => a - b)
rowsPerpageOptions = [...new Set(rowsPerpageOptions)]; // make unique

const handlePage = (e: PageState) => {
    // Watch will refetch
    page.value = e.page
    limit.value = e.rows
    props.refetch({
        limit: limit.value,
        offset: limit.value * e.page
    })
}

</script>

<style></style>
