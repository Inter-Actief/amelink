<template>
    <Content>
        <div class="grid gap-5 grid-cols-12 pt-5">
            <div class="col-span-12 lg:col-span-7">
                <SectionCard :name="queryItem?.summary ?? ''" :loading="loading">
                    <template #info>
                        <span v-if="queryItem" class="text-meta">{{
                            formattedData(queryItem.begin)
                        }}</span>
                    </template>
                    <template #content>
                        <div v-if="loading">
                            <PlaceholderText :lines="10" />
                        </div>
                        <template v-else>
                            <div class="text" v-html="processedDescription"></div>

                            <div class="flex flex-col gap-2 pt-4">
                                <RouterLink
                                    v-if="queryItem && queryItem.photos.length > 0"
                                    class="link flex flex-row"
                                    :to="{
                                        name: 'singleactivitiesphotos',
                                        params: { id: queryItem.id },
                                    }"
                                >
                                    {{ $gettext('View photos') }}
                                    <ArrowRight />
                                </RouterLink>

                                <RouterLink class="link flex flex-row" :to="{ name: 'activities' }">
                                    <ArrowLeft />
                                    {{ $gettext('Return to overview') }}
                                </RouterLink>
                            </div>
                        </template>
                    </template>
                </SectionCard>
            </div>
            <!-- The facts and the picture stack; the grid only spaces the columns. -->
            <div class="col-span-12 lg:col-span-5 flex flex-col gap-5">
                <InformationActivites :loading="loading" v-if="queryItem" :item="queryItem" />

                <!-- An activity either has a picture or it does not: no placeholder,
                     no empty box, the column just ends after the facts. -->
                <div
                    v-if="queryItem?.imageIcon"
                    class="overflow-hidden rounded-[var(--border-radius)] bg-[var(--p-page-highlight)]"
                >
                    <AppImage
                        :src="queryItem.imageIcon"
                        :alt="queryItem.summary ?? ''"
                        aspect="16/9"
                        fit="contain"
                        eager
                    />
                </div>

                <!-- Enrollment form TODO -->
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, markedText } from '@/functions/functions'
import InformationActivites from '@/components/activities/InformationActivites.vue'
import { useGettext } from 'vue3-gettext'
import { ArrowRight, ArrowLeft } from '@lucide/vue'
import { useQuery } from '@/composables/queries'
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue'
import AppImage from '@/components/ui/AppImage.vue'
import SectionCard from '@/components/ui/SectionCard.vue'

const { $gettext } = useGettext()
const props = defineProps<{ id: string }>()

const { result, refetch, loading } = useQuery('singleActivites', { id: props.id })
const queryResults = computed(() => result.value?.activity)
const queryItem = computed(() => (queryResults.value ? queryResults.value : null))

const processedDescription = ref<string>('')

// Watch for changes in `queryItem` and process the description asynchronously
watch(
    queryItem,
    async (newItem) => {
        if (newItem) {
            processedDescription.value = await markedText(newItem!.description!)
        }
    },
    { immediate: true },
)
</script>
