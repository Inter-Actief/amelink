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
import { computed, ref } from 'vue'
import EpaButton from '@/components/ui/EpaButton.vue'
import { excerptText, formattedDataShort, getItemValue } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries'

const { $gettext } = useGettext();
const perpage = ref(5)

const { result, refetch } = useQuery("upcomingActivities", { limit: perpage.value });
const queryResults = computed(() => result.value?.activities)
const items = computed(() => (queryResults.value ? queryResults.value.results : null))
</script>

<style scoped>
.upcomingactivities {
    background: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: #000;
    display: grid;
    width: 100%;
}

.upcomingactivities .bar {
    background-color: #1d428a;
    color: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
}

.upcomingactivities .bar button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: #fff;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
}

.upcomingactivities .item {
    display: grid;
    grid-template-columns: 6rem 10rem auto;
    gap: var(--gap-sm);
    padding: 1.5rem;
}

.upcomingactivities .item.head {
    font-weight: 700;
}

.upcomingactivities .item:nth-child(even) {
    background-color: #eee;
}

.upcomingactivities .item:hover .readmore {
    background-size: 100% 0.2rem;
}

.upcomingactivities .item .label {
    padding: 0.3rem 1rem;
    color: #fff;
    font-size: var(--font-size-small);
    text-align: center;
    border-radius: var(--border-radius);
}

.upcomingactivities .activity {
    display: grid;
    gap: 1rem;
}
</style>
