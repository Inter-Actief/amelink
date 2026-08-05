import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type ThemeOption = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

const themes: ThemeOption[] = ['dark', 'system', 'light']

const getSystemTheme = (): EffectiveTheme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyTheme = (theme: ThemeOption) => {
    const effectiveTheme: EffectiveTheme = theme === 'system' ? getSystemTheme() : theme

    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark')
    document.documentElement.classList.toggle('light', effectiveTheme === 'light')
}

export const useThemeStore = defineStore('themeStore', () => {
    const theme = ref<ThemeOption>('system')

    watch(theme, (value) => {
        localStorage.setItem('theme', value)
        applyTheme(value)
    })

    const initialiseTheme = () => {
        const storedTheme = localStorage.getItem('theme')
        theme.value = themes.includes(storedTheme as ThemeOption) ? (storedTheme as ThemeOption) : 'system'
        // localStorage.setItem('theme', theme.value)
        // applyTheme(theme.value)

        type MediaQueryListWithDeprecatedListener = MediaQueryList & {
            addListener(listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void): void
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleSystemChange = () => {
            if (theme.value === 'system') {
                applyTheme('system')
            }
        }

        if ('addEventListener' in mediaQuery) {
            mediaQuery.addEventListener('change', handleSystemChange)
        } else if ('addListener' in mediaQuery) {
            const legacyMediaQuery = mediaQuery as MediaQueryListWithDeprecatedListener
            legacyMediaQuery.addListener(handleSystemChange)
        }
    }

    const switchTheme = () => {
        const nextIndex = (themes.indexOf(theme.value) + 1) % themes.length
        theme.value = themes[nextIndex]
    }

    return { theme, switchTheme, initialiseTheme }
})
