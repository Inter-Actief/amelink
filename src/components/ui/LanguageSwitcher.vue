<template>
    <div class="language_switcher">
        <div class="language_switcher_head">
            <img :src="`/src/assets/images/flags/${gettext.current}.svg`" />
            <ChevronDown />
        </div>

        <div class="language_switcher_dropdown">
            <div class="inner">
                <template v-for="lang in Object.keys(gettext.available)">
                    <div @click="changeLanguage(lang)">
                        <img width="22" height="16" :aria-label="`lang ${lang}`"
                            :src="`/src/assets/images/flags/${lang}.svg`" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { closeMobileMenu } from '@/functions/functions'
import { useLanguageStore } from '@/stores/languageStore';
import { useGettext } from 'vue3-gettext'
import { ChevronDown } from 'lucide-vue-next';
const gettext = useGettext();
const langStore = useLanguageStore();

//TODO: Make this in a language functions util / pinia store
function changeLanguage(newLanguage: string) {
    langStore.switchLanguage(newLanguage);

    closeMobileMenu()
}
</script>

<style scoped lang="scss">
.language_switcher {
    position: relative;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: $gap_xs;
    cursor: pointer;

    .language_switcher_head {
        display: flex;
        gap: $gap_xs;
        align-items: center;
        justify-content: space-between;
    }

    img {
        width: 2.2rem;
        max-width: 10rem;
    }

    .language_switcher_dropdown {
        z-index: 999;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        visibility: hidden;
        padding: 1rem 0 0 0;

        .inner {
            display: grid;
            gap: $gap_xxs;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
            background-color: $color_white;

            div {
                cursor: pointer;
                padding: 1rem 1rem;

                &:hover {
                    background-color: $color_light2;
                }
            }
        }
    }

    &:hover {
        .language_switcher_dropdown {
            visibility: visible;
        }
    }
}

#mobilemenu {
    .language_switcher {
        width: 100%;
        padding: 1rem 0;
        display: grid;

        .language_switcher_head {
            width: 100%;
        }

        .language_switcher_dropdown {
            width: 100%;
            position: relative;
            top: 0;
            transform: initial;
            visibility: visible;
            left: 0;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: $border-radius;
            padding: 1rem;

            .inner {
                background-color: transparent;
                box-shadow: none;
            }
        }
    }
}
</style>
