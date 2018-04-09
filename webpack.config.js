var webpack = require('webpack');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js'
    },
    performance: {
        hints: false
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(txt|md)$/,
                use: 'raw-loader'
            }, {
                test: /\.eot(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
            },
            {
                test: /\.woff2(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-woff2'
            },
            {
                test: /\.woff(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?\S*)?$/,
                loader: 'url-loader?limit=100000&mimetype=application/font-ttf'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[hash].[ext]'
                    }
                }]
            }

        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: __dirname,
        compress: true,
        hot: true,
        open: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};