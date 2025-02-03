import { createGettext } from 'vue3-gettext'
import translations from './language/translations.json'

export default createGettext({
    availableLanguages: {
        en: 'English',
        nl: 'Nederlands',
    },
    defaultLanguage: 'en',
    translations,
})

// To use gettext on backend:
// import gettext from '/gettext'

// const { $gettext } = gettext

// const myTest = $gettext('My translation message')
