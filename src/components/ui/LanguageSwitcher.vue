<template>
    <div class="language_switcher">
        <div class="language_switcher_head">
            <img :src="`/src/assets/images/flags/${gettext.current}.svg`" />
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.7585 1.26798L8.52697 7.81322C8.24857 8.0618 7.83109 8.0618 7.55246 7.81322L0.240435 1.26798C-0.057737 0.958903 -0.0818271 0.540736 0.186346 0.240746C0.47179 -0.0728798 0.931775 -0.0683344 1.21495 0.186202L7.99972 6.29509L14.7858 0.186202C15.0856 -0.0809249 15.5445 -0.0574716 15.814 0.2402C16.0813 0.540735 16.0585 0.958903 15.7585 1.26798Z"
                    fill="#fff" />
            </svg>
        </div>

        <div class="language_switcher_dorpdown">
            <div class="inner">
                <template v-for="lang in gettext.available">
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
import { useGettext } from 'vue3-gettext'
const gettext = useGettext();

//TODO: Make this in a language functions util / pinia store
function changeLanguage(newLanguage: string) {
    if (gettext.current === newLanguage) {
        return
    }

    gettext.current = newLanguage;

    localStorage.setItem('locale', newLanguage)

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

    .language_switcher_dorpdown {
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
        .language_switcher_dorpdown {
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

        .language_switcher_dorpdown {
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
