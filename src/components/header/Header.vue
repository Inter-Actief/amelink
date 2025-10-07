<template>
    <!-- TODO: Make header menubar styling better (regarding hover states etc)-->
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

        <div class="pl-10 pr-10 pb-4">
            <Menubar :model="items" class="p-0 sticky top-0 z-50">
                <template #item="{ item, props, hasSubmenu, root }"
                    :class="{ 'hover:bg-primary-600 active:bg-primary-600 rounded-lg': root }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="{ 'text-color': !root, }">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="{ 'text-color': !root }">{{ item.label }}</span>
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
import EpaButton from '@/components/ui/EpaButton.vue'
import Menubar from 'primevue/menubar';
import { isDesktop, isTablet, openMobileMenu, toggleMobileMenu } from '@/functions/functions'
import EpaIcon from '@/components/ui/EpaIcon.vue'
import SearchToggle from '@/components/ui/SearchToggle.vue'
import { useGettext } from 'vue3-gettext'
import { computed, reactive, ref } from 'vue';
import { ChevronDown, ChevronRight, Icon } from 'lucide-vue-next';
const { $gettext } = useGettext();

// TODO: Translate menu bar
const items = computed(() => [
    {
        label: $gettext('Home'),
        icon: 'home',
        route: '/'
    },
    {
        label: $gettext('Activities'),
        route: '/activities'
    },
    {
        label: $gettext('News'),
        route: '/News',
    },
    {
        label: $gettext('Components'),
        route: '/components',
    },
    {
        label: $gettext('Publications'),
        route: '/publications'
    },
    {
        label: $gettext('Association'),
        items: [
            {
                label: $gettext('Inter-Actief'),
                route: '/about/1/about-the-association-inter-actief'
            },
            {
                label: $gettext('Board'),
                route: '/about/2/board'
            },
            {
                label: $gettext('Former boards'),
                route: '/about/6/former-boards'
            },
            {
                label: $gettext('Honorary members'),
                route: '/about/8/honorary-members/'
            },
            {
                label: $gettext('Members of Merit'),
                route: '/about/19/members-of-merit/'
            },
            {
                label: $gettext('Committees'),
                route: '/'
            },
            {
                label: $gettext('Membership'),
                route: '/about/3/membership/'
            },
            {
                label: $gettext('(Graduation) drink'),
                route: '/about/26/graduation-drink/'
            },
            {
                label: $gettext('Symposia'),
                route: '/about/20/symposia/'
            },
            {
                label: $gettext('Study tours'),
                route: '/about/28/study-tours/'
            },
            {
                label: $gettext("Members' initiative"),
                route: '/about/14/members-initiative/'
            },
            {
                label: $gettext('Association song'),
                route: '/about/5/association-song/'
            },
            {
                label: $gettext('Alumni Association ENIAC'),
                route: '/about/16/alumni-association-eniac/'
            },
            {
                label: $gettext('Sister associations'),
                route: '/about/4/sister-associations/'
            },
            {
                label: $gettext('Inter-Actief App'),
                route: '/about/27/the-inter-actief-app/'
            },
            {
                label: $gettext('Inter-Archive'),
                url: 'https://inter-archief.net/'
            }
        ]
    },
    {
        label: $gettext('Education'),
        route: '/education'
    },
    {
        label: $gettext('Contact'),
        route: '/contact'
    }
]);


</script>

<style scoped lang="scss"></style>
