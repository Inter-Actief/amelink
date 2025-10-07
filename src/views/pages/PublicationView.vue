<template>
    <Content>
        <SectionCard :name="$gettext('Publications')">
            <template #content>
                <ProgressSpinner v-if="loading" />
                <div v-else class="grid grid-cols-5 gap-10 pb-4">
                    <!-- Using custom card (not TextCard) since we want a vertical image -->
                    <a :href="publicationUrl(item?.file!)" v-for="item in queryItems" :key="item?.id">
                        <Card class="text-card">
                            <template #header>
                                <img class="aspect-a4 rounded-t-lg" :src="item?.thumbnail!" />
                            </template>
                            <template #title>
                                <div
                                    class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                                    <span class="!text-4xl !font-semibold">{{ item?.name }}</span>
                                </div>
                            </template>
                            <template #subtitle>
                                <div class="pl-4 pr-4">
                                    {{ formattedData(item?.datePublished) }}
                                </div>
                            </template>
                        </Card>
                    </a>

                </div>
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"></Pagination>
            </template>
        </SectionCard>
    </Content>
</template>

<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { useQueryStore } from '@/stores/queryStore';
import { computed, ref } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
const queries = useQueryStore();
import { formattedData } from '@/functions/functions.ts'
import Pagination from '@/components/ui/Pagination.vue';

const publicationUrl = (url: string) => `${import.meta.env.VITE_AMELIE_MEDIA_URL}${url}`;
const limit = ref(10)
const query = queries.getPublicationOverview({ limit: limit.value });
const totalCount = computed(() => query.result.value?.publications?.totalCount);
const queryItems = computed(() => {
    return query.result.value?.publications?.results;
})
const { loading } = query;
</script>

<style scoped>
.text-card {
    &:hover .expand-link {
        background-size: 100% 0.2rem;
    }
}
</style>
