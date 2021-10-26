import type { TailwindConfig } from 'tailwindcss/tailwind-config';

export const tailwindConfig: TailwindConfig = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
  },
  darkMode: false,
  theme: {
    extend: {
      minHeight: {
        'screen-4/5': '80vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
