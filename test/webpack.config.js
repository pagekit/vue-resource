module.exports = {
    entry: __dirname + "/index.js",
    output: {
        path: __dirname + "/",
        filename: "specs.js"
    },
    resolve: {
        alias: {
            lib: __dirname + "/../src/lib",
            promise$: __dirname + "/../src/promise"
        }
    }
};
