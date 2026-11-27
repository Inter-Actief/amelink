<template>
    <div>
        <div data-route-gate :style="{ visibility: hidden ? 'hidden' : undefined }">
            <slot />
        </div>

        <RouteLoadingOverlay v-if="hidden" />
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'
import RouteLoadingOverlay from '@/components/ui/RouteLoadingOverlay.vue'

/**
 * With reduced motion on, a visitor should not be shown a page that is still
 * assembling itself out of skeletons. The route is still mounted, so its
 * queries run and its layout height is kept, but nothing is painted until the
 * first requests of *this* route have settled. Later requests (pagination,
 * background refetches) never hide the page again.
 *
 * With reduced motion off the gate is a plain, always visible wrapper.
 */
const loading = useLoadingStore()
const reducedMotionStore = useReducedMotionStore()

const reducedMotion = computed(() => reducedMotionStore.reducedMotion)

const hidden = ref(false)

/** A request has started since this route mounted. */
let awaiting = false
let idleTimer: ReturnType<typeof setTimeout> | undefined

const clearIdleTimer = () => {
    if (idleTimer !== undefined) {
        clearTimeout(idleTimer)
        idleTimer = undefined
    }
}

const reveal = () => {
    clearIdleTimer()
    hidden.value = false
}

if (reducedMotion.value) {
    hidden.value = true

    // A route without queries never starts a request: reveal it after a moment
    // instead of leaving it invisible.
    idleTimer = setTimeout(() => {
        if (!awaiting) reveal()
    }, 300)
}

watch(
    () => loading.isLoading,
    (isLoading) => {
        if (isLoading) {
            awaiting = true
            clearIdleTimer()
        } else if (awaiting) {
            reveal()
        }
    },
    { immediate: true },
)

onBeforeUnmount(clearIdleTimer)
</script>
