import { createGettext } from 'vue3-gettext'
import translations from './language/translations.json'

export default createGettext({
    availableLanguages: {
        en: 'English',
        nl: 'Nederlands',
    },
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en', // Use the environment variable
    translations,
})
