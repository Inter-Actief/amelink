<template>
    <div id="activities" class="activities cards">
        <ProgressSpinner v-if="loading" />
        <div v-if="!loading && newsItems" v-for="item in newsItems" :key="item?.id">
            <template v-if="item">
                <TextCard :title="getItemValue(item, 'summary')" subtitle="Dinsdag 25 November 2025"
                    :routerLink="{ to: { name: 'singleactivities', params: { id: item.id } } }"
                    :label="{ color: item.activityLabel.color, text: getItemValue(item.activityLabel, 'name') as string }">
                    {{ excerptText(getItemValue(item, 'description')) }}
                </TextCard>
            </template>
        </div>
    </div>

    <!-- <Pagination :totalItems="totalCount" :itemsPerPage="perpage" :page="page" @next="handleNextPage"
        @prev="handlePrevPage" @select="handleSelectPage" /> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formattedData, excerptText, getItemValue } from '@/functions/functions.ts'
import ProgressSpinner from 'primevue/progressspinner';
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'
import TextCard from '../ui/TextCard.vue';

const { $gettext } = useGettext();
const route = useRoute()
const queries = useQueryStore();
const perpage = ref(10)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)


const { result, refetch, loading } = queries.getOverviewActivities({ limit: perpage.value, offset: offset.value, startDate: new Date() })
const queryResults = computed(() => result.value?.activities)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))

function handleNextPage() {
    page.value++
    offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
    refetch()
}

function handlePrevPage() {
    page.value--
    offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
    refetch()
}

function handleSelectPage(select: any) {
    page.value = select
    offset.value = page.value > 1 ? (page.value - 1) * perpage.value : 0
    refetch()
}
</script>

<style scoped lang="scss">
.activities {
    display: grid;
    gap: 0 $gap-l;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    .item {
        padding: 3rem 0;

        a {
            display: grid;
            gap: $gap_sm;
            text-decoration: none;
            color: inherit;
            height: 100%;
        }

        &:not(:nth-last-child(-n + 1)) {
            border-bottom: 0.1rem solid $border-color;
        }

        .info {
            height: fit-content;
        }

        .excerpt {
            height: fit-content;
        }

        .readmore {
            width: fit-content;
            height: fit-content;
            margin-top: auto;
        }

        .body {
            display: grid;
            gap: $gap_sm;
            height: fit-content;
        }

        .date {
            font-size: $font-size-small;
        }

        .title {
            display: flex;
            gap: 2rem;
            align-items: center;
            justify-content: space-between;
        }

        .label {
            padding: 0.3rem 1rem;
            color: #fff;
            font-size: $font-size-small;
            text-align: center;
            border-radius: $border-radius;
        }

        &:hover .readmore {
            background-size: 100% 0.2rem;
        }
    }

    &.cards {
        gap: $gap;

        .item {
            background-color: $card_background_color;
            padding: 4rem;
            border-radius: $border-radius;
            border-bottom: 0;
        }
    }
}
</style>
