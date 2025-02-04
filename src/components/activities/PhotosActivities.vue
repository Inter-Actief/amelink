<template>

    <EpaButton
        :to="{ name: 'singleactivities', params: { id: props.id } }"
        class="link return"
        bicon="return">
        {{ $t('Back to activity') }}
    </EpaButton>

    <h1>{{ title }}</h1>

    <div class="photo_albums">
        <template
            v-if="queryItem?.photos?.length > 0"
            v-for="(photo, index) in queryItem.photos"
            :key="photo"
        >

            <div>
                <img
                    v-if="photo?.thumbMedium"
                    :src="`https://media.ia.utwente.nl/amelie/${photo?.thumbMedium}`"
                    @click="showImage(index)"
                >
            </div>

        </template>

        <VueEasyLightbox
            v-if="queryItem?.photos?.length > 0"
            :visible="visible"
            :imgs="imagePhotosUrls()"
            :index="currentIndex"
            @hide="handleHide"
        />

    </div>

    <EpaButton
        :to="{ name: 'singleactivities', params: { id: props.id } }"
        class="link return"
        bicon="return">
        {{ $t('Back to activity') }}
    </EpaButton>

</template>

<script setup lang="ts">
import {appState} from "@/main.ts";
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {computed, ref, watch} from "vue";
import EpaButton from "@/components/ui/EpaButton.vue";
import VueEasyLightbox from 'vue-easy-lightbox';

const props = defineProps(['id']);
const query = computed(() => gql`
  query MyQuery {
    activity(id: "${props.id}") {
      description${appState.language}
      summary${appState.language}
      begin
      id
      summary
      description
      photos {
          thumbMedium
          thumbMediumHeight
          thumbMediumWidth
          thumbLarge
      }
    }
  }
`);

const {result, loading, error, refetch} = useQuery(query);
const queryResults = computed(() => result.value?.activity);
const queryItem = computed(() => queryResults.value ? queryResults.value : null)

const title = computed(() => {
    if (queryResults.value) {
        if ( queryResults.value[`summary${appState.language}`] ) {
            return queryResults.value[`summary${appState.language}`];
        } else if (queryResults.value.summary) {
            return queryResults.value.summary;
        }
    }
    return null;
});

const visible = ref(false);
const currentIndex = ref(0);
const imageUrls = ref([]);

const imagePhotosUrls = () => {
    if (queryResults.value?.photos?.length > 0) {
        imageUrls.value = queryResults.value.photos.map(photo => `https://media.ia.utwente.nl/amelie/${photo?.thumbLarge}`);
    }
    return imageUrls.value;
}

const showImage = (index : number) => {
    currentIndex.value = index;
    visible.value = true;
};

const handleHide = () => {
    visible.value = false;
};

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