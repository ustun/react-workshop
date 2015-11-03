module.exports = {
  entry: './src/01_hello_world.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
  },
  output: {
    path: __dirname  + '/build',
    filename: '[name].js',
    publicPath: 'http://localhost:8090/assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};
