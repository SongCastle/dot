import tailwindcss from 'tailwindcss';
import postcssPresetEnv from 'postcss-preset-env';

import { tailwindConfig } from './tailwind.config';

interface Configuration {
  plugins: any[];
}

const config : Configuration = {
  plugins: [
    tailwindcss(tailwindConfig),
    postcssPresetEnv(),
  ]
}

export = config
