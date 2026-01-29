<template>
    <Paginator :rows="limit" :totalRecords="totalCount" :rowsPerPageOptions="rowsPerpageOptions" @page="handlePage" />
</template>

<script lang="ts" setup>
import Paginator, { type PageState } from 'primevue/paginator';
import { ref } from 'vue';

type RefetchFunction = (params: { limit: number; offset: number; page?: number }) => Promise<any> | void

const props = defineProps<{
    totalCount: number,
    limit: number,
    rowsPerPage?: Array<number>,
    refetch: RefetchFunction
}>()

const limit = ref(props.limit)
const page = ref(0);

let rowsPerpageOptions = props.rowsPerPage ?? [10, 20, 30, 50]
rowsPerpageOptions.push(limit.value);
rowsPerpageOptions = rowsPerpageOptions.sort((a, b) => a - b)
rowsPerpageOptions = [...new Set(rowsPerpageOptions)]; // make unique

const handlePage = async (e: PageState) => {
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
