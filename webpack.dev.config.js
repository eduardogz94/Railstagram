var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.styl$/,
                loader: "style-loader"
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|gif|png|jpe?g|svg|json)$/,
                loader: 'file-loader'
            },
        ],
    },
};
