module.exports = {

    mode: 'development',

    entry: __dirname + '/index.js',

    output: {
        path: __dirname + '/',
        filename: 'specs.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }

};
