<template>
    <Paginator :rows="10" :totalRecords="50" :rowsPerPageOptions="[10, 20, 30]" @page="handlePage" />
</template>

<script lang="ts" setup>
import Paginator, { type PageState } from 'primevue/paginator';
import type { PaginatedQueryReturn } from '@/stores/queryStore';
// Accept necessary props
//TODO: Type according to query definition
const props = defineProps<PaginatedQueryReturn<any, any>>()

const handlePage = (e: PageState) => {
    // Watch will refetch
    props.selectedPage.value = e.page
}
</script>

<style></style>
