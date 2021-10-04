import tailwindcss from 'tailwindcss';
import postcss_preset_env from 'postcss-preset-env';

import { tailwindConfig } from './tailwind.config';

interface Configuration {
  plugins: any[];
}

const config : Configuration = {
  plugins: [
    tailwindcss(tailwindConfig),
    postcss_preset_env(),
  ]
}

export = config
