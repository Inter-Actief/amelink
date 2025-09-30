<template>
    <Content>
        <div class="grid grid-cols-7 gap-12">
            <div class="col-span-4">
                <h1 class="pb-4">{{ $gettext("Activities you don't want to miss") }}</h1>
                <OverviewActivities />
            </div>

            <div class="col-span-3">
                <h2 class="pb-4">{{ $gettext('Past activities') }}</h2>
                <PastActivities />
            </div>
        </div>
    </Content>
</template>

<script setup lang="ts">
import OverviewActivities from '@/components/activities/OverviewActivities.vue'
import PastActivities from '@/components/activities/PastActivities.vue'
import Content from '@/components/ui/Content.vue';
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();
</script>
