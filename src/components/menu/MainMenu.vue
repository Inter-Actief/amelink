<template>
    <Search class="fade" v-if="search" :style="animation ? { animationDelay: `100ms` } : ''" />

    <nav>
        <ul :class="['mainmenu', animation ? 'animation' : '']">
            <template v-for="(item, index) in menu" :key="item">
                <li class="menu-item">
                    <span class="link">
                        <component
                            :is="htmlElement(item.route)"
                            @click="item.route ? closeMobileMenu() : ''"
                            :to="{ name: item.route, params: {} }"
                            :style="animation ? { animationDelay: `${1 + index * 100}ms` } : ''"
                        >
                            <template v-if="!item.icon">
                                {{ item.name }}
                            </template>
                            <EpaIcon v-else icon="home" />
                        </component>

                        <span class="icon" v-if="item.subItems" @click="toggleSubMenu(index)">
                            <EpaIcon icon="angledown" />
                        </span>
                        <template v-else></template>
                    </span>

                    <ul
                        v-if="
                            (item.subItems && openSubMenu === index) ||
                            (item.subItems && location === 'header')
                        "
                        class="submenu"
                    >
                        <li class="subitem" v-for="sub in item.subItems" :key="sub">
                            <component
                                :is="htmlElement(sub.route)"
                                @click="closeMobileMenu()"
                                :to="{ name: sub.route, params: { id: sub.id, slug: sub.slug } }"
                            >
                                {{ sub.name }}
                            </component>
                        </li>
                    </ul>
                </li>
            </template>

            <li
                :class="['menu-item', animation ? 'fade' : '']"
                :style="animation ? { animationDelay: `${(menu.length + 2) * 100}ms` } : ''"
            >
                <span class="link">
                    <LanguageSwitcher />
                </span>
            </li>
        </ul>
    </nav>

    <MenuInfo
        v-if="info"
        :style="animation ? { animationDelay: `${(menu.length + 3) * 100}ms` } : ''"
    />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import EpaIcon from '@/components/ui/EpaIcon.vue'
import { closeMobileMenu, openMobileMenu, openSubMenu, toggleSubMenu } from '@/functions/functions'
import MenuInfo from '@/components/menu/MenuInfo.vue'
import Search from '@/components/ui/Search.vue'

const { t, locale } = useI18n() // Access the i18n instance

const props = defineProps(['animation', 'location', 'search', 'info'])

const htmlElement = (route) => {
    return route ? 'router-link' : 'span'
}

const menu = [
    {
        icon: true,
        name: 'Home',
        url: '/',
        slug: 'home',
        route: 'home',
    },
    {
        name: 'Activities',
        url: '/activities',
        slug: 'activities',
        route: 'activities',
    },
    {
        name: 'News',
        url: '/news',
        slug: 'news',
        route: 'news',
    },
    {
        name: 'Components',
        url: '/components',
        slug: 'components',
        route: 'components',
    },
    {
        name: 'Association',
        url: '',
        route: '',
        subItems: [
            {
                id: '1',
                name: 'Inter-Actief',
                slug: 'about-the-association-inter-actief',
                url: '/about/1/about-the-association-inter-actief/',
                route: 'page',
            },
            {
                id: '2',
                name: 'Board',
                slug: 'board',
                url: '/about/2/board',
                route: 'page',
            },
        ],
    },
    {
        name: 'Education',
        url: '/education',
        slug: 'education',
        route: 'education',
    },
    {
        name: 'Contact',
        url: '/contact',
        slug: 'contact',
        route: 'contact',
    },
]
</script>

<style scoped lang="scss">
.mainmenu {
    list-style: none;
    display: flex;
    gap: $gap_xs;
    align-items: center;
    padding: 0;
    justify-content: space-between;

    a {
        color: inherit;
        text-decoration: none;
    }

    li.menu-item {
        .link {
            display: flex;
            gap: $gap-xs;
            align-items: center;

            > a {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 0.2rem;
                    width: 0;
                    transition: 300ms;
                    background-color: #fff;
                }
            }

            a.router-link-active:before,
            &:hover > a:before {
                width: 100%;
            }
        }

        ul.submenu:hover,
        &:hover ul.submenu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        ul.submenu {
            padding: 1rem;
            box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
            border-radius: $border-radius;
            position: absolute;
            z-index: 99;
            min-width: 20rem;
            text-align: left;
            display: grid;
            background-color: $color_white;
            opacity: 0;
            visibility: hidden;
            transform: translateY(1rem);
            transition: 300ms;
            list-style: none;

            & > li {
                > a {
                    color: $primary-color;
                    border-radius: $border-radius;
                    padding: 0.5rem 1rem;
                    display: block;
                }

                > a.router-link-active,
                &:hover > a {
                    background-color: $color_light2;
                }
            }
        }
    }
}

#mobilemenu .mainmenu {
    display: grid;
    justify-content: end;
    grid-template-columns: 100%;

    li.menu-item {
        position: relative;

        .link {
            gap: 2rem;
            justify-content: space-between;

            span {
                padding: 2rem 1.6rem;
                line-height: 0;
                margin: -1rem -1.6rem -1rem 0;
                cursor: pointer;
            }
        }

        ul.submenu {
            position: relative;
            width: 100%;
            transform: none;
            box-shadow: none;
            opacity: 1;
            visibility: visible;
            background-color: rgba(0, 0, 0, 0.1);
            margin: 1rem 0;

            > li > a {
                color: inherit;
            }
        }
    }

    &.animation {
        li.menu-item {
            > .link span,
            > .link a {
                animation-name: inherit;
                animation-duration: 0.5s;
                animation-iteration-count: 1;
                animation-timing-function: ease-in-out;
                animation-fill-mode: both;
                animation-delay: 0ms;
            }

            &.fade {
                animation-name: inherit;
                animation-duration: 0.5s;
                animation-iteration-count: 1;
                animation-timing-function: ease-in-out;
                animation-fill-mode: both;
                animation-delay: 0ms;
            }
        }
    }
}

#mobilemenu {
    .mobile_menu_info,
    .searchbar.fade {
        animation-name: inherit;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
        animation-fill-mode: both;
        animation-delay: 0ms;
    }
}

#mobilemenu.open {
    .mainmenu > li.menu-item {
        > .link span,
        > .link a {
            animation-name: menuitem;
        }

        &.fade {
            animation-name: fade;
        }
    }

    .mobile_menu_info,
    .searchbar.fade {
        animation-name: fade;
    }
}

@keyframes menuitem {
    0% {
        transform: translateX(10rem);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
