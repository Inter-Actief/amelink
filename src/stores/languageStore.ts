import { defineStore } from 'pinia'
import { ref } from 'vue'
import gettext from '@/gettext'
import { useQueryStore } from '@/stores/queryStore'
import { provideApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/main' // Ensure this is exported from main.ts

export const useLanguageStore = defineStore('languageStore', () => {
    const queryStore = useQueryStore()
    const currentLanguage = ref(gettext.current)
    const availableLanguages = Object.keys(gettext.available)

    async function loadLanguage() {
        const defaultLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE || 'en'

        // Initialize current language from localStorage or fallback to default
        const storedLocale = localStorage.getItem('locale')

        currentLanguage.value =
            storedLocale && availableLanguages.includes(storedLocale)
                ? storedLocale
                : defaultLanguage

        // Set the current language in gettext
        gettext.current = currentLanguage.value

        // Set language to apollo
        await setLanguage(currentLanguage.value)
    }

    // Private
    async function setLanguage(lang: string) {
        // Provide Apollo Client context
        provideApolloClient(apolloClient)

        const { mutate, loading, onDone } = queryStore.setLanguageMutation({
            // refetchQueries: 'active',
        })

        onDone(async (returned) => {
            //TODO: This type does not correspond to the actual type of the returned data
            // @ts-ignore
            if (!returned.data?.setLanguage.result) {
                console.error('Error setting language')
                return
            }

            localStorage.setItem('locale', lang)

            // Set language in store
            gettext.current = lang
            currentLanguage.value = lang

            await apolloClient.refetchQueries({
                include: 'active',
            })
        })

        await mutate({
            languageCode: lang,
        })
    }

    async function switchLanguage(lang?: string) {
        if (gettext.current == lang) {
            return
        }

        if (lang && Object.keys(gettext.available).includes(lang.toLowerCase())) {
            setLanguage(lang)
        } else {
            let currentIndex = availableLanguages.indexOf(gettext.current.toLowerCase())

            // Go to next iterator in language available keys
            const nextIndex = (currentIndex + 1) % availableLanguages.length
            setLanguage(availableLanguages[nextIndex])
        }
    }

    return { currentLanguage, switchLanguage, loadLanguage, availableLanguages }
})
