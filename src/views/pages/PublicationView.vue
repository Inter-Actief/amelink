<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref, effect } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import { publicationUrl } from '@/functions/functions.ts'
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';
import PublicationPlaceholder from '@/components/placeholder/PublicationPlaceholder.vue';
import TileCard from '@/components/ui/TileCard.vue';

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
                <div class="grid grid-cards-wide gap-4 pb-4">
                    <template v-if="loading">
                        <PublicationPlaceholder v-for="_ in selectedRows" :key="`skeleton-${_}`" />
                    </template>
                    <template v-else>
                        <TileCard v-for="item in queryItems" :key="item?.id"
                            :image="item?.thumbnail" :title="item?.name ?? ''"
                            :date="item?.datePublished" aspect="a4"
                            placeholder="/images/placeholder/book.svg"
                            :href="publicationUrl(item?.file!)" />
                    </template>
                </div>
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"
                    @update:rows="(rows) => selectedRows = rows">
                </Pagination>
            </template>
        </SectionCard>
    </Content>
</template>
