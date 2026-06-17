<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';
import VideoPlaceholder from '@/components/placeholder/VideoPlaceholder.vue';

const limit = ref(20);
const query = useQuery('videos', { limit: limit.value });
const { loading } = query;
const totalCount = computed(() => query.result.value?.videos?.totalCount ?? 0);
const videos = computed(() => query.result.value?.videos?.results?.filter(c => !!c) ?? []);
const selectedRows = ref(limit)
</script>

<template>
    <Content>
        <SectionCard :name="$gettext('Videos')">
            <template #content>
                <div class="grid grid-cards-wide gap-10 pb-4">
                    <div v-if="loading" v-for="_ in selectedRows">
                        <VideoPlaceholder />
                    </div>
                </div>
                <div v-if="!loading" class="grid grid-cards-wide gap-10 pb-4">
                    <RouterLink :to="{ name: 'singlevideo', params: { id: video.videoId, type: video.videoType } }"
                        v-for="video in videos">
                        <Card class="text-card" style="height: 100%;">
                            <template #content>
                                <img v-image-error class="aspect-4/3 object-cover rounded-lg w-full"
                                    :src="video.thumbnailUrl" />
                            </template>
                            <template #footer>
                                <div class="flex flex-row items-center w-full justify-between pt-4 expand-link link">
                                    <span class="text-4xl font-semibold">{{ video.title }}</span>
                                </div>
                            </template>
                        </Card>
                    </RouterLink>
                </div>
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"
                    @update:rows="(rows) => selectedRows = rows">
                </Pagination>
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
