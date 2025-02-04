import { marked } from 'marked'
import { ref } from 'vue'
import { useGettext } from 'vue3-gettext'
const gettext = useGettext()

// TODO: Test if timestamp type is indeed a number
export const formattedData = (timestamp: number, lang = 'En') => {
    const date = new Date(timestamp)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is zero-based
    const year = date.getFullYear()

    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //t('Wednesday')
    const dayOfWeekIndex = date.getDay()

    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const monthIndex = date.getMonth()

    if (gettext.current === 'nl') {
        daysOfWeek = [
            'Zondag',
            'Maandag',
            'Dinsdag',
            'Woensdag',
            'Donderdag',
            'Vrijdag',
            'Zaterdag',
        ]
        months = [
            'Januari',
            'Februari',
            'Maart',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Augustus',
            'September',
            'Oktober',
            'November',
            'December',
        ]
    }

    return `${daysOfWeek[dayOfWeekIndex]} ${day} ${months[monthIndex]} ${year}`
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
    markedtext = markedtext.replace(/src="\//g, 'src="https://www.inter-actief.utwente.nl/')

    return markedtext
}

export const excerptText = (text: string) => {
    if (text === undefined) {
        return text
    }

    const words = text.split(' ')

    if (words.length > 30) {
        return words.slice(0, 30).join(' ') + '...'
    }

    return text
}

export const getItemValue = (item: object, key: any) => {
    if (!item) {
        return null
    }

    //TODO: Figure out what this is
    if (item[`${key}${gettext.current}`]) {
        return item[`${key}${gettext.current}`]
    } else if (item[`${key}`]) {
        return item[`${key}`]
    }
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
