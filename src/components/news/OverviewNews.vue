<template>
    <h1>{{ $gettext('News page') }}</h1>

    <div id="newsitems" class="newsitems cards">
        <ProgressSpinner v-if="loading" />
        <div class="item" v-else-if="newsItems !== null" v-for="item in newsItems" :key="item?.id">
            <router-link :to="{ name: 'singlenews', params: { id: item?.id } }">
                <div class="body">
                    <div class="info">
                        <div class="title">
                            <h2>{{ item?.title }}</h2>
                        </div>
                        <div class="date">{{ formattedData(item?.publicationDate) }}</div>
                    </div>
                    <div class="excerpt" v-if="processedExcerpts" v-html="processedExcerpts[item!.id]"></div>
                </div>

                <EpaButton class="link readmore" icon="readmore">{{ $gettext('Read more') }}</EpaButton>
            </router-link>
        </div>
    </div>

    <!-- <Pagination :totalItems="totalCount" :itemsPerPage="perpage" :page="page" @next="handleNextPage"
        @prev="handlePrevPage" @select="handleSelectPage" /> -->
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'

const { $gettext } = useGettext();
const route = useRoute()
const queries = useQueryStore();
const perpage = ref(10)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

const { result, refetch, loading } = queries.getOverviewNewsQuery({ limit: perpage.value, offset: offset.value });

const queryResults = computed(() => result.value?.newsItems)

const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
const totalCount = computed(() => (queryResults.value ? queryResults.value.totalCount : null))

const processedExcerpts = ref<Record<string, string>>({})

watch(newsItems, async (newItems: any) => {
    if (newItems) {
        console.log(newItems)
        const excerpts: Record<string, string> = {}
        for (const item of newItems) {
            if (item?.introduction) {
                excerpts[item.id] = await markedText(item.introduction)
            }
        }
        processedExcerpts.value = excerpts
    }
}, { immediate: true })

function scrolltop() {
    window.scrollTo({
        top: (document.getElementById('newsitems') as HTMLElement).offsetTop,
        behavior: 'instant',
    })
}
</script>

<style scoped lang="scss">
.newsitems {
    display: grid;
    gap: 0 $gap-l;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .item {
        padding: 3rem 0;

        a {
            display: grid;
            gap: $gap_sm;
            text-decoration: none;
            color: inherit;
            height: 100%;
        }

        .info {
            height: fit-content;

            .date {
                font-size: $font-size-small;
            }
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

        &:hover .readmore,
        &:hover .readmore>span {
            background-size: 100% 0.2rem;
        }
    }

    .item:not(:nth-last-child(-n + 2)) {
        border-bottom: 0.1rem solid $border-color;
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

    @media only screen and (max-width: $screen-md) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}
</style>
