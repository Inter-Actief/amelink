<script setup lang="ts">
import LogoSlider from '@/components/logos/LogoSlider.vue'
import HomepageSlider from '@/components/homepage/HomepageSlider.vue'
import HomepageNews from '@/components/homepage/HomepageNews.vue'
import HomepagePublications from '@/components/homepage/HomepagePublications.vue'
import HomepageVideo from '@/components/homepage/HomepageVideo.vue'
import UpcomingActivitiesCards from '@/components/activities/UpcomingActivitiesCards.vue'
import Content from '@/components/ui/Content.vue'
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
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                <div class="lg:col-span-2">
                    <HomepageNews />
                </div>
                <div class="flex flex-col gap-4">
                    <HomepagePublications />
                    <HomepageVideo />
                </div>
            </div>
        </Content>
    </main>
</template>
