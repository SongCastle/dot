import { merge } from 'webpack-merge';
import base from './webpack.config.base';

const config = merge(base, {
  mode: 'production',
  target: ['web', 'es5'],
});

export default config;
