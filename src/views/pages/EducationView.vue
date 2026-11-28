<template>
    <Content>
        <div class="flex flex-col lg:flex-row gap-5 justify-start items-start">
            <SectionCard
                :name="$gettext('Information')"
                :loading="loading"
                class="w-full lg:basis-1/3 lg:sticky top-12"
            >
                <template #content>
                    <div class="flex flex-col gap-2">
                        <template v-if="loading">
                            <Skeleton
                                v-for="n in 10"
                                :key="n"
                                height="2.2rem"
                                :width="n % 3 === 0 ? '55%' : '78%'"
                            />
                        </template>
                        <template v-else v-for="item in queryItems" :key="item?.id">
                            <div class="link" @click="scrolltop(`item_${item?.id}`)">
                                {{ item!.name! }}
                            </div>
                        </template>
                    </div>
                </template>
            </SectionCard>
            <div class="lg:basis-2/3 flex flex-col gap-5">
                <!-- The education pages arrive as one query and their body text is
                     unknown until it does, so the loading state reserves a
                     plausible section instead of nothing: an empty page put the
                     footer on screen and the whole page then grew by 3500px. -->
                <template v-if="loading">
                    <SectionCard v-for="n in 10" :key="n" loading>
                        <template #content>
                            <PlaceholderText :lines="10" />
                        </template>
                    </SectionCard>
                </template>
                <!-- All items -->
                <template v-else>
                    <div v-for="item in queryItems" :key="item?.id" :id="`item_${item?.id}`">
                        <SectionCard :name="item!.name!">
                            <template #content>
                                <div class="text" v-html="processedContent[item?.id!]"></div>
                            </template>
                        </SectionCard>
                    </div>
                </template>
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { markedText } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import Content from '@/components/ui/Content.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue'
import Skeleton from 'primevue/skeleton'
import { useQuery } from '@/composables/queries'

const { $gettext } = useGettext()

const { result, loading } = useQuery('educationView', {})

const processedContent = ref<{ [key: string]: string }>({})
const queryResults = computed(() => result.value?.educationpages)
const queryItems = computed(() => (queryResults.value ? queryResults.value.results : null))

watch(
    queryItems,
    async (newItems) => {
        if (!newItems) return

        const contentMap: { [key: string]: string } = { ...processedContent.value }

        for (const item of newItems) {
            if (item?.id) {
                const newContent = item.content!
                if ((newContent && !contentMap[item.id]) || contentMap[item.id] !== newContent) {
                    contentMap[item.id] = await markedText(newContent!)
                }
            }
        }

        processedContent.value = contentMap
    },
    { immediate: true },
)

function scrolltop(item: string) {
    if (item === null) {
        return
    }

    window.scrollTo({
        top: document.getElementById(item)!.offsetTop,
        behavior: 'smooth',
    })
}
</script>
