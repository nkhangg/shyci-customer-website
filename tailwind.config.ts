import type { Config } from 'tailwindcss';

const HEIGHT_HEADER = '48px';
const HEIGHT_FOOTER = '48px';

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/layouts/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],

    theme: {
        extend: {
            height: {
                header: HEIGHT_HEADER,
                'footer-fixed': HEIGHT_FOOTER,
                'conlection-home': `calc(-${HEIGHT_HEADER} + 100vh)`,
            },
            padding: {
                header: HEIGHT_HEADER,
                primary: '11px',
            },
            spacing: {
                header: HEIGHT_HEADER,
            },
            colors: {
                primary: '#000',
                'primary-light': '#fff',
            },
            backgroundColor: {
                primary: '#fff',
                'primary-dark': '#000',
            },
        },
    },
    plugins: [],
};
export default config;
