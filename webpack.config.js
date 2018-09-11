const pack = require('./package.json');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        'web-logger': './src/web-logger.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        library: 'WebLogger',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, "src"),
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin([
            'WebLogger v' + pack.version + ' (' + pack.homepage + ')',
            '',
            'Tencent is pleased to support the open source community by making vConsole available.',
            'Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.',
            'Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at',
            'http://opensource.org/licenses/MIT',
            'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
        ].join('\n')),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};