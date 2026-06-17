<template>
    <div v-if="props.lines == 1" class="flex flex-col">
        <Skeleton height="1.5rem" />
    </div>
    <div v-else-if="props.lines > 1" :class="`gap-${props.gap}`">
        <Skeleton v-for="_ in (props.lines - 1)" height="1.5rem" />
        <Skeleton height="1.5rem" width="30%" />
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    lines?: number,
    gap?: number,
}>(), {
    lines: 3,
    gap: 4
})

</script>

<style></style>
