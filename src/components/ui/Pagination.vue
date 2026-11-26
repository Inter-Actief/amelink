<template>
    <Paginator
        :rows="limit"
        :totalRecords="totalCount"
        :rowsPerPageOptions="rowsPerpageOptions"
        @page="handlePage"
    />
</template>

<script lang="ts" setup>
import Paginator, { type PageState } from 'primevue/paginator'
import { ref } from 'vue'

type RefetchFunction = (params: {
    limit: number
    offset: number
    page?: number
}) => Promise<any> | void

const props = defineProps<{
    totalCount: number
    limit: number
    rowsPerPage?: Array<number>
    refetch: RefetchFunction
}>()

const emit = defineEmits<{
    'update:rows': [rows: number]
}>()

const limit = ref(props.limit)

/** Copy, because the prop array must not be mutated. */
const rowsPerpageOptions = [
    ...new Set([...(props.rowsPerPage ?? [10, 20, 30, 50]), limit.value]),
].sort((a, b) => a - b)

const handlePage = (e: PageState) => {
    // Watch will refetch
    limit.value = e.rows
    emit('update:rows', e.rows)
    props.refetch({
        limit: limit.value,
        offset: limit.value * e.page,
    })
}
</script>
