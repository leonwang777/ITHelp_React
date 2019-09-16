require("@babel/polyfill");

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const rootPath = path.resolve(__dirname);
const srcPath = path.resolve(rootPath, "src");
const distPath = path.resolve(rootPath, "dist");
const APP_PATH = path.resolve(srcPath, "App");

console.log("srcpath: " + srcPath);
console.log("distPath: " + distPath);

const cleanWebpackConfig = {
    options: {
        root: rootPath,
        verbose: true,
        dry: false
    },
    folderToClean: ["dist"]
};

module.exports = {
    //context: path.resolve(__dirname, "src/app"),
    entry: path.resolve(srcPath, "./app/index.js"),
    // entry: {
    //     app: ["@babel/polyfill", "./src/app"]
    // },
    output: {
        path: distPath,
        filename: "[name].js",
        chunkFilename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                include: srcPath,
                loader: "eslint-loader",
                enforce: "pre",
                query: {
                    emitWarning: true
                }
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: srcPath,
                options: {
                    presets: [
                        "@babel/preset-react",
                        "@babel/preset-env",
                        "@babel/preset-typescript"
                    ]
                }
            }
            // {
            //     test: /\.(mov|mp4)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: 8192,
            //                 name: "video/[name]-[hash:8].[ext]"
            //             }
            //         }
            //     ]
            // },

            // {
            //     test: /\.(jpe?g|png|gif|bmp|stl)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: 8192,
            //                 name: "images/[name]-[hash:8].[ext]"
            //             }
            //         },
            //         {
            //             loader: "image-webpack-loader",
            //             options: {
            //                 mozjpeg: {
            //                     enabled: false
            //                     // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
            //                     // Try enabling it in your environment by switching the config to:
            //                     // enabled: true,
            //                     // progressive: true,
            //                 },
            //                 gifsicle: {
            //                     interlaced: false
            //                 },
            //                 optipng: {
            //                     optimizationLevel: 7
            //                 },
            //                 pngquant: {
            //                     quality: "65-90",
            //                     speed: 4
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            // {
            //     test: /\.(graphql|gql)$/,
            //     exclude: /node_modules/,
            //     loader: "graphql-tag/loader"
            // },
            // {
            //     test: /\.svg$/,
            //     use: [
            //         "babel-loader",
            //         {
            //             loader: "react-svg-loader",
            //             options: {
            //                 limit: 8192,
            //                 name: "images/[name]-[hash:8].[ext]",
            //                 svgo: {
            //                     plugins: [
            //                         { removeTitle: true },

            //                         { floatPrecision: 5 },
            //                         { moveGroupAttrsToElems: false },
            //                         { cleanupIDs: false }
            //                     ]
            //                 }
            //             }
            //         }
            //     ]
            // }
        ]
    },

    resolve: {
        extensions: [".mjs", ".js", ".jsx", ".scss", ".sass", ".css"],
        modules: [APP_PATH, "node_modules"]
    },

    plugins: [
        new CleanWebpackPlugin(
            // cleanWebpackConfig.folderToClean,
            // cleanWebpackConfig.options
            { cleanAfterEveryBuildPatterns: ["dist"] }
        ),
        new HtmlWebpackPlugin({
            title: "redux_exercise",
            template: path.resolve(srcPath, "./app/index.html"),
            // favicon: path.resolve(srcPath, "logo.ico"),
            hash: true,
            inject: true
        }),
        new CaseSensitivePathsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    target: "web", // Make web variables accessible to webpack, e.g. window

    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
};
