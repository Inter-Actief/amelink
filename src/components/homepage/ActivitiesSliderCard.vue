<template>
    <h1 class="ml-16">Upcoming activities</h1>
    <div class="relative flex w-full flex-col items-center overflow-hidden">
        <div v-if="loading" class="p-5 text-center">Loading...</div>
        <div v-else>
            <div v-if="images.length === 0" class="p-5 text-center">No images available</div>
            <div class="relative mb-3 flex w-full justify-center overflow-hidden">
                <button
                    type="button"
                    class="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer border-0 bg-black/50 px-3 py-1.5 text-[2rem] text-white outline-none"
                    @click="prevSlide"
                >
                    ❮
                </button>
                <div
                    class="flex w-[calc(100%*(20/3))] transition-transform duration-500 ease-in-out"
                    :style="{
                        transform: `translateX(-${currentSlideIndex * (100 / imagesPerSlide)}%)`,
                    }"
                >
                    <div
                        v-for="(image, index) in images"
                        :key="index"
                        class="flex flex-[0_0_calc(100%/3)] items-center justify-center"
                    >
                        <div class="max-w-[85%]">
                            <img
                                v-image-error
                                :src="image.url"
                                :alt="'Slide ' + (index + 1)"
                                class="mx-auto block max-h-full max-w-full rounded-[var(--border-radius)]"
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    class="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer border-0 bg-black/50 px-3 py-1.5 text-[2rem] text-white outline-none"
                    @click="nextSlide"
                >
                    ❯
                </button>
            </div>
            <div v-if="images.length > 0" class="flex justify-center">
                <span
                    v-for="(image, index) in dots"
                    :key="index"
                    class="mx-[0.3125rem] size-2.5 cursor-pointer rounded-full"
                    :class="index === currentSlideIndex ? 'bg-slate-800' : 'bg-slate-400'"
                    @click="changeSlide(index)"
                ></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useQuery } from '@/composables/queries'

const currentSlideIndex = ref(0)
const images: Ref<
    {
        url: string
    }[]
> = ref([])
const imagesPerSlide = 3
const dots = ref<number[]>([])

const mediaUrl = import.meta.env.VITE_AMELIE_MEDIA_URL
const endGtDate = new Date()

const { result, loading } = useQuery('activitiesSliderCard', { endgt: endGtDate })

watch(result, (newValue) => {
    images.value =
        newValue?.activities?.results
            ?.flatMap((activity) =>
                activity?.photos.map((photo: any) =>
                    photo ? { url: mediaUrl + photo.thumbMedium } : undefined,
                ),
            )
            .filter((photo): photo is { url: string } => photo !== undefined)
            .slice(0, 20) ?? []
    updateDots()
})

function updateDots() {
    dots.value = new Array(Math.ceil(images.value.length / imagesPerSlide)).fill(0)
}

const changeSlide = (index: number) => {
    currentSlideIndex.value = index
}

const nextSlide = () => {
    if (currentSlideIndex.value < dots.value.length - 1) {
        currentSlideIndex.value += 1
    } else {
        currentSlideIndex.value = 0
    }
}

const prevSlide = () => {
    if (currentSlideIndex.value > 0) {
        currentSlideIndex.value -= 1
    } else {
        currentSlideIndex.value = dots.value.length - 1
    }
}
</script>
