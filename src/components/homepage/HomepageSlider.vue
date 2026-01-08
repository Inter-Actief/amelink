<template>
    <Galleria
        :value="queryResults"
        showItemNavigators
        @update:activeIndex="resetAnimation()"
        :showThumbnails="false"
        autoPlay
        circular
        :transitionInterval="7000"
    >
        <template #item="slotProps" :circular="true">
            <div class="w-full h-[30vw] container">
                <img
                    class="w-full"
                    ref="gallery-image"
                    :src="imageSrc(randomItem(slotProps.item.photos).thumbLarge)"
                />
            </div>
        </template>
        <template #caption="slotProps">
            <RouterLink
                :to="{ name: 'singleactivitiesphotos', params: { id: slotProps.item.id! } }"
            >
                <div class="text-5xl mb-2 font-bold pl-4">{{ slotProps.item.summary }}</div>
                <p class="text-white pl-4">{{ formattedData(slotProps.item.begin) }}</p>
            </RouterLink>
        </template>
    </Galleria>
</template>

<script setup lang="ts">
import Galleria from 'primevue/galleria'
import { RouterLink } from 'vue-router'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formattedData, excerptText } from '@/functions/functions.ts'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useQueryStore } from '@/stores/queryStore'

const queries = useQueryStore()
const route = useRoute()
const limit = ref(50)
const imageRef = useTemplateRef('gallery-image')

// TODO: Actually filter on activities with pictures
const { result, refetch } = queries.getHomepageSliderQuery({
    limit: limit.value,
    beginDate: new Date(),
})
function resetAnimation() {
    if (imageRef.value) {
        imageRef.value.style.animation = 'none'
        imageRef.value.offsetHeight
        imageRef.value.style.animation = ''
    }
}

const queryResults = computed(() => {
    console.log(result.value?.activities?.results)
    return (
        result.value?.activities?.results.filter((x) => (x?.photos ?? []).length > 0) ?? [
            {
                id: 0,
                description: 'Loading...',
                summary: 'Loading...',
                begin: new Date().toISOString(),
                photos: [
                    {
                        thumbLarge: null,
                    },
                ],
            },
        ]
    )
})

const randomItem = (items: Array<any>) => {
    return items[Math.floor(Math.random() * items.length)]
}

const imageSrc = (src: string | null | undefined) => {
    if (!src) {
        return '/src/assets/images/placeholder.jpg'
    }

    return `${import.meta.env.VITE_AMELIE_MEDIA_URL}${src}`
}
</script>

<style scoped lang="scss">
.container {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    min-width: 100%;
}

.container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom center;
    animation: panUp 7s ease-in-out infinite alternate;
}

@keyframes panUp {
    from {
        object-position: bottom center;
    }
    to {
        object-position: top center;
    }
}
</style>
