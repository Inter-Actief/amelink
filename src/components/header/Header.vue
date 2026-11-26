<template>
    <!--
        One deck: logo, menu and account actions on a single 64px bar that stays
        on screen while scrolling. Below 1280px the menu moves into the drawer and
        the bar keeps the logo, the primary action and the account button, because
        ten labels plus the actions need roughly the full content width.
    -->
    <header
        class="sticky top-0 z-40 text-primary-contrast"
        :class="{
            'bg-primary': mode != 'staging',
            'bg-hazard-staging': mode == 'staging',
        }"
    >
        <!-- One bar for every screen at md and up; the menu drops into the
             drawer when ten labels plus the actions no longer fit. -->
        <div
            class="mx-auto hidden h-[64px] w-full max-w-[var(--content-max-width)] items-center gap-3 px-[1.5rem] md:flex md:px-[2.5rem]"
        >
            <Logo class="shrink-0 [&_svg]:h-[3.2rem] [&_svg]:w-auto" />

            <nav
                ref="navEl"
                class="hidden h-full min-w-0 flex-1 items-center overflow-visible min-[1280px]:flex"
                :aria-label="$gettext('Main')"
            >
                <div
                    v-for="item in menu"
                    :key="item.labelKey"
                    class="group relative flex h-full items-center"
                    @mouseenter="onItemEnter(item)"
                >
                    <RouterLink
                        v-if="!item.items && item.route"
                        :class="navLinkClasses(item)"
                        :to="item.route"
                    >
                        {{ $gettext(item.labelKey) }}
                    </RouterLink>

                    <span v-else-if="!item.items" :class="navLinkClasses(item)">
                        {{ $gettext(item.labelKey) }}
                    </span>

                    <template v-else>
                        <!-- A section with children opens on click; it must not
                             navigate away before the visitor picks a child. -->
                        <button
                            type="button"
                            class="cursor-pointer border-0 bg-transparent text-left font-[inherit]"
                            :class="navLinkClasses(item)"
                            :aria-expanded="openMenu === item.labelKey"
                            aria-haspopup="true"
                            @click="toggleMenu(item.labelKey)"
                        >
                            {{ $gettext(item.labelKey) }}
                            <ChevronDown
                                class="h-[1.4rem] w-[1.4rem] opacity-85 transition-transform duration-150"
                                :class="{ 'rotate-180': openMenu === item.labelKey }"
                            />
                        </button>

                        <div
                            class="invisible absolute left-0 top-full z-[60] min-w-[22rem] -translate-y-1 border-t-2 border-primary bg-[var(--p-content-background,#fff)] py-2 text-[var(--p-text-color,#1e1e1e)] opacity-0 shadow-xl transition-all duration-200 group-hover:visible! group-hover:translate-y-0 group-hover:opacity-100"
                            :class="[
                                openMenu === item.labelKey
                                    ? 'visible! translate-y-0 opacity-100'
                                    : '',
                                (item.items?.length ?? 0) > 8
                                    ? 'min-w-[44rem] columns-2 gap-0'
                                    : '',
                            ]"
                        >
                            <template v-for="child in item.items" :key="child.labelKey">
                                <RouterLink
                                    v-if="child.route"
                                    :to="child.route"
                                    class="block break-inside-avoid px-[1.2rem] py-2 text-[1.4rem] text-inherit transition-colors duration-150 hover:bg-primary/[0.07] hover:text-primary"
                                    @click="closeMenu"
                                >
                                    {{ $gettext(child.labelKey) }}
                                </RouterLink>
                                <a
                                    v-else
                                    :href="child.url"
                                    target="_blank"
                                    rel="noopener"
                                    class="block break-inside-avoid px-[1.2rem] py-2 text-[1.4rem] text-inherit transition-colors duration-150 hover:bg-primary/[0.07] hover:text-primary"
                                    @click="closeMenu"
                                >
                                    {{ $gettext(child.labelKey) }}
                                </a>
                            </template>
                        </div>
                    </template>
                </div>
            </nav>

            <div class="ml-auto flex shrink-0 items-center gap-2">
                <a
                    class="header-icon hidden place-items-center min-[1280px]:grid"
                    :href="oldFrontendUrl"
                    :aria-label="$gettext('Old website')"
                    :title="$gettext('Old website')"
                >
                    <ArrowUpRight />
                </a>
                <Button
                    as="a"
                    :label="$gettext('Become a member')"
                    class="header-action header-cta"
                    href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
                />
                <UserButton />
                <LanguageSwitcher class="header-icon hidden min-[1280px]:grid" />
                <ThemeSwitcher class="header-icon hidden min-[1280px]:grid" />
                <button
                    type="button"
                    class="header-icon grid min-[1280px]:hidden"
                    :aria-label="$gettext('Open menu')"
                    @click="menuVisible = true"
                >
                    <Menu />
                </button>
            </div>
        </div>

        <!-- Phone: logo and hamburger, then the two actions -->
        <div
            class="flex flex-row items-center gap-3 px-[1.5rem] pb-2 pt-3 md:hidden md:px-[2.5rem]"
        >
            <Logo class="flex-1 [&_svg]:h-[3.2rem] [&_svg]:w-auto" />
            <button
                type="button"
                class="header-icon grid"
                :aria-label="$gettext('Open menu')"
                @click="menuVisible = true"
            >
                <Menu />
            </button>
        </div>

        <div class="flex flex-row gap-2 px-[1.5rem] pb-3 md:hidden md:px-[2.5rem]">
            <Button
                as="a"
                :label="$gettext('Become a member')"
                class="header-action header-cta min-w-0 flex-1"
                href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
            />
            <div class="flex min-w-0 flex-1 [&_.p-button]:w-full">
                <UserButton />
            </div>
        </div>

        <MobileMenu v-model:visible="menuVisible" />
    </header>
</template>

<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import Button from 'primevue/button'
import { useGettext } from 'vue3-gettext'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight, ChevronDown, Menu } from '@lucide/vue'
import UserButton from './UserButton.vue'
import MobileMenu from './MobileMenu.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import { mainMenu, type MenuItem } from '@/constants/pageCategories'

const { $gettext } = useGettext()
const mode = import.meta.env.VITE_ENV
const oldFrontendUrl = import.meta.env.VITE_OLD_FRONTEND_URL
const menuVisible = ref(false)
const route = useRoute()
const navEl = ref<HTMLElement | null>(null)

const menu = mainMenu

/** Label key of the desktop dropdown that is currently open. */
const openMenu = ref<string | null>(null)

function toggleMenu(labelKey: string) {
    openMenu.value = openMenu.value === labelKey ? null : labelKey
}

function closeMenu() {
    openMenu.value = null
}

/**
 * Hovering another section should not leave a clicked-open menu behind it.
 * The hovered section still opens through the group-hover utilities.
 */
function onItemEnter(item: MenuItem) {
    if (openMenu.value && openMenu.value !== item.labelKey) {
        closeMenu()
    }
}

function onDocumentClick(event: MouseEvent) {
    if (!openMenu.value || navEl.value?.contains(event.target as Node)) {
        return
    }

    closeMenu()
}

function onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick)
    document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onDocumentClick)
    document.removeEventListener('keydown', onDocumentKeydown)
})

watch(() => route.fullPath, closeMenu)

const path = computed(() => route.path.toLowerCase())

/** A section is active on its own page and on any of its children's pages. */
function isActive(item: MenuItem) {
    const targets = [item.route, ...(item.items ?? []).map((child) => child.route)]
        .filter((target): target is string => Boolean(target))
        .map((target) => target.toLowerCase().replace(/\/$/, ''))

    if (!targets.length) return false

    return targets.some((target) => {
        if (target === '') return path.value === '/'
        return path.value === target || path.value.startsWith(`${target}/`)
    })
}

/** One visual language for every top-level item, whether it is a link or a
 *  dropdown trigger. The underline is the same slide-in bar as `.link`. */
const navLinkBase =
    'relative flex h-full items-center gap-[0.3rem] whitespace-nowrap px-[clamp(0.3rem,0.35vw,0.45rem)] pt-[0.85rem] text-[clamp(1.25rem,0.9vw,1.35rem)] font-medium text-white/90 transition-colors duration-150 after:absolute after:inset-x-0 after:bottom-0 after:h-[0.3rem] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current'

function navLinkClasses(item: MenuItem) {
    return [
        navLinkBase,
        isActive(item) || openMenu.value === item.labelKey
            ? 'font-bold text-white after:scale-x-100'
            : '',
    ]
}
</script>
