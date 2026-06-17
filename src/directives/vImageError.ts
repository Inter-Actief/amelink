import type { Directive } from 'vue'

interface ImageErrorOptions {
    placeholder?: string
}

const defaultPlaceholder = '/images/placeholder/photo.jpg'

/**
 * Image error directive that replaces broken images with a fallback placeholder
 *
 * Usage examples:
 * - Default placeholder: v-image-error (uses /images/placeholder/photo.jpg)
 * - Custom placeholder (string): v-image-error="'/images/placeholder/avatar.svg'"
 * - Custom placeholder (object): v-image-error="{ placeholder: '/custom/fallback.png' }"
 *
 * @example
 * <!-- Uses default placeholder -->
 * <img v-image-error :src="imageUrl" />
 *
 * @example
 * <!-- Uses custom placeholder as string -->
 * <img v-image-error="'/images/placeholder/book.svg'" :src="imageUrl" />
 *
 * @example
 * <!-- Uses custom placeholder as object -->
 * <img v-image-error="{ placeholder: '/custom/image.jpg' }" :src="imageUrl" />
 */
export const vImageError: Directive<HTMLImageElement, ImageErrorOptions | string> = {
    mounted(el, binding) {
        const placeholder =
            typeof binding.value === 'string'
                ? binding.value
                : binding.value?.placeholder || defaultPlaceholder

        const handleError = () => {
            if (el.src !== placeholder) {
                el.src = placeholder
            }
        }

        // Store the handler on the element so we can remove it later
        ;(el as any).__imageErrorHandler = handleError
        el.addEventListener('error', handleError)
    },

    unmounted(el) {
        const handler = (el as any).__imageErrorHandler
        if (handler) {
            el.removeEventListener('error', handler)
            delete (el as any).__imageErrorHandler
        }
    },
}
