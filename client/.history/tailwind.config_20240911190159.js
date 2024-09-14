/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    important: true,
    theme: {
        extend: {
            colors: {
                purple: '#43193F',
            },
        },
    },
    plugins: [],
};
