import path from 'path';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import base from './webpack.config.base';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = merge(base, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.dev.json',
          },
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  target: 'web',
});

export default config;
