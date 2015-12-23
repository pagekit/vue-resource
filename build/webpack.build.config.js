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
        resolve: {
            alias: {
                lib: __dirname + "/../src/lib",
                promise$: __dirname + "/../src/promise"
            }
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
        resolve: {
            alias: {
                lib: __dirname + "/../src/lib",
                promise$: __dirname + "/../src/promise"
            }
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin,
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    }

];
