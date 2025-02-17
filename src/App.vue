<template>
    <Toast />
    <Header />
    <Transition name="fade" mode="out-in">
        <RouterView />
    </Transition>
    <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import { useAuthStore } from './stores/authStore';
import Toast from 'primevue/toast';

const authStore = useAuthStore();
authStore.setCSRFToken();
</script>

<style lang="scss">
/* Enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
