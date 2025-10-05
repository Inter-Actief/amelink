<template>
    <EpaButton @click="router.go(-1)" class="link return" bicon="return">
        {{ $gettext('Back') }}
    </EpaButton>

    <h1>{{ title }}</h1>

    <div class="grid grid-cols-3 gap-4">
        <template v-if="queryItem?.photos" v-for="(photo, index) in queryItem.photos" :key="photo">
            <img class="w-full h-full object-cover object-center cursor-pointer aspect-5/3" v-if="photo?.thumbMedium"
                :src="`https://media.ia.utwente.nl/amelie/${photo?.thumbMedium}`" @click="showImage(index)" />
        </template>
    </div>
    <VueEasyLightbox v-if="queryItem?.photos" :visible="visible" :imgs="imagePhotosUrls()" :index="currentIndex"
        @hide="handleHide" />

    <EpaButton @click="router.go(-1)" class="link return" bicon="return">
        {{ $gettext('Back') }}
    </EpaButton>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import EpaButton from '@/components/ui/EpaButton.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useGettext } from 'vue3-gettext'
import { getItemValue } from '@/functions/functions'
import { useQueryStore } from '@/stores/queryStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const queries = useQueryStore();
const { $gettext } = useGettext();
const props = defineProps(['id'])

const { result, refetch } = queries.getPhotosActivitiesQuery({ id: props.id });
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))

const title = computed(() => {
    return getItemValue(queryResults.value, 'summary');
})

const visible = ref(false)
const currentIndex = ref(0)
const imageUrls = ref<string[]>([])

const imagePhotosUrls = () => {
    if (queryResults.value?.photos) {
        imageUrls.value = queryResults.value.photos.map(
            photo => `https://media.ia.utwente.nl/amelie/${photo.thumbLarge}`,
        );
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

<style scoped lang="scss"></style>
