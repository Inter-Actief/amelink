export const imageSrc = (src: string | null | undefined, usePlaceholder: boolean = false) => {
    if (src == null) {
        return undefined
    }
    if (!src) {
        return usePlaceholder ? '/src/assets/images/placeholder.jpg' : src
    }

    return `${import.meta.env.VITE_AMELIE_MEDIA_URL}${src}`
}

