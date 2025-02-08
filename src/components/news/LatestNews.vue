<template>
    <div class="latestnews">
        <div class="bar">
            <span>{{ $gettext('News & Announcements') }}</span>
            <EpaButton class="link small" :to="{ name: 'news', params: {} }">
                {{ $gettext('View all news') }}
            </EpaButton>
        </div>

        <div class="items">
            <template v-if="newsItems !== null" v-for="item in newsItems" :key="item">
                <div class="item">
                    <div class="info">
                        <div class="date">{{ formattedDataShort(item?.publicationDate) }}</div>
                        <div class="title">{{ getItemValue(item, 'title') }}</div>
                    </div>

                    <div class="text">{{ getItemValue(item, 'introduction') }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { formattedDataShort, getItemValue } from '../../functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore.ts'

const { $gettext } = useGettext();
const route = useRoute()
const perpage = ref(5)
const page = ref(route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)
const offset = ref(page.value > 1 ? (page.value - 1) * perpage.value : 0)

const queries = useQueryStore();

const { result } = queries.getLatestNewsQuery({ limit: perpage.value });
const queryResults = computed(() => result.value?.newsItems)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped lang="scss">
.latestnews {
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
    }

    .item {
        display: grid;
        gap: 1.5rem;
        padding: 2rem;
    }

    .item.head {
        font-weight: 700;
    }

    .info {
        display: grid;
        grid-template-columns: 10rem auto;
        gap: 1.5rem;
    }

    .title {
        font-weight: 700;
    }

    .bar button {
        cursor: pointer;
        background-color: transparent;
        border: 0;
        color: #fff;
        border-radius: $border-radius $border-radius 0 0;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
    }

    .item:nth-child(even) {
        background-color: #eee;
    }
}
</style>
