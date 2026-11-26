<template>
    <button
        type="button"
        class="cursor-pointer border-0 bg-transparent p-0 [&_svg]:size-[1.8rem]"
        @click="switchTheme"
        :aria-label="title"
        :title="title"
    >
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
const gettext = useGettext()
const { $gettext } = gettext

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
