import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type ThemeOption = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

const themes: ThemeOption[] = ['dark', 'system', 'light']

const getSystemTheme = (): EffectiveTheme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const useThemeStore = defineStore('themeStore', () => {
    const theme = ref<ThemeOption>('system')
    const effectiveTheme = ref<EffectiveTheme>(getSystemTheme())

    const applyTheme = (value: ThemeOption) => {
        effectiveTheme.value = value === 'system' ? getSystemTheme() : value
        document.documentElement.classList.toggle('dark', effectiveTheme.value === 'dark')
        document.documentElement.classList.toggle('light', effectiveTheme.value === 'light')
    }

    watch(
        theme,
        (value) => {
            localStorage.setItem('theme', value)
            applyTheme(value)
        },
        { immediate: true }
    )

    const initialiseTheme = () => {
        const storedTheme = localStorage.getItem('theme')
        theme.value = themes.includes(storedTheme as ThemeOption) ? (storedTheme as ThemeOption) : 'system'

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

    return { theme, effectiveTheme, switchTheme, initialiseTheme }
})
