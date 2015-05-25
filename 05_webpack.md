# Webpack

As applications grow in size, we separate the application into different
files. We need a way to bundle these files so that we can serve the users a
single file. One primitive approach is just concetanating the files. However,
this is not a good approach as the dependency order is not well-defined.

Webpack is a JavaScript bundler that solves this problem. It starts with an
entry point, and bundles the requirements of the given entry file, so that all
the dependencies are properly included in the single bundle output.

Another alternative to Webpack is browserify, which React itself uses to
create its final build. However, in React ecosystem, webpack seems to be more
popular so we will be focusing on Webpack in this section.

## CommonJS Modules

Webpack supports different module types, for example AMD or ES6 modules, however
the most popular approach at the moment is node style modules, that is CommonJs modules.

In CommonJS, each file is a module and it exports a single element or an object. The exported variables are specified via
`module.exports`. For example, if we just want to export the function `foo`, we can do `module.exports = foo`.

For using such a module, we use the `require` call. If the file is named `bar`, we have to write `var foo = require('./bar')`

Note that the second `foo` can be named anything here, similarly a file named `bar` does not necessarily export a `foo` variable.

A module can also export an object. For example, if we want to export two functions, `bar` and `baz` from a module, we use either of the following formats:

```js
module.exports.foo = foo;
module.exports.bar = bar;
```
or

```js
module.exports = {foo: foo, bar: bar};
```

EcmaScript 6 has a shortcut for this common case, so we can even do:

```js
module.exports = {foo, bar};
```

## React Components

While using React with webpack, the most common approach is to put each component in its own module and require them from the components they are used. Then, as the entry point, we give the main React component.

Webpack by default does not understand React's JSX syntax. However webpack supports plugins, known as loaders. Using the jsx loader or the babel loader, we can help Webpack transform the JSX files to normal JavaScript files.

We will be using babel loader since its support for new JavaScript features in ES6 and ES7 is more comprehensive.

## webpack.config.js

Webpack can accept an input file and can output to a file directly, but most commonly it is used through a config file called `webpack.config.js`. Once such a file is found, a simple webpack invocation builds the bundle.

Here we give a minimal webpack config file:
```js
module.exports = {
    entry: './component.js',
    output: {path: 'build', filename: 'bundle.js'},
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }

}
```

This will start with `component.js` file as the root component, and build a bundle which includes all the dependencies.

One nice thing about webpack and browserify is that you can even include most of the node modules, even libraries like react or underscore can be included in the bundle so that they do not have to referred explicitly in the HTML. Simply including the bundle file will suffice for the application to start.

Sometimes a page will have multiple application React application bundles, in that case, you may instruct to not bundle React or to bundle React in a common file so that the application size is optimized. Refer to webpack documentation for that.

## Production Settings For Webpack

By default, the output of webpack is unoptimized. Also, the file name is fixed, if this file is cached on users' browsers, it will not be re-downloaded, so users will be seeing an old version of the app.

This is easily fixed if we change the output filename to include the chunk hash as follows:

```js
module.exports = {
    entry: './component.js',
    output: {path: 'build', filename: 'bundle.[chunkhash].js'},
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }

}
```

Now, running webpack will build a bundle with its hash appended to its
name. For production, running webpack with `-p` option will optimize the
bundle.

In order to refer to this file in your HTML, you need to get the name of this file from webpack. Using webpack with -j option outputs a json description of its rules. In this json file, the path `.assetsByChunkName.main` contains the hash required. So, we can do the following:
```
webpack -j | jq ".assetsByChunkName.main"
```

Note: Download jq at http://stedolan.github.io/jq/

To have a single webpack config file, we can use the following:
```js
module.exports = {
    entry: './component.js',
    output: {path: 'build', filename: (process.env.PROD ? 'bundle.[chunkhash].js' : 'bundle')},
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}
```

Now, for dev purposes, just use webpack; for production issue `PROD=true webpack -p | jq ".assetsByChunkName.main" > bundle_hash`

Then, in your HTML, you can embed the contents of `bundle_hash` file so that your bundles are versioned.
