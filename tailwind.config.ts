import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './Container/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                blue: {
                    DEFAULT: "#2A59FE",
                    50: "#EAF2FF",
                    100: "#D5E4FF",
                    200: "#A6C6FF",
                    300: "#78A7FF",
                    400: "#4A89FF",
                    500: "#2A59FE",
                    600: "#2046CB",
                    700: "#183399",
                    800: "#102066",
                    900: "#081033",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
