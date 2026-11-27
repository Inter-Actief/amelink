<script setup lang="ts">
import { Autoplay } from 'swiper/modules'

const swiperModules = [Autoplay]
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useQuery } from '@/composables/queries'
import { imageSrc } from '@/composables/util'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'
import { computed, ref, watch } from 'vue'

const reducedMotionStore = useReducedMotionStore()
const reducedMotion = computed(() => reducedMotionStore.reducedMotion)

/**
 * Swiper reads its autoplay settings when it is created, so changing the prop
 * alone leaves a carousel that is already turning running. The instance is
 * therefore kept in step with the setting by hand.
 *
 * The name deliberately avoids `swiper`: a setup binding with that name would
 * shadow the `<swiper>` component and the carousel would not render.
 */
const swiperInstance = ref<any>(null)

const syncAutoplay = () => {
    const autoplay = swiperInstance.value?.autoplay
    if (!autoplay) return

    if (reducedMotion.value) {
        autoplay.stop()
    } else {
        autoplay.start()
    }
}

const onSwiper = (instance: any) => {
    swiperInstance.value = instance
    syncAutoplay()
}

watch(reducedMotion, syncAutoplay, { flush: 'post' })

const breakpoints = {
    1200: {
        slidesPerView: 4,
    },
    980: {
        slidesPerView: 3,
    },
    640: {
        slidesPerView: 2,
    },
    0: {
        slidesPerView: 2,
    },
}

const query = useQuery('frontPageBanners', {})
const { loading } = query
const banners = computed(
    () => query.result.value?.websiteBanners?.results?.filter((b) => !!b) ?? [],
)

/** Always configured; whether it turns is decided by `syncAutoplay`. */
const autoplayConfig = { delay: 4000, disableOnInteraction: false }
</script>

<template>
    <div v-if="loading" class="flex flex-row md:gap-5">
        <skeleton height="15rem" v-for="_ in 4" />
    </div>

    <swiper
        v-if="!loading"
        :slidesPerView="1"
        :spaceBetween="20"
        :loop="true"
        class="w-full [&_.swiper-slide]:flex [&_.swiper-slide]:items-center [&_.swiper-slide]:justify-center [&_.swiper-slide]:text-center [&_.swiper-slide_a]:mx-auto [&_.swiper-slide_a]:block [&_.swiper-slide_a]:px-[0.6rem] [&_.swiper-slide_img]:mx-auto [&_.swiper-slide_img]:h-20 [&_.swiper-slide_img]:w-full [&_.swiper-slide_img]:object-contain [&_.swiper-wrapper]:items-center"
        :autoplay="autoplayConfig"
        :modules="swiperModules"
        :breakpoints="breakpoints"
        @swiper="onSwiper"
    >
        <swiper-slide v-for="banner in banners" class="my-auto">
            <a :href="banner.url">
                <img
                    v-image-error
                    :src="imageSrc(banner.picture)"
                    :alt="banner.name"
                    :aria-label="banner.name"
                />
            </a>
        </swiper-slide>
    </swiper>
</template>
