import PrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {},
    },
    plugins: [PrimeUI],
    darkMode: ['selector', '[class~="dark"]'], // dark mode configuration
}
