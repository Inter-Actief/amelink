<template>
    <!-- TODO: Make header menubar styling better (regarding hover states etc)-->
    <header class="bg-primary text-primary-contrast z-20">
        <!-- Desktop: Logo and buttons on same row -->
        <div class="hidden md:flex flex-row gap-4 pt-10 pl-10 pr-10 pb-6">
            <div id="header_logo" class="basis-1/5">
                <Logo />
            </div>

            <div class="basis-4/5 justify-self-end flex flex-row justify-end gap-4">
                <!-- <SearchToggle v-if="isDesktop" /> -->
                <Button as="a" severity="secondary" :href="oldFrontendUrl">
                    {{ $gettext('Old website') }}
                    <ArrowUpRight />
                </Button>
                <Button as="a" :label="$gettext('Become a member')" severity="secondary"
                    href="https://www.inter-actief.utwente.nl/oidc/authenticate/">
                </Button>
                <UserButton></UserButton>
            </div>

        </div>

        <!-- Mobile: Logo on first row -->
        <div class="md:hidden flex flex-row gap-4 pt-6 px-4 pb-4">
            <div id="header_logo" class="flex-1">
                <Logo />
            </div>
        </div>

        <!-- Mobile: Buttons on second row -->
        <div class="md:hidden flex flex-row gap-4 px-4 pb-6">
            <Button as="a" severity="secondary" :href="oldFrontendUrl" class="flex-1">
                {{ $gettext('Old website') }}
                <ArrowUpRight />
            </Button>
            <Button as="a" :label="$gettext('Become a member')" severity="secondary"
                href="https://www.inter-actief.utwente.nl/oidc/authenticate/" class="flex-1">
            </Button>
            <UserButton class="flex-1"></UserButton>
        </div>

        <div class="pl-10 pr-10 pb-4">
            <Menubar :model="menuItems" class="p-0 sticky top-0 z-50" breakpoint="768px">
                <template #start></template>
                <template #item="{ item, props, hasSubmenu, root }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <!-- Only text-primary when not dark, and on small mobile screen! -->
                            <span :class="{ 'md:text-primary-contrast': root, }">{{ item.label }}</span>
                            <!-- <span>{{ item.label }}</span> -->
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="{ 'md:text-primary-contrast': root, }">{{ item.label }}</span>
                        <template v-if="hasSubmenu">
                            <ChevronDown v-if="root" class="md:text-primary-contrast" />
                            <ChevronRight v-else />
                        </template>
                    </a>
                </template>
                <template #end>
                    <div class="flex flex-row items-center gap-4 text-primary-contrast min-h-10">
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
import Menubar from 'primevue/menubar';
import { useGettext } from 'vue3-gettext'
import { computed, reactive, ref } from 'vue';
import { ArrowUpRight, ChevronDown, ChevronRight, Icon } from '@lucide/vue';
import UserButton from './UserButton.vue';
import { mainMenu } from '@/constants/pageCategories';

const { $gettext } = useGettext();

const oldFrontendUrl = import.meta.env.VITE_OLD_FRONTEND_URL;

// Transform menu with translations
const menuItems = computed(() => {
    const transformMenu = (items: typeof mainMenu): typeof items => {
        return items.map(item => ({
            ...item,
            label: $gettext(item.labelKey),
            items: item.items ? transformMenu(item.items) : undefined
        }));
    };
    return transformMenu(mainMenu);
});


</script>

<style scoped></style>
