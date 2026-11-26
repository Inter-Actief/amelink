<template>
    <component :is="wrapperElement" v-bind="wrapperProps" class="tile-card">
        <Card class="tile-card-inner h-full">
            <template #content>
                <div class="relative">
                    <img
                        v-if="props.image"
                        v-image-error="props.placeholder"
                        :src="props.image"
                        :alt="props.title ?? ''"
                        class="tile-image"
                        :class="aspectClass"
                    />
                    <div v-else class="tile-image tile-image-empty" :class="aspectClass" />
                    <span v-if="props.date" class="tile-date">
                        <b>{{ dateParts.day }}</b>
                        <span>{{ dateParts.monthYear }}</span>
                    </span>
                </div>
                <div class="tile-body">
                    <span v-if="props.kicker" class="tile-kicker">{{ props.kicker }}</span>
                    <span v-if="props.title" class="tile-title">{{ props.title }}</span>
                    <p v-if="props.subtitle || $slots.default" class="tile-subtitle">
                        <slot>{{ props.subtitle }}</slot>
                    </p>
                </div>
            </template>
            <!-- v-if belongs on the element, not on the slot template: PrimeVue
                 checks `$slots.footer`, which a conditional template does not
                 satisfy reliably. -->
            <template #footer>
                <div v-if="showFooter" class="tile-foot">
                    <span>{{ props.actionLabel || $gettext('Read more') }}</span>
                    <ArrowRight class="tile-arrow" />
                </div>
            </template>
        </Card>
    </component>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import { useGettext } from 'vue3-gettext'
import { ArrowRight } from '@lucide/vue'
import { formattedDateBlock } from '@/functions/functions.ts'

const { $gettext } = useGettext()

type Aspect = 'a4' | '4/3' | 'video'

interface Props {
    /** Image URL, already resolved through imageSrc(). */
    image?: string | null
    /** Shown instead of the image when it fails to load. */
    placeholder?: string
    /** Fixed image ratio, so cards line up regardless of the upload. */
    aspect?: Aspect
    title?: string
    /** Small label above the title, e.g. the section an item belongs to. */
    kicker?: string
    subtitle?: string
    /** Date shown in the block on the image (timestamp or ISO string). */
    date?: number | string
    to?: RouteLocationRaw
    href?: string
    /** Label of the footer affordance; defaults to "Read more". */
    actionLabel?: string
    /** Hide the footer affordance while keeping the card linkable. */
    hideAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    aspect: '4/3',
    placeholder: '/images/placeholder/photo.jpg',
})

/**
 * Static map: Tailwind only emits classes it can find as literals, so a
 * composed class such as `aspect-${props.aspect}` would silently not exist.
 */
const ASPECT_CLASS: Record<Aspect, string> = {
    a4: 'aspect-a4',
    '4/3': 'aspect-4/3',
    video: 'aspect-video',
}

const aspectClass = computed(() => ASPECT_CLASS[props.aspect])
const dateParts = computed(() => formattedDateBlock(props.date ?? 0))

/**
 * The whole tile is the link, mirroring HorizontalCard: the footer is an
 * affordance only, never a nested anchor.
 */
const hasLink = computed(() => Boolean(props.to || props.href))
const showFooter = computed(() => hasLink.value && !props.hideAction)
const wrapperElement = computed(() => {
    if (props.to) {
        return RouterLink
    }

    return props.href ? 'a' : 'div'
})
const wrapperProps = computed(() => {
    const classes = 'block no-underline text-inherit h-full'

    if (props.to) {
        return { to: props.to, class: classes }
    }

    if (props.href) {
        return { href: props.href, class: classes }
    }

    return { class: classes }
})
</script>

<style scoped>
.tile-card-inner {
    border: 1px solid #c3cad8;
    background: #fff;
    height: 100%;
    overflow: hidden;
}

.tile-card:hover .tile-card-inner {
    border-color: var(--p-primary-color);
}

.tile-card-inner :deep(.p-card-body),
.tile-card-inner :deep(.p-card-content),
.tile-card-inner :deep(.p-card-footer) {
    padding: 0;
}

/* Column layout so the footer sits on the same baseline in every tile of a row,
   however many lines the title takes. */
.tile-card-inner :deep(.p-card-body) {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tile-card-inner :deep(.p-card-content) {
    flex: 1;
}

.tile-image {
    display: block;
    width: 100%;
    object-fit: cover;
}

.tile-image-empty {
    background: var(--p-page-highlight);
}

.tile-date {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    background: var(--p-primary-color);
    color: #fff;
    padding: 0.35rem 0.75rem;
    font-variant-numeric: tabular-nums;
}

.tile-date b {
    font-size: 1.9rem;
    font-weight: 800;
    line-height: 1;
}

.tile-date span {
    font-size: 1.15rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.tile-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.9rem 1rem 0.9rem;
}

.tile-kicker {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a839b;
}

.tile-title {
    font-size: var(--text-card-title);
    font-weight: 700;
    line-height: 1.25;
}

.tile-subtitle {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.4;
    color: #55607a;
}

.tile-card:hover .tile-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.tile-foot {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-top: 1px solid #e2e6ee;
    padding: 0.55rem 1rem;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--p-primary-color);
}

.tile-arrow {
    width: 1.3rem;
    height: 1.3rem;
}
</style>
