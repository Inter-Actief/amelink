<template>
    <div class="w-full py-5" :class="props.light ? 'bg-[var(--p-page-highlight)]' : ''">
        <div class="mx-auto w-full max-w-[var(--content-max-width)] px-[1.5rem] md:px-[2.5rem]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    light?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    light: false,
})
</script>
