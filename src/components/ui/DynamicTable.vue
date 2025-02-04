<template>
    <div class="table-container">
        <div class="inner">
            <table :style="tableStyle">
                <thead>
                <tr>
                    <th v-for="(column, index) in columns"
                        :key="column.key" :class="[{'sticky': index < stickyColumns}]"
                        :style="[column.width ? `width: ${column.width}rem` : '', column.minWidth ? `min-width: ${column.minWidth}rem` : '' ]">
                        {{ column.label }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td v-for="(column, index) in columns" :key="column.key" :class="{'sticky': index < stickyColumns}">
                        {{ row[column.key] }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import {computed, defineProps } from 'vue'

const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => []
    },
    rows: {
        type: Array,
        required: true,
        default: () => []
    },
    minWidth: {
        type: Number,
        required: false,
        default: 40,
    },
    stickyColumns: {
        type: Number,
        required: false,
        default: 1
    }
});

const tableStyle = computed(() => ({
    'min-width': `${props.minWidth}rem`
}));

</script>

<style scoped lang="scss">
.table-container {
    display: grid;
    .inner {
        overflow-x: auto;
        table {
            page-break-inside: avoid;
            width: 100%;
            border-collapse: collapse;

            th, td {
                border: 0;
                padding: 1.5rem 2rem;
                text-align: left;

                &.sticky {
                    position: sticky;
                    left: 0;
                    z-index: 1;
                }
            }

            th {
                background-color: $primary-color;
                color: $text-color-light;

                &:first-child {
                    border-radius: $border-radius 0 0 0;
                }
                &:last-child {
                    border-radius: 0 $border-radius 0 0;
                }
            }

            tr:nth-child(odd) td {
                background-color: $color_white;
            }
            tr:nth-child(even) td {
                background-color: $color_light;
            }


        }
    }
}

</style>