import type { ToastServiceMethods } from 'primevue/toastservice'

let toast: ToastServiceMethods | null = null

export function registerToast(service: ToastServiceMethods) {
    toast = service
}

export function showError(message: string) {
    toast?.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 5000,
    })
}