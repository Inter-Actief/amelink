<template>
    <!-- One block for everything the association publishes. News, publications
         and videos arrive in a single date order: the newest (or pinned) item
         takes the spotlight on the left, the rest queue on the right. Types are
         told apart by a glyph and a word, never by colour. -->
    <SectionCard :name="$gettext('Recent items')" pageBg>
        <template #content>
            <!-- The skeleton copies the real geometry: same grid, same 22 rem
                 medium, same row heights. Otherwise the block jumps on load. -->
            <div
                v-if="loading"
                class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.55fr_1fr] lg:gap-6"
            >
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
                    <Skeleton height="22rem" />
                    <div class="flex flex-col gap-2">
                        <Skeleton height="1.6rem" width="45%" />
                        <Skeleton height="2.4rem" width="90%" />
                        <Skeleton height="1.6rem" width="100%" />
                        <Skeleton height="1.6rem" width="70%" />
                    </div>
                </div>
                <div class="flex flex-col">
                    <!-- 3.3 rem is exactly one queue row (32 px at the 60% root). -->
                    <Skeleton v-for="n in 8" :key="n" height="3.3rem" />
                </div>
            </div>

            <div
                v-else-if="spotlight"
                class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.55fr_1fr] lg:gap-6"
            >
                <!-- Spotlight -->
                <div
                    class="grid grid-cols-1 items-start gap-4"
                    :class="hasMedia ? 'sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]' : ''"
                >
                    <!-- One height for every medium, so the three types agree.
                         The photo and the document are clickable themselves; the
                         player must stay clickable for the video instead. -->
                    <div
                        v-if="hasMedia"
                        class="flex h-[22rem] w-full items-center justify-center overflow-hidden rounded"
                        :class="
                            spotlight.kind === 'publication'
                                ? 'border border-slate-300 bg-[var(--p-page-highlight)] p-3 dark:border-[var(--p-content-border-color)]'
                                : ''
                        "
                    >
                        <iframe
                            v-if="spotlight.kind === 'video' && spotlight.embedUrl"
                            :src="spotlight.embedUrl"
                            :title="spotlight.title"
                            class="h-full w-full bg-black"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>

                        <a
                            v-else-if="spotlight.kind === 'publication' && spotlight.thumb"
                            :href="spotlight.href"
                            target="_blank"
                            rel="noopener"
                            class="flex h-full w-full cursor-pointer items-center justify-center"
                        >
                            <img
                                v-image-error="'/images/placeholder/book.svg'"
                                :src="spotlight.thumb"
                                :alt="spotlight.title"
                                class="max-h-full max-w-full rounded border border-slate-300 object-contain object-top dark:border-[var(--p-content-border-color)]"
                            />
                        </a>

                        <RouterLink
                            v-else-if="spotlight.to && spotlightImage"
                            :to="spotlight.to"
                            class="h-full w-full cursor-pointer"
                        >
                            <img
                                :src="spotlightImage"
                                :alt="spotlight.title"
                                class="h-full w-full object-cover object-[center_30%]"
                            />
                        </RouterLink>
                    </div>

                    <div class="flex min-w-0 flex-col gap-1">
                        <span
                            class="flex items-center gap-1.5 text-meta text-slate-500 dark:text-[var(--p-text-muted-color)]"
                        >
                            <component
                                :is="iconFor(spotlight.kind)"
                                class="size-[1.4rem] shrink-0"
                                :stroke-width="2"
                                aria-hidden="true"
                            />
                            {{ kindLabel(spotlight.kind) }} ·
                            <span class="tabular-nums">{{ relativeAge(spotlight.date) }}</span>
                            <PinnedBadge v-if="spotlight.pinned" />
                        </span>

                        <component
                            :is="spotlight.to ? RouterLink : 'a'"
                            v-bind="linkProps(spotlight)"
                            class="cursor-pointer text-inherit no-underline hover:underline hover:underline-offset-2"
                        >
                            <h3 class="text-card-title! max-w-[30ch] font-extrabold leading-[1.15]">
                                {{ spotlight.title }}
                            </h3>
                        </component>

                        <!-- An introduction is written to be short, so it is
                             printed whole. The article body stands in for one,
                             and that does get cut off with a fade. -->
                        <div
                            v-if="spotlightBody"
                            class="text max-w-[56ch] text-body"
                            :class="
                                spotlightLead
                                    ? ''
                                    : 'max-h-[10rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_76%,transparent_100%)]'
                            "
                            v-html="spotlightBody"
                        ></div>

                        <component
                            :is="spotlight.to ? RouterLink : 'a'"
                            v-bind="linkProps(spotlight)"
                            class="link mt-1.5 inline-flex w-fit items-center gap-[0.35rem] text-meta font-semibold text-primary dark:text-[var(--p-text-color)]"
                        >
                            {{ actionLabel(spotlight.kind) }}
                            <ArrowRight class="size-[1.3rem]" aria-hidden="true" />
                        </component>
                    </div>
                </div>

                <!-- Queue -->
                <div
                    class="flex flex-col border-t border-slate-300 dark:border-[var(--p-content-border-color)]"
                >
                    <component
                        :is="item.to ? RouterLink : 'a'"
                        v-for="item in queue"
                        :key="item.key"
                        v-bind="linkProps(item)"
                        :aria-label="`${kindLabel(item.kind)}: ${item.title}`"
                        class="group flex cursor-pointer items-baseline justify-between gap-2 border-b border-slate-300 py-2 text-inherit no-underline last:border-b-0 dark:border-[var(--p-content-border-color)]"
                    >
                        <span
                            class="line-clamp-1 min-w-0 text-body font-semibold leading-[1.35] group-hover:underline group-hover:underline-offset-2"
                        >
                            {{ item.title }}
                        </span>
                        <span
                            class="flex shrink-0 items-center gap-1.5 text-meta tabular-nums text-slate-500 dark:text-[var(--p-text-muted-color)]"
                        >
                            <component
                                :is="iconFor(item.kind)"
                                class="size-[1.4rem] shrink-0"
                                :stroke-width="1.8"
                                aria-hidden="true"
                            />
                            {{ relativeAge(item.date) }}
                            <PinnedBadge v-if="item.pinned" />
                        </span>
                    </component>
                </div>
            </div>

            <p v-else class="m-0">{{ $gettext('There is nothing new yet.') }}</p>
        </template>
    </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import SectionCard from '../ui/SectionCard.vue'
import Skeleton from 'primevue/skeleton'
import PinnedBadge from '../ui/PinnedBadge.vue'
import { ArrowRight, FileText, Newspaper, Play } from '@lucide/vue'
import type { Component } from 'vue'
import { useGettext } from 'vue3-gettext'
import { markedText, publicationUrl, relativeAge } from '@/functions/functions'
import { useHomepageContent } from '@/composables/homepageContent'

type Kind = 'news' | 'publication' | 'video'

interface Entry {
    key: string
    kind: Kind
    title: string
    date: string
    /** Internal route, or absent for a document that opens in a new tab. */
    to?: RouteLocationRaw
    href?: string
    thumb?: string
    /** The lead the editors wrote for the item, when they wrote one. */
    introduction?: string
    article?: string
    description?: string
    embedUrl?: string
    pinned?: boolean
}

const { $gettext } = useGettext()

/** The spotlight's lead and its first image, both taken from its Markdown. */
const spotlightArticle = ref<{ html: string; image?: string; lead?: boolean } | null>(null)

const { result, loading } = useHomepageContent()

const newsItems = computed(() => {
    const pinned = result.value?.pinnedNews?.results ?? []
    const recent = result.value?.recentNews?.results ?? []
    const seen = new Set<string>()

    return [...pinned, ...recent].filter((item): item is NonNullable<typeof item> => {
        if (!item || seen.has(item.id)) {
            return false
        }
        seen.add(item.id)
        return true
    })
})

const publications = computed(() =>
    (result.value?.publications?.results ?? []).filter(
        (item): item is NonNullable<typeof item> => !!item,
    ),
)

const video = computed(() => result.value?.videos?.results?.[0] ?? undefined)

const entries = computed<Entry[]>(() => {
    const list: Entry[] = [
        ...newsItems.value.map((item) => ({
            key: `news-${item.id}`,
            kind: 'news' as Kind,
            title: item.title ?? '',
            date: item.publicationDate,
            introduction: item.introduction ?? undefined,
            article: item.content ?? undefined,
            to: { name: 'singlenews', params: { id: item.id } },
            pinned: item.pinned ?? false,
        })),
        ...publications.value.map((item) => ({
            key: `publication-${item.id}`,
            kind: 'publication' as Kind,
            title: item.name,
            date: item.datePublished,
            thumb: item.thumbnail ?? undefined,
            href: publicationUrl(item.file),
        })),
    ]

    if (video.value) {
        list.push({
            key: `video-${video.value.videoId}`,
            kind: 'video' as Kind,
            title: video.value.title,
            date: video.value.datePublished,
            thumb: video.value.thumbnailUrl ?? undefined,
            description: video.value.description ?? undefined,
            embedUrl: video.value.embedUrl ?? undefined,
            to: {
                name: 'singlevideo',
                params: { id: video.value.videoId, type: video.value.videoType },
            },
        })
    }

    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

/** The first image of a Markdown body, used when it is not the body itself. */
const firstImage = async (markdown?: string) => {
    if (!markdown) {
        return undefined
    }

    const html = await markedText(markdown)
    const document = new DOMParser().parseFromString(html, 'text/html')

    return document.querySelector('img')?.getAttribute('src') ?? undefined
}

/**
 * A pinned news item leads; with several pinned, the newest of them does, and
 * the others stay at the head of the queue. Entries are newest first already.
 */
const spotlight = computed(
    () => entries.value.find((item) => item.pinned) ?? entries.value[0] ?? undefined,
)

const hasMedia = computed(
    () =>
        !!spotlightImage.value ||
        spotlight.value?.kind === 'video' ||
        spotlight.value?.kind === 'publication',
)

/** True when the printed text is the editors' introduction, not the article. */
const spotlightLead = computed(() => !!spotlightArticle.value?.lead)

const spotlightBody = computed(() => {
    if (!spotlight.value) {
        return undefined
    }

    if (spotlight.value.kind === 'news') {
        return spotlightArticle.value?.html
    }

    // A video description is worth printing only when it actually says something.
    const text = (spotlight.value.description ?? '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    return /[a-z]{2,}/i.test(text) && text.length > 20 ? text : undefined
})

/**
 * Render the leading news item once its Markdown is available: the text it
 * shows, and the first image, which is lifted out of the body to lead the block.
 */
watch(
    spotlight,
    async (item) => {
        spotlightArticle.value = null

        if (!item || item.kind !== 'news') {
            return
        }

        // The introduction is written to lead the article, so it is what a
        // reader should see first. Without one, the body stands in for it.
        const lead = item.introduction?.trim()
        const source = lead || item.article

        if (!source) {
            return
        }

        const html = await markedText(source)
        const document = new DOMParser().parseFromString(html, 'text/html')
        const image = document.querySelector('img')?.getAttribute('src') ?? undefined
        document.querySelectorAll('img').forEach((node) => node.remove())

        spotlightArticle.value = {
            html: document.body.innerHTML,
            lead: !!lead,
            // A lead rarely carries a picture; the article usually does.
            image: image ?? (lead ? await firstImage(item.article) : undefined),
        }
    },
    { immediate: true },
)

const spotlightImage = computed(() => spotlightArticle.value?.image)

/** Pinned items come first, then everything else; both keep the date order. */
const queue = computed(() => {
    const rest = entries.value.filter((item) => item.key !== spotlight.value?.key)

    return [...rest.filter((item) => item.pinned), ...rest.filter((item) => !item.pinned)]
})

/**
 * RouterLink ignores `href` and an `<a>` ignores `to`, and passing both anyway
 * makes RouterLink drop its own href because the undefined attr wins.
 */
const linkProps = (entry: Entry) =>
    entry.to
        ? { to: entry.to }
        : { href: entry.href, target: '_blank', rel: 'noopener' }

const kindLabel = (kind: Kind) =>
    kind === 'news'
        ? $gettext('News')
        : kind === 'publication'
          ? $gettext('Publication')
          : $gettext('Video')

const actionLabel = (kind: Kind) =>
    kind === 'news'
        ? $gettext('Read news article')
        : kind === 'publication'
          ? $gettext('Open publication')
          : $gettext('Go to video page')

const iconFor = (kind: Kind): Component =>
    kind === 'news' ? Newspaper : kind === 'publication' ? FileText : Play
</script>
