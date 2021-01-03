const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

let config = {
    entry: './src/todoish.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './public/assets'),
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "Todoish",
            suppressWarning: true
        })
    ],
};

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === "development";

    config.mode = isDevelopment ? "development" : "production";
    config.devtool = isDevelopment ? "source-map" : false;

    return config;
};
