<template>
    <!-- TODO: Remake header with primevue menubar https://primevue.org/menubar/ -->
    <header class="bg-primary text-primary-contrast z-20">
        <div class="flex flex-row gap-4 pt-10 pl-10 pr-10 pb-6">
            <div id="header_logo" class="basis-1/5">
                <Logo />
            </div>

            <div id="header_info" class="basis-4/5 justify-self-end flex flex-row justify-end gap-4">
                <SearchToggle v-if="isDesktop" />

                <EpaButton v-if="isTablet || isDesktop" href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
                    target="_blank" :class="['white', isTablet ? 'small' : '']">
                    {{ $gettext('Become a member') }}
                </EpaButton>

                <EpaButton v-if="isTablet || isDesktop" href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
                    target="_blank" :class="['white', isTablet ? 'small' : '']">
                    {{ $gettext('Sign-in') }}
                </EpaButton>

                <button class="mobilemenubutton" v-if="!isDesktop" @click="toggleMobileMenu()">
                    <EpaIcon icon="menu" />
                </button>
            </div>

        </div>

        <div id="header_menu" class="pl-10 pr-10 pb-4 sticky top-0">
            <Menubar :model="items">
                <template #item="{ item, props, hasSubmenu, root }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span>{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span>{{ item.label }}</span>
                        <template v-if="hasSubmenu">
                            <ChevronDown v-if="root" />
                            <ChevronRight v-else />
                        </template>
                    </a>
                </template>
                <template #end>
                    <div class="flex flex-row items-center gap-4">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </template>
            </Menubar>
        </div>
    </header>
</template>

<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import MainMenu from '@/components/menu/MainMenu.vue'
import EpaButton from '@/components/ui/EpaButton.vue'
import Menubar from 'primevue/menubar';
import { isDesktop, isTablet, openMobileMenu, toggleMobileMenu } from '@/functions/functions'
import EpaIcon from '@/components/ui/EpaIcon.vue'
import SearchToggle from '@/components/ui/SearchToggle.vue'
import { useGettext } from 'vue3-gettext'
import { ref } from 'vue';
import { ChevronDown, ChevronRight, Icon } from 'lucide-vue-next';
const { $gettext } = useGettext();

const items = ref([
    {
        label: 'Home',
        icon: 'home',
        route: '/'
    },
    {
        label: 'Activities',
        route: '/activities'
    },
    {
        label: 'News',
        route: '/News',
    },
    {
        label: 'Components',
        route: '/components',
    },
    {
        label: 'Association',
        items: [
            {
                label: 'Inter-Actief',
                route: '/about/1/about-the-association-inter-actief'
            },
            {
                label: 'Board',
                route: '/about/2/board'
            },
        ]
    },
    {
        label: 'Education',
        route: '/education'
    },
    {
        label: 'Contact',
        route: '/contact'
    }
]);


</script>

<style scoped lang="scss"></style>
