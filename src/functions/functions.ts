import { marked } from 'marked'
import { ref } from 'vue'
import gettext from '@/gettext'
import sanitizeHtml from 'sanitize-html'

/**
 * English ordinal suffix ("1st", "2nd", "3rd", "4th", ... "11th").
 * Only the English date template uses it; other languages omit the placeholder.
 */
const ordinalSuffix = (day: number) => {
    if (day % 100 >= 11 && day % 100 <= 13) {
        return 'th'
    }

    switch (day % 10) {
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
    }
}

const dateLocales: Record<string, string> = {
    en: 'en-GB',
    nl: 'nl-NL',
}

const nameFormatters = new Map<
    string,
    {
        weekday: Intl.DateTimeFormat
        weekdayShort: Intl.DateTimeFormat
        month: Intl.DateTimeFormat
        monthShort: Intl.DateTimeFormat
        monthYear: Intl.DateTimeFormat
        clock: Intl.DateTimeFormat
    }
>()

/**
 * Month and weekday names come from the browser's locale data, so they follow
 * the capitalisation and spelling of the active language instead of being
 * hardcoded here (English "October", Dutch "oktober").
 */
const dateFormatter = (locale: string) => {
    let formatters = nameFormatters.get(locale)

    if (!formatters) {
        formatters = {
            weekday: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
            weekdayShort: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
            month: new Intl.DateTimeFormat(locale, { month: 'long' }),
            monthShort: new Intl.DateTimeFormat(locale, { month: 'short' }),
            monthYear: new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }),
            clock: new Intl.DateTimeFormat(locale, {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
            }),
        }
        nameFormatters.set(locale, formatters)
    }

    return formatters
}

// TODO: Test if timestamp type is indeed a number
export const formattedData = (timestamp: number) => {
    const date = new Date(timestamp)
    const formatters = dateFormatter(dateLocales[gettext.current] ?? dateLocales.en)
    const day = date.getDate()

    // The order of the parts (and the English ordinal suffix) is part of the
    // translation, see the msgid in src/language/nl.po.
    return gettext.$gettext('%{weekday} %{month} %{day}%{ordinal} %{year}', {
        weekday: formatters.weekday.format(date),
        month: formatters.month.format(date),
        day: String(day),
        ordinal: ordinalSuffix(day),
        year: String(date.getFullYear()),
    })
}

/**
 * Date split into the two parts a compact card shows separately: the day on its
 * own for large type, and "Oct 2026" / "okt 2026" beside it. Names come from
 * the browser locale data, so this follows the active language.
 */
export const formattedDateBlock = (timestamp: number | string) => {
    const date = new Date(timestamp)
    const formatters = dateFormatter(dateLocales[gettext.current] ?? dateLocales.en)

    return {
        day: String(date.getDate()),
        monthYear: formatters.monthYear.format(date),
    }
}

/**
 * "Mon 30 Nov" — the compact day and month a card's facts row starts with.
 * Built from parts rather than one pattern so no locale adds a comma.
 */
export const formattedDayMonth = (timestamp: number | string) => {
    const date = new Date(timestamp)
    const formatters = dateFormatter(dateLocales[gettext.current] ?? dateLocales.en)

    return `${formatters.weekdayShort.format(date)} ${date.getDate()} ${formatters.monthShort.format(date)}`
}

/** "15:45" in the reader's own time zone; the API sends UTC. */
export const formattedClock = (timestamp: number | string) => {
    const formatters = dateFormatter(dateLocales[gettext.current] ?? dateLocales.en)

    return formatters.clock.format(new Date(timestamp))
}

/**
 * The one-line facts row on an activity card: when it starts and where it is.
 * No labels and no end time — the detail page owns those.
 */
export const activityFacts = (begin: number | string, location?: string | null) => {
    const when = `${formattedDayMonth(begin)}, ${formattedClock(begin)}`
    // The venue is the useful half of a location; "7521 PT Enschede" is not.
    const place = location?.split(',')[0]?.trim()

    return place ? `${when} · ${place}` : when
}

export const formattedDataShort = (timestamp: number) => {
    const date = new Date(timestamp)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-based

    return `${day}-${month}`
}

export const formattedTime = (timestamp: number) => {
    const date = new Date(timestamp)

    // Get the hours and minutes
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')

    // Return the formatted time as 'HH:mm'
    return `${hours}:${minutes}`
}

//TODO: Make other functions await this function
export const markedText = async (text: string) => {
    if (text === undefined) {
        return text
    }
    let markedtext: string = await marked(text)

    // Custom sanitisation options to allow img
    let sanitized = sanitizeHtml(markedtext, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
        },
    })
    sanitized = sanitized.replace(/src="\//g, `src="${import.meta.env.VITE_AMELIE_BASE_URL}`)

    return sanitized
}

export const excerptText = (text: string) => {
    if (text === undefined || text == '') {
        return text
    }

    const words = text.split(' ')

    if (words.length > 30) {
        return words.slice(0, 30).join(' ') + '...'
    }

    return text
}

export const isDesktop = ref(window.innerWidth >= 980)
export const isTablet = ref(window.innerWidth < 980 && window.innerWidth >= 640)

const updateMenu = () => {
    isDesktop.value = window.innerWidth >= 980
    isTablet.value = window.innerWidth < 980 && window.innerWidth >= 640
}

window.addEventListener('resize', updateMenu)
updateMenu() // Initial check

export const openMobileMenu = ref(false)
export const openSubMenu = ref(null) // Track which submenu is open

export const toggleMobileMenu = () => {
    openMobileMenu.value = !openMobileMenu.value
    if (!openMobileMenu.value) {
        openSubMenu.value = null
        document.body.classList.remove('freeze')
    } else {
        document.body.classList.add('freeze')
    }
}

export const closeMobileMenu = () => {
    openMobileMenu.value = false
    openSubMenu.value = null
    document.body.classList.remove('freeze')
}

export const toggleSubMenu = (index: any) => {
    openSubMenu.value = openSubMenu.value === index ? null : index
}

const formindexer = ref(0)
export const getFormID = () => {
    formindexer.value++
    return formindexer.value
}

const formfieldindexer = ref(0)
export const getFormFieldID = () => {
    formfieldindexer.value++
    return formfieldindexer.value
}

export const publicationUrl = (url: string) => `${import.meta.env.VITE_AMELIE_MEDIA_URL}${url}`
