<template>
    <div class="latestactivities">
        <div class="bar">
            <span>{{ $gettext('Actual Activities') }}</span>
            <EpaButton :to="{ name: 'activities', params: {} }" class="link small">
                {{ $gettext('View all activities') }}
            </EpaButton>
        </div>

        <div class="items">
            <div v-if="newsItems !== null">
                <template v-for="item in newsItems" :key="item">
                    <template v-if="item">
                        <Cards :title="item?.summary ? item.summary : ''" :date="formattedData(item.begin)"
                            :text="excerptText(item?.description ? item.description : '')"
                            :to="{ name: 'singleactivities', params: { id: item.id } }" buttonText="Enroll now!"
                            :imageSrc="imageSrc(item.photos?.[0]?.thumbMedium)"
                            :imageAlt="item?.summary ? item?.summary : ''" :imageHeight="item.photos?.[0]?.thumbMediumHeight
                                ? item.photos?.[0]?.thumbMediumHeight
                                : 0
                                " :imageWidth="item.photos?.[0]?.thumbMediumWidth
                                    ? item.photos?.[0]?.thumbMediumWidth
                                    : 0
                                    " />
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import EpaButton from '@/components/ui/EpaButton.vue'
import { excerptText, formattedData, getItemValue } from '../../functions/functions.ts'
import Cards from '@/components/ui/Cards.vue'
import { useGettext } from 'vue3-gettext'
import { getLatestActivities } from '@/services/queryService.ts'
const { $gettext } = useGettext();
const route = useRoute()
const perpage = ref(5)

//TODO: Create a global
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

//, begin_Gt: "${new Date().toISOString()}"
//TODO: Begin_gt new date()

const { result, loading, error, refetch } = getLatestActivities({ limit: perpage.value, startDate: new Date() });
const queryResults = computed(() => result.value?.activities)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))

const date = new Date()

const imageSrc = (src: string | null | undefined) => {
    if (!src) {
        return '/src/assets/images/placeholder.jpg'
    }

    return `https://media.ia.utwente.nl/amelie/${src}`
}
</script>

<style scoped lang="scss">
.latestactivities {
    border-radius: $border-radius $border-radius 0 0;
    color: #000;
    display: grid;
    gap: $gap_sm;

    .bar {
        background-color: #1d428a;
        color: #fff;
        border-radius: $border-radius $border-radius 0 0;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: $gap_sm;

        @media only screen and (max-width: $screen-lg) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media only screen and (max-width: $screen-lm) {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
}
</style>
