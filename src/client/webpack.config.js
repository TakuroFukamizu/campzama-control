/**
 * require
 */
const root = require('app-root-path').path;
const assert = require('assert');
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// 設定を.envからロード
require('dotenv').config();

/**
 * Env
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log("process.env.CL_PORT", process.env.CL_PORT);
const DEBUG_PORT = process.env.CL_PORT || 8080;
const SV_PORT = process.env.SV_PORT || 8081;
process.env.API_URL = process.env.API_URL || `http://localhost:${SV_PORT}`;
// assert.ok(process.env.NODE_BIJSCORE_ENV != null, "NODE_BIJSCORE_ENV is not difined.");

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.join(root, 'dist', 'client');
const outputFileName = 'bundle';


/**
 * Webpack Config
 */
const config = {
    mode: process.env.NODE_ENV,

    context: contextPath,

    entry: {
        "index": `${__dirname}/index.ts`,
        "login": `${__dirname}/login.ts`
    },

    output: {
        path: distPath,
        filename: '[name].' + outputFileName + '.js',
        // mark /dist/ folder as a public path so index.html can reach it
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.ts', '.json' ,'.vue', '.pug' ],
        modules: [
            `${root}/node_modules`,
            'node_modules'
        ]
    },

    module: {
        rules: [
            { test: /\.html$/, use: [{ loader: 'html-loader' }] },
            { test: /\.pug$/, use: [{ loader: 'pug-loader' }] },
            { test: /\.css$/, use: [{ loader: 'style-loader?sourceMap=true!css-loader?sourceMap=true' }] },
            { test: /\.sass$/, use: [{ loader: 'style-loader?sourceMap=true!css-loader?sourceMap=true!sass-loader?indentedSyntax&sourceMap=true' }] },
            { test: /\.(jp(e?)g|png|gif|svg)$/, use: [{ loader: 'file-loader?name=resources/img/[name].[ext]' }] },
            { test: /\.ts(x?)$/, use: [{ loader: 'ts-loader', options: { appendTsSuffixTo: [ /\.vue$/ ] } }] },
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ]),
        /**
         * HMR issue, see: https://github.com/webpack/webpack/issues/1151
         * new webpack.HotModuleReplacementPlugin(),
         */
        new htmlWebpackPlugin({
            filename: path.join(distPath, 'index.html'),
            template: path.join(__dirname, 'index.pug'),
            // favicon: path.join(srcPath, 'static' , 'favicon.ico'),
            inject: false,
        }),
        new htmlWebpackPlugin({
            filename: path.join(distPath, 'login.html'),
            template: path.join(__dirname, 'login.pug'),
            // favicon: path.join(srcPath, 'static' , 'favicon.ico'),
            inject: false,
        }),
        new VueLoaderPlugin()
    ]
};

/**
 * When use in production (npm run build)
 */
console.log("process.env.NODE_ENV", typeof process.env.NODE_ENV, process.env.NODE_ENV);
if (process.env.NODE_ENV === '"production"' || process.env.NODE_ENV === "production") {
    /**
     * https://vuejs.org/guide/deployment.html
     */
    process.env.NODE_ENV = "production";

    // config.module.rules = (config.module.rules || []).concat([
    //     {
    //         test: /\.vue$/,
    //         use: [{
    //             loader: 'vue-loader',
    //             options: { sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' }
    //         }]
    //     },
    // ]);

    config.optimization.minimize = true;
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                mangle: {
                    // Vue Componentが動かなくなる対策
                    keep_fnames: true
                },
                ecma: 8,
                compress: {
                    warnings: false
                }
            })
        ]
    };
} else {
    process.env.NODE_ENV = "development";

    // config.module.rules = (config.module.rules || []).concat([
    //     {
    //         test: /\.vue$/,
    //         use: [{
    //             loader: 'vue-loader',
    //             options: { sass: 'vue-style-loader?sourceMap=true!css-loader?sourceMap=true!sass-loader?indentedSyntax&sourceMap=true' }
    //         }]
    //     },
    // ]);
    config.module.rules = (config.module.rules || []).concat([
        {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    // pug: 'pug-loader',
                    // ts: 'ts-loader',
                    sass: 'vue-style-loader?sourceMap=true!css-loader?sourceMap=true!sass-loader?indentedSyntax&sourceMap=true'
                }
            }]
        },
    ]);

    config.devtool = '#eval-source-map';

    /**
     * webpack-dev-server config
     * see: https://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: distPath,
        hot: true,
        inline: true,
        port: DEBUG_PORT,
        proxy: {
            "/api": {
              target: `${process.env.API_URL}/api`
            }
        }
    };
}



module.exports = config;