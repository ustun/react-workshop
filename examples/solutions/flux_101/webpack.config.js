module.exports = {
    entry: './component.js',
    output: {path: 'build', filename: (process.env.PROD ? 'bundle.[chunkhash].js' : 'bundle')},
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}
