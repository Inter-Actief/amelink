<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <template v-if="loading">
            <TileCard v-for="_ in perpage" :key="`skeleton-${_}`" loading />
        </template>
        <template v-else-if="newsItems">
            <TileCard v-for="item in newsItems" :key="item?.id" :title="item!.summary ?? ''"
                :date="item!.begin"
                :label="{ color: item!.activityLabel?.color ?? '1d428a', text: item!.activityLabel?.name ?? '' }"
                aspect="video" show-media :image="imageSrc(item?.imageIcon, false)" fit="contain"
                placeholder="/images/placeholder/shape.svg"
                :to="{ name: 'singleactivities', params: { id: item?.id } }">
                <div class="line-clamp-3" v-html="processedDescriptions[item!.id!]"
                    v-if="processedDescriptions[item!.id!]">
                </div>
            </TileCard>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, excerptText, markedText } from '@/functions/functions.ts'

import TileCard from '../ui/TileCard.vue';
import { imageSrc } from '@/composables/util';
import { useQuery } from '@/composables/queries';


const perpage = ref(10)
const processedDescriptions = ref<Record<string, string>>({})
const { result, loading } = useQuery("overviewActivities", { limit: perpage.value, startDate: new Date() });

const queryResults = computed(() => result.value?.activities)
const newsItems = computed(() => (queryResults.value ? queryResults.value.results : null))
watch(queryResults, async (newItem) => {
    if (newItem?.results) {
        for (const item of newItem.results) {
            processedDescriptions.value[item?.id!] = await markedText(item!.description!);
        }
    }
}, { immediate: true });

</script>

<style scoped></style>
