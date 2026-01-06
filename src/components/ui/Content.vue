<template>
    <div class="w-100 py-16" :style="props.light ? 'background: var(--p-page-highlight);' : ''">
        <div class="mx-64">
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
