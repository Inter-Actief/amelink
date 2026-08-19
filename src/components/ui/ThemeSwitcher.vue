<template>
    <button class="clickable" type="button" @click="switchTheme" :aria-label="title" :title="title">
        <component :is="icon" />
    </button>
</template>

<script setup lang="ts">
import { Sun, Moon, MonitorCog } from '@lucide/vue'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { useGettext } from 'vue3-gettext'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
const { switchTheme } = themeStore
const gettext = useGettext();
const { $gettext } = gettext;

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
            return $gettext('Light mode')
        case 'dark':
            return $gettext('Dark mode')
        default:
            return $gettext('Use system theme')
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
