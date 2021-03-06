// webpack.config.js

var webpack = require('webpack');
var path = require('path');
var libraryName = 'solver';
var outputFile = libraryName + '.js';

var config = {
    entry: __dirname + '/source/solver.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        root: path.resolve('./source'),
        extensions: ['', '.js']
    }
};

module.exports = config;