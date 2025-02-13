import { defineStore } from 'pinia'
import { ref } from 'vue'
import gettext from '@/gettext'
import { useAuthStore } from '@/stores/authStore'

export const useLanguageStore = defineStore('languageStore', () => {
    const accountStore = useAuthStore()
    const currentLanguage = ref(gettext.current)
    const availableLanguages = Object.keys(gettext.available)

    // Private
    async function setLanguage(lang: string) {
        // Communicate to IA website
        let url = import.meta.env.VITE_AMELIE_API

        fetch(`${url}i18n/setlang/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors',
            credentials: 'include',
            body: new URLSearchParams({
                language: lang,
                csrfmiddlewaretoken: (await accountStore.getCSRFToken()).value,
            }),
            redirect: 'manual',
        }).then((returned) => {
            console.log(returned)
            localStorage.setItem('locale', lang)
            // Set language in store
            currentLanguage.value = lang
        })
    }

    async function switchLanguage(lang?: string) {
        if (currentLanguage.value == lang) {
            return
        }

        if (lang && Object.keys(gettext.available).includes(lang.toLowerCase())) {
            setLanguage(lang)
        } else {
            let currentIndex = availableLanguages.indexOf(currentLanguage.value.toLowerCase())

            // Go to next iterator in language available keys
            const nextIndex = (currentIndex + 1) % availableLanguages.length
            setLanguage(availableLanguages[nextIndex])
        }
    }

    return { currentLanguage, switchLanguage }
})
