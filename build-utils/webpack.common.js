const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const config = {
  // entry: ['babel-polyfill'],
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=2&name=[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }, {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      cesium$: path.resolve(__dirname, cesiumSource)
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: 'public/index.html' , 
      favicon: 'public/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
      } 
    }),
    new CopyWebpackPlugin({
      patterns: [
      {from: 'assets/', to: 'assets/'},
      {from: path.join(cesiumSource, cesiumWorkers), to: 'assets/Workers'},
      {from: path.join(cesiumSource, 'Assets'), to: 'assets/Assets'},
      {from: path.join(cesiumSource, 'Widgets'), to: 'assets/Widgets'},   
     ]}),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('assets')
    }),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'async'}),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    })
  ]
};
module.exports = config;