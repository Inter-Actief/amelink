<template>
    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column span8">
                <h1>{{ $gettext("Activities you don't want to miss") }}</h1>
                <OverviewActivities />
            </div>

            <div class="ia_column span4">
                <h2>{{ $gettext('Past activities') }}</h2>

                <PastActivities />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OverviewActivities from '@/components/activities/OverviewActivities.vue'
import PastActivities from '@/components/activities/PastActivities.vue'
import { useGettext } from 'vue3-gettext';
const { $gettext } = useGettext();

</script>
