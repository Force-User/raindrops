const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist")
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Rain Drops',
            template: path.resolve(__dirname, "./src/index.html"),
            filename: 'index.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use:['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test:/\.(html)$/,
                use:['html-loader'],
            },
            {
                test:/\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
            {
                test:/\.(mp3)$/i,
                type: 'asset/resource'
            },
        ]
    }
}