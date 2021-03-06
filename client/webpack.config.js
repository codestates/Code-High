const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // write image files under 10k to inline or copy image files over 10k
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        // write files under 10k to inline or copy files over 10k
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
      // {
      //   test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      //   loader: 'webpack-loader-s3',
      //   options: {
      //     endpoint: 'www.codehigh.club','localhost:3000'
      //   },
      // }
    ]
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true
  }
};
