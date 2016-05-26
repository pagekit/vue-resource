var webpack = require("webpack");
var version = require("../package.json").version;
var banner =
    "/**\n" +
    " * vue-resource v" + version + "\n" +
    " * https://github.com/vuejs/vue-resource\n" +
    " * Released under the MIT License.\n" +
    " */\n";

module.exports = [

    {
        entry: "./src/index",
        output: {
            path: "./dist",
            filename: "vue-resource.js",
            library: "VueResource",
            libraryTarget: "umd"
        },
        module: {
            loaders: [
                {test: /.js/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015-without-strict']}}
            ]
        },
        plugins: [
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    },

    {
        entry: "./src/index",
        output: {
            path: "./dist",
            filename: "vue-resource.common.js",
            library: "VueResource",
            libraryTarget: "commonjs2"
        },
        module: {
            loaders: [
                {test: /.js/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015-without-strict']}}
            ]
        },
        plugins: [
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    },

    {
        entry: "./src/index",
        output: {
            path: "./dist",
            filename: "vue-resource.min.js",
            library: "VueResource",
            libraryTarget: "umd"
        },
        module: {
            loaders: [
                {test: /.js/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015-without-strict']}}
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin,
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    }

];
