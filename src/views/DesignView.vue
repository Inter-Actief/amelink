<!--
  THROWAWAY design pad (dev only). Delete this file and its route once a
  direction is picked.

  The card structure is the shipping one: photo plate on the right, date row on
  top, title, teaser. Only the typography of the date and of the activity label
  changes between options.
-->
<template>
    <div class="pad">
        <div class="shell pad-intro">
            <h1 class="pad-h1">Date and activity label — typography pad</h1>
            <p class="pad-sub">
                Same card, same six activities. Only the two small strings at the top of each card
                are re-set. Today both are tiny wide-tracked caps, which is the loudest template
                tell in the card.
            </p>
        </div>

        <!-- baseline: the real component, untouched -->
        <section class="pad-opt">
            <div class="shell">
                <div class="head">
                    <span class="pad-badge">OPTION 0</span>
                    <h2 class="pad-title">Today</h2>
                    <p class="note">
                        “29 NOV 2026” in 11.5px caps, 0.1em tracking, over “SOCIAL” in 9.5px bold
                        caps, 0.12em tracking. Two tracked cap strings, one above the other's
                        shoulder.
                    </p>
                </div>

                <SectionCard pageBg name="Upcoming Activities">
                    <template #info>
                        <a class="link" href="#">View all activities</a>
                    </template>
                    <template #content>
                        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                            <TileCard
                                v-for="item in items"
                                :key="item.id"
                                :title="item.title"
                                :date="item.iso"
                                aspect="video"
                                hide-action
                                show-media
                                :image="item.image ?? undefined"
                                placeholder="/images/placeholder/shape.svg"
                                fit="contain"
                                :label="{ color: item.color, text: item.type }"
                                to="#"
                            >
                                <div class="line-clamp-2">{{ item.excerpt }}</div>
                            </TileCard>
                        </div>
                    </template>
                </SectionCard>
            </div>
        </section>

        <section
            v-for="opt in options"
            :key="opt.letter"
            class="pad-opt"
            :class="`pad-opt-${opt.tint}`"
        >
            <div class="shell">
                <div class="head">
                    <span class="pad-badge">OPTION {{ opt.letter }}</span>
                    <h2 class="pad-title">{{ opt.name }}</h2>
                    <p class="note">{{ opt.note }}</p>
                </div>

                <SectionCard pageBg name="Upcoming Activities">
                    <template #info>
                        <a class="link" href="#">View all activities</a>
                    </template>
                    <template #content>
                        <div class="grid">
                            <a
                                v-for="item in items"
                                :key="item.id"
                                href="#"
                                class="card"
                                :class="`v-${opt.letter.toLowerCase()}`"
                                :style="{ '--type': `#${item.color}` }"
                            >
                                <div class="media">
                                    <img
                                        :src="item.image ?? '/images/placeholder/shape.svg'"
                                        :alt="item.title"
                                    />
                                </div>
                                <div class="body">
                                    <div class="meta">
                                        <span class="date">
                                            <span class="d">{{ item.day }}</span>
                                            <span class="m">{{ item.month }}</span>
                                            <span class="y">{{ item.year }}</span>
                                            <span class="t">{{ item.time }}</span>
                                        </span>
                                        <span class="label">{{ item.type }}</span>
                                    </div>
                                    <h3 class="title">{{ item.title }}</h3>
                                    <p class="excerpt">{{ item.excerpt }}</p>
                                </div>
                            </a>
                        </div>
                    </template>
                </SectionCard>
            </div>
        </section>

        <!-- detail pass: at grid size the fine differences are invisible -->
        <section class="pad-opt pad-opt-plain">
            <div class="shell">
                <div class="head">
                    <span class="pad-badge">DETAIL</span>
                    <h2 class="pad-title">Every option, one card large</h2>
                    <p class="note">The long title with the long label, at reading size.</p>
                </div>
                <div v-for="opt in options" :key="`big-${opt.letter}`" class="detail">
                    <span class="detail-label">{{ opt.letter }}</span>
                    <a
                        href="#"
                        class="card card-lg"
                        :class="`v-${opt.letter.toLowerCase()}`"
                        :style="{ '--type': `#${items[5].color}` }"
                    >
                        <div class="media">
                            <img :src="items[5].image ?? '/images/placeholder/shape.svg'" alt="" />
                        </div>
                        <div class="body">
                            <div class="meta">
                                <span class="date">
                                    <span class="d">{{ items[5].day }}</span>
                                    <span class="m">{{ items[5].month }}</span>
                                    <span class="y">{{ items[5].year }}</span>
                                    <span class="t">{{ items[5].time }}</span>
                                </span>
                                <span class="label">{{ items[5].type }}</span>
                            </div>
                            <h3 class="title">{{ items[5].title }}</h3>
                            <p class="excerpt">{{ items[5].excerpt }}</p>
                        </div>
                    </a>
                    <a
                        href="#"
                        class="card card-lg"
                        :class="`v-${opt.letter.toLowerCase()}`"
                        :style="{ '--type': `#${items[3].color}` }"
                    >
                        <div class="media">
                            <img :src="items[3].image ?? '/images/placeholder/shape.svg'" alt="" />
                        </div>
                        <div class="body">
                            <div class="meta">
                                <span class="date">
                                    <span class="d">{{ items[3].day }}</span>
                                    <span class="m">{{ items[3].month }}</span>
                                    <span class="y">{{ items[3].year }}</span>
                                    <span class="t">{{ items[3].time }}</span>
                                </span>
                                <span class="label">{{ items[3].type }}</span>
                            </div>
                            <h3 class="title">{{ items[3].title }}</h3>
                            <p class="excerpt">{{ items[3].excerpt }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import SectionCard from '@/components/ui/SectionCard.vue'
import TileCard from '@/components/ui/TileCard.vue'

interface Option {
    letter: string
    name: string
    note: string
    tint: 'light' | 'plain'
}

const options: Option[] = [
    {
        letter: 'A',
        name: 'Plain sentence case',
        note: 'Caps and tracking gone from both strings; the colour drops to a 6px dot in front of the label. Nothing is emphasised, so the title is the only loud thing.',
        tint: 'light',
    },
    {
        letter: 'B',
        name: 'Day weighted',
        note: 'The number carries the weight: the day at 700 and full contrast, “Nov 2026” grey, the label plain grey sentence case. Tabular figures, so the dates line up down the column.',
        tint: 'plain',
    },
    {
        letter: 'C',
        name: 'Colour kept',
        note: 'The label keeps the activity colour but loses the caps and the bold — 600 at 13.4px sentence case. The date stays a plain grey line.',
        tint: 'light',
    },
    {
        letter: 'D',
        name: 'Real small caps',
        note: 'Inter’s own small-cap glyphs (font-variant-caps), so the string is set in caps that are drawn for it, with no letter-spacing to fake it. Label in the activity colour.',
        tint: 'plain',
    },
]

/** Real content, pulled from staging: titles, dates, start times, type labels and colours. */
const items = [
    {
        id: '7967',
        iso: '2026-11-29T12:00:00+00:00',
        day: 29,
        month: 'Nov',
        year: '2026',
        time: '13:00',
        type: 'Social',
        color: '099a2b',
        title: 'Feutenmarathon',
        excerpt:
            'Thirteen hours of Mercurius: the M-Basement turns into the corporate world of Feuten, and you get lasagna out of it.',
        image: null as string | null,
    },
    {
        id: '7975',
        iso: '2026-11-30T17:00:00+00:00',
        day: 30,
        month: 'Nov',
        year: '2026',
        time: '18:00',
        type: 'Social',
        color: '099a2b',
        title: 'Pepernoten Baking Workshop',
        excerpt:
            'The Cooking Club brings the ovens and the ingredients, you bring nothing and take a bag of pepernoten home.',
        image: null as string | null,
    },
    {
        id: '7979',
        iso: '2026-12-02T19:00:00+00:00',
        day: 2,
        month: 'Dec',
        year: '2026',
        time: '20:00',
        type: 'Social',
        color: '099a2b',
        title: 'Freshmen Ice Skating',
        excerpt:
            'Two hours on the ice at IJsbaan Twente. Bring gloves and a beanie, hire skates there if you have none.',
        image: 'https://media.ia.utwente.nl/amelie/activities/icon/freshman_skating_poster.png',
    },
    {
        id: '7974',
        iso: '2026-12-03T07:30:00+00:00',
        day: 3,
        month: 'Dec',
        year: '2026',
        time: '08:30',
        type: 'Career',
        color: '2450a8',
        title: 'Voortman Steel Excursion',
        excerpt:
            'A morning inside a steel fabricator that builds its own machines, robots and software for the whole line.',
        image: null as string | null,
    },
    {
        id: '7976',
        iso: '2026-12-08T16:00:00+00:00',
        day: 8,
        month: 'Dec',
        year: '2026',
        time: '17:00',
        type: 'Social',
        color: '099a2b',
        title: 'Sinterklaas Drink',
        excerpt:
            'The Saint stays a week longer for us. Sit on his lap, take a gift, complain about the poem.',
        image: null as string | null,
    },
    {
        id: '7980',
        iso: '2026-12-09T18:30:00+00:00',
        day: 9,
        month: 'Dec',
        year: '2026',
        time: '19:30',
        type: 'General',
        color: '372652',
        title: 'General Members Meeting (GMM)',
        excerpt:
            'The annual report of 2025-2026 gets discussed. The documents go up two weeks ahead on the GMM page.',
        image: null as string | null,
    },
]
</script>

<style scoped>
/* ---------- pad chrome: deliberately plain ---------- */
.shell {
    width: 100%;
    max-width: var(--content-max-width);
    margin-inline: auto;
    padding-inline: 2.5rem;
}

.pad-intro {
    padding-block: 2.4rem 1.6rem;
}

.pad-h1 {
    font-size: 2.6rem;
    font-weight: 800;
}

.pad-sub {
    max-width: 96rem;
    margin-top: 0.6rem;
    font-size: 1.5rem;
    color: var(--p-text-muted-color);
}

.pad-opt {
    border-top: 2px solid var(--p-text-color);
    padding-block: 2.2rem 2.8rem;
}

.pad-opt-light {
    background: var(--p-page-highlight);
}

.head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
}

.pad-badge {
    background: var(--p-text-color);
    color: var(--p-page-background);
    padding: 0.35rem 0.7rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.16em;
}

.pad-title {
    font-size: 2.1rem;
    font-weight: 800;
}

.note {
    flex-basis: 100%;
    max-width: 100rem;
    font-size: 1.4rem;
    color: var(--p-text-muted-color);
}

/* ---------- one grid for every option ---------- */
.grid {
    display: grid;
    gap: 0.8rem;
    padding-bottom: 1rem;
}

@media (min-width: 76.8rem) {
    .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

/* ---------- the shipping card geometry: photo plate right, text left ---------- */
.card {
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--p-content-border-color);
    border-radius: var(--border-radius);
    background: var(--p-page-tile);
    color: inherit;
    text-decoration: none;
}

.media {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 33.333%;
    max-width: 33.333%;
    background: #fff;
    padding: 0.6rem;
}

.media img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
}

.meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
}

.title {
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.005em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}

.excerpt {
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--p-text-muted-color);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}

.card:hover .title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* the parts every option shares: the date is read as one string, and the
   label never wraps to a second line */
.date {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}

.label {
    white-space: nowrap;
}

/* ---------- A · plain sentence case ---------- */
.v-a .date {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--p-text-muted-color);
}

.v-a .label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.35rem;
    font-weight: 400;
    color: var(--p-text-muted-color);
}

.v-a .label::before {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 100%;
    /* mixed towards the text colour, so one declaration fits both themes */
    background: color-mix(in srgb, var(--type) 72%, var(--p-text-color));
}

/* ---------- B · day weighted ---------- */
.v-b .date {
    font-size: 1.4rem;
    color: var(--p-text-muted-color);
}

.v-b .d {
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--p-text-color);
}

.v-b .label {
    font-size: 1.35rem;
    font-weight: 400;
    color: var(--p-text-muted-color);
}

/* ---------- C · colour kept, caps dropped ---------- */
.v-c .date {
    font-size: 1.4rem;
    color: var(--p-text-muted-color);
}

.v-c .label {
    font-size: 1.4rem;
    font-weight: 600;
    /* a navy label is invisible on a navy card; mixed with the text colour it
       darkens on light and lightens on dark without a .dark rule */
    color: color-mix(in srgb, var(--type) 62%, var(--p-text-color));
}

/* ---------- D · real small caps ----------
   `all-small-caps` only shrinks the lower-case letters, so a title-case
   string sets a full-height “D” next to small “e c”. Lower-casing first is
   what makes the run even. */
.v-d .date,
.v-d .label {
    font-variant-caps: all-small-caps;
    text-transform: lowercase;
}

.v-d .date {
    font-size: 1.5rem;
    color: var(--p-text-muted-color);
}

.v-d .label {
    font-size: 1.5rem;
    font-weight: 600;
    color: color-mix(in srgb, var(--type) 62%, var(--p-text-color));
}

/* ---------- detail pass ---------- */
.detail {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
}

.detail-label {
    width: 2.4rem;
    flex: none;
    padding-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--p-text-muted-color);
}

.card-lg {
    width: 46rem;
    flex: none;
}

.card-lg .title {
    font-size: 2rem;
}
</style>
