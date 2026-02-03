<template>
    <h1 class="activities-title">Upcoming activities</h1>
    <div class="slider-container">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
            <div v-if="images.length === 0" class="no-images">No images available</div>
            <div class="slider-wrapper">
                <button class="nav-button prev" @click="prevSlide">❮</button>
                <div class="slider" :style="{
                    transform: `translateX(-${currentSlideIndex * (100 / imagesPerSlide)}%)`,
                }">
                    <div v-for="(image, index) in images" :key="index" class="slide">
                        <div class="slide-content">
                            <img :src="image.url" :alt="'Slide ' + (index + 1)" class="slide-image" />
                        </div>
                    </div>
                </div>
                <button class="nav-button next" @click="nextSlide">❯</button>
            </div>
            <div v-if="images.length > 0" class="dots">
                <span v-for="(image, index) in dots" :key="index" class="dot"
                    :class="{ active: index === currentSlideIndex }" @click="changeSlide(index)"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { useQuery } from '@/composables/queries';

const currentSlideIndex = ref(0)
const images: Ref<{
    url: string
}[]> = ref([])
const imagesPerSlide = 3
const dots = ref<number[]>([])
const totalSliderWidth = ref(0)

const mediaUrl = import.meta.env.VITE_AMELIE_MEDIA_URL
const endGtDate = new Date()

const { result, loading } = useQuery('activitiesSliderCard',{ endgt: endGtDate })

watch(result, (newValue) => {
    images.value =
        newValue?.activities?.results
            ?.flatMap(activity =>
                activity?.photos.map((photo: any) => photo ? { url: mediaUrl + photo.thumbMedium } : undefined),
            )
            .filter((photo): photo is { url: string } => photo !== undefined)
            .slice(0, 20) ?? []
    updateSliderWidth()
    updateDots()
})

function updateSliderWidth() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement
    if (sliderWrapper) {
        totalSliderWidth.value = sliderWrapper.offsetWidth
    }
}

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

onMounted(() => {
    updateSliderWidth()
    window.addEventListener('resize', updateSliderWidth)
})
</script>

<style scoped lang="scss">
.slider-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading,
.no-images,
.error {
    text-align: center;
    padding: 1.25rem;
}

.error {
    color: red;
}

.activities-title {
    margin-left: 4rem;
}

.slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-bottom: 0.75rem;
}

.slider {
    display: flex;
    transition: transform 0.5s ease;
    width: calc(100% * (20 / 3));
}

.slide {
    flex: 0 0 calc(100% / 3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide-content {
    max-width: 85%;
}

.slide-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5%;
    display: block;
    margin: 0 auto;
}

.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    z-index: 10;
    outline: none;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}

.dots {
    display: flex;
    justify-content: center;
}

.dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: #bbb;
    margin: 0 0.3125rem;
    cursor: pointer;
}

.dot.active {
    background-color: #333;
}
</style>
