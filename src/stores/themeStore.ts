import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type ThemeType = 'light' | 'dark'

export const useThemeStore = defineStore('themeStore', () => {
    const initialiseTheme = () => {
        let storedTheme = localStorage.getItem('theme') ?? 'light'

        const isValidTheme = (value: string): value is ThemeType =>
            value === 'light' || value === 'dark'

        theme.value = isValidTheme(storedTheme) ? storedTheme : 'light'

        // Update document root
        document.documentElement.className = theme.value
    }

    const theme = ref<ThemeType>('light')

    const switchTheme = () => {
        theme.value = theme.value == 'light' ? 'dark' : 'light'

        // Update document root
        document.documentElement.className = theme.value

        // Update localstorage
        localStorage.setItem('theme', theme.value)
    }

    return { theme, switchTheme, initialiseTheme }
})
