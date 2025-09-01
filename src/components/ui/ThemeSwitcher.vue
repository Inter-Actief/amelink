<template>
    <div>
        <Sun v-if="theme == 'light'" class="clickable" @click="switchTheme()" />
        <Moon v-else class="clickable" @click="switchTheme()" />
    </div>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

import { useThemeStore } from '@/stores/themeStore';
import { computed } from 'vue';

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);
const switchTheme = () => {
    themeStore.switchTheme();
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
