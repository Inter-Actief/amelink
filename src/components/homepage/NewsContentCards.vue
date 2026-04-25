<template>
    <SectionCard name="Info" max-height>
        <template #content>
            <div class="grid gap-10 grid-cols-1 pb-10">
                <template v-for="item in newsItems" :key="item.id">
                    <TextCard
                        :title="(item.pinned ? '📌 ' : '') + item.title"
                        :routerLink="{ to: { name: 'singlenews', params: { id: item.id } } }"
                        :subtitle="formattedDate(item.publicationDate)"
                        :label="null"
                    >
                        <div class="text">{{ getItemValue(item, 'introduction') }}</div>
                    </TextCard>
                </template>
            </div>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '../ui/SectionCard.vue'
import { useQuery } from '@/composables/queries'
import { computed } from 'vue'
import { formattedDate, getItemValue, formattedDateShort } from '@/functions/functions.ts'
import EpaButton from '../ui/EpaButton.vue'

const { result, loading } = useQuery('latestNews', { limit: 3, pinnedOnTop: true })

const newsItems = computed(() => {
    return result.value?.newsItems?.results.filter((n) => !!n)
})
</script>

<style scoped lang="scss"></style>
