<template>
    <Content>
        <ProgressSpinner v-if="loading" />
        <div v-if="!loading && !committee">
            <h2>{{ $gettext("We could not find this committee.") }}</h2>
            <RouterLink :to="{ name: 'committees',  }" class="link flex flex-row">
                <ArrowLeft />
                {{ $gettext('View all committees') }}
            </RouterLink>
        </div>
        <div v-if="!loading && committee" class="grid sm:grid-cols-1 md:grid-cols-8 gap-12">
            <div class="sm:col-span1 md:col-span-5">
                <!-- Committee! -->
                <SectionCard :name="committee!.name" class="pb-4">
                    <template #content>
                        <div class="text" v-html="processedContent">
                        </div>

                        <template v-if="committee.groupPicture">
                            <img class="format rounded-lg mt-10" :src="picture" />
                        </template>
                    </template>
                </SectionCard>
                <RouterLink :to="{ name: 'committees',  }" class="link flex flex-row">
                    <ArrowLeft />
                    {{ $gettext('View all committees') }}
                </RouterLink>
            </div>
            <div class="sm:col-span-1 md:col-span-3">
                <SectionCard :name="$gettext('Committee information')" class="pb-12">
                    <template #content>
                        <div class="grid"
                            :class="{
                                'grid-cols-1': !hasLogo,
                                'grid-cols-4': hasLogo,
                                'gap-8': hasLogo,
                            }">
                            <div :class="{'col-span-3': hasLogo}">
                                <div v-if="committee.email" class="text">
                                    E-mail:
                                    <a class="link" :href="`mailto:${committee.email}`">{{ committee.email }}</a>
                                </div>
                                <div v-if="committee.website" class="text">
                                    Website: <a class="link" :href="committee.website">{{ committee.website }}</a>
                                </div>
                                <div v-if="committee.founded" class="text">
                                    Founded: {{ committee.founded }}
                                </div>
                            </div>
                            <div v-if="committee.logo" :class="{'col-span-1': hasLogo}">
                                <img class="rounded-lg" :src="logo" />
                            </div>
                        </div>
                    </template>
                </SectionCard>

                <SectionCard :name="$gettext('Committee members')">
                    <template #content>
                        <div class="flex flex-row gap-2 justify-between" v-for="member in members"
                            :key="member?.person!">
                            <div class="flex flex-row gap-2">
                                <UserStar /><span>{{ member!.person! }}</span>
                            </div>
                            <span class="italic">{{ member!.function }}</span>
                        </div>
                    </template>
                </SectionCard>
            </div>
        </div>
    </Content>
</template>

<script lang="ts" setup>
import Content from '@/components/ui/Content.vue';
import { UserStar } from 'lucide-vue-next';
import { useQueryStore } from '@/stores/queryStore';
import { computed, ref, watch } from 'vue';
import { useGettext } from 'vue3-gettext';
import { markedText } from '@/functions/functions';
import { ArrowLeft } from 'lucide-vue-next';

const props = defineProps<{ id: string, slug: string }>();
const { $gettext } = useGettext();
const queries = useQueryStore();

const { result, loading } = queries.getSingleCommittee({ committeeId: props.id });
const queryResults = computed(() => result.value?.committees?.results[0]);
const committee = computed(() => (queryResults.value));
const picture = computed(() => `${import.meta.env.VITE_AMELIE_MEDIA_URL}${committee.value!.groupPicture!}`)
const logo = computed(() => `${import.meta.env.VITE_AMELIE_MEDIA_URL}${committee.value!.logo!}`)
const hasLogo = computed(() => (committee.value!.logo != null || committee.value!.logo != undefined))

const processedContent = ref<string>('');

// Process the `content` field when `item` changes
watch(committee, async (newItem) => {
    if (committee.value && committee.value?.information) {
        processedContent.value = await markedText(committee.value.information!);
    } else {
        processedContent.value = $gettext("This committee does not have a description");
    }
}, { immediate: true });

let members = computed(() => (committee.value!.functionSet!))

</script>

<style></style>
