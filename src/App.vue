<template>
    <Header />

    <RouterView />

    <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
</script>

<style lang="scss">
@use '@/assets/styles/style.scss' as *;
</style>
