<template>
    <ProgressBar v-if="isLoading" mode="indeterminate"
        style="height: 6px; position: fixed; top: 0; left: 0; width: 100%; z-index: 9999" />
    <div>
        <Toast />
        <Header />
        <Suspense @resolve="onSuspenseResolve" @fallback="onSuspenseFallback">
            <template #default>
                <Transition name="route-fade" mode="out-in">
                    <RouterView :key="router.currentRoute.value.fullPath" />
                </Transition>
            </template>
            <template #fallback>
                <div class="suspense-loading">
                    <div class="loading-spinner"></div>
                </div>
            </template>
        </Suspense>
        <Content light v-if="router.currentRoute.value.name != 'home'">
            <LogoSlider />
        </Content>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from 'primevue/toast';
import { useLanguageStore } from './stores/languageStore';
import { useThemeStore } from './stores/themeStore';
import LogoSlider from './components/logos/LogoSlider.vue';
import Content from './components/ui/Content.vue';
import { useLoadingStore } from './stores/loadingStore.ts';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const languageStore = useLanguageStore();
const themeStore = useThemeStore();
const router = useRouter();
languageStore.loadLanguage();
themeStore.initialiseTheme();

const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

</script>

<style>
html,
body {
    background-color: var(--p-page-background);
}

/* Enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.08s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Suspense loading state */
.suspense-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--p-primary-color, #7c3aed);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
