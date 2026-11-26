<template>
    <button type="button" class="language-toggle"
        :aria-label="`${$gettext('Language')}: ${currentLanguage}`"
        :title="`${$gettext('Language')}: ${currentLanguage}`" @click="cycleLanguage">
        <img :src="`/images/flags/${currentLanguage}.svg`" alt="" />
    </button>
</template>

<script setup lang="ts">
import { closeMobileMenu } from '@/functions/functions'
import { useLanguageStore } from '@/stores/languageStore';
import { useGettext } from 'vue3-gettext'
import { computed } from 'vue';

const { $gettext } = useGettext();
const langStore = useLanguageStore();

const currentLanguage = computed(() => langStore.currentLanguage);

/** With only two languages the toggle can simply cycle to the other one. */
function cycleLanguage() {
    langStore.switchLanguage();
    closeMobileMenu()
}
</script>

<style scoped>
.language-toggle {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.language-toggle img {
    display: block;
    width: 1.8rem;
    height: auto;
    border-radius: 0.15rem;
}
</style>
