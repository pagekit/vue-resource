module.exports = {
    entry: __dirname + "/index.js",
    output: {
        path: __dirname + "/",
        filename: "specs.js"
    },
    module: {
        loaders: [
            {test: /.js/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015-loose']}}
        ]
    }
};
