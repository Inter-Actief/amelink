<script setup lang="ts">
import Content from '@/components/ui/Content.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import { computed, ref } from 'vue'
import { useGettext } from 'vue3-gettext'
const { $gettext } = useGettext()
import Pagination from '@/components/ui/Pagination.vue'
import { useQuery } from '@/composables/queries'
import TileCard from '@/components/ui/TileCard.vue'

const limit = ref(20)
const query = useQuery('videos', { limit: limit.value })
const { loading } = query
const totalCount = computed(() => query.result.value?.videos?.totalCount ?? 0)
const videos = computed(() => query.result.value?.videos?.results?.filter((c) => !!c) ?? [])
const selectedRows = ref(limit.value)
</script>

<template>
    <Content>
        <SectionCard :name="$gettext('Videos')">
            <template #content>
                <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pb-4"
                >
                    <template v-if="loading">
                        <TileCard
                            v-for="_ in selectedRows"
                            :key="`skeleton-${_}`"
                            loading
                            aspect="4/3"
                            show-media
                        />
                    </template>
                    <template v-else>
                        <TileCard
                            v-for="video in videos"
                            :key="video.videoId"
                            :image="video.thumbnailUrl"
                            :title="video.title ?? ''"
                            :date="video.datePublished"
                            aspect="4/3"
                            :to="{
                                name: 'singlevideo',
                                params: { id: video.videoId, type: video.videoType },
                            }"
                        />
                    </template>
                </div>
                <Pagination
                    v-bind="query"
                    :limit="limit"
                    :total-count="totalCount!"
                    @update:rows="(rows) => (selectedRows = rows)"
                >
                </Pagination>
            </template>
        </SectionCard>
    </Content>
</template>
