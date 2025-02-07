<template>
    <div class="pastactivities">
        <div class="table">
            <div class="item head">
                <div class="date">{{ $gettext('Date') }}</div>
                <div class="activity">
                    {{ $gettext('Activity') }}
                </div>
                <div class="photos">{{ $gettext('Photos') }}</div>
            </div>

            <template v-if="queryItems">
                <template v-for="item in queryItems" :key="item">
                    <div class="item">
                        <div class="date">
                            {{ formattedDataShort(item?.begin) }}
                        </div>
                        <div class="activity">
                            <EpaButton class="link" :to="{ name: 'singleactivities', params: { id: item?.id } }">
                                <span class="title">
                                    {{ getItemValue(item, 'summary') }}
                                </span>
                            </EpaButton>
                        </div>
                        <div class="photos">
                            <EpaButton v-if="item?.photos?.length ? item.photos.length > 0 : false"
                                :to="{ name: 'singleactivitiesphotos', params: { id: item?.id } }"
                                class="link readmore">
                                {{ $gettext('Photos') }}
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
import { formattedDataShort, getItemValue } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { graphql } from '@/gql'

const gettext = useGettext();
const route = useRoute()
const perpage = ref(20)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)

const query = graphql(`
  query PastActivitesQuery($limit: Int, $beginlt: DateTime) {
    activities(limit: $limit, ordering: "begin,desc" begin_Lt: $beginlt) {
      results {
        id
        begin
        description
        summary
        photos {
            thumbMedium
            thumbMediumHeight
            thumbMediumWidth
            caption
          }
      }
    }
  }
`)

const { result, loading, error, refetch } = useQuery(query, { limit: perpage.value, beginlt: new Date() })
const queryResults = computed(() => result.value?.activities)
const queryItems = computed(() => (queryResults.value ? queryResults.value.results : []))
</script>

<style lang="scss" scoped>
.pastactivities {
    background: #fff;
    border-radius: $border-radius $border-radius 0 0;
    display: grid;
    width: 100%;

    .item {
        display: grid;
        grid-template-columns: 8rem auto 8rem;
        gap: $gap_sm;
        padding: 1.5rem 2rem;
        align-items: center;

        &.head {
            font-weight: 700;
            background-color: $primary-color;
            color: #fff;
            border-radius: $border-radius $border-radius 0 0;
        }

        &:nth-child(even) {
            background-color: $card_background_color;
        }

        &:not(.head) {
            .date {
                font-size: 2.4rem;
            }

            .photos {
                background: linear-gradient(currentColor, currentColor) bottom / 0 0.2rem no-repeat;
                background-position: left bottom;
                transition: 300ms;
                width: fit-content;
                cursor: pointer;

                &:hover {
                    background-size: 100% 0.2rem;
                }
            }
        }

        .activity {
            display: flex;
            justify-content: space-between;
        }
    }

    @media only screen and (max-width: $screen-lg) {
        overflow-y: auto;

        .table {
            min-width: 40rem;

            .item {
                padding: 1rem 1.5rem;
                grid-template-columns: 7rem auto 7rem;
                gap: $gap_xs;

                &:not(.head) {
                    .date {
                        font-size: 2rem;
                    }
                }
            }
        }
    }
}
</style>
