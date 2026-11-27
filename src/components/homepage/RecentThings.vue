<template>
    <!-- One block for everything the association publishes. News, publications
         and videos arrive in a single date order: the newest (or pinned) item
         takes the spotlight on the left, the rest queue on the right. Types are
         told apart by a glyph and a word, never by colour. -->
    <SectionCard :name="$gettext('Recent items')" pageBg>
        <template #content>
            <div
                v-if="loading"
                class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.55fr_1fr] lg:gap-6"
            >
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Skeleton height="20rem" />
                    <div class="flex flex-col gap-2">
                        <Skeleton height="1.6rem" width="45%" />
                        <Skeleton height="2.4rem" width="90%" />
                        <Skeleton height="1.6rem" width="100%" />
                        <Skeleton height="1.6rem" width="70%" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <Skeleton v-for="n in 5" :key="n" height="1.8rem" />
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
                    <!-- One height for every medium, so the three types agree. -->
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

                        <img
                            v-else-if="spotlight.kind === 'publication' && spotlight.thumb"
                            v-image-error="'/images/placeholder/book.svg'"
                            :src="spotlight.thumb"
                            :alt="spotlight.title"
                            class="max-h-full max-w-full rounded border border-slate-300 object-contain object-top dark:border-[var(--p-content-border-color)]"
                        />

                        <img
                            v-else-if="spotlightImage"
                            :src="spotlightImage"
                            :alt="spotlight.title"
                            class="h-full w-full object-cover object-[center_30%]"
                        />
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
                            <span
                                v-if="spotlight.pinned"
                                class="ml-1 flex items-center border-l border-slate-300 pl-2 text-primary dark:border-[var(--p-content-border-color)] dark:text-[var(--p-primary-300)]"
                                role="img"
                                :aria-label="$gettext('Pinned')"
                                :title="$gettext('Pinned')"
                            >
                                <Pin class="size-[1.4rem]" :stroke-width="2.25" aria-hidden="true" />
                            </span>
                        </span>

                        <h3 class="text-card-title! max-w-[30ch] font-extrabold leading-[1.15]">
                            {{ spotlight.title }}
                        </h3>

                        <div
                            v-if="spotlightBody"
                            class="text max-h-[10rem] max-w-[56ch] overflow-hidden text-body [mask-image:linear-gradient(to_bottom,#000_76%,transparent_100%)]"
                            v-html="spotlightBody"
                        ></div>

                        <Button
                            v-if="spotlight.to"
                            as="router-link"
                            :to="spotlight.to"
                            :label="actionLabel(spotlight.kind)"
                            size="small"
                            class="mt-1.5 w-fit"
                        />
                        <Button
                            v-else
                            as="a"
                            :href="spotlight.href"
                            target="_blank"
                            rel="noopener"
                            :label="actionLabel(spotlight.kind)"
                            size="small"
                            class="mt-1.5 w-fit"
                        />
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
                        :to="item.to"
                        :href="item.href"
                        :target="item.to ? undefined : '_blank'"
                        :rel="item.to ? undefined : 'noopener'"
                        :aria-label="`${kindLabel(item.kind)}: ${item.title}`"
                        class="group flex items-baseline justify-between gap-2 border-b border-slate-300 py-2 text-inherit no-underline last:border-b-0 dark:border-[var(--p-content-border-color)]"
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
import Button from 'primevue/button'
import { FileText, Newspaper, Pin, Play } from '@lucide/vue'
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
    article?: string
    description?: string
    embedUrl?: string
    pinned?: boolean
}

const { $gettext } = useGettext()

/** The first image inside an article body, lifted out so it can lead the block. */
const articles = ref<Record<string, { html: string; image?: string }>>({})

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

/** Render the article bodies once, keeping their first image aside. */
watch(
    () => entries.value,
    async (list) => {
        const rendered: Record<string, { html: string; image?: string }> = {}

        for (const item of list) {
            if (item.kind !== 'news' || !item.article) {
                continue
            }

            const html = await markedText(item.article)
            const document = new DOMParser().parseFromString(html, 'text/html')
            const image = document.querySelector('img')?.getAttribute('src') ?? undefined
            document.querySelectorAll('img').forEach((node) => node.remove())

            rendered[item.key] = { html: document.body.innerHTML, image }
        }

        articles.value = rendered
    },
    { immediate: true },
)

/** A pinned news item leads; without one, the newest item of the stream does. */
const spotlight = computed(
    () => entries.value.find((item) => item.pinned) ?? entries.value[0] ?? undefined,
)

const spotlightImage = computed(() =>
    spotlight.value?.kind === 'news' ? articles.value[spotlight.value.key]?.image : undefined,
)

const hasMedia = computed(
    () =>
        !!spotlightImage.value ||
        spotlight.value?.kind === 'video' ||
        spotlight.value?.kind === 'publication',
)

const spotlightBody = computed(() => {
    if (!spotlight.value) {
        return undefined
    }

    if (spotlight.value.kind === 'news') {
        return articles.value[spotlight.value.key]?.html
    }

    // A video description is worth printing only when it actually says something.
    const text = (spotlight.value.description ?? '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    return /[a-z]{2,}/i.test(text) && text.length > 20 ? text : undefined
})

const queue = computed(() => entries.value.filter((item) => item.key !== spotlight.value?.key))

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
