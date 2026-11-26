<template>
    <Content>
        <ProgressSpinner v-if="loading" />
        <div v-if="!loading && !committee">
            <h2>{{ $gettext('We could not find this committee.') }}</h2>
            <RouterLink :to="{ name: 'committees' }" class="link flex flex-row">
                <ArrowLeft />
                {{ $gettext('View all committees') }}
            </RouterLink>
        </div>
        <div v-if="!loading && committee" class="grid gap-5 md:grid-cols-8">
            <div class="md:col-span-5">
                <!-- Committee! -->
                <SectionCard :name="committee!.name" class="pb-4">
                    <template #content>
                        <div class="text" v-html="processedContent"></div>

                        <template v-if="committee.groupPicture">
                            <img
                                class="mt-5 w-full rounded"
                                :src="picture"
                                :alt="committee.name ?? ''"
                            />
                        </template>
                    </template>
                </SectionCard>
                <RouterLink :to="{ name: 'committees' }" class="link flex flex-row">
                    <ArrowLeft />
                    {{ $gettext('View all committees') }}
                </RouterLink>
            </div>
            <div class="md:col-span-3">
                <SectionCard :name="$gettext('Committee information')" class="pb-5">
                    <template #content>
                        <div
                            class="grid"
                            :class="{
                                'grid-cols-1': !hasLogo,
                                'grid-cols-4': hasLogo,
                                'gap-4': hasLogo,
                            }"
                        >
                            <div :class="{ 'col-span-3': hasLogo }">
                                <div v-if="committee.email" class="text">
                                    E-mail:
                                    <a class="link" :href="`mailto:${committee.email}`">{{
                                        committee.email
                                    }}</a>
                                </div>
                                <div v-if="committee.website" class="text">
                                    Website:
                                    <a class="link" :href="committee.website">{{
                                        committee.website
                                    }}</a>
                                </div>
                                <div v-if="committee.founded" class="text">
                                    Founded: {{ committee.founded }}
                                </div>
                            </div>
                            <div v-if="committee.logo" :class="{ 'col-span-1': hasLogo }">
                                <img
                                    class="w-full rounded"
                                    :src="logo"
                                    :alt="committee.name ?? ''"
                                />
                            </div>
                        </div>
                    </template>
                </SectionCard>

                <SectionCard :name="$gettext('Committee members')">
                    <template #content>
                        <div
                            class="flex flex-row gap-2 justify-between"
                            v-for="member in members"
                            :key="member?.person!"
                        >
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
import Content from '@/components/ui/Content.vue'
import { UserStar } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { useGettext } from 'vue3-gettext'
import { markedText } from '@/functions/functions'
import { ArrowLeft } from '@lucide/vue'
import { useQuery } from '@/composables/queries'

const props = defineProps<{ id: string; slug: string }>()
const { $gettext } = useGettext()

const { result, loading } = useQuery('singleCommittee', { committeeId: props.id })
const queryResults = computed(() => result.value?.committees?.results[0])
const committee = computed(() => queryResults.value)
const mediaUrl = import.meta.env.VITE_AMELIE_MEDIA_URL
const picture = computed(() =>
    committee.value?.groupPicture ? `${mediaUrl}${committee.value.groupPicture}` : '',
)
const logo = computed(() => (committee.value?.logo ? `${mediaUrl}${committee.value.logo}` : ''))
const hasLogo = computed(() => Boolean(committee.value?.logo))

const processedContent = ref<string>('')

// Process the `content` field when `item` changes
watch(
    committee,
    async (newItem) => {
        if (committee.value && committee.value?.information) {
            processedContent.value = await markedText(committee.value.information!)
        } else {
            processedContent.value = $gettext('This committee does not have a description')
        }
    },
    { immediate: true },
)

const members = computed(() => committee.value?.functionSet ?? [])
</script>
