<template>
    <div class="w-full py-16" :style="props.light ? 'background: var(--p-page-highlight);' : ''">
        <div class="mx-10 md:mx-32">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    light?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    light: false
})
</script>

<style scoped></style>
