<template>
    <Card class="text-card" style="height: 100%;">
        <template #header>
            <!-- <img v-image-error class="rounded-t-lg w-auto mx-auto p-12 max-h-80" /> -->
            <skeleton :height="`${randomheight}rem`"></skeleton>
        </template>
        <template #title>
            <div class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                <Skeleton height="4rem"></Skeleton>
            </div>
        </template>
        <template #subtitle>
            <div class="pl-4 pr-4 pt-2">
                <placeholder-text :lines="4" />
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import type Skeleton from 'primevue/skeleton';
import PlaceholderText from './PlaceholderText.vue';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const randomheight = getRandomInt(10, 20)

</script>

<style></style>
