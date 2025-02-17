<template>
    <Toast />

    <Header />

    <RouterView />

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

<style lang="scss"></style>
