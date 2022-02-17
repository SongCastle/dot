import path from 'path';
import { merge } from 'webpack-merge';
import base from './webpack.config.base';

const config = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
      },
    ],
  },
  target: ['web', 'es5'],
});

export default config;
