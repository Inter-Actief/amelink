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

const icon = computed(() => {
    switch (theme.value) {
        case 'light':
            return Sun
        case 'dark':
            return Moon
        default:
            return MonitorCog
    }
})

const title = computed(() => {
    switch (theme.value) {
        case 'light':
            return 'Light mode'
        case 'dark':
            return 'Dark mode'
        default:
            return 'Use system theme'
    }
})
</script>

<style scoped>
.clickable {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
}
</style>
