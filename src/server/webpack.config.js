/**
 * require
 */
const webpack = require('webpack');
const root = require('app-root-path').path;
const NodemonPlugin = require('nodemon-webpack-plugin');
const assert = require('assert');

// 設定を.envからロード
require('dotenv').config();

/**
 * Env
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.SV_PORT = process.env.SV_PORT || 8081;
assert.ok(process.env.IRKIT_CLIENT_KEY != null, "IRKIT_CLIENT_KEY is not difined.");
assert.ok(process.env.IRKIT_DEVICE_ID != null, "IRKIT_DEVICE_ID is not difined.");

/**
 * Webpack Config
 */
const config = {
    mode: process.env.NODE_ENV,
    entry: {
        app: `${root}/src/server/app.ts`
    },
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: '[name].js', // output file
        path: `${root}/dist/server`,
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
        modules: [
            `${root}/node_modules`,
            'node_modules'
        ]
    },
    resolveLoader: {
        //root: [`${root}/node_modules`],
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                }
            ]
        }]
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
            "SV_PORT",
            "IRKIT_CLIENT_KEY",
            "IRKIT_DEVICE_ID"
        ]),
        new NodemonPlugin(),
    ],
};

module.exports = config;