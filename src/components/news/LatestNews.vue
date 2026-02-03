<!-- OLD COMPONENT, NOT USED ANYMORE -->
<template>
    <div class="latestnews">
        <div class="bar">
            <span>{{ $gettext('News & Announcements') }}</span>
            <EpaButton class="link small" :to="{ name: 'news', params: {} }">
                {{ $gettext('View all news') }}
            </EpaButton>
        </div>

        <div class="items">
            <template v-if="newsItems !== null" v-for="item in newsItems" :key="item!.id">
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
import { formattedDataShort, getItemValue } from '../../functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries.ts'

const { $gettext } = useGettext();
const perpage = ref(5)

const { result } = useQuery('latestNews',{ limit: perpage.value });
const queryResults = computed(() => result.value?.newsItems)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped>
.latestnews {
    background: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: #000;
    display: grid;
    width: 100%;
}

.latestnews .bar {
    background-color: #1d428a;
    color: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
}

.latestnews .item {
    display: grid;
    gap: 1.5rem;
    padding: 2rem;
}

.latestnews .item.head {
    font-weight: 700;
}

.latestnews .info {
    display: grid;
    grid-template-columns: 10rem auto;
    gap: 1.5rem;
}

.latestnews .title {
    font-weight: 700;
}

.latestnews .bar button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
}

.latestnews .item:nth-child(even) {
    background-color: #eee;
}
</style>
