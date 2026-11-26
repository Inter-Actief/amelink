<template>
    <!-- Use a single div for fall-through props like class -->
    <div>
        <Card
            class="overflow-hidden"
            :class="[
                props.pageBg ? 'bg-[var(--p-page-background)]' : '',
                props.maxHeight ? 'h-full' : '',
            ]"
            :pt="flush ? { body: { class: 'p-0' }, content: { class: 'p-0' } } : undefined"
        >
            <template #header v-if="props.name || props.loading">
                <div
                    class="mb-0 flex w-full flex-row items-center bg-primary text-primary-contrast"
                >
                    <div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
                        <component
                            :is="props.icon"
                            v-if="props.icon && !loading"
                            class="size-7 shrink-0 text-primary-contrast md:size-9"
                            :stroke-width="2.25"
                            aria-hidden="true"
                        />
                        <div
                            v-if="props.name && !loading"
                            class="my-auto min-w-0 font-extrabold text-[clamp(1.45rem,3.8vw,2.25rem)]! leading-tight text-primary-contrast"
                        >
                            {{ props.name }}
                        </div>
                        <Skeleton v-if="props.loading" height="2rem" width="35%" />
                        <div class="ml-auto flex items-center text-meta text-primary-contrast">
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
import type { Component } from 'vue'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'

interface Props {
    name?: string
    /** Lucide icon rendered in front of the section name, e.g. `Newspaper`. */
    icon?: Component
    pageBg?: boolean // if the background should be of the page or of a card
    maxHeight?: boolean // If the card should be max possible height
    loading?: boolean
    /** Drop the card padding so the content (e.g. a table and its toolbar) runs edge to edge. */
    flush?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    pageBg: false,
    maxHeight: false,
    loading: false,
    flush: false,
})
</script>
