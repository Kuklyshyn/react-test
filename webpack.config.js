const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const INDEX_HTML_PATH = path.resolve(PUBLIC_PATH, 'index.html');

module.exports = {
    entry: "./src/index.js",
    output:{
        path: PUBLIC_PATH,
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
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new HtmlWebPackPlugin({
        template: INDEX_HTML_PATH,
        inject: true,
        hash: true
    })]

}