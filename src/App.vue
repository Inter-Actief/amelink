<template>
    <ProgressBar
        v-if="isLoading && !reducedMotion"
        mode="indeterminate"
        class="fixed left-0 top-0 z-[9999] h-[6px] w-full"
    />
    <div>
        <Toast />
        <Header />
        <Suspense>
            <template #default>
                <Transition name="route-fade" mode="out-in">
                    <RouteGate :key="router.currentRoute.value.fullPath">
                        <RouterView />
                    </RouteGate>
                </Transition>
            </template>
            <template #fallback>
                <!-- Reduced motion: no spinner while a lazy route chunk loads. -->
                <div
                    v-if="!reducedMotion"
                    class="flex min-h-screen w-full items-center justify-center"
                >
                    <div
                        class="size-[50px] animate-spin rounded-full border-4 border-black/10 border-l-[var(--p-primary-color)]"
                    />
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
import ProgressBar from 'primevue/progressbar'
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from 'primevue/toast'
import { useLanguageStore } from './stores/languageStore'
import { useThemeStore } from './stores/themeStore'
import { useReducedMotionStore } from './stores/reducedMotionStore'
import LogoSlider from './components/logos/LogoSlider.vue'
import Content from './components/ui/Content.vue'
import RouteGate from './components/ui/RouteGate.vue'
import { useLoadingStore } from './stores/loadingStore.ts'
import { storeToRefs } from 'pinia'
import { registerToast } from './services/toast.ts'
import { useToast } from 'primevue/usetoast'

const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const reducedMotionStore = useReducedMotionStore()
const router = useRouter()
languageStore.loadLanguage()
themeStore.initialiseTheme()
reducedMotionStore.initialiseReducedMotion()

const loading = useLoadingStore()
const { isLoading } = storeToRefs(loading)
const reducedMotion = computed(() => reducedMotionStore.reducedMotion)

registerToast(useToast())
</script>
