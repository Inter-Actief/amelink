<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column span6">
                <template v-if="queryItem">
                    <div class="title">
                        <h1>
                            {{ getItemValue(queryItem, 'summary') }}
                        </h1>

                        <div class="date">
                            {{ formattedData(queryItem.begin) }}
                        </div>
                    </div>

                    <div class="text" v-html="processedDescription"></div>

                    <EpaButton v-if="queryItem.photos.length > 0"
                        :to="{ name: 'singleactivitiesphotos', params: { id: props.id } }" class="">
                        {{ $gettext('View photos') }}
                    </EpaButton>

                    <EpaButton v-if="queryItem.photos.length > 0" :to="{ name: 'activities', params: { id: props.id } }"
                        class="link return" bicon="return">
                        {{ $gettext('Return to overview') }}
                    </EpaButton>
                </template>
            </div>

            <div class="ia_column span6">
                <InformationActivites :item="queryItem" />
                <EnrollFrom />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions'
import EpaButton from '@/components/ui/EpaButton.vue'
import InformationActivites from '@/components/activities/InformationActivites.vue'
import EnrollFrom from '@/components/forms/EnrollForm.vue'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'

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
