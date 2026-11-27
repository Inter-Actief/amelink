import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'reduced-motion'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const systemPrefersReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches

export const useReducedMotionStore = defineStore('reducedMotionStore', () => {
    /**
     * The visitor's own choice, remembered across visits. It is ignored while
     * the system asks for reduced motion, so a stored "false" can never turn
     * motion back on against the operating system's setting.
     */
    const preferredReducedMotion = ref(localStorage.getItem(STORAGE_KEY) === 'true')

    const systemReducedMotion = ref(systemPrefersReducedMotion())

    /** The setting that actually applies: the system always wins. */
    const reducedMotion = computed(() => systemReducedMotion.value || preferredReducedMotion.value)

    /** True while the system asks for reduced motion, so the toggle is locked. */
    const locked = computed(() => systemReducedMotion.value)

    const applyReducedMotion = (value: boolean) => {
        document.documentElement.classList.toggle('reduce-motion', value)
    }

    watch(reducedMotion, applyReducedMotion, { immediate: true })

    watch(preferredReducedMotion, (value) => {
        localStorage.setItem(STORAGE_KEY, String(value))
    })

    const toggleReducedMotion = () => {
        if (locked.value) return
        preferredReducedMotion.value = !preferredReducedMotion.value
    }

    const initialiseReducedMotion = () => {
        const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
        mediaQuery.addEventListener('change', (event) => {
            systemReducedMotion.value = event.matches
        })
    }

    return {
        reducedMotion,
        preferredReducedMotion,
        systemReducedMotion,
        locked,
        toggleReducedMotion,
        initialiseReducedMotion,
    }
})
