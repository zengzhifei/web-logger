const PACKAGE = require('./package.json');
const PATH = require('path');
const WEBPACK = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        'web-logger': './src/web-logger.js'
    },
    output: {
        path: PATH.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        library: 'WebLogger',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|test)/,
                include: PATH.resolve(__dirname, "src"),
                loader: 'babel'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new WEBPACK.BannerPlugin([
            'WebLogger v' + PACKAGE.version + ' [' + PACKAGE.homepage + ']',
            '@author ' + PACKAGE.author
        ].join('\n')),
        new WEBPACK.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};