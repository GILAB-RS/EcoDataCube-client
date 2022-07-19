const commonPaths = require('./common-paths');
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const moment = require('moment');
const TerserPlugin = require('terser-webpack-plugin');
const {execSync} = require('child_process');

let git_branch = execSync('git rev-parse --abbrev-ref HEAD').toString('utf-8').trim();

let url_path =  git_branch === 'dev-test' || git_branch === 'wwd-globe-integration' ? path.resolve(commonPaths.appEntry, 'config/urls_dev.js') : path.resolve(commonPaths.appEntry, 'config/url.js');

console.log(url_path)


const config = {
  mode: 'production',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },
  output: {
    filename: '[name].[hash].js?v=' + moment().format('MMDDYYYYHHmm')
  },
  node : {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  devtool: 'none',
  module: {
    rules: [{
      //RULE FOR STYLE
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              ctx: {
                autoprefixer: {
                  browser: 'last 2 versions'
                }
              }
            }
          }
        }, "sass-loader"],
        // use style-loader in development
        fallback: "style-loader"
      })
    }]
  },
  resolve: {
    alias: {
      urls$: url_path
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          }
        }
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.[hash].css?v=" + moment().format('MMDDYYYYHHmm'),
      allChunks: true
    }),
    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          },
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true
        }],
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
      {from: 'assets/', to: 'assets/'},
    ]}),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      // test: /\.(js|css)$/,
      minRatio: 50
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    })
  ]
};
module.exports = config;