<template>
    <!-- Prose line boxes, not font sizes: body text renders at ~2.3rem per line
         (15.36px at a 1.45 line height), so a bar is 2.2rem with a hair of gap.
         The gap is static because a composed class (gap-${props.gap}) is never
         emitted by Tailwind. -->
    <div v-if="props.lines == 1" class="flex flex-col">
        <Skeleton height="2.2rem" />
    </div>
    <div v-else-if="props.lines > 1" class="flex flex-col gap-[0.12rem]">
        <Skeleton v-for="_ in props.lines - 1" height="2.2rem" />
        <Skeleton height="2.2rem" width="30%" />
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        lines?: number
    }>(),
    {
        lines: 3,
    },
)
</script>
