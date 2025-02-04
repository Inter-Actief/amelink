<template>

    <div class="searchbar">
        <input v-model="search" type="text" name="searchinput" id="searchinput">
        <router-link @click="closeMobileMenu" class="epa_button white" :to="{ name: 'search', query: { search: search } }">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.7791 22.7203L17.1463 16.0875C18.6088 14.3813 19.4572 12.1734 19.4572 9.75C19.4572 4.36406 15.0917 0 9.70721 0C4.32268 0 -0.000610352 4.36547 -0.000610352 9.75C-0.000610352 15.1345 4.3644 19.5 9.70721 19.5C12.1297 19.5 14.3408 18.6112 16.0447 17.1492L22.6775 23.782C22.865 23.925 23.0572 24 23.2494 24C23.4416 24 23.6332 23.9268 23.7796 23.7803C24.0744 23.4891 24.0744 23.0109 23.7791 22.7203ZM9.7494 18C5.16034 18 1.4994 14.2969 1.4994 9.75C1.4994 5.20312 5.16034 1.5 9.7494 1.5C14.3385 1.5 17.9994 5.16094 17.9994 9.75C17.9994 14.3391 14.2963 18 9.7494 18Z"
                    fill="currentColor"/>
            </svg>
        </router-link>
    </div>

</template>

<script setup>

import {ref} from "vue";
import {closeMobileMenu} from "@/functions/functions.ts";

const search = ref('');

</script>

<style scoped lang="scss">

.searchbar {
    transition: 500ms;
    border-radius: $border-radius;
    display: flex;

    .epa_button {
        background-color: $color_white;
        text-decoration: none;
        padding: 1rem 1.5rem;
        border-radius: 0 $border-radius $border-radius 0;
        border: 0;
        border-left: 0.1rem solid #eee;
        font-size: inherit;
        font-weight: inherit;
        cursor: pointer;
        line-height: 0;
        color: $primary-color;
    }

    input {
        border-radius: $border-radius 0 0 $border-radius;
        border: 0;
        margin: 0;
        background-color: #fff;
        padding: 1rem 1rem;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        width: 100%;
    }
}

</style>