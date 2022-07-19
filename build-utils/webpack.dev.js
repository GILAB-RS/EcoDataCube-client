const commonPaths = require('./common-paths');
const webpack = require('webpack');
const port = process.env.PORT || 3030;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {execSync} = require('child_process');
const path = require('path');
const moment = require('moment');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

let git_branch = execSync('git rev-parse --abbrev-ref HEAD').toString('utf-8').trim();

let url_path =  git_branch === 'dev-test' || git_branch === 'wwd-globe-integration' ? path.resolve(commonPaths.appEntry, 'config/urls_dev.js') : path.resolve(commonPaths.appEntry, 'config/url.js');

console.log(url_path)

const config = {
  mode: 'development',
  entry: {
    app: [
       'react-hot-loader/patch', 
       `${commonPaths.appEntry}/index.js`
    ]
  },
  output: {
    filename: '[name].[hash].js?v=' + moment().format('DDMMYYYYHHmm'),
    sourcePrefix: ''
  },
  amd: {
    toUrlUndefined: true
  },
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        //RULE FOR STYLE
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [ "css-loader", "sass-loader"],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles/styles.[hash].css?v=" + moment().format('DDMMYYYYHHmm'),
      allChunks: true,
      disable: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()    
  ],
  resolve: {
    alias: {
      urls$: url_path,
    }
  },
  devServer: {
    host: '127.0.0.1',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true
  }
};

module.exports = config;
