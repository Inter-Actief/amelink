<template>
    <button class="clickable" type="button" @click="switchTheme" :aria-label="title" :title="title">
        <component :is="icon" />
    </button>
</template>

<script setup lang="ts">
import { Sun, Moon, MonitorCog } from '@lucide/vue'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
const { switchTheme } = themeStore

const icon = computed(() =>
    theme.value === 'light' ? Sun : theme.value === 'dark' ? Moon : MonitorCog
)

const title = computed(() =>
    theme.value === 'light'
        ? 'Light mode'
        : theme.value === 'dark'
        ? 'Dark mode'
        : 'Use system theme'
)
</script>

<style scoped>
.clickable {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
</style>
