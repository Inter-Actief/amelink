<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { formattedDataShort } from '@/functions/functions.ts'
import { useGettext } from 'vue3-gettext'
import { Camera, Search, X } from '@lucide/vue'
import { useQuery } from '@/composables/queries'
import PastActivitiesPlaceholder from '../placeholder/PastActivitiesPlaceholder.vue'

const { $gettext } = useGettext()
const limit = ref(20)
const searchQuery = ref('')
const query = useQuery('pastActivities', {
    limit: limit.value,
    endDate: new Date(),
    search: searchQuery.value.trim(),
})
const { result, refetch, loading } = query
const count = computed(() => result.value?.activities?.totalCount)

const first = ref(0) // first record index
const loadCounter = ref(0)

query.onResult(() => {
    loadCounter.value += 1
})

const queryItems = computed(() =>
    result.value?.activities?.results.map((r) => ({
        id: r?.id,
        description: r?.description,
        startDate: formattedDataShort(r?.begin),
        summary: r?.summary,
        hasPhotos: r?.photos == undefined ? false : r?.photos.length > 0,
    })),
)

// Typing should not fire a request per keystroke, and a new filter always
// restarts at the first page.
let debounce: ReturnType<typeof setTimeout> | undefined
watch(searchQuery, (value) => {
    clearTimeout(debounce)
    debounce = setTimeout(async () => {
        first.value = 0
        await refetch({
            limit: limit.value,
            offset: 0,
            endDate: new Date(),
            search: value.trim(),
        })
    }, 300)
})

onBeforeUnmount(() => clearTimeout(debounce))

const onPage = async (event: DataTablePageEvent) => {
    first.value = event.first
    await refetch({
        limit: event.rows,
        offset: event.first,
        endDate: new Date(),
        search: searchQuery.value.trim(),
    })
}
</script>

<template>
    <!-- Search is a toolbar of the table itself: full width, flush against the
         header row so the two read as one surface. Focus is shown by a faint
         filled background and by the magnifier turning primary. -->
    <div
        role="search"
        class="group flex items-center gap-2 bg-[var(--p-content-background,#fff)] px-4 transition-colors focus-within:bg-[var(--p-form-field-filled-focus-background,#f8fafc)]"
    >
        <Search
            class="size-7 shrink-0 text-[var(--p-text-muted-color,#64748b)] transition-colors group-focus-within:text-primary"
            aria-hidden="true"
        />
        <input
            v-model="searchQuery"
            type="search"
            autocomplete="off"
            :aria-label="$gettext('Zoek activiteiten')"
            :placeholder="$gettext('Zoek activiteiten')"
            class="w-full min-w-0 bg-transparent py-2.5 text-body text-[var(--p-text-color,#1e1e1e)] outline-none placeholder:text-[var(--p-text-muted-color,#64748b)]"
        />
        <button
            v-if="searchQuery"
            type="button"
            :aria-label="$gettext('Clear search')"
            class="grid size-9 shrink-0 place-items-center rounded-full text-[var(--p-text-muted-color,#64748b)] transition-colors hover:bg-[var(--p-content-hover-background,#f1f5f9)] hover:text-[var(--p-text-color,#1e1e1e)]"
            @click="searchQuery = ''"
        >
            <X class="size-6" aria-hidden="true" />
        </button>
    </div>

    <!-- Past activites placeholder only show on first load, changing pagination activates dataTable loading -->
    <PastActivitiesPlaceholder v-if="loading && !queryItems" />
    <!-- v-model:filters="filters"  -->
    <DataTable
        filterDisplay="menu"
        :loading="loading"
        size="large"
        stripedRows
        v-if="queryItems"
        :value="queryItems"
        paginator
        :rows="limit"
        :totalRecords="count!"
        lazy
        @page="onPage"
        :rowsPerPageOptions="[10, 20, 30, 50, 100]"
    >
        <Column field="startDate" :header="$gettext('Date')" style="width: 15%" class="font-mono">
        </Column>

        <Column field="summary" :header="$gettext('Activity')">
            <template #body="props">
                <RouterLink :to="{ name: 'singleactivities', params: { id: props.data.id } }">
                    <span class="link">{{ props.data.summary }}</span>
                </RouterLink>
            </template>
        </Column>

        <Column field="hasPhotos" style="width: 10%">
            <template #header>
                <Camera />
            </template>

            <template #body="props">
                <div v-if="props.data.hasPhotos">
                    <RouterLink
                        :to="{ name: 'singleactivitiesphotos', params: { id: props.data.id } }"
                    >
                        <span class="link">{{ $gettext('Photos') }}</span>
                    </RouterLink>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<style scoped>
/* The clear affordance is the X button, not the browser's own cancel icon. */
input[type='search']::-webkit-search-cancel-button {
    appearance: none;
}
</style>
