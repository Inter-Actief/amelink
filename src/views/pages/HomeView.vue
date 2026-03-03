<script setup lang="ts">
import LogoSlider from '@/components/logos/LogoSlider.vue'
import HomepageSlider from '@/components/homepage/HomepageSlider.vue'
import HomepageCards from '@/components/homepage/HomepageCards.vue'
import UpcomingActivitiesCards from '@/components/activities/UpcomingActivitiesCards.vue';
import Content from '@/components/ui/Content.vue';
import { useQueryAsync } from '@/composables/queries';

// Preload all data in parallel to prevent layout shifts
await Promise.all([
    useQueryAsync('homepageSlider', { limit: 50, beginDate: new Date() }),
    useQueryAsync('frontPageBanners', {}),
    useQueryAsync('upcomingActivities', { limit: 4, beginDate: new Date() })
]);
</script>

<template>
    <main>
        <div class="ia-section clean">
            <HomepageSlider />
        </div>

        <Content light>
            <LogoSlider />
        </Content>

        <Content>
            <UpcomingActivitiesCards />
        </Content>

        <Content light>
            <HomepageCards />
        </Content>
    </main>
</template>
