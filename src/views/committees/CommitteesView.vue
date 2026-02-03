<template>
    <Content>
        <ProgressSpinner v-if="loading" />
        <template v-if="!loading">
            <h1 class="pb-4">{{ $gettext("Our committees") }}</h1>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                <template v-for="committeeCategory in categories" :key="committeeCategory.category">
                    <SectionCard :name="committeeCategory.category">
                        <template #content>
                            <RouterLink v-for="committee in committeeCategory.committees" class="link flex flex-row"
                                :to="{ name: 'singlecommittee', params: { id: committee.id, slug: committee.slug } }">
                                {{ committee!.name }}
                            </RouterLink>
                        </template>
                    </SectionCard>
                </template>
            </div>
        </template>
    </Content>
</template>

<script lang="ts" setup>
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, type ComputedRef, type Ref } from 'vue';
import Content from '@/components/ui/Content.vue';
import { useQuery } from '@/composables/queries';

// getCommitteeOverview
const { result, loading } = useQuery('committeeOverview', {})
const queryResults = computed(() => result.value?.committees)
const committees = computed(() => (queryResults.value ? queryResults.value.results : []))

const categories = computed(() => {
    type Committee = NonNullable<typeof committees.value[number]>

    return committees.value.reduce<{ category: string; committees: Committee[] }[]>(
        (acc, committee) => {
            // Skip committees with no category name
            if (!committee!.category?.name) {
                return acc
            }

            const name = committee!.category.name

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
