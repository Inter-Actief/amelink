<script setup lang="ts">
import Content from '@/components/ui/Content.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref, watch } from 'vue';
import { useGettext } from 'vue3-gettext';
import { useQuery } from '@/composables/queries';
import { markedText } from '@/functions/functions';
import { imageSrc } from '@/composables/util';
import { ArrowUpRight } from '@lucide/vue';

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
        <div v-if="!loading && !result">
            <h2>{{ $gettext("We could not find this company.") }}</h2>
            <RouterLink :to="{ name: 'companies',  }" class="link flex flex-row">
                <ArrowLeft />
                {{ $gettext('View all companies') }}
            </RouterLink>
        </div>
        <div v-else class="grid sm:grid-cols-1 md:grid-cols-8 gap-12">
            <div class="sm:col-span1 md:col-span-5">
                <SectionCard :name="$gettext('Company profile')">
                    <template #info>
                    </template>
                    <template #content>
                        <div v-html="body" class="text"></div>
                    </template>
                </SectionCard>
            </div>
            <div class="sm:col-span-1 md:col-span-3">
                <SectionCard :name="result?.company?.name!">
                    <template #content>
                        <img :src="imageSrc(result?.company?.logo)" class="p-12 max-h-80 mx-auto" />

                        <Button as="a" :href="result?.company?.url" target="_blank">{{
                            $gettext("Website") }}
                            <ArrowUpRight />
                        </Button>

                        <p class="py-5 text font-semibold">{{ result?.company?.shortDescription ?? "" }}</p>
                    </template>
                </SectionCard>
            </div>
        </div>
    </Content>
</template>
