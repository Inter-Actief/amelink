<template>
    <div class="ia_section gray">
        <div class="ia_row">
            <div class="ia_column">
                <h1>Search Results for: {{ search }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['search'])
</script>
