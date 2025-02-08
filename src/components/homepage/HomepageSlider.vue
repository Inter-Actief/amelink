<template>
    <swiper :slidesPerView="1" :spaceBetween="0" :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
    }" :navigation="true" :modules="swiperModules" class="homepageslider">
        <template v-if="newsItems !== null" v-for="item in newsItems" :key="item">
            <swiper-slide class="item">
                <router-link :to="{ name: 'singleactivities', params: { id: item?.id } }">
                    <div class="image">
                        <img v-if="item?.photos?.[0]?.thumbMedium"
                            :src="`https://media.ia.utwente.nl/amelie/${item.photos?.[0]?.thumbMedium}`" />
                        <img class="placeholder" v-else src="@/assets/images/placeholder.jpg" />
                    </div>

                    <div class="content">
                        <div class="container">
                            <div class="title">{{ item?.summary }}</div>
                            <div class="date">{{ formattedData(item?.begin) }}</div>
                        </div>
                    </div>
                </router-link>
            </swiper-slide>
        </template>
    </swiper>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectFade, Autoplay } from 'swiper/modules'
import { formattedData, excerptText } from '@/functions/functions.ts'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useGettext } from 'vue3-gettext'
import { graphql } from '@/gql'

const gettext = useGettext();
const swiperModules = [Navigation, Autoplay]
const route = useRoute()
const perpage = ref(5)

const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

const { result, loading, error, refetch } = useQuery(query, { limit: perpage.value })

const queryResults = computed(() => result.value?.activities)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))
</script>

<style scoped lang="scss">
.homepageslider {
    .item {
        color: inherit;

        a {
            position: relative;
            display: block;
        }

        .image {
            width: 100%;
            height: 100vw;
            max-height: 60rem;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .content {
            position: absolute;
            bottom: 0;
            padding: 3rem 0;
            background-color: rgba(0, 0, 0, 0.6);
            width: 100%;
            color: #fff;

            .title {
                font-weight: 700;
            }

            .date {
                font-size: 1.6rem;
            }
        }
    }
}
</style>
