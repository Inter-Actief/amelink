<template>
    <EpaButton :to="{ name: 'singleactivities', params: { id: props.id } }" class="link return" bicon="return">
        {{ $gettext('Back to activity') }}
    </EpaButton>

    <h1>{{ title }}</h1>

    <div class="photo_albums">
        <template v-if="queryItem?.photos" v-for="(photo, index) in queryItem.photos" :key="photo">
            <div>
                <img v-if="photo?.thumbMedium" :src="`https://media.ia.utwente.nl/amelie/${photo?.thumbMedium}`"
                    @click="showImage(index)" />
            </div>
        </template>

        <VueEasyLightbox v-if="queryItem?.photos" :visible="visible" :imgs="imagePhotosUrls()" :index="currentIndex"
            @hide="handleHide" />
    </div>

    <EpaButton :to="{ name: 'singleactivities', params: { id: props.id } }" class="link return" bicon="return">
        {{ $gettext('Back to activity') }}
    </EpaButton>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import EpaButton from '@/components/ui/EpaButton.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useGettext } from 'vue3-gettext'
import { graphql } from '@/gql'
import { getItemValue } from '@/functions/functions'
import type { AttachmentType } from '@/gql/graphql'

const gettext = useGettext();
const props = defineProps(['id'])
const query = graphql(`
  query PhotosActivitiesQuery($id: ID) {
    activity(id: $id) {
      summary
      begin
      id
      description
      photos {
          thumbMedium
          thumbMediumHeight
          thumbMediumWidth
          thumbLarge
      }
    }
  }
`)

const { result, loading, error, refetch } = useQuery(query, { id: props.id })
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))

const title = computed(() => {
    getItemValue(queryResults.value, 'summary');
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
}

const handleHide = () => {
    visible.value = false
}
</script>

<style scoped lang="scss">
.photo_albums {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $gap_xs;

    div {
        overflow: hidden;
        height: 20vw;
        max-height: 40rem;

        img {
            max-width: initial;
            cursor: pointer;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    @media screen and (max-width: $screen-xl) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media screen and (max-width: $screen-sm) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .vel-modal {
        height: 100vh;
        max-height: initial;
    }
}
</style>
