import { UserManager, type User, type UserManagerSettings } from "oidc-client-ts";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useOidcStore = defineStore('oidcStore', () => {
    // Initialize UserManager with PKCE
    const config: UserManagerSettings = {
        client_id: import.meta.env.VITE_OIDC_CLIENT,
        authority: import.meta.env.VITE_OIDC_URL,
        redirect_uri: `${import.meta.env.VITE_BASE_URL}/auth/win`,
        response_type: 'code',
        scope: 'openid profile email',
        loadUserInfo: true,
    }
    
    const userManager = new UserManager(config)
    
    // State
    const user = ref<User | null>(null)
    const isLoading = ref(true)
    const error = ref<Error | null>(null)
    
    // Computed
    const isAuthenticated = computed(() => user.value !== null && !user.value.expired)
    const accessToken = computed(() => user.value?.access_token)
    const profile = computed(() => user.value?.profile)
    
    // Actions
    async function initializeAuth() {
        try {
            isLoading.value = true
            user.value = await userManager.getUser()
            
            // Set up event listeners
            userManager.events.addUserLoaded((loadedUser) => {
                user.value = loadedUser
            })
            
            userManager.events.addUserUnloaded(() => {
                user.value = null
            })
            
            userManager.events.addAccessTokenExpired(() => {
                user.value = null
            })
        } catch (err) {
            error.value = err as Error
            console.error('Failed to initialize auth:', err)
        } finally {
            isLoading.value = false
        }
    }
    
    function login() {
        return userManager.signinRedirect()
    }
    
    function logout() {
        return userManager.signoutRedirect()
    }
    
    async function handleCallback() {
        try {
            user.value = await userManager.signinRedirectCallback()

            console.log("Handled callback!")
            alert("Handled callback")
        } catch (err) {
            error.value = err as Error
            console.error('Failed to handle auth callback:', err)
            throw err
        }
    }
    
    async function renewToken() {
        try {
            user.value = await userManager.signinSilent()
        } catch (err) {
            error.value = err as Error
            console.error('Failed to renew token:', err)
            throw err
        }
    }

    return {
        // State
        user,
        isLoading,
        error,
        // Computed
        isAuthenticated,
        accessToken,
        profile,
        // Actions
        initializeAuth,
        login,
        logout,
        handleCallback,
        renewToken,
        // Expose userManager if needed for advanced usage
        userManager
    }
})