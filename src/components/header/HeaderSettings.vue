<template>
    <!--
        Language and theme live behind one button: the two controls together need
        ~100px in the navigation bar, which is space the ten menu labels need.
    -->
    <button type="button" class="hdr-settings grid place-items-center" :aria-label="$gettext('Settings')" :title="$gettext('Settings')"
        aria-haspopup="true" aria-controls="header-settings" @click="toggle">
        <Settings />
    </button>

    <Popover ref="popover" id="header-settings">
        <div class="flex flex-col gap-3 p-1">
            <div class="flex flex-col gap-1">
                <span class="text-meta font-semibold uppercase tracking-wide">{{ $gettext('Language') }}</span>
                <LanguageSwitcher class="w-48" />
            </div>
            <div class="flex items-center justify-between gap-4">
                <span class="text-meta font-semibold uppercase tracking-wide">{{ $gettext('Theme') }}</span>
                <ThemeSwitcher class="settings-theme" />
            </div>
        </div>
    </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGettext } from 'vue3-gettext'
import Popover from 'primevue/popover'
import { Settings } from '@lucide/vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'

const { $gettext } = useGettext()
const popover = ref()

function toggle(event: Event) {
    popover.value.toggle(event)
}
</script>

<style scoped>
.hdr-settings {
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 0.4rem;
    color: inherit;
    cursor: pointer;
    transition: background-color 160ms ease;
}

.hdr-settings:hover {
    background: rgba(255, 255, 255, 0.16);
}

.hdr-settings :deep(svg),
.hdr-settings svg {
    width: 1.8rem;
    height: 1.8rem;
}
</style>
