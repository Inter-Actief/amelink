import { defineStore } from 'pinia'
import { ref } from 'vue'
import gettext from '@/gettext'
import { useQueryStore } from '@/stores/queryStore'
import type { SetLanguageMutationMutation } from '@/gql/graphql'

export const useLanguageStore = defineStore('languageStore', () => {
    const currentLanguage = ref(gettext.current)
    const availableLanguages = Object.keys(gettext.available)
    const queryStore = useQueryStore()

    // Private
    async function setLanguage(lang: string) {
        // Communicate to IA website
        let url = import.meta.env.VITE_AMELIE_API

        const { mutate, loading, onDone } = queryStore.setLanguageMutation({
            languageCode: lang,
        })

        onDone((returned) => {
            if (!returned.data?.result) {
                console.error('Error setting language')
                return
            }

            alert('Language changed to ' + lang)

            localStorage.setItem('locale', lang)
            // Set language in store
            currentLanguage.value = lang
        })

        mutate()
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
