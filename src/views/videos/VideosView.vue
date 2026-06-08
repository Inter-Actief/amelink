
<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';

const limit = ref(20);
const query = useQuery('videos', { limit: limit.value });
const { loading } = query;
const totalCount = computed(() => query.result.value?.videos?.totalCount ?? 0);
const videos = computed(() => query.result.value?.videos?.results?.filter(c => !!c) ?? []);
</script>

<template>
    <Content>
        <SectionCard :name="$gettext('Videos')">
            <template #content>
                <ProgressSpinner v-if="loading" />
                <div v-else class="grid grid-cols-5 gap-10 pb-4">
                    <RouterLink :to="{ name: 'singlevideo', params: { id: video.videoId, type: video.videoType } }" v-for="video in videos">
                        <Card class="text-card" style="height: 100%;">
                            <template #content>
                                <img class="aspect-a4 rounded-lg w-full" :src="video.thumbnailUrl" />
                            </template>
                            <template #footer>
                                <div
                                    class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                                    <span class="text-4xl font-semibold">{{ video.title }}</span>
                                </div>
                            </template>
                        </Card>
                    </RouterLink>
                </div>
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"></Pagination>
            </template>
        </SectionCard>
    </Content>
</template>

<style scoped>
.text-card {
    &:hover .expand-link {
        background-size: 100% 0.2rem;
    }
}
</style>
