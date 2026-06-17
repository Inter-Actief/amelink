<template>
    <Card class="text-card" style="height: 100%;">
        <template #header>
            <Skeleton class="aspect-a4! rounded-t-lg w-full" height="40rem">
            </Skeleton>
        </template>
        <template #title>
            <div class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                <Skeleton height="4rem"></Skeleton>
            </div>
        </template>
        <template #subtitle>
            <div class="pl-4 pr-4">
                <Skeleton height="2rem"></Skeleton>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import type Skeleton from 'primevue/skeleton';


</script>

<style></style>
