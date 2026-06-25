<template>
    <Content>
        <h1 class="pb-4">{{ $gettext("Our committees") }}</h1>
        <div class="sm:columns-sm md:columns-md lg:columns-lg xl:columns-xl gap-8">
            <div v-if="!loading" v-for="committeeCategory in categories" :key="committeeCategory.category" class="pb-8">
                <SectionCard :name="committeeCategory.category">
                    <template #content>
                        <RouterLink v-for="committee in committeeCategory.committees" class="link flex flex-row"
                            :to="{ name: 'singlecommittee', params: { id: committee.id, slug: committee.slug } }">
                            {{ committee!.name }}
                        </RouterLink>
                    </template>
                </SectionCard>
            </div>
            <div v-else>
                <div v-for="linesAmount in loadingLinesAmount" class="pb-8">
                    <SectionCard :loading="true">
                        <template #content>
                            <PlaceholderText :lines="linesAmount" />
                        </template>
                    </SectionCard>
                </div>
            </div>
        </div>
    </Content>
</template>

<script lang="ts" setup>
import SectionCard from '@/components/ui/SectionCard.vue';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import Content from '@/components/ui/Content.vue';
import { useQuery } from '@/composables/queries';
import PlaceholderText from '@/components/placeholder/PlaceholderText.vue';

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

const loadingLinesAmount = [14, 3, 5, 2, 2, 3, 2]

</script>

<style></style>
