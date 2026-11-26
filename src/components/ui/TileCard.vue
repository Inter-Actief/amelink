<template>
    <component :is="wrapperElement" v-bind="wrapperProps" class="group @container block h-full">
        <Card
            class="relative h-full overflow-hidden border border-slate-300 bg-white! text-slate-900! transition-colors group-hover:border-primary dark:border-[var(--p-content-border-color)] dark:bg-[var(--p-content-hover-background)]! dark:text-[var(--p-text-color)]!"
            :class="{ 'tile-glow': glows }"
            :style="typeVars"
            :pt="{
                body: { class: 'flex h-full flex-col p-0' },
                content: { class: ['flex-1 p-0', !isLogo ? compactContentClasses : ''] },
                footer: { class: 'p-0' },
            }"
        >
            <template #content>
                <!-- Pinned is an icon in the corner: the word adds nothing and the
                     pin already says it. It stays out of the text flow. -->
                <span
                    v-if="props.pinned && !props.loading"
                    class="absolute right-[0.7rem] top-[0.65rem] z-[1] text-primary dark:text-[var(--p-primary-300)]"
                    role="img"
                    :aria-label="$gettext('Pinned')"
                    :title="$gettext('Pinned')"
                >
                    <Pin :size="16" :stroke-width="2.5" />
                </span>

                <div
                    v-if="hasMedia"
                    class="relative overflow-hidden rounded-t-[calc(var(--border-radius)-1px)]"
                    :class="!isLogo ? compactMediaClasses : ''"
                >
                    <!-- Logos are drawn for paper, so the plate stays light in both
                         themes; a dark plate makes half of them disappear. On dark it
                         is a muted grey instead of pure white so it stops glaring. -->
                    <div
                        v-if="isLogo"
                        class="flex h-[7.2rem] items-center justify-center bg-white p-[1.2rem] dark:bg-[var(--p-surface-300)]"
                    >
                        <Skeleton v-if="props.loading" height="100%" class="w-full" />
                        <img
                            v-else-if="props.image"
                            v-image-error="props.placeholder"
                            :src="props.image"
                            :alt="props.title ?? ''"
                            class="max-h-full max-w-full object-contain"
                        />
                        <div v-else class="h-full w-full" />
                    </div>

                    <div
                        v-else-if="props.loading"
                        class="bg-[var(--p-page-highlight)]"
                        :class="[mediaBoxClass, compactSkeletonClasses]"
                    >
                        <Skeleton height="100%" />
                    </div>

                    <AppImage
                        v-else
                        :src="props.image || props.placeholder"
                        :alt="props.title ?? ''"
                        :aspect="imageAspect"
                        :fit="props.image ? props.fit : 'cover'"
                        :placeholder="props.placeholder"
                        :class="compactImageClasses"
                    />
                </div>

                <div
                    class="flex flex-col gap-[0.35rem] px-4 py-[0.9rem]"
                    :class="!isLogo ? compactBodyClasses : ''"
                >
                    <!-- The loading state enumerates the same rows, in the same order
                         and at the same heights, as the loaded card below. Bar heights
                         are the rendered line boxes, not the font sizes: a 1.2rem date
                         sits in a ~1.7rem line box, an excerpt line in ~1.9rem. -->
                    <div
                        v-if="props.loading && !isLogo"
                        class="flex flex-row items-center justify-between gap-[0.6rem]"
                    >
                        <Skeleton height="2.3rem" width="10rem" />
                        <Skeleton v-if="props.label" height="1.7rem" width="5rem" />
                    </div>

                    <span
                        v-if="!props.loading && props.kicker && !labelText"
                        class="text-[1.1rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-[var(--p-text-muted-color)]"
                        >{{ props.kicker }}</span
                    >

                    <!-- Date on the left, activity type on the right. The type is a
                         plain coloured word: the colour is carried by the glow the
                         card gets while it is hovered, not by a badge. -->
                    <div
                        v-if="!props.loading && (props.date || labelText)"
                        class="flex flex-row items-center justify-between gap-[0.6rem]"
                    >
                        <span
                            v-if="props.date"
                            class="text-[1.2rem] font-medium uppercase tracking-[0.1em] text-slate-500 tabular-nums dark:text-[var(--p-text-muted-color)]"
                        >
                            {{ dateParts.day }} {{ dateParts.monthYear }}
                        </span>
                        <span
                            v-if="labelText"
                            class="type-label text-[0.95rem] font-bold uppercase leading-[1.5] tracking-[0.12em]"
                            :style="typeVars"
                            >{{ labelText }}</span
                        >
                    </div>

                    <div class="flex flex-row items-start justify-between gap-[0.5rem]">
                        <div v-if="props.loading" class="flex w-full flex-col gap-[0.2rem]">
                            <!-- A company name is one line; an article or activity
                                 title wraps to two, which is what the grid sizes on. -->
                            <Skeleton height="2.3rem" width="90%" />
                            <!-- In the row layout the title sits beside the picture
                                 and mostly fits one line (68% of a real
                                 publication page), so the second line is only
                                 reserved in the column layout. -->
                            <Skeleton
                                v-if="!isLogo"
                                height="2.3rem"
                                width="55%"
                                :class="props.skeletonTitleLines > 1 ? '' : '@min-[320px]:hidden'"
                            />
                        </div>
                        <span
                            v-else-if="props.title"
                            class="line-clamp-2 min-w-0 flex-1 text-card-title font-bold leading-tight group-hover:underline group-hover:underline-offset-2"
                            >{{ props.title }}</span
                        >
                    </div>

                    <div v-if="props.loading && props.skeletonLines > 0" class="flex flex-col">
                        <Skeleton
                            v-for="line in props.skeletonLines"
                            :key="line"
                            height="2rem"
                            :width="line === props.skeletonLines ? '62%' : '100%'"
                        />
                    </div>
                    <div
                        v-else-if="props.subtitle || $slots.default"
                        class="m-0 text-meta leading-[1.4] text-slate-600 dark:text-[var(--p-text-muted-color)] [&_li]:m-0 [&_li]:inline [&_p+p]:before:content-['_'] [&_p]:m-0 [&_p]:inline"
                    >
                        <slot>{{ props.subtitle }}</slot>
                    </div>

                    <!-- Reserve the footer row while loading: the loaded card keeps
                         it at the bottom (mt-auto), so dropping it would shrink the
                         tile by a line and shift the grid when the data lands. -->
                    <span
                        v-if="props.loading && !props.hideAction"
                        class="link mt-auto inline-flex items-center gap-[0.35rem] pt-2"
                    >
                        <Skeleton height="2.3rem" width="6rem" />
                    </span>

                    <!-- a plain .link: the sliding underline is the site-wide one -->
                    <span
                        v-else-if="showFooter"
                        class="link mt-auto inline-flex items-center gap-[0.35rem] pt-2 text-meta font-semibold text-primary dark:text-[var(--p-primary-300)]"
                    >
                        {{ props.actionLabel || $gettext('Read more')
                        }}<ArrowRight class="size-[1.3rem]" />
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
    label?: { text: string; color: string }
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
    /** Text lines the loaded tile shows (an excerpt or a subtitle), so the
     *  skeleton reserves the same space. Grids whose cards have no second text
     *  block leave this at 0. */
    skeletonLines?: number
    /** Title lines in the compact row layout, where the title sits beside the
     *  picture. Most titles take two; a grid of short titles (publication
     *  covers) takes one. The column layout always reserves two. */
    skeletonTitleLines?: number
}

const props = withDefaults(defineProps<Props>(), {
    aspect: '4/3',
    fit: 'cover',
    placeholder: '/images/placeholder/photo.jpg',
    skeletonLines: 0,
    skeletonTitleLines: 2,
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
    logo: '',
}

/**
 * `loading` used to imply a media box, which invented a picture on text-only
 * cards and made them a third taller than the card they stood in for. A
 * skeleton only shows media when the loaded tile would: it has an image, it is
 * a logo well, or the caller opted in with `showMedia`.
 */
const isLogo = computed(() => props.aspect === 'logo')
const hasMedia = computed(() => Boolean(props.image || isLogo.value || props.showMedia))
const mediaBoxClass = computed(() => ASPECT_CLASS[props.aspect])

/**
 * Above 320px of card width the card becomes a row. These variants are always
 * prefixed so they only apply inside that container query.
 */
const compactContentClasses =
    '@min-[320px]:flex @min-[320px]:flex-row-reverse @min-[320px]:items-stretch'
const compactMediaClasses =
    '@min-[320px]:min-h-0 @min-[320px]:w-1/3 @min-[320px]:max-w-1/3 @min-[320px]:flex-none @min-[320px]:self-stretch @min-[320px]:rounded-tl-none @min-[320px]:rounded-tr-[calc(var(--border-radius)-1px)] @min-[320px]:rounded-br-[calc(var(--border-radius)-1px)] @min-[320px]:rounded-bl-none'
const compactBodyClasses = '@min-[320px]:min-w-0 @min-[320px]:flex-1 @min-[320px]:self-stretch'
const compactImageClasses =
    '@min-[320px]:absolute @min-[320px]:inset-0 @min-[320px]:h-full @min-[320px]:w-full @min-[320px]:aspect-auto! @min-[320px]:object-cover!'
const compactSkeletonClasses =
    '@min-[320px]:absolute @min-[320px]:inset-0 @min-[320px]:h-full @min-[320px]:aspect-auto!'

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
/// The card's accent: the label colour, reused by the glow and the type word.
const typeVars = computed(() => (props.label ? { '--type': `#${props.label.color}` } : undefined))

/**
 * The whole tile is the link, so the "Read more" footer is an affordance only
 * and must never introduce a nested anchor or button.
 */
const hasLink = computed(() => Boolean(props.to || props.href))

/**
 * The type colour may not turn a grid of cards into a colour chart, so it is
 * a plain word at rest and a short, soft shadow while the card is hovered.
 */
const glows = computed(() => hasLink.value && Boolean(labelText.value))
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
/* The type word carries the label colour, and the glow repeats it. */
.type-label {
    color: var(--type);
}

/* The same hue mixed towards white: a navy label is invisible on a dark card. */
:global(.dark) .type-label {
    color: color-mix(in srgb, var(--type) 45%, white);
}

/*
 * The hover border is the type colour muted towards the neutral card border,
 * plus a short, soft shadow. Unlayered on purpose, so it wins over the
 * group-hover border that Card gets from its utility classes.
 */
.tile-glow:hover {
    border-color: color-mix(in srgb, var(--type) 45%, var(--p-content-border-color, #cbd5e1));
    box-shadow: 0 4px 12px -6px color-mix(in srgb, var(--type) 45%, transparent);
}

.tile-glow {
    transition:
        box-shadow 180ms ease,
        border-color 180ms ease;
}
</style>
