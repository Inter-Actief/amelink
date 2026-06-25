<template>
    <Content>
        <template v-if="item">
            <div>
                <Skeleton v-if="loading" height="3rem" width="80%" />
                <h1 v-else>{{ item.title }}</h1>
            </div>

            <div class="details pb-8 text-gray-500">
                <div class="author">
                    <Skeleton v-if="loading" height="1.5rem" width="20%" />
                    <span v-else>{{ item.author }}</span>
                </div>
                <div class="date">
                    <Skeleton v-if="loading" height="1.5rem" width="20%" />
                    <span v-else>{{ formattedData(item.publicationDate) }}</span>
                </div>
            </div>

            <div class="content text pb-8">
                <PlaceholderText v-if="loading" :lines="10" />
                <div v-else v-html="processedContent"></div>
            </div>

            <EpaButton :to="{ name: 'news', params: { id: item.id } }" class="link return" bicon="return">
                {{ $gettext('Return to overview') }}
            </EpaButton>
        </template>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries';
import Skeleton from 'primevue/skeleton';
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue';

const { $gettext } = useGettext();
const props = defineProps<{ id: string }>();

const { result, refetch, loading } = useQuery('singleNews', { id: props.id })
const queryResults = computed(() => result.value?.newsItem);
const item = computed(() => (queryResults.value ? queryResults.value : null));

const processedContent = ref<string>('');

// Process the `content` field when `item` changes
watch(item, async (newItem) => {
    if (newItem) {
        processedContent.value = await markedText(newItem!.content!);
    }
}, { immediate: true });
</script>
