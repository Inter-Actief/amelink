<template>
    <div class="w-100 bg-primary grid grid-cols-12 gap-20 text-primary-contrast py-20">
        <div class="col-span-3 col-start-2">
            <Logo class="pb-4" />
            <div class="pb-8">{{ $gettext('footer.text') }}</div>
            <div class="align-bottom">{{ currentYear }} | Inter-Actief</div>
        </div>

        <div class="col-span-2">
            <div class="font-bold pb-2">Pages</div>
            <div v-for="item in pages" :key="item.name" class="py-1">
                <RouterLink :to="{ name: item.page }" class="link">{{ item.name }}</RouterLink>
            </div>
        </div>

        <div class="col-span-2">
            Nog wat tekst

            Nog wat tekst
        </div>

        <div class="col-span-2">
            <h4>{{ $gettext('Contact us') }}</h4>

            <ul>
                <li>Zilverling, kamer E208</li>
                <li>Drienerlolaan 5</li>
                <li>7522 NB Enschede</li>
                <li>The Netherlands</li>
            </ul>
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
