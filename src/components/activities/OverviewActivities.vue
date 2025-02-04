<template>
    <div id="activities" class="activities cards">
        <div class="item" v-if="newsItems !== null" v-for="item in newsItems" :key="item">
            <router-link :to="{ name: 'singleactivities', params: { id: item.id } }">
                <div class="body">
                    <div class="info">
                        <div class="title">
                            <h2>{{ getItemValue(item, 'summary') }}</h2>
                            <div
                                class="label"
                                :style="[`background-color: #${item.activityLabel.color}`]"
                            >
                                {{ item.activityLabel[`name${appState.language}`] }}
                            </div>
                        </div>
                        <div class="date">{{ formattedData(item.begin) }}</div>
                    </div>

                    <div class="excerpt">{{ excerptText(getItemValue(item, 'description')) }}</div>
                </div>

                <EpaButton class="link readmore" icon="readmore">
                    {{ $t('Read more') }}
                </EpaButton>
            </router-link>
        </div>
    </div>

    <Pagination
        :totalItems="totalCount"
        :itemsPerPage="perpage"
        :page="page"
        @next="handleNextPage"
        @prev="handlePrevPage"
        @select="handleSelectPage"
    />
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref } from 'vue'
import Pagination from '@/components/ui/Pagination.vue'
import { useRoute } from 'vue-router'
import { appState } from '@/main.ts'
import { formattedData, excerptText, getItemValue } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'

const route = useRoute()
const perpage = ref(10)
const page = ref(route.query.page ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

//begin_Gt: "${new Date().toISOString()}"
const query = computed(
    () => gql`
  query MyQuery {
    activities(limit: ${perpage.value}, offset: ${offset.value}, begin_Gt: "${new Date().toISOString()}", ordering: "begin,desc" ) {
      results {
        id
        begin
        description${appState.language}
        summary${appState.language}
        summary
        description
        activityLabel {
            nameNl
            nameEn
            color
            active
         }
      }
      totalCount
    }
  }
`,
)

const { result, loading, error, refetch } = useQuery(query)

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

function handleSelectPage(select) {
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
