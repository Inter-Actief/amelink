<template>
    <!-- Use a single div for fall-through props like class -->
    <div>
        <Card :style="{ overflow: 'hidden', background: bg, height: props.maxHeight ? '100%' : undefined }">
            <template #header v-if="props.name">
                <div class="bg-primary w-full p-8 mb-0 flex flex-row justify-between">
                    <div class="font-extrabold text-4xl text-primary-contrast">
                        {{ props.name }}
                    </div>
                    <div class="self-end text-primary-contrast">
                        <!-- Put e.g. a link here -->
                        <slot name="info" />
                    </div>
                </div>
            </template>
            <template #content>
                <p class="p-4">
                    <slot name="content" />
                </p>
            </template>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Card from 'primevue/card';

interface Props {
    name?: string,
    pageBg?: boolean // if the background should be of the page or of a card
    maxHeight?: boolean, // If the card should be max possible height
    // class: string
}

const props = withDefaults(defineProps<Props>(), {
    pageBg: false,
    maxHeight: false,
    // class: "",
})


const bg = computed(() => (props.pageBg ? 'var(--p-page-background)' : ''))

</script>

<style></style>
