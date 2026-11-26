<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';
import { imageSrc } from '@/composables/util';
import TileCard from '@/components/ui/TileCard.vue';

const limit = ref(20);
const query = useQuery('companyCorner', { limit: limit.value });
const { loading } = query;
const totalCount = computed(() => query.result.value?.companies?.totalCount ?? 0);
const companies = computed(() => query.result.value?.companies?.results?.filter(c => !!c) ?? []);
const selectedRows = ref(limit)
</script>

<template>
    <Content>
        <SectionCard :name="$gettext('Companies')">
            <template #content>
                <div class="grid grid-cards-wide gap-4 pb-4">
                    <template v-if="loading">
                        <TileCard v-for="_ in selectedRows" :key="`skeleton-${_}`" loading aspect="logo" />
                    </template>
                    <template v-else>
                        <TileCard v-for="company in companies" :key="company.slug"
                            :image="company.logo ? imageSrc(company.logo) : null" aspect="logo"
                            placeholder="/images/placeholder/shape.svg"
                            :title="company.name ?? ''" :subtitle="company.shortDescription ?? ''"
                            :to="{ name: 'singlecompany', params: { slug: company.slug } }" />
                    </template>
                </div>
                <Pagination v-bind="query" :limit="limit" :total-count="totalCount!"
                    @update:rows="(rows) => selectedRows = rows">
                </Pagination>
            </template>
        </SectionCard>
    </Content>
</template>
