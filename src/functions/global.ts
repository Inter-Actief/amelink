export const globalFunc = {
    capitalize: (data: string) => {
        return data.charAt(0).toUpperCase() + data.slice(1)
    },
}

export function addGlobalPrototypeMethods() {
    Object.defineProperty(String.prototype, 'capitalize', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1)
        },
        enumerable: false,
    })
}
