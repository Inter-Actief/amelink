<template>
    <Galleria :value="queryResults" showItemNavigators :showThumbnails="false" autoPlay circular
        :transitionInterval="3000">
        <template #item="slotProps" :circular="true">
            <div class="w-full overflow-hidden">
                <img class="kenburns object-cover w-full h-[30vw]"
                    :src="imageSrc(randomItem(slotProps.item.photos).thumbLarge)" />
            </div>
        </template>
        <template #caption="slotProps">
            <RouterLink :to="{ name: 'singleactivitiesphotos', params: { id: slotProps.item.id! } }">
                <div class="text-5xl mb-2 font-bold">{{ slotProps.item.summary }}</div>
                <p class="text-white">{{ formattedData(slotProps.item.begin) }}</p>
            </RouterLink>
        </template>
    </Galleria>
</template>

<script setup lang="ts">
import Galleria from 'primevue/galleria';
import { RouterLink } from 'vue-router';
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formattedData, excerptText } from '@/functions/functions.ts'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useQueryStore } from '@/stores/queryStore'

const queries = useQueryStore();
const route = useRoute()
const limit = ref(50);

// TODO: Actually filter on activities with pictures
const { result, refetch } = queries.getHomepageSliderQuery({ limit: limit.value, beginDate: new Date() });

const queryResults = computed(() => {
    return result.value?.activities?.results.filter(x => (x?.photos ?? []).length > 0)
})

const randomItem = (items: Array<any>) => {
    return items[Math.floor(Math.random() * items.length)];
}

const imageSrc = (src: string | null | undefined) => {
    if (!src) {
        return '/src/assets/images/placeholder.jpg'
    }

    return `${import.meta.env.VITE_AMELIE_MEDIA_URL}${src}`
}
</script>

<style scoped lang="scss">
.kenburns {
    transform: translateY(10%);
    animation: panUp 3s ease-in-out infinite alternate;
}

@keyframes panUp {
    0% {
        transform: scale(1.1) translateY(10%);
    }

    100% {
        transform: scale(1.1) translateY(-10%);
    }
}
</style>
