<script setup lang="ts">
import LogoSlider from '@/components/logos/LogoSlider.vue'
import HomepageSlider from '@/components/homepage/HomepageSlider.vue'
import HomepageNews from '@/components/homepage/HomepageNews.vue'
import HomepagePillars from '@/components/homepage/HomepagePillars.vue'
import HomepagePublications from '@/components/homepage/HomepagePublications.vue'
import HomepageVideo from '@/components/homepage/HomepageVideo.vue'
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
            <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                <div class="flex flex-col gap-4 lg:col-span-2">
                    <HomepageNews />
                    <HomepagePublications layout="columns" />
                </div>
                <div class="flex flex-col gap-4">
                    <HomepagePillars />
                    <HomepageVideo variant="cover" />
                </div>
            </div>
        </Content>
    </main>
</template>
