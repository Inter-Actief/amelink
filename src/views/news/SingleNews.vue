<template>
    <Content>
        <template v-if="item">
            <h1>{{ getItemValue(item, 'title') }}</h1>

            <div class="details">
                <div class="author">
                    {{ item.author }}
                </div>
                <div class="date">
                    {{ formattedData(item.publicationDate) }}
                </div>
            </div>

            <div class="content text" v-html="processedContent"></div>

            <EpaButton :to="{ name: 'news', params: { id: item.id } }" class="link return" bicon="return">
                {{ $gettext('Return to overview') }}
            </EpaButton>
        </template>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, getItemValue, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries';

const { $gettext } = useGettext();
const props = defineProps<{ id: string }>();

const { result, refetch } = useQuery('singleNews', { id: props.id })
const queryResults = computed(() => result.value?.newsItem);
const item = computed(() => (queryResults.value ? queryResults.value : null));

const processedContent = ref<string>('');

// Process the `content` field when `item` changes
watch(item, async (newItem) => {
    if (newItem) {
        processedContent.value = await markedText(getItemValue(newItem, 'content'));
    }
}, { immediate: true });
</script>
