<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref, effect } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import { formattedData } from '@/functions/functions.ts'
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';
import PublicationPlaceholder from '@/components/placeholder/PublicationPlaceholder.vue';

const publicationUrl = (url: string) => `${import.meta.env.VITE_AMELIE_MEDIA_URL}${url}`;
const limit = ref(50);
const type = ref<string | undefined>(undefined);
const query = useQuery('publicationOverview', { limit: limit.value, type: type.value });
const totalCount = computed(() => query.result.value?.publications?.totalCount);
const queryItems = computed(() => query.result.value?.publications?.results);
const { loading, refetch } = query;
const types = computed(() => query.result.value?.publicationTypes?.map(p => p?.typeName) ?? []);
effect(() => {
    refetch({ limit: limit.value, type: type.value });
});
const selectedRows = ref(limit)
</script>

<style scoped>
.text-card {
    &:hover .expand-link {
        background-size: 100% 0.2rem;
    }
}
</style>

<template>
    <Content>
        <SectionCard :name="$gettext('Publications')">
            <template #info>
                <Select v-model="type" :options="types" showClear optionLabel="name" placeholder="" class="w-full">
                    <template #value="slotProps">
                        <div class="flex items-center p-1">
                            {{ type ? type : "Filter..." }}
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            {{ slotProps.option }}
                        </div>
                    </template>
                </Select>
            </template>
            <template #content>
                <div class="grid grid-cols-5 gap-10 pb-4">
                    <PublicationPlaceholder v-if="loading" v-for="_ in selectedRows" />
                    <a v-else :href="publicationUrl(item?.file!)" v-for="item in queryItems" :key="item?.id">
                        <Card class="text-card" style="height: 100%;">
                            <template #header>
                                <!-- TODO book.svg have similar style -->
                                <img v-image-error="'/images/placeholder/book.svg'"
                                    class="aspect-a4 object-cover rounded-t-lg w-full" :src="item?.thumbnail!" />
                            </template>
                            <template #title>
                                <div
                                    class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                                    <span class="text-4xl! font-semibold!">{{ item?.name }}</span>
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
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"
                    @update:rows="(rows) => selectedRows = rows">
                </Pagination>
            </template>
        </SectionCard>
    </Content>
</template>
