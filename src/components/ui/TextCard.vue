<template>
    <Card class="p-4">
        <template #header v-if="props.image">
            <img :src="`/src/assets/images/${props.image}`" />
        </template>
        <template #title v-if="props.title">
            <span class="!text-5xl !font-semibold text-slate-950 dark:!text-color">{{ props.title }}</span>
        </template>
        <template #subtitle v-if="props.subtitle">{{ props.subtitle }}</template>
        <template #content>
            <p class="m-0">
                <slot />
            </p>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <slot name="footer"></slot>
            </div>
        </template>
    </Card>

</template>

<script setup lang="ts">
import Card from 'primevue/card';
const props = defineProps<{
    image?: string,
    title?: string,
    subtitle?: string,
    label?: {
        color: string,
        text: string
    },
    readmore: boolean
}>();

</script>

<style scoped></style>
