<template>
    <Card class="text-card" style="height: 100%;">
        <template #content>
            <Skeleton height="20rem" />
        </template>
        <template #footer>
            <div class="flex flex-row items-center w-full justify-between pt-2 px-3 expand-link link">
                <Skeleton height="4rem" />
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import type Skeleton from 'primevue/skeleton';


</script>

<style></style>
