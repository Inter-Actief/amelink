
<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref, watch } from 'vue';
import { useGettext } from 'vue3-gettext';
import { useQuery } from '@/composables/queries';
import { markedText } from '@/functions/functions';
import { imageSrc } from '@/composables/util';
import { ArrowUpRight } from 'lucide-vue-next';

const { $gettext } = useGettext();
const props = defineProps({
    slug: String
});

const query = useQuery('company', { slug: props.slug! });
const { result, loading } = query;
const body = ref("");
watch(result, async (newResult) => {
    if (!newResult) return;
    body.value = await markedText(newResult.company?.profile ?? "");
}, { immediate: true });
</script>

<template>
    <Content>
        <ProgressSpinner v-if="loading" />
        <SectionCard v-else :name="result?.company?.name!">
            <template #info>
                <Button variant="link" as="a" class="text-white" :href="result?.company?.url">{{ $gettext("Website") }} <ArrowUpRight /></Button>
            </template>
            <template #content>
                <img :src="imageSrc(result?.company?.logo)" class="p-12 max-h-128 mx-auto" />
                <div v-html="body"></div>
            </template>
        </SectionCard>
    </Content>
</template>
