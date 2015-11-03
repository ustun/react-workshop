module.exports = {
  entry: {
    'convert_mockup': './02_convert_mockup/src/convert_mockup.js',
    'todo_props': './03_todo_props/src/todo_props.js',
    'todo_state': './04_todo_state/src/todo_state.js',
    'instagram': './05_instagram/src/instagram.js',
    'github': './05_github/src/github.js',
    'uncontrolled_form': './06_forms/src/uncontrolled_form.js',
    'controlled_form': './06_forms/src/controlled_form.js',
    'jquery_integration': './07_integration_with_other_dom_libs/src/jquery_integration.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ],
  },
  output: {
    path: __dirname  + '/build',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};
