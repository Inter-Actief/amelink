<template>
    <div class="ia_section static">
        <div class="ia_row">
            <div class="ia_column">
                <PhotosActivities :id="props.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PhotosActivities from '@/components/activities/PhotosActivities.vue'

const props = defineProps(['id'])
</script>

<style scoped lang="scss"></style>
