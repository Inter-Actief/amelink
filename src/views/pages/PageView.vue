<template>
    <Content>
        <div v-if="loading" class="select-none">
            <SectionCard :loading="true">
                <template #content>
                    <div>
                        <PlaceholderText :lines="20" />
                    </div>
                </template>
            </SectionCard>
        </div>
        <div v-else-if="item">
            <div v-if="breadcrumbItems.length" class="mb-4 select-none">
                <Breadcrumb :model="breadcrumbItems"></Breadcrumb>
            </div>
            <SectionCard :name="item.name!">
                <template #content>
                    <div class="text" v-html="processedContent"></div>
                </template>
            </SectionCard>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import Breadcrumb from 'primevue/breadcrumb';
import { useQuery } from '@/composables/queries';
import { useGettext } from 'vue3-gettext';
import { mainMenu } from '@/constants/pageCategories';
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue';

const { $gettext } = useGettext();

const props = defineProps<{ id: string, slug?: string }>();

watch(() => props.id, (newId) => {
    refetch({ pageId: props.id });
})

const { result, refetch, loading } = useQuery('pageView', { pageId: props.id });
const item = computed(() => result.value?.page);

// Find category for a page ID by traversing the menu structure
const findCategoryForPageId = (pageId: string): string | null => {
    for (const menuItem of mainMenu) {
        const subItems = menuItem.items;
        if (Array.isArray(subItems)) {
            for (const subItem of subItems) {
                const match = subItem.route?.match(/\/about\/(\d+)/);
                if (match && match[1] === pageId) {
                    return menuItem.labelKey;
                }
            }
        }
    }
    return null;
};

// Build breadcrumb items (only if page has a category)
const breadcrumbItems = computed(() => {
    const categoryKey = findCategoryForPageId(props.id);
    if (!categoryKey) return [];

    const items = [{ label: $gettext(categoryKey) }];
    if (item.value?.name) items.push({ label: item.value.name });
    return items;
});

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
