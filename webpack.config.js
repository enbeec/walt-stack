const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = [__dirname, 'src'];
const dist = [__dirname, 'dist'];

module.exports = {
  mode: 'production',
  entry: path.resolve(...src, 'index.js'),
  output: {
    path: path.resolve(...dist),
    filename: 'walt.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.css'],
    alias: {},
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '[walt]',
      // uses lodash syntax
      template: path.resolve(...src, 'index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      }
    ],
  },
};