

In this section, we will be starting with the basics: Rendering a static page using React.

As we saw in the previous section, the method we are interested in in this section is the `render` method.

In the render method, we return a JSX expression, that can either be composed of ordinary HTML elements
or composite React components.

Before we continue further with rendering, let's first see JSX in detail and compare it with HTML.

First of all, JSX is not a version of HTML or XML, behind the scenes, through transpilation via the tool
called jsx, it is converted to ordinary function calls.

So, a JSX expression like `<div name="foo" surname="bar">content</div>` is converted to a function call where the attributes are collected in a data structure called `props`. So, this is almost equivalent to a function call such as `div({name: "foo", surname: "bar"}, "content')`. So, the general structure is as follows: `functionForTheElement(props, children)`

I said "almost" because there are some additional things like calling `React.createElement` that JSX performs for us, but this is not important for getting the essence of the idea..

These JSX expressions can nest, so that we have composite components. Let's give a more complex example:

`<div name="foo"><span>Bar</span><span>Baz</span></div>`

The almost equivalent JavaScript expression for this would be:

`div({name: 'foo'}, span({}, "Bar"), span({}, "Baz"))`

Actually, if props is an empty object, JSX converts it to null for performance reasons. This way, we can save an object instantion:
So, a more correct version would be the following:


`div({name: 'foo'}, span(null, "Bar"), span(null, "Baz"))`

TODO: see whether the children are wrapped in an array or variadic


When one sees JSX for the first time, it reminds them of the dark ages of web programming, where HTML was mixed with JavaScript with onclick handlers. Then came the separation of concerns where we separated HTML from JavaScript.

JSX takes a different approach. There is actually no mixing of HTML and JavaScript, it actually is all JavaScript. I would like you to pause your concerns about mixing HTML and JavaScript for the duration of today, and try to see what JSX provides.

Let's see the main features of JSX:

First of all, all the tagged elements should be self-closing. In this manner, JSX is more similar to XHTML. For example, in HTML, you do not have to close the <img> or <input> tags, in JSX this is required.

Second, one uses curly braces to embed JavaScript expressions into a JSX expression. To give an example, <div>{2 + 3}</div> is valid JSX. Behind the scenes, it will be converted to the following JavaScript expression: `div(null, 2 + 3)`

Almost any JavaScript expression is valid in a JSX curly brace expression: For example, one can do the following:

var inner = <div>Hello</div>

var outer = <div>{inner} {inner}</div>

Here, we have created an element called inner, and have used it just like we could have used any other JavaScript variable in another JSX expression.

Take a look at this carefully. What we are doing here is not string concetanation, instead the `inner` element here is a data structure or function call that contains a representation of a `div` element with content `Hello`, and we can use it like any other variable.

Similarly we can do the following:

var contents = [];

contents.push(inner);
contents.push(inner);

var outer = <div>{contents}</div>

Again, we have used the inner expression just like we would use another JavaScript variable expression. Just like we can put JS expressions in arrays and refer to them in curly braces in JSX, we can refer to this contents array in outer element.

Here is a more advanced example, this time using the `map` method of JavaScript arrays:

var names = ["John", "Mary", "Jane"];

var contents = names.map(function (name) {
    return <div>Hello {name}</div>;
});

var outer = <div>{contents}</div>

Again, the idea is the same. We can use JSX expressions not only in the final return statement of a render method, but also before.

Let's give another example, where we display a certain element based on another element.

var content;

if (this.props.color == "red") {
   content = <div>The color is red.</div>
}


var outer = <div>{content}</div>

Here, we have used the fact that if an element is undefined or null in a JSX expression in a child position, React just ignores it. So, if the color is red, we show a div where it says "The color is red", otherwise we do not show anything at all.

We can also do the following: Remember that in JavaScript, if conditions are not expressions; but statements.  This means we cannot put an if inside a JSX expression. However ternary operations are expressions. So, we could instead have done the following as a more succint way:

var outer = <div>{this.props.color == "red" ? <div>The color is red</div>: null}</div>

Or even the following boolean operation:

var outer = <div>{this.props.color == "red" && <div>The color is red</div>}</div>

This may or may not make the maintanence of the application harder, so use with discretion.

Second, let's compare how CSS styles and classes are incorporated into JSX. Since JSX is actually JavaScript behind the scenes, and as `class` is a reserved word in JavaScript, authors of JSX have decided to use `className` for defining classes on a given element.

So, instead of <div class="foo bar">, one writes <div className="foo bar"> in JSX.

Secondly, styles in HTML are strings, but strings do not compose easily, you have to resort to string concetanation. It would be much easier to have styles in HTML similar to how CSS does it, as key-value pairs. This is what JSX uses for styles.

So, in HTML we would do the following: <div style="color: red; background-color: yellow">

In JSX, we first convert the string to an object represention. {color: 'red', backgroundColor: 'yellow'}

There are a few important things to point out here:

First, these are real JS objects. So, the values have to be quoted as strings, hence we cannot write `red`, but instead have to write `'red'`. Second, as these are JS objects, the keys cannot contain dashes unless they are quoted. That is we cannot write {background-color: 'red'}. This is not valid JS.

There are two solutions to this: Either quote the key so that we write {'background-color': 'red'} or instead of dashes, capitalize the next letter. The second is the solution React has taken, so instead of `{'background-color': 'red'}`, you can simply write `{backgroundColor: 'red'}`.

Another important feature is the following: For most of the CSS properties where we have numbers, the unit is in px. So, React authors again have taken the pragmatic approach so that instead of writing {fontSize: '12px'}, you can just write {fontSize: 12}. This saves a couple of characters.

Note that this doesn't always work as expected. For example, for line-height, the default unit is in ems, so in this case, React does not automatically append px for you. So, if you write {lineHeight: 18}, you will get the equivalent {lineHeight: '18em'}, not {lineHeight: '18px'}.


With this knowledge of JSX, we are ready to take an existing HTML page and convert it to a static React application. This is almost always the first step in React applications.

The steps to converting an existing mockup to a React application is as follows:

1. Create a React component called App. Take the existing HTML  and return it from the render method of the component.

2. Make the required CSS changes, so that classes are converted classNames, styles are converted to objects.

3. Ensure that all the tags are closed properly.

4. Reference the App.js file, add a container HTML element where your React component will live, mount the React component using `React.render`. In fact, you can directly mount to body, but this is discouraged since sometimes using external plugins such as Facebook or Twitter embeds add some nodes into the body and this might cause some bugs.

The usual way to do steps 2 and 3 are as follows: Run your React transpiler such as react-tools, webpack in watch mode. Make the changes until it no longer contains.

Congratulations, if you include the referenced CSS files in your HTML page, your HTML should look identical, and this is the first step in converting a mockup or existing application into React.

Before seeing an example, let's see how we convert our application with JSX into plain old JavaScript. Here, we install react-tools node module. This gives us a tool called `jsx` that operates in two ways: It can take a single file and output to a single file, or it can take a directory and can output to a directory. In the second mode, it can also watch the directory for changes.

Let's see an example of both cases, with a Hello World application.

We have the following component:

var HelloWorld = React.createClass({
    render: function () {
            return <div>Hello World</div>
    }
})

Assume we have the following existing container in the DOM: <div id="app"></div>

Then we mount it on the DOM as follows: React.render(<HelloWorld/>, document.getElementById('app'))

Notice that HelloWorld is self-closing. We could instead have written `<HelloWorld></HelloWorld>`, but that is more verbose.

Now,

Let's see an example, where we convert a todo application.

We are given the HTML of a todo application.
