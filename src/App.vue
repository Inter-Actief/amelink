<template>
    <ProgressBar
        v-if="isLoading"
        mode="indeterminate"
        class="fixed left-0 top-0 z-[9999] h-[6px] w-full"
    />
    <div>
        <Toast />
        <Header />
        <Suspense>
            <template #default>
                <Transition name="route-fade" mode="out-in">
                    <RouterView :key="router.currentRoute.value.fullPath" />
                </Transition>
            </template>
            <template #fallback>
                <div class="flex min-h-screen w-full items-center justify-center">
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
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from 'primevue/toast'
import { useLanguageStore } from './stores/languageStore'
import { useThemeStore } from './stores/themeStore'
import LogoSlider from './components/logos/LogoSlider.vue'
import Content from './components/ui/Content.vue'
import { useLoadingStore } from './stores/loadingStore.ts'
import { storeToRefs } from 'pinia'
import { registerToast } from './services/toast.ts'
import { useToast } from 'primevue/usetoast'

const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const router = useRouter()
languageStore.loadLanguage()
themeStore.initialiseTheme()

const loading = useLoadingStore()
const { isLoading } = storeToRefs(loading)

registerToast(useToast())
</script>
