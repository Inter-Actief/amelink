<template>

    <div class="ia_section">
        <div class="ia_row">
            <div class="ia_column span6">

                <div><h4>Contact us</h4>
                    <ul>
                        <li>Zilverling, kamer E208</li>
                        <li>Drienerlolaan 5</li>
                        <li>7522 NB Enschede</li>
                        <li>The Netherlands</li>
                    </ul>
                </div>

            </div>
            <div class="ia_column span6">

                <ContactForm/>

            </div>

        </div>
    </div>


    <div class="ia_section googlemaps">
        <GoogleMaps/>
    </div>

</template>

<script setup lang="ts">

import ContactForm from "@/components/forms/ContactForm.vue";
import GoogleMaps from "@/components/footer/GoogleMaps.vue";

</script>
