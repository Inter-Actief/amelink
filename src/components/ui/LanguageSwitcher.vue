<template>
    <button
        type="button"
        class="cursor-pointer border-0 bg-transparent p-0 [&_img]:block [&_img]:h-auto [&_img]:w-[1.8rem] [&_img]:rounded-[var(--border-radius)]"
        :aria-label="`${$gettext('Language')}: ${currentLanguage}`"
        :title="`${$gettext('Language')}: ${currentLanguage}`"
        @click="cycleLanguage"
    >
        <img :src="`/images/flags/${currentLanguage}.svg`" alt="" />
    </button>
</template>

<script setup lang="ts">
import { closeMobileMenu } from '@/functions/functions'
import { useLanguageStore } from '@/stores/languageStore'
import { useGettext } from 'vue3-gettext'
import { computed } from 'vue'

const { $gettext } = useGettext()
const langStore = useLanguageStore()

const currentLanguage = computed(() => langStore.currentLanguage)

/** With only two languages the toggle can simply cycle to the other one. */
function cycleLanguage() {
    langStore.switchLanguage()
    closeMobileMenu()
}
</script>
