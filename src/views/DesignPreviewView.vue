<template>
    <!-- Sketch pad: overlay-date card and its near neighbours. Dev-only route. -->
    <div class="sk">
        <div class="page-container sk-intro">
            <h1 class="sk-h1">{{ $gettext('Overlay date sketch pad') }}</h1>
            <p class="sk-sub">
                X2 and six variations that differ by one thing each: the frame, the padding, the
                colour of the date block, where the block sits, which rules are drawn. Same content
                every time. At the bottom every variant again, larger, so the small differences are
                actually visible.
            </p>
        </div>

        <section
            v-for="option in options"
            :key="option.id"
            class="sk-opt"
            :class="`sk-opt-${option.tint}`"
        >
            <div class="page-container">
                <div class="sk-head">
                    <span class="sk-badge">OPTION {{ option.id }}</span>
                    <h2 class="sk-title">{{ option.name }}</h2>
                    <p class="sk-note">{{ option.note }}</p>
                </div>

                <div class="hd-b">
                    <span class="hd-b-num">02</span>
                    <span class="hd-b-title">Upcoming activities</span>
                    <a class="hd-b-link" href="#">View all <ArrowRight class="arrow" /></a>
                </div>

                <div class="ov-grid">
                    <a
                        v-for="item in items"
                        :key="item.title"
                        class="ovb"
                        :class="option.cls"
                        href="#"
                    >
                        <div class="ovb-media">
                            <img :src="item.image" alt="" />
                            <span class="ovb-date">
                                <b>{{ item.day }}</b>
                                <span>{{ item.month }}</span>
                                <span v-if="option.cls === 'v5'" class="ovb-date-kicker">
                                    {{ item.kicker }}
                                </span>
                            </span>
                        </div>
                        <div class="ovb-body">
                            <span class="ovb-kicker">{{ item.kicker }}</span>
                            <h3 class="ovb-title">{{ item.title }}</h3>
                            <p class="ovb-excerpt">{{ item.excerpt }}</p>
                        </div>
                        <div class="ovb-foot">
                            <span class="ovb-more">Read more</span>
                            <ArrowRight class="ovb-arrow" />
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section class="sk-opt sk-opt-plain">
            <div class="page-container">
                <div class="sk-head">
                    <span class="sk-badge">DETAIL</span>
                    <h2 class="sk-title">All variants, large</h2>
                    <p class="sk-note">
                        Three across instead of five, so padding, rule weight and type colour can be
                        compared properly.
                    </p>
                </div>

                <div v-for="option in options" :key="`big-${option.id}`" class="detail-row">
                    <span class="detail-label">{{ option.id }}</span>
                    <a class="ovb ovb-lg" :class="option.cls" href="#">
                        <div class="ovb-media">
                            <img :src="items[1].image" alt="" />
                            <span class="ovb-date">
                                <b>{{ items[1].day }}</b>
                                <span>{{ items[1].month }}</span>
                                <span v-if="option.cls === 'v5'" class="ovb-date-kicker">
                                    {{ items[1].kicker }}
                                </span>
                            </span>
                        </div>
                        <div class="ovb-body">
                            <span class="ovb-kicker">{{ items[1].kicker }}</span>
                            <h3 class="ovb-title">{{ items[1].title }}</h3>
                            <p class="ovb-excerpt">{{ items[1].excerpt }}</p>
                        </div>
                        <div class="ovb-foot">
                            <span class="ovb-more">Read more</span>
                            <ArrowRight class="ovb-arrow" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

interface Option {
    id: string
    name: string
    cls: string
    tint: 'light' | 'plain'
    note: string
}

const options: Option[] = [
    {
        id: 'X2',
        name: 'Overlay date (base)',
        cls: 'v0',
        tint: 'light',
        note: 'The one you picked: hairline frame, blue block on the photo edge, grey kicker, ruled footer.',
    },
    {
        id: 'X2a',
        name: 'No frame',
        cls: 'v1',
        tint: 'plain',
        note: 'Frame removed and body padding up from 0.9 to 1.2 rem. The photo and the date block carry the shape instead.',
    },
    {
        id: 'X2b',
        name: 'Heavier frame, tighter',
        cls: 'v2',
        tint: 'light',
        note: 'Frame goes from 1 px grey to 2 px near-black, padding drops to 0.6 rem, title one step smaller. Denser and harder.',
    },
    {
        id: 'X2c',
        name: 'Dark date block',
        cls: 'v3',
        tint: 'plain',
        note: 'The date block turns near-black and the kicker above the title disappears, so the only blue left is the read more.',
    },
    {
        id: 'X2d',
        name: 'Inset block, no rules',
        cls: 'v4',
        tint: 'light',
        note: 'The block sits 0.5 rem inside the photo instead of on its edge, and the footer rule is gone: the card has one hairline left, around the outside.',
    },
    {
        id: 'X2e',
        name: 'Full-width photo bar',
        cls: 'v5',
        tint: 'plain',
        note: 'The date becomes a bar across the whole photo in translucent black, with the kicker moved onto it at the right.',
    },
    {
        id: 'X2f',
        name: 'Wide frame, big day',
        cls: 'v6',
        tint: 'light',
        note: 'Frame in near-black, the blue block overshoots the photo edge on the left, day at 2.4 rem, and the excerpt goes dark instead of grey.',
    },
]

const items = [
    {
        kicker: 'Activity',
        day: '26',
        month: 'Nov 2026',
        date: '26 Nov 2026',
        title: 'Witteveen + Bos Workshop',
        excerpt: 'An afternoon of case work with one of the largest engineering firms in the country.',
        image: '/images/pillars/activities/activities1.jpg',
    },
    {
        kicker: 'Activity',
        day: '9',
        month: 'Oct 2026',
        date: '9 Oct 2026',
        title: 'Absync M-Bass and drinks',
        excerpt: 'The band plays, the taps open, and the year starts properly for a change.',
        image: '/images/pillars/activities/activities2.jpg',
    },
    {
        kicker: 'Companies',
        day: '8',
        month: 'Dec 2026',
        date: '8 Dec 2026',
        title: 'Sinterklaas Drink at the Absint',
        excerpt: 'Poetry, pepernoten and the yearly complaint about the poems.',
        image: '/images/pillars/career/career1.jpg',
    },
    {
        kicker: 'Education',
        day: '2',
        month: 'Dec 2026',
        date: '2 Dec 2026',
        title: 'Exam period tutoring sign-ups are open',
        excerpt: 'Small groups, older students, and coffee. Sign up before the end of the week.',
        image: '/images/pillars/education/education0.jpg',
    },
    {
        kicker: 'Activity',
        day: '23',
        month: 'Oct 2026',
        date: '23 Oct 2026',
        title: 'Dies Natalis: 64 years of Inter-Actief',
        excerpt: 'Reception, speeches, and a borrel that runs longer than the programme says.',
        image: '/images/pillars/news/news0.jpg',
    },
]
</script>

<style scoped>
.sk {
    padding-bottom: 4rem;
}

.sk-intro {
    padding-block: 2.4rem 1.6rem;
}

.sk-h1 {
    font-size: var(--text-page-title);
    font-weight: 800;
}

.sk-sub {
    max-width: 76rem;
    margin-top: 0.6rem;
    font-size: 1.4rem;
    color: #55607a;
}

.sk-opt {
    border-top: 2px solid #0d1016;
    padding-block: 2.4rem 3rem;
}

.sk-opt-light {
    background: var(--p-page-highlight);
}

.sk-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.8rem;
    margin-bottom: 1.4rem;
}

.sk-badge {
    background: #0d1016;
    color: #fff;
    padding: 0.35rem 0.7rem;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.18em;
}

.sk-title {
    font-size: var(--text-section);
    font-weight: 800;
}

.sk-note {
    flex-basis: 100%;
    max-width: 72rem;
    font-size: 1.35rem;
    color: #55607a;
}

/* section bar (chosen style) */
.hd-b {
    display: flex;
    align-items: center;
    gap: 0;
    background: var(--p-primary-color);
    color: #fff;
    margin-bottom: 1.4rem;
    padding-right: 1rem;
}

.hd-b-num {
    padding: 0.7rem 1rem;
    background: rgba(0, 0, 0, 0.28);
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
}

.hd-b-title {
    padding-left: 1rem;
    font-size: var(--text-section);
    font-weight: 800;
}

.hd-b-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-left: auto;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
}

.hd-b-link:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.arrow {
    width: 1.4rem;
    height: 1.4rem;
}

.ov-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.4rem;
}

/* ---------- base overlay card ---------- */
.ovb {
    display: flex;
    flex-direction: column;
    border: 1px solid #c3cad8;
    background: #fff;
    color: inherit;
}

.ovb-media {
    position: relative;
}

.ovb-media img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    display: block;
}

.ovb-date {
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

.ovb-date b {
    font-size: 1.9rem;
    font-weight: 800;
    line-height: 1;
}

.ovb-date span {
    font-size: 1.15rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.ovb-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 1;
    padding: 0.9rem 1rem 0;
}

.ovb-kicker {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a839b;
}

.ovb-title {
    font-size: var(--text-card-title);
    font-weight: 700;
    line-height: 1.25;
}

.ovb-excerpt {
    font-size: 1.35rem;
    line-height: 1.4;
    color: #55607a;
}

.ovb-foot {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.9rem;
    padding: 0.55rem 1rem;
    border-top: 1px solid #e2e6ee;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--p-primary-color);
}

.ovb-arrow {
    width: 1.3rem;
    height: 1.3rem;
}

.ovb:hover {
    border-color: var(--p-primary-color);
}

.ovb:hover .ovb-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ---------- X2a: no frame, more air ---------- */
.v1 {
    border: 0;
}

.v1 .ovb-body {
    padding: 1.2rem 1.2rem 0;
}

/* ---------- X2b: heavier frame, tighter ---------- */
.v2 {
    border: 2px solid #0d1016;
}

.v2 .ovb-body {
    padding: 0.6rem 0.7rem 0;
    gap: 0.25rem;
}

.v2 .ovb-title {
    font-size: 1.75rem;
}

.v2 .ovb-foot {
    margin-top: 0.6rem;
    padding: 0.45rem 0.7rem;
    border-top: 1px solid #c3cad8;
}

/* ---------- X2c: dark date block, no kicker ---------- */
.v3 .ovb-date {
    background: #0d1016;
}

.v3 .ovb-kicker {
    display: none;
}

.v3 .ovb-body {
    padding-top: 1rem;
}

/* ---------- X2d: inset block, no footer rule ---------- */
.v4 .ovb-date {
    left: 0.5rem;
    bottom: 0.5rem;
}

.v4 .ovb-foot {
    border-top: 0;
    padding-top: 0.4rem;
}

/* ---------- X2e: full-width photo bar ---------- */
.v5 .ovb-date {
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: flex-start;
    background: rgba(13, 16, 22, 0.78);
    padding: 0.4rem 0.8rem;
}

.v5 .ovb-kicker {
    display: none;
}

.v5 .ovb-media {
    position: relative;
}

.ovb-date-kicker {
    margin-left: auto;
    font-size: 1.1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
}

/* ---------- X2f: wide frame, big day ---------- */
.v6 {
    border: 1px solid #0d1016;
}

.v6 .ovb-date {
    padding: 0.4rem 0.5rem 0.4rem 1rem;
    left: -1px;
    bottom: -1px;
}

.v6 .ovb-date b {
    font-size: 2.4rem;
}

.v6 .ovb-date span {
    padding-right: 0.4rem;
}

.v6 .ovb-excerpt {
    color: #0d1016;
}

/* ---------- detail rows ---------- */
.detail-row {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
}

.detail-label {
    width: 5rem;
    flex-shrink: 0;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #7a839b;
    padding-top: 0.4rem;
}

.ovb-lg {
    width: 40rem;
    flex-shrink: 0;
}

.ovb-lg .ovb-title {
    font-size: 2rem;
}

.ovb-lg .ovb-excerpt {
    font-size: 1.4rem;
}
</style>
