<template>
    <div :class="[searchbar_open ? 'open' : '', 'search']">
        <div class="searchbar">
            <div class="searchbar_inner">
                <input v-model="search" type="text" name="searchinput" id="searchinput" />
                <router-link
                    class="epa_button white"
                    :to="{ name: 'search', query: { search: search } }"
                >
                    Search
                </router-link>
            </div>
        </div>

        <button @click="search_toggle">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M23.7791 22.7203L17.1463 16.0875C18.6088 14.3813 19.4572 12.1734 19.4572 9.75C19.4572 4.36406 15.0917 0 9.70721 0C4.32268 0 -0.000610352 4.36547 -0.000610352 9.75C-0.000610352 15.1345 4.3644 19.5 9.70721 19.5C12.1297 19.5 14.3408 18.6112 16.0447 17.1492L22.6775 23.782C22.865 23.925 23.0572 24 23.2494 24C23.4416 24 23.6332 23.9268 23.7796 23.7803C24.0744 23.4891 24.0744 23.0109 23.7791 22.7203ZM9.7494 18C5.16034 18 1.4994 14.2969 1.4994 9.75C1.4994 5.20312 5.16034 1.5 9.7494 1.5C14.3385 1.5 17.9994 5.16094 17.9994 9.75C17.9994 14.3391 14.2963 18 9.7494 18Z"
                    fill="white"
                />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchbar_open = ref(false)
const search = ref('')

const search_toggle = () => {
    searchbar_open.value = !searchbar_open.value
}
</script>

<style scoped lang="scss">
.search {
    position: relative;
    display: flex;
    gap: 1rem;

    > button {
        background: transparent;
        outline: 0;
        padding: 0;
        border: 0;
        cursor: pointer;
    }

    .searchbar {
        overflow: hidden;
    }

    .searchbar a {
        background-color: $color_light;
        text-decoration: none;
        color: $text-color;
        padding: 1rem 2.5rem;
        border-radius: 0 $border-radius $border-radius 0;
        border: 0;
        border-left: 0.1rem solid #eee;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        cursor: pointer;
    }

    .searchbar input {
        border-radius: $border-radius 0 0 $border-radius;
        border: 0;
        margin: 0;
        background-color: #fff;
        padding: 1rem 1rem;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
    }

    .searchbar_inner {
        opacity: 0;
        pointer-events: none;
        transform: translateX(100%);
        transition: 500ms;
        border-radius: $border-radius;
        display: flex;
        align-items: center;
    }

    &.open .searchbar_inner {
        transform: translateX(0);
        pointer-events: initial;
        opacity: 1;
    }
}
</style>
