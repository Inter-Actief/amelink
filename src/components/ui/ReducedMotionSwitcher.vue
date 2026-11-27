<template>
    <button
        type="button"
        data-reduced-motion-switcher
        class="cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent [&_svg]:size-[1.8rem]"
        :aria-label="label"
        :title="label"
        :disabled="locked"
        @click="toggleReducedMotion"
    >
        <component :is="icon" />
    </button>
</template>

<script setup lang="ts">
import { Lock, Rabbit, Snail } from '@lucide/vue'
import { computed } from 'vue'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'
import { useGettext } from 'vue3-gettext'

const { $gettext } = useGettext()
const reducedMotionStore = useReducedMotionStore()

const reducedMotion = computed(() => reducedMotionStore.reducedMotion)
const locked = computed(() => reducedMotionStore.locked)
const { toggleReducedMotion } = reducedMotionStore

const icon = computed(() => {
    if (locked.value) {
        return Lock
    }

    return reducedMotion.value ? Snail : Rabbit
})

const label = computed(() => {
    if (locked.value) {
        return $gettext('Reduced motion is on because your system requests it')
    }

    return reducedMotion.value
        ? $gettext('Reduced motion is on')
        : $gettext('Reduced motion is off')
})
</script>
