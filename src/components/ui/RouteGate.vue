<template>
    <div>
        <div ref="gate" data-route-gate :style="{ visibility: hidden ? 'hidden' : undefined }">
            <slot />
        </div>

        <RouteLoadingOverlay v-if="hidden" />
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'
import RouteLoadingOverlay from '@/components/ui/RouteLoadingOverlay.vue'

/**
 * With reduced motion on, a visitor is only shown a page that is finished
 * assembling. The route is mounted and its queries run, but it is not painted
 * until three things have happened:
 *
 *  1. its first requests have settled (the loading store goes idle),
 *  2. the resulting DOM has been laid out and painted once, and
 *  3. every image in it has been decoded, so nothing pops in afterwards.
 *
 * Without step 3 the page appears and then fills in its pictures, which is
 * exactly the motion this mode exists to remove. The wait is capped: a slow
 * image must never hold a page back indefinitely.
 *
 * The gate is only ever active on a route's *first* load — pagination and
 * background refetches must not blank a page the visitor is reading.
 */
const loading = useLoadingStore()
const reducedMotionStore = useReducedMotionStore()

const reducedMotion = computed(() => reducedMotionStore.reducedMotion)

const gate = ref<HTMLElement | null>(null)
const hidden = ref(false)

/** Longest a page may be held back while waiting for its images. */
const MEDIA_WAIT_MS = 4000

/** Routes without queries have nothing to wait for; reveal them anyway. */
const IDLE_GRACE_MS = 300

let awaiting = false
let idleTimer: ReturnType<typeof setTimeout> | undefined

/** Bumped by every reveal so a superseded one cannot unhide the page. */
let revealToken = 0

const clearIdleTimer = () => {
    if (idleTimer !== undefined) {
        clearTimeout(idleTimer)
        idleTimer = undefined
    }
}

/** Resolves once layout has been computed and the frame has been painted. */
const afterPaint = () =>
    new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })

/** Decodes one image, resolving on failure too: a broken image is not a wait. */
const decodeImage = (image: HTMLImageElement) =>
    typeof image.decode === 'function'
        ? image.decode().catch(() => undefined)
        : Promise.resolve(undefined)

/**
 * Resolves when the subtree's images are decoded and its fonts are ready, or
 * after MEDIA_WAIT_MS — whichever comes first. Decoding a lazy image starts its
 * request, so this also pulls in pictures that have not been fetched yet.
 */
const waitForMedia = async (root: HTMLElement) => {
    const images = [...root.querySelectorAll('img')].map(decodeImage)
    const fonts = document.fonts?.ready ?? Promise.resolve()

    let timer: ReturnType<typeof setTimeout> | undefined
    const cap = new Promise<void>((resolve) => {
        timer = setTimeout(resolve, MEDIA_WAIT_MS)
    })

    await Promise.race([Promise.all([...images, fonts]), cap])
    clearTimeout(timer)
}

const reveal = async () => {
    if (!reducedMotion.value) {
        return
    }

    clearIdleTimer()

    const token = ++revealToken
    const root = gate.value

    if (root) {
        await nextTick()
        await afterPaint()
        await waitForMedia(root)
    }

    // A request that started while we were waiting owns the next reveal.
    if (token !== revealToken || loading.isLoading) {
        return
    }

    hidden.value = false
}

if (reducedMotion.value) {
    hidden.value = true

    // A route without queries never reports loading, so give it a moment to
    // prove otherwise and then reveal it.
    idleTimer = setTimeout(() => {
        if (!awaiting) reveal()
    }, IDLE_GRACE_MS)
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

onBeforeUnmount(() => {
    clearIdleTimer()
    revealToken++
})
</script>
