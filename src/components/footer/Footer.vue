<template>
    <div class="w-100 bg-primary grid grid-cols-12 gap-20 text-primary-contrast py-20">
        <div class="col-span-3 col-start-2">
            <Logo class="pb-8" />
            <div class="pb-8">{{ $gettext('footer.text') }}</div>
            <div class="align-bottom">{{ currentYear }} | Inter-Actief</div>
        </div>

        <div class="col-span-2">
            <div class="font-bold pb-2">{{ $gettext('Pages') }}</div>
            <div v-for="item in pages" :key="item.name">
                <RouterLink :to="{ name: item.page }" class="link">{{ item.name }}</RouterLink>
            </div>
        </div>

        <div class="col-span-2">
            <div class="font-bold pb-2">{{ $gettext('Important information') }}</div>
            <div><a class="link" href="https://privacy.ia.utwente.nl/">{{ $gettext('Privacy policy') }}</a></div>
            <div>
                <RouterLink :to="{ name: 'contact' }" class="link">{{ $gettext('Contact') }}</RouterLink>
            </div>
            <div><a class="link" href="https://github.com/Inter-Actief/amelink/issues">
                    {{ $gettext('Report a problem') }}</a></div>
            <div>
                <RouterLink to="/about/33/coordinated-vulnerability-disclosure-policy/" class="link">
                    {{ $gettext('CVD Policy') }}</RouterLink>
            </div>
        </div>

        <div class="col-span-2">
            <div class="font-bold pb-2">{{ $gettext('Contact us') }}</div>
            <div>Zilverling, kamer E208</div>
            <div>Drienerlolaan 5</div>
            <div>7522 NB Enschede</div>
            <div>The Netherlands</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
// import FooterMenu from '@/components/menu/FooterMenu.vue'
import { isDesktop } from '@/functions/functions'
import { useGettext } from 'vue3-gettext'
import { computed, ref } from 'vue'
const { $gettext } = useGettext();
const currentYear = ref(new Date().getFullYear())

const pages = computed(() => [
    {
        name: $gettext('Activities'),
        page: 'activities'
    },
    {
        name: $gettext('News'),
        page: 'news'
    },
    {
        name: $gettext('Publications'),
        page: 'publications'
    },
    {
        name: $gettext('Education'),
        page: 'education'
    }
])

</script>

<style lang="scss"></style>
