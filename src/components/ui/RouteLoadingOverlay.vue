<template>
    <!--
        Shown while a route is assembling under reduced motion. The page behind
        it is only hidden, not unmounted, so its height is kept — which means
        this has to be viewport-fixed rather than page-centred, or the mark
        would sit below the fold on a long page. The header is z-40 and stays
        on top of this.

        Everything here is static: reduced motion means no spinner, no sweep,
        no shimmer. A soft arc sits above the label, which sits beneath it.
    -->
    <div
        data-route-loading-overlay
        class="pointer-events-none fixed inset-0 z-30 flex items-center justify-center overflow-hidden"
    >
        <div class="flex flex-col items-center gap-5">
            <span
                data-overlay-label
                class="text-meta font-medium tracking-[0.16em] text-[var(--primary-color)]/55 dark:text-white uppercase opacity-40 dark:opacity-20"
            >
                {{ $gettext('Loading') }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()
</script>
