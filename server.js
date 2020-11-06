const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx?$)/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    mode: 'development',
    devServer: {
        proxy: {
            '/v1': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/v1/users': '/users',
                    '^/v1/user-groups': '/user-groups',
                },
                router: {
                    'http://localhost:8080': 'http://localhost:3000',
                },
            },
        }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new HtmlWebPackPlugin({
        template: "./src/index.html",
        inject: true,
        hash: true
    })]

}

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const DIST_PATH = path.resolve(__dirname, 'dist');
const INDEX_HTML_PATH = path.resolve(PUBLIC_PATH, 'index.html');

const webpackConfig = {

    // webpack will take the files from ./src/index
    entry: './src/index',

    devServer: {
        proxy: {
            '/v1': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/v1/users': '/users',
                    '^/v1/user-groups': '/user-groups',
                },
                router: {
                    'http://localhost:8080': 'http://localhost:3000',
                },
            },
        }
    },

    // and output it into /dist as bundle.js
    output: {
        path: DIST_PATH,
        filename: 'bundle.js',
        publicPath: ASSET_PATH,
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        alias: {
            api: path.resolve(__dirname, 'src/api'),
            assets: path.resolve(__dirname, 'src/assets'),
            components: path.resolve(__dirname, 'src/components'),
            containers: path.resolve(__dirname, 'src/views/containers'),
            layouts: path.resolve(__dirname, 'src/layouts'),
            styles: path.resolve(__dirname, 'src/styles'),
            variables: path.resolve(__dirname, 'src/variables'),
            views: path.resolve(__dirname, 'src/views'),
            themes: path.resolve(__dirname, 'src/themes'),
            constant: path.resolve(__dirname, 'src/constant'),
            types: path.resolve(__dirname, 'src/types'),
            services: path.resolve(__dirname, 'src/services'),
            actions: path.resolve(__dirname, 'src/actions'),
            reducers: path.resolve(__dirname, 'src/reducers'),
            common: path.resolve(__dirname, 'src/common'),
            utils: path.resolve(__dirname, 'src/utils'),
            store: path.resolve(__dirname, 'src/store'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // css-loader to bundle all the css files into one file and
            // style-loader to add all the styles inside the style tag of the document
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.(ts|js)x?$/,
                },
                use: ['@svgr/webpack', 'url-loader']
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: INDEX_HTML_PATH,
        }),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        new FaviconsWebpackPlugin('./public/Favicon_64x64.png'),
    ],

    devtool: 'source-map',
}

module.exports = (env, argv, defaultConfig) => {
    if (defaultConfig) {
        // resolve "*.svg" import conflict between webpack config Storybook and project config that leads to incosistncy
        const fileLoaderRule = defaultConfig.module.rules.find(rule => rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack", "url-loader"],
        });
    }
    return Object.assign({}, webpackConfig, defaultConfig);
}