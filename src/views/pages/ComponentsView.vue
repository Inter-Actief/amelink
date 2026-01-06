<template>
    <Content>
        <h1>{{ $gettext('Demo Table') }}</h1>
        <DemoTable />
    </Content>

    <Content>
        <div class="grid grid-cols-2 gap-12">
            <div>
                <h1>{{ $gettext('Latest News') }}</h1>
                <LatestNews />
            </div>
            <div>
                <h1>{{ $gettext('Upcoming Activities') }}</h1>
                <UpcomingActivities />
            </div>
        </div>
    </Content>

    <Content>
        <h1>{{ $gettext('Latest Activities') }}</h1>
        <LatestActivities />
    </Content>

    <Content>
        <h1>{{ $gettext('Demo overview') }}</h1>
        <DemoOverviewActivities />
    </Content>
</template>

<script setup lang="ts">
import LatestActivities from '@/components/activities/LatestActivities.vue'
import LatestNews from '@/components/news/LatestNews.vue'
import UpcomingActivities from '@/components/activities/UpcomingActivities.vue'
import DemoOverviewActivities from '@/components/activities/demo/DemoOverviewActivities.vue'
import DemoTable from '@/components/demo/DemoTable.vue'
import { useGettext } from 'vue3-gettext'
const { $gettext } = useGettext();
</script>
