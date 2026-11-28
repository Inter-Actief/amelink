<template>
    <component :is="wrapperElement" v-bind="wrapperProps" class="group @container block h-full">
        <Card
            class="relative h-full overflow-hidden border border-slate-300 bg-[var(--p-page-tile)]! text-slate-900! transition-colors dark:border-[var(--p-content-border-color)] dark:text-[var(--p-text-color)]! dark:[--p-text-muted-color:var(--p-surface-200)]"
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
                    <span
                        v-if="props.loading && !hasFacts"
                        class="text-[1.1rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-[var(--p-text-muted-color)]"
                    >
                        <Skeleton height="1.4rem" width="45%" />
                    </span>
                    <span
                        v-else-if="props.kicker && !labelText"
                        class="text-[1.1rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-[var(--p-text-muted-color)]"
                        >{{ props.kicker }}</span
                    >

                    <!--
                        An activity card leads with its title and answers "when and
                        where" on one quiet line underneath: no field labels, no end
                        time, start time only. The type rides that line instead of
                        getting a row of its own.
                    -->
                    <template v-if="hasFacts">
                        <!-- The bars are the rendered line boxes of the real rows, not
                             their font sizes: a title line is ~2.4rem tall, the facts
                             line 1.6rem, a teaser line 1.95rem. Anything smaller and the
                             tile grows the moment the data lands. -->
                        <div v-if="props.loading" class="w-full">
                            <Skeleton height="2.4rem" width="90%" />
                            <Skeleton height="2.4rem" width="55%" />
                        </div>
                        <span
                            v-else-if="props.title"
                            class="tile-title line-clamp-2 min-w-0 text-card-title font-bold leading-tight"
                            >{{ props.title }}</span
                        >

                        <div v-if="props.loading" class="w-full">
                            <Skeleton height="1.6rem" width="70%" />
                        </div>
                        <div
                            v-else
                            class="flex flex-row items-center gap-[0.4rem] overflow-hidden text-[1.2rem] leading-[1.35] text-slate-600 dark:text-[var(--p-text-muted-color)]"
                        >
                            <span class="min-w-0 truncate tabular-nums">{{ props.facts }}</span>
                            <template v-if="labelText">
                                <span aria-hidden="true" class="shrink-0 opacity-60">·</span>
                                <span class="type-label shrink-0 font-semibold" :style="typeVars">{{
                                    labelText
                                }}</span>
                            </template>
                        </div>

                        <div v-if="props.loading" class="w-full">
                            <Skeleton height="1.95rem" width="100%" />
                            <Skeleton height="1.95rem" width="80%" />
                        </div>
                        <div
                            v-else-if="props.subtitle || $slots.default"
                            class="m-0 text-meta leading-[1.4] text-slate-600 dark:text-[var(--p-text-muted-color)] [&_li]:m-0 [&_li]:inline [&_p+p]:before:content-['_'] [&_p]:m-0 [&_p]:inline"
                        >
                            <slot>{{ props.subtitle }}</slot>
                        </div>
                    </template>

                    <template v-else>
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
                            <template v-if="props.loading">
                                <div class="w-full">
                                    <Skeleton height="2rem" width="90%" />
                                    <Skeleton height="1.9rem" width="55%" class="mt-1" />
                                </div>
                            </template>
                            <span
                                v-else-if="props.title"
                                class="tile-title line-clamp-2 min-w-0 flex-1 text-card-title font-bold leading-tight"
                                >{{ props.title }}</span
                            >
                        </div>

                        <div v-if="props.loading" class="text-meta">
                            <Skeleton height="1.5rem" width="100%" />
                            <Skeleton height="1.5rem" width="80%" class="mt-1" />
                        </div>
                        <div
                            v-else-if="props.subtitle || $slots.default"
                            class="m-0 text-meta leading-[1.4] text-slate-600 dark:text-[var(--p-text-muted-color)] [&_li]:m-0 [&_li]:inline [&_p+p]:before:content-['_'] [&_p]:m-0 [&_p]:inline"
                        >
                            <slot>{{ props.subtitle }}</slot>
                        </div>
                    </template>

                    <!-- a plain .link: the sliding underline is the site-wide one -->
                    <span
                        v-if="showFooter"
                        class="link mt-auto inline-flex items-center gap-[0.35rem] pt-2 text-meta font-semibold text-primary dark:text-[var(--p-text-color)]"
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
    /** A single facts line under the title (when and where). When set, the title
     *  leads the card and `date`/`label` collapse into this line instead. */
    facts?: string
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
    logo: '',
}

const isLogo = computed(() => props.aspect === 'logo')
const hasMedia = computed(() =>
    Boolean(props.image || props.loading || isLogo.value || props.showMedia),
)
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
/** An empty string still selects this layout, which the loading tiles rely on. */
const hasFacts = computed(() => props.facts !== undefined)
const dateParts = computed(() => formattedDateBlock(props.date ?? 0))
const labelText = computed(() => props.label?.text ?? '')
/// The card's accent: the label colour, used by the type word.
const typeVars = computed(() => (props.label ? { '--type': `#${props.label.color}` } : undefined))

/**
 * The whole tile is the link, so the "Read more" footer is an affordance only
 * and must never introduce a nested anchor or button.
 */
const hasLink = computed(() => Boolean(props.to || props.href))

/**
 * The type colour may not turn a grid of cards into a colour chart: it stays a
 * plain word on the facts line and never touches the frame.
 */
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
/*
 * The type word keeps its hue but is mixed towards the theme's own text colour:
 * because --p-text-color flips, one declaration darkens the word on a light card
 * and lightens it on a dark one. A `:global(.dark)` rule cannot be used for this —
 * it is silently dropped inside a scoped block — and the raw type colour measures
 * 1.06:1 on a dark card for a dark label such as #372652.
 */
.type-label {
    color: color-mix(in srgb, var(--type) 45%, var(--p-text-color));
}

/*
 * Hover, and nothing else: the frame goes to the theme's ink colour (the same
 * declaration darkens the frame on a light card and flips it to white on a dark
 * one) and a 2px rule grows under the title from the left. No shadow, no lift,
 * no colour — a coloured glow is decoration that repeats the type word.
 *
 * The rule follows the title block rather than the words, because the title is
 * line-clamped and cannot become an inline-block without losing the clamp.
 */
.group:hover :deep(.p-card) {
    border-color: var(--p-text-color);
}

.tile-title {
    position: relative;
    padding-bottom: 0.15rem;
}

.tile-title::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 0.2rem;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 300ms ease;
}

.group:hover .tile-title::after {
    transform: scaleX(1);
}
</style>
