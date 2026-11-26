<template>
    <!-- Use a single div for fall-through props like class -->
    <div>
        <Card :style="{ overflow: 'hidden', background: bg, height: props.maxHeight ? '100%' : undefined }">
            <template #header v-if="props.name || props.loading">
                <div class="section-bar w-full mb-0 flex flex-row items-center">
                    <div class="flex flex-1 min-w-0 items-center gap-3 px-3 py-2">
                        <div v-if="props.name && !loading"
                            class="font-extrabold text-section! my-auto text-primary-contrast truncate">
                            {{ props.name }}
                        </div>
                        <Skeleton v-if="props.loading" height="2rem" width="35%" />
                        <div class="ml-auto flex items-center text-primary-contrast">
                            <!-- Put e.g. a link here -->
                            <slot name="info" />
                        </div>
                    </div>
                </div>
            </template>
            <template #content>
                <slot name="content" />
            </template>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton';

interface Props {
    name?: string,
    pageBg?: boolean // if the background should be of the page or of a card
    maxHeight?: boolean, // If the card should be max possible height
    loading?: boolean
    // class: string
}

const props = withDefaults(defineProps<Props>(), {
    pageBg: false,
    maxHeight: false,
    loading: false,
    // class: "",
})


const bg = computed(() => (props.pageBg ? 'var(--p-page-background)' : ''))

</script>

<style scoped>
.section-bar {
    background: var(--p-primary-color);
    color: var(--p-primary-contrast-color);
}

</style>
