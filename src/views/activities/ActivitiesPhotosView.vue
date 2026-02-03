<template>
    <Content>
        <PhotosActivities :id="props.id" />
    </Content>
</template>

<script setup lang="ts">
import PhotosActivities from '@/components/activities/PhotosActivities.vue'

const props = defineProps(['id'])
</script>

<style scoped></style>
