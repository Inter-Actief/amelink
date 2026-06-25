<script setup lang="ts">
import { Autoplay } from 'swiper/modules';

const swiperModules = [Autoplay];
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { useQuery, useQueryAsync } from '@/composables/queries';
import { imageSrc } from '@/composables/util';
import { computed } from 'vue';

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

const query = useQuery("frontPageBanners", {});
const { loading } = query;
const banners = computed(() => query.result.value?.websiteBanners?.results?.filter(b => !!b) ?? []);
</script>

<template>

    <div v-if="loading" class="flex flex-row gap-12">
        <skeleton height="15rem" v-for="_ in 4" />
    </div>

    <swiper v-if="!loading" :slidesPerView="1" :spaceBetween="30" :loop="true" class="logoswiper" :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
    }" :modules="swiperModules" :breakpoints="breakpoints">
        <swiper-slide v-for="banner in banners" class="my-auto">
            <a :href="banner.url">
                <img v-image-error :src="imageSrc(banner.picture)" :alt="banner.name" :aria-label="banner.name" />
            </a>
        </swiper-slide>
    </swiper>
</template>

<style scoped>
.logoswiper {
    width: 100%;
}

.logoswiper .swiper-wrapper {
    align-items: center;
}

.logoswiper .swiper-slide {
    text-align: center;
    justify-content: center;
    align-items: center;
}

.logoswiper .swiper-slide a {
    display: block;
    margin: 0 auto;
}
</style>
