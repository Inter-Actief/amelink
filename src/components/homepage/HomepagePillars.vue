<template>
    <!-- The four pillar pictures from the mobile menu: each tile opens its
         section, and the pictures of a pillar change in turn. On the stacked
         layout they are hidden: the drawer already offers the same four. -->
    <div class="hidden grid-cols-2 gap-2 lg:grid">
        <RouterLink
            v-for="(pillar, index) in pillars"
            :key="pillar.labelKey"
            :to="pillar.route"
            class="group relative block overflow-hidden rounded text-inherit no-underline"
        >
            <div class="relative aspect-[3/2] w-full overflow-hidden">
                <img
                    v-for="(image, imageIndex) in pillar.images"
                    :key="image"
                    v-image-error
                    :src="image"
                    :alt="$gettext(pillar.labelKey)"
                    class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
                    :class="imageIndex === active[index] ? 'opacity-100' : 'opacity-0'"
                    loading="lazy"
                    decoding="async"
                />

                <span
                    class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-slate-900/85 via-slate-900/30 to-transparent px-2.5 pb-2 pt-8 text-white"
                >
                    <span class="text-card-title font-bold leading-none">{{
                        $gettext(pillar.labelKey)
                    }}</span>
                    <ArrowRight
                        class="size-5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                </span>
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { ArrowRight } from '@lucide/vue'
import { featuredSections } from '@/constants/pageCategories'

const { $gettext } = useGettext()

/**
 * The menu entries that carry pictures, with the section they open. Education
 * has no route of its own: its first child is the section page.
 */
const pillars = computed(() =>
    featuredSections.flatMap((item) => {
        const route = item.route ?? item.items?.[0]?.route

        return item.images?.length && route
            ? [{ labelKey: item.labelKey, route, images: item.images }]
            : []
    }),
)

/** Which picture is in front, per tile. Staggered so they do not flip at once. */
const active = ref<number[]>([])
const STEP = 4200
const STAGGER = 900

let timers: number[] = []

onMounted(() => {
    active.value = pillars.value.map(() => 0)

    // A visitor who asked for less motion keeps the first picture of each pillar.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        return
    }

    timers = pillars.value.map((pillar, index) => {
        if (pillar.images.length <= 1) {
            return 0
        }

        return window.setInterval(() => {
            active.value = active.value.map((current, tile) =>
                tile === index ? (current + 1) % pillar.images.length : current,
            )
        }, STEP + index * STAGGER)
    })
})

onUnmounted(() => {
    timers.forEach((timer) => {
        if (timer) {
            clearInterval(timer)
        }
    })
})
</script>
