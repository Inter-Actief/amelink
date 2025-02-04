<template>
    <div class="mobile_menu_info" >
        <EpaButton
            v-if="!isTablet && !isDesktop"
            href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
            target="_blank"
            class="white">
            {{ $t('Become a member') }}
        </EpaButton>

        <EpaButton
            v-if="!isTablet && !isDesktop"
            href="https://www.inter-actief.utwente.nl/oidc/authenticate/"
            target="_blank"
            class="white">
            {{ $t('Sign-in') }}
        </EpaButton>
    </div>
</template>

<script setup lang="ts">

import {isDesktop, isTablet} from "@/functions/functions";
import EpaButton from "@/components/ui/EpaButton.vue";

</script>

<style scoped lang="scss">

#mobilemenu {

    &.open {
        .mobile_menu_inner {

            .mobile_menu_info {

            }
        }
    }

    .mobile_menu_inner {
        display: grid;
        gap: $gap;

        .mobile_menu_info {
            display: grid;
            gap: $gap-xs;

            animation-name: inherit;
            animation-duration: 0.5s;
            animation-iteration-count: 1;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both;
            animation-delay: 0ms;
        }
    }
}

</style>