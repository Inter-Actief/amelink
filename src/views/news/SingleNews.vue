<template>
    <Content>
        <SectionCard v-if="item" :name="item.title ?? ''" :loading="loading">
            <template #info>
                <span v-if="!loading" class="text-meta">
                    {{ item.author }} &middot; {{ formattedData(item.publicationDate) }}
                </span>
            </template>
            <template #content>
                <PlaceholderText v-if="loading" :lines="10" />
                <template v-else>
                    <div class="content text" v-html="processedContent"></div>

                    <div class="pt-4">
                        <EpaButton :to="{ name: 'news' }" class="link return" bicon="return">
                            {{ $gettext('Return to overview') }}
                        </EpaButton>
                    </div>
                </template>
            </template>
        </SectionCard>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, markedText } from '@/functions/functions.ts'
import EpaButton from '@/components/ui/EpaButton.vue'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries';
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue';
import SectionCard from '@/components/ui/SectionCard.vue';

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
