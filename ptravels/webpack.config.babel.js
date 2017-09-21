//import path from 'path';
//import webpack from 'webpack';
const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


//export default {
//removed from entry: app: 'webpack/hot/dev-server','webpack-hot-middleware/client'
module.exports = {
    devtool: 'source-map',
    entry: {
        app: ["babel-polyfill", path.join(__dirname, 'index.js')],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, ],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/', //this is basically the webroot
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './ptravels/index.html',
            title: 'Your website'
          }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // devServer: {
    //     contentBase: __dirname,
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     port: 3001,
    //     stats: {
    //         cached: false,
    //     },
    // },
    node: { fs: "empty", net: "empty", tls: "empty" }
};