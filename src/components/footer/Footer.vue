<template>
    <footer id="footer" class="ia-section">
        <div class="ia-row">
            <div class="ia-column span3">
                <div class="ia-module">
                    <Logo />
                </div>

                <div class="ia-module">
                    {{ $gettext('footer.text') }}
                </div>
            </div>
            <div class="ia-column span3">
                <div class="ia-module">
                    <FooterMenu title="Custom" />
                </div>

                <div class="ia-module">
                    <FooterMenu title="Custom" />
                </div>
            </div>
            <div class="ia-column span3">
                <div class="ia-module">
                    <ContactUs />
                </div>

                <div class="ia-module">
                    <FooterMenu title="Custom" />
                </div>
            </div>
            <div class="ia-column span3">
                <div class="ia-module">
                    <ContactUs />
                </div>

                <div class="ia-module">
                    <OpenMaps />
                </div>
            </div>
        </div>

        <div class="ia-row">
            <div class="ia-column">{{ currentYear }} | Inter-Actief</div>
        </div>

        <GoogleMaps v-if="isDesktop" />
    </footer>
</template>

<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import FooterMenu from '@/components/menu/FooterMenu.vue'
import ContactUs from '@/components/footer/ContactUs.vue'
import GoogleMaps from '@/components/footer/GoogleMaps.vue'
import OpenMaps from '@/components/footer/OpenMaps.vue'
import { isDesktop } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { ref } from 'vue'
const { $gettext } = useGettext();
const currentYear = ref(new Date().getFullYear())

</script>

<style lang="scss">
#footer {
    background-color: $primary-color;
    color: $text-color-light;

    h4 {
        padding-bottom: 1rem;
        font-weight: bold;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
        position: relative;
        transition: 300ms;
        background: linear-gradient(currentColor, currentColor) bottom / 0 2px no-repeat;
        background-position: left bottom;

        &:hover {
            background-size: 100% 0.2rem;
            color: #43c7ff;
            opacity: 1;
        }
    }

    .footer_googlemaps iframe {
        display: block;
    }
}

#footer {
    @media screen and (max-width: $screen-lg) {
        .ia-column.span3 {
            grid-column: span 6;
        }
    }

    @media screen and (max-width: $screen-lm) {
        .ia-column.span3 {
            grid-column: span 12;
        }
    }
}
</style>
