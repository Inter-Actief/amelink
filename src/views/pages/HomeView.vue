<script setup lang="ts">
import LogoSlider from '@/components/logos/LogoSlider.vue'
import HomepageSlider from '@/components/homepage/HomepageSlider.vue'
import HomepageCards from '@/components/homepage/HomepageCards.vue'
import ActivitiesSliderCard from '@/components/homepage/ActivitiesSliderCard.vue'
</script>

<template>
    <main>
        <div class="ia-section clean">
            <HomepageSlider />
        </div>

        <div class="ia-section light">
            <div class="ia-row">
                <div class="ia-column">
                    <LogoSlider />
                </div>
            </div>
        </div>

        <div class="ia-section">
            <div class="ia-row">
                <div class="ia-column">
                    <ActivitiesSliderCard />
                </div>
            </div>
        </div>

        <div class="ia-section light">
            <div class="ia-row">
                <div class="ia-column">
                    <HomepageCards />
                </div>
            </div>
        </div>
    </main>
</template>
