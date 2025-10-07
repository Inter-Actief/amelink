<template>
    <Content>
        <div class="grid gap-12 grid-cols-12 pt-12 grid-rows-2" v-if="queryItem">
            <div class="col-span-7 row-span-2">
                <div class="text-5xl !font-bold">{{ getItemValue(queryItem, 'summary') }}</div>
                <div class="pb-10">{{ formattedData(queryItem.begin) }}</div>
                <div class="text pb-10" v-html="processedDescription"></div>

                <RouterLink v-if="queryItem.photos.length > 0" class="link flex flex-row"
                    :to="{ name: 'singleactivitiesphotos', params: { id: queryItem.id } }">
                    {{ $gettext('View photos') }}
                    <ArrowRight />
                </RouterLink>

                <RouterLink v-if="queryItem.photos.length > 0" class="link flex flex-row" :to="{ name: 'activities' }">
                    <ArrowLeft />
                    {{ $gettext('Return to overview') }}
                </RouterLink>
            </div>
            <div class="col-span-5 row-span-1">
                <InformationActivites :item="queryItem" />
            </div>
            <div class="col-span-5 row-span-1">
                <!-- Enrollment form TODO -->
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions'
import EpaButton from '@/components/ui/EpaButton.vue'
import InformationActivites from '@/components/activities/InformationActivites.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'
import { ArrowRight, ArrowLeft } from 'lucide-vue-next';

const { $gettext } = useGettext();
const props = defineProps<{ id: string }>();
const queries = useQueryStore();

const { result, refetch } = queries.getSingleActivitiesQuery({ id: props.id });
const queryResults = computed(() => result.value?.activity);
const queryItem = computed(() => (queryResults.value ? queryResults.value : null));

const processedDescription = ref<string>('');

// Watch for changes in `queryItem` and process the description asynchronously
watch(queryItem, async (newItem) => {
    if (newItem) {
        processedDescription.value = await markedText(getItemValue(newItem, 'description'));
    }
}, { immediate: true });
</script>
