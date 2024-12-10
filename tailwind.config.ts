import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif'],
        futura: ['FuturaLT', 'sans-serif'],
      },
      colors: {
        'custom-yellow': '#F3C937',
        'custom-lighter-yellow': '#FBE8A5',
        'custom-gray': '#C1B7A3',
        'custom-lighter-gray': '#EEE9DF',
        'custom-black': '#29241F',
      },
      screens: {
        xs: '347px',
        customLg: '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
