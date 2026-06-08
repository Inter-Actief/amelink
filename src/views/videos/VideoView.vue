<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import { useGettext } from 'vue3-gettext';
import { useQuery } from '@/composables/queries';
import { computed, ref, watch } from 'vue';
import { markedText } from '@/functions/functions';
import { ArrowLeft } from '@lucide/vue';
import SectionCard from '@/components/ui/SectionCard.vue';

const { $gettext } = useGettext();
const props = defineProps({
    id: String,
    type: String
});

const query = useQuery('video', { videoId: props.id! });
const { result, loading } = query;
const body = ref("");
watch(result, async (newResult) => {
    if (!newResult) return;
    body.value = await markedText(newResult.video?.description ?? "");
}, { immediate: true });
</script>

<template>
    <Content>
        <ProgressSpinner v-if="loading" />
        <div v-if="!loading && !result">
            <h2>{{ $gettext("We could not find this video.") }}</h2>
            <RouterLink :to="{ name: 'videos', }" class="link flex flex-row">
                <ArrowLeft />
                {{ $gettext('View all videos') }}
            </RouterLink>
        </div>
        <div v-else class="grid sm:grid-cols-1 md:grid-cols-8 gap-12">
            <div class="sm:col-span1 md:col-span-5">
                <SectionCard :name="result?.video?.title!">
                    <template #content>
                        <iframe class="w-full aspect-video" :src="result?.video?.embedUrl!" frameborder="0"
                            allowfullscreen />
                    </template>
                </SectionCard>
            </div>
            <div class="sm:col-span-1 md:col-span-3">
                <SectionCard :name="$gettext('Description')">
                    <template #info>
                    </template>
                    <template #content>
                        <div v-html="body" class="text"></div>
                    </template>
                </SectionCard>
            </div>
        </div>
    </Content>
</template>
