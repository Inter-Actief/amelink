<script setup lang="ts">
import { Autoplay } from 'swiper/modules'

const swiperModules = [Autoplay]
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useQuery } from '@/composables/queries'
import { imageSrc } from '@/composables/util'
import { computed } from 'vue'

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
</script>

<template>
    <div v-if="loading" class="flex flex-row md:gap-5">
        <!-- h-20 is the real banner height; a taller box pushes the page down
             when the logos land. -->
        <Skeleton height="8rem" class="w-full" v-for="_ in 4" />
    </div>

    <swiper
        v-if="!loading"
        :slidesPerView="1"
        :spaceBetween="20"
        :loop="true"
        class="w-full [&_.swiper-slide]:flex [&_.swiper-slide]:items-center [&_.swiper-slide]:justify-center [&_.swiper-slide]:text-center [&_.swiper-slide_a]:mx-auto [&_.swiper-slide_a]:block [&_.swiper-slide_a]:px-[0.6rem] [&_.swiper-slide_img]:mx-auto [&_.swiper-slide_img]:h-20 [&_.swiper-slide_img]:w-full [&_.swiper-slide_img]:object-contain [&_.swiper-wrapper]:items-center"
        :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
        }"
        :modules="swiperModules"
        :breakpoints="breakpoints"
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
