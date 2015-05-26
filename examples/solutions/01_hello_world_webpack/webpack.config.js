module.exports = {
    entry: './app.js',
    output: {path: 'build', filename: (process.env.PROD ? 'bundle.[chunkhash].js' : 'bundle.js')},
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}
