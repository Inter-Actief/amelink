<template>
    <!--
        One deck: logo, menu and account actions on a single 64px bar that stays
        on screen while scrolling. Below 1280px the menu moves into the drawer and
        the bar keeps the logo, the primary action and the account button, because
        ten labels plus the actions need roughly the full content width.
    -->
    <header class="site-header text-primary-contrast" :class="{
        'bg-primary': mode != 'staging',
        'bg-hazard-staging': mode == 'staging'
    }">
        <!-- One bar for every screen at md and up; the menu drops into the
             drawer when ten labels plus the actions no longer fit. -->
        <div class="hidden md:flex page-container items-center gap-3 h-[64px]">
            <Logo class="shrink-0" />

            <nav ref="navEl" class="mainnav hidden min-[1280px]:flex flex-1 min-w-0 items-center" :aria-label="$gettext('Main')">
                <div v-for="item in menu" :key="item.labelKey" class="nav-item"
                    :class="{ 'nav-item-on': isActive(item), 'nav-item-open': openMenu === item.labelKey }"
                    @mouseenter="onItemEnter(item)">
                    <RouterLink v-if="!item.items && item.route" class="nav-link" :to="item.route">
                        {{ $gettext(item.labelKey) }}
                    </RouterLink>

                    <span v-else-if="!item.items" class="nav-link">
                        {{ $gettext(item.labelKey) }}
                    </span>

                    <template v-else>
                        <!-- A section with children opens on click; it must not
                             navigate away before the visitor picks a child. -->
                        <button type="button" class="nav-link nav-trigger"
                            :aria-expanded="openMenu === item.labelKey" aria-haspopup="true"
                            @click="toggleMenu(item.labelKey)">
                            {{ $gettext(item.labelKey) }}
                            <ChevronDown class="nav-caret"
                                :class="{ 'nav-caret-open': openMenu === item.labelKey }" />
                        </button>

                        <div class="nav-sub" :class="{ 'nav-sub-wide': (item.items?.length ?? 0) > 8 }">
                            <template v-for="child in item.items" :key="child.labelKey">
                                <RouterLink v-if="child.route" :to="child.route" class="nav-sub-link"
                                    @click="closeMenu">
                                    {{ $gettext(child.labelKey) }}
                                </RouterLink>
                                <a v-else :href="child.url" target="_blank" rel="noopener" class="nav-sub-link"
                                    @click="closeMenu">
                                    {{ $gettext(child.labelKey) }}
                                </a>
                            </template>
                        </div>
                    </template>
                </div>
            </nav>

            <div class="header-actions flex items-center gap-2 shrink-0 ml-auto">
                <a class="hdr-icon hidden min-[1280px]:grid place-items-center" :href="oldFrontendUrl" :aria-label="$gettext('Old website')"
                    :title="$gettext('Old website')">
                    <ArrowUpRight />
                </a>
                <Button as="a" :label="$gettext('Become a member')" class="header-cta"
                    href="https://www.inter-actief.utwente.nl/oidc/authenticate/" />
                <UserButton />
                <LanguageSwitcher class="hdr-icon hidden min-[1280px]:grid place-items-center" />
                <ThemeSwitcher class="hdr-icon hidden min-[1280px]:grid place-items-center" />
                <button type="button" class="hdr-icon menu-toggle grid place-items-center min-[1280px]:hidden" :aria-label="$gettext('Open menu')"
                    @click="menuVisible = true">
                    <Menu />
                </button>
            </div>
        </div>

        <!-- Phone: logo and hamburger, then the two actions -->
        <div class="md:hidden flex flex-row items-center gap-3 page-gutter pt-3 pb-2">
            <Logo class="flex-1" />
            <button type="button" class="hdr-icon grid place-items-center" :aria-label="$gettext('Open menu')" @click="menuVisible = true">
                <Menu />
            </button>
        </div>

        <div class="md:hidden flex flex-row gap-2 page-gutter pb-3">
            <Button as="a" :label="$gettext('Become a member')" class="header-cta flex-1"
                href="https://www.inter-actief.utwente.nl/oidc/authenticate/" />
            <UserButton class="flex-1" />
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
 * The hovered section still opens through the CSS :hover rule.
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
</script>

<style scoped>
.site-header {
    position: sticky;
    top: 0;
    z-index: 40;
}

.site-header :deep(.logo svg) {
    height: 3.2rem;
    width: auto;
}

.mainnav {
    height: 100%;
    /* The dropdowns hang below the bar; anything but visible clips them. */
    overflow: visible;
}

.nav-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
}

.nav-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    height: 100%;
    /* The labels plus the action row need about 1300px at full size, so they
       scale down slightly before the menu is pushed into the drawer. */
    padding-inline: clamp(0.3rem, 0.35vw, 0.45rem);
    /* The bar centres the logo on its box, but the wordmark's baseline sits
       below the optical centre. Drop the label line by the same offset so both
       baselines meet. */
    padding-top: 0.85rem;
    font-size: clamp(1.25rem, 0.9vw, 1.35rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.92);
    white-space: nowrap;
    transition: color 160ms ease;
}

/* A dropdown trigger is a button, but it must look exactly like a nav link. */
.nav-trigger {
    background: transparent;
    border: 0;
    border-radius: 0;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
}

.nav-trigger:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -4px;
}

/* Same slide-in underline as .link, so navigation and text links agree */
.nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.3rem;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 220ms ease;
}

.nav-link:hover {
    color: #fff;
}

.nav-link:hover::after,
.nav-item-on > .nav-link::after {
    transform: scaleX(1);
}

.nav-item-on > .nav-link {
    color: #fff;
    font-weight: 700;
}

.nav-caret {
    width: 1.4rem;
    height: 1.4rem;
    opacity: 0.85;
    transition: transform 160ms ease;
}

.nav-caret-open {
    transform: rotate(180deg);
}

.nav-sub {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 60;
    min-width: 22rem;
    padding-block: 0.5rem;
    background: var(--p-content-background, #fff);
    color: var(--p-text-color, #1e1e1e);
    border-top: 0.2rem solid var(--p-primary-color);
    box-shadow: 0 0.8rem 2.4rem rgba(13, 16, 22, 0.18);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-0.4rem);
    transition: opacity 160ms ease, transform 160ms ease, visibility 160ms;
}

.nav-sub-wide {
    min-width: 44rem;
    columns: 2;
    column-gap: 0;
}

.nav-item:hover .nav-sub,
.nav-item-open .nav-sub {
    opacity: 1;
    visibility: visible;
    transform: none;
}

.nav-sub-link {
    display: block;
    padding: 0.5rem 1.2rem;
    font-size: 1.4rem;
    color: inherit;
    break-inside: avoid;
    transition: background-color 140ms ease, color 140ms ease;
}

.nav-sub-link:hover {
    background: rgba(29, 66, 138, 0.07);
    color: var(--p-primary-color);
}

.hdr-icon {
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 0.4rem;
    color: inherit;
    cursor: pointer;
    transition: background-color 160ms ease;
}

.hdr-icon:hover {
    background: rgba(255, 255, 255, 0.16);
}

.hdr-icon :deep(svg) {
    width: 1.8rem;
    height: 1.8rem;
}

/* The whole action row speaks one language: outline by default, one solid CTA */
.header-actions :deep(.p-button) {
    padding: 0.55rem 1.1rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 0.4rem;
    background: transparent;
    color: inherit;
    box-shadow: none;
    transition: background-color 160ms ease;
}

.header-actions :deep(.p-button:hover) {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.7);
    color: inherit;
}

.header-actions :deep(.header-cta),
.header-cta {
    background: #fff;
    border: 1px solid #fff;
    color: var(--p-primary-color);
    font-weight: 700;
}

.header-actions :deep(.header-cta:hover),
.header-cta:hover {
    background: rgba(255, 255, 255, 0.86);
    border-color: rgba(255, 255, 255, 0.86);
    color: var(--p-primary-color);
}
</style>
