<template>
    <!-- The page links only exist once the record count is known, so while the
         query runs the row is boxes of the same size instead: without this the
         buttons assemble themselves in front of the visitor, and on pages that
         hid the bar entirely the footer moved up by its height. -->
    <div
        v-if="props.loading"
        class="pagination-loading flex h-[4.5rem] items-center justify-center gap-2"
        aria-hidden="true"
    >
        <Skeleton v-for="n in 5" :key="n" height="2.5rem" width="2.5rem" />
        <Skeleton height="2.5rem" width="6rem" />
    </div>
    <Paginator
        v-else
        :rows="limit"
        :totalRecords="totalCount"
        :rowsPerPageOptions="rowsPerpageOptions"
        @page="handlePage"
    />
</template>

<script lang="ts" setup>
import Paginator, { type PageState } from 'primevue/paginator'
import Skeleton from 'primevue/skeleton'
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
    /** Passed explicitly at every call site: the query spread next to it hands
     *  over the ref that holds it, not the value. */
    loading?: boolean
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
