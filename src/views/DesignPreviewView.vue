<template>
    <main class="pd">
        <div class="page-container">
            <header class="pd-intro">
                <h1 class="pd-h1">Card iteration: the read-more link, sliding underline</h1>
                <p class="pd-note">
                    Locked in: 4px radius, activity type on the title line as a hairline pill that comes from the
                    backend (the third card in each row has no type, so no pill).
                </p>
                <p class="pd-note">
                    Taken from R1: no hairline over the footer, the label in sentence case with the arrow behind
                    it. This round only varies how the underline slides in on hover, the way every other link on
                    the site does it. Hover the cards &mdash; the stills below cannot show the motion.
                </p>
            </header>
        </div>

        <section v-for="opt in options" :key="opt.id" class="pd-opt" :class="opt.cls">
            <div class="page-container">
                <div class="pd-opt-head">
                    <span class="pd-badge">{{ opt.id }}</span>
                    <span class="pd-opt-name">{{ opt.name }}</span>
                </div>
                <p class="pd-opt-note">{{ opt.note }}</p>

                <div class="pd-bar">
                    <span class="pd-bar-title">Upcoming activities</span>
                    <span class="pd-bar-link">View all activities</span>
                </div>

                <div class="pd-grid">
                    <a v-for="(item, i) in items" :key="i" class="pd-card" href="#">
                        <div class="pd-media">
                            <img :src="item.image" :alt="item.title" />
                            <span class="pd-date">
                                <span class="pd-day">{{ item.day }}</span>
                                <span class="pd-mon">{{ item.month }}</span>
                            </span>
                        </div>
                        <div class="pd-body">
                            <div class="pd-titlerow">
                                <h3 class="pd-title">{{ item.title }}</h3>
                                <!-- pill only exists when the backend supplies an activity type -->
                                <span v-if="item.label" class="pd-pill"
                                    :style="{ color: item.color, borderColor: item.color }">{{ item.label }}</span>
                            </div>
                            <p class="pd-ex">{{ item.excerpt }}</p>

                            <div class="rm rm-row">
                                <span class="rm-link" :class="{ 'rm-link-arrow': opt.underlineArrow }">
                                    Read more<span v-if="opt.underlineArrow"> <span class="rm-arrow">&rarr;</span></span>
                                </span>
                                <span v-if="!opt.underlineArrow" class="rm-arrow rm-arrow-move">&rarr;</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section v-for="opt in compactOptions" :key="opt.id" class="pd-opt" :class="opt.cls">
            <div class="page-container">
                <div class="pd-opt-head">
                    <span class="pd-badge">{{ opt.id }}</span>
                    <span class="pd-opt-name">{{ opt.name }}</span>
                </div>
                <p class="pd-opt-note">{{ opt.note }}</p>

                <div class="pd-bar">
                    <span class="pd-bar-title">Upcoming activities</span>
                    <span class="pd-bar-link">View all activities</span>
                </div>

                <div class="pd-cgrid">
                    <a v-for="(item, i) in items.slice(0, 2)" :key="i" class="pd-ccard" href="#">
                        <div class="pd-ctext">
                            <span v-if="opt.dateOn === 'text'" class="pd-metadate">{{ item.day }} {{ item.month
                                }}</span>
                            <div class="pd-titlerow">
                                <h3 class="pd-title">{{ item.title }}</h3>
                                <span v-if="item.label" class="pd-pill"
                                    :style="{ color: item.color, borderColor: item.color }">{{ item.label }}</span>
                            </div>
                            <p v-if="opt.dateBelow" class="pd-metadate">{{ item.day }} {{ item.month }}</p>
                            <p class="pd-ex">{{ item.excerpt }}</p>
                            <div class="rm rm-row">
                                <span class="rm-link rm-link-arrow">Read more <span class="rm-arrow">&rarr;</span></span>
                            </div>
                        </div>
                        <div class="pd-cmedia">
                            <img :src="item.image" :alt="item.title" />
                            <span v-if="opt.dateOn === 'image'" class="pd-date">{{ item.day }}<span
                                    class="pd-mon">{{ item.month }}</span></span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section class="pd-detail">
            <div class="page-container">
                <div class="pd-opt-head">
                    <span class="pd-badge">DETAIL</span>
                    <span class="pd-opt-name">Every option at 2.4&times; size</span>
                </div>
                <p class="pd-opt-note">The footer differences are small; judge them here.</p>

                <div class="pd-detail-list">
                    <div v-for="opt in options" :key="opt.id" class="pd-detail-item" :class="opt.cls">
                        <span class="pd-detail-tag">{{ opt.id }}</span>
                        <a class="pd-card pd-card-lg" href="#">
                            <div class="pd-media">
                                <img :src="items[0].image" :alt="items[0].title" />
                                <span class="pd-date">
                                    <span class="pd-day">{{ items[0].day }}</span>
                                    <span class="pd-mon">{{ items[0].month }}</span>
                                </span>
                            </div>
                            <div class="pd-body">
                                <div class="pd-titlerow">
                                    <h3 class="pd-title">{{ items[0].title }}</h3>
                                    <span class="pd-pill"
                                        :style="{ color: items[0].color, borderColor: items[0].color }">{{
                                        items[0].label }}</span>
                                </div>
                                <p class="pd-ex">{{ items[0].excerpt }}</p>
                                <div class="rm rm-row">
                                    <span class="rm-link" :class="{ 'rm-link-arrow': opt.underlineArrow }">
                                        Read more<span v-if="opt.underlineArrow"> <span class="rm-arrow">&rarr;</span></span>
                                    </span>
                                    <span v-if="!opt.underlineArrow" class="rm-arrow rm-arrow-move">&rarr;</span>
                                </div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
interface Item {
    image: string
    title: string
    excerpt: string
    label: string
    color: string
    day: string
    month: string
}

interface Option {
    id: string
    name: string
    note: string
    cls: string
    /** true: the arrow is inside the underlined span; false: it steps aside on hover. */
    underlineArrow: boolean
}

interface CompactOption {
    id: string
    name: string
    note: string
    cls: string
    /** where the date sits: over the photo, above the title, or under the title */
    dateOn: 'image' | 'text'
    dateBelow?: boolean
}

const compactOptions: CompactOption[] = [
    {
        id: 'C0',
        name: 'Compact, photo right at one third',
        note: 'The row the homepage used to have, with the new type and the blue date block sitting on the photo.',
        cls: 'pd-c0',
        dateOn: 'image',
    },
    {
        id: 'C1',
        name: 'Compact, date above the title',
        note: 'Same proportions, but the date leaves the photo and becomes a quiet line above the title.',
        cls: 'pd-c1',
        dateOn: 'text',
    },
    {
        id: 'C2',
        name: 'Compact, wider photo at 40%',
        note: 'More picture, less text room. Shows how far the photo can grow before the title wraps badly.',
        cls: 'pd-c2',
        dateOn: 'image',
    },
    {
        id: 'C3',
        name: 'Compact, date under the title',
        note: 'Title leads, then date and excerpt below it. Slightly taller, reads top-down like an article.',
        cls: 'pd-c3',
        dateOn: 'text',
        dateBelow: true,
    },
]

const items: Item[] = [
    {
        image: '/images/pillars/activities/activities0.jpg',
        title: 'Witteveen + Bos Workshop',
        excerpt:
            'Witteveen+Bos provides consultancy and design services in the fields of water, infrastructure, the environment, and construction.',
        label: 'Career',
        color: '#0f7b3d',
        day: '26',
        month: 'Nov 2026',
    },
    {
        image: '/images/pillars/activities/activities1.jpg',
        title: 'Feutenmarathon',
        excerpt:
            'Dear members, Has it been far too long since you last saw Noordzij, loudly shouted "Vó" with a horse’s ass, or do you simply crave a steaming bowl of lasagna?',
        label: 'Social',
        color: '#0f7b3d',
        day: '29',
        month: 'Nov 2026',
    },
    {
        // no activity type from the backend: no pill
        image: '/images/pillars/activities/activities2.jpg',
        title: 'Pepernoten Baking Workshop',
        excerpt:
            'Do you want to bake some delicious pepernoten, a dutch cookie-like confectionery? Enroll for the workshop!',
        label: '',
        color: '#0f7b3d',
        day: '30',
        month: 'Nov 2026',
    },
]

const options: Option[] = [
    {
        id: 'A',
        name: 'Underline under the words',
        note: 'The arrow sits outside the underlined span, so the bar stops at the text and the arrow stays put.',
        cls: 'pd-a',
        underlineArrow: false,
    },
    {
        id: 'B',
        name: 'Underline under words and arrow',
        note: 'The arrow is part of the label, so the bar runs under it as well. One continuous line.',
        cls: 'pd-b',
        underlineArrow: true,
    },
    {
        id: 'C',
        name: 'Underline under the words, arrow steps right',
        note: 'Words only in the underline, and the arrow shifts a little to the right as the bar arrives.',
        cls: 'pd-c',
        underlineArrow: false,
    },
    {
        id: 'D',
        name: 'Thicker bar, further from the text',
        note: 'Same as B, but the bar is heavier and drops a little further below the baseline.',
        cls: 'pd-d',
        underlineArrow: true,
    },
]
</script>

<style scoped>
.pd {
    padding-bottom: 6rem;
}

.pd-intro {
    max-width: 72rem;
    padding: 2rem 0 1rem;
}

.pd-h1 {
    font-size: 2.4rem;
    font-weight: 800;
    margin: 0 0 0.8rem;
}

.pd-note,
.pd-opt-note {
    font-size: 1.35rem;
    line-height: 1.5;
    color: #55607a;
    margin: 0 0 1.2rem;
    max-width: 72rem;
}

.pd-opt {
    border-top: 2px solid #0d1016;
    padding: 1.6rem 0 2.4rem;
    background: #fff;
}

.pd-opt:nth-of-type(even) {
    background: var(--p-page-highlight, #f4f6fa);
}

.pd-opt-head {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.4rem;
}

.pd-badge {
    background: #0d1016;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.7rem;
}

.pd-opt-name {
    font-size: var(--text-section, 2.25rem);
    font-weight: 800;
}

.pd-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: var(--p-primary-color, #1d428a);
    color: #fff;
    padding: 0.5rem 0.9rem;
    margin-bottom: 1rem;
}

.pd-bar-title {
    font-size: var(--text-section, 2.25rem);
    font-weight: 800;
}

.pd-bar-link {
    font-size: 1.3rem;
}

.pd-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

/* ---- card: locked decisions = 4px radius + pill ---- */
.pd-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    border: 1px solid #c3cad8;
    border-radius: 4px;
    color: inherit;
    text-decoration: none;
    overflow: hidden;
}

.pd-media {
    position: relative;
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}

.pd-media img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.pd-date {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    background: var(--p-primary-color, #1d428a);
    color: #fff;
    border-radius: 2px;
    padding: 0.35rem 0.8rem;
}

.pd-day {
    font-size: 1.9rem;
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.pd-mon {
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.pd-body {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0.9rem;
    flex: 1;
}

.pd-titlerow {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.8rem;
}

.pd-title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: var(--text-card-title, 1.9rem);
    font-weight: 700;
    line-height: 1.25;
}

.pd-pill {
    flex: 0 0 auto;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    border: 1px solid currentColor;
    border-radius: 999px;
    padding: 0.15rem 0.7rem;
}

.pd-ex {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.45;
    color: #55607a;
    /* Chromium paints half a clipped line under display:-webkit-box, so the pad
       clamps with a hard two-line height instead. */
    max-height: calc(2 * 1.45em);
    overflow: hidden;
}

/* ---- read-more: R1 with a sliding underline ---- */
.rm {
    margin-top: auto;
    padding-top: 0.7rem;
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    color: var(--p-primary-color, #1d428a);
}

.rm-link {
    position: relative;
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 600;
    padding-bottom: 0.15rem;
}

.rm-link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.2rem;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 300ms ease;
}

.pd-card:hover .rm-link::after {
    transform: scaleX(1);
}

.rm-arrow {
    font-size: 1.3rem;
    line-height: 1;
}

.rm-link .rm-arrow {
    margin-left: 0.25rem;
}

.rm-arrow-move {
    transition: transform 300ms ease;
}

.pd-c .pd-card:hover .rm-arrow-move {
    transform: translateX(0.25rem);
}

.pd-d .rm-link::after {
    height: 0.28rem;
    bottom: -0.15rem;
}

/* ---- compact rows: photo on the right ---- */
.pd-cgrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.pd-ccard {
    display: flex;
    flex-direction: row;
    height: 100%;
    background: #fff;
    border: 1px solid #c3cad8;
    border-radius: 4px;
    overflow: hidden;
    color: inherit;
    text-decoration: none;
}

.pd-ctext {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0.9rem;
}

.pd-cmedia {
    position: relative;
    flex: 0 0 32%;
    width: 32%;
}

.pd-c2 .pd-cmedia {
    flex-basis: 40%;
    width: 40%;
}

.pd-cmedia img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pd-metadate {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7a839b;
    margin: 0;
}

.pd-cmedia .pd-date {
    border-radius: 2px;
}

/* below ~960px everything stacks, which is also how the phone sees it */
@media (max-width: 60rem) {
    .pd-grid,
    .pd-cgrid,
    .pd-detail-list {
        grid-template-columns: 1fr;
    }
}

/* ---- detail pass ---- */
.pd-detail {
    border-top: 2px solid #0d1016;
    padding: 1.6rem 0 3rem;
}

.pd-detail-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.6rem;
    align-items: start;
}

.pd-detail-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.pd-detail-tag {
    flex: 0 0 auto;
    font-size: 1.8rem;
    font-weight: 800;
    color: #7a839b;
    min-width: 3.2rem;
}

.pd-card-lg {
    width: 100%;
}

.pd-card-lg .pd-body {
    padding: 1.2rem;
    gap: 0.6rem;
}

.pd-card-lg .rm-bar {
    margin: 0.6rem -1.2rem 0;
    padding: 0.7rem 1.2rem;
}

.pd-card-lg .pd-title {
    font-size: 2.3rem;
}

.pd-card-lg .pd-ex {
    font-size: 1.6rem;
    max-height: calc(3 * 1.45em);
}

.pd-card-lg .pd-day {
    font-size: 2.4rem;
}

.pd-card-lg .pd-mon {
    font-size: 1.3rem;
}

.pd-card-lg .rm,
.pd-card-lg .rm-caps,
.pd-card-lg .rm-sentence,
.pd-card-lg .rm-underline,
.pd-card-lg .rm-grey {
    font-size: 1.5rem;
}
</style>
