<template>
    <!-- Use a single div for fall-through props like class -->
    <div>
        <Card :style="{ overflow: 'hidden', background: bg, height: props.maxHeight ? '100%' : undefined }">
            <template #header v-if="props.name || props.loading">
                <div class="section-bar w-full mb-0 flex flex-row items-stretch">
                    <div v-if="props.index !== undefined" class="section-bar-num">{{ props.index }}</div>
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
    /** Ordinal shown in the dark square on the left, e.g. "01". Only pass it
     *  when the page really is a sequence of sections. */
    index?: string | number,
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

.section-bar-num {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.9rem;
    background: rgba(0, 0, 0, 0.28);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
}
</style>
