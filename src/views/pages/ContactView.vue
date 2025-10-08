<template>
    <div class="ia-section">
        <div class="ia-row">
            <div class="ia-column span6">
                <div>
                    <h4>Contact us</h4>
                    <ul>
                        <li>Zilverling, kamer E208</li>
                        <li>Drienerlolaan 5</li>
                        <li>7522 NB Enschede</li>
                        <li>The Netherlands</li>
                    </ul>
                </div>
            </div>
            <div class="ia-column span6">
                <ContactForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ContactForm from '@/components/forms/ContactForm.vue'
</script>
