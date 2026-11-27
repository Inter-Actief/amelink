<template>
    <Galleria
        :value="queryResults"
        showItemNavigators
        @update:activeIndex="resetAnimation()"
        :showThumbnails="false"
        :autoPlay="!reducedMotion"
        circular
        :transitionInterval="7000"
    >
        <template #item="slotProps" :circular="true">
            <div
                class="relative flex h-[24rem] min-w-full items-end justify-center overflow-hidden md:h-[28rem] lg:h-[32rem]"
            >
                <img
                    ref="gallery-image"
                    class="h-full w-full animate-[panUp_7s_ease-in-out_infinite_alternate] object-cover object-bottom"
                    v-image-error
                    :alt="slotProps.item.summary ?? ''"
                    :src="imageSrc(randomItem(slotProps.item.photos).thumbLarge)"
                />
            </div>
        </template>
        <template #caption="slotProps">
            <RouterLink
                :to="{ name: 'singleactivitiesphotos', params: { id: slotProps.item.id! } }"
            >
                <div class="mb-1 px-3 text-section font-bold">{{ slotProps.item.summary }}</div>
                <p class="px-3 text-meta text-white">{{ formattedData(slotProps.item.begin) }}</p>
            </RouterLink>
        </template>
    </Galleria>
</template>

<script setup lang="ts">
import Galleria from 'primevue/galleria'
import { RouterLink } from 'vue-router'
import { computed, ref, useTemplateRef } from 'vue'
import { formattedData } from '@/functions/functions.ts'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useQuery } from '@/composables/queries'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'

const reducedMotionStore = useReducedMotionStore()
const reducedMotion = computed(() => reducedMotionStore.reducedMotion)

const limit = ref(50)
const imageRef = useTemplateRef('gallery-image')

// TODO: Actually filter on activities with pictures
const { result } = useQuery('homepageSlider', { limit: limit.value, beginDate: new Date() })
function resetAnimation() {
    if (imageRef.value) {
        imageRef.value.style.animation = 'none'
        imageRef.value.offsetHeight
        imageRef.value.style.animation = ''
    }
}

const queryResults = computed(() => {
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
