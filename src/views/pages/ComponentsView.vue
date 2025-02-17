<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column">
                <h1>{{ $gettext('Demo Table') }}</h1>
                <DemoTable />
            </div>
        </div>

        <div class="ia_row">
            <div class="ia_column span6">
                <h1>{{ $gettext('Latest News') }}</h1>
                <LatestNews />
            </div>
            <div class="ia_column span6">
                <h1>{{ $gettext('Upcoming Activities') }}</h1>
                <UpcomingActivities />
            </div>
        </div>

        <div class="ia_row">
            <div class="ia_column">
                <h1>{{ $gettext('Latest Activities') }}</h1>
                <LatestActivities />
            </div>
            <div class="ia_column">
                <h1>{{ $gettext('Editor') }}</h1>
            </div>
        </div>

        <div class="ia_row">
            <div class="ia_column">
                <h1>{{ $gettext('Demo overview') }}</h1>
                <DemoOverviewActivities />
            </div>
        </div>
    </div>
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
