import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import postcssconfig from './postcss.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const srcPath = path.resolve(__dirname, 'src')
const destPath = path.resolve(__dirname, 'dist')

const config : Configuration = {
  context: srcPath,
  entry: './index.tsx',
  output: {
    path: destPath,
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: srcPath,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: postcssconfig,
            }
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BACK_HOST': JSON.stringify(process.env.BACK_HOST)
    })
  ]
};

export default config;
