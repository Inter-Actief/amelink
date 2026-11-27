<script setup lang="ts">
import LogoSlider from '@/components/logos/LogoSlider.vue'
import HomepageSlider from '@/components/homepage/HomepageSlider.vue'
import HomepagePillars from '@/components/homepage/HomepagePillars.vue'
import RecentThings from '@/components/homepage/RecentThings.vue'
import UpcomingActivitiesCards from '@/components/activities/UpcomingActivitiesCards.vue'
import Content from '@/components/ui/Content.vue'
</script>

<template>
    <main>
        <HomepageSlider />

        <Content light>
            <LogoSlider />
        </Content>

        <Content>
            <UpcomingActivitiesCards />
        </Content>

        <Content light>
            <HomepagePillars variant="band" />
        </Content>

        <Content>
            <RecentThings />
        </Content>
        
    </main>
</template>
