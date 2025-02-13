import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
    const CSRFToken = ref('')

    async function getCSRFToken() {
        if (CSRFToken.value) {
            return CSRFToken.value
        }

        await setCSRFToken()
        return CSRFToken.value
    }

    async function setCSRFToken() {
        console.log('Setting CSRF token')

        let response = await fetch(`${import.meta.env.VITE_AMELIE_API}api/csrf-token/`, {
            method: 'GET',
            credentials: 'include', // Ensures cookies are sent/received.
        })

        if (!response.ok) {
            console.error('Failed to fetch CSRF token:', response.statusText)
            return
        }

        // Extract CSRF token from response headers
        const csrfHeader = response.headers.get('X-CSRFToken')
        if (csrfHeader) {
            CSRFToken.value = csrfHeader
            console.log('CSRF token set:', CSRFToken.value)
        } else {
            console.warn('No CSRF token found in response headers')
        }
    }

    return { getCSRFToken, setCSRFToken }
})
