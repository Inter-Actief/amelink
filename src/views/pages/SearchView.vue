<template>
    <div class="ia-section gray">
        <div class="ia-row">
            <div class="ia-column">
                <h1>Search Results for: {{ search }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['search'])
</script>
