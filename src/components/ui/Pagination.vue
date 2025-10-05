<template>
    <Paginator :rows="limit" :totalRecords="totalCount" :rowsPerPageOptions="rowsPerpageOptions" @page="handlePage"
        @update:rows="handleRows" />
</template>

<script lang="ts" setup>
import Paginator, { type PageState } from 'primevue/paginator';
import type { PaginatedQueryReturn } from '@/stores/queryStore';
import { computed } from 'vue';
// Accept necessary props
//TODO: Type according to query definition
const props = defineProps<PaginatedQueryReturn<any, any> & {
    totalCount: number
}>()

const limit = computed(() => props.selectedLimit.value)

let rowsPerpageOptions = [10, 20, 30, 50]
rowsPerpageOptions.push(limit.value);
rowsPerpageOptions = rowsPerpageOptions.sort((a, b) => a - b)
rowsPerpageOptions = [...new Set(rowsPerpageOptions)]; // make unique

const handlePage = (e: PageState) => {
    // Watch will refetch
    props.selectedPage.value = e.page
}

const handleRows = (value: number) => {
    props.selectedLimit.value = value;
}
</script>

<style></style>
