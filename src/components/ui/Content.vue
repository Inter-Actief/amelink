<template>
    <div class="w-full py-5" :style="props.light ? 'background: var(--p-page-highlight);' : ''">
        <div class="page-container">
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
