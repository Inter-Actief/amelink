<template>
    <component :is="wrapperElement" v-bind="wrapperProps" class="tile-card">
        <Card class="tile-card-inner h-full" :class="{ 'tile-card-logo': isLogo }">
            <template #content>
                <div v-if="hasMedia" class="tile-media">
                    <div v-if="props.loading" class="tile-media-skeleton" :class="mediaBoxClass">
                        <Skeleton height="100%" />
                    </div>
                    <div v-else-if="isLogo" class="tile-logo" :class="mediaBoxClass">
                        <img
                            v-if="props.image"
                            v-image-error="props.placeholder"
                            :src="props.image"
                            :alt="props.title ?? ''"
                            class="tile-logo-image"
                        />
                        <div v-else class="tile-logo-image" />
                    </div>
                    <AppImage
                        v-else
                        :src="props.image || props.placeholder"
                        :alt="props.title ?? ''"
                        :aspect="imageAspect"
                        :fit="props.image ? props.fit : 'cover'"
                        :placeholder="props.placeholder"
                    />
                </div>

                <div class="tile-body">
                    <span v-if="props.loading" class="tile-subtitle">
                        <Skeleton height="1.4rem" width="45%" />
                    </span>
                    <span v-else-if="props.kicker && !labelText" class="tile-kicker">{{ props.kicker }}</span>

                    <span v-if="props.date && !props.loading" class="tile-date-line">{{ dateParts.day }} {{
                        dateParts.monthYear }}</span>

                    <div class="tile-title-row">
                        <template v-if="props.loading">
                            <div class="w-full">
                                <Skeleton height="2rem" width="90%" />
                                <Skeleton height="1.9rem" width="55%" class="mt-1" />
                            </div>
                        </template>
                        <span v-else-if="props.title" class="tile-title">{{ props.title }}</span>
                        <span v-if="labelText" class="tile-label" :style="labelStyle">{{ labelText }}</span>
                        <span v-if="props.pinned" class="tile-pin">
                            <Pin :size="11" />
                            {{ $gettext('Pinned') }}
                        </span>
                    </div>

                    <div v-if="props.loading" class="tile-subtitle">
                        <Skeleton height="1.5rem" width="100%" />
                        <Skeleton height="1.5rem" width="80%" class="mt-1" />
                    </div>
                    <div v-else-if="props.subtitle || $slots.default" class="tile-subtitle">
                        <slot>{{ props.subtitle }}</slot>
                    </div>

                    <!-- a plain .link: the sliding underline is the site-wide one -->
                    <span v-if="showFooter" class="link tile-foot">
                        {{ props.actionLabel || $gettext('Read more') }}<ArrowRight class="tile-arrow" />
                    </span>
                </div>
            </template>

        </Card>
    </component>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import { useGettext } from 'vue3-gettext'
import { ArrowRight, Pin } from '@lucide/vue'
import AppImage, { type ImageAspect } from './AppImage.vue'
import { formattedDateBlock } from '@/functions/functions.ts'

const { $gettext } = useGettext()

type Aspect = 'a4' | '4/3' | 'video' | 'square' | 'logo'

interface Props {
    /** Image URL, already resolved through imageSrc(). */
    image?: string | null
    /** Shown instead of the image when it fails to load. */
    placeholder?: string
    /** Fixed media ratio, so tiles line up regardless of the upload. `logo`
     *  renders a contained logo well instead of a photo box. */
    aspect?: Aspect
    /** How the image fills its box. Logos are contained, photos are covered. */
    fit?: 'cover' | 'contain'
    title?: string
    /** Small label above the title, e.g. the section an item belongs to. */
    kicker?: string
    /** Coloured label instead of `kicker` (activity type, with its own colour). */
    label?: { text: string, color: string }
    subtitle?: string
    /** Show the media box even without an image (it then shows the placeholder),
     *  for lists where some items have a picture and the grid must line up. */
    showMedia?: boolean
    /** Date shown in the blue block, on the media or next to the title. */
    date?: number | string
    /** Renders the pinned badge next to the title. */
    pinned?: boolean
    to?: RouteLocationRaw
    href?: string
    /** Label of the footer affordance; defaults to "Read more". */
    actionLabel?: string
    /** Hide the footer affordance while keeping the card linkable. */
    hideAction?: boolean
    /** Render Skeletons with the same geometry as the real tile. */
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    aspect: '4/3',
    fit: 'cover',
    placeholder: '/images/placeholder/photo.jpg',
})

/**
 * Static map: Tailwind only emits classes it can find as literals, so a
 * composed class such as `aspect-${props.aspect}` would silently not exist.
 * `logo` is not a ratio, it gets its own well.
 */
const ASPECT_CLASS: Record<Aspect, string> = {
    a4: 'aspect-a4',
    '4/3': 'aspect-4/3',
    video: 'aspect-video',
    square: 'aspect-square',
    logo: 'tile-logo-box',
}

const isLogo = computed(() => props.aspect === 'logo')
const hasMedia = computed(() =>
    Boolean(props.image || props.loading || isLogo.value || props.showMedia),
)
const mediaBoxClass = computed(() => ASPECT_CLASS[props.aspect])
const fitClass = computed(() => (props.fit === 'contain' ? 'object-contain' : 'object-cover'))

/** TileCard's own aspect names mapped onto the ones AppImage knows. */
const imageAspect = computed<ImageAspect>(() => {
    switch (props.aspect) {
        case 'a4':
            return 'a4'
        case 'video':
            return '16/9'
        case 'square':
            return 'square'
        default:
            return '4/3'
    }
})
const dateParts = computed(() => formattedDateBlock(props.date ?? 0))
const labelText = computed(() => props.label?.text ?? '')
const labelStyle = computed(() => (props.label ? { color: `#${props.label.color}` } : {}))

/**
 * The whole tile is the link, mirroring HorizontalCard: the footer is an
 * affordance only, never a nested anchor.
 */
const hasLink = computed(() => Boolean(props.to || props.href))
const showFooter = computed(() => hasLink.value && !props.hideAction && !props.loading)
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
    border-radius: 4px;
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

.tile-media {
    position: relative;
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}

.tile-image {
    display: block;
    width: 100%;
}

.tile-image-empty,
.tile-media-empty,
.tile-media-skeleton {
    background: var(--p-page-highlight);
}

.tile-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem;
}

.tile-logo-box {
    height: 7.2rem;
}

.tile-logo-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.tile-date-line {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7a839b;
    font-variant-numeric: tabular-nums;
}

.tile-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
}

.tile-kicker {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a839b;
}

.tile-title-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
}

.tile-title {
    flex: 1;
    min-width: 0;
    font-size: var(--text-card-title);
    font-weight: 700;
    line-height: 1.25;
}

.tile-label {
    flex: 0 0 auto;
    align-self: baseline;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    border: 1px solid currentColor;
    border-radius: 999px;
    padding: 0.15rem 0.7rem;
}

.tile-pin {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
    flex-shrink: 0;
    font-size: var(--text-meta);
    font-weight: 600;
    color: var(--p-primary-color);
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.tile-card:hover .tile-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.tile-subtitle {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.4;
    color: #55607a;
}

.tile-subtitle :deep(p),
.tile-subtitle :deep(li) {
    display: inline;
    margin: 0;
}

.tile-subtitle :deep(p + p)::before {
    content: ' ';
}

.tile-foot {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: auto;
    padding-top: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--p-primary-color);
}

.tile-arrow {
    width: 1.3rem;
    height: 1.3rem;
}

/* ---- compact layout: text on the left, photo on the right ----
   Decided by the width the card actually gets, not by the viewport: a tile in a
   five-across grid stays stacked, the same tile in a two- or three-across grid
   (activities, homepage) becomes a row. */
.tile-card {
    container-type: inline-size;
}

@container (min-width: 320px) {
    .tile-card-inner:not(.tile-card-logo) :deep(.p-card-content) {
        display: flex;
        flex-direction: row-reverse;
        align-items: stretch;
    }

    .tile-card-inner:not(.tile-card-logo) .tile-media {
        flex: 0 0 33%;
        width: 33%;
        border-radius: 0 3px 3px 0;
    }

    /* the box is the row height now, so the ratio must stop reserving space */
    .tile-card-inner:not(.tile-card-logo) .tile-media img,
    .tile-card-inner:not(.tile-card-logo) .tile-media :deep(img) {
        height: 100%;
        aspect-ratio: auto;
        object-fit: cover;
    }

    .tile-card-inner:not(.tile-card-logo) .tile-body {
        flex: 1;
        min-width: 0;
    }

}
</style>
