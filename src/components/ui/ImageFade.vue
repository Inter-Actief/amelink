<template>
    <div class="relative overflow-hidden">
        <img
            v-if="previousImage"
            :key="'prev-' + previousImage"
            :src="previousImage"
            alt=""
            class="absolute inset-0 h-full w-full rounded object-cover"
        />
        <Transition
            enter-active-class="transition-opacity duration-700 ease"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-700 ease"
            leave-to-class="opacity-0"
        >
            <img
                :key="currentImage"
                :src="currentImage"
                alt="Slideshow image"
                class="absolute inset-0 h-full w-full rounded object-cover"
            />
        </Transition>
        <!-- Invisible placeholder to maintain container height -->
        <img :src="currentImage" alt="" class="invisible h-auto w-full" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
    images: string[]
    interval?: number
}

const props = withDefaults(defineProps<Props>(), {
    interval: 3000,
})

const currentIndex = ref(0)
const previousIndex = ref<number | null>(null)

const currentImage = computed(() => {
    if (props.images.length === 0) return ''
    return props.images[currentIndex.value]
})

const previousImage = computed(() =>
    previousIndex.value !== null ? props.images[previousIndex.value] : null,
)

let timer: number | undefined

onMounted(() => {
    if (props.images.length <= 1) return

    timer = window.setInterval(() => {
        previousIndex.value = currentIndex.value
        currentIndex.value = (currentIndex.value + 1) % props.images.length
    }, props.interval)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>
