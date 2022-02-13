import type { TailwindConfig } from 'tailwindcss/tailwind-config';

export const tailwindConfig: TailwindConfig = {
  content: ['./src/**/*.tsx'],
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
