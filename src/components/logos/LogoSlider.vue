<template>
    <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        class="logoswiper"
        :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
        }"
        :modules="swiperModules"
        :breakpoints="breakpoints"
    >

        <swiper-slide><img width="114" height="32" src="@/assets/images/logos/ASML.svg" alt="ASML logo" aria-label="ASML logo"></swiper-slide>
        <swiper-slide><img width="185" height="32" src="@/assets/images/logos/BetterBe.svg" alt="BetterBe logo" aria-label="BetterBe logo"></swiper-slide>
        <swiper-slide><img width="202" height="32" src="@/assets/images/logos/epartment.svg" alt="Epartment logo" aria-label="Epartment logo"></swiper-slide>
        <swiper-slide><img width="148" height="32" src="@/assets/images/logos/Voortman.svg" alt="Voortman logo" aria-label="Voortman logo"></swiper-slide>

    </swiper>
</template>
<script setup>
import {Autoplay} from "swiper/modules";

const swiperModules = [Autoplay];
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';

const breakpoints = {
    1200: {
        slidesPerView: 4
    },
    980: {
        slidesPerView: 3
    },
    640: {
        slidesPerView: 2
    },
    0: {
        slidesPerView: 2
    }
};
</script>

<style scoped lang="scss">

.logoswiper {
    width: 100%;

    .swiper-wrapper {
        align-items: center;
    }

    .swiper-slide {
        text-align: center;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        margin: 0 auto;
    }
}

</style>