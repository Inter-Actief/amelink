<template>
    <div class="table-container">
        <div class="inner">
            <table :style="tableStyle">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="column.key"
                            :class="[{ sticky: index < stickyColumns }]" :style="[
                                column.width ? `width: ${column.width}rem` : '',
                                column.minWidth ? `min-width: ${column.minWidth}rem` : '',
                            ]">
                            {{ column.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.id">
                        <td v-for="(column, index) in columns" :key="column.key"
                            :class="{ sticky: index < stickyColumns }">
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
    key: string;
    label: string;
    width?: number;
    minWidth?: number;
}

interface Row {
    id: string | number;
    [key: string]: any;
}

interface Props {
    columns: Column[];
    rows: Row[];
    minWidth?: number;
    stickyColumns?: number;
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

<style scoped>
.table-container {
    display: grid;
}

.table-container .inner {
    overflow-x: auto;
}

.table-container .inner table {
    page-break-inside: avoid;
    width: 100%;
    border-collapse: collapse;
}

.table-container .inner table th,
.table-container .inner table td {
    border: 0;
    padding: 1.5rem 2rem;
    text-align: left;
}

.table-container .inner table th.sticky,
.table-container .inner table td.sticky {
    position: sticky;
    left: 0;
    z-index: 1;
}

.table-container .inner table th {
    background-color: var(--primary-color);
    color: var(--text-color-light);
}

.table-container .inner table th:first-child {
    border-radius: var(--border-radius) 0 0 0;
}

.table-container .inner table th:last-child {
    border-radius: 0 var(--border-radius) 0 0;
}

.table-container .inner table tr:nth-child(odd) td {
    background-color: var(--color-white);
}

.table-container .inner table tr:nth-child(even) td {
    background-color: var(--color-light);
}
</style>
