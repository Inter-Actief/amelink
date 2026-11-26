<template>
    <Content>
        <SectionCard v-if="item" :name="item.title ?? ''" :loading="loading">
            <template #info>
                <span v-if="!loading" class="text-meta">
                    {{ item.author }} &middot; {{ formattedData(item.publicationDate) }}
                </span>
            </template>
            <template #content>
                <PlaceholderText v-if="loading" :lines="10" />
                <template v-else>
                    <div class="content text" v-html="processedContent"></div>

                    <div class="pt-4">
                        <RouterLink
                            :to="{ name: 'news' }"
                            class="link inline-flex flex-row items-center gap-2"
                        >
                            <ArrowLeft />
                            {{ $gettext('Return to overview') }}
                        </RouterLink>
                    </div>
                </template>
            </template>
        </SectionCard>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formattedData, markedText } from '@/functions/functions.ts'
import { ArrowLeft } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { useQuery } from '@/composables/queries'
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue'
import SectionCard from '@/components/ui/SectionCard.vue'

const { $gettext } = useGettext()
const props = defineProps<{ id: string }>()

const { result, refetch, loading } = useQuery('singleNews', { id: props.id })
const queryResults = computed(() => result.value?.newsItem)
const item = computed(() => (queryResults.value ? queryResults.value : null))

const processedContent = ref<string>('')

// Process the `content` field when `item` changes
watch(
    item,
    async (newItem) => {
        if (newItem) {
            processedContent.value = await markedText(newItem!.content!)
        }
    },
    { immediate: true },
)
</script>
