<template>
    <div class="flex flex-col gap-4">
        <Skeleton v-for="_ in props.lines" height="1.5rem" />
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    lines?: number
}>(), {
    lines: 3
})

</script>

<style></style>
