
<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref } from 'vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
import Pagination from '@/components/ui/Pagination.vue';
import { useQuery } from '@/composables/queries';
import { imageSrc } from '@/composables/util';

const limit = ref(20);
const query = useQuery('companyCorner', { limit: limit.value });
const { loading } = query;
const totalCount = computed(() => query.result.value?.companies?.totalCount ?? 0);
const companies = computed(() => query.result.value?.companies?.results?.filter(c => !!c) ?? []);
</script>

<template>
    <Content>
        <SectionCard :name="$gettext('Companies')">
            <template #content>
                <ProgressSpinner v-if="loading" />
                <div v-else class="grid grid-cols-5 gap-10 pb-4">
                    <RouterLink :to="{ name: 'company', params: { slug: company.slug } }" v-for="company in companies">
                        <Card class="text-card" style="height: 100%;">
                            <template #header v-if="company.logo">
                                <img class="aspect-a4 rounded-t-lg w-full p-12" :src="imageSrc(company.logo)" />
                            </template>
                            <template #title>
                                <div
                                    class="flex flex-row items-center w-full justify-between pt-4 pl-4 expand-link link">
                                    <span class="text-4xl font-semibold">{{ company.name ?? "" }}</span>
                                </div>
                            </template>
                            <template #subtitle>
                                <div class="pl-4 pr-4">
                                    {{ company.shortDescription ?? "" }}
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
