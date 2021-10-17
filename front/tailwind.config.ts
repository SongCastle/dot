import type { TailwindConfig } from 'tailwindcss/tailwind-config';

export const tailwindConfig: TailwindConfig = {
  ...require('tailwindcss/defaultConfig'),
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx']
  },
  presets: null,
  darkMode: false,
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
