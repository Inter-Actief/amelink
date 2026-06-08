<template>
    <RouterLink class="link flex flex-row" :to="{ name: 'singleactivities', params: { id: queryItem?.id } }">
        <ArrowLeft />{{ $gettext('Go to activity') }}
    </RouterLink>

    <h1>{{ title }}</h1>
    <template v-if="photographers.length == 1">
        <p>{{ $gettext('Pictures by') }} {{ photographers[0]! }}</p>
    </template>
    <template v-else-if="photographers.length > 1">
        <p>{{ $gettext('Pictures by') }} {{ photographers.slice(0, photographers.length - 1).join(", ") }} & {{ photographers[photographers.length - 1] }}</p>
    </template>

    <div class="grid grid-cols-3 gap-4">
        <template v-if="queryItem?.photos" v-for="(photo, index) in queryItem.photos" :key="photo">
            <img class="format cursor-pointer" v-if="photo?.thumbMedium" :src="`${mediaUrl}${photo?.thumbMedium}`"
                @click="showImage(index)" />
        </template>
    </div>
    <VueEasyLightbox v-if="queryItem?.photos" :visible="visible" :imgs="imagePhotosUrls()" :index="currentIndex"
        @hide="handleHide" />

    <RouterLink class="link flex flex-row" :to="{ name: 'singleactivities', params: { id: queryItem?.id } }">
        <ArrowLeft />{{ $gettext('Go to activity') }}
    </RouterLink>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue';
import { computed, ref, watch } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useGettext } from 'vue3-gettext'
import { getItemValue } from '@/functions/functions'
import { useQuery } from '@/composables/queries';

const { $gettext } = useGettext();
const props = defineProps(['id'])

const {result, refetch } = useQuery("photosActivities", {id: props.id}) 
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))

const title = computed(() => {
    return getItemValue(queryResults.value, 'summary');
})

type EasyLightboxImage = {
    src: string, 
    title?: string, 
    alt?: string 
}

const visible = ref(false)
const currentIndex = ref(0)
const imageUrls = ref<EasyLightboxImage[]>([])
const mediaUrl = import.meta.env.VITE_AMELIE_MEDIA_URL

const photographers = computed(() => {
    return Array.from(new Set(queryItem.value?.photos.map(x => x.owner?.name)))
})

const imagePhotosUrls = () => {
    if (queryResults.value?.photos) {
        imageUrls.value = queryResults.value.photos.map(photo => {
            return {
                src: `${mediaUrl}${photo.thumbLarge}`,
                title: `${$gettext('Photo by ')}${photo.owner?.name ?? ''}. ${$gettext('If you want to have this photo removed, please contact the board')}`,
            }
        });
    }
    return imageUrls.value
}

const showImage = (index: number) => {
    currentIndex.value = index
    visible.value = true;
}

const handleHide = () => {
    visible.value = false
}
</script>

<style scoped></style>
