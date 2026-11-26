<template>
    <div class="grid">
        <div class="overflow-x-auto">
            <table :style="tableStyle" class="w-full break-inside-avoid border-collapse">
                <thead>
                    <tr>
                        <th
                            v-for="(column, index) in columns"
                            :key="column.key"
                            class="border-0 bg-primary px-8 py-6 text-left text-white first:rounded-tl-[var(--border-radius)] last:rounded-tr-[var(--border-radius)]"
                            :class="{ 'sticky left-0 z-[1]': index < stickyColumns }"
                            :style="[
                                column.width ? `width: ${column.width}rem` : '',
                                column.minWidth ? `min-width: ${column.minWidth}rem` : '',
                            ]"
                        >
                            {{ column.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.id" class="odd:bg-white even:bg-slate-100">
                        <td
                            v-for="(column, index) in columns"
                            :key="column.key"
                            class="border-0 bg-inherit px-8 py-6 text-left"
                            :class="{ 'sticky left-0 z-[1]': index < stickyColumns }"
                        >
                            {{ row[column.key] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Column {
    key: string
    label: string
    width?: number
    minWidth?: number
}

interface Row {
    id: string | number
    [key: string]: any
}

interface Props {
    columns: Column[]
    rows: Row[]
    minWidth?: number
    stickyColumns?: number
}

const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    rows: () => [],
    minWidth: 40,
    stickyColumns: 1,
})

const tableStyle = computed(() => ({
    'min-width': `${props.minWidth}rem`,
}))
</script>
