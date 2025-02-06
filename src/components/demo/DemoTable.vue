<template>
    <div>
        <DynamicTable :columns="columns" :rows="rows" :min-width="100" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DynamicTable from '@/components/ui/DynamicTable.vue'

const columns = ref([
    { key: 'name', label: 'Name', minWidth: 10 },
    { key: 'age', label: 'Age', width: 5 },
    { key: 'email', label: 'Email' },
])

const rows = ref([
    { id: 1, name: 'John Doe', age: 30, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
])
</script>
