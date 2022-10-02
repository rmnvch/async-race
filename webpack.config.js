const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      },
    ),
    new EslingPlugin({ extensions: 'ts' }),
    new CleanWebpackPlugin(),
  ],

};
