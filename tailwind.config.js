// import PrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            aspectRatio: {
                '5/3': '5 / 3', // To be removed in tailwind4 (only needed in tw3)
                '3/5': '3 / 5', // To be removed in tailwind4 (only needed in tw3)
                a4: '1 / 1.414', // To be removed in tailwind4 (only needed in tw3)
            },
        },
    },
    darkMode: ['selector', '[class~="dark"]'], // dark mode configuration
    important: true,
}
