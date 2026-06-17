<template>
    <Content>
        <div class="grid gap-12 grid-cols-12 pt-12 grid-rows-2">
            <div class="col-span-12 lg:col-span-7 row-span-2">
                <Skeleton height="4rem" v-if="loading" />
                <div class="text-5xl font-bold" v-if="queryItem">{{ getItemValue(queryItem, 'summary') }}</div>

                <div class="pb-10">
                    <Skeleton height="2rem" v-if="loading" />
                    <span v-if="queryItem">
                        {{ formattedData(queryItem.begin) }}
                    </span>
                </div>

                <div class="pb-10" v-if="loading">
                    <PlaceholderText :lines="10" />
                </div>
                <div class="text pb-10" v-html="processedDescription"></div>

                <Skeleton v-if="loading" height="3rem" width="25rem" />

                <RouterLink v-if="queryItem && queryItem.photos.length > 0" class="link flex flex-row"
                    :to="{ name: 'singleactivitiesphotos', params: { id: queryItem.id } }">
                    {{ $gettext('View photos') }}
                    <ArrowRight />
                </RouterLink>

                <RouterLink class="link flex flex-row" :to="{ name: 'activities' }">
                    <ArrowLeft />
                    {{ $gettext('Return to overview') }}
                </RouterLink>
            </div>
            <div class="col-span-12 lg:col-span-5 row-span-1">
                <InformationActivites :loading="loading" v-if="queryItem" :item="queryItem" />
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
import InformationActivites from '@/components/activities/InformationActivites.vue'
import { useGettext } from 'vue3-gettext'
import { ArrowRight, ArrowLeft } from '@lucide/vue';
import { useQuery } from '@/composables/queries';
import type Skeleton from 'primevue/skeleton';
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue';

const { $gettext } = useGettext();
const props = defineProps<{ id: string }>();

const { result, refetch, loading } = useQuery('singleActivites', { id: props.id });
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
