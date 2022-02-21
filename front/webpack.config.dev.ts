import path from 'path';
import { merge } from 'webpack-merge';
import base from './webpack.config.base';

const staticPath = path.resolve(__dirname, 'static');

const config = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: staticPath,
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
