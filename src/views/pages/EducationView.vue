<template>
    <Content>
        <div class="flex flex-row gap-12 justify-start items-start">
            <SectionCard :name="$gettext('Information')" class="basis-1/3 sticky top-12">
                <template v-for="item in queryItems" :key="item?.id">
                    <div class="link" @click="scrolltop(`item_${item?.id}`)">
                        {{ getItemValue(item, 'name') }}
                    </div>
                </template>
            </SectionCard>
            <div class="basis-2/3 flex flex-col gap-12">
                <!-- All items -->
                <div v-for="item in queryItems" :key="item?.id" :id="`item_${item?.id}`">
                    <Card class="p-4">
                        <template #title>
                            <div class="text-5xl font-extrabold pb-2">
                                {{ getItemValue(item, 'name') }}
                            </div>
                            <Divider class="pb-8" />
                        </template>
                        <template #content>
                            <div class="text" v-html="processedContent[item?.id!]"></div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getItemValue, markedText } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { useQueryStore } from '@/stores/queryStore'
import Divider from 'primevue/divider';
import Content from '@/components/ui/Content.vue';

const queries = useQueryStore();
const { $gettext } = useGettext();

const { result } = queries.getEducationViewQuery({});

const processedContent = ref<{ [key: string]: string }>({})
const queryResults = computed(() => result.value?.educationpages)
const queryItems = computed(() => (queryResults.value ? queryResults.value.results : null))

watch(queryItems, async (newItems) => {
    if (!newItems) return;

    const contentMap: { [key: string]: string } = { ...processedContent.value };

    for (const item of newItems) {
        if (item?.id) {
            const newContent = getItemValue(item, 'content');
            if (newContent && !contentMap[item.id] || contentMap[item.id] !== newContent) {
                contentMap[item.id] = await markedText(newContent!);
            }
        }
    }

    processedContent.value = contentMap;
}, { immediate: true });

function scrolltop(item: string) {
    console.log(`Scrolling to ${item}`)
    if (item === null) {
        return
    }

    window.scrollTo({
        top: document.getElementById(item)!.offsetTop,
        behavior: 'smooth',
    })
}
</script>

<style scoped lang="scss"></style>
