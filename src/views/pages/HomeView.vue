<script setup lang="ts">
import LogoSlider from "@/components/logos/LogoSlider.vue";
import HomepageSlider from "@/components/homepage/HomepageSlider.vue";
import HomepageCards from "@/components/homepage/HomepageCards.vue";
import ActivitiesSliderCard from "@/components/homepage/ActivitiesSliderCard.vue";


</script>

<template>
    <main>

        <div class="ia_section clean">
            <HomepageSlider/>
        </div>

        <div class="ia_section light">
            <div class="ia_row">
                <div class="ia_column">
                    <LogoSlider/>
                </div>
            </div>
        </div>

        <div class="ia_section">
            <div class="ia_row">
                <div class="ia_column">
                    <ActivitiesSliderCard/>
                </div>
            </div>
        </div>

        <div class="ia_section light">
            <div class="ia_row">

                <div class="ia_column">
                    <HomepageCards/>
                </div>

            </div>
        </div>

    </main>
</template>
