import { createGettext } from 'vue3-gettext'
import translations from './language/translations.json'

export default createGettext({
    availableLanguages: {
        en: 'English',
        nl: 'Nederlands',
    },
    defaultLanguage: 'en', // Make sure this is the same as the default language in the backend
    translations,
})
