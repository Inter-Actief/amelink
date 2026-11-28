<script setup lang="ts">
/**
 * THROWAWAY DESIGN PAD — issue #150 "Activity card too AI like".
 *
 * Round 4: variant 1 was picked (one metaline, no labels, promo as teaser).
 *
 * Round 3: the CONTENT is settled — one metaline with no labels
 * ("Mon 30 Nov, 15:45 · MBasement · Social"), then the title, then the promo as
 * teaser (description as the fallback). Every card here is drawn at the
 * homepage geometry (421x131 row) and varies the DESIGN around that content.
 *
 * The type colour is carried two ways, because both have to survive dark mode:
 * as a mixed-ink word (color-mix with --p-text-color) and as a neutral word with
 * the colour moved out of the text (dot, or edge rule).
 *
 * Data is real: pulled from staging GraphQL on 27 Nov 2026, including the ugly
 * cases (empty location, "TBD", a 16-day event, a 36-character committee name,
 * activities with no promo text and activities you cannot sign up for).
 */
import { imageSrc } from '@/composables/util'

type Activity = {
    id: number
    summary: string
    begin: string
    end: string
    location: string
    organizer: string
    label: string
    color: string
    price: string
    enrollment: boolean
    enrollmentFull: boolean
    enrollmentEnd: string | null
    promo: string
    teaser: string
    icon?: string
}

const sample: Activity[] = [
    {
        id: 7967,
        summary: 'Feutenmarathon',
        begin: '2026-11-29T11:00:00+00:00',
        end: '2026-11-30T00:00:00+00:00',
        location: 'Abscint',
        organizer: "Members' Initiative",
        label: 'Social',
        color: '099A2B',
        price: '0.00',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-11-29T19:00:00+00:00',
        promo: '',
        teaser: 'Thirteen hours of Mercurius: the M-Basement turns into the corporate world of Feuten, and you get lasagna out of it.',
    },
    {
        id: 7975,
        summary: 'Pepernoten Bakken Workshop',
        begin: '2026-11-30T14:45:00+00:00',
        end: '2026-11-30T17:00:00+00:00',
        location: 'MBasement',
        organizer: 'Cooking Club',
        label: 'Social',
        color: '099A2B',
        price: '5.00',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-11-28T22:59:00+00:00',
        promo: 'Do you want to bake some yummy pepernoten, a dutch cookie-like confectionery? Enroll for the workshop and take them home.',
        teaser: 'The Cooking Club brings the ovens and the ingredients, you bring nothing and take a bag of pepernoten home.',
    },
    {
        id: 7981,
        summary: 'Studiereis Duality Inschrijving',
        begin: '2026-11-06T16:00:00+00:00',
        end: '2026-11-22T22:59:00+00:00',
        location: '',
        organizer: 'Study Tour Committee 2027',
        label: 'General',
        color: '372652',
        price: '0.00',
        enrollment: false,
        enrollmentFull: false,
        enrollmentEnd: null,
        promo: '',
        teaser: 'Registration for the study tour of 2027 opens today and closes in three weeks. Read everything before you sign up.',
    },
    {
        id: 7972,
        summary: 'DemCon Lunchlezing',
        begin: '2026-11-10T11:45:00+00:00',
        end: '2026-11-10T12:30:00+00:00',
        location: 'RA 1501',
        organizer: 'Committee for Lectures and Excursions',
        label: 'Career',
        color: '2450A8',
        price: '0.00',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-11-06T11:00:00+00:00',
        promo: '',
        teaser: 'A lunch lecture by DemCon: how a steel fabricator ends up building machines, robots and software for a whole production line.',
    },
    {
        id: 7978,
        summary: 'aXi Hot ones',
        begin: '2026-11-24T16:30:00+00:00',
        end: '2026-11-24T17:30:00+00:00',
        location: 'Educafe',
        organizer: 'aXi',
        label: 'Social',
        color: '099A2B',
        price: '6.00',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-11-23T14:00:00+00:00',
        promo: 'Do you dare tasting 10 sauces ranging from mild spicy to fire breathing on some hot chicken wings from Hot Ones?',
        teaser: 'Ten sauces, one hour, chicken wings get progressively worse. Signed waiver is part of the joke.',
        icon: '/images/pillars/activities/activities2.jpg',
    },
    {
        id: 7950,
        summary: 'VriMiBo',
        begin: '2026-11-06T15:00:00+00:00',
        end: '2026-11-06T21:00:00+00:00',
        location: 'Abscint',
        organizer: 'Sociëteitscommissie',
        label: 'Social',
        color: '099A2B',
        price: '0.00',
        enrollment: false,
        enrollmentFull: false,
        enrollmentEnd: null,
        promo: '',
        teaser: 'The free Friday afternoon drink of the Sociëteitscommissie. Walk in, grab a beer, no sign-up needed.',
    },
    {
        id: 7984,
        summary: 'Christmas Craft Evening',
        begin: '2026-11-23T15:00:00+00:00',
        end: '2026-11-23T19:00:00+00:00',
        location: 'TBD',
        organizer: 'Christmas Committee 2026',
        label: 'Social',
        color: '099A2B',
        price: '2.00',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-11-23T12:00:00+00:00',
        promo: '',
        teaser: 'Knitting, glueing and way too much glitter. Materials are included for two euro.',
    },
    {
        id: 7979,
        summary: 'Freshmen Ice Skating',
        begin: '2026-12-02T19:00:00+00:00',
        end: '2026-12-02T22:00:00+00:00',
        location: 'IJsbaan Twente',
        organizer: 'Freshmen Committee',
        label: 'Social',
        color: '099A2B',
        price: '7.50',
        enrollment: true,
        enrollmentFull: false,
        enrollmentEnd: '2026-12-01T23:59:00+00:00',
        promo: 'Two hours on the ice at IJsbaan Twente, with the whole first-year cohort. Bring gloves and a beanie, hire skates there.',
        teaser: 'Two hours on the ice at IJsbaan Twente. Bring gloves and a beanie, hire skates there.',
        icon: 'https://media.ia.utwente.nl/amelie/activities/icon/freshman_skating_poster.png',
    },
]

const labels = [
    { name: 'Social', color: '099A2B' },
    { name: 'Career', color: '2450A8' },
    { name: 'Education', color: 'DC332E' },
    { name: 'General', color: '372652' },
]

const pick = (...ids: number[]) => ids.map((id) => sample.find((a) => a.id === id)!)
/** The same three cards in every section, so only the design varies. */
const row1 = pick(7975, 7978, 7979)

/* ---------- formatting: Intl only, nothing hardcoded ---------- */

const LOCALE = 'en-GB'
const dateFmt = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
})
const longDateFmt = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
})
const timeFmt = new Intl.DateTimeFormat(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
})
const moneyFmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

const day = (iso: string) => dateFmt.format(new Date(iso))
const dayLong = (iso: string) => longDateFmt.format(new Date(iso))
const time = (iso: string) => timeFmt.format(new Date(iso))
const multiDay = (a: Activity) =>
    new Date(a.begin).toDateString() !== new Date(a.end).toDateString()
/** Same day: a range. Over midnight: mark it. Longer than a day: both dates. */
const when = (a: Activity) => {
    const hours = (Date.parse(a.end) - Date.parse(a.begin)) / 3600000
    if (!multiDay(a)) return `${day(a.begin)}, ${time(a.begin)} – ${time(a.end)}`
    if (hours <= 24) return `${day(a.begin)}, ${time(a.begin)} – ${time(a.end)} (+1)`
    return `${day(a.begin)}, ${time(a.begin)} → ${day(a.end)}, ${time(a.end)}`
}
const cost = (a: Activity) => (Number(a.price) > 0 ? moneyFmt.format(Number(a.price)) : 'Free')
const signup = (a: Activity) => {
    if (!a.enrollment) return 'Walk in'
    if (a.enrollmentFull) return 'Full'
    if (a.enrollmentEnd) return `Sign up by ${day(a.enrollmentEnd)}`
    return 'Sign up open'
}
const place = (a: Activity) => a.location || 'Location to be announced'
/** Decided: the promo is written to be a teaser, so it wins; description is the fallback. */
const teaserOf = (a: Activity) => a.promo || a.teaser
const photo = (a: Activity) => {
    if (!a.icon) return '/images/placeholder/photo.jpg'
    return a.icon.startsWith('/') || a.icon.startsWith('http') ? a.icon : imageSrc(a.icon)
}
const monthFmt = new Intl.DateTimeFormat(LOCALE, { month: 'short' })
const dayNum = (iso: string) => String(new Date(iso).getDate())
const monthShort = (iso: string) => monthFmt.format(new Date(iso))
/** Locked: one line, no labels, start time only. */
const lineWhen = (a: Activity) => `${day(a.begin)}, ${time(a.begin)}`

/** Hover options: one signal each, on top of the card that ships today. */
const options = [
    {
        n: 0,
        name: 'Today',
        note: 'Type-coloured border, a coloured glow, and an underline — three signals at once.',
    },
    { n: 1, name: 'Underline only', note: 'The frame and the shadow go away. Only the title answers.' },
    {
        n: 2,
        name: 'Ink border + underline',
        note: 'The frame goes to ink (theme text colour), the text underlines.',
    },
    { n: 3, name: 'Ink border only', note: 'The frame answers, the title stays still.' },
    {
        n: 4,
        name: 'Sliding bar',
        note: 'The site-wide .link bar: a 2px rule grows under the title from the left.',
    },
    {
        n: 5,
        name: 'Surface tint',
        note: 'The paper darkens one step and the title underlines.',
    },
    { n: 6, name: 'Nothing but the pointer', note: 'No visual change at all. The honest minimum.' },
    {
        n: 7,
        name: 'Sliding bar + ink frame',
        note: 'The frame goes to ink, and the 2px rule grows under the title from the left.',
    },
]

</script>
<template>
    <div class="pad">
        <div class="shell intro">
            <h1>Activity card · the hover effect, made quiet</h1>
            <p>
                What ships today does <b>three</b> things at once: the border turns the activity
                type's colour, a coloured shadow glows underneath, and the title underlines. The
                colour is decoration — it tells you nothing you cannot already read in the type
                word — and a tinted glow is the loudest of the usual tells. Each option below
                keeps <b>one</b> of those signals or replaces it — except the last, which pairs two of them. Same three activities, same
                421×131 card. <b>The middle card of every row is the one being hovered.</b>
            </p>
        </div>

        <section v-for="opt in options" :key="opt.n" class="opt">
            <div class="opt-head">
                <span class="opt-badge">{{ opt.n }}</span>
                <span class="opt-name">{{ opt.name }}</span>
                <span class="opt-note">{{ opt.note }}</span>
            </div>

            <div class="grid3">
                <a
                    v-for="a in row1"
                    :key="a.id"
                    href="#"
                    class="hc"
                    :class="`hv-${opt.n}`"
                    :style="{ '--type': `#${a.color}` }"
                    @click.prevent
                >
                    <div class="hc-photo">
                        <img :src="photo(a)" alt="" />
                    </div>
                    <div class="hc-body">
                        <span class="hc-title">{{ a.summary }}</span>
                        <span class="hc-facts">
                            <span class="hc-where">{{ lineWhen(a) }} · {{ place(a) }}</span>
                            <span class="hc-dot" aria-hidden="true">·</span>
                            <span class="hc-type" :style="{ '--type': `#${a.color}` }">{{
                                a.label
                            }}</span>
                        </span>
                        <span class="hc-teaser">{{ teaserOf(a) }}</span>
                    </div>
                </a>
            </div>
        </section>
    </div>
</template>

<style scoped>
.pad {
    padding-block: 2.4rem 6rem;
    color: var(--p-text-color);
}

.shell {
    max-width: var(--content-max-width);
    margin-inline: auto;
    padding-inline: 2.5rem;
}

.intro h1 {
    font-size: var(--text-page-title);
    font-weight: 800;
    margin-bottom: 0.9rem;
}

.intro p {
    max-width: 92ch;
    font-size: 1.45rem;
    line-height: 1.55;
    color: var(--p-text-muted-color);
}

.intro b {
    color: var(--p-text-color);
}

.opt {
    max-width: var(--content-max-width);
    margin: 2.6rem auto 0;
    padding: 2rem 2.5rem 2.2rem;
    border-top: 2px solid var(--p-text-color);
}

.opt:nth-of-type(even) {
    background: var(--p-page-highlight, #f0f2f8);
}

.opt-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.4rem;
}

.opt-badge {
    flex: 0 0 auto;
    background: var(--p-text-color);
    color: var(--p-page-tile, #fff);
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
}

.opt-name {
    font-size: var(--text-section);
    font-weight: 800;
}

.opt-note {
    font-size: 1.35rem;
    color: var(--p-text-muted-color);
}

.grid3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.7rem;
}

/* ---------- the card, exactly as it ships ---------- */

.hc {
    display: flex;
    flex-direction: row-reverse;
    min-height: 13.6rem;
    background: var(--p-page-tile, #fff);
    border: 1px solid #c3cad8;
    border-radius: 4px;
    overflow: hidden;
    color: var(--p-text-color);
    text-decoration: none;
    cursor: pointer;
    transition:
        border-color 160ms ease,
        background-color 160ms ease;
}

.hc-photo {
    position: relative;
    flex: 0 0 33%;
    align-self: stretch;
    background: var(--p-page-highlight, #f0f2f8);
}

.hc-photo img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hc-body {
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
}

.hc-title {
    font-size: var(--text-card-title);
    font-weight: 700;
    line-height: 1.25;
}

.hc-facts {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    overflow: hidden;
    font-size: 1.2rem;
    line-height: 1.35;
    color: var(--p-text-muted-color, #475569);
}

.hc-where {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}

.hc-dot {
    flex: 0 0 auto;
    opacity: 0.6;
}

.hc-type {
    flex: 0 0 auto;
    font-weight: 600;
    color: color-mix(in srgb, var(--type) 45%, var(--p-text-color));
}

.hc-teaser {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 3.64rem;
    font-size: 1.3rem;
    line-height: 1.4;
    color: var(--p-text-muted-color, #55607a);
}

/* ---------- 0 · what ships now: colour, glow and underline ---------- */

.hv-0:hover {
    border-color: color-mix(in srgb, var(--type) 45%, #cbd5e1);
    box-shadow: 0 4px 12px -6px color-mix(in srgb, var(--type) 45%, transparent);
}

.hv-0:hover .hc-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ---------- 1 · the title underlines, nothing else moves ---------- */

.hv-1:hover .hc-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ---------- 2 · the frame goes to ink, and the title underlines ---------- */

.hv-2:hover {
    border-color: var(--p-text-color);
}

.hv-2:hover .hc-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ---------- 3 · the frame goes to ink, nothing else ---------- */

.hv-3:hover {
    border-color: var(--p-text-color);
}

/* ---------- 4 · the site-wide sliding bar under the title ---------- */

.hv-4 .hc-title {
    position: relative;
    display: inline-block;
    width: fit-content;
    padding-bottom: 0.2rem;
}

.hv-4 .hc-title::after {
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

.hv-4:hover .hc-title::after {
    transform: scaleX(1);
}

/* ---------- 5 · the paper darkens one step ---------- */

.hv-5:hover {
    background: var(--p-page-highlight, #f0f2f8);
}

.hv-5:hover .hc-title {
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ---------- 7 · sliding bar plus the ink frame ---------- */

.hv-7:hover {
    border-color: var(--p-text-color);
}

.hv-7 .hc-title {
    position: relative;
    display: inline-block;
    width: fit-content;
    padding-bottom: 0.2rem;
}

.hv-7 .hc-title::after {
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

.hv-7:hover .hc-title::after {
    transform: scaleX(1);
}

/* ---------- 6 · nothing but the pointer ---------- */

.hv-6:hover {
    border-color: #c3cad8;
}

@media (max-width: 60rem) {
    .grid3 {
        grid-template-columns: 1fr;
    }

    .opt-head {
        flex-wrap: wrap;
    }
}
</style>
