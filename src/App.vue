<template>
    <div>
        <Toast />
        <Header />
        <Suspense>
            <RouterView />
            <template #fallback>
                <div class="bg-red w-100 h-100"></div>
            </template>
        </Suspense>
        <Content light v-if="router.currentRoute.value.name != 'home'">
            <LogoSlider />
        </Content>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from 'primevue/toast';
import { useLanguageStore } from './stores/languageStore';
import { useThemeStore } from './stores/themeStore';

const languageStore = useLanguageStore();
const themeStore = useThemeStore();
const router = useRouter();
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
