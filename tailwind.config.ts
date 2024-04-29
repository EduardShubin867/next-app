import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './node_modules/flowbite-react/lib/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        fontFamily: {
            display: ['Roboto'],
            body: ['Roboto'],
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('contentEditable', '&[contentEditable]');
        }),
        require('flowbite/plugin'),
    ],
};
export default config;
