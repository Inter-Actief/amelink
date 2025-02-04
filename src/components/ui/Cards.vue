<template>

    <component :is="htmlElement()" class="item" :to="to">
        <div class="image" v-if="imageSrc">
            <img :src="imageSrc" :width="imageWidth" :height="imageHeight" :alt="imageAlt" />
        </div>
        <div class="content">
            <div class="info">
                <div class="title" v-if="title">{{ title }}</div>
                <div class="date" v-if="date">{{ date }}</div>
                <div class="text" v-if="text">{{ text }}</div>
            </div>

            <EpaButton
                v-if="buttonText"
                class="full"
                icon="readmore">
                {{ $t(buttonText) }}
            </EpaButton>
        </div>
    </component>

</template>

<script setup lang="ts">

import EpaButton from "@/components/ui/EpaButton.vue";

const props = defineProps({
    'to' : String,
    'title' : String,
    'date': String,
    'text': String,
    'buttonText': String,
    'imageSrc' : String,
    'imageWidth' : Number,
    'imageHeight' : Number,
    'imageAlt' : String
});

const htmlElement = () => {
    return ( props.to ? 'router-link' : 'div' );
}

</script>

<style scoped lang="scss">

.item {
    background: #fff;
    border: 0.1rem solid #F2ECE7;
    color: inherit;
    display: grid;
    gap: $gap_sm;
    grid-template-rows: 26rem auto;
    box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.0);
    transition: 300ms;
    text-decoration: none;


    .content {
        padding: 1.5rem;
        display: grid;
        gap: $gap_sm;
    }

    .info {
        display: grid;
        gap: $gap_xs;
        height: fit-content;
    }

    .title > * {
        font-size: 2rem;
    }

    .image {
        position: relative;
        overflow: hidden;
        border: 0 solid #F2ECE7;
        border-radius: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;

            &.placeholder {
                opacity: 0.2;
            }
        }
    }


    button {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        background-color: #1d428a;
        color: #fff;
        border: 0;
        border-radius: $button-border-radius;
        padding: 1.5rem 2rem;
        font-size: inherit;
    }


    &:hover {
        box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1);
    }
}

</style>