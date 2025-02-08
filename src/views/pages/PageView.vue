<template>
    <div class="ia_section gray">
        <div class="ia_row">
            <div class="ia_column">
                <template v-if="item">
                    <div class="text" v-html="processedContent"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
import { useQueryStore } from '@/stores/queryStore'

const queryStore = useQueryStore();
const props = defineProps<{ id: string, slug?: string }>();

const { result } = queryStore.getPageViewQuery({ pageId: props.id });
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
