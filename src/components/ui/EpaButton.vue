<template>
    <component :is="htmlElement()" :to="props.to" :href="href" :class="['epa_button', props.class]" :type="type"
        :disabled="props.disabled" :target="props.target" :rel="props.rel">
        <EpaIcon v-if="props.bicon" :icon="props.bicon" />
        <template v-else></template>

        <span>
            <slot></slot>
        </span>

        <EpaIcon v-if="props.loading && props.disabled" icon="loading" />
        <EpaIcon v-else-if="props.icon" :icon="props.icon" />
        <template v-else></template>
    </component>
</template>

<script setup lang="ts">
import EpaIcon from './EpaIcon.vue'

// TODO: Convert props to TS or create new Button component
const props = defineProps([
    'icon',
    'bicon',
    'class',
    'type',
    'disabled',
    'loading',
    'href',
    'to',
    'target',
    'rel',
])

const htmlElement = () => {
    return props.to ? 'router-link' : props.href ? 'a' : 'button'
}
</script>

<style scoped lang="scss">
.epa_button {
    padding: 1rem 2.5rem;
    border-radius: $button-border-radius;
    background-color: $button-background-color;
    display: flex;
    align-items: center;
    gap: $gap_xs;
    outline: 0;
    border: 0;
    color: $button-text-color;
    cursor: pointer;
    transition: 300ms;
    width: fit-content;
    text-decoration: none;
    font-family: inherit;
    font-size: inherit;

    .active,
    &:hover {
        background-color: $button-background-color-hover;
    }

    svg {
        width: 2.2rem;
        height: 2.2rem;

        &.loading {
            animation-name: buttonloading;
            animation-duration: 0.5s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both;
            animation-delay: 0s;
        }
    }

    &.form {
        width: 100%;
        max-width: 30rem;
        margin: 0 auto;
        justify-content: center;
    }

    &.center {
        justify-content: center;
    }

    &.small {
        font-size: $font-size-small;
    }

    &.extrasmall {
        font-size: 70%;
    }

    &.full {
        width: 100%;
        justify-content: space-between;
    }

    &.bottom {
        margin-top: auto;
    }

    &:not(.link) {
        &.white {
            color: $primary-color;
            background-color: $color_white;

            .active,
            &:hover {
                color: $text-color-light;
                background-color: $button-background-color-hover;
            }
        }

        &.primary {
            color: $primary-color;
            background-color: $color_white;

            .active,
            &:hover {
                color: $text-color-light;
                background-color: $button-background-color-hover;
            }
        }
    }

    &.link {
        padding: 0;
        border-radius: 0;
        text-decoration: none;
        position: relative;
        background: linear-gradient(currentColor, currentColor) bottom / 0 0.2rem no-repeat;
        background-position: left bottom;
        transition: 300ms;
        color: inherit;

        >span {
            font-weight: inherit;
        }

        .active,
        &:hover {
            background-size: 100% 0.2rem;
            opacity: 1;
        }

        &.primary {
            color: $primary-color;
        }

        &.return svg:first-child {
            transform: rotate(180deg);
        }
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }
}

@keyframes buttonloading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
