<template>
    <div>
        <Toast />
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from 'primevue/toast';
import { useLanguageStore } from './stores/languageStore';
import { useThemeStore } from './stores/themeStore';

const languageStore = useLanguageStore();
const themeStore = useThemeStore();
languageStore.loadLanguage();
themeStore.initialiseTheme();
</script>

<style lang="scss">
html,
body {
    background-color: var(--p-page-background);
}

/* Enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
