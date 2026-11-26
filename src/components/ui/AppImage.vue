<template>
    <img v-image-error="props.placeholder" :src="resolved" :alt="props.alt ?? ''"
        :loading="props.eager ? 'eager' : 'lazy'" :fetchpriority="props.eager ? 'high' : undefined"
        decoding="async" :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { imageSrc } from '@/composables/util'

/**
 * The aspect ratios that content images are allowed to reserve.
 *
 * These are spelled out instead of being built from a prop (`aspect-[${x}]`)
 * because Tailwind only generates the classes it can find as literal text: a
 * composed class name silently resolves to nothing and the image then has no
 * reserved box, which is both a layout shift and a skeleton that cannot match.
 */
export type ImageAspect = 'a4' | '5/3' | '4/3' | '16/9' | 'square'

const ASPECT_CLASS: Record<ImageAspect, string> = {
    a4: 'aspect-a4',
    '5/3': 'aspect-5/3',
    '4/3': 'aspect-4/3',
    '16/9': 'aspect-video',
    square: 'aspect-square',
}

interface Props {
    /** Media path as the API returns it, or an absolute URL. */
    src?: string | null
    alt?: string
    /** Reserves the final box before the bytes arrive. Set this on every content image. */
    aspect?: ImageAspect
    /** Above-the-fold images must not be lazy: they are the LCP candidate. */
    eager?: boolean
    fit?: 'cover' | 'contain'
    /** Shown when the image fails to load. Defaults to the shared placeholder. */
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    fit: 'cover',
    eager: false,
})

const resolved = computed(() => {
    const src = props.src

    if (!src) {
        return undefined
    }

    // The API mixes media-relative paths with absolute upload URLs.
    if (/^(https?:)?\/\//.test(src) || src.startsWith('/') || src.startsWith('data:')) {
        return src
    }

    return imageSrc(src)
})

const classes = computed(() => [
    // With a reserved box the image always fills its container's width, which is
    // what makes the height predictable.
    props.aspect ? ['w-full', ASPECT_CLASS[props.aspect]] : '',
    props.fit === 'contain' ? 'object-contain' : 'object-cover',
])
</script>
