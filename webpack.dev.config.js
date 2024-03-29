"use strict";

const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require("./webpack.common.config.js");

module.exports = merge(commonConfig, {
    // devServer: {
    //     hot: true
    // },
    devServer: {
        port: 3000,
        historyApiFallback: true, // enable index.html to serve 404 response page in html5 history APi, refer https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
        hot: true,
        compress: true
    },
    devtool: "inline-source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
                // options: {
                //   presets: ['@babel/preset-react', '@babel/preset-env']
                // }
            }
        ]
    },
    resolve: {
        alias: { "react-dom": "@hot-loader/react-dom" }
    }

    // plugins: [
    // Not needed in development
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
    // new webpack.ProgressPlugin(),
    // new Dotenv({
    //   path: path.resolve(__dirname, './dotenv/dev.env'),
    // }),
    // ]
});
