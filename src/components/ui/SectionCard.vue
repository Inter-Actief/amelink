<template>
    <Card style="overflow: hidden;">
        <template #header v-if="props.name">
            <div class="bg-primary w-100 h-100 p-8 font-extrabold text-4xl text-primary-contrast">
                {{ props.name }}
            </div>
        </template>
        <template #content>
            <p class="p-4">
                <slot />
            </p>
        </template>
    </Card>
</template>

<script lang="ts" setup>
interface Props {
    name?: string,
}

const props = withDefaults(defineProps<Props>(), {
})
</script>

<style></style>
