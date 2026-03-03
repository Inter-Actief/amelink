<template>
    <component :is="htmlElement()" :to="props.to" :href="href" :class="['epa_button', props.class]" :type="type"
        :disabled="props.disabled" :target="props.target" :rel="props.rel">
        <EpaIcon v-if="props.bicon" :icon="props.bicon" />

        <span>
            <slot></slot>
        </span>

        <EpaIcon v-if="props.loading && props.disabled" icon="loading" />
        <EpaIcon v-else-if="props.icon" :icon="props.icon" />
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
    return props.to ? 'router-link' : (props.href ? 'a' : 'button')
}
</script>

<style scoped>
.epa_button {
    padding: 1rem 2.5rem;
    border-radius: var(--button-border-radius);
    background-color: var(--button-background-color);
    display: flex;
    align-items: center;
    gap: var(--gap-xs);
    outline: 0;
    border: 0;
    color: var(--button-text-color);
    cursor: pointer;
    transition: 300ms;
    width: fit-content;
    text-decoration: none;
    font-family: inherit;
    font-size: inherit;
}

.epa_button .active,
.epa_button:hover {
    background-color: var(--button-background-color-hover);
}

.epa_button svg {
    width: 2.2rem;
    height: 2.2rem;
}

.epa_button svg.loading {
    animation-name: buttonloading;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
    animation-delay: 0s;
}

.epa_button.form {
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
    justify-content: center;
}

.epa_button.center {
    justify-content: center;
}

.epa_button.small {
    font-size: var(--font-size-small);
}

.epa_button.extrasmall {
    font-size: 70%;
}

.epa_button.full {
    width: 100%;
    justify-content: space-between;
}

.epa_button.bottom {
    margin-top: auto;
}

.epa_button:not(.link).white {
    color: var(--primary-color);
    background-color: var(--color-white);
}

.epa_button:not(.link).white .active,
.epa_button:not(.link).white:hover {
    color: var(--text-color-light);
    background-color: var(--button-background-color-hover);
}

.epa_button:not(.link).primary {
    color: var(--primary-color);
    background-color: var(--color-white);
}

.epa_button:not(.link).primary .active,
.epa_button:not(.link).primary:hover {
    color: var(--text-color-light);
    background-color: var(--button-background-color-hover);
}

.epa_button.link {
    padding: 0;
    border-radius: 0;
    text-decoration: none;
    position: relative;
    background: linear-gradient(currentColor, currentColor) bottom / 0 0.2rem no-repeat;
    background-position: left bottom;
    transition: 300ms;
    color: inherit;
}

.epa_button.link > span {
    font-weight: inherit;
}

.epa_button.link .active,
.epa_button.link:hover {
    background-size: 100% 0.2rem;
    opacity: 1;
}

.epa_button.link.primary {
    color: var(--primary-color);
}

.epa_button.link.return svg:first-child {
    transform: rotate(180deg);
}

.epa_button:disabled {
    pointer-events: none;
    opacity: 0.5;
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
