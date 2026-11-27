<template>
    <Drawer
        v-model:visible="visible"
        position="right"
        :show-close-icon="false"
        :style="{ width: 'min(88vw, 340px)' }"
        :pt="{
            header: { class: 'hidden' },
            content: { class: 'flex-1 overflow-y-auto p-0' },
        }"
    >
        <div
            class="flex items-center justify-between gap-3 bg-primary px-3 py-2 text-primary-contrast"
        >
            <Logo class="[&_svg]:h-[3.2rem] [&_svg]:w-auto" />
            <button
                type="button"
                class="header-icon grid"
                :aria-label="$gettext('Close menu')"
                @click="visible = false"
            >
                <X :size="22" />
            </button>
        </div>

        <div class="px-3 py-3">
            <!-- Sections, as tiles -->
            <div class="grid grid-cols-2 gap-2">
                <RouterLink
                    v-for="item in featuredSections"
                    :key="item.labelKey"
                    :to="sectionRoute(item)"
                    class="group relative block overflow-hidden rounded"
                >
                    <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="label(item)"
                        class="aspect-4/3 w-full object-cover"
                    />
                    <span
                        class="absolute bottom-0 left-0 w-full bg-slate-900/60 px-2 py-1 text-body font-semibold text-white transition-colors group-hover:bg-blue-800/80"
                    >
                        {{ label(item) }}
                    </span>
                </RouterLink>
            </div>

            <!-- The same rows as the header, so nothing is reachable only on a
                 wide screen. A section that also has a tile appears here too:
                 the tile is a shortcut, the row is the menu. -->
            <nav class="mt-3 flex flex-col pt-2">
                <template v-for="item in secondaryMenu" :key="item.labelKey">
                    <RouterLink
                        v-if="item.route && !item.items"
                        :to="item.route"
                        class="link flex flex-row py-1.5"
                        @click="close"
                    >
                        {{ label(item) }}
                    </RouterLink>

                    <template v-else-if="item.items">
                        <button
                            type="button"
                            class="link flex cursor-pointer flex-row items-center justify-between py-1.5"
                            :aria-expanded="expanded.includes(item.labelKey)"
                            @click="toggle(item.labelKey)"
                        >
                            {{ label(item) }}
                            <ChevronDown
                                :size="16"
                                class="transition-transform"
                                :class="{ 'rotate-180': expanded.includes(item.labelKey) }"
                            />
                        </button>
                        <div
                            v-if="expanded.includes(item.labelKey)"
                            class="flex flex-col gap-1 pb-2 pl-3"
                        >
                            <component
                                :is="item.url ? 'a' : RouterLink"
                                v-for="child in item.items"
                                :key="child.labelKey"
                                v-bind="
                                    child.url
                                        ? { href: child.url, target: '_blank', rel: 'noopener' }
                                        : { to: child.route }
                                "
                                class="link text-meta"
                                @click="close"
                            >
                                {{ label(child) }}
                            </component>
                        </div>
                    </template>
                </template>
            </nav>

            <!-- Account / extras -->
            <div class="mt-3 flex flex-col gap-2 pt-3">
                <a
                    :href="oldFrontendUrl"
                    target="_blank"
                    rel="noopener"
                    class="link flex flex-row items-center gap-1 text-meta"
                >
                    {{ $gettext('Old website') }}
                    <ArrowUpRight :size="14" />
                </a>
                <div class="flex flex-row items-center gap-2">
                    <LanguageSwitcher class="menu-icon" />
                    <ThemeSwitcher class="menu-icon" />
                    <ReducedMotionSwitcher class="menu-icon" />
                </div>
                <!-- A tooltip cannot explain the disabled icon on a touch
                     screen, so the system override is spelled out here. -->
                <p
                    v-if="reducedMotionLocked"
                    class="m-0 flex flex-row items-center gap-1 text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]"
                >
                    <Lock :size="13" />
                    {{ $gettext('Reduced motion is set by your system') }}
                </p>
            </div>
        </div>
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import { RouterLink, useRoute } from 'vue-router'
import { useGettext } from 'vue3-gettext'
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, ChevronDown, Lock, X } from '@lucide/vue'
import Logo from '@/components/ui/Logo.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import ReducedMotionSwitcher from '@/components/ui/ReducedMotionSwitcher.vue'
import { featuredSections, secondaryMenu, type MenuItem } from '@/constants/pageCategories'
import { useReducedMotionStore } from '@/stores/reducedMotionStore'

const { $gettext } = useGettext()
const route = useRoute()
const reducedMotionStore = useReducedMotionStore()
const reducedMotionLocked = computed(() => reducedMotionStore.locked)

const visible = defineModel<boolean>('visible', { default: false })
const expanded = ref<string[]>([])

const oldFrontendUrl = import.meta.env.VITE_OLD_FRONTEND_URL

const label = (item: MenuItem) => $gettext(item.labelKey)

/**
 * A section can be a plain route, or a parent whose first child is the section
 * page itself (education).
 */
const sectionRoute = (item: MenuItem) => item.route ?? item.items?.[0]?.route ?? '/'

const toggle = (key: string) => {
    expanded.value = expanded.value.includes(key)
        ? expanded.value.filter((k) => k !== key)
        : [...expanded.value, key]
}

const close = () => {
    visible.value = false
}

watch(() => route.fullPath, close)
</script>
