import type { TailwindConfig } from 'tailwindcss/tailwind-config';

export const tailwindConfig : TailwindConfig = {
  ...require('tailwindcss/defaultConfig'),
  purge: [],
  presets: null,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        'screen-4/5': '80vh'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
