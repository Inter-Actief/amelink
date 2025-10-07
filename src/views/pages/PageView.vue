<template>
    <Content>
        <template v-if="item">
            <SectionCard :name="item.name!">
                <template #content>
                    <div class="text" v-html="processedContent"></div>
                </template>
            </SectionCard>
        </template>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
import { useQueryStore } from '@/stores/queryStore'
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';

const queryStore = useQueryStore();
const props = defineProps<{ id: string, slug?: string }>();

watch(() => props.id, (newId) => {
    refetch({ pageId: props.id });
})

const { result, refetch } = queryStore.getPageViewQuery({ pageId: props.id });
const item = computed(() => result.value?.page);

const processedContent = ref<string>('');

// Process the `content` field when `item` changes
watch(item, async (newItem) => {
    if (newItem && newItem.content) {
        processedContent.value = await markedText(newItem.content);
    } else {
        processedContent.value = ''; // Ensure it's empty if no content
    }
}, { immediate: true });
</script>
