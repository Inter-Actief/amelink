<template>
    <Content>
        <h1 class="pb-4">{{ $gettext("Our committees") }}</h1>
        <div class="grid grid-cols-3 gap-12">
            <template v-for="committeeCategory in categories" :key="committeeCategory.category">
                <SectionCard :name="committeeCategory.category">
                    <template #content>
                        <RouterLink v-for="committee in committeeCategory.committees" class="link flex flex-row"
                            :to="{ name: 'activities' }">
                            {{ committee!.name }}
                        </RouterLink>
                    </template>
                </SectionCard>
            </template>
        </div>
    </Content>
</template>

<script lang="ts" setup>
import SectionCard from '@/components/ui/SectionCard.vue';
import { useQueryStore } from '@/stores/queryStore';
import { computed, type ComputedRef, type Ref } from 'vue';
const queries = useQueryStore();

// getCommitteeOverview
const { result, refetch, loading } = queries.getCommitteeOverview({})
const queryResults = computed(() => result.value?.committees)
const committees = computed(() => (queryResults.value ? queryResults.value.results : []))


const categories = computed(() => {
    type Committee = NonNullable<typeof committees.value[number]>

    return committees.value.reduce<{ category: string; committees: Committee[] }[]>(
        (acc, committee) => {
            const name = committee!.category?.name ?? "Other Category"

            // Try to find existing category in accumulator
            const existing = acc.find(c => c.category === name)

            if (existing) {
                existing.committees.push(committee!)
            } else {
                acc.push({ category: name, committees: [committee!] })
            }

            return acc
        },
        []
    )
})

</script>

<style></style>
