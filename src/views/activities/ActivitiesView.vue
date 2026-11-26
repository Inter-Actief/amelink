<template>
    <Content>
        <div class="grid grid-cols-7 gap-4 items-start">
            <div class="col-span-7 lg:col-span-4">
                <SectionCard :name="$gettext('Upcoming activities')">
                    <template #content>
                        <OverviewActivities />
                    </template>
                </SectionCard>
            </div>

            <div class="col-span-7 lg:col-span-3">
                <SectionCard :name="$gettext('Past activities')" flush>
                    <template #content>
                        <PastActivities />
                    </template>
                </SectionCard>
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import OverviewActivities from '@/components/activities/OverviewActivities.vue'
import PastActivities from '@/components/activities/PastActivities.vue'
import Content from '@/components/ui/Content.vue'
import SectionCard from '@/components/ui/SectionCard.vue'
import { useGettext } from 'vue3-gettext'
const { $gettext } = useGettext()
</script>
