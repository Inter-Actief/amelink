<template>
    <div class="upcomingactivities">
        <div class="bar">
            <span>{{ $gettext('Upcoming Activities') }}</span>
            <EpaButton :to="{ name: 'activities', params: {} }" class="link small">
                {{ $gettext('View all activities') }}
            </EpaButton>
        </div>

        <div class="table">
            <div class="item head">
                <div class="date">{{ $gettext('Date') }}</div>
                <div class="type">{{ $gettext('Type') }}</div>
                <div class="activity">{{ $gettext('Activity') }}</div>
            </div>

            <template v-if="items" v-for="item in items" :key="item">
                <template v-if="item">

                    <div class="item">
                        <div class="date">{{ formattedDataShort(item.begin) }}</div>
                        <div class="type">
                            <div class="label" :style="[`background-color: #${item.activityLabel.color}`]">
                                {{ getItemValue(item.activityLabel, 'name') }}
                            </div>
                        </div>

                        <div class="activity">
                            <div class="content">
                                <div class="summary">{{ item.summary }}</div>
                                <div class="excerpt">
                                    {{ excerptText(item?.description ? item.description : '') }}
                                </div>
                            </div>

                            <EpaButton :to="{ name: 'singleactivities', params: { id: item.id } }" class="readmore">
                                {{ $gettext('Enroll now!') }}
                            </EpaButton>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import EpaButton from '@/components/ui/EpaButton.vue'
import { excerptText, formattedDataShort, getItemValue } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { graphql } from '@/gql'

const { $gettext } = useGettext();
const route = useRoute()
const perpage = ref(5)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

// , begin_Gt: "${new Date().toISOString()}"
const query = graphql(`
  query UpcomingActivitiesQuery($limit: Int) {
    activities(limit: $limit, begin_Gt: "2023-05-21T00:00:00+00:00") {
      results {
        id
        begin
        description
        summary
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
`)

const { result, loading, error, refetch } = useQuery(query, { limit: perpage.value })
const queryResults = computed(() => result.value?.activities)
const items = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped lang="scss">
.upcomingactivities {
    background: #fff;
    border-radius: $border-radius $border-radius 0 0;
    color: #000;
    display: grid;
    width: 100%;

    .bar {
        background-color: #1d428a;
        color: #fff;
        border-radius: $border-radius $border-radius 0 0;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;

        button {
            cursor: pointer;
            background-color: transparent;
            border: 0;
            color: #fff;
            border-radius: $border-radius $border-radius 0 0;
            padding: 0.5rem 1rem;
            display: flex;
            justify-content: space-between;
        }
    }

    .item {
        display: grid;
        grid-template-columns: 6rem 10rem auto;
        gap: $gap_sm;
        padding: 1.5rem;

        &.head {
            font-weight: 700;
        }

        &:nth-child(even) {
            background-color: #eee;
        }

        &:hover .readmore {
            background-size: 100% 0.2rem;
        }

        .label {
            padding: 0.3rem 1rem;
            color: #fff;
            font-size: $font-size-small;
            text-align: center;
            border-radius: $border-radius;
        }
    }

    .activity {
        display: grid;
        gap: 1rem;
    }
}
</style>
