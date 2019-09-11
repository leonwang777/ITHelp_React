const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const rootPath = path.resolve(__dirname, '.');
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');

const cleanWebpackConfig = {
  options: {
    root: rootPath,
    verbose: true,
    dry: false,
  },
  folderToClean: ['dist'],
};

module.exports = {
  entry: {
    app: [
      // 'react-hot-loader/patch',
      '@babel/polyfill',
      path.resolve('./src/app/index.js'),
    ],
  },
  output: {
    path: distPath,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(srcPath)],
        query: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'video/[name]-[hash:8].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|bmp|stl)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name]-[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              limit: 8192,
              name: 'images/[name]-[hash:8].[ext]',
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { floatPrecision: 5 },
                  { moveGroupAttrsToElems: false },
                  { cleanupIDs: false },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.scss', '.sass', '.css'],
  },

  plugins: [
    new CleanWebpackPlugin(
      cleanWebpackConfig.folderToClean,
      cleanWebpackConfig.options
    ),
    new HtmlWebpackPlugin({
      title: 'AML',
      template: path.resolve(srcPath, 'template.html'),
      favicon: path.resolve(srcPath, 'logo.ico'),
      hash: true,
      inject: true,
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  target: 'web', // Make web variables accessible to webpack, e.g. window

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
