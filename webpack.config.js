const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const PolyfillInjectorPlugin = require('webpack-polyfill-injector');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: {
      app: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
      ]
    },
    optimization: {
      minimize: process.env.NODE_ENV === 'production' ? true : false,
      minimizer: process.env.NODE_ENV === 'production' ? [new TerserPlugin()] : [],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        /*cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {

              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];


              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },*/
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      })
      //new BundleAnalyzerPlugin()
    ]
  }
}
